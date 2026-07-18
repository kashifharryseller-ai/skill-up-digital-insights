import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Map, 
  FileText, 
  DollarSign, 
  ClipboardList,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Calendar,
  Globe,
  BookOpen,
  Award,
  Users,
  MessageCircle,
  Clock,
  Target,
  Lightbulb,
  AlertCircle
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";

const roadmapSteps = [
  {
    step: 1,
    title: "Research & Shortlist",
    timeline: "6-12 months before deadline",
    description: "Identify scholarships and programs that match your profile",
    tasks: [
      "Use AI Scholarship Search to find matching opportunities",
      "Research university rankings and program specializations",
      "Shortlist 5-10 scholarships based on eligibility",
      "Note all deadlines in a calendar",
      "Verify HEC recognition for Pakistani students"
    ]
  },
  {
    step: 2,
    title: "Document Preparation",
    timeline: "4-6 months before deadline",
    description: "Gather and prepare all required documents",
    tasks: [
      "Request academic transcripts (allow 2-4 weeks)",
      "Get degree certificates attested",
      "Take language tests (IELTS/TOEFL) - results take 2 weeks",
      "Prepare for GRE/GMAT if required",
      "Get passport ready or renewed"
    ]
  },
  {
    step: 3,
    title: "Statement of Purpose",
    timeline: "2-3 months before deadline",
    description: "Write and refine your personal statement",
    tasks: [
      "Research the specific program thoroughly",
      "Draft SOP following the structure guide below",
      "Get feedback from mentors and professors",
      "Use our AI Document Reviewer for analysis",
      "Customize SOP for each application"
    ]
  },
  {
    step: 4,
    title: "Recommendation Letters",
    timeline: "2-3 months before deadline",
    description: "Secure strong letters of recommendation",
    tasks: [
      "Identify 2-3 recommenders (professors/supervisors)",
      "Request letters at least 6 weeks in advance",
      "Provide recommenders with your CV and SOP",
      "Follow up politely 2 weeks before deadline",
      "Ensure recommenders submit on time"
    ]
  },
  {
    step: 5,
    title: "Application Submission",
    timeline: "1-2 weeks before deadline",
    description: "Submit complete applications carefully",
    tasks: [
      "Review all documents one final time",
      "Fill application forms accurately",
      "Pay application fees (keep receipts)",
      "Submit before deadline (not on deadline day)",
      "Save confirmation emails and reference numbers"
    ]
  },
  {
    step: 6,
    title: "Post-Submission",
    timeline: "After submission",
    description: "Follow up and prepare for next steps",
    tasks: [
      "Track application status regularly",
      "Prepare for potential interviews",
      "Research visa requirements in advance",
      "Plan finances and accommodation",
      "Stay positive and apply to multiple opportunities"
    ]
  }
];

