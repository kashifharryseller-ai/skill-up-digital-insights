import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { aiResearchApi } from "@/lib/api/ai-research";
import type { AISearchResponse, AIUniversityData } from "@/types/ai-research";
import { AIUniversityCard } from "./AIUniversityCard";
import {
  Search,
  Sparkles,
  X,
  Clock,
  Loader2,
  GraduationCap,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

export function AIScholarshipSearch() {
  const { toast } = useToast();
  const { history, addToHistory, removeFromHistory } = useSearchHistory();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AISearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (searchQuery?: string) => {
    const activeQuery = searchQuery || query;
    if (!activeQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await aiResearchApi.searchScholarships(activeQuery);

      if (response.success && response.data) {
        setResults(response.data);
        addToHistory(activeQuery);
        toast({
          title: "Search Complete",
          description: `Found ${response.data.universities?.length || 0} universities with scholarships`,
        });
      } else {
        setError(response.error || "Search failed");
        toast({
          title: "Search Failed",
          description: response.error,
          variant: "destructive",
        });
      }
    } catch (err) {
      setError("An unexpected error occurred");
      toast({
        title: "Error",
        description: "Failed to search. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
    handleSearch(historyQuery);
  };

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <div className="relative">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="relative"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search e.g. 'Fully funded CS masters in Germany'..."
                  className="pl-12 pr-4 h-14 text-lg rounded-2xl border-2 focus:border-primary"
                  disabled={isLoading}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="h-14 px-8 rounded-2xl bg-gradient-primary hover:opacity-90 gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="hidden sm:inline">Searching...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    <span className="hidden sm:inline">AI Search</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>

        {/* Search History */}
        {history.length > 0 && !isLoading && !results && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex flex-wrap gap-2 items-center"
          >
            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" /> Recent:
            </span>
            {history.slice(0, 5).map((q) => (
              <Badge
                key={q}
                variant="secondary"
                className="cursor-pointer hover:bg-primary/10 group pl-3 pr-1"
              >
                <span onClick={() => handleHistoryClick(q)}>{q}</span>
                <button
                  onClick={() => removeFromHistory(q)}
                  className="ml-1 p-0.5 rounded-full hover:bg-destructive/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </motion.div>
        )}
      </div>

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-20 flex flex-col items-center justify-center"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full blur-2xl bg-primary/20 animate-pulse" />
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
              </div>
            </div>
            <p className="text-lg font-semibold mb-2">Researching Scholarships...</p>
            <p className="text-sm text-muted-foreground">
              Analyzing global scholarship databases
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      {error && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center gap-4"
        >
          <AlertCircle className="h-6 w-6 text-destructive shrink-0" />
          <div>
            <p className="font-semibold text-destructive">Search Failed</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </motion.div>
      )}

      {/* Results */}
      {results && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Verification Notice */}
          {results.verification_note && (
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-primary">
                  Official Sources Only
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {results.verification_note}
                </p>
              </div>
            </div>
          )}

          {results.summary && (
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground">{results.summary}</p>
            </div>
          )}

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Found {results.universities?.length || 0} Universities
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setResults(null);
                setQuery("");
              }}
            >
              Clear Results
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {results.universities?.map((uni, index) => (
              <AIUniversityCard key={`${uni.university}-${index}`} university={uni} />
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && !results && !error && (
        <div className="py-16 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">AI-Powered Scholarship Search</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Enter your query to discover fully-funded scholarships, university requirements,
            and faculty information from around the world.
          </p>
        </div>
      )}
    </div>
  );
}
