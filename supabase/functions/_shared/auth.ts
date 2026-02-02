import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

export interface AuthResult {
  user: { id: string; email?: string };
  supabaseClient: SupabaseClient;
  isPremium: boolean;
}

export async function authenticateRequest(req: Request): Promise<AuthResult> {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Unauthorized: Missing or invalid authorization header');
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    { global: { headers: { Authorization: authHeader } } }
  );

  const token = authHeader.replace('Bearer ', '');
  const { data, error } = await supabaseClient.auth.getClaims(token);
  
  if (error || !data?.claims) {
    throw new Error('Unauthorized: Invalid token');
  }

  const userId = data.claims.sub as string;
  const user = { id: userId, email: data.claims.email as string | undefined };

  // Check premium status
  const { data: profile } = await supabaseClient
    .from('profiles')
    .select('subscription_tier, subscription_approved_at')
    .eq('user_id', userId)
    .single();

  const isPremium = profile?.subscription_tier !== 'free' && !!profile?.subscription_approved_at;

  return { user, supabaseClient, isPremium };
}

export async function checkToolAccess(
  supabaseClient: SupabaseClient,
  userId: string,
  toolType: string,
  isPremium: boolean
): Promise<{ allowed: boolean; reason?: string }> {
  if (isPremium) {
    return { allowed: true };
  }

  // Check if user has used their free search for this tool
  const { data: usage } = await supabaseClient
    .from('ai_search_usage')
    .select('id')
    .eq('user_id', userId)
    .eq('tool_type', toolType)
    .maybeSingle();

  if (usage) {
    return { 
      allowed: false, 
      reason: 'Free trial used for this tool. Please upgrade to premium for unlimited access.' 
    };
  }

  return { allowed: true };
}

export async function recordToolUsage(
  supabaseClient: SupabaseClient,
  userId: string,
  toolType: string,
  isPremium: boolean
): Promise<void> {
  // Only record usage for non-premium users
  if (!isPremium) {
    await supabaseClient.from('ai_search_usage').insert({
      user_id: userId,
      tool_type: toolType,
    });
  }
}
