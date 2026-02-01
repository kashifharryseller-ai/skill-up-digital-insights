import { useState } from "react";
import { ScholarshipFilters } from "@/components/scholarship/ScholarshipFilters";
import { ScholarshipList } from "@/components/scholarship/ScholarshipList";
import { useScholarships, useScholarshipOptions } from "@/hooks/useScholarships";
import type { ScholarshipFilters as Filters } from "@/types/scholarship";
import { GraduationCap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const defaultFilters: Filters = {
  search: "",
  fieldOfStudy: "all",
  educationLevel: "all",
  country: "all",
  minAmount: null,
  maxAmount: null,
};

export default function Scholarships() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const { data: scholarships, isLoading, error } = useScholarships(filters);
  const { data: options } = useScholarshipOptions();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">ScholarFind</span>
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">Home</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative border-b border-border/40 bg-gradient-to-b from-muted/50 to-background py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Find your perfect scholarship</span>
            </div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Discover Scholarships
            </h1>
            <p className="text-muted-foreground">
              Browse through our curated list of scholarships and find the perfect
              opportunity to fund your education.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <ScholarshipFilters
            filters={filters}
            onFiltersChange={setFilters}
            options={options || { fields: [], levels: [], countries: [] }}
          />

          <ScholarshipList
            scholarships={scholarships}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2026 ScholarFind. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
