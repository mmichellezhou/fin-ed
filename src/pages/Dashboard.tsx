import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  BookOpen,
  Target,
  TrendingUp,
  ArrowRight,
  PieChart,
  Medal,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { lessonsData, formatAgeGroupLabel } from "./LessonViewer";

const Dashboard = () => {
  const { userProfile, isAgeGroupCompleted } = useUser();
  const navigate = useNavigate();

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-playfair font-bold text-foreground mb-4">
            Welcome to FinEd!
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Let's get started with your financial education journey
          </p>
          <Button onClick={() => navigate("/setup")} variant="hero" size="lg">
            Set Up Your Profile
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  // Calculate completed lessons for the current age group
  const currentLessons = lessonsData[userProfile.currentAgeGroup] || [];
  const completedLessonsCount = currentLessons.filter((lesson) => {
    if (!lesson.videos || lesson.videos.length === 0) return false;
    const videoProgress = userProfile.progress[userProfile.currentAgeGroup]?.videoProgress?.[lesson.id] || {};
    const completedVideos = Object.values(videoProgress).filter(Boolean).length;
    return completedVideos === lesson.videos.length && lesson.videos.length > 0;
  }).length;
  const totalLessonsCount = currentLessons.length;
  const overallProgress = totalLessonsCount > 0 ? (completedLessonsCount / totalLessonsCount) * 100 : 0;

  const earnedBadges = userProfile.badges.filter((badge) => badge.earned);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-playfair font-bold text-foreground">
              Welcome back, {userProfile.name}!
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Track your progress in {formatAgeGroupLabel(userProfile.currentAgeGroup)} Lessons
          </p>
        </div>

        {/* Overall Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card
            className="p-6 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Lessons Completed
                </p>
                <p className="text-2xl font-bold text-foreground">
                  {completedLessonsCount}/{totalLessonsCount}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <Progress value={overallProgress} className="mt-3 bg-gradient-to-r from-primary to-secondary" />
          </Card>

          <Card
            className="p-6 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Quiz Average</p>
                <p className="text-2xl font-bold text-foreground">
                  {userProfile.progress[userProfile.currentAgeGroup]?.averageScore || 0}%
                </p>
              </div>
              <Target className="w-8 h-8 text-success" />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              {userProfile.progress[userProfile.currentAgeGroup]?.completedQuizzes || 0} quizzes completed
            </div>
          </Card>

          <Card
            className="p-6 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Learning Streak</p>
                <p className="text-2xl font-bold text-foreground">
                  {userProfile.progress[userProfile.currentAgeGroup]?.streak || 0} days
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-500" />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">{userProfile.progress[userProfile.currentAgeGroup]?.streak || 0} days max</div>
          </Card>

          <Card
            className="p-6 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
                <p className="text-2xl font-bold text-foreground">
                  {earnedBadges.length}/{userProfile.badges.length}
                </p>
              </div>
              <Medal className="w-8 h-8 text-warning" />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              {userProfile.badges.length - earnedBadges.length} more to unlock
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Progress */}
          <Card
            className="p-6 animate-fade-in"
            style={{ animationDelay: "0.5s" }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Progress by Category
            </h2>
            <div className="space-y-4">
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  Category progress will be available as you complete lessons
                </p>
              </div>
            </div>
          </Card>

          {/* Badges */}
          <Card
            className="p-6 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
          >
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-black" />
              Achievements
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userProfile.badges.map((badge, index) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border transition-all ${
                    badge.earned
                      ? "border-success/50 bg-success/10"
                      : "border-border bg-muted/30 opacity-60"
                  }`}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Trophy
                        className={`w-6 h-6 ${
                          badge.earned
                            ? "text-warning"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>
                    <h3
                      className={`font-medium mb-1 ${
                        badge.earned
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {badge.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {badge.description}
                    </p>
                    {badge.earned && (
                      <Badge variant="default" className="mt-2 bg-success">
                        Earned
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
