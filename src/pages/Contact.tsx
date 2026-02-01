import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  FileQuestion,
  Building2,
  Globe,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "harryseller9@gmail.com",
    description: "We respond within 24 hours",
    href: "mailto:harryseller9@gmail.com",
  },
  {
    icon: Phone,
    title: "WhatsApp",
    details: "+92 343 6148715",
    description: "Mon-Fri, 9am-6pm PKT",
    href: "https://api.whatsapp.com/send/?phone=923436148715",
  },
  {
    icon: MapPin,
    title: "Headquarters",
    details: "Lahore, Pakistan",
    description: "Punjab, Pakistan",
    href: "https://maps.google.com/?q=Lahore,Pakistan",
  },
  {
    icon: Clock,
    title: "Office Hours",
    details: "Monday - Friday",
    description: "9:00 AM - 6:00 PM PKT",
    href: null,
  },
];

const supportOptions = [
  {
    icon: MessageSquare,
    title: "General Inquiry",
    description: "Questions about our platform, features, and services",
    category: "general",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Help with your account, AI tools, or technical issues",
    category: "technical",
  },
  {
    icon: FileQuestion,
    title: "Scholarship Help",
    description: "Guidance on finding and applying for scholarships",
    category: "scholarship",
  },
  {
    icon: Building2,
    title: "Partnership & Investment",
    description: "Collaborate with us or explore investment opportunities",
    category: "partnership",
  },
];

const departments = [
  { value: "general", label: "General Inquiry" },
  { value: "technical", label: "Technical Support" },
  { value: "scholarship", label: "Scholarship Help" },
  { value: "partnership", label: "Partnership & Business" },
  { value: "investors", label: "Investor Relations" },
  { value: "media", label: "Media & Press" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Up Scholar",
  description: "Get in touch with Up Scholar team for scholarship help, technical support, or partnership inquiries.",
  url: "https://upscholar.com/contact",
  mainEntity: {
    "@type": "Organization",
    name: "Skill Up Digital Solutions",
    telephone: "+923436148715",
    email: "harryseller9@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "Pakistan",
    },
  },
};

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    category: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: "", email: "", company: "", subject: "", category: "", message: "" });
    setIsSubmitting(false);
  };

  const handleSupportClick = (category: string) => {
    setFormData(prev => ({ ...prev, category }));
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Contact Us - Up Scholar | Get Support & Partnership Inquiries</title>
        <meta name="description" content="Contact Up Scholar for scholarship help, technical support, or partnership opportunities. We respond within 24 hours. WhatsApp: +92 343 6148715" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 gap-2">
              <Globe className="h-3 w-3" />
              Get In Touch
            </Badge>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              We're Here to{" "}
              <span className="text-gradient">Help You Succeed</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you need help with scholarships, have technical questions, or want to explore 
              partnership opportunities, our team is ready to assist.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-8 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactInfo.map((item, index) => {
              const content = (
                <>
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary mb-4">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-foreground font-medium">{item.details}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </>
              );
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-6 rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all h-full"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-lg h-full">
                      {content}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-2xl sm:text-3xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How Can We <span className="text-gradient">Assist You</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select a category below to help us route your inquiry to the right team.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {supportOptions.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSupportClick(option.category)}
                className="text-left p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all group"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <option.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{option.title}</h3>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
                Send a Message
              </Badge>
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Let's Start a <span className="text-gradient">Conversation</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name *</label>
                    <Input
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address *</label>
                    <Input
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company/Organization</label>
                    <Input
                      placeholder="Your company (optional)"
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department *</label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.value} value={dept.value}>
                            {dept.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject *</label>
                  <Input
                    required
                    placeholder="How can we help you?"
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message *</label>
                  <Textarea
                    required
                    placeholder="Please describe your inquiry in detail..."
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-gradient-primary hover:opacity-90 gap-2"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Quick Links */}
              <div className="p-6 rounded-2xl bg-card border border-border/50">
                <h3 className="font-semibold mb-4">Explore More</h3>
                <div className="space-y-3">
                  <Link 
                    to="/about" 
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ArrowRight className="h-4 w-4" />
                    About Our Team
                  </Link>
                  <Link 
                    to="/pricing" 
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Pricing Plans
                  </Link>
                  <Link 
                    to="/ai-research" 
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ArrowRight className="h-4 w-4" />
                    AI Research Tools
                  </Link>
                </div>
              </div>

              {/* For Partners */}
              <div className="p-6 rounded-2xl bg-muted/50 border border-border/50">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Strategic Partnerships</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  Universities, NGOs, and educational organizations — let's expand student opportunities together.
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/partners">Explore Partnership</Link>
                </Button>
              </div>

              {/* For Investors */}
              <div className="p-6 rounded-2xl bg-gradient-primary text-white">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-5 w-5" />
                  <h3 className="font-semibold">Investor Relations</h3>
                </div>
                <p className="text-white/80 text-sm mb-4">
                  Explore investment opportunities in AI-powered EdTech with proven traction.
                </p>
                <Button variant="secondary" className="w-full bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/investors">View Investor Deck</Link>
                </Button>
              </div>

              {/* Response Time */}
              <div className="p-6 rounded-2xl bg-muted/50 border border-border/50">
                <h3 className="font-semibold mb-3">Our Response Time</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">General Inquiries</span>
                    <span className="font-medium">24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Technical Support</span>
                    <span className="font-medium">12 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Investor Relations</span>
                    <span className="font-medium">48 hours</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Visit Our <span className="text-gradient">Headquarters</span>
            </h2>
          </motion.div>
          <div className="rounded-2xl overflow-hidden h-96 bg-card border border-border/50">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d435519.22741013!2d74.00472275!3d31.4832073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1622141456789!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Up Scholar Headquarters - Lahore, Pakistan"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
