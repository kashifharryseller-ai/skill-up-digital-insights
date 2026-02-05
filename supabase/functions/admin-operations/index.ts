import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/auth.ts';

interface AdminRequest {
  action: string;
  userId?: string;
  tier?: 'free' | 'premium' | 'enterprise';
  subscriberId?: string;
  isActive?: boolean;
}

async function verifyAdmin(authHeader: string | null): Promise<{ isAdmin: boolean; userId?: string; error?: string }> {
  if (!authHeader?.startsWith('Bearer ')) {
    return { isAdmin: false, error: 'Missing authorization header' };
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: authHeader } } }
  );

  const token = authHeader.replace('Bearer ', '');
  const { data, error } = await supabaseClient.auth.getClaims(token);

  if (error || !data?.claims) {
    return { isAdmin: false, error: 'Invalid token' };
  }

  const userId = data.claims.sub as string;

  // Use service role client to check admin status (bypasses RLS)
  const serviceClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const { data: roleData } = await serviceClient
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .eq('role', 'admin')
    .maybeSingle();

  if (!roleData) {
    return { isAdmin: false, error: 'Not an admin' };
  }

  return { isAdmin: true, userId };
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    const { isAdmin, userId: adminId, error: authError } = await verifyAdmin(authHeader);

    if (!isAdmin) {
      return new Response(
        JSON.stringify({ error: authError || 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body: AdminRequest = await req.json();
    const { action } = body;

    // Service client for all admin operations
    const serviceClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    switch (action) {
      case 'get-users': {
        const { data: profiles, error: profilesError } = await serviceClient
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (profilesError) {
          return new Response(
            JSON.stringify({ error: 'Failed to fetch profiles' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { data: roles, error: rolesError } = await serviceClient
          .from('user_roles')
          .select('*');

        if (rolesError) {
          return new Response(
            JSON.stringify({ error: 'Failed to fetch roles' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Merge profiles with roles
        const users = (profiles || []).map((profile) => {
          const userRoles = (roles || []).filter((r) => r.user_id === profile.user_id);
          return {
            ...profile,
            roles: userRoles,
            isAdmin: userRoles.some((r) => r.role === 'admin'),
          };
        });

        return new Response(
          JSON.stringify({ users }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'update-subscription': {
        const { userId, tier } = body;
        if (!userId || !tier) {
          return new Response(
            JSON.stringify({ error: 'userId and tier are required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { error } = await serviceClient
          .from('profiles')
          .update({
            subscription_tier: tier,
            subscription_approved_at: tier === 'free' ? null : new Date().toISOString(),
            subscription_approved_by: tier === 'free' ? null : adminId,
          })
          .eq('user_id', userId);

        if (error) {
          return new Response(
            JSON.stringify({ error: 'Failed to update subscription' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Send notification if upgrading
        if (tier !== 'free') {
          await serviceClient.from('notifications').insert({
            user_id: userId,
            title: `Subscription Upgraded to ${tier.charAt(0).toUpperCase() + tier.slice(1)}!`,
            message: `Your ${tier} subscription has been approved. You now have access to all ${tier} features.`,
            type: 'subscription',
          });
        }

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'approve-subscription': {
        const { userId } = body;
        if (!userId) {
          return new Response(
            JSON.stringify({ error: 'userId is required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Get current tier for notification
        const { data: profile } = await serviceClient
          .from('profiles')
          .select('subscription_tier')
          .eq('user_id', userId)
          .single();

        const { error } = await serviceClient
          .from('profiles')
          .update({
            subscription_approved_at: new Date().toISOString(),
            subscription_approved_by: adminId,
          })
          .eq('user_id', userId);

        if (error) {
          return new Response(
            JSON.stringify({ error: 'Failed to approve subscription' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Send notification
        await serviceClient.from('notifications').insert({
          user_id: userId,
          title: 'Subscription Approved! 🎉',
          message: `Your ${profile?.subscription_tier || 'premium'} subscription has been approved. You now have full access to all premium features.`,
          type: 'subscription',
        });

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'revoke-subscription': {
        const { userId } = body;
        if (!userId) {
          return new Response(
            JSON.stringify({ error: 'userId is required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { error } = await serviceClient
          .from('profiles')
          .update({
            subscription_approved_at: null,
            subscription_approved_by: null,
          })
          .eq('user_id', userId);

        if (error) {
          return new Response(
            JSON.stringify({ error: 'Failed to revoke subscription' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Send notification
        await serviceClient.from('notifications').insert({
          user_id: userId,
          title: 'Subscription Access Revoked',
          message: 'Your premium subscription access has been revoked. Please contact support if you have any questions.',
          type: 'warning',
        });

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'grant-admin': {
        const { userId } = body;
        if (!userId) {
          return new Response(
            JSON.stringify({ error: 'userId is required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { error } = await serviceClient
          .from('user_roles')
          .insert({ user_id: userId, role: 'admin' });

        if (error) {
          if (error.code === '23505') {
            return new Response(
              JSON.stringify({ error: 'User already has admin role' }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
          }
          return new Response(
            JSON.stringify({ error: 'Failed to grant admin role' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Send notification
        await serviceClient.from('notifications').insert({
          user_id: userId,
          title: 'Admin Access Granted! 🛡️',
          message: 'You have been granted administrator privileges. You can now access the admin dashboard.',
          type: 'success',
        });

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'revoke-admin': {
        const { userId } = body;
        if (!userId) {
          return new Response(
            JSON.stringify({ error: 'userId is required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Prevent self-demotion
        if (userId === adminId) {
          return new Response(
            JSON.stringify({ error: 'Cannot revoke your own admin role' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { error } = await serviceClient
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');

        if (error) {
          return new Response(
            JSON.stringify({ error: 'Failed to revoke admin role' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        // Send notification
        await serviceClient.from('notifications').insert({
          user_id: userId,
          title: 'Admin Access Revoked',
          message: 'Your administrator privileges have been revoked.',
          type: 'warning',
        });

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'get-subscribers': {
        const { data, error } = await serviceClient
          .from('newsletter_subscribers')
          .select('*')
          .order('subscribed_at', { ascending: false });

        if (error) {
          return new Response(
            JSON.stringify({ error: 'Failed to fetch subscribers' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ subscribers: data }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'update-subscriber': {
        const { subscriberId, isActive } = body;
        if (!subscriberId || isActive === undefined) {
          return new Response(
            JSON.stringify({ error: 'subscriberId and isActive are required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { error } = await serviceClient
          .from('newsletter_subscribers')
          .update({ is_active: isActive })
          .eq('id', subscriberId);

        if (error) {
          return new Response(
            JSON.stringify({ error: 'Failed to update subscriber' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      case 'delete-subscriber': {
        const { subscriberId } = body;
        if (!subscriberId) {
          return new Response(
            JSON.stringify({ error: 'subscriberId is required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        const { error } = await serviceClient
          .from('newsletter_subscribers')
          .delete()
          .eq('id', subscriberId);

        if (error) {
          return new Response(
            JSON.stringify({ error: 'Failed to delete subscriber' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      default:
        return new Response(
          JSON.stringify({ error: 'Unknown action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
  } catch (err) {
    console.error('Admin operations error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
