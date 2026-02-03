import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import {
  Shield,
  Users,
  Mail,
  Trash2,
  Loader2,
  ArrowLeft,
  Download,
  Crown,
  CheckCircle2,
  XCircle,
  Search,
  UserCog,
  ShieldCheck,
  ShieldX,
  UserPlus,
  RefreshCw,
} from "lucide-react";
import { format } from "date-fns";

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
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

interface EnhancedUser extends UserProfile {
  roles: UserRole[];
  isAdmin: boolean;
}

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [users, setUsers] = useState<EnhancedUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTier, setFilterTier] = useState<string>("all");
  const [filterRole, setFilterRole] = useState<string>("all");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchSubscribers();
      fetchUsersWithRoles();
    }
  }, [isAdmin]);

  const fetchSubscribers = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("newsletter_subscribers")
      .select("*")
      .order("subscribed_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load subscribers",
        variant: "destructive",
      });
    } else {
      setSubscribers(data || []);
    }
    setIsLoading(false);
  };

  const fetchUsersWithRoles = async () => {
    setUsersLoading(true);
    
    // Fetch profiles
    const { data: profilesData, error: profilesError } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (profilesError) {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
      setUsersLoading(false);
      return;
    }

    // Fetch all user roles
    const { data: rolesData, error: rolesError } = await supabase
      .from("user_roles")
      .select("*");

    if (rolesError) {
      toast({
        title: "Error",
        description: "Failed to load user roles",
        variant: "destructive",
      });
    }

    // Merge profiles with roles
    const enhancedUsers: EnhancedUser[] = (profilesData || []).map((profile) => {
      const userRoles = (rolesData || []).filter((r) => r.user_id === profile.user_id) as UserRole[];
      return {
        ...profile,
        roles: userRoles,
        isAdmin: userRoles.some((r) => r.role === "admin"),
      } as EnhancedUser;
    });

    setUsers(enhancedUsers);
    setUsersLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("newsletter_subscribers")
      .delete()
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete subscriber",
        variant: "destructive",
      });
    } else {
      setSubscribers((prev) => prev.filter((s) => s.id !== id));
      toast({
        title: "Deleted",
        description: "Subscriber removed successfully",
      });
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    const { error } = await supabase
      .from("newsletter_subscribers")
      .update({ is_active: !currentActive })
      .eq("id", id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update subscriber",
        variant: "destructive",
      });
    } else {
      setSubscribers((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, is_active: !currentActive } : s
        )
      );
    }
  };

  const handleUpdateSubscription = async (
    userId: string,
    tier: "free" | "premium" | "enterprise"
  ) => {
    const { error } = await supabase
      .from("profiles")
      .update({
        subscription_tier: tier,
        subscription_approved_at: tier === "free" ? null : new Date().toISOString(),
        subscription_approved_by: tier === "free" ? null : user?.id,
      })
      .eq("user_id", userId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update subscription",
        variant: "destructive",
      });
    } else {
      // Send notification to user if upgrading to premium/enterprise
      if (tier !== "free") {
        await supabase.from("notifications").insert({
          user_id: userId,
          title: `Subscription Upgraded to ${tier.charAt(0).toUpperCase() + tier.slice(1)}!`,
          message: `Your ${tier} subscription has been approved. You now have access to all ${tier} features. Enjoy!`,
          type: "subscription",
        });
      }

      setUsers((prev) =>
        prev.map((u) =>
          u.user_id === userId
            ? {
                ...u,
                subscription_tier: tier,
                subscription_approved_at:
                  tier === "free" ? null : new Date().toISOString(),
                subscription_approved_by: tier === "free" ? null : user?.id || null,
              }
            : u
        )
      );
      toast({
        title: "Updated",
        description: `User subscription ${tier === "free" ? "revoked" : `upgraded to ${tier}`}`,
      });
    }
  };

  const handleApproveSubscription = async (userId: string) => {
    const userProfile = users.find((u) => u.user_id === userId);
    
    const { error } = await supabase
      .from("profiles")
      .update({
        subscription_approved_at: new Date().toISOString(),
        subscription_approved_by: user?.id,
      })
      .eq("user_id", userId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to approve subscription",
        variant: "destructive",
      });
    } else {
      // Send notification to user
      await supabase.from("notifications").insert({
        user_id: userId,
        title: "Subscription Approved! 🎉",
        message: `Your ${userProfile?.subscription_tier || "premium"} subscription has been approved. You now have full access to all premium features.`,
        type: "subscription",
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.user_id === userId
            ? {
                ...u,
                subscription_approved_at: new Date().toISOString(),
                subscription_approved_by: user?.id || null,
              }
            : u
        )
      );
      toast({
        title: "Approved",
        description: "Subscription approved successfully",
      });
    }
  };

  const handleRevokeSubscription = async (userId: string) => {
    const { error } = await supabase
      .from("profiles")
      .update({
        subscription_approved_at: null,
        subscription_approved_by: null,
      })
      .eq("user_id", userId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to revoke subscription",
        variant: "destructive",
      });
    } else {
      // Send notification to user
      await supabase.from("notifications").insert({
        user_id: userId,
        title: "Subscription Access Revoked",
        message: "Your premium subscription access has been revoked. Please contact support if you have any questions.",
        type: "warning",
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.user_id === userId
            ? {
                ...u,
                subscription_approved_at: null,
                subscription_approved_by: null,
              }
            : u
        )
      );
      toast({
        title: "Revoked",
        description: "Subscription access revoked",
      });
    }
  };

  const handleGrantAdminRole = async (userId: string) => {
    // Prevent self-demotion check is not needed for granting
    const { error } = await supabase
      .from("user_roles")
      .insert({
        user_id: userId,
        role: "admin",
      });

    if (error) {
      if (error.code === "23505") {
        toast({
          title: "Already Admin",
          description: "This user already has admin role",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to grant admin role",
          variant: "destructive",
        });
      }
    } else {
      // Send notification
      await supabase.from("notifications").insert({
        user_id: userId,
        title: "Admin Access Granted! 🛡️",
        message: "You have been granted administrator privileges. You can now access the admin dashboard.",
        type: "success",
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.user_id === userId
            ? {
                ...u,
                isAdmin: true,
                roles: [...u.roles, { id: "", user_id: userId, role: "admin" as const, created_at: new Date().toISOString() }],
              }
            : u
        )
      );
      toast({
        title: "Success",
        description: "Admin role granted successfully",
      });
    }
  };

  const handleRevokeAdminRole = async (userId: string) => {
    // Prevent self-demotion
    if (userId === user?.id) {
      toast({
        title: "Cannot Revoke",
        description: "You cannot revoke your own admin role",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", userId)
      .eq("role", "admin");

    if (error) {
      toast({
        title: "Error",
        description: "Failed to revoke admin role",
        variant: "destructive",
      });
    } else {
      // Send notification
      await supabase.from("notifications").insert({
        user_id: userId,
        title: "Admin Access Revoked",
        message: "Your administrator privileges have been revoked.",
        type: "warning",
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.user_id === userId
            ? {
                ...u,
                isAdmin: false,
                roles: u.roles.filter((r) => r.role !== "admin"),
              }
            : u
        )
      );
      toast({
        title: "Revoked",
        description: "Admin role revoked successfully",
      });
    }
  };

  const handleExport = () => {
    const csv = [
      ["Email", "Subscribed At", "Active"],
      ...subscribers.map((s) => [
        s.email,
        format(new Date(s.subscribed_at), "yyyy-MM-dd HH:mm"),
        s.is_active ? "Yes" : "No",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `newsletter-subscribers-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportUsers = () => {
    const csv = [
      ["Display Name", "Subscription Tier", "Status", "Is Admin", "Joined"],
      ...users.map((u) => [
        u.display_name || "Unnamed",
        u.subscription_tier,
        u.subscription_tier === "free" ? "Free" : u.subscription_approved_at ? "Approved" : "Pending",
        u.isAdmin ? "Yes" : "No",
        format(new Date(u.created_at), "yyyy-MM-dd HH:mm"),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `users-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (authLoading || (!user && !isAdmin)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const getTierBadgeVariant = (tier: string, approved: boolean) => {
    if (tier === "free") return "secondary";
    if (!approved) return "outline";
    return tier === "enterprise" ? "default" : "default";
  };

  // Filter users based on search and filters
  const filteredUsers = users.filter((u) => {
    const matchesSearch = 
      !searchQuery ||
      (u.display_name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    
    const matchesTier = filterTier === "all" || u.subscription_tier === filterTier;
    
    const matchesRole = 
      filterRole === "all" ||
      (filterRole === "admin" && u.isAdmin) ||
      (filterRole === "user" && !u.isAdmin);
    
    return matchesSearch && matchesTier && matchesRole;
  });

  // Stats
  const totalAdmins = users.filter((u) => u.isAdmin).length;
  const totalPremium = users.filter((u) => u.subscription_tier === "premium" && u.subscription_approved_at).length;
  const totalEnterprise = users.filter((u) => u.subscription_tier === "enterprise" && u.subscription_approved_at).length;
  const pendingApprovals = users.filter((u) => u.subscription_tier !== "free" && !u.subscription_approved_at).length;

  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-3xl font-bold flex items-center gap-3">
                  <Shield className="h-8 w-8 text-primary" />
                  Admin Dashboard
                </h1>
                <p className="text-muted-foreground mt-1">
                  Manage users, roles, and subscriptions
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
              <TabsTrigger value="users" className="gap-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">User Management</span>
                <span className="sm:hidden">Users</span>
              </TabsTrigger>
              <TabsTrigger value="roles" className="gap-2">
                <UserCog className="h-4 w-4" />
                <span className="hidden sm:inline">Role Management</span>
                <span className="sm:hidden">Roles</span>
              </TabsTrigger>
              <TabsTrigger value="newsletter" className="gap-2">
                <Mail className="h-4 w-4" />
                <span className="hidden sm:inline">Newsletter</span>
                <span className="sm:hidden">Email</span>
              </TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-4">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{users.length}</p>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Crown className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{totalPremium}</p>
                      <p className="text-sm text-muted-foreground">Premium</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{totalEnterprise}</p>
                      <p className="text-sm text-muted-foreground">Enterprise</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                      <Loader2 className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{pendingApprovals}</p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterTier} onValueChange={setFilterTier}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="All Tiers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={fetchUsersWithRoles}
                    title="Refresh"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button onClick={handleExportUsers} variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Export</span>
                  </Button>
                </div>
              </div>

              {/* Users Table */}
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usersLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                        </TableCell>
                      </TableRow>
                    ) : filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          {searchQuery || filterTier !== "all" ? "No users match your filters" : "No users yet"}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((profile) => (
                        <TableRow key={profile.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {profile.display_name || "Unnamed User"}
                              {profile.user_id === user?.id && (
                                <Badge variant="outline" className="text-xs">You</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={profile.isAdmin ? "default" : "secondary"}
                              className={profile.isAdmin ? "bg-primary/10 text-primary border-primary/20" : ""}
                            >
                              {profile.isAdmin ? (
                                <span className="flex items-center gap-1">
                                  <Shield className="h-3 w-3" />
                                  Admin
                                </span>
                              ) : (
                                "User"
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Select
                              value={profile.subscription_tier}
                              onValueChange={(value: "free" | "premium" | "enterprise") =>
                                handleUpdateSubscription(profile.user_id, value)
                              }
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="free">Free</SelectItem>
                                <SelectItem value="premium">Premium</SelectItem>
                                <SelectItem value="enterprise">Enterprise</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={getTierBadgeVariant(
                                profile.subscription_tier,
                                !!profile.subscription_approved_at
                              )}
                              className={
                                profile.subscription_tier !== "free" && !profile.subscription_approved_at
                                  ? "border-yellow-500 text-yellow-600"
                                  : profile.subscription_approved_at
                                  ? "bg-green-500/10 text-green-600 border-green-500"
                                  : ""
                              }
                            >
                              {profile.subscription_tier === "free"
                                ? "Free"
                                : profile.subscription_approved_at
                                ? "Approved"
                                : "Pending"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {format(new Date(profile.created_at), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell className="text-right">
                            {profile.subscription_tier !== "free" && (
                              <>
                                {profile.subscription_approved_at ? (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleRevokeSubscription(profile.user_id)}
                                    className="text-destructive hover:text-destructive gap-1"
                                  >
                                    <XCircle className="h-4 w-4" />
                                    Revoke
                                  </Button>
                                ) : (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleApproveSubscription(profile.user_id)}
                                    className="text-green-600 hover:text-green-700 gap-1"
                                  >
                                    <CheckCircle2 className="h-4 w-4" />
                                    Approve
                                  </Button>
                                )}
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Roles Tab */}
            <TabsContent value="roles" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{users.length}</p>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Shield className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{totalAdmins}</p>
                      <p className="text-sm text-muted-foreground">Administrators</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                      <Users className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{users.length - totalAdmins}</p>
                      <p className="text-sm text-muted-foreground">Regular Users</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="All Roles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="admin">Admins Only</SelectItem>
                    <SelectItem value="user">Users Only</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={fetchUsersWithRoles}
                  title="Refresh"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>

              {/* Info Banner */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Role Management</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Administrators have full access to this dashboard and can manage users, subscriptions, and roles.
                      Be careful when granting admin access.
                    </p>
                  </div>
                </div>
              </div>

              {/* Roles Table */}
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Current Role</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usersLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                        </TableCell>
                      </TableRow>
                    ) : filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          {searchQuery || filterRole !== "all" ? "No users match your filters" : "No users yet"}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((profile) => (
                        <TableRow key={profile.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {profile.display_name || "Unnamed User"}
                              {profile.user_id === user?.id && (
                                <Badge variant="outline" className="text-xs">You</Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={profile.isAdmin ? "default" : "secondary"}
                              className={profile.isAdmin ? "bg-primary text-primary-foreground" : ""}
                            >
                              {profile.isAdmin ? (
                                <span className="flex items-center gap-1">
                                  <ShieldCheck className="h-3 w-3" />
                                  Administrator
                                </span>
                              ) : (
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  User
                                </span>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {profile.subscription_tier}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {format(new Date(profile.created_at), "MMM d, yyyy")}
                          </TableCell>
                          <TableCell className="text-right">
                            {profile.isAdmin ? (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-destructive hover:text-destructive gap-1"
                                    disabled={profile.user_id === user?.id}
                                  >
                                    <ShieldX className="h-4 w-4" />
                                    Revoke Admin
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Revoke Admin Access?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will remove administrator privileges from{" "}
                                      <strong>{profile.display_name || "this user"}</strong>.
                                      They will no longer be able to access the admin dashboard.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleRevokeAdminRole(profile.user_id)}
                                      className="bg-destructive hover:bg-destructive/90"
                                    >
                                      Revoke Admin
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            ) : (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-primary hover:text-primary gap-1"
                                  >
                                    <UserPlus className="h-4 w-4" />
                                    Make Admin
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Grant Admin Access?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will give <strong>{profile.display_name || "this user"}</strong> full
                                      administrator privileges. They will be able to manage all users,
                                      subscriptions, and roles.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleGrantAdminRole(profile.user_id)}
                                    >
                                      Grant Admin
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Newsletter Tab */}
            <TabsContent value="newsletter" className="space-y-6">
              <div className="flex justify-end">
                <Button onClick={handleExport} variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export CSV
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{subscribers.length}</p>
                      <p className="text-sm text-muted-foreground">
                        Total Subscribers
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {subscribers.filter((s) => s.is_active).length}
                      </p>
                      <p className="text-sm text-muted-foreground">Active</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                      <Mail className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">
                        {subscribers.filter((s) => !s.is_active).length}
                      </p>
                      <p className="text-sm text-muted-foreground">Inactive</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subscribers Table */}
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Subscribed</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                        </TableCell>
                      </TableRow>
                    ) : subscribers.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center py-8 text-muted-foreground"
                        >
                          No subscribers yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      subscribers.map((subscriber) => (
                        <TableRow key={subscriber.id}>
                          <TableCell className="font-medium">
                            {subscriber.email}
                          </TableCell>
                          <TableCell>
                            {format(
                              new Date(subscriber.subscribed_at),
                              "MMM d, yyyy"
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={subscriber.is_active ? "default" : "secondary"}
                              className="cursor-pointer"
                              onClick={() =>
                                handleToggleActive(subscriber.id, subscriber.is_active)
                              }
                            >
                              {subscriber.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(subscriber.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
