import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Check, 
  X, 
  MessageCircle, 
  Sparkles, 
  Crown, 
  Building2,
  Search,
  FileText,
  GraduationCap,
  Shield,
  Bell,
  Bookmark,
  BarChart3,
  Headphones,
  Users,
  Palette,
  Code,
  UserCheck,
  Puzzle,
  Clock,
  Zap,
  Brain,
  Target,
  Globe,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const WHATSAPP_NUMBER = "923436148715";

const plans = [
  {
    name: "Free",
    description: "Get started with basic scholarship discovery",
    price: "0",
    currency: "PKR",
    period: "forever",
    icon: Sparkles,
    features: [
      "Basic scholarship search",
      "View up to 10 scholarships/day",
      "Email notifications",
      "Community support",
      "1 free AI search trial",
    ],
    highlighted: false,
    buttonText: "Current Plan",
    disabled: true,
  },
  {
    name: "Premium",
    description: "Complete toolkit for serious scholarship hunters",
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
      "Real-time deadline alerts",
    ],
    highlighted: true,
    buttonText: "Upgrade via WhatsApp",
    disabled: false,
  },
  {
    name: "Enterprise",
    description: "For institutions, counselors & organizations",
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

const premiumFeatureDetails = [
  {
    id: "ai-search",
    icon: Search,
    name: "Unlimited AI Scholarship Search",
    shortDesc: "Find perfect scholarships with AI-powered smart search",
    fullDescription: `Our AI-powered scholarship search uses advanced machine learning to understand your query in natural language and find the most relevant scholarships from our database of 10,000+ opportunities worldwide.`,
    benefits: [
      "Search in natural language: 'Fully funded CS masters in Germany for Pakistani students'",
      "AI analyzes eligibility, deadlines, funding amount, and requirements",
      "Get personalized recommendations based on your profile",
      "Real-time updates with fresh scholarship data",
      "Filter by country, field, degree level, and funding type",
    ],
    howItWorks: "Simply type your requirements in plain English/Urdu. Our AI processes your query, matches it against thousands of scholarships, and returns the most relevant opportunities with complete details including deadlines, eligibility, and application links.",
    freeLimit: "1 search",
    premiumAccess: "Unlimited searches",
  },
  {
    id: "document-review",
    icon: FileText,
    name: "AI Document Review & Optimization",
    shortDesc: "Get your SOP, CV, and essays reviewed by AI",
    fullDescription: `Upload your Statement of Purpose (SOP), CV, motivation letters, or research proposals and get instant AI-powered feedback to improve your application documents.`,
    benefits: [
      "Detailed analysis of your SOP structure and content",
      "Grammar, clarity, and impact score assessment",
      "Specific suggestions for improvement",
      "Comparison with successful application templates",
      "Tips tailored to your target university/scholarship",
    ],
    howItWorks: "Upload your document (PDF, DOC, or paste text). Our AI analyzes it against successful scholarship applications, identifies weaknesses, and provides actionable feedback to strengthen your application.",
    freeLimit: "1 document",
    premiumAccess: "Unlimited reviews",
  },
  {
    id: "faculty-search",
    icon: GraduationCap,
    name: "Faculty Search & Matching",
    shortDesc: "Find and connect with professors in your field",
    fullDescription: `Discover faculty members at top universities whose research aligns with your interests. Perfect for PhD applicants and research-based scholarships.`,
    benefits: [
      "Search professors by research area and expertise",
      "Get faculty contact information and profiles",
      "View recent publications and research focus",
      "AI-suggested professors based on your interests",
      "Email templates for reaching out to professors",
    ],
    howItWorks: "Enter your research interests or field of study. Our system searches university databases to find professors actively working in your area, complete with their recent papers, lab information, and contact details.",
    freeLimit: "1 search",
    premiumAccess: "Unlimited searches",
  },
  {
    id: "hec-verification",
    icon: Shield,
    name: "HEC Verification Tools",
    shortDesc: "Verify university recognition and degree attestation",
    fullDescription: `Check if your target university is recognized by Pakistan's Higher Education Commission (HEC) and understand the degree attestation requirements for foreign degrees.`,
    benefits: [
      "Instant HEC recognition status check for any university",
      "Degree attestation requirement guidelines",
      "List of HEC-recognized foreign universities by country",
      "Equivalence certificate requirements",
      "Step-by-step attestation process guide",
    ],
    howItWorks: "Enter the university name to instantly check its HEC recognition status. Get detailed information about degree attestation requirements and whether your foreign degree will be valid in Pakistan.",
    freeLimit: "1 verification",
    premiumAccess: "Unlimited verifications",
  },
  {
    id: "save-scholarships",
    icon: Bookmark,
    name: "Save & Organize Scholarships",
    shortDesc: "Bookmark and track your favorite opportunities",
    fullDescription: `Save scholarships you're interested in, organize them into folders, and never miss a deadline with our tracking system.`,
    benefits: [
      "Unlimited scholarship bookmarks",
      "Organize with custom folders and tags",
      "Deadline tracking with calendar sync",
      "Application status tracking",
      "Notes and progress for each scholarship",
    ],
    howItWorks: "Click the bookmark icon on any scholarship to save it. Organize your saved scholarships into custom folders, add notes, and track your application progress all in one place.",
    freeLimit: "5 scholarships",
    premiumAccess: "Unlimited saves",
  },
  {
    id: "priority-support",
    icon: Headphones,
    name: "Priority Support",
    shortDesc: "Get faster responses and dedicated assistance",
    fullDescription: `Premium users get priority access to our support team with faster response times and dedicated assistance for their scholarship journey.`,
    benefits: [
      "Response within 2 hours (vs 24 hours for free)",
      "Direct WhatsApp support line",
      "Personalized guidance from experts",
      "Application review assistance",
      "Interview preparation tips",
    ],
    howItWorks: "Reach out via WhatsApp or email and get priority response. Our team of scholarship experts will personally assist you with any questions or challenges in your application journey.",
    freeLimit: "Community support",
    premiumAccess: "Priority 2-hour response",
  },
  {
    id: "advanced-filters",
    icon: BarChart3,
    name: "Advanced Filters & Analytics",
    shortDesc: "Deep insights and powerful search filters",
    fullDescription: `Access advanced filtering options and analytics to make data-driven decisions about your scholarship applications.`,
    benefits: [
      "Filter by GPA requirements, language, and more",
      "Success rate statistics for scholarships",
      "Competition level indicators",
      "Historical acceptance data",
      "Personalized success probability score",
    ],
    howItWorks: "Use our advanced filter panel to narrow down scholarships by specific criteria. View analytics showing competition levels, success rates, and get a personalized probability score for each opportunity.",
    freeLimit: "Basic filters only",
    premiumAccess: "All advanced filters",
  },
  {
    id: "deadline-alerts",
    icon: Bell,
    name: "Real-time Deadline Alerts",
    shortDesc: "Never miss a scholarship deadline again",
    fullDescription: `Get personalized notifications for upcoming deadlines, new scholarships matching your profile, and important updates.`,
    benefits: [
      "Email and WhatsApp deadline reminders",
      "Customizable reminder schedule (1 week, 3 days, 1 day)",
      "New scholarship alerts matching your interests",
      "Application submission reminders",
      "Result announcement notifications",
    ],
    howItWorks: "Set up your alert preferences and we'll notify you about important deadlines, new opportunities matching your criteria, and updates on scholarships you're tracking.",
    freeLimit: "Email only",
    premiumAccess: "Email + WhatsApp alerts",
  },
];

const enterpriseFeatures = [
  {
    icon: Users,
    name: "Multi-user Access",
    description: "Add up to 10 team members (counselors, staff) with role-based permissions. Perfect for educational consultancies and school counseling departments.",
  },
  {
    icon: Palette,
    name: "Custom Branding",
    description: "White-label the platform with your institution's logo, colors, and domain. Present it as your own scholarship portal to students.",
  },
  {
    icon: Code,
    name: "API Access",
    description: "Integrate scholarship data directly into your existing systems. Build custom applications using our comprehensive API.",
  },
  {
    icon: UserCheck,
    name: "Dedicated Account Manager",
    description: "Get a personal account manager who understands your institution's needs and helps maximize the platform's value.",
  },
  {
    icon: Puzzle,
    name: "Custom Integrations",
    description: "Connect with your existing CRM, student management system, or any other tools you use. We'll build custom integrations for you.",
  },
  {
    icon: Clock,
    name: "SLA Guarantee",
    description: "99.9% uptime guarantee with priority bug fixes and dedicated technical support. Service Level Agreement included.",
  },
];

const comparisonFeatures = [
  { name: "Scholarship Search", free: true, premium: true, enterprise: true },
  { name: "Daily Search Limit", free: "10/day", premium: "Unlimited", enterprise: "Unlimited" },
  { name: "AI Searches", free: "1 trial", premium: "Unlimited", enterprise: "Unlimited" },
  { name: "Save Scholarships", free: "5 max", premium: "Unlimited", enterprise: "Unlimited" },
  { name: "Email Notifications", free: true, premium: true, enterprise: true },
  { name: "WhatsApp Alerts", free: false, premium: true, enterprise: true },
  { name: "AI Document Review", free: "1 trial", premium: "Unlimited", enterprise: "Unlimited" },
  { name: "Faculty Search & Matching", free: "1 trial", premium: "Unlimited", enterprise: "Unlimited" },
  { name: "HEC Verification Tools", free: "1 trial", premium: "Unlimited", enterprise: "Unlimited" },
  { name: "Advanced Filters", free: false, premium: true, enterprise: true },
  { name: "Analytics Dashboard", free: false, premium: true, enterprise: true },
  { name: "Priority Support", free: false, premium: "2-hour response", enterprise: "1-hour response" },
  { name: "Multi-user Access", free: false, premium: false, enterprise: "Up to 10" },
  { name: "Custom Branding", free: false, premium: false, enterprise: true },
  { name: "API Access", free: false, premium: false, enterprise: true },
  { name: "Dedicated Account Manager", free: false, premium: false, enterprise: true },
  { name: "Custom Integrations", free: false, premium: false, enterprise: true },
  { name: "SLA Guarantee", free: false, premium: false, enterprise: true },
];

const generateWhatsAppLink = (planName: string, price: string) => {
  const message = encodeURIComponent(
    `Hi! I'm interested in upgrading to the ${planName} plan (${price} PKR/month) on Schola X. Please provide more details about the subscription process.`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
};

const renderCellValue = (value: boolean | string) => {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-5 w-5 text-primary mx-auto" />
    ) : (
      <X className="h-5 w-5 text-muted-foreground/40 mx-auto" />
    );
  }
  return <span className="text-sm font-medium">{value}</span>;
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
              Unlock advanced AI tools to supercharge your scholarship search.
              Every tool includes 1 free trial - experience the power before upgrading!
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

          {/* Premium Features Detailed Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-24 max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <Crown className="h-3 w-3 mr-1" />
                Premium Features
              </Badge>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                What You Get with Premium
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Detailed breakdown of every premium feature - understand exactly how each tool
                helps you win scholarships. Each tool includes 1 free trial!
              </p>
            </div>

            <div className="space-y-6">
              {premiumFeatureDetails.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="overflow-hidden">
                    <Accordion type="single" collapsible>
                      <AccordionItem value={feature.id} className="border-0">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
                          <div className="flex items-center gap-4 text-left">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                              <feature.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg">{feature.name}</h3>
                              <p className="text-sm text-muted-foreground">{feature.shortDesc}</p>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 mr-4">
                              <Badge variant="outline" className="text-xs">
                                Free: {feature.freeLimit}
                              </Badge>
                              <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              <Badge className="bg-primary/10 text-primary text-xs">
                                Premium: {feature.premiumAccess}
                              </Badge>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Brain className="h-4 w-4 text-primary" />
                                What It Does
                              </h4>
                              <p className="text-sm text-muted-foreground mb-4">
                                {feature.fullDescription}
                              </p>
                              
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Zap className="h-4 w-4 text-primary" />
                                How It Works
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {feature.howItWorks}
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3 flex items-center gap-2">
                                <Target className="h-4 w-4 text-primary" />
                                Key Benefits
                              </h4>
                              <ul className="space-y-2">
                                {feature.benefits.map((benefit, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                    <span>{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          
                          {/* Mobile badges */}
                          <div className="flex sm:hidden items-center gap-2 mt-4 pt-4 border-t">
                            <Badge variant="outline" className="text-xs">
                              Free: {feature.freeLimit}
                            </Badge>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            <Badge className="bg-primary/10 text-primary text-xs">
                              Premium: {feature.premiumAccess}
                            </Badge>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Premium CTA */}
            <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-center">
              <h3 className="text-xl font-bold mb-2">Ready to Unlock All Premium Features?</h3>
              <p className="text-muted-foreground mb-4">
                Get unlimited access to all AI tools for just PKR 2,999/month
              </p>
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 gap-2" asChild>
                <a
                  href={generateWhatsAppLink("Premium", "2,999")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  Upgrade to Premium Now
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Enterprise Features Detailed Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-24 max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">
                <Building2 className="h-3 w-3 mr-1" />
                Enterprise Features
              </Badge>
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Enterprise-Grade Solutions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything in Premium, plus powerful features designed for institutions,
                educational consultancies, and counseling departments.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enterpriseFeatures.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="h-full p-6">
                    <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Enterprise CTA */}
            <div className="mt-8 p-6 rounded-2xl bg-muted/50 border text-center">
              <h3 className="text-xl font-bold mb-2">Need Enterprise Solutions?</h3>
              <p className="text-muted-foreground mb-4">
                Contact us for custom pricing and tailored solutions for your institution
              </p>
              <Button size="lg" variant="outline" className="gap-2" asChild>
                <a
                  href={generateWhatsAppLink("Enterprise", "14,999")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  Contact for Enterprise
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-24 max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Compare All Features
              </h2>
              <p className="text-muted-foreground">
                See exactly what you get with each plan at a glance
              </p>
            </div>

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-[300px] font-semibold">Feature</TableHead>
                      <TableHead className="text-center font-semibold">
                        <div className="flex flex-col items-center gap-1">
                          <Sparkles className="h-4 w-4 text-muted-foreground" />
                          Free
                        </div>
                      </TableHead>
                      <TableHead className="text-center font-semibold bg-primary/5">
                        <div className="flex flex-col items-center gap-1">
                          <Crown className="h-4 w-4 text-primary" />
                          Premium
                        </div>
                      </TableHead>
                      <TableHead className="text-center font-semibold">
                        <div className="flex flex-col items-center gap-1">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          Enterprise
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparisonFeatures.map((feature, index) => (
                      <TableRow key={feature.name} className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                        <TableCell className="font-medium">{feature.name}</TableCell>
                        <TableCell className="text-center">{renderCellValue(feature.free)}</TableCell>
                        <TableCell className="text-center bg-primary/5">{renderCellValue(feature.premium)}</TableCell>
                        <TableCell className="text-center">{renderCellValue(feature.enterprise)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>

            {/* CTA below table */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 gap-2"
                asChild
              >
                <a
                  href={generateWhatsAppLink("Premium", "2,999")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  Upgrade to Premium
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                asChild
              >
                <a
                  href={generateWhatsAppLink("Enterprise", "14,999")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  Contact for Enterprise
                </a>
              </Button>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-24 max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Frequently Asked Questions
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="faq-1" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  How does the free trial work?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Every registered user gets 1 free search/use for each AI tool (Scholarship Search, 
                  Document Review, Faculty Search, HEC Verification). This lets you experience the 
                  full power of our AI tools before deciding to upgrade. After using your free trial, 
                  you'll need a Premium subscription for unlimited access.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="faq-2" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  How do I upgrade to Premium?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Simply click the "Upgrade via WhatsApp" button and send us a message. Our team 
                  will guide you through the payment process. We accept JazzCash, EasyPaisa, bank 
                  transfer, and other payment methods. Your Premium access is activated within 
                  minutes after payment confirmation.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="faq-3" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  Can I cancel my subscription anytime?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! You can cancel your subscription at any time via WhatsApp. Your access will 
                  remain active until the end of your current billing period. No hidden fees or 
                  cancellation charges.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="faq-4" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  Is my data secure?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely! We use industry-standard encryption to protect your data. Your 
                  documents uploaded for review are processed securely and never shared with 
                  third parties. We comply with international data protection standards.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="faq-5" className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  What's included in Enterprise plan?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Enterprise includes everything in Premium plus: multi-user access for up to 10 
                  team members, custom branding/white-labeling, API access for integrations, a 
                  dedicated account manager, custom integrations with your existing systems, and 
                  SLA guarantee with priority support.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-center mt-16 max-w-2xl mx-auto"
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10">
              <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Start Your Scholarship Journey Today</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of Pakistani students who have found fully-funded scholarships 
                using Schola X. Have questions? Contact us directly on{" "}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  WhatsApp
                </a>{" "}
                for instant support!
              </p>
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 gap-2" asChild>
                <a
                  href={generateWhatsAppLink("Premium", "2,999")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Crown className="h-5 w-5" />
                  Get Premium Access
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
