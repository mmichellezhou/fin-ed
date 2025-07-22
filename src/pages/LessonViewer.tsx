import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { StartLessonButton } from "./StartLessonButton";
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
  ChevronDown,
  Target,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import LessonDetailsDialog from "@/components/LessonDetailsDialog";
// future consideration: automating categorization based on title/video, default linking 'image' to category
// Mock lesson data
const lessonsData = {
  kids: [
    {
      id: 1,
      title: "What is Money?",
      category: "basics",
      description:
        "Explains what money is, where it comes from, and how it’s used.",
      image: "💰",
      completed: false,
      starred: false,
      duration: "7 min",
      videos: [
        {
          title: "What is Money?",
          url: "https://youtu.be/pRL93risEg4",
        },
      ],
    },
    {
      id: 2,
      title: "Saving vs Spending",
      category: "saving",
      description:
        "Shows the difference between saving money and spending it wisely.",
      image: "🏦",
      completed: false,
      starred: false,
      duration: "3 min",
      videos: [
        {
          title: "Saving vs Spending",
          url: "https://youtu.be/NfurkrZEn3Q",
        },
      ],
    },
    {
      id: 3,
      title: "Earning Money",
      category: "basics",
      description:
        "Talks about ways people earn money through work and effort.",
      image: "💵",
      completed: false,
      starred: false,
      duration: "8 min",
      videos: [
        {
          title: "Earning Money",
          url: "https://youtu.be/c4fvImcTz1Y",
        },
      ],
    },
    {
      id: 4,
      title: "Budgeting Basics",
      category: "budgeting",
      description:
        "Introduces how to plan money for needs, wants, and savings.",
      image: "📝",
      completed: false,
      starred: false,
      duration: "3 min",
      videos: [
        {
          title: "Budgeting Basics",
          url: "https://youtu.be/WRcgRimBac8",
        },
      ],
    },
    {
      id: 5,
      title: "Giving and Sharing",
      category: "giving",
      description: "Highlights why sharing money or resources can help others.",
      image: "🎁",
      completed: false,
      starred: false,
      duration: "6 min",
      videos: [
        {
          title: "Giving and Sharing",
          url: "https://youtu.be/gcN_8DFTKWw",
        },
      ],
    },
  ],
  teens: [
    {
      id: 4,
      title: "Understanding Your Relationship with Money",
      category: "basics",
      description:
        "Covers the basics of checking and savings accounts, how they work, and why they’re important for managing money.",
      image: "💰",
      completed: false,
      starred: true,
      duration: "6 min",
      videos: [
        {
          title: "Understanding Your Relationship with Money",
          url: "https://youtu.be/0iRbD5rM5qc",
        },
      ],
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
      title: "Saving and Emergency Funds",
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
  youngAdults: [
    {
      id: 1,
      title: "Credit Scores",
      category: "credit",
      description:
        "A quick explainer on what credit scores are, how they’re calculated, and how to build good credit.",
      image: "💳",
      completed: false,
      starred: false,
      duration: "3 min",
      videos: [
        {
          title: "Credit Scores",
          url: "https://youtu.be/1w_SM2RXTWA",
        },
      ],
    },
    {
      id: 2,
      title: "Intro to Investing (Playlist)",
      category: "investing",
      description:
        "Covers investing basics with clear visuals—stocks, bonds, risk, and more advanced topics like options and margin.",
      image: "📈",
      completed: false,
      starred: false,
      duration: "1 hr",
      videos: [
        {
          title: "Intro to Investing (Playlist)",
          url: "https://youtube.com/playlist?list=PLVqSsfU_wIKLwXGos2EMSXiwHlSnC5yoa",
        },
      ],
    },
    {
      id: 3,
      title: "Taxes and Paychecks",
      category: "taxes",
      description:
        "Explains paycheck deductions (taxes, Social Security, etc.) and the difference between gross and net pay.",
      image: "📊",
      completed: false,
      starred: false,
      duration: "4 min",
      videos: [
        {
          title: "Taxes and Paychecks",
          url: "https://youtu.be/uDz023pfmhY",
        },
        {
          title: "How Taxes Work",
          url: "https://youtu.be/Cox8rLXYAGQ",
        },
      ],
    },
    {
      id: 4,
      title: "Loans and Debt",
      category: "credit",
      description:
        "Introduces interest, APR, and smart debt repayment strategies for student loans or credit cards.",
      image: "🏦",
      completed: false,
      starred: false,
      duration: "3 min",
      videos: [
        {
          title: "Loans and Debt",
          url: "https://youtu.be/7VBRg4p5WDw",
        },
      ],
    },
    {
      id: 5,
      title: "Retirement and Financial Independence",
      category: "retirement",
      description:
        "Explores the FIRE movement––how to save and invest to retire early and gain long-term financial freedom.",
      image: "💒",
      completed: false,
      starred: false,
      duration: "40 min",
      videos: [
        {
          title: "Retirement and Financial Independence",
          url: "https://youtu.be/FkV_20Faoio",
        },
      ],
    },
  ],
  adults: [
    {
      id: 1,
      title: "Understanding Money & Your Relationship With It",
      category: "basics",
      description:
        "Looks at personal values, emotions, and behaviors around money to help improve financial decision-making.",
      image: "💡",
      completed: false,
      starred: false,
      duration: "12 min",
      videos: [
        {
          title: "Understanding Money & Your Relationship With It",
          url: "https://www.youtube.com/watch?v=TYqZaqKcOwg",
        },
        {
          title: "Money Habits and Mindset",
          url: "https://www.youtube.com/watch?v=yhq1cPRHR6k",
        },
      ],
    },
    {
      id: 2,
      title: "Budgeting",
      category: "budgeting",
      description:
        "Learn to create a realistic budget and stick to it using the 50/30/20 rule and tracking expenses.",
      image: "📝",
      completed: false,
      starred: false,
      duration: "9 min",
      videos: [
        {
          title: "Budgeting Basics",
          url: "https://www.youtube.com/watch?v=T_776Cwvejs",
        },
        {
          title: "Building a Monthly Budget",
          url: "https://www.youtube.com/watch?v=q5LsuqGcApU",
        },
      ],
    },
    {
      id: 3,
      title: "Banking & How To Use It",
      category: "basics",
      description:
        "Explains the basics of using checking and savings accounts, online banking, and ATMs.",
      image: "🏦",
      completed: false,
      starred: false,
      duration: "11 min",
      videos: [
        {
          title: "Understanding Banking Services",
          url: "https://www.youtube.com/watch?v=JTm7aABfWYs",
        },
        {
          title: "Setting Up a Bank Account",
          url: "https://www.youtube.com/watch?v=AL2jt76GT_g",
        },
      ],
    },
    {
      id: 4,
      title: "Saving & Emergency Funds",
      category: "saving",
      description:
        "Covers why emergency funds are crucial, how much to save, and where to keep the money.",
      image: "💰",
      completed: false,
      starred: false,
      duration: "8 min",
      videos: [
        {
          title: "Emergency Funds",
          url: "https://www.youtube.com/watch?v=yC3W2ZoYeL4",
        },
        {
          title: "Saving Strategies",
          url: "https://www.youtube.com/watch?v=zgXIV-dDhP0",
        },
      ],
    },
    {
      id: 5,
      title: "Credit Cards and Credit Scores",
      category: "credit",
      description:
        "Basic credit card usage tips—how interest works and how to avoid debt.",
      image: "💳",
      completed: false,
      starred: false,
      duration: "3 min",
      videos: [
        {
          title: "Credit Card Usage Tips",
          url: "https://www.youtube.com/watch?v=hbtZNq8W8Zc",
        },
        {
          title: "Understanding Credit Reports and Scores",
          url: "https://www.youtube.com/watch?v=EqpZYH9FEe8",
        },
      ],
    },
  ],
  seniors: [
    {
      id: 1,
      title: "Retirement Planning & Withdrawal Strategies",
      category: "retirement",
      description:
        "Walks through how to plan retirement withdrawals to minimize taxes and maximize income.",
      image: "📅",
      completed: false,
      starred: false,
      duration: "25 min",
      videos: [
        {
          title: "Retirement Planning & Withdrawal Strategies",
          url: "https://www.youtube.com/watch?v=RexviiNL24g",
        },
        {
          title: "Pacing Savings Withdrawals",
          url: "https://www.youtube.com/watch?v=UO_0QBgXlWc",
        },
      ],
    },
    {
      id: 2,
      title: "Social Security & Pensions",
      category: "retirement",
      description:
        "Comprehensive overview of how Social Security works, when to claim, and how it affects retirement.",
      image: "🧓",
      completed: false,
      starred: false,
      duration: "55 min",
      videos: [
        {
          title: "How Social Security Works",
          url: "https://www.youtube.com/watch?v=SfkqllXCJ0o",
        },
        {
          title: "Social Security Benefits",
          url: "https://www.youtube.com/watch?v=wFXzJ3tGvBM",
        },
      ],
    },
    {
      id: 3,
      title: "Smart Spending in Retirement",
      category: "budgeting",
      description:
        "Teaches retirees how to create spending plans that balance fun and sustainability.",
      image: "💸",
      completed: false,
      starred: false,
      duration: "13 min",
      videos: [
        {
          title: "Smart Spending in Retirement",
          url: "https://www.youtube.com/watch?v=VrIQSVMBxXQ",
        },
        {
          title: "Cutting Expenses in Retirement",
          url: "https://www.youtube.com/watch?v=gIWxb_-jvX8",
        },
      ],
    },
    {
      id: 4,
      title: "Avoiding Scams & Financial Fraud",
      category: "basics",
      description:
        "Educates seniors on common scams (phone, email, online) and how to stay safe.",
      image: "🚨",
      completed: false,
      starred: false,
      duration: "35 min",
      videos: [
        {
          title: "Avoiding Scams & Financial Fraud",
          url: "https://www.youtube.com/watch?v=K22fH5mlbb4",
        },
        {
          title: "Detecting and Reporting Fraud",
          url: "https://www.youtube.com/watch?v=ekhYNpXkG3I",
        },
      ],
    },
    {
      id: 5,
      title: "Healthcare and Long-Term Financial Planning",
      category: "retirement",
      description:
        "Short guide to planning for medical expenses, Medicare, and long-term care.",
      image: "🏥",
      completed: false,
      starred: false,
      duration: "7 min",
      videos: [
        {
          title: "Healthcare and Long-Term Financial Planning",
          url: "https://www.youtube.com/watch?v=3r0isZ2jgbI",
        },
        {
          title: "Costs of Healthcare in Retirement",
          url: "https://www.youtube.com/watch?v=vTLDYe4mK6I",
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

// Add a mapping for category colors
const categoryColors: Record<string, string> = {
  basics: "bg-blue-100 text-blue-800",
  saving: "bg-green-100 text-green-800",
  budgeting: "bg-yellow-100 text-yellow-800",
  credit: "bg-purple-100 text-purple-800",
  investing: "bg-pink-100 text-pink-800",
  retirement: "bg-orange-100 text-orange-800",
  taxes: "bg-red-100 text-red-800",
  giving: "bg-teal-100 text-teal-800",
};

// Helper to parse duration strings like '1 hr', '30 min', '3 hr 40 min', etc.
function parseDurationToMinutes(duration: string): number {
  let total = 0;
  const hrMatch = duration.match(/(\d+)\s*hr/);
  const minMatch = duration.match(/(\d+)\s*min/);
  if (hrMatch) total += parseInt(hrMatch[1], 10) * 60;
  if (minMatch) total += parseInt(minMatch[1], 10);
  return total;
}

// Helper to format age group label
function formatAgeGroupLabel(ageGroup: string | undefined) {
  if (!ageGroup) return '';
  // Insert space before capital letters (except the first), then capitalize each word
  return ageGroup
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

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
  // Add state for filters
  const [sortBy, setSortBy] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [completionFilter, setCompletionFilter] = useState<string>("");
  // Add state to track open dropdowns
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Redirect to setup if no user profile
  useEffect(() => {
    if (!userProfile) {
      navigate("/setup");
      return;
    }
    // If no ageGroup param, redirect to user's current age group
    if (!ageGroup && userProfile.currentAgeGroup) {
      navigate(`/lessons/${userProfile.currentAgeGroup}`);
    }
  }, [userProfile, navigate, ageGroup]);

  useEffect(() => {
    const groupLessons =
      lessonsData[ageGroup as keyof typeof lessonsData] || [];
    setLessons(groupLessons);
    setFilteredLessons(groupLessons);
  }, [ageGroup]);

  // Check if the age group has lessons available
  const hasLessons = lessons.length > 0;

  // Update filter logic
  useEffect(() => {
    let filtered = lessons;
    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((lesson) => lesson.category === categoryFilter);
    }
    // Completion filter
    if (completionFilter) {
      filtered = filtered.filter((lesson) => {
        if (completionFilter === "todo") return !isLessonCompleted(lesson) && getLessonVideoProgress(ageGroup || "", lesson.id, lesson.videos?.length || 0).completed === 0;
        if (completionFilter === "inprogress") {
          const videoProgress = getLessonVideoProgress(ageGroup || "", lesson.id, lesson.videos?.length || 0);
          return !isLessonCompleted(lesson) && videoProgress.completed > 0;
        }
        if (completionFilter === "completed") return isLessonCompleted(lesson);
        return true;
      });
    }
    // Search term
    if (searchTerm) {
      filtered = filtered.filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Sort
    if (sortBy === "name") {
      filtered = [...filtered].sort((a, b) => a.title.trim().localeCompare(b.title.trim()));
    } else if (sortBy === "shortest") {
      filtered = [...filtered].sort((a, b) => parseDurationToMinutes(a.duration) - parseDurationToMinutes(b.duration));
    } else if (sortBy === "longest") {
      filtered = [...filtered].sort((a, b) => parseDurationToMinutes(b.duration) - parseDurationToMinutes(a.duration));
    } else if (sortBy === "starred") {
      filtered = [...filtered].sort((a, b) => (b.starred ? 1 : 0) - (a.starred ? 1 : 0));
    }
    setFilteredLessons(filtered);
  }, [lessons, categoryFilter, completionFilter, searchTerm, sortBy]);

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

  // Helper for lesson status badge
  const getLessonStatus = (lesson: any) => {
    if (!lesson.videos || lesson.videos.length === 0) {
      return { text: "To Do", className: "bg-primary text-white" };
    }
    const videoProgress = getLessonVideoProgress(
      ageGroup || "",
      lesson.id,
      lesson.videos.length
    );
    if (videoProgress.completed === videoProgress.total && videoProgress.total > 0) {
      return { text: "Completed", className: "bg-success text-white" };
    } else if (videoProgress.completed > 0) {
      return { text: "In Progress", className: "bg-warning text-white" };
    } else {
      return { text: "To Do", className: "bg-primary text-white" };
    }
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
            {formatAgeGroupLabel(ageGroup)} Lessons
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
          <div className="mt-4 max-w-xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              💡 Want to explore other age groups? Visit your profile to switch.
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
          <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in bg-muted px-4 py-2 items-center rounded-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search lessons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
            {/* Sort Dropdown */}
            <DropdownMenu open={openDropdown === "sort"} onOpenChange={(open) => setOpenDropdown(open ? "sort" : null)}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[140px] flex items-center justify-between bg-white hover:border-primary">
                  {sortBy ? (sortBy === "name" ? "Name" : sortBy === "shortest" ? "Shortest" : sortBy === "longest" ? "Longest" : sortBy === "starred" ? "Starred" : "Sort by") : "Sort by"}
                  <ChevronDown className={`ml-2 transition-transform ${openDropdown === "sort" ? "rotate-180" : "rotate-0"}`} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setSortBy("")}>Sort by</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("name")}>Name</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("shortest")}>Shortest</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("longest")}>Longest</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("starred")}>Starred</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Category Dropdown */}
            <DropdownMenu open={openDropdown === "category"} onOpenChange={(open) => setOpenDropdown(open ? "category" : null)}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[140px] flex items-center justify-between bg-white hover:border-primary">
                  {categoryFilter === "all" ? "Category" : categories[categoryFilter as keyof typeof categories]}
                  <ChevronDown className={`ml-2 transition-transform ${openDropdown === "category" ? "rotate-180" : "rotate-0"}`} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setCategoryFilter("all")}>Category</DropdownMenuItem>
                {Object.entries(categories).filter(([key]) => key !== "all").map(([key, label]) => (
                  <DropdownMenuItem key={key} onClick={() => setCategoryFilter(key)}>{label}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Completion Dropdown */}
            <DropdownMenu open={openDropdown === "completion"} onOpenChange={(open) => setOpenDropdown(open ? "completion" : null)}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="min-w-[140px] flex items-center justify-between bg-white hover:border-primary">
                  {completionFilter ? (completionFilter === "todo" ? "To Do" : completionFilter === "inprogress" ? "In Progress" : "Completed") : "Completion"}
                  <ChevronDown className={`ml-2 transition-transform ${openDropdown === "completion" ? "rotate-180" : "rotate-0"}`} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => setCompletionFilter("")}>Completion</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCompletionFilter("todo")}>To Do</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCompletionFilter("inprogress")}>In Progress</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCompletionFilter("completed")}>Completed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Lessons Grid */}
        {hasLessons && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map((lesson, index) => (
                <Card
                  key={lesson.id}
                  className="card-interactive animate-fade-in h-full flex flex-col"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-4xl mb-2">{lesson.image}</div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStar(lesson.id)}
                        className={
                          (lesson.starred
                            ? "text-yellow-400"
                            : "text-muted-foreground hover:text-yellow-400") +
                          " aspect-square w-8 h-8 p-0 rounded"
                        }
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </Button>
                    </div>

                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2 justify-start">
                        <Badge
                          variant={isLessonCompleted(lesson) ? "default" : "secondary"}
                          className={(categoryColors[lesson.category] || "") + " pointer-events-none select-none"}
                        >
                          {categories[lesson.category as keyof typeof categories]}
                        </Badge>
                        {/* Status badge */}
                        <Badge className={getLessonStatus(lesson).className + " pointer-events-none select-none"}>{getLessonStatus(lesson).text}</Badge>
                      </div>

                      <h3 className="font-semibold text-lg text-foreground">
                        {lesson.title}
                      </h3>

                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {lesson.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-auto">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                      <LessonDetailsDialog
                        lesson={lesson}
                        ageGroup={ageGroup || ""}
                        isLessonCompleted={isLessonCompleted}
                        goToQuiz={goToQuiz}
                        startLesson={startLesson}
                        categoryColors={categoryColors}
                        categories={categories}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedLesson(lesson)}
                        >
                          View Details
                        </Button>
                      </LessonDetailsDialog>
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
