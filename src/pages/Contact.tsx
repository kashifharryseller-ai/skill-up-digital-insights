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
} from "lucide-react";

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
    title: "Location",
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
    description: "Questions about our platform and services",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Help with account or technical issues",
  },
  {
    icon: FileQuestion,
    title: "Scholarship Help",
    description: "Guidance on finding and applying for scholarships",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

    setFormData({ name: "", email: "", subject: "", category: "", message: "" });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background">
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
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              Get In Touch
            </Badge>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              We'd Love to{" "}
              <span className="text-gradient">Hear From You</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions about scholarships, programs, or just want to say hello?
              Our team is here to help you succeed.
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
                      className="block p-6 rounded-2xl bg-card border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/30 transition-all"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-lg">
                      {content}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Support */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
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
                    <label className="text-sm font-medium">Email Address</label>
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
                    <label className="text-sm font-medium">Subject</label>
                    <Input
                      required
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="scholarship">Scholarship Help</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    required
                    placeholder="Tell us more about your inquiry..."
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

            {/* Support Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:pl-8"
            >
              <h2
                className="text-2xl sm:text-3xl font-bold tracking-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                How Can We Help?
              </h2>

              <div className="space-y-4 mb-8">
                {supportOptions.map((option, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-5 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                  >
                    <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                      <option.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{option.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {option.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Link */}
              <div className="p-6 rounded-2xl bg-gradient-primary text-white">
                <h3 className="text-xl font-semibold mb-2">
                  Looking for quick answers?
                </h3>
                <p className="text-white/80 mb-4">
                  Check out our frequently asked questions for instant help with
                  common queries.
                </p>
                <Button variant="secondary" className="bg-white text-primary hover:bg-white/90">
                  View FAQs
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="rounded-2xl overflow-hidden h-96 bg-card border border-border/50">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d435519.22741013!2d74.00472275!3d31.4832073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1622141456789!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Up Scholar Location - Lahore, Pakistan"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
