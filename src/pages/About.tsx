import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Target, Eye, Heart, Linkedin, Mail, Phone } from "lucide-react";
import { Helmet } from "react-helmet-async";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Connect students with scholarships and programs matching their goals.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "Remove financial barriers so every student can achieve their educational dreams.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Integrity, accessibility, and student success drive everything we do.",
  },
];

const team = [
  {
    name: "Malik Kashif",
    role: "Co-Founder & Software Engineer",
    location: "Lahore, Pakistan",
    bio: "Full-stack developer focused on building accessible education technology.",
  },
  {
    name: "Inam Ul Haq",
    role: "Co-Founder & Software Engineer",
    location: "Lahore, Pakistan",
    bio: "Software engineer passionate about helping students find opportunities.",
  },
];

const milestones = [
  { year: "2026", title: "Founded", description: "Up Scholar launched by Skill Up Digital Solutions" },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Skill Up Digital Solutions",
  description: "Up Scholar - Scholarship search platform connecting students with educational funding opportunities",
  url: "https://upscholar.com",
  foundingDate: "2026",
  founders: [
    { "@type": "Person", name: "Malik Kashif", jobTitle: "Co-Founder & Software Engineer" },
    { "@type": "Person", name: "Inam Ul Haq", jobTitle: "Co-Founder & Software Engineer" },
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
        <title>About Up Scholar - Skill Up Digital Solutions</title>
        <meta name="description" content="Up Scholar by Skill Up Digital Solutions helps students find scholarships. Founded by Malik Kashif and Inam Ul Haq, software engineers from Lahore, Pakistan." />
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
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              About Us
            </Badge>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              About <span className="text-gradient">Up Scholar</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              A scholarship search platform by Skill Up Digital Solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all"
              >
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary mb-6">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
                Our Story
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Why We Built <span className="text-gradient">Up Scholar</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We noticed students struggle to find scholarship information. Many miss deadlines or never learn about opportunities that match their profile.
                </p>
                <p>
                  Up Scholar aggregates scholarships from universities, governments, and organizations into one searchable platform.
                </p>
                <p>
                  Our AI-powered search helps you find relevant scholarships faster.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="mt-8 p-4 rounded-xl bg-card border border-border/50">
                <h3 className="font-semibold mb-3">Contact Us</h3>
                <div className="space-y-2 text-sm">
                  <a href="https://wa.me/923436148715" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Phone className="h-4 w-4" />
                    <span>+92 343 6148715 (WhatsApp)</span>
                  </a>
                  <a href="mailto:harryseller9@gmail.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Mail className="h-4 w-4" />
                    <span>harryseller9@gmail.com</span>
                  </a>
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

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
              Our Team
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Meet the <span className="text-gradient">Founders</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Software engineers from Lahore, Pakistan building tools for students.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 max-w-2xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all">
                  <div className="relative mb-6 mx-auto w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-1">{member.role}</p>
                  <p className="text-muted-foreground text-xs mb-3">{member.location}</p>
                  <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-3">
                    <a
                      href="https://wa.me/923436148715"
                      className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={`Contact ${member.name} on WhatsApp`}
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                    <a
                      href="mailto:harryseller9@gmail.com"
                      className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
