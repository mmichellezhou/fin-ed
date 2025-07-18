import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Mail,
  Calendar,
  Users,
  Settings,
  BookOpen,
  Target,
  ArrowRight,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userProfile, setUserProfile } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userProfile?.name || "");
  const [editedAgeGroup, setEditedAgeGroup] = useState(
    userProfile?.ageGroup || ""
  );

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-playfair font-bold text-foreground mb-4">
            Profile Not Found
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Please set up your profile to continue
          </p>
          <Button onClick={() => navigate("/setup")} variant="hero" size="lg">
            Set Up Profile
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  const currentProgress = userProfile.progress[userProfile.currentAgeGroup] || {
    completedLessons: 0,
    totalLessons: 0,
    completedQuizzes: 0,
    totalQuizzes: 0,
    averageScore: 0,
    streak: 0,
    lastActivity: new Date().toISOString(),
  };

  const handleSaveChanges = () => {
    if (editedName.trim() && editedAgeGroup) {
      const updatedProfile = {
        ...userProfile,
        name: editedName.trim(),
        ageGroup: editedAgeGroup,
      };
      setUserProfile(updatedProfile);
      setIsEditing(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-playfair font-bold text-foreground mb-4">
            Your Profile
          </h1>
          <p className="text-xl text-muted-foreground">
            Manage your account settings and learning preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card className="p-6 animate-fade-in">
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="text-xl">
                    {getInitials(userProfile.name)}
                  </AvatarFallback>
                </Avatar>

                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {userProfile.name}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {userProfile.ageGroup} Learner
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Current Age Group: {userProfile.currentAgeGroup}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>
                      {userProfile.ageGroup === "kids"
                        ? "Kids (8-12)"
                        : "Teens (13-18)"}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>
                      {userProfile.completedAgeGroups.length > 0
                        ? `${userProfile.completedAgeGroups.length} age group${
                            userProfile.completedAgeGroups.length > 1 ? "s" : ""
                          } completed`
                        : "No age groups completed yet"}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card
              className="p-6 mt-6 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Quick Stats
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Lessons Completed
                  </span>
                  <Badge variant="secondary">
                    {currentProgress.completedLessons}/
                    {currentProgress.totalLessons}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quizzes Passed</span>
                  <Badge variant="secondary">
                    {currentProgress.completedQuizzes}/
                    {currentProgress.totalQuizzes}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Score</span>
                  <Badge variant="default" className="bg-success">
                    {currentProgress.averageScore}%
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Learning Streak</span>
                  <Badge variant="secondary">
                    {currentProgress.streak} days
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Settings */}
          <div className="lg:col-span-2">
            <Card
              className="p-6 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Account Settings
              </h3>

              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-foreground">
                      Personal Information
                    </h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="ageGroup">Age Group</Label>
                      <Select
                        value={editedAgeGroup}
                        onValueChange={setEditedAgeGroup}
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kids">Kids (8-12)</SelectItem>
                          <SelectItem value="teens">Teens (13-18)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Notification Preferences */}
                <div>
                  <h4 className="font-medium text-foreground mb-4">
                    Notification Preferences
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">
                          Receive updates about new lessons and achievements
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="toggle"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Learning Reminders</p>
                        <p className="text-sm text-muted-foreground">
                          Get reminded to continue your learning streak
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="toggle"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex gap-4 pt-4">
                    <Button
                      variant="hero"
                      className="flex-1"
                      onClick={handleSaveChanges}
                      disabled={!editedName.trim() || !editedAgeGroup}
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        setEditedName(userProfile.name);
                        setEditedAgeGroup(userProfile.ageGroup);
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* Age Group Management */}
        <Card
          className="p-6 mt-8 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Age Group Management
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">
                Available Age Groups
              </h4>
              <div className="space-y-3">
                <div
                  className={`p-4 rounded-lg border ${
                    userProfile.currentAgeGroup === "kids"
                      ? "border-primary bg-primary/10"
                      : "border-border bg-muted/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-foreground">
                        Kids (8-12)
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        Fun basics: saving, spending smart, and counting coins!
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          userProfile.currentAgeGroup === "kids"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {userProfile.currentAgeGroup === "kids"
                          ? "Current"
                          : "Available"}
                      </Badge>
                      {userProfile.completedAgeGroups.includes("kids") && (
                        <Badge variant="default" className="ml-2 bg-success">
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                  {userProfile.currentAgeGroup !== "kids" && (
                    <Button
                      onClick={() => {
                        const updatedProfile = {
                          ...userProfile,
                          currentAgeGroup: "kids",
                        };
                        setUserProfile(updatedProfile);
                        navigate("/lessons/kids");
                      }}
                      variant="outline"
                      size="sm"
                      className="mt-3"
                    >
                      Switch to Kids
                    </Button>
                  )}
                </div>

                <div
                  className={`p-4 rounded-lg border ${
                    userProfile.currentAgeGroup === "teens"
                      ? "border-primary bg-primary/10"
                      : "border-border bg-muted/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-foreground">
                        Teens (13-18)
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        First jobs, budgeting, and learning to manage money
                        independently
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          userProfile.currentAgeGroup === "teens"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {userProfile.currentAgeGroup === "teens"
                          ? "Current"
                          : "Available"}
                      </Badge>
                      {userProfile.completedAgeGroups.includes("teens") && (
                        <Badge variant="default" className="ml-2 bg-success">
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                  {userProfile.currentAgeGroup !== "teens" && (
                    <Button
                      onClick={() => {
                        const updatedProfile = {
                          ...userProfile,
                          currentAgeGroup: "teens",
                        };
                        setUserProfile(updatedProfile);
                        navigate("/lessons/teens");
                      }}
                      variant="outline"
                      size="sm"
                      className="mt-3"
                    >
                      Switch to Teens
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Coming Soon</h4>
              <div className="space-y-3">
                <div className="p-4 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/20 opacity-60">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-muted-foreground">
                        Young Adults (19-25)
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        Building credit, student loans, and making key financial
                        decisions
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="secondary"
                        className="bg-muted-foreground/20"
                      >
                        Coming Soon
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/20 opacity-60">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-muted-foreground">
                        Adults (26+)
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        Investment strategies, homeownership, and retirement
                        planning
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="secondary"
                        className="bg-muted-foreground/20"
                      >
                        Coming Soon
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-dashed border-muted-foreground/30 bg-muted/20 opacity-60">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium text-muted-foreground">
                        Seniors (65+)
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        Retirement planning, estate management, and healthcare
                        costs
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant="secondary"
                        className="bg-muted-foreground/20"
                      >
                        Coming Soon
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Progress Summary</h4>
              <div className="space-y-3">
                <div className="p-4 rounded-lg bg-muted/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Current Age Group
                    </span>
                    <Badge variant="default">
                      {userProfile.currentAgeGroup}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    You're currently learning in the{" "}
                    {userProfile.currentAgeGroup} age group
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-success/10 border-success/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Completed Age Groups
                    </span>
                    <Badge variant="default" className="bg-success">
                      {userProfile.completedAgeGroups.length}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {userProfile.completedAgeGroups.length > 0
                      ? `You've completed: ${userProfile.completedAgeGroups.join(
                          ", "
                        )}`
                      : "No age groups completed yet"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
