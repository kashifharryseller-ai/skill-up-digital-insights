import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  GraduationCap,
  Menu,
  X,
  Sparkles,
  Moon,
  Sun,
  ChevronDown,
  Search,
  Users,
  FileCheck,
  Bookmark,
  LogOut,
  Shield,
  User,
  Crown,
  HelpCircle,
  Map,
  FileText,
  DollarSign,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { AuthModal } from "@/components/auth/AuthModal";
import { NotificationBell } from "./NotificationBell";

// AI Tools Section
const aiToolsItems = [
  { name: "AI Scholarship Search", href: "/ai-research?tab=scholarships", icon: Search, description: "Find opportunities with AI" },
  { name: "Faculty Finder", href: "/ai-research?tab=faculty", icon: Users, description: "Connect with professors" },
  
  { name: "Document Reviewer", href: "/ai-research?tab=reviewer", icon: FileCheck, description: "AI feedback on your SOP" },
  { name: "Saved Items", href: "/ai-research?tab=saved", icon: Bookmark, description: "Your bookmarked items" },
];

// Strategy & Guide Section
const strategyItems = [
  { name: "Application Roadmap", href: "/strategy", icon: Map, description: "Step-by-step guide" },
  { name: "Document Preparation", href: "/strategy#documents", icon: FileText, description: "SOP, CV, LOR templates" },
  { name: "Fees & Funding", href: "/strategy#fees", icon: DollarSign, description: "Real-time cost breakdown" },
  { name: "Requirements Checklist", href: "/strategy#requirements", icon: ClipboardList, description: "Complete checklist" },
  { name: "FAQs", href: "/faq", icon: HelpCircle, description: "Common questions" },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Browse Database", href: "/scholarships" },
  { name: "Pricing", href: "/pricing", icon: Crown, highlight: true },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user, profile, isAdmin, signOut, isLoading } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const getInitials = () => {
    if (profile?.display_name) {
      return profile.display_name.slice(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return "U";
  };
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary shadow-lg shadow-primary/25"
            >
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight font-sans">
                Up<span className="text-gradient">Scholar</span>
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Skill Up Digital Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Home Link */}
            <Link
              to="/"
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                location.pathname === "/"
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              Home
              {location.pathname === "/" && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-primary rounded-full"
                />
              )}
            </Link>

            {/* Scholarships Dropdown */}
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1.5 group",
                    location.pathname === "/ai-research" || location.pathname === "/strategy"
                      ? "text-primary bg-primary/5"
                      : "text-primary bg-primary/5 hover:bg-primary/10"
                  )}
                >
                  <Sparkles className="h-3 w-3" />
                  Scholarships
                  <motion.div
                    animate={{ rotate: dropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <ChevronDown className="h-3 w-3" />
                  </motion.div>
                  {(location.pathname === "/ai-research" || location.pathname === "/strategy") && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-primary rounded-full"
                    />
                  )}
                </button>
              </DropdownMenuTrigger>
              <AnimatePresence>
                {dropdownOpen && (
                  <DropdownMenuContent 
                    align="start" 
                    className="w-72 bg-background border border-border shadow-2xl z-50 p-3 rounded-xl"
                    asChild
                    forceMount
                  >
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      {/* AI Tools Section */}
                      <div className="mb-3">
                        <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                          AI-Powered Tools
                        </p>
                        {aiToolsItems.map((item, index) => (
                          <DropdownMenuItem key={item.name} asChild>
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.03, duration: 0.2 }}
                            >
                              <Link
                                to={item.href}
                                onClick={() => setDropdownOpen(false)}
                                className="flex items-center gap-3 cursor-pointer w-full px-2 py-2 rounded-lg hover:bg-primary/10 transition-colors group"
                              >
                                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                                  <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="font-medium text-sm block">{item.name}</span>
                                  <span className="text-xs text-muted-foreground">{item.description}</span>
                                </div>
                              </Link>
                            </motion.div>
                          </DropdownMenuItem>
                        ))}
                      </div>

                      <DropdownMenuSeparator />

                      {/* Strategy & Guide Section */}
                      <div className="mt-3">
                        <p className="px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                          Build Your Strategy
                        </p>
                        {strategyItems.map((item, index) => (
                          <DropdownMenuItem key={item.name} asChild>
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: (aiToolsItems.length + index) * 0.03, duration: 0.2 }}
                            >
                              <Link
                                to={item.href}
                                onClick={() => setDropdownOpen(false)}
                                className="flex items-center gap-3 cursor-pointer w-full px-2 py-2 rounded-lg hover:bg-primary/10 transition-colors group"
                              >
                                <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                                  <item.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className="font-medium text-sm block">{item.name}</span>
                                  <span className="text-xs text-muted-foreground">{item.description}</span>
                                </div>
                              </Link>
                            </motion.div>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </motion.div>
                  </DropdownMenuContent>
                )}
              </AnimatePresence>
            </DropdownMenu>

            {/* Other Nav Links */}
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1.5",
                  link.highlight
                    ? "text-primary bg-primary/5 hover:bg-primary/10"
                    : location.pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {link.icon && <link.icon className="h-3.5 w-3.5" />}
                {link.name}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-primary rounded-full"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Buttons & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative overflow-hidden"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="h-5 w-5 text-primary" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="h-5 w-5 text-muted-foreground" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            )}

            {/* Notification Bell - only for logged in users */}
            {!isLoading && user && <NotificationBell />}

            {!isLoading && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 pl-2 pr-3">
                    <Avatar className="h-8 w-8">
                      {profile?.avatar_url && (
                        <AvatarImage src={profile.avatar_url} alt="Avatar" />
                      )}
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {getInitials()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">
                      {profile?.display_name || user.email?.split("@")[0]}
                    </span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
                        <Shield className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="flex items-center gap-2 cursor-pointer text-destructive"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="font-medium"
                  onClick={() => setAuthModalOpen(true)}
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 font-medium"
                  onClick={() => setAuthModalOpen(true)}
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-primary" />
                ) : (
                  <Moon className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {/* AI Tools Section in Mobile */}
              <div className="space-y-2">
                <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  AI-Powered Tools
                </p>
                {aiToolsItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors text-muted-foreground hover:bg-muted group"
                    >
                      <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <span className="block">{item.name}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Strategy Section in Mobile */}
              <div className="space-y-2 border-t border-border pt-4">
                <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Build Your Strategy
                </p>
                {strategyItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (aiToolsItems.length + index) * 0.05, duration: 0.2 }}
                  >
                    <Link
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors text-muted-foreground hover:bg-muted group"
                    >
                      <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="h-4 w-4 group-hover:text-primary transition-colors" />
                      </div>
                      <div>
                        <span className="block">{item.name}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-border pt-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + index * 0.05, duration: 0.2 }}
                  >
                    <Link
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                        location.pathname === link.href
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted"
                      )}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="pt-4 space-y-3 border-t border-border"
              >
                {user ? (
                  <>
                    {isAdmin && (
                      <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={() => {
                          setIsOpen(false);
                          navigate("/admin");
                        }}
                      >
                        <Shield className="h-4 w-4" />
                        Admin Dashboard
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setIsOpen(false);
                        setAuthModalOpen(true);
                      }}
                    >
                      Sign In
                    </Button>
                    <Button
                      className="w-full bg-gradient-primary"
                      onClick={() => {
                        setIsOpen(false);
                        setAuthModalOpen(true);
                      }}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
