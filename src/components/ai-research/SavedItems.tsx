import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBookmarks } from "@/hooks/useBookmarks";
import type { AIUniversityData, AIProfessor, AIScholarship } from "@/types/ai-research";
import {
  Bookmark,
  Trash2,
  ExternalLink,
  Building2,
  User,
  GraduationCap,
  Globe,
  Mail,
} from "lucide-react";

export function SavedItems() {
  const { bookmarks, removeBookmark, clearAllBookmarks, getBookmarksByType } = useBookmarks();

  const universities = getBookmarksByType('university');
  const professors = getBookmarksByType('professor');
  const scholarships = getBookmarksByType('scholarship');

  if (bookmarks.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 mb-4">
          <Bookmark className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Saved Items</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Bookmark universities, professors, and scholarships to save them here for easy access.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Your Saved Items</h3>
          <p className="text-sm text-muted-foreground">
            {bookmarks.length} item{bookmarks.length !== 1 ? 's' : ''} saved
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={clearAllBookmarks}>
          <Trash2 className="h-4 w-4 mr-2" /> Clear All
        </Button>
      </div>

      {/* Universities */}
      {universities.length > 0 && (
        <section>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            Universities ({universities.length})
          </h4>
          <div className="grid gap-4 md:grid-cols-2">
            {universities.map((item) => {
              const uni = item.data as AIUniversityData;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{uni.university}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              <Globe className="h-3 w-3 mr-1" />
                              {uni.country}
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBookmark(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          {uni.scholarships?.length || 0} scholarships
                        </span>
                        {uni.website && (
                          <a
                            href={uni.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" /> Visit
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* Professors */}
      {professors.length > 0 && (
        <section>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Professors ({professors.length})
          </h4>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {professors.map((item) => {
              const prof = item.data as AIProfessor;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{prof.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{prof.title}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBookmark(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {prof.university} • {prof.department}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {prof.research_area}
                      </Badge>
                      {prof.email && (
                        <a
                          href={`mailto:${prof.email}`}
                          className="flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          <Mail className="h-3 w-3" /> Contact
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* Scholarships */}
      {scholarships.length > 0 && (
        <section>
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            Scholarships ({scholarships.length})
          </h4>
          <div className="grid gap-4 md:grid-cols-2">
            {scholarships.map((item) => {
              const scholarship = item.data as AIScholarship;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">{scholarship.name}</CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBookmark(item.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{scholarship.level}</Badge>
                        <Badge variant="secondary">{scholarship.funding}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Deadline: {scholarship.deadline}
                      </p>
                      {scholarship.url && (
                        <a
                          href={scholarship.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" /> Apply Now
                        </a>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
