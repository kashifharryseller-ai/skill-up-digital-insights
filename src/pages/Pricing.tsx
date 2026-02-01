import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, MessageCircle, Sparkles, Crown, Building2 } from "lucide-react";

const WHATSAPP_NUMBER = "923436148715";

const plans = [
  {
    name: "Free",
    description: "Basic scholarship search",
    price: "0",
    currency: "PKR",
    period: "forever",
    icon: Sparkles,
    features: [
      "Basic scholarship search",
      "View up to 10 scholarships/day",
      "Email notifications",
      "Community support",
    ],
    highlighted: false,
    buttonText: "Current Plan",
    disabled: true,
  },
  {
    name: "Premium",
    description: "Advanced features for serious applicants",
    price: "2,999",
    currency: "PKR",
    period: "/month",
    icon: Crown,
    features: [
      "Unlimited scholarship searches",
      "AI-powered document review",
      "Faculty search & matching",
      "HEC verification tools",
      "Priority email support",
      "Save unlimited scholarships",
      "Advanced filters & analytics",
    ],
    highlighted: true,
    buttonText: "Upgrade via WhatsApp",
    disabled: false,
  },
  {
    name: "Enterprise",
    description: "For institutions & counselors",
    price: "14,999",
    currency: "PKR",
    period: "/month",
    icon: Building2,
    features: [
      "Everything in Premium",
      "Multi-user access (up to 10)",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "Training & onboarding",
      "SLA guarantee",
    ],
    highlighted: false,
    buttonText: "Contact Sales",
    disabled: false,
  },
];

const generateWhatsAppLink = (planName: string, price: string) => {
  const message = encodeURIComponent(
    `Hi! I'm interested in upgrading to the ${planName} plan (${price} PKR/month) on Up Scholar. Please provide more details about the subscription process.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              Pricing Plans
            </Badge>
            <h1
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Choose Your Plan
            </h1>
            <p className="text-lg text-muted-foreground">
              Unlock advanced features to supercharge your scholarship search.
              Contact us via WhatsApp for instant support.
            </p>
          </motion.div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`relative h-full flex flex-col ${
                    plan.highlighted
                      ? "border-primary shadow-lg shadow-primary/20 scale-105"
                      : "border-border"
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-primary text-primary-foreground">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`mx-auto w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                        plan.highlighted
                          ? "bg-gradient-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <plan.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="text-center mb-6">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">
                        {plan.currency}
                      </span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    {plan.disabled ? (
                      <Button
                        variant="outline"
                        className="w-full"
                        disabled
                      >
                        {plan.buttonText}
                      </Button>
                    ) : (
                      <Button
                        className={`w-full gap-2 ${
                          plan.highlighted
                            ? "bg-gradient-primary hover:opacity-90"
                            : ""
                        }`}
                        variant={plan.highlighted ? "default" : "outline"}
                        asChild
                      >
                        <a
                          href={generateWhatsAppLink(plan.name, plan.price)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="h-4 w-4" />
                          {plan.buttonText}
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* FAQ or Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16 max-w-2xl mx-auto"
          >
            <p className="text-muted-foreground">
              Have questions? Contact us directly on{" "}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                WhatsApp
              </a>{" "}
              for instant support. We typically respond within minutes!
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
