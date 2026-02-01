import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  Users,
  Globe,
  DollarSign,
  Target,
  Zap,
  Shield,
  BarChart3,
  ArrowRight,
  Mail,
  Phone,
  Building2,
  Sparkles,
  Award,
  Rocket,
  PieChart,
  LineChart,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const keyMetrics = [
  { icon: Users, value: "10K+", label: "Active Users", growth: "+150%" },
  { icon: Globe, value: "50+", label: "Countries", growth: "+200%" },
  { icon: DollarSign, value: "$5M+", label: "Scholarships Found", growth: "+300%" },
  { icon: BarChart3, value: "99%", label: "User Satisfaction", growth: "Stable" },
];

const investmentHighlights = [
  {
    icon: Target,
    title: "Massive Market Opportunity",
    description: "Global EdTech market projected to reach $400B by 2028. AI in education growing at 45% CAGR.",
  },
  {
    icon: Zap,
    title: "Proprietary AI Technology",
    description: "Advanced matching algorithms and NLP processing differentiate us from traditional scholarship databases.",
  },
  {
    icon: Users,
    title: "Strong User Growth",
    description: "150% month-over-month growth with high engagement rates and strong retention metrics.",
  },
  {
    icon: Shield,
    title: "Sustainable Business Model",
    description: "Multiple revenue streams including premium subscriptions, B2B partnerships, and university affiliations.",
  },
];

const useCases = [
  {
    title: "For Students",
    description: "AI-powered scholarship matching, application assistance, and research tools.",
    metrics: "10K+ students served",
  },
  {
    title: "For Universities",
    description: "Student recruitment, diversity initiatives, and scholarship program management.",
    metrics: "20+ partner institutions",
  },
  {
    title: "For Organizations",
    description: "Scholarship program creation, applicant management, and impact reporting.",
    metrics: "$5M+ scholarships processed",
  },
];

const fundingDetails = {
  stage: "Seed Round",
  target: "$500K - $1M",
  use: ["AI/ML Development", "Team Expansion", "Market Growth", "Infrastructure"],
};

const team = [
  {
    name: "Malik Kashif",
    role: "CEO & Founder",
    expertise: "Product Strategy, Full-Stack Development, Business Operations",
    linkedin: "#",
  },
  {
    name: "Inam Ul Haq",
    role: "Co-Founder & CTO",
    expertise: "Backend Architecture, AI/ML Integration, System Design",
    linkedin: "#",
  },
];

const roadmap = [
  { phase: "Q1 2026", title: "Launch", items: ["Platform MVP", "Initial user acquisition", "Core AI features"] },
  { phase: "Q2 2026", title: "Growth", items: ["10K users milestone", "University partnerships", "Premium tier launch"] },
  { phase: "Q3 2026", title: "Scale", items: ["B2B offerings", "API integrations", "International expansion"] },
  { phase: "Q4 2026", title: "Expand", items: ["Mobile apps", "Enterprise solutions", "Additional AI tools"] },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Investor Relations - Up Scholar",
  description: "Investment opportunities in Up Scholar - AI-powered education technology platform. Seed round funding for EdTech innovation.",
  url: "https://upscholar.com/investors",
};

