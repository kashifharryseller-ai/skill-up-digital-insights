import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X, Sparkles, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "AI Research", href: "/ai-research", highlight: true },
  { name: "Programs", href: "/programs" },
  { name: "Scholarships", href: "/scholarships" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

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
                Scholar<span className="text-gradient">Find</span>
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Education Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                  link.highlight && location.pathname !== link.href
                    ? "text-primary bg-primary/5 hover:bg-primary/10"
                    : location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <span className="flex items-center gap-1.5">
                  {link.highlight && <Sparkles className="h-3 w-3" />}
                  {link.name}
                </span>
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
            <Button variant="ghost" size="sm" className="font-medium">
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-gradient-primary hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 font-medium"
            >
              Get Started
            </Button>
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
              {navLinks.map((link) => (
                <Link
                  key={link.name}
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
              ))}
              <div className="pt-4 space-y-3 border-t border-border">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
                <Button className="w-full bg-gradient-primary">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
