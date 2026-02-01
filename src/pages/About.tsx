import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Target, Eye, Heart, Linkedin, Twitter, Mail } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To democratize access to quality education by connecting students with scholarships and programs that match their potential and aspirations.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "A world where financial barriers never prevent talented individuals from achieving their educational dreams and reaching their full potential.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "Integrity, accessibility, innovation, and student success drive everything we do. We believe every student deserves the opportunity to excel.",
  },
];

const team = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
    bio: "Former Harvard professor with 20+ years in education technology.",
  },
  {
    name: "Michael Chen",
    role: "Chief Technology Officer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    bio: "Ex-Google engineer passionate about EdTech innovation.",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Partnerships",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
    bio: "Built scholarship networks across 50+ countries.",
  },
  {
    name: "James Williams",
    role: "Director of Student Success",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
    bio: "Dedicated to helping students navigate their educational journey.",
  },
];

const milestones = [
  { year: "2018", title: "Founded", description: "ScholarFind was born from a simple idea" },
  { year: "2019", title: "10K Users", description: "Reached our first major milestone" },
  { year: "2021", title: "$5M Scholarships", description: "Helped award $5M in scholarships" },
  { year: "2023", title: "Global Expansion", description: "Expanded to 120+ countries" },
  { year: "2026", title: "50K+ Students", description: "Serving 50,000+ active students" },
];

export default function About() {
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
              About Us
            </Badge>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Empowering Dreams Through{" "}
              <span className="text-gradient">Education</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We're on a mission to make quality education accessible to everyone,
              everywhere. Join us in transforming lives through opportunity.
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
                From a Simple Idea to a{" "}
                <span className="text-gradient">Global Movement</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  ScholarFind was founded in 2018 by Dr. Sarah Mitchell, who witnessed
                  firsthand how talented students were missing out on life-changing
                  opportunities simply because they didn't know they existed.
                </p>
                <p>
                  What started as a simple database of scholarships has grown into a
                  comprehensive education platform serving over 50,000 students across
                  120+ countries.
                </p>
                <p>
                  Today, we partner with leading universities, foundations, and
                  organizations worldwide to ensure that every student has access to
                  the resources they need to succeed.
                </p>
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
              Meet the <span className="text-gradient">Experts</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our passionate team of educators, technologists, and dreamers working
              together to transform education access.
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
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
                  <div className="relative mb-6 mx-auto w-32 h-32">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover ring-4 ring-primary/10 group-hover:ring-primary/30 transition-all"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-3">
                    <a
                      href="#"
                      className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
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
