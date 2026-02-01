import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ScholarshipFilters } from "@/components/scholarship/ScholarshipFilters";
import { ScholarshipList } from "@/components/scholarship/ScholarshipList";
import { useScholarships, useScholarshipOptions } from "@/hooks/useScholarships";
import type { ScholarshipFilters as Filters } from "@/types/scholarship";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const defaultFilters: Filters = {
  search: "",
  fieldOfStudy: "all",
  educationLevel: "all",
  country: "all",
  minAmount: null,
  maxAmount: null,
};

export default function Scholarships() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  
  const [filters, setFilters] = useState<Filters>({
    ...defaultFilters,
    search: initialSearch,
  });
  
  // Update filters when URL search param changes
  useEffect(() => {
    const urlSearch = searchParams.get("search") || "";
    if (urlSearch !== filters.search) {
      setFilters((prev) => ({ ...prev, search: urlSearch }));
    }
  }, [searchParams]);
  
  const { data: scholarships, isLoading, error } = useScholarships(filters);
  const { data: options } = useScholarshipOptions();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              <Sparkles className="h-3 w-3 mr-1" />
              Find Your Perfect Scholarship
            </Badge>
            <h1
              className="mb-6 text-4xl sm:text-5xl font-bold tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Discover <span className="text-gradient">Scholarships</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse through our curated list of scholarships and find the perfect
              opportunity to fund your education journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ScholarshipFilters
              filters={filters}
              onFiltersChange={setFilters}
              options={options || { fields: [], levels: [], countries: [] }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ScholarshipList
              scholarships={scholarships}
              isLoading={isLoading}
              error={error}
            />
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
