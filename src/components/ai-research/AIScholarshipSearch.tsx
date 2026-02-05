import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { useAuth } from "@/hooks/useAuth";
import { useFreeSearch } from "@/hooks/useFreeSearch";
import { aiResearchApi } from "@/lib/api/ai-research";
import type { AISearchResponse, AIUniversityData } from "@/types/ai-research";
import { AIUniversityCard } from "./AIUniversityCard";
import { AuthModal } from "@/components/auth/AuthModal";
import {
  Search,
  Sparkles,
  X,
  Clock,
  Loader2,
  GraduationCap,
  AlertCircle,
  ShieldCheck,
  Gift,
  Lock,
  RefreshCw,
  Wifi,
  WifiOff,
} from "lucide-react";

const MAX_RETRIES = 3;
const TIMEOUT_MS = 45000; // 45 seconds

export function AIScholarshipSearch() {
  const { toast } = useToast();
  const { history, addToHistory, removeFromHistory } = useSearchHistory();
  const { user, isPremium } = useAuth();
  const { hasUsedFreeSearch, canUseFreeTrial, recordFreeSearchUsage, isLoading: freeSearchLoading } = useFreeSearch("scholarships");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AISearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [lastQuery, setLastQuery] = useState("");

  const getErrorMessage = (err: unknown, attempt: number): string => {
    const errorStr = err instanceof Error ? err.message : String(err);
    
    if (errorStr.includes("Failed to fetch") || errorStr.includes("NetworkError") || errorStr.includes("Failed to send")) {
      return "Unable to connect to the AI service. Please check your internet connection and try again.";
    }
    if (errorStr.includes("timeout") || errorStr.includes("Timeout")) {
      return "The request took too long. The AI service might be busy. Please try again.";
    }
    if (errorStr.includes("401") || errorStr.includes("Unauthorized")) {
      return "Your session has expired. Please log in again to continue.";
    }
    if (errorStr.includes("403") || errorStr.includes("Forbidden")) {
      return "Access denied. You may need to upgrade your subscription.";
    }
    if (errorStr.includes("500") || errorStr.includes("Internal")) {
      return "The AI service encountered an error. Our team has been notified. Please try again later.";
    }
    if (errorStr.includes("Edge Function")) {
      return "Unable to reach the backend service. This may be a temporary issue. Please retry.";
    }
    
    return attempt < MAX_RETRIES 
      ? `Search attempt ${attempt} failed. Retrying...` 
      : "Search failed after multiple attempts. Please try again later.";
  };

  const searchWithRetry = async (searchQuery: string, attempt: number = 1): Promise<void> => {
    try {
      // Create a timeout promise
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Request timeout")), TIMEOUT_MS);
      });

      // Race between the API call and timeout
      const response = await Promise.race([
        aiResearchApi.searchScholarships(searchQuery),
        timeoutPromise
      ]);

      if (response.success && response.data) {
        setResults(response.data);
        setError(null);
        setRetryCount(0);
        addToHistory(searchQuery);
        toast({
          title: "Search Complete",
          description: `Found ${response.data.universities?.length || 0} universities with scholarships`,
        });
      } else {
        throw new Error(response.error || "Search failed");
      }
    } catch (err) {
      console.error(`Search attempt ${attempt} failed:`, err);
      
      if (attempt < MAX_RETRIES) {
        setRetryCount(attempt);
        toast({
          title: `Retrying (${attempt}/${MAX_RETRIES})`,
          description: "The request failed. Automatically retrying...",
        });
        // Exponential backoff: 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
        return searchWithRetry(searchQuery, attempt + 1);
      }
      
      const errorMessage = getErrorMessage(err, attempt);
      setError(errorMessage);
      setRetryCount(0);
      toast({
        title: "Search Failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleSearch = async (searchQuery?: string) => {
    const activeQuery = searchQuery || query;
    if (!activeQuery.trim()) return;

    // Check if user needs to login
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please sign in to use AI search. You get one free search!",
        variant: "destructive",
      });
      setAuthModalOpen(true);
      return;
    }

    // Check if user can search (premium or has free trial available)
    if (!isPremium && hasUsedFreeSearch) {
      toast({
        title: "Free Trial Used",
        description: "Upgrade to premium for unlimited AI searches.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults(null);
    setLastQuery(activeQuery);
    setRetryCount(0);

    try {
      // Record free search usage if not premium
      if (!isPremium) {
        await recordFreeSearchUsage();
      }

      await searchWithRetry(activeQuery);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastQuery) {
      handleSearch(lastQuery);
    }
  };

  const handleHistoryClick = (historyQuery: string) => {
    setQuery(historyQuery);
    handleSearch(historyQuery);
  };

  return (
    <div className="space-y-8">
      {/* Auth Modal */}
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />

      {/* Free Trial Banner */}
      {user && !isPremium && !freeSearchLoading && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border flex items-center gap-3 ${
            canUseFreeTrial
              ? "bg-primary/10 border-primary/20"
              : "bg-muted border-border"
          }`}
        >
          {canUseFreeTrial ? (
            <>
              <Gift className="h-5 w-5 text-primary shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium text-primary">
                  🎁 Free Trial Available!
                </p>
                <p className="text-xs text-muted-foreground">
                  You have 1 free AI search. Try it now to unlock scholarship opportunities!
                </p>
              </div>
            </>
          ) : (
            <>
              <Lock className="h-5 w-5 text-muted-foreground shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">Free Trial Used</p>
                <p className="text-xs text-muted-foreground">
                  Upgrade to premium for unlimited AI searches and full access to all tools.
                </p>
              </div>
              <Button size="sm" className="bg-gradient-primary hover:opacity-90" asChild>
                <a href="https://wa.me/923436148715?text=Hello!%20I%20want%20to%20upgrade%20to%20premium%20for%20unlimited%20AI%20searches.">
                  Upgrade Now
                </a>
              </Button>
            </>
          )}
        </motion.div>
      )}

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
                  disabled={isLoading || (!isPremium && hasUsedFreeSearch)}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || !query.trim() || (!isPremium && hasUsedFreeSearch)}
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
            <p className="text-lg font-semibold mb-2">
              {retryCount > 0 ? `Retrying... (Attempt ${retryCount + 1}/${MAX_RETRIES})` : "Researching Scholarships..."}
            </p>
            <p className="text-sm text-muted-foreground">
              {retryCount > 0 ? "Previous attempt failed, trying again..." : "Analyzing global scholarship databases"}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              This may take up to 45 seconds
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error State */}
      {error && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl bg-destructive/10 border border-destructive/20"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-destructive/20">
              {error.includes("internet") || error.includes("connect") ? (
                <WifiOff className="h-6 w-6 text-destructive" />
              ) : (
                <AlertCircle className="h-6 w-6 text-destructive" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-destructive mb-1">Search Failed</p>
              <p className="text-sm text-muted-foreground mb-4">{error}</p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleRetry}
                  variant="outline"
                  size="sm"
                  className="gap-2 border-destructive/30 hover:bg-destructive/10"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
                {error.includes("session") && (
                  <Button
                    onClick={() => setAuthModalOpen(true)}
                    size="sm"
                    className="gap-2"
                  >
                    Log In Again
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-destructive/20">
            <p className="text-xs text-muted-foreground">
              <strong>Troubleshooting tips:</strong> Check your internet connection, try refreshing the page, 
              or wait a moment and retry. If the problem persists, our team has been notified.
            </p>
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
