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
  GraduationCap,
  Baby,
  Pencil,
  Briefcase,
  Heart,
  Image as ImageIcon,
} from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

const Profile = () => {
  const { userProfile, setUserProfile } = useUser();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(userProfile?.name || "");
  const [editedAgeGroup, setEditedAgeGroup] = useState(
    userProfile?.ageGroup || ""
  );
  const [profileImage, setProfileImage] = useState(userProfile?.profileImage || "");
  const [editedEmail, setEditedEmail] = useState(userProfile?.email || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        email: editedEmail.trim(),
      };
      setUserProfile(updatedProfile);
      setIsEditing(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setProfileImage(result);
        setUserProfile({ ...userProfile, profileImage: result });
      };
      reader.readAsDataURL(file);
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
                <Avatar className="w-24 h-24 mx-auto mb-4 cursor-pointer group relative" onClick={() => fileInputRef.current?.click()}>
                  {userProfile.profileImage ? (
                    <AvatarImage src={userProfile.profileImage} />
                  ) : (
                    <AvatarFallback className="text-xl">
                      {getInitials(userProfile.name)}
                    </AvatarFallback>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full">
                    <ImageIcon className="w-10 h-10 text-white opacity-90" />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </Avatar>

                <h2 className="text-xl font-semibold text-foreground">
                  {userProfile.name}
                </h2>

                {/* Show email in profile info if present */}
                {userProfile.email && (
                  <div className="text-muted-foreground text-sm">
                    {userProfile.email}
                  </div>
                )}

                <div className="space-y-2 text-sm mt-2">
                  <div className="flex items-center justify-center gap-2">
                    <span>
                      {userProfile.ageGroup === "kids"
                        ? "Kid (8-12)"
                        : userProfile.ageGroup === "teens"
                        ? "Teen (13-18)"
                        : userProfile.ageGroup === "youngAdults"
                        ? "Young Adult (19-25)"
                        : userProfile.ageGroup === "adults"
                        ? "Adult (26+)"
                        : userProfile.ageGroup === "seniors"
                        ? "Senior (65+)"
                        : userProfile.ageGroup}
                    </span>
                  </div>
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

              <div className="space-y-8">
                {/* Personal Information */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-foreground">
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
                      <Label htmlFor="name" className="font-medium">Full Name</Label>
                      <Input
                        id="name"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="email" className="font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>

                {/* Notification Preferences */}
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-4">
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

          <div className="grid grid-cols-1 gap-6">
            {[
              { id: "kids", label: "Kids (8-12)", desc: "Fun basics: saving, spending smart, and counting coins!" },
              { id: "teens", label: "Teens (13-18)", desc: "First jobs, budgeting, and learning to manage money independently" },
              { id: "youngAdults", label: "Young Adults (19-25)", desc: "Building credit, student loans, and making key financial decisions" },
              { id: "adults", label: "Adults (26+)", desc: "Investment strategies, homeownership, and retirement planning" },
              { id: "seniors", label: "Seniors (65+)", desc: "Retirement planning, estate management, and healthcare costs" },
            ].map((group) => {
              const isCompleted = userProfile.completedAgeGroups.includes(group.id);
              const isCurrent = userProfile.currentAgeGroup === group.id;
              const groupProgress = userProfile.progress[group.id];
              let badgeText = "To Do";
              let badgeClass = "bg-primary text-white";
              if (isCompleted) {
                badgeText = "Completed";
                badgeClass = "bg-success text-white";
              } else if (groupProgress && groupProgress.completedLessons > 0) {
                badgeText = "In Progress";
                badgeClass = "bg-warning text-white";
              }
              return (
                <div
                  key={group.id}
                  className={`flex items-center justify-between p-4 rounded-lg border h-full ${isCurrent ? "border-primary bg-primary/10" : "border-border bg-muted/30"}`}
                >
                    <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium text-foreground mb-0">{group.label}</h5>
                      <Badge className={badgeClass + " pointer-events-none select-none"}>{badgeText}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{group.desc}</p>
                  </div>
                  {!isCurrent && (
                    <Button
                      onClick={() => {
                        const updatedProfile = {
                          ...userProfile,
                          currentAgeGroup: group.id,
                        };
                        setUserProfile(updatedProfile);
                        // Removed navigation to lessons page
                      }}
                      variant="outline"
                      size="sm"
                    >
                      Switch
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
