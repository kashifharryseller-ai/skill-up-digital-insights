import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Clock, Users, Star, ArrowRight, Filter } from "lucide-react";

const categories = ["All", "Technology", "Business", "Healthcare", "Arts", "Science", "Engineering"];
const levels = ["All Levels", "Undergraduate", "Graduate", "Doctoral", "Certificate"];

const allPrograms = [
  {
    id: 1,
    title: "Computer Science & Engineering",
    category: "Technology",
    level: "Undergraduate",
    duration: "4 Years",
    students: "2.5K+",
    rating: 4.9,
    price: "$45,000/year",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop",
    description: "Comprehensive program covering algorithms, systems design, and software engineering.",
    featured: true,
  },
  {
    id: 2,
    title: "Business Administration (MBA)",
    category: "Business",
    level: "Graduate",
    duration: "2 Years",
    students: "1.8K+",
    rating: 4.8,
    price: "$60,000/year",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    description: "Leadership-focused MBA with specializations in finance, marketing, and strategy.",
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
    price: "$52,000/year",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    description: "Master machine learning, big data analytics, and statistical modeling.",
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
    price: "$55,000/year",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    description: "Comprehensive medical education with clinical rotations and research opportunities.",
    featured: false,
  },
  {
    id: 5,
    title: "Artificial Intelligence",
    category: "Technology",
    level: "Graduate",
    duration: "2 Years",
    students: "900+",
    rating: 4.8,
    price: "$58,000/year",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    description: "Deep dive into neural networks, NLP, computer vision, and AI ethics.",
    featured: true,
  },
  {
    id: 6,
    title: "Digital Marketing",
    category: "Business",
    level: "Certificate",
    duration: "6 Months",
    students: "3.2K+",
    rating: 4.7,
    price: "$5,000",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    description: "Master SEO, social media marketing, analytics, and growth strategies.",
    featured: false,
  },
  {
    id: 7,
    title: "Graphic Design & UX",
    category: "Arts",
    level: "Undergraduate",
    duration: "3 Years",
    students: "1.1K+",
    rating: 4.6,
    price: "$38,000/year",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    description: "Creative design program covering visual arts, UX/UI, and brand identity.",
    featured: false,
  },
  {
    id: 8,
    title: "Biomedical Engineering",
    category: "Engineering",
    level: "Graduate",
    duration: "2 Years",
    students: "650+",
    rating: 4.8,
    price: "$50,000/year",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop",
    description: "Bridge engineering and medicine to develop cutting-edge medical devices.",
    featured: true,
  },
];

export default function Programs() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All Levels");

  const filteredPrograms = allPrograms.filter((program) => {
    const matchesSearch = program.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || program.category === category;
    const matchesLevel = level === "All Levels" || program.level === level;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              200+ Programs Available
            </Badge>
            <h1
              className="text-4xl sm:text-5xl font-bold tracking-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Explore Our <span className="text-gradient">Programs</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover world-class academic programs designed to prepare you for success
              in your chosen field.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border sticky top-20 bg-background/95 backdrop-blur-xl z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search programs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((lvl) => (
                  <SelectItem key={lvl} value={lvl}>
                    {lvl}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredPrograms.length}</span> programs
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="h-full bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-52 overflow-hidden">
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
                    <div className="absolute bottom-3 left-3">
                      <span className="text-2xl font-bold text-white">{program.price}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {program.level}
                      </Badge>
                      <div className="flex items-center gap-1 text-warning">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs font-medium">{program.rating}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                      {program.title}
                    </h3>

                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {program.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{program.students}</span>
                      </div>
                    </div>

                    <Button className="w-full gap-2 group/btn">
                      Learn More
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPrograms.length === 0 && (
            <div className="text-center py-16">
              <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No programs found</h3>
              <p className="text-muted-foreground">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
