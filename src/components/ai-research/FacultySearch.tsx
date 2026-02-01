import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useBookmarks } from "@/hooks/useBookmarks";
import { aiResearchApi } from "@/lib/api/ai-research";
import type { AIProfessor } from "@/types/ai-research";
import {
  Search,
  Loader2,
  User,
  Building2,
  Mail,
  ExternalLink,
  Linkedin,
  Bookmark,
  BookmarkCheck,
  AlertCircle,
} from "lucide-react";

export function FacultySearch() {
  const { toast } = useToast();
  const { addBookmark, removeBookmark, isBookmarked, bookmarks } = useBookmarks();
  const [university, setUniversity] = useState("");
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AIProfessor[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!university.trim() || !topic.trim()) {
      toast({
        title: "Missing Fields",
        description: "Please enter both university and research topic",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setResults([]);

    try {
      const response = await aiResearchApi.searchFaculty(university, topic);

      if (response.success && response.data) {
        setResults(response.data.professors || []);
        toast({
          title: "Search Complete",
          description: `Found ${response.data.professors?.length || 0} faculty members`,
        });
      } else {
        setError(response.error || "Search failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBookmark = (professor: AIProfessor) => {
    const saved = isBookmarked(professor.name, 'professor');
    const bookmarkItem = bookmarks.find(
      (b) => b.type === 'professor' && (b.data as AIProfessor).name === professor.name
    );

    if (saved && bookmarkItem) {
      removeBookmark(bookmarkItem.id);
    } else {
      addBookmark('professor', professor);
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Form */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Find Faculty & Researchers
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">University Name</label>
            <Input
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
              placeholder="e.g., MIT, Stanford, Oxford..."
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Research Topic</label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Machine Learning, Quantum Computing..."
              disabled={isLoading}
            />
          </div>
        </div>
        <Button
          onClick={handleSearch}
          disabled={isLoading || !university.trim() || !topic.trim()}
          className="mt-4 bg-gradient-primary hover:opacity-90 gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Searching...
            </>
          ) : (
            <>
              <Search className="h-4 w-4" /> Search Faculty
            </>
          )}
        </Button>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h4 className="font-semibold">Found {results.length} Faculty Members</h4>
          <div className="grid gap-4 md:grid-cols-2">
            {results.map((professor, index) => {
              const saved = isBookmarked(professor.name, 'professor');
              
              return (
                <Card key={index} className="hover:shadow-lg hover:border-primary/30 transition-all">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{professor.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{professor.title}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleBookmark(professor)}
                        className={saved ? 'text-primary' : 'text-muted-foreground'}
                      >
                        {saved ? (
                          <BookmarkCheck className="h-4 w-4 fill-current" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span>{professor.department}</span>
                    </div>

                    <Badge variant="secondary" className="text-xs">
                      {professor.research_area}
                    </Badge>

                    {professor.summary && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {professor.summary}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {professor.email && (
                        <a
                          href={`mailto:${professor.email}`}
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          <Mail className="h-3 w-3" /> Email
                        </a>
                      )}
                      {professor.profile_url && (
                        <a
                          href={professor.profile_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" /> Profile
                        </a>
                      )}
                      {professor.linkedin_url && (
                        <a
                          href={professor.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          <Linkedin className="h-3 w-3" /> LinkedIn
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && results.length === 0 && !error && (
        <div className="py-12 text-center">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 mb-4">
            <User className="h-7 w-7 text-primary" />
          </div>
          <h4 className="font-semibold mb-2">Faculty Finder</h4>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Search for professors by university and research topic to find potential supervisors
            and collaborators.
          </p>
        </div>
      )}
    </div>
  );
}
