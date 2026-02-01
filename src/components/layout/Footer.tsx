import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowRight, Sparkles, Handshake, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewsletterSubscription } from "@/hooks/useNewsletterSubscription";
import { useState } from "react";

const footerLinks = {
  platform: [
    { name: "AI Research Tools", href: "/ai-research" },
    { name: "Scholarship Database", href: "/scholarships" },
    { name: "Academic Programs", href: "/programs" },
    { name: "Pricing & Plans", href: "/pricing" },
  ],
  resources: [
    { name: "How It Works", href: "/about" },
    { name: "Success Stories", href: "/about" },
    { name: "Help Center", href: "/contact" },
    { name: "FAQs", href: "/pricing" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/about" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const { subscribe, isLoading } = useNewsletterSubscription();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await subscribe(email);
      setEmail("");
    }
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Partnership & Investment CTA Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {/* For Strategic Partners */}
            <Link 
              to="/partners"
              className="group p-6 rounded-2xl bg-background/5 border border-background/10 hover:border-primary/50 hover:bg-background/10 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Handshake className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                    Strategic Partnerships
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-sm text-background/70">
                    Universities, NGOs, and organizations — join our ecosystem to empower students globally.
                  </p>
                </div>
              </div>
            </Link>

            {/* For Investors */}
            <Link 
              to="/investors"
              className="group p-6 rounded-2xl bg-background/5 border border-background/10 hover:border-primary/50 hover:bg-background/10 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                    Investor Relations
                    <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-sm text-background/70">
                    Explore investment opportunities in AI-powered EdTech with proven traction.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Stay Ahead of Opportunities</span>
            </div>
            <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Get Scholarship Alerts Delivered
            </h3>
            <p className="text-background/70 mb-8 max-w-2xl mx-auto">
              Join 10,000+ students receiving curated scholarship opportunities, 
              application tips, and exclusive platform updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 focus:border-primary"
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-gradient-primary hover:opacity-90 whitespace-nowrap"
              >
                {isLoading ? "Subscribing..." : "Subscribe Free"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-2xl font-bold text-background">Up Scholar</span>
                <p className="text-xs text-background/60 uppercase tracking-widest">Skill Up Digital Solutions</p>
              </div>
            </Link>
            <p className="text-background/70 mb-6 max-w-sm">
              AI-powered scholarship discovery platform helping students unlock 
              fully-funded opportunities with intelligent matching and real-time guidance.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-background/70">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Lahore, Pakistan</span>
              </div>
              <a href="https://wa.me/923436148715" className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors">
                <Phone className="h-5 w-5 text-primary" />
                <span>+92 343 6148715</span>
              </a>
              <a href="mailto:harryseller9@gmail.com" className="flex items-center gap-3 text-background/70 hover:text-primary transition-colors">
                <Mail className="h-5 w-5 text-primary" />
                <span>harryseller9@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2 border-t border-background/10">
                <Link
                  to="/partners"
                  className="text-background/70 hover:text-primary transition-colors flex items-center gap-1"
                >
                  <Handshake className="h-3 w-3" />
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link
                  to="/investors"
                  className="text-background/70 hover:text-primary transition-colors flex items-center gap-1"
                >
                  <TrendingUp className="h-3 w-3" />
                  Investor Relations
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/60 text-sm">
              © 2026 Skill Up Digital Solutions. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center text-background/70 hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
