import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, StarOff, Search, BookOpen, Play, Award, Filter } from "lucide-react";

// Mock lesson data
const lessonsData = {
  kids: [
    {
      id: 1,
      title: "What is Money?",
      category: "basics",
      description: "Learn about coins, bills, and what money is used for in simple terms.",
      image: "💰",
      completed: true,
      starred: false,
      duration: "10 min"
    },
    {
      id: 2,
      title: "Saving vs Spending",
      category: "saving",
      description: "Understand when to save money and when it's okay to spend it.",
      image: "🏦",
      completed: false,
      starred: true,
      duration: "8 min"
    },
    {
      id: 3,
      title: "Needs vs Wants",
      category: "budgeting",
      description: "Learn the difference between things you need and things you want.",
      image: "🛒",
      completed: false,
      starred: false,
      duration: "12 min"
    }
  ],
  teens: [
    {
      id: 4,
      title: "Your First Budget",
      category: "budgeting",
      description: "Create your first budget and track your income and expenses.",
      image: "📊",
      completed: true,
      starred: true,
      duration: "15 min"
    },
    {
      id: 5,
      title: "Understanding Credit",
      category: "credit",
      description: "Learn what credit is and how it affects your financial future.",
      image: "💳",
      completed: false,
      starred: false,
      duration: "20 min"
    }
  ]
};

const categories = {
  all: "All Lessons",
  basics: "Basics",
  saving: "Saving",
  budgeting: "Budgeting",
  credit: "Credit & Loans",
  investing: "Investing",
  retirement: "Retirement",
  taxes: "Taxes"
};

const LessonViewer = () => {
  const { ageGroup } = useParams<{ ageGroup: string }>();
  const [lessons, setLessons] = useState<any[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  useEffect(() => {
    const groupLessons = lessonsData[ageGroup as keyof typeof lessonsData] || [];
    setLessons(groupLessons);
    setFilteredLessons(groupLessons);
  }, [ageGroup]);

  useEffect(() => {
    let filtered = lessons;
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(lesson => lesson.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(lesson =>
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort starred lessons to top
    filtered.sort((a, b) => {
      if (a.starred && !b.starred) return -1;
      if (!a.starred && b.starred) return 1;
      return 0;
    });
    
    setFilteredLessons(filtered);
  }, [lessons, selectedCategory, searchTerm]);

  const toggleStar = (lessonId: number) => {
    const updatedLessons = lessons.map(lesson =>
      lesson.id === lessonId ? { ...lesson, starred: !lesson.starred } : lesson
    );
    setLessons(updatedLessons);
  };

  const startLesson = (lesson: any) => {
    // In a real app, this would navigate to the lesson content
    console.log("Starting lesson:", lesson.title);
    setSelectedLesson(null);
  };

  const goToQuiz = (lesson: any) => {
    // Navigate to quiz page
    console.log("Going to quiz for:", lesson.title);
  };

  const completedCount = lessons.filter(l => l.completed).length;
  const totalLessons = lessons.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-playfair font-bold text-foreground mb-2">
            {ageGroup?.charAt(0).toUpperCase() + ageGroup?.slice(1)} Lessons
          </h1>
          <p className="text-muted-foreground mb-4">
            Progress: {completedCount} of {totalLessons} lessons completed
          </p>
          <div className="w-full max-w-md mx-auto bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / totalLessons) * 100}%` }}
            />
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {Object.entries(categories).map(([key, label]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(key)}
                className="flex items-center gap-1"
              >
                <Filter className="w-3 h-3" />
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson, index) => (
            <Card
              key={lesson.id}
              className={`card-interactive animate-fade-in ${
                lesson.completed ? 'border-success/50 bg-success/5' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl mb-2">{lesson.image}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleStar(lesson.id)}
                    className={lesson.starred ? "text-yellow-400" : "text-muted-foreground hover:text-yellow-400"}
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant={lesson.completed ? "default" : "secondary"}>
                      {categories[lesson.category as keyof typeof categories]}
                    </Badge>
                    {lesson.completed && <Award className="w-4 h-4 text-success" />}
                  </div>
                  
                  <h3 className="font-semibold text-lg text-foreground">
                    {lesson.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {lesson.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {lesson.duration}
                    </span>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedLesson(lesson)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-lg">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <span className="text-2xl">{lesson.image}</span>
                            {lesson.title}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <p className="text-muted-foreground">{lesson.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {lesson.duration}
                            </span>
                            <Badge>{categories[lesson.category as keyof typeof categories]}</Badge>
                          </div>
                          
                          <div className="flex gap-2 pt-4">
                            <Button
                              onClick={() => startLesson(lesson)}
                              className="flex-1 flex items-center gap-2"
                              variant="hero"
                            >
                              <Play className="w-4 h-4" />
                              Start Lesson
                            </Button>
                            
                            {lesson.completed && (
                              <Button
                                onClick={() => goToQuiz(lesson)}
                                variant="success"
                                className="flex items-center gap-2"
                              >
                                <Award className="w-4 h-4" />
                                Take Quiz
                              </Button>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No lessons found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonViewer;