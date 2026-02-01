import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Target,
  Eye,
  Heart,
  Linkedin,
  Mail,
  Phone,
  Sparkles,
  Brain,
  Zap,
  Shield,
  Globe,
  Users,
  Award,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Connect students with scholarships and AI-powered tools to accelerate their academic success.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "Become the leading AI-driven platform removing financial and informational barriers in education.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Innovation, accessibility, integrity, and unwavering commitment to student success.",
  },
];

const aiCapabilities = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description: "Smart algorithms match students with scholarships based on their unique profile.",
  },
  {
    icon: Zap,
    title: "Instant Research",
    description: "AI research assistants help find universities, professors, and programs in seconds.",
  },
  {
    icon: Shield,
    title: "Document Analysis",
    description: "Automated review of applications, SOPs, and academic documents.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Access scholarships and programs from universities worldwide.",
  },
];

const stats = [
  { value: "10K+", label: "Students Helped" },
  { value: "50+", label: "Countries" },
  { value: "$5M+", label: "Scholarships Found" },
  { value: "99%", label: "Satisfaction Rate" },
];

const team = [
  {
    name: "Malik Kashif",
    role: "CEO & Founder",
    titles: ["Senior Software Engineer", "Product Manager", "Entrepreneur"],
    location: "Lahore, Pakistan",
    bio: "Visionary leader driving Up Scholar's mission to democratize education access through AI. Full-stack developer with expertise in building scalable EdTech solutions.",
    linkedin: "#",
  },
  {
    name: "Inam Ul Haq",
    role: "Co-Founder & CTO",
    titles: ["Software Engineer", "Backend Architect"],
    location: "Lahore, Pakistan",
    bio: "Technical mastermind behind Up Scholar's AI infrastructure. Passionate about leveraging technology to help students find opportunities.",
    linkedin: "#",
  },
];

const milestones = [
  { year: "2026", title: "Founded", description: "Up Scholar launched by Skill Up Digital Solutions" },
  { year: "2026", title: "AI Integration", description: "Launched AI-powered scholarship matching engine" },
  { year: "2026", title: "10K Users", description: "Reached 10,000 active users milestone" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Skill Up Digital Solutions",
  description: "Up Scholar - AI-powered scholarship search platform connecting students with educational funding opportunities",
  url: "https://upscholar.com",
  foundingDate: "2026",
  founders: [
    { "@type": "Person", name: "Malik Kashif", jobTitle: "CEO & Founder" },
    { "@type": "Person", name: "Inam Ul Haq", jobTitle: "Co-Founder & CTO" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+923436148715",
    email: "harryseller9@gmail.com",
    contactType: "customer service",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lahore",
    addressCountry: "Pakistan",
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>About Up Scholar - AI-Powered Education Platform | Skill Up Digital Solutions</title>
        <meta name="description" content="Up Scholar by Skill Up Digital Solutions - AI-powered scholarship search platform. Founded by Malik Kashif (CEO) and Inam Ul Haq, software engineers from Lahore, Pakistan." />
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
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 gap-2">
              <Sparkles className="h-3 w-3" />
              AI-Powered Education Platform
            </Badge>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Transforming Education with{" "}
              <span className="text-gradient">Artificial Intelligence</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Up Scholar leverages cutting-edge AI to connect students with scholarships, 
              research opportunities, and educational resources worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 gap-2" asChild>
                <Link to="/ai-research">
                  Explore AI Tools
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-background/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
              What Drives Us
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our <span className="text-gradient">Purpose</span>
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all group"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 gap-2">
              <Brain className="h-3 w-3" />
              Technology
            </Badge>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Powered by <span className="text-gradient">Advanced AI</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our proprietary AI technology processes millions of data points to deliver personalized recommendations.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {aiCapabilities.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 gap-2">
              <Users className="h-3 w-3" />
              Leadership
            </Badge>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Meet Our <span className="text-gradient">Founders</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experienced technologists and entrepreneurs building the future of education technology.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all">
                  <div className="flex items-start gap-6">
                    <div className="relative shrink-0">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary-foreground">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-background flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-1">{member.name}</h3>
                      <p className="text-primary font-medium mb-2">{member.role}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {member.titles.map((title, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {title}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{member.location}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mt-4 mb-4">{member.bio}</p>
                  <div className="flex gap-3">
                    <a
                      href="https://wa.me/923436148715"
                      className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={`Contact ${member.name} on WhatsApp`}
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                    <a
                      href="mailto:harryseller9@gmail.com"
                      className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                    <a
                      href={member.linkedin}
                      className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story & Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 gap-2">
                <Award className="h-3 w-3" />
                Our Story
              </Badge>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Building the Future of <span className="text-gradient">Education Access</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Up Scholar was born from a simple observation: talented students often miss life-changing opportunities 
                  simply because they don't know they exist or can't navigate complex application processes.
                </p>
                <p>
                  Our AI-powered platform aggregates scholarships, programs, and research opportunities from thousands 
                  of sources, using advanced matching algorithms to connect students with their perfect opportunities.
                </p>
                <p>
                  Today, we're proud to serve students from over 50 countries, helping them secure millions in funding 
                  and access world-class education.
                </p>
              </div>
              
              {/* Contact CTA */}
              <div className="mt-8 p-6 rounded-xl bg-card border border-border/50">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Build With Us
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We're building the future of education access. Whether you're a university, 
                  organization, or investor — there's a place for you in our mission.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="sm" className="bg-gradient-primary hover:opacity-90" asChild>
                    <Link to="/partners">Partner Program</Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link to="/investors">Investor Deck</Link>
                  </Button>
                  <Button size="sm" variant="ghost" asChild>
                    <Link to="/contact">Contact Team</Link>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute left-8 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6"
                  >
                    <div className="relative">
                      <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-sm">
                        {milestone.year}
                      </div>
                    </div>
                    <div className="pt-3">
                      <h4 className="font-semibold text-lg">{milestone.title}</h4>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
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
            className="max-w-4xl mx-auto text-center p-12 rounded-3xl bg-gradient-primary relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-30" />
            <div className="relative z-10">
              <h2
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ready to Find Your Perfect Scholarship?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of students who've discovered life-changing opportunities through Up Scholar's AI-powered platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/scholarships">Browse Scholarships</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to="/ai-research">Try AI Research</Link>
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
