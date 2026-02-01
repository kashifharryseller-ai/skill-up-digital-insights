import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Handshake, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="relative rounded-3xl bg-gradient-primary p-1 shadow-2xl shadow-primary/25">
            <div className="rounded-[22px] bg-gradient-primary p-10 md:p-16 text-center relative overflow-hidden">
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]" />

              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 mb-8"
                >
                  <Sparkles className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">
                    Free to Start • 1 AI Search Included
                  </span>
                </motion.div>

                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Unlock Your Scholarship Journey
                </h2>

                <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
                  Access AI-powered scholarship matching, real-time requirements, 
                  and complete application strategies — all from verified sources.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="h-14 px-8 text-base gap-2 group bg-white text-primary hover:bg-white/90"
                    asChild
                  >
                    <Link to="/ai-research">
                      Start AI Research
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-14 px-8 text-base border-white/30 text-white hover:bg-white/10"
                    asChild
                  >
                    <Link to="/scholarships">Browse Scholarships</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Partnership & Investment Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto"
        >
          {/* For Strategic Partners */}
          <Link 
            to="/partners"
            className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Handshake className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl mb-2 flex items-center gap-2">
                  Partner With Us
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-muted-foreground">
                  Universities, NGOs, and educational organizations — collaborate to expand 
                  student opportunities and integrate with our AI platform.
                </p>
              </div>
            </div>
          </Link>

          {/* For Investors */}
          <Link 
            to="/investors"
            className="group p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl bg-gradient-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-xl mb-2 flex items-center gap-2">
                  Investor Relations
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h3>
                <p className="text-muted-foreground">
                  Explore investment opportunities in AI-powered EdTech with proven traction, 
                  clear unit economics, and global market potential.
                </p>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
