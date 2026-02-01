import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { 
  HelpCircle, 
  Search, 
  GraduationCap, 
  FileText, 
  Brain, 
  CreditCard, 
  Shield, 
  MessageCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

const faqCategories = [
  {
    id: "scholarships",
    icon: GraduationCap,
    title: "Scholarships & Opportunities",
    description: "Finding and applying for scholarships",
    faqs: [
      {
        question: "How do I find scholarships that match my profile?",
        answer: "Use our AI-powered scholarship search on the AI Research page. Simply describe your background, field of study, target country, and preferences in natural language (e.g., 'Fully funded CS masters in Germany for Pakistani students'). Our AI analyzes thousands of scholarships and returns the most relevant matches with eligibility details, deadlines, and application links."
      },
      {
        question: "Are the scholarships on Up Scholar verified?",
        answer: "Yes! We only list scholarships from verified official sources — university websites, government portals, and established scholarship organizations. Our AI regularly updates the database to ensure accuracy of deadlines and requirements. Each scholarship includes a direct link to the official source."
      },
      {
        question: "What types of scholarships are available?",
        answer: "We cover all types: fully-funded scholarships (tuition + living expenses), partial scholarships, tuition waivers, research grants, government-sponsored programs (Fulbright, DAAD, Chevening, etc.), university-specific awards, and need-based financial aid. You can filter by funding type, country, field of study, and degree level."
      },
      {
        question: "How often are new scholarships added?",
        answer: "Our database is updated daily with new opportunities. We track scholarship announcements from 500+ universities and organizations worldwide. Subscribe to our newsletter or enable notifications to get alerts when new scholarships matching your profile are added."
      },
      {
        question: "Can I save scholarships for later?",
        answer: "Yes! Free users can save up to 5 scholarships. Premium users get unlimited saves with folder organization, deadline tracking, application status notes, and calendar sync. Click the bookmark icon on any scholarship to save it to your profile."
      },
      {
        question: "What countries' scholarships do you cover?",
        answer: "We cover scholarships in 50+ countries including USA, UK, Germany, Canada, Australia, China, Japan, South Korea, Turkey, Malaysia, and many more. You can filter by country or search for specific regions."
      }
    ]
  },
  {
    id: "applications",
    icon: FileText,
    title: "Application Process",
    description: "Preparing and submitting applications",
    faqs: [
      {
        question: "How do I write a strong Statement of Purpose (SOP)?",
        answer: "A strong SOP should: 1) Hook the reader with your motivation, 2) Describe your academic/professional background, 3) Explain why this specific program/scholarship, 4) Outline your future goals, 5) Connect everything coherently. Use our AI Document Review tool to get instant feedback on your SOP structure, clarity, and impact."
      },
      {
        question: "What documents are typically required for scholarship applications?",
        answer: "Common requirements include: Academic transcripts, Degree certificates, Statement of Purpose/Motivation Letter, CV/Resume, Letters of Recommendation (2-3), Language proficiency scores (IELTS/TOEFL), Standardized test scores (GRE/GMAT if required), Passport copy, and sometimes a Research Proposal for PhD programs."
      },
      {
        question: "How can I improve my chances of getting selected?",
        answer: "Key tips: 1) Apply early — don't wait for deadlines, 2) Tailor each application to the specific program, 3) Get your documents reviewed professionally, 4) Highlight unique experiences and achievements, 5) Ensure strong recommendation letters from relevant people, 6) Prepare thoroughly for interviews, 7) Follow all instructions precisely."
      },
      {
        question: "What GPA do I need for competitive scholarships?",
        answer: "Requirements vary widely. Top scholarships (Fulbright, Rhodes) typically expect 3.5+ GPA. Many good scholarships accept 3.0+ GPA. Some focus more on research potential, leadership, or community service. Always check specific eligibility criteria — a lower GPA can sometimes be offset by strong research, work experience, or other achievements."
      },
      {
        question: "How important are recommendation letters?",
        answer: "Very important! Strong recommendation letters can significantly boost your application. Choose recommenders who know your work well (professors, supervisors, mentors). Give them at least 4-6 weeks notice. Provide them with your CV, SOP, and specific points you'd like them to highlight."
      },
      {
        question: "Should I contact professors before applying for PhD?",
        answer: "Absolutely! For research-based programs, reaching out to potential supervisors is crucial. Use our Faculty Search tool to find professors in your field. Send a personalized email mentioning specific papers of theirs, explain your research interests, and ask if they're accepting students. A positive response greatly increases admission chances."
      }
    ]
  },
  {
    id: "ai-tools",
    icon: Brain,
    title: "AI Research Tools",
    description: "Using our AI-powered features",
    faqs: [
      {
        question: "What AI tools does Up Scholar offer?",
        answer: "We offer 4 powerful AI tools: 1) AI Scholarship Search — find scholarships using natural language, 2) AI Document Review — get feedback on your SOP, CV, and essays, 3) Faculty Search — find professors matching your research interests, 4) HEC Verification — check university recognition status. Each tool includes 1 free trial for new users."
      },
      {
        question: "How does the AI Scholarship Search work?",
        answer: "Our AI understands natural language queries. Simply type what you're looking for (e.g., 'Engineering scholarships in Canada for Fall 2026') and our AI searches our database, analyzes eligibility criteria, and returns the best matches. It considers your profile, preferences, and constraints to provide personalized recommendations."
      },
      {
        question: "What can the AI Document Review analyze?",
        answer: "Upload your Statement of Purpose, CV, Motivation Letter, or Research Proposal. Our AI analyzes: Structure and flow, Grammar and clarity, Content relevance, Impact and persuasiveness, Comparison with successful applications. You get specific suggestions for improvement with before/after examples."
      },
      {
        question: "How accurate is the Faculty Search?",
        answer: "Faculty Search pulls data from university websites and academic databases. It shows professors' research areas, recent publications, lab information, and contact details. While highly accurate, we recommend verifying professor availability directly, as faculty positions can change."
      },
      {
        question: "Do I need to pay for AI tools?",
        answer: "Every registered user gets 1 free search/use for each AI tool — no payment required. This lets you experience the full power of our AI before deciding. For unlimited access to all AI tools, upgrade to Premium (PKR 2,999/month) via WhatsApp."
      },
      {
        question: "Is my uploaded data secure?",
        answer: "Absolutely. We use industry-standard encryption. Your documents are processed securely and never shared with third parties. Uploaded documents are automatically deleted after processing. We comply with international data protection standards."
      }
    ]
  },
  {
    id: "pricing",
    icon: CreditCard,
    title: "Pricing & Subscriptions",
    description: "Plans, payments, and upgrades",
    faqs: [
      {
        question: "What's included in the Free plan?",
        answer: "Free users get: Basic scholarship search (10/day limit), Save up to 5 scholarships, Email notifications, 1 free trial for each AI tool (Scholarship Search, Document Review, Faculty Search, HEC Verification), and Community support. It's enough to explore the platform and experience our AI tools."
      },
      {
        question: "What's included in Premium (PKR 2,999/month)?",
        answer: "Premium unlocks: Unlimited AI searches across all tools, Unlimited scholarship saves with folders, Advanced filters and analytics, Real-time WhatsApp deadline alerts, Priority support (2-hour response), Success probability scores, and Full document review access. Best for serious scholarship applicants."
      },
      {
        question: "How do I upgrade to Premium?",
        answer: "Click any 'Upgrade' button or go to the Pricing page and click 'Upgrade via WhatsApp'. You'll be connected with our team who will guide you through payment (JazzCash, EasyPaisa, bank transfer accepted). Your Premium access is activated within minutes of payment confirmation."
      },
      {
        question: "Can I cancel my subscription?",
        answer: "Yes! Contact us via WhatsApp to cancel anytime. Your access continues until the end of your current billing period. No hidden fees or cancellation charges. You can re-subscribe anytime in the future."
      },
      {
        question: "Do you offer refunds?",
        answer: "We offer a 7-day money-back guarantee for new Premium subscribers. If you're not satisfied with the service within the first 7 days, contact us for a full refund. After 7 days, refunds are evaluated on a case-by-case basis."
      },
      {
        question: "What is the Enterprise plan for?",
        answer: "Enterprise (PKR 14,999/month) is designed for educational consultancies, school counseling departments, and organizations. It includes everything in Premium plus: Multi-user access (up to 10 seats), Custom branding/white-labeling, API access, Dedicated account manager, Custom integrations, and SLA guarantee."
      }
    ]
  },
  {
    id: "account",
    icon: Shield,
    title: "Account & Security",
    description: "Registration, login, and data",
    faqs: [
      {
        question: "How do I create an account?",
        answer: "Click 'Get Started' or 'Sign In' on the navbar. Enter your email and create a password. We'll send a verification email — click the link to activate your account. You can also sign in with Google for faster registration. Note: Temporary/disposable emails are not accepted."
      },
      {
        question: "I didn't receive the verification email. What should I do?",
        answer: "Check your spam/junk folder first. If not there, try: 1) Wait a few minutes — emails can be delayed, 2) Click 'Resend verification email' on the login page, 3) Make sure you entered the correct email address, 4) Contact support via WhatsApp if the issue persists."
      },
      {
        question: "How do I reset my password?",
        answer: "Click 'Sign In', then 'Forgot Password'. Enter your registered email address and we'll send a password reset link. Click the link and create a new password. The link expires in 1 hour for security."
      },
      {
        question: "Is my personal information safe?",
        answer: "Yes. We use industry-standard encryption for all data. Your personal information is never sold or shared with third parties for marketing. We only use your data to provide and improve our services. You can request data deletion anytime by contacting support."
      },
      {
        question: "Can I delete my account?",
        answer: "Yes. Contact us via WhatsApp or email to request account deletion. We'll remove all your personal data, saved scholarships, and search history within 48 hours. Note: This action is irreversible."
      },
      {
        question: "Why can't I use a temporary email?",
        answer: "We block temporary/disposable email addresses to: 1) Prevent abuse of free AI trials, 2) Ensure we can send important scholarship deadline alerts, 3) Maintain platform security and quality. Please use your permanent email address."
      }
    ]
  },
  {
    id: "support",
    icon: MessageCircle,
    title: "Help & Support",
    description: "Getting assistance",
    faqs: [
      {
        question: "How can I contact support?",
        answer: "Multiple ways: 1) WhatsApp (fastest): +92 343 6148715, 2) Email: harryseller9@gmail.com, 3) Contact form on the Contact page. Free users typically get responses within 24 hours. Premium users get priority support with 2-hour response times."
      },
      {
        question: "What are the support hours?",
        answer: "Our team is available Monday-Friday, 9:00 AM - 6:00 PM PKT. WhatsApp messages received outside these hours are answered the next business day. For urgent Premium support, we have extended hours coverage."
      },
      {
        question: "Can you help me with my scholarship application?",
        answer: "Our AI tools provide automated document review and guidance. Premium users also get personalized support — our team can answer specific questions about applications, provide feedback on strategies, and help troubleshoot issues. For full application consulting, contact us about Enterprise partnerships."
      },
      {
        question: "I found a bug or have a feature suggestion. How do I report it?",
        answer: "We love feedback! Contact us via WhatsApp or email with: 1) Description of the bug or suggestion, 2) Steps to reproduce (for bugs), 3) Screenshots if applicable. We review all submissions and prioritize based on user impact."
      },
      {
        question: "Do you offer training or tutorials?",
        answer: "Yes! Check our About page for platform overview. Each AI tool has built-in guidance. Premium users get onboarding assistance. Enterprise customers receive full training sessions. We're also building video tutorials — subscribe to our newsletter for updates."
      },
      {
        question: "Can I partner with Up Scholar?",
        answer: "Absolutely! We partner with universities, NGOs, educational consultancies, and organizations. Visit our Partners page to learn about partnership models, or contact us via the Contact page with your proposal. We're always looking to expand student opportunities."
      }
    ]
  }
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqCategories.flatMap(cat => 
    cat.faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  )
};

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  const totalFaqs = faqCategories.reduce((acc, cat) => acc + cat.faqs.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>FAQ - Frequently Asked Questions | Up Scholar</title>
        <meta name="description" content="Find answers to common questions about Up Scholar's AI-powered scholarship search, application guidance, pricing, and more. Get help with your scholarship journey." />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-hero relative overflow-hidden">
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
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 gap-2">
              <HelpCircle className="h-3 w-3" />
              Help Center
            </Badge>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Frequently Asked{" "}
              <span className="text-gradient">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers to {totalFaqs}+ common questions about scholarships, 
              applications, AI tools, and everything Up Scholar.
            </p>

            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg rounded-2xl border-2 focus:border-primary"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-12 -mt-6 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {faqCategories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setActiveCategory(category.id);
                  setSearchQuery("");
                  document.getElementById(category.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-left p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:shadow-lg transition-all group"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold mb-1">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
                <p className="text-xs text-primary mt-2">{category.faqs.length} questions</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {filteredCategories.map((category, catIndex) => (
              <motion.div
                key={category.id}
                id={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {category.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>

                <Accordion type="single" collapsible className="space-y-3">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem 
                      key={faqIndex} 
                      value={`${category.id}-${faqIndex}`}
                      className="border rounded-xl px-6 bg-card hover:border-primary/30 transition-colors"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-5">
                        <span className="font-medium pr-4">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}

            {/* No Results */}
            {filteredCategories.length === 0 && searchQuery && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <HelpCircle className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any questions matching "{searchQuery}"
                </p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear search
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Still Need Help CTA */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-primary text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 mb-6">
                  <Sparkles className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white">Need More Help?</span>
                </div>

                <h2 
                  className="text-2xl md:text-3xl font-bold text-white mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Still Have Questions?
                </h2>
                <p className="text-white/80 max-w-xl mx-auto mb-8">
                  Can't find what you're looking for? Our support team is here to help. 
                  Reach out via WhatsApp for the fastest response!
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="gap-2 bg-white text-primary hover:bg-white/90"
                    asChild
                  >
                    <a href="https://wa.me/923436148715" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-5 w-5" />
                      Chat on WhatsApp
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                    asChild
                  >
                    <Link to="/contact">
                      Contact Form
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