const documentGuides = [
  {
    id: "sop",
    title: "Statement of Purpose (SOP)",
    description: "Your personal narrative connecting past, present, and future",
    structure: [
      { section: "Opening Hook (1 paragraph)", content: "Start with a compelling story or motivation that sparked your interest in the field. Avoid generic openings." },
      { section: "Academic Background (1-2 paragraphs)", content: "Highlight relevant coursework, academic achievements, and how they prepared you for this program." },
      { section: "Professional/Research Experience (1-2 paragraphs)", content: "Describe internships, jobs, research, or projects that demonstrate your skills and commitment." },
      { section: "Why This Program (1 paragraph)", content: "Specifically mention professors, courses, or resources that attract you. Show you've researched." },
      { section: "Career Goals (1 paragraph)", content: "Explain your short-term and long-term goals and how this program helps achieve them." },
      { section: "Conclusion (1 paragraph)", content: "Summarize why you're a strong fit and what you'll contribute to the program/community." }
    ],
    tips: [
      "Keep it 800-1000 words unless specified otherwise",
      "Be specific and use concrete examples",
      "Show, don't just tell — use stories",
      "Avoid clichés like 'since childhood' or 'passion'",
      "Have it reviewed by multiple people",
      "Customize for each application"
    ]
  },
  {
    id: "cv",
    title: "Academic CV / Resume",
    description: "A comprehensive overview of your academic and professional journey",
    structure: [
      { section: "Contact Information", content: "Name, email, phone, LinkedIn, location" },
      { section: "Education", content: "Degrees in reverse chronological order with GPA, honors, relevant coursework" },
      { section: "Research Experience", content: "Research projects, thesis, publications, conferences" },
      { section: "Work Experience", content: "Relevant jobs, internships with responsibilities and achievements" },
      { section: "Skills", content: "Technical skills, languages, software proficiency" },
      { section: "Awards & Achievements", content: "Scholarships, honors, competitions" },
      { section: "Extracurriculars", content: "Leadership roles, volunteering, community service" }
    ],
    tips: [
      "Keep it 1-2 pages for Masters, 2-3 for PhD",
      "Use action verbs (Led, Developed, Analyzed)",
      "Quantify achievements where possible",
      "Use consistent formatting throughout",
      "Tailor to academic vs industry applications",
      "Include publications in proper citation format"
    ]
  },
  {
    id: "lor",
    title: "Letter of Recommendation (LOR)",
    description: "Third-party validation of your abilities and potential",
    structure: [
      { section: "Recommender's Relationship", content: "How they know you, in what capacity, for how long" },
      { section: "Academic/Professional Abilities", content: "Specific examples of your skills and performance" },
      { section: "Personal Qualities", content: "Character traits, work ethic, teamwork abilities" },
      { section: "Comparison to Peers", content: "How you rank among other students/colleagues they've known" },
      { section: "Recommendation", content: "Strong endorsement for the specific program/scholarship" }
    ],
    tips: [
      "Choose recommenders who know your work well",
      "Ask at least 6 weeks before deadline",
      "Provide them with your CV, SOP, and talking points",
      "Waive your right to view the letter (shows confidence)",
      "Send gentle reminders 2 weeks before deadline",
      "Thank them after submission"
    ]
  },
  {
    id: "research",
    title: "Research Proposal (for PhD)",
    description: "Your proposed research plan and methodology",
    structure: [
      { section: "Title & Abstract", content: "Clear, specific title and 200-word summary" },
      { section: "Introduction & Background", content: "Context, literature review, research gap" },
      { section: "Research Questions/Objectives", content: "Clear, focused questions you aim to answer" },
      { section: "Methodology", content: "How you'll conduct the research, data collection methods" },
      { section: "Timeline", content: "Realistic schedule for completing the research" },
      { section: "Expected Outcomes", content: "Anticipated contributions and impact" },
      { section: "References", content: "Key literature in proper academic format" }
    ],
    tips: [
      "Align with potential supervisor's research interests",
      "Be realistic about scope and timeline",
      "Show familiarity with current literature",
      "Explain why this university is ideal for this research",
      "Keep it 1500-3000 words unless specified",
      "Get feedback from your potential supervisor"
    ]
  }
];

