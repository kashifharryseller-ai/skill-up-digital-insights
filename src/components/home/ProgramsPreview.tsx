import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

const programs = [
  {
    id: 1,
    title: "Computer Science & Engineering",
    category: "Technology",
    level: "Undergraduate",
    duration: "4 Years",
    students: "2.5K+",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "Business Administration",
    category: "Business",
    level: "Graduate",
    duration: "2 Years",
    students: "1.8K+",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    featured: false,
  },
  {
    id: 3,
    title: "Data Science & Analytics",
    category: "Technology",
    level: "Graduate",
    duration: "1.5 Years",
    students: "1.2K+",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    featured: true,
  },
  {
    id: 4,
    title: "Medicine & Healthcare",
    category: "Healthcare",
    level: "Doctoral",
    duration: "6 Years",
    students: "800+",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    featured: false,
  },
];

export function ProgramsPreview() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">
              Programs
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Top <span className="text-gradient">Fields</span>
            </h2>
          </div>
          <Button variant="outline" className="gap-2 group self-start md:self-auto" asChild>
            <Link to="/programs">
              View All
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>

        {/* Programs Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={program.image}
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {program.featured && (
                    <Badge className="absolute top-3 left-3 bg-gradient-primary">
                      Featured
                    </Badge>
                  )}
                  <Badge
                    variant="secondary"
                    className="absolute top-3 right-3 bg-background/90"
                  >
                    {program.category}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {program.level}
                    </Badge>
                    <div className="flex items-center gap-1 text-warning">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="text-xs font-medium">{program.rating}</span>
                    </div>
                  </div>

                  <h3 className="font-semibold text-lg mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {program.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{program.students}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
