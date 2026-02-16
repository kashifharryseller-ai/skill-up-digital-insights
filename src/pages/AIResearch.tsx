import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIScholarshipSearch } from "@/components/ai-research/AIScholarshipSearch";
import { FacultySearch } from "@/components/ai-research/FacultySearch";
import { DocumentReviewer } from "@/components/ai-research/DocumentReviewer";
import { SavedItems } from "@/components/ai-research/SavedItems";
import { ScholarshipAssistant } from "@/components/ai-research/ScholarshipAssistant";
import { UpgradePrompt } from "@/components/upgrade/UpgradePrompt";
import { useAuth } from "@/hooks/useAuth";
import {
  Sparkles,
  GraduationCap,
  User,
  FileText,
  Bookmark,
  Brain,
  Lock,
  MessageCircle,
} from "lucide-react";

type TabValue = 'scholarships' | 'faculty' | 'reviewer' | 'saved' | 'assistant';

const tabs = [
  { value: 'scholarships' as TabValue, label: 'Scholarships', icon: GraduationCap, premium: false },
  { value: 'faculty' as TabValue, label: 'Faculty', icon: User, premium: true },
  { value: 'reviewer' as TabValue, label: 'Reviewer', icon: FileText, premium: true },
  { value: 'assistant' as TabValue, label: 'Assistant', icon: MessageCircle, premium: false },
  { value: 'saved' as TabValue, label: 'Saved', icon: Bookmark, premium: false },
];

const validTabs: TabValue[] = ['scholarships', 'faculty', 'reviewer', 'assistant', 'saved'];
const premiumTabs: TabValue[] = ['faculty', 'reviewer'];

export default function AIResearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") as TabValue | null;
  const initialTab = tabParam && validTabs.includes(tabParam) ? tabParam : 'scholarships';
  
  const [activeTab, setActiveTab] = useState<TabValue>(initialTab);
  const { user, isPremium } = useAuth();

  // Sync URL with tab changes
  useEffect(() => {
    const urlTab = searchParams.get("tab") as TabValue | null;
    if (urlTab && validTabs.includes(urlTab) && urlTab !== activeTab) {
      setActiveTab(urlTab);
    }
  }, [searchParams]);

  const handleTabChange = (value: string) => {
    const newTab = value as TabValue;
    setActiveTab(newTab);
    setSearchParams({ tab: newTab });
  };

  const isPremiumTab = (tab: TabValue) => premiumTabs.includes(tab);

  const renderTabContent = (tab: TabValue, Component: React.ComponentType, featureName: string) => {
    if (isPremiumTab(tab) && !isPremium) {
      return (
        <div className="py-16">
          <UpgradePrompt feature={featureName} />
        </div>
      );
    }
    return <Component />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Brain className="h-3 w-3 mr-1" />
              AI-Powered Research
            </Badge>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="text-gradient">Intelligent</span> Scholarship
              <br />Research Engine
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover scholarships, find faculty supervisors,
              and get AI feedback on your application documents—all in one place.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-8">
          {/* Tab Navigation */}
          <div className="flex justify-center">
            <TabsList className="h-auto p-1.5 bg-muted/50 rounded-2xl flex-wrap justify-center gap-1">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-xl px-4 py-2.5 gap-2 relative"
                >
                  <tab.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.premium && !isPremium && (
                    <Lock className="h-3 w-3 text-muted-foreground absolute -top-1 -right-1" />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="scholarships" className="mt-0">
              <AIScholarshipSearch />
            </TabsContent>

            <TabsContent value="faculty" className="mt-0">
              {renderTabContent('faculty', FacultySearch, 'Faculty Search & Matching')}
            </TabsContent>



            <TabsContent value="reviewer" className="mt-0">
              {renderTabContent('reviewer', DocumentReviewer, 'AI Document Review')}
            </TabsContent>

            <TabsContent value="assistant" className="mt-0">
              <ScholarshipAssistant />
            </TabsContent>

            <TabsContent value="saved" className="mt-0">
              <SavedItems />
            </TabsContent>
          </motion.div>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