const feeBreakdowns = [
  {
    country: "United States",
    flag: "🇺🇸",
    currency: "USD",
    items: [
      { name: "Application Fee", range: "$50 - $150", notes: "Per university, non-refundable" },
      { name: "GRE/GMAT", range: "$220 - $275", notes: "Score sending: $27 each" },
      { name: "TOEFL/IELTS", range: "$190 - $250", notes: "Valid for 2 years" },
      { name: "Transcript Evaluation", range: "$100 - $200", notes: "WES/ECE required for some" },
      { name: "Visa Fee (F-1)", range: "$185", notes: "SEVIS fee: $350 additional" },
      { name: "Tuition (per year)", range: "$30,000 - $60,000", notes: "Varies by university" },
      { name: "Living Expenses", range: "$15,000 - $25,000/year", notes: "Location dependent" }
    ]
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    currency: "GBP",
    items: [
      { name: "Application Fee", range: "£0 - £75", notes: "Many universities free" },
      { name: "IELTS", range: "£200 - £250", notes: "Required for most" },
      { name: "Visa Fee (Tier 4)", range: "£363", notes: "IHS: £470/year additional" },
      { name: "Tuition (per year)", range: "£15,000 - £35,000", notes: "STEM usually higher" },
      { name: "Living Expenses", range: "£12,000 - £18,000/year", notes: "London is higher" }
    ]
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    currency: "EUR",
    items: [
      { name: "Application Fee", range: "€0 - €50", notes: "Public unis mostly free" },
      { name: "IELTS/TestDaF", range: "€200 - €250", notes: "German programs may need TestDaF" },
      { name: "Blocked Account", range: "€11,208/year", notes: "Required for visa" },
      { name: "Visa Fee", range: "€75", notes: "Student visa" },
      { name: "Tuition (Public)", range: "€0 - €1,500/semester", notes: "Semester contribution only" },
      { name: "Living Expenses", range: "€850 - €1,200/month", notes: "€10,200 - €14,400/year" }
    ]
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    currency: "CAD",
    items: [
      { name: "Application Fee", range: "$100 - $150", notes: "Per university" },
      { name: "IELTS", range: "$300 - $350", notes: "Or TOEFL" },
      { name: "GRE (if required)", range: "$220 USD", notes: "Not always required" },
      { name: "Visa Fee", range: "$150", notes: "Biometrics: $85 additional" },
      { name: "Tuition (per year)", range: "$20,000 - $40,000", notes: "International fees" },
      { name: "Living Expenses", range: "$12,000 - $20,000/year", notes: "City dependent" }
    ]
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    currency: "AUD",
    items: [
      { name: "Application Fee", range: "$100 - $150", notes: "Per university" },
      { name: "IELTS/PTE", range: "$350 - $400", notes: "PTE also accepted" },
      { name: "Visa Fee (Subclass 500)", range: "$710", notes: "Health insurance required" },
      { name: "Tuition (per year)", range: "$25,000 - $50,000", notes: "Program dependent" },
      { name: "Living Expenses", range: "$21,041/year", notes: "Minimum required for visa" }
    ]
  }
];

const requirementsChecklist = [
  {
    category: "Academic Documents",
    items: [
      { item: "Official transcripts from all institutions", critical: true },
      { item: "Degree certificates/diplomas", critical: true },
      { item: "Mark sheets (semester-wise)", critical: false },
      { item: "Thesis/dissertation (for PhD)", critical: false },
      { item: "Publications list (if any)", critical: false }
    ]
  },
  {
    category: "Test Scores",
    items: [
      { item: "IELTS/TOEFL (English proficiency)", critical: true },
      { item: "GRE General (if required)", critical: false },
      { item: "GRE Subject (for some programs)", critical: false },
      { item: "GMAT (for business programs)", critical: false }
    ]
  },
  {
    category: "Personal Documents",
    items: [
      { item: "Valid passport (6+ months validity)", critical: true },
      { item: "Passport-size photographs", critical: true },
      { item: "National ID card copy", critical: false },
      { item: "Birth certificate (if required)", critical: false }
    ]
  },
  {
    category: "Application Materials",
    items: [
      { item: "Statement of Purpose (SOP)", critical: true },
      { item: "Curriculum Vitae (CV/Resume)", critical: true },
      { item: "Letters of Recommendation (2-3)", critical: true },
      { item: "Research Proposal (for PhD)", critical: false },
      { item: "Writing samples (if required)", critical: false },
      { item: "Portfolio (for creative fields)", critical: false }
    ]
  },
  {
    category: "Financial Documents",
    items: [
      { item: "Bank statements (6 months)", critical: true },
      { item: "Scholarship award letter (if applicable)", critical: false },
      { item: "Sponsor letter (if sponsored)", critical: false },
      { item: "Income tax returns", critical: false }
    ]
  },
  {
    category: "Additional Requirements",
    items: [
      { item: "Medical examination reports", critical: false },
      { item: "Police clearance certificate", critical: false },
      { item: "Proof of work experience (if required)", critical: false },
      { item: "Interview preparation", critical: false }
    ]
  }
];

