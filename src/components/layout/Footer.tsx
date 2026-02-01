import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  programs: [
    { name: "Undergraduate", href: "/programs" },
    { name: "Graduate", href: "/programs" },
    { name: "Doctoral", href: "/programs" },
    { name: "Online Courses", href: "/programs" },
    { name: "Certifications", href: "/programs" },
  ],
  resources: [
    { name: "Scholarships", href: "/scholarships" },
    { name: "Financial Aid", href: "/scholarships" },
    { name: "Career Services", href: "/about" },
    { name: "Student Support", href: "/contact" },
    { name: "Library", href: "/about" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Our Team", href: "/about" },
    { name: "Careers", href: "/about" },
    { name: "News & Blog", href: "/about" },
    { name: "Contact", href: "/contact" },
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
  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Stay Updated with Up Scholar
            </h3>
            <p className="text-background/70 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest scholarship opportunities,
              educational resources, and exclusive insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 focus:border-primary"
              />
              <Button className="bg-gradient-primary hover:opacity-90 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
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
              Empowering students worldwide to discover their perfect educational opportunities 
              and secure funding for their academic journey.
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
            <h4 className="font-semibold text-background mb-4">Programs</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
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
