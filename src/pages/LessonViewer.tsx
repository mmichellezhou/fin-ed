import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { LessonVideosDropdown } from "./LessonVideosDropdown";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Star,
  StarOff,
  Search,
  BookOpen,
  Play,
  Award,
  Filter,
  ArrowRight,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
// future consideration: automating categorization based on title/video, default linking 'image' to category
// Mock lesson data
const lessonsData = {
  kids: [
    {
      id: 1,
      title: "What is Money?",
      category: "basics",
      description:
        "Learn about coins, bills, and what money is used for in simple terms.",
      image: "💰",
      completed: true,
      starred: false,
      duration: "10 min",
    },
    {
      id: 2,
      title: "Saving vs Spending",
      category: "saving",
      description:
        "Understand when to save money and when it's okay to spend it.",
      image: "🏦",
      completed: false,
      starred: true,
      duration: "8 min",
    },
    {
      id: 3,
      title: "Needs vs Wants",
      category: "budgeting",
      description:
        "Learn the difference between things you need and things you want.",
      image: "🛒",
      completed: false,
      starred: false,
      duration: "12 min",
    },
  ],
  teens: [
    {
      id: 4,
      title: "Understanding Your Relationship with Money",
      category: "basics",
      description:
        "Explores how emotions and beliefs shape your money habits and mindset.",
      image: "💰",
      completed: true,
      starred: true,
      duration: "15 min",
    },
    {
      id: 5,
      title: "Budgeting Basics",
      category: "budgeting",
      description:
        "Outlines the 50‑30‑20 rule for balanced budgeting. Covers envelope and zero‑based budgeting methods.",
      image: "🛒",
      completed: false,
      starred: false,
      duration: "20 min",
      videos: [
        {
          title: "Intro to Budgeting",
          url: "https://youtu.be/OZQQMYfaBT4",
        },
        {
          title: "Budgeting Methods",
          url: "https://youtu.be/sVKQn2I4HDM",
        },
      ],
    },
    {
      id: 6,
      title: "Banking & How to Use It",
      category: "basics",
      description:
        "Reviews checking vs. savings accounts, fees, and mobile banking. Guides on setting up accounts and optimizing interest rates.",
      image: "💰",
      completed: false,
      starred: false,
      duration: "20 min",
      videos: [
        {
          title: "Banking Basics",
          url: "https://youtu.be/d-6qQgvxgAE",
        },
        {
          title: "Understanding Banking Services",
          url: "https://www.youtube.com/watch?v=JTm7aABfWYs&t=12s",
        },
      ],
    },
    {
      id: 7,
      title: " Saving and Emergency Funds",
      category: "saving",
      description:
        "Emphasizes having 3–6 months of expenses saved up. Discusses short‑ vs. long‑term savings goals and automating saving.",
      image: "🏦",
      completed: false,
      starred: false,
      duration: "20 min",
      videos: [
        {
          title: "Emergency Fund Basics",
          url: "https://www.youtube.com/watch?v=dNiNMih-CNk&t=126s",
        },
        {
          title: "Building Your Savings",
          url: "https://www.youtube.com/watch?v=Bo4jhKZPAzw&t=13s",
        },
      ],
    },
    {
      id: 8,
      title: "Credit Cards and Credit Scores",
      category: "credit",
      description:
        "Explains credit card use, interest, and responsible habits. Breaks down credit scores and how to improve them.",
      image: "💳",
      completed: false,
      starred: false,
      duration: "20 min",
      videos: [
        {
          title: "Credit Card Basics",
          url: "https://youtu.be/1w_SM2RXTWA",
        },
        {
          title: "Understanding Credit Scores",
          url: "https://youtu.be/84gQHufvz6U",
        },
      ],
    },
    {
      id: 9,
      title: "Debt: Good vs. Bad",
      category: "credit",
      description:
        "Defines good vs. bad debt and managing payment priorities. Introduces snowball vs. avalanche repayment strategies.",
      image: "💳",
      completed: false,
      starred: false,
      duration: "20 min",
      videos: [
        {
          title: "Understanding Debt Types",
          url: "https://www.youtube.com/watch?v=f24A_AQ_rdw&t=6s",
        },
        {
          title: "Debt Management Strategies",
          url: "https://www.youtube.com/watch?v=Zr2nufX-NWg",
        },
      ],
    },
    {
      id: 10,
      title: "Earning Income & Your First Paycheck",
      category: "basics",
      description:
        "Explains gross vs. net pay and payroll deductions. Walks through a typical paycheck stub.",
      image: "💰",
      completed: false,
      starred: false,
      duration: "20 min",
      videos: [
        {
          title: "Understanding Your Paycheck",
          url: "https://www.youtube.com/watch?v=hNxVLvLClhs",
        },
        {
          title: "Anatomy of a Paycheck",
          url: "https://www.khanacademy.org/college-careers-more/financial-literacy/xa6995ea67a8e9fdd:additional-resources/xa6995ea67a8e9fdd:pay-benefits/v/anatomy-of-a-paycheck",
        },
      ],
    },
    {
      id: 11,
      title: "Taxes 101",
      category: "taxes",
      description:
        "Learn the basics of taxes, including different types of taxes and how they affect your income.",
      image: "📊",
      completed: false,
      starred: false,
      duration: "25 min",
      videos: [
        {
          title: "Tax Basics for Beginners",
          url: "https://youtu.be/ck1hntzKjpY?feature=shared",
        },
        {
          title: "Understanding Tax Forms",
          url: "https://youtu.be/hpraZHqCA38?feature=shared",
        },
      ],
    },
    {
      id: 12,
      title: "Smart Spending & Consumer Awareness",
      category: "budgeting",
      description:
        "Learn how to make smart purchasing decisions and avoid common consumer traps.",
      image: "🛒",
      completed: false,
      starred: false,
      duration: "18 min",
      videos: [
        {
          title: "Smart Shopping Strategies",
          url: "https://youtu.be/HirtcHWf3qk?feature=shared",
        },
        {
          title: "Consumer Awareness Tips",
          url: "https://youtu.be/RDHlIugXr8g?feature=shared",
        },
      ],
    },
    {
      id: 13,
      title: "Intro to Investing",
      category: "investing",
      description:
        "Get started with investing basics, understanding different investment types and strategies.",
      image: "📈",
      completed: false,
      starred: false,
      duration: "22 min",
      videos: [
        {
          title: "Investment Basics",
          url: "https://youtu.be/41NEzVjGmts?feature=shared",
        },
        {
          title: "Getting Started with Investing",
          url: "https://youtu.be/qIw-yFC-HNU?feature=shared",
        },
      ],
    },
  ],
};

