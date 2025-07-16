
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Trophy, Award, Star, BookOpen, Target, TrendingUp } from "lucide-react";

// Mock user progress data
const userProgress = {
  totalLessons: 15,
  completedLessons: 8,
  totalQuizzes: 8,
  completedQuizzes: 3,
  averageScore: 85,
  streak: 5,
  badges: [
    { id: 1, name: "First Steps", description: "Complete your first lesson", earned: true, icon: "🎯" },
    { id: 2, name: "Quiz Master", description: "Score 90% or higher on 3 quizzes", earned: false, icon: "🧠" },
    { id: 3, name: "Consistent Learner", description: "Complete lessons 5 days in a row", earned: true, icon: "🔥" },
    { id: 4, name: "Budget Pro", description: "Complete all budgeting lessons", earned: false, icon: "💰" },
    { id: 5, name: "Savings Champion", description: "Complete all saving lessons", earned: true, icon: "🏆" }
  ],
  categoryProgress: [
    { name: "Basics", completed: 3, total: 4, percentage: 75 },
    { name: "Budgeting", completed: 2, total: 3, percentage: 67 },
    { name: "Saving", completed: 2, total: 2, percentage: 100 },
    { name: "Credit", completed: 1, total: 3, percentage: 33 },
    { name: "Investing", completed: 0, total: 3, percentage: 0 }
  ],
  recentActivity: [
    { type: "lesson", title: "Understanding Credit", date: "2 days ago", score: null },
    { type: "quiz", title: "Budgeting Basics Quiz", date: "3 days ago", score: 92 },
    { type: "lesson", title: "Emergency Funds", date: "1 week ago", score: null },
    { type: "quiz", title: "Saving Strategies Quiz", date: "1 week ago", score: 78 }
  ]
};

const Dashboard = () => {
  const overallProgress = (userProgress.completedLessons / userProgress.totalLessons) * 100;
  const earnedBadges = userProgress.badges.filter(badge => badge.earned);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-playfair font-bold text-foreground mb-4">
            Your Learning Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your progress and celebrate your achievements
          </p>
        </div>

        {/* Overall Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Lessons Completed</p>
                <p className="text-2xl font-bold text-foreground">
                  {userProgress.completedLessons}/{userProgress.totalLessons}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <Progress value={overallProgress} className="mt-3" />
          </Card>

          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Quiz Average</p>
                <p className="text-2xl font-bold text-foreground">{userProgress.averageScore}%</p>
              </div>
              <Target className="w-8 h-8 text-success" />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              {userProgress.completedQuizzes} quizzes completed
            </div>
          </Card>

          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Learning Streak</p>
                <p className="text-2xl font-bold text-foreground">{userProgress.streak} days</p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-500" />
            </div>
            <div className="mt-3 text-xs text-success">Keep it up!</div>
          </Card>

          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
                <p className="text-2xl font-bold text-foreground">
                  {earnedBadges.length}/{userProgress.badges.length}
                </p>
              </div>
              <Trophy className="w-8 h-8 text-warning" />
            </div>
            <div className="mt-3 text-xs text-muted-foreground">
              {userProgress.badges.length - earnedBadges.length} more to unlock
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Progress */}
          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Progress by Category
            </h2>
            
            <div className="space-y-4">
              {userProgress.categoryProgress.map((category, index) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-foreground">{category.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.completed}/{category.total}
                    </span>
                  </div>
                  <Progress 
                    value={category.percentage} 
                    className="h-2"
                  />
                  <div className="text-xs text-muted-foreground text-right">
                    {category.percentage}% complete
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Badges */}
          <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Award className="w-5 h-5" />
              Achievements
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {userProgress.badges.map((badge, index) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border transition-all ${
                    badge.earned
                      ? 'border-success/50 bg-success/10'
                      : 'border-border bg-muted/30 opacity-60'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Trophy className={`w-6 h-6 ${badge.earned ? 'text-warning' : 'text-muted-foreground'}`} />
                    </div>
                    <h3 className={`font-medium mb-1 ${
                      badge.earned ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
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

        {/* Recent Activity */}
        <Card className="p-6 mt-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Star className="w-5 h-5" />
            Recent Activity
          </h2>
          
          <div className="space-y-4">
            {userProgress.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === 'lesson' ? 'bg-primary/10' : 'bg-success/10'
                  }`}>
                    {activity.type === 'lesson' ? (
                      <BookOpen className={`w-5 h-5 ${activity.type === 'lesson' ? 'text-primary' : 'text-success'}`} />
                    ) : (
                      <Target className="w-5 h-5 text-success" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
                
                {activity.score && (
                  <Badge variant={activity.score >= 80 ? "default" : "secondary"} className={
                    activity.score >= 80 ? "bg-success" : ""
                  }>
                    {activity.score}%
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;