export default function Strategy() {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Application Strategy Guide | Schola X - Complete Scholarship Roadmap</title>
        <meta name="description" content="Complete guide to scholarship applications: step-by-step roadmap, document preparation tips, real-time fees, and requirements checklist. Build your winning strategy." />
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
              <Map className="h-3 w-3" />
              Strategy Guide
            </Badge>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Build Your{" "}
              <span className="text-gradient">Winning Strategy</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Complete roadmap from research to acceptance. Document preparation, 
              real-time fees, requirements checklist — everything you need to succeed.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-primary hover:opacity-90 gap-2" asChild>
                <a href="#roadmap">
                  View Roadmap
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/ai-research">Use AI Tools</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content with Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="roadmap" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12">
              <TabsTrigger value="roadmap" className="gap-2">
                <Map className="h-4 w-4" />
                Roadmap
              </TabsTrigger>
              <TabsTrigger value="documents" className="gap-2">
                <FileText className="h-4 w-4" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="fees" className="gap-2">
                <DollarSign className="h-4 w-4" />
                Fees
              </TabsTrigger>
              <TabsTrigger value="requirements" className="gap-2">
                <ClipboardList className="h-4 w-4" />
                Checklist
              </TabsTrigger>
            </TabsList>

            {/* Roadmap Tab */}
            <TabsContent value="roadmap" id="roadmap">
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Application <span className="text-gradient">Roadmap</span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Follow this 6-step timeline to prepare a competitive scholarship application. 
                    Start early for the best results.
                  </p>
                </div>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

                  {roadmapSteps.map((step, index) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                      }`}
                    >
                      {/* Step number */}
                      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-primary items-center justify-center text-white font-bold z-10">
                        {step.step}
                      </div>

                      {/* Content */}
                      <div className={`flex-1 ${index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                        <Card className="inline-block w-full max-w-lg hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <div className="flex md:hidden items-center gap-3 mb-2">
                              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold">
                                {step.step}
                              </div>
                              <Badge variant="secondary">{step.timeline}</Badge>
                            </div>
                            <Badge variant="secondary" className="hidden md:inline-flex mb-2 w-fit">
                              <Clock className="h-3 w-3 mr-1" />
                              {step.timeline}
                            </Badge>
                            <CardTitle className="text-xl">{step.title}</CardTitle>
                            <CardDescription>{step.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <ul className={`space-y-2 ${index % 2 === 0 ? "md:text-left" : ""}`}>
                              {step.tasks.map((task, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                  <span>{task}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Spacer for alternating layout */}
                      <div className="hidden md:block flex-1" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" id="documents">
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Document <span className="text-gradient">Preparation</span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Detailed guides for preparing each application document. 
                    Use our AI Document Reviewer for instant feedback.
                  </p>
                </div>

                <div className="grid gap-6">
                  {documentGuides.map((doc, index) => (
                    <motion.div
                      key={doc.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card>
                        <Accordion type="single" collapsible>
                          <AccordionItem value={doc.id} className="border-0">
                            <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50">
                              <div className="flex items-center gap-4 text-left">
                                <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center shrink-0">
                                  <FileText className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-lg">{doc.title}</h3>
                                  <p className="text-sm text-muted-foreground">{doc.description}</p>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-6 pb-6">
                              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
                                <div>
                                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-primary" />
                                    Structure Guide
                                  </h4>
                                  <div className="space-y-3">
                                    {doc.structure.map((section, i) => (
                                      <div key={i} className="p-3 rounded-lg bg-muted/50">
                                        <p className="font-medium text-sm">{section.section}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{section.content}</p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                                    <Lightbulb className="h-4 w-4 text-primary" />
                                    Pro Tips
                                  </h4>
                                  <ul className="space-y-2">
                                    {doc.tips.map((tip, i) => (
                                      <li key={i} className="flex items-start gap-2 text-sm">
                                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                                        <span>{tip}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                                <p className="text-sm font-medium mb-2">📝 Get AI Feedback</p>
                                <p className="text-xs text-muted-foreground mb-3">
                                  Upload your {doc.title} to our AI Document Reviewer for instant analysis and improvement suggestions.
                                </p>
                                <Button size="sm" className="bg-gradient-primary hover:opacity-90" asChild>
                                  <Link to="/ai-research?tab=reviewer">Review My Document</Link>
                                </Button>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Fees Tab */}
            <TabsContent value="fees" id="fees">
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Fees & <span className="text-gradient">Funding</span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Real-time cost breakdown by country. Plan your budget and explore 
                    funding options for your study abroad journey.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {feeBreakdowns.map((country, index) => (
                    <motion.div
                      key={country.country}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{country.flag}</span>
                            <div>
                              <CardTitle className="text-lg">{country.country}</CardTitle>
                              <CardDescription>Currency: {country.currency}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {country.items.map((item, i) => (
                              <div key={i} className="flex justify-between items-start text-sm border-b border-border/50 pb-2 last:border-0">
                                <div>
                                  <p className="font-medium">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">{item.notes}</p>
                                </div>
                                <span className="font-semibold text-primary whitespace-nowrap ml-2">
                                  {item.range}
                                </span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <div className="p-6 rounded-2xl bg-muted/50 border border-border text-center">
                  <AlertCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Fees are Approximate</h3>
                  <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                    These figures are estimates based on 2025-2026 data. Always verify current fees 
                    on official university and embassy websites. Exchange rates may vary.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Requirements Tab */}
            <TabsContent value="requirements" id="requirements">
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Requirements <span className="text-gradient">Checklist</span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Complete checklist of documents and requirements. Critical items are marked — 
                    ensure you have these ready before applying.
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {requirementsChecklist.map((category, index) => (
                    <motion.div
                      key={category.category}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full">
                        <CardHeader>
                          <CardTitle className="text-lg flex items-center gap-2">
                            <ClipboardList className="h-5 w-5 text-primary" />
                            {category.category}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-3">
                            {category.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <div className={`h-5 w-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                                  item.critical ? "border-primary bg-primary/10" : "border-muted-foreground/30"
                                }`}>
                                  {item.critical && <CheckCircle2 className="h-3 w-3 text-primary" />}
                                </div>
                                <div className="flex-1">
                                  <span className={`text-sm ${item.critical ? "font-medium" : ""}`}>
                                    {item.item}
                                  </span>
                                  {item.critical && (
                                    <Badge variant="secondary" className="ml-2 text-xs">Required</Badge>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="p-8 md:p-12 rounded-3xl bg-gradient-primary relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
              
              <div className="relative z-10">
                <Sparkles className="h-12 w-12 text-white mx-auto mb-4" />
                <h2 
                  className="text-2xl md:text-3xl font-bold text-white mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Ready to Start Your Journey?
                </h2>
                <p className="text-white/80 max-w-xl mx-auto mb-8">
                  Use our AI-powered tools to find scholarships, review your documents, 
                  and connect with the right professors. Your first search is free!
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="gap-2 bg-white text-primary hover:bg-white/90"
                    asChild
                  >
                    <Link to="/ai-research?tab=scholarships">
                      <GraduationCap className="h-5 w-5" />
                      Find Scholarships
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                    asChild
                  >
                    <a href="https://wa.me/923436148715" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Get Help
                    </a>
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
