import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/contexts/UserContext";
import { Users, GraduationCap, Baby, School } from "lucide-react";

const ageGroups = [
  {
    id: "kids",
    title: "Kids (Ages 8-12)",
    description: "Fun, interactive lessons about money basics",
    icon: Baby,
    color: "from-blue-400 to-purple-500",
    lessons: 3,
  },
  {
    id: "teens",
    title: "Teens (Ages 13-18)",
    description: "Comprehensive financial education for young adults",
    icon: School,
    color: "from-green-400 to-blue-500",
    lessons: 13,
  },
];

const ProfileSetup = () => {
  const [name, setName] = useState("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string | null>(null);
  const [step, setStep] = useState<"name" | "age">("name");
  const navigate = useNavigate();
  const { setUserProfile } = useUser();

  const handleNameSubmit = () => {
    if (name.trim()) {
      setStep("age");
    }
  };

  const handleAgeGroupSelect = (ageGroupId: string) => {
    setSelectedAgeGroup(ageGroupId);
  };

  const handleCompleteSetup = () => {
    if (name.trim() && selectedAgeGroup) {
      const newProfile = {
        name: name.trim(),
        ageGroup: selectedAgeGroup,
        currentAgeGroup: selectedAgeGroup,
        completedAgeGroups: [],
        progress: {
          [selectedAgeGroup]: {
            completedLessons: 0,
            totalLessons:
              ageGroups.find((ag) => ag.id === selectedAgeGroup)?.lessons || 0,
            completedQuizzes: 0,
            totalQuizzes: 0,
            averageScore: 0,
            streak: 0,
            lastActivity: new Date().toISOString(),
          },
        },
        badges: [],
        recentActivity: [],
      };

      setUserProfile(newProfile);
      navigate(`/lessons/${selectedAgeGroup}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-playfair font-bold text-foreground mb-4">
            Welcome to FinEd!
          </h1>
          <p className="text-xl text-muted-foreground">
            Let's personalize your financial education journey
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center ${
                step === "name" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "name" ? "bg-primary text-white" : "bg-muted"
                }`}
              >
                1
              </div>
              <span className="ml-2 font-medium">Your Name</span>
            </div>
            <div className="w-8 h-1 bg-muted rounded"></div>
            <div
              className={`flex items-center ${
                step === "age" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === "age" ? "bg-primary text-white" : "bg-muted"
                }`}
              >
                2
              </div>
              <span className="ml-2 font-medium">Age Group</span>
            </div>
          </div>
        </div>

        {step === "name" && (
          <Card className="max-w-md mx-auto p-8 animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                What's your name?
              </h2>
              <p className="text-muted-foreground">
                We'll use this to personalize your learning experience
              </p>
            </div>

            <div className="space-y-4">
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-center text-lg"
                onKeyPress={(e) => e.key === "Enter" && handleNameSubmit()}
                autoFocus
              />
              <Button
                onClick={handleNameSubmit}
                disabled={!name.trim()}
                className="w-full"
                variant="hero"
              >
                Continue
              </Button>
              <Button
                onClick={() => navigate("/lesson-selector")}
                variant="outline"
                className="w-full"
              >
                Skip - Go to Learning Path
              </Button>
            </div>
          </Card>
        )}

        {step === "age" && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Choose your age group, {name}!
              </h2>
              <p className="text-muted-foreground">
                We'll tailor the lessons to your experience level
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ageGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <Card
                    key={group.id}
                    className={`card-interactive cursor-pointer transition-all duration-300 ${
                      selectedAgeGroup === group.id
                        ? "ring-2 ring-primary scale-105"
                        : "hover:scale-105"
                    }`}
                    onClick={() => handleAgeGroupSelect(group.id)}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${group.color} rounded-full flex items-center justify-center`}
                        >
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary">
                          {group.lessons} lessons
                        </Badge>
                      </div>

                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {group.title}
                      </h3>

                      <p className="text-muted-foreground mb-4">
                        {group.description}
                      </p>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <GraduationCap className="w-4 h-4" />
                          <span>Age-appropriate content</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary"></div>
                          <span>Interactive lessons</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="text-center space-y-3">
              <Button
                onClick={handleCompleteSetup}
                disabled={!selectedAgeGroup}
                className="px-8 py-3 text-lg"
                variant="hero"
              >
                Start Learning Journey
              </Button>
              <div>
                <Button
                  onClick={() => navigate("/lesson-selector")}
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  Skip - Choose Learning Path
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSetup;
