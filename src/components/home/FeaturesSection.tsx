import { motion } from "framer-motion";
import { Search, Award, Globe, BookOpen, Users, Lightbulb } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Filters",
    description:
      "Filter by field, degree level, country, and funding amount.",
    color: "from-primary to-primary/60",
  },
  {
    icon: Award,
    title: "Verified Sources",
    description:
      "Data from official .gov, .edu, and .org websites only.",
    color: "from-accent to-accent/60",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description:
      "Scholarships from 120+ countries and top institutions.",
    color: "from-info to-info/60",
  },
  {
    icon: BookOpen,
    title: "Faculty Search",
    description:
      "Find professors and research supervisors at target universities.",
    color: "from-success to-success/60",
  },
  {
    icon: Users,
    title: "HEC Verification",
    description:
      "Check if universities are recognized by Pakistan's HEC.",
    color: "from-warning to-warning/60",
  },
  {
    icon: Lightbulb,
    title: "Document Review",
    description:
      "AI-powered feedback on SOPs and research proposals.",
    color: "from-destructive to-destructive/60",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function FeaturesSection() {
  return (
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.1),transparent_50%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
            Features
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What You <span className="text-gradient">Get</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Tools built for serious scholarship applicants.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
                {/* Icon */}
                <div
                  className={`inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-primary rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
