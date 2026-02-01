import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAdmin, isLoading: authLoading } = useAuth();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate("/");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchSubscribers();
      fetchUsers();
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

  const fetchUsers = async () => {
    setUsersLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load users",
        variant: "destructive",
      });
    } else {
      setUsers((data as UserProfile[]) || []);
    }
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
                  Manage users and subscriptions
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList>
              <TabsTrigger value="users" className="gap-2">
                <Crown className="h-4 w-4" />
                User Subscriptions
              </TabsTrigger>
              <TabsTrigger value="newsletter" className="gap-2">
                <Mail className="h-4 w-4" />
                Newsletter
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
                      <p className="text-2xl font-bold">
                        {users.filter((u) => u.subscription_tier === "premium" && u.subscription_approved_at).length}
                      </p>
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
                      <p className="text-2xl font-bold">
                        {users.filter((u) => u.subscription_tier === "enterprise" && u.subscription_approved_at).length}
                      </p>
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
                      <p className="text-2xl font-bold">
                        {users.filter((u) => u.subscription_tier !== "free" && !u.subscription_approved_at).length}
                      </p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Users Table */}
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
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
                    ) : users.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No users yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      users.map((profile) => (
                        <TableRow key={profile.id}>
                          <TableCell className="font-medium">
                            {profile.display_name || "Unnamed User"}
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
