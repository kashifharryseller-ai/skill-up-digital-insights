import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Camera, 
  Loader2, 
  Save, 
  User, 
  Crown, 
  Shield, 
  CheckCircle2, 
  Clock, 
  XCircle,
  MessageCircle,
  Sparkles
} from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function Profile() {
  const { user, profile, isPremium, subscriptionTier, isLoading: authLoading, refreshProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Sync state when profile loads
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || "");
      setAvatarUrl(profile.avatar_url || "");
    }
  }, [profile]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    navigate("/");
    return null;
  }

  const getInitials = () => {
    if (displayName) {
      return displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user.email?.charAt(0).toUpperCase() || "U";
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      setAvatarUrl(urlData.publicUrl);

      toast({
        title: "Avatar uploaded",
        description: "Your avatar has been uploaded. Click Save to apply changes.",
      });
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload avatar.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!profile) return;

    // Validate display name
    const trimmedName = displayName.trim();
    if (trimmedName.length > 100) {
      toast({
        title: "Name too long",
        description: "Display name must be less than 100 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: trimmedName || null,
          avatar_url: avatarUrl || null,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been saved successfully.",
      });

      // Refresh profile instead of full page reload
      await refreshProfile();
    } catch (error: any) {
      toast({
        title: "Save failed",
        description: error.message || "Failed to save profile.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpgrade = () => {
    const message = encodeURIComponent(
      `Hi! I'd like to upgrade my UpScholar subscription to Premium.\n\nEmail: ${user.email}\nCurrent Plan: ${subscriptionTier}`
    );
    window.open(`https://wa.me/923436148715?text=${message}`, "_blank");
  };

  const getSubscriptionStatusInfo = () => {
    if (subscriptionTier === "free") {
      return {
        icon: User,
        label: "Free Plan",
        description: "Basic access with limited features",
        color: "text-muted-foreground",
        bgColor: "bg-muted",
        badgeVariant: "secondary" as const,
      };
    }

    if (isPremium) {
      return {
        icon: subscriptionTier === "enterprise" ? Shield : Crown,
        label: subscriptionTier === "enterprise" ? "Enterprise" : "Premium",
        description: "Full access to all features",
        color: "text-primary",
        bgColor: "bg-primary/10",
        badgeVariant: "default" as const,
      };
    }

    // Has tier but not approved yet
    return {
      icon: Clock,
      label: `${subscriptionTier.charAt(0).toUpperCase() + subscriptionTier.slice(1)} (Pending)`,
      description: "Your subscription is pending approval",
      color: "text-yellow-600",
      bgColor: "bg-yellow-500/10",
      badgeVariant: "outline" as const,
    };
  };

  const statusInfo = getSubscriptionStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          <h1 className="text-3xl font-bold">Your Profile</h1>

          {/* Subscription Status Card */}
          <Card className="overflow-hidden">
            <div className={`h-2 ${isPremium ? "bg-gradient-to-r from-primary to-primary/60" : subscriptionTier !== "free" ? "bg-yellow-500" : "bg-muted"}`} />
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-xl ${statusInfo.bgColor} flex items-center justify-center`}>
                    <StatusIcon className={`h-6 w-6 ${statusInfo.color}`} />
                  </div>
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      Subscription Status
                      <Badge variant={statusInfo.badgeVariant} className="ml-2">
                        {statusInfo.label}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{statusInfo.description}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Status Details */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Current Plan</p>
                  <p className="font-semibold capitalize flex items-center gap-2">
                    {subscriptionTier}
                    {isPremium && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm text-muted-foreground mb-1">Activation Status</p>
                  <p className="font-semibold flex items-center gap-2">
                    {subscriptionTier === "free" ? (
                      <>
                        <XCircle className="h-4 w-4 text-muted-foreground" />
                        Not Subscribed
                      </>
                    ) : isPremium ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Active
                      </>
                    ) : (
                      <>
                        <Clock className="h-4 w-4 text-yellow-500" />
                        Pending Approval
                      </>
                    )}
                  </p>
                </div>
              </div>

              {/* Approval Date if premium */}
              {isPremium && profile?.subscription_approved_at && (
                <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                  <p className="text-sm text-muted-foreground mb-1">Activated On</p>
                  <p className="font-semibold text-green-600">
                    {format(new Date(profile.subscription_approved_at), "MMMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
              )}

              {/* Pending message */}
              {subscriptionTier !== "free" && !isPremium && (
                <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-700">Awaiting Approval</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Your subscription upgrade request is being reviewed. You'll receive a notification once approved.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Upgrade CTA for free users */}
              {subscriptionTier === "free" && (
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium">Unlock Premium Features</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Get unlimited AI searches, priority support, and exclusive tools.
                        </p>
                      </div>
                    </div>
                    <Button onClick={handleUpgrade} className="gap-2 shrink-0">
                      <MessageCircle className="h-4 w-4" />
                      Upgrade Now
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profile Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your profile picture and display name
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative group">
                  <Avatar className="h-24 w-24 cursor-pointer ring-4 ring-background shadow-lg" onClick={handleAvatarClick}>
                    <AvatarImage src={avatarUrl} alt={displayName || "User avatar"} />
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {getInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={handleAvatarClick}
                    disabled={isUploading}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {isUploading ? (
                      <Loader2 className="h-6 w-6 text-white animate-spin" />
                    ) : (
                      <Camera className="h-6 w-6 text-white" />
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Click to upload a new avatar (max 5MB)
                </p>
              </div>

              <Separator />

              {/* Display Name */}
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your display name"
                    className="pl-10"
                    maxLength={100}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  {displayName.length}/100 characters
                </p>
              </div>

              {/* Email (read-only) */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user.email || ""}
                  disabled
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed
                </p>
              </div>

              {/* Member Since */}
              <div className="space-y-2">
                <Label>Member Since</Label>
                <div className="p-3 rounded-lg bg-muted text-sm">
                  {user.created_at 
                    ? format(new Date(user.created_at), "MMMM d, yyyy")
                    : "Unknown"}
                </div>
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
