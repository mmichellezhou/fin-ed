import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  Target,
  TrendingUp,
  Shield,
  UserCheck,
  Trophy,
  Handshake,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";

const Index = () => {
  const navigate = useNavigate();
  const { userProfile } = useUser();

  // Redirect to setup if no user profile exists
  useEffect(() => {
    if (!userProfile) {
      navigate("/setup");
    }
  }, [userProfile, navigate]);

  const features = [
    {
      icon: BookOpen,
      title: "Age-Appropriate Lessons",
      description:
        "Tailored content for kids, teens, young adults, adults, and seniors",
    },
    {
      icon: Target,
      title: "Interactive Quizzes",
      description:
        "Test your knowledge with AI-generated quizzes after each lesson",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description:
        "Monitor your learning journey with detailed progress tracking",
    },
    {
      icon: Shield,
      title: "100% Free",
      description:
        "Quality financial education accessible to everyone, always free",
    },
  ];

  const stats = [
    { number: "15+", label: "Lesson Categories" },
    { number: "100+", label: "Interactive Lessons" },
    { number: "50+", label: "Knowledge Quizzes" },
    { number: "∞", label: "Lifetime Access" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-accent/5 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-playfair font-bold text-foreground mb-6">
              <span className="block">FinEd</span>
              <span className="block text-3xl lg:text-4xl text-muted-foreground font-inter font-normal mt-2">
                Free Financial Education for All Ages
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              Master money management with personalized lessons, interactive
              quizzes, and progress tracking. Start your financial literacy
              journey today—completely free.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                onClick={() => navigate("/setup")}
                size="lg"
                variant="hero"
                className="text-lg px-8 py-6 flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        {/*
        <div className="absolute top-20 left-10 w-16 h-16 bg-primary/10 rounded-full float-animation" />
        <div
          className="absolute top-40 right-16 w-12 h-12 bg-secondary/10 rounded-full float-animation"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-8 h-8 bg-warning/10 rounded-full float-animation"
          style={{ animationDelay: "2s" }}
        />
        */}
      </section>

      {/* Features Section */}
      <section className="py-6 lg:py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-foreground mb-4">
              Why Choose FinEd?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make financial literacy accessible, engaging, and effective for
              learners of all ages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="card-interactive p-6 text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-accent/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-foreground mb-6">
              Building Financial Confidence
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed">
              Financial literacy is one of the most important life skills, yet
              it's rarely taught in schools. FinEd bridges this gap by providing
              comprehensive, age-appropriate financial education that empowers
              people to make informed decisions about their money throughout
              their lives.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Personalized Learning
                </h3>
                <p className="text-muted-foreground text-sm">
                  Content adapted to your age group and financial goals
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-6 h-6 text-warning" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Achievement Tracking
                </h3>
                <p className="text-muted-foreground text-sm">
                  Earn badges and certificates as you progress
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Community Support
                </h3>
                <p className="text-muted-foreground text-sm">
                  Get help from our AI assistant and fellow learners
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-white mb-6">
            Ready to Master Your Money?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are building their financial future.
            Start with lessons designed for your age group and experience level.
          </p>

          <Button
            onClick={() => navigate("/setup")}
            size="lg"
            variant="outline"
            className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 border-white"
          >
            Start Learning Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
