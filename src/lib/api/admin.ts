import { supabase } from "@/integrations/supabase/client";

interface AdminApiResponse<T = unknown> {
  data?: T;
  error?: string;
}

interface UserProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  subscription_tier: "free" | "premium" | "enterprise";
  subscription_approved_at: string | null;
  subscription_approved_by: string | null;
  created_at: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: "admin" | "user";
  created_at: string;
}

export interface EnhancedUser extends UserProfile {
  roles: UserRole[];
  isAdmin: boolean;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

async function callAdminApi<T>(action: string, params: Record<string, unknown> = {}): Promise<AdminApiResponse<T>> {
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData?.session?.access_token;

  if (!token) {
    return { error: "Not authenticated" };
  }

  const response = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-operations`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action, ...params }),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return { error: result.error || "Request failed" };
  }

  return { data: result };
}

export const adminApi = {
  // User Management
  getUsers: async (): Promise<AdminApiResponse<{ users: EnhancedUser[] }>> => {
    return callAdminApi("get-users");
  },

  updateSubscription: async (
    userId: string,
    tier: "free" | "premium" | "enterprise"
  ): Promise<AdminApiResponse<{ success: boolean }>> => {
    return callAdminApi("update-subscription", { userId, tier });
  },

  approveSubscription: async (
    userId: string
  ): Promise<AdminApiResponse<{ success: boolean }>> => {
    return callAdminApi("approve-subscription", { userId });
  },

  revokeSubscription: async (
    userId: string
  ): Promise<AdminApiResponse<{ success: boolean }>> => {
    return callAdminApi("revoke-subscription", { userId });
  },

  // Role Management
  grantAdminRole: async (
    userId: string
  ): Promise<AdminApiResponse<{ success: boolean }>> => {
    return callAdminApi("grant-admin", { userId });
  },

  revokeAdminRole: async (
    userId: string
  ): Promise<AdminApiResponse<{ success: boolean }>> => {
    return callAdminApi("revoke-admin", { userId });
  },

  // Newsletter Management
  getSubscribers: async (): Promise<AdminApiResponse<{ subscribers: Subscriber[] }>> => {
    return callAdminApi("get-subscribers");
  },

  updateSubscriber: async (
    subscriberId: string,
    isActive: boolean
  ): Promise<AdminApiResponse<{ success: boolean }>> => {
    return callAdminApi("update-subscriber", { subscriberId, isActive });
  },

  deleteSubscriber: async (
    subscriberId: string
  ): Promise<AdminApiResponse<{ success: boolean }>> => {
    return callAdminApi("delete-subscriber", { subscriberId });
  },
};