export default function Investors() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Investors & Sponsors - Up Scholar | AI EdTech Investment Opportunity</title>
        <meta name="description" content="Invest in Up Scholar - AI-powered education technology platform. Join our seed round and help democratize access to education funding worldwide." />
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
              <TrendingUp className="h-3 w-3" />
              Investment Opportunity
            </Badge>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Invest in the Future of{" "}
              <span className="text-gradient">AI-Powered Education</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Up Scholar is revolutionizing how students discover and access educational funding. 
              Join us in democratizing education through artificial intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 gap-2" asChild>
                <a href="mailto:harryseller9@gmail.com?subject=Investment%20Inquiry">
                  <Mail className="h-4 w-4" />
                  Contact for Investment
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="https://wa.me/923436148715" target="_blank" rel="noopener noreferrer">
                  <Phone className="h-4 w-4 mr-2" />
                  Schedule a Call
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-8 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {keyMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 mb-3">
                  <metric.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{metric.value}</div>
                <div className="text-sm text-background/70 mb-1">{metric.label}</div>
                <Badge variant="secondary" className="bg-primary/20 text-primary text-xs">
                  {metric.growth}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 gap-2">
              <Sparkles className="h-3 w-3" />
              Why Invest
            </Badge>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Investment <span className="text-gradient">Highlights</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Up Scholar combines cutting-edge AI technology with a massive market opportunity in the EdTech sector.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {investmentHighlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all group"
              >
                <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 gap-2">
                <PieChart className="h-3 w-3" />
                Market Analysis
              </Badge>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Massive <span className="text-gradient">Market Opportunity</span>
              </h2>
              <div className="space-y-6">
                <div className="p-4 rounded-xl bg-card border border-border/50">
                  <div className="flex items-center gap-3 mb-2">
                    <LineChart className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Global EdTech Market</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Projected to reach <span className="font-bold text-foreground">$400 billion</span> by 2028, 
                    growing at 13.4% CAGR.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/50">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">AI in Education</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    AI segment growing at <span className="font-bold text-foreground">45% CAGR</span>, 
                    expected to reach $25B by 2030.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-card border border-border/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="h-5 w-5 text-primary" />
                    <h4 className="font-semibold">Scholarship Market</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Over <span className="font-bold text-foreground">$46 billion</span> in scholarships 
                    awarded annually, with fragmented discovery.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="p-8 rounded-2xl bg-card border border-border/50">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  Use Cases & Traction
                </h3>
                <div className="space-y-4">
                  {useCases.map((useCase, index) => (
                    <div key={index} className="p-4 rounded-xl bg-muted/50">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{useCase.title}</h4>
                        <Badge variant="secondary" className="text-xs">{useCase.metrics}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{useCase.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Funding Details */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 gap-2">
                <DollarSign className="h-3 w-3" />
                Current Round
              </Badge>
              <h2
                className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <span className="text-gradient">Seed Round</span> Funding
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="p-8 rounded-2xl bg-gradient-primary text-white">
                <h3 className="text-2xl font-bold mb-2">Raising</h3>
                <div className="text-4xl font-bold mb-4">{fundingDetails.target}</div>
                <p className="text-white/80 text-sm">
                  Seed round to accelerate growth, expand AI capabilities, and scale internationally.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-card border border-border/50">
                <h3 className="text-xl font-semibold mb-4">Use of Funds</h3>
                <div className="space-y-3">
                  {fundingDetails.use.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 gap-2">
              <Award className="h-3 w-3" />
              Leadership
            </Badge>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Meet the <span className="text-gradient">Team</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <span className="text-xl font-bold text-primary-foreground">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-primary text-sm">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{member.expertise}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 gap-2">
              <Rocket className="h-3 w-3" />
              Roadmap
            </Badge>
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our <span className="text-gradient">Growth Plan</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {roadmap.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all"
              >
                <Badge className="mb-3 bg-primary/10 text-primary">{phase.phase}</Badge>
                <h3 className="font-semibold text-lg mb-3">{phase.title}</h3>
                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/30">
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
                Ready to Join Our Journey?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                We're looking for strategic investors who share our vision of democratizing education access through AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90 gap-2" asChild>
                  <a href="mailto:harryseller9@gmail.com?subject=Investment%20Inquiry%20-%20Up%20Scholar">
                    <Mail className="h-4 w-4" />
                    Get Investment Deck
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 gap-2" asChild>
                  <a href="https://wa.me/923436148715" target="_blank" rel="noopener noreferrer">
                    <Phone className="h-4 w-4" />
                    Schedule Meeting
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