const categories = {
  all: "All Lessons",
  basics: "Basics",
  saving: "Saving",
  budgeting: "Budgeting",
  credit: "Credit & Loans",
  investing: "Investing",
  retirement: "Retirement",
  taxes: "Taxes",
};

const LessonViewer = () => {
  const { ageGroup } = useParams<{ ageGroup: string }>();
  const navigate = useNavigate();
  const {
    userProfile,
    updateProgress,
    isAgeGroupCompleted,
    getLessonVideoProgress,
  } = useUser();
  const [lessons, setLessons] = useState<any[]>([]);
  const [filteredLessons, setFilteredLessons] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  // Redirect to setup if no user profile
  useEffect(() => {
    if (!userProfile) {
      navigate("/setup");
      return;
    }
  }, [userProfile, navigate]);

  useEffect(() => {
    const groupLessons =
      lessonsData[ageGroup as keyof typeof lessonsData] || [];
    setLessons(groupLessons);
    setFilteredLessons(groupLessons);
  }, [ageGroup]);

  // Check if the age group has lessons available
  const hasLessons = lessons.length > 0;

  useEffect(() => {
    let filtered = lessons;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (lesson) => lesson.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (lesson) =>
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
    const updatedLessons = lessons.map((lesson) =>
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

  // Check if lesson is completed based on video progress
  const isLessonCompleted = (lesson: any) => {
    if (lesson.completed) return true;
    if (!lesson.videos || lesson.videos.length === 0) return false;

    const videoProgress = getLessonVideoProgress(
      ageGroup || "",
      lesson.id,
      lesson.videos.length
    );
    return (
      videoProgress.completed === videoProgress.total && videoProgress.total > 0
    );
  };

  const completedCount = lessons.filter((l) => isLessonCompleted(l)).length;
  const totalLessons = lessons.length;
  const isCurrentAgeGroupCompleted =
    completedCount === totalLessons && totalLessons > 0;

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

          {/* Age Group Note */}
          <div className="mt-4 p-3 bg-accent/30 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-muted-foreground">
              💡 Want to explore other age groups? Visit your profile in the
              user menu to switch age groups.
            </p>
          </div>
        </div>

        {/* Coming Soon Banner for Unavailable Age Groups */}
        {!hasLessons && (
          <Card className="mb-8 p-6 bg-gradient-to-r from-muted/20 to-muted/30 border-dashed border-muted-foreground/30 animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Coming Soon! 🚀
              </h2>
              <p className="text-muted-foreground mb-4">
                We're working hard to create amazing lessons for {ageGroup}.
                Check back soon!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => navigate("/lessons/kids")}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Kids Lessons
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => navigate("/lessons/teens")}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Teens Lessons
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Age Group Completion Banner */}
        {hasLessons && isCurrentAgeGroupCompleted && (
          <Card className="mb-8 p-6 bg-gradient-to-r from-success/10 to-secondary/10 border-success/20 animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Congratulations! 🎉
              </h2>
              <p className="text-muted-foreground mb-4">
                You've completed all {ageGroup} lessons! Ready to explore other
                age groups?
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={() => navigate("/lessons/kids")}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Kids Lessons
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => navigate("/lessons/teens")}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Teens Lessons
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Search and Filter */}
        {hasLessons && (
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
        )}

        {/* Lessons Grid */}
        {hasLessons && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map((lesson, index) => (
                <Card
                  key={lesson.id}
                  className={`card-interactive animate-fade-in ${
                    isLessonCompleted(lesson)
                      ? "border-success/50 bg-success/5"
                      : ""
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
                        className={
                          lesson.starred
                            ? "text-yellow-400"
                            : "text-muted-foreground hover:text-yellow-400"
                        }
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={
                            isLessonCompleted(lesson) ? "default" : "secondary"
                          }
                        >
                          {
                            categories[
                              lesson.category as keyof typeof categories
                            ]
                          }
                        </Badge>
                        {isLessonCompleted(lesson) && (
                          <Award className="w-4 h-4 text-success" />
                        )}
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
                              <p className="text-muted-foreground">
                                {lesson.description}
                              </p>

                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <BookOpen className="w-4 h-4" />
                                  {lesson.duration}
                                </span>
                                <Badge>
                                  {
                                    categories[
                                      lesson.category as keyof typeof categories
                                    ]
                                  }
                                </Badge>
                              </div>

                              <div className="flex gap-2 pt-4">
                                {lesson.videos && lesson.videos.length > 0 ? (
                                  <LessonVideosDropdown
                                    videos={lesson.videos}
                                    lessonId={lesson.id}
                                    ageGroup={ageGroup || ""}
                                  />
                                ) : (
                                  <Button
                                    onClick={() => startLesson(lesson)}
                                    className="flex-1 flex items-center gap-2"
                                    variant="hero"
                                  >
                                    <Play className="w-4 h-4" />
                                    Start Lesson
                                  </Button>
                                )}

                                {isLessonCompleted(lesson) && (
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
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No lessons found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default LessonViewer;
