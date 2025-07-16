import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Baby, GraduationCap, Briefcase, Heart, Pencil } from "lucide-react";

const ageGroups = [
  {
    id: "kids",
    title: "Kids (6-12)",
    description: "Fun basics: saving, spending smart, and counting coins!",
    icon: Baby,
    color: "from-pink-400 to-purple-500"
  },
  {
    id: "teens",
    title: "Teens (13-18)",
    description: "First jobs, budgeting, and learning to manage money independently",
    icon: Pencil,
    color: "from-blue-400 to-cyan-500"
  },
  {
    id: "young-adults",
    title: "Young Adults (19-25)",
    description: "Building credit, student loans, and making key financial decisions",
    icon: GraduationCap,
    color: "from-green-400 to-emerald-500"
  },
  {
    id: "adults",
    title: "Adults (26+)",
    description: "Investment strategies, homeownership, and retirement",
    icon: Briefcase,
    color: "from-indigo-400 to-blue-500"
  },
  {
    id: "seniors",
    title: "Seniors (65+)",
    description: "Retirement planning, estate management, and healthcare costs",
    icon: Heart,
    color: "from-orange-400 to-red-500"
  }
];

const LessonSelector = () => {
  const navigate = useNavigate();
  const [selectedAge, setSelectedAge] = useState<string | null>(null);

  const handleAgeSelect = (ageId: string) => {
    setSelectedAge(ageId);
    // Navigate to lesson viewer with selected age group
    navigate(`/lessons/${ageId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Choose Your Learning Path
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select your age group to get personalized financial lessons designed just for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {ageGroups.map((group, index) => {
            const Icon = group.icon;
            return (
              <Card
                key={group.id}
                className={`card-age-group animate-fade-in cursor-pointer relative overflow-hidden group ${
                  selectedAge === group.id ? 'ring-2 ring-primary' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleAgeSelect(group.id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${group.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10 p-8 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {group.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {group.description}
                  </p>
                  
                  <Button
                    variant="outline-hero"
                    className="w-full group-hover:shadow-lg transition-all duration-300"
                  >
                    Start Learning
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LessonSelector;