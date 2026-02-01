import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/hooks/useBookmarks";
import type { AIUniversityData } from "@/types/ai-research";
import {
  Globe,
  ExternalLink,
  GraduationCap,
  DollarSign,
  Calendar,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface AIUniversityCardProps {
  university: AIUniversityData;
}

export function AIUniversityCard({ university }: AIUniversityCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { addBookmark, removeBookmark, isBookmarked, bookmarks } = useBookmarks();
  
  const saved = isBookmarked(university.university, 'university');
  const bookmarkItem = bookmarks.find(
    (b) => b.type === 'university' && (b.data as AIUniversityData).university === university.university
  );

  const toggleBookmark = () => {
    if (saved && bookmarkItem) {
      removeBookmark(bookmarkItem.id);
    } else {
      addBookmark('university', university);
    }
  };

  const getFundingColor = (funding: string) => {
    const lower = funding.toLowerCase();
    if (lower.includes('full')) return 'bg-success text-success-foreground';
    if (lower.includes('partial')) return 'bg-warning text-warning-foreground';
    return 'bg-secondary text-secondary-foreground';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
    >
      <Card className="h-full hover:shadow-xl hover:border-primary/30 transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  <Globe className="h-3 w-3 mr-1" />
                  {university.country}
                </Badge>
                {university.min_cgpa && (
                  <Badge variant="secondary" className="text-xs">
                    Min GPA: {university.min_cgpa}
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                {university.university}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleBookmark}
              className={saved ? 'text-primary' : 'text-muted-foreground'}
            >
              {saved ? (
                <BookmarkCheck className="h-5 w-5 fill-current" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Website Link */}
          {university.website && (
            <a
              href={university.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-primary hover:underline"
            >
              <ExternalLink className="h-4 w-4" />
              Visit Website
            </a>
          )}

          {/* Notes */}
          {university.notes && (
            <p className="text-sm text-muted-foreground">{university.notes}</p>
          )}

          {/* Scholarships */}
          {university.scholarships && university.scholarships.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-primary" />
                  Scholarships ({university.scholarships.length})
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="h-7 px-2"
                >
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Show first scholarship always, rest when expanded */}
              <div className="space-y-3">
                {university.scholarships
                  .slice(0, isExpanded ? undefined : 1)
                  .map((scholarship, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-muted/50 border border-border/50 space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-medium text-sm">{scholarship.name}</h5>
                        <Badge className={`text-[10px] ${getFundingColor(scholarship.funding)}`}>
                          {scholarship.funding}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <GraduationCap className="h-3 w-3" />
                          {scholarship.level}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {scholarship.deadline}
                        </span>
                      </div>

                      {scholarship.eligibility && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {scholarship.eligibility}
                        </p>
                      )}

                      {scholarship.url && (
                        <a
                          href={scholarship.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                        >
                          Apply Now <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  ))}
              </div>

              {university.scholarships.length > 1 && !isExpanded && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(true)}
                  className="w-full text-xs"
                >
                  Show {university.scholarships.length - 1} more scholarships
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
