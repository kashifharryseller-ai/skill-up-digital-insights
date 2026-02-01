import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Search,
  Sparkles,
  GraduationCap,
  Globe,
  DollarSign,
  Mail,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { usePlatformStats } from "@/hooks/usePlatformStats";
import { useNewsletterSubscription } from "@/hooks/useNewsletterSubscription";
import { Skeleton } from "@/components/ui/skeleton";

const formatCurrency = (amount: number): string => {
  if (amount >= 1000000) {
    return `$${(amount / 1000000).toFixed(1)}M+`;
  } else if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(0)}K+`;
  }
  return `$${amount}`;
};

const formatNumber = (num: number): string => {
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K+`;
  }
  return `${num}+`;
};

export function HeroSection() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { data: stats, isLoading: statsLoading } = usePlatformStats();
  const { subscribe, isLoading: subscribing } = useNewsletterSubscription();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/scholarships?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await subscribe(email);
    if (success) {
      setEmail("");
      setSubscribed(true);
    }
  };

  const statsData = [
    {
      icon: GraduationCap,
      value: statsLoading ? null : formatNumber(stats?.totalScholarships || 0),
      label: "Scholarships",
      color: "from-primary to-primary/70",
    },
    {
      icon: DollarSign,
      value: statsLoading ? null : formatCurrency(stats?.totalFunding || 0),
      label: "Total Funding",
      color: "from-accent to-accent/70",
    },
    {
      icon: Globe,
      value: statsLoading ? null : `${stats?.countriesCovered || 0}+`,
      label: "Countries",
      color: "from-secondary to-secondary/70",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-hero">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[80px]"
        />

        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{ rotate: 360, y: [-20, 20, -20] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-[20%] w-16 h-16 border-2 border-primary/20 rounded-xl"
        />
        <motion.div
          animate={{ rotate: -360, x: [-10, 10, -10] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-32 left-[15%] w-12 h-12 border-2 border-accent/20 rounded-full"
        />
        <motion.div
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-[10%] w-8 h-8 bg-primary/10 rounded-lg rotate-45"
        />
      </div>


      {/* Floating Trend Card */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0, y: [10, -10, 10] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.7 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-40 left-[8%] hidden xl:block z-10"
      >
        <div className="glass rounded-2xl p-5 shadow-2xl border border-accent/10">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
              <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="font-bold text-foreground">Live Updates</p>
              <p className="text-sm text-muted-foreground">Real-time deadlines</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-5 py-2.5 mb-8 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">
              AI-Powered Scholarship Search
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Find{" "}
            <span className="text-gradient relative">
              Scholarships
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute bottom-2 left-0 h-3 bg-primary/20 -z-10 rounded"
              />
            </span>
            {" "}Faster
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Search real-time data from official .gov, .edu, and .org sources.
            No outdated listings. No guesswork.
          </motion.p>

          {/* Search Bar */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500" />
              <div className="relative flex items-center gap-2 bg-background/80 backdrop-blur-xl rounded-xl p-2 border border-border shadow-2xl">
                <Search className="h-5 w-5 text-muted-foreground ml-3" />
                <Input
                  type="text"
                  placeholder="Search scholarships by field, country, or degree..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-muted-foreground/60"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 shadow-lg shadow-primary/25 px-6"
                >
                  Search
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </motion.form>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            <span className="text-sm text-muted-foreground">Popular:</span>
            {["Computer Science", "MBA", "Engineering", "Medical", "USA"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setSearchQuery(tag);
                  navigate(`/scholarships?search=${encodeURIComponent(tag)}`);
                }}
                className="text-sm px-3 py-1 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {tag}
              </button>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto mb-16"
          >
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity" />
                <div className="glass rounded-2xl p-4 md:p-6 border border-border/50">
                  <div
                    className={`h-10 w-10 md:h-12 md:w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-3 shadow-lg`}
                  >
                    <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  {statsLoading ? (
                    <Skeleton className="h-8 w-20 mx-auto mb-1" />
                  ) : (
                    <p className="text-2xl md:text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  )}
                  <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="max-w-md mx-auto"
          >
            {subscribed ? (
              <div className="flex items-center justify-center gap-2 text-primary">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Thanks for subscribing!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <p className="text-sm text-muted-foreground mb-3">
                  Get weekly scholarship alerts straight to your inbox
                </p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="outline"
                    disabled={subscribing}
                    className="shrink-0"
                  >
                    {subscribing ? "..." : "Subscribe"}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
