import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Mail, Calendar, Users, Settings, BookOpen, Target } from "lucide-react";

const Profile = () => {
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
                  <AvatarFallback className="text-xl">JD</AvatarFallback>
                </Avatar>
                
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  John Doe
                </h2>
                <p className="text-muted-foreground mb-4">
                  john.doe@email.com
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Joined March 2024</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Young Adult</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 mt-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Quick Stats
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lessons Completed</span>
                  <Badge variant="secondary">8/15</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quizzes Passed</span>
                  <Badge variant="secondary">3/8</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Average Score</span>
                  <Badge variant="default" className="bg-success">85%</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Learning Streak</span>
                  <Badge variant="secondary">5 days</Badge>
                </div>
              </div>
            </Card>
          </div>

          {/* Settings */}
          <div className="lg:col-span-2">
            <Card className="p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Account Settings
              </h3>

              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h4 className="font-medium text-foreground mb-4">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" defaultValue="john.doe@email.com" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="ageGroup">Age Group</Label>
                      <Select defaultValue="young-adults">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kids">Kids (5-12)</SelectItem>
                          <SelectItem value="teens">Teens (13-17)</SelectItem>
                          <SelectItem value="young-adults">Young Adults (18-25)</SelectItem>
                          <SelectItem value="adults">Adults (26-65)</SelectItem>
                          <SelectItem value="seniors">Seniors (65+)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Notification Preferences */}
                <div>
                  <h4 className="font-medium text-foreground mb-4">Notification Preferences</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates about new lessons and achievements</p>
                      </div>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Learning Reminders</p>
                        <p className="text-sm text-muted-foreground">Get reminded to continue your learning streak</p>
                      </div>
                      <input type="checkbox" defaultChecked className="toggle" />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button variant="hero" className="flex-1">
                    Save Changes
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Reset to Default
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;