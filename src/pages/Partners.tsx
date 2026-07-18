import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  GraduationCap,
  Users,
  Globe,
  Handshake,
  CheckCircle2,
  ArrowRight,
  Mail,
  Phone,
  Sparkles,
  Target,
  Award,
  BookOpen,
} from "lucide-react";

const partnershipTypes = [
  {
    icon: GraduationCap,
    title: "Universities & Colleges",
    description:
      "Partner with us to showcase your scholarship programs to qualified students worldwide. Get direct access to motivated applicants.",
    benefits: [
      "Featured listings on our platform",
      "Access to pre-qualified applicants",
      "Analytics dashboard for applications",
      "Direct communication with students",
    ],
  },
  {
    icon: Building2,
    title: "Organizations & Foundations",
    description:
      "Amplify your scholarship reach and connect with deserving students who match your criteria through our AI-powered matching.",
    benefits: [
      "Targeted scholarship distribution",
      "AI-powered student matching",
      "Application management tools",
      "Impact reporting & analytics",
    ],
  },
  {
    icon: Users,
    title: "Corporate Partners",
    description:
      "Support education initiatives and build your talent pipeline by sponsoring scholarships or educational programs.",
    benefits: [
      "Brand visibility to students",
      "CSR impact measurement",
      "Talent pipeline development",
      "Co-branded initiatives",
    ],
  },
  {
    icon: Globe,
    title: "Government & NGOs",
    description:
      "Collaborate on large-scale educational initiatives to support students across regions and demographics.",
    benefits: [
      "Wide geographic reach",
      "Multi-language support",
      "Compliance & reporting",
      "Scalable solutions",
    ],
  },
];

const stats = [
  { value: "10K+", label: "Active Students" },
  { value: "500+", label: "Partner Institutions" },
  { value: "50+", label: "Countries Reached" },
  { value: "$10M+", label: "Scholarships Facilitated" },
];

const partnerLogos = [
  "Leading Universities",
  "Educational Foundations",
  "Government Bodies",
  "Corporate Sponsors",
  "International NGOs",
  "EdTech Companies",
];

export default function Partners() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Partner With Schola X | Universities & Organizations</title>
        <meta
          name="description"
          content="Partner with Schola X to connect your scholarships with qualified students worldwide. AI-powered matching for universities, organizations, and corporations."
        />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
              <Handshake className="h-3 w-3 mr-1" />
              Partnership Opportunities
            </Badge>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Partner With{" "}
              <span className="text-gradient">Schola X</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join our network of universities, organizations, and corporations
              empowering students worldwide with scholarship opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 gap-2"
                asChild
              >
                <a href="https://wa.me/923436148715?text=Hello!%20I'm%20interested%20in%20partnering%20with%20Up%20Scholar.">
                  Become a Partner
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="mailto:harryseller9@gmail.com">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-accent/10 text-accent">
              <Target className="h-3 w-3 mr-1" />
              Partnership Programs
            </Badge>
            <h2
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              How We Can Work Together
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're a university, foundation, or corporation, we have
              partnership models designed for your goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {partnershipTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
                  <CardHeader>
                    <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4">
                      <type.icon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{type.title}</CardTitle>
                    <p className="text-muted-foreground">{type.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {type.benefits.map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary">
                <Sparkles className="h-3 w-3 mr-1" />
                Why Partner With Us
              </Badge>
              <h2
                className="text-3xl md:text-4xl font-bold mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                AI-Powered Platform for Maximum Impact
              </h2>
              <p className="text-muted-foreground mb-8">
                Our cutting-edge technology ensures your scholarships reach the
                right candidates while providing comprehensive analytics and
                management tools.
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">AI-Powered Matching</h3>
                    <p className="text-sm text-muted-foreground">
                      Our AI matches your scholarships with qualified candidates
                      based on eligibility and fit.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Globe className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Global Reach</h3>
                    <p className="text-sm text-muted-foreground">
                      Access students from 50+ countries through our
                      international platform.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-secondary/50 flex items-center justify-center shrink-0">
                    <Award className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Quality Applicants</h3>
                    <p className="text-sm text-muted-foreground">
                      Pre-vetted, motivated students who meet your eligibility
                      criteria.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <BookOpen className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Comprehensive Analytics</h3>
                    <p className="text-sm text-muted-foreground">
                      Track applications, measure impact, and optimize your
                      scholarship programs.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass rounded-3xl p-8 border border-primary/10">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Trusted By Leading Institutions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {partnerLogos.map((logo, index) => (
                    <motion.div
                      key={logo}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="h-20 rounded-xl bg-muted/50 flex items-center justify-center p-4"
                    >
                      <span className="text-sm font-medium text-muted-foreground text-center">
                        {logo}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-primary p-12 text-center"
          >
            <div className="absolute inset-0 bg-grid-white/10" />
            <div className="relative z-10">
              <h2
                className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ready to Make an Impact?
              </h2>
              <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
                Join our growing network of partners and help students unlock
                their educational potential. Let's discuss how we can work together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2"
                  asChild
                >
                  <a href="https://wa.me/923436148715?text=Hello!%20I'm%20interested%20in%20partnering%20with%20Up%20Scholar.">
                    <Phone className="h-4 w-4" />
                    Schedule a Call
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2"
                  asChild
                >
                  <a href="mailto:harryseller9@gmail.com">
                    <Mail className="h-4 w-4" />
                    Email Us
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
