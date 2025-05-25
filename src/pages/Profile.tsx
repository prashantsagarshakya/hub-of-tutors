
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Mail, 
  Calendar, 
  Trophy, 
  Star, 
  BookOpen, 
  Clock,
  Target,
  Award,
  TrendingUp
} from "lucide-react";

const Profile = () => {
  const { user } = useUser();

  const achievements = [
    { title: "First Steps", description: "Completed your first lesson", icon: Star, earned: true },
    { title: "Quick Learner", description: "Studied for 5 days straight", icon: TrendingUp, earned: true },
    { title: "Math Wizard", description: "Mastered 10 math topics", icon: Trophy, earned: true },
    { title: "Bookworm", description: "Read 50 articles", icon: BookOpen, earned: false },
    { title: "Night Owl", description: "Studied after midnight", icon: Clock, earned: true },
    { title: "Goal Getter", description: "Achieved weekly goals 4 times", icon: Target, earned: false }
  ];

  const subjects = [
    { name: "Mathematics", level: "Advanced", progress: 85, timeSpent: "24h" },
    { name: "Physics", level: "Intermediate", progress: 65, timeSpent: "18h" },
    { name: "Chemistry", level: "Beginner", progress: 40, timeSpent: "12h" },
    { name: "Biology", level: "Intermediate", progress: 75, timeSpent: "20h" },
    { name: "English", level: "Advanced", progress: 90, timeSpent: "30h" }
  ];

  const stats = [
    { label: "Total Study Hours", value: "104h", icon: Clock },
    { label: "Subjects Studied", value: "5", icon: BookOpen },
    { label: "Achievements", value: "4/6", icon: Trophy },
    { label: "Current Streak", value: "12 days", icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <div className="w-24 h-24 gradient-bg rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {user?.firstName?.[0] || user?.emailAddresses[0]?.emailAddress?.[0] || 'U'}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold mb-2">
                      {user?.firstName} {user?.lastName || ''}
                    </h1>
                    <p className="text-gray-600 mb-4 flex items-center justify-center md:justify-start">
                      <Mail className="w-4 h-4 mr-2" />
                      {user?.emailAddresses[0]?.emailAddress}
                    </p>
                    <p className="text-gray-600 mb-4 flex items-center justify-center md:justify-start">
                      <Calendar className="w-4 h-4 mr-2" />
                      Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      <Badge className="gradient-bg text-white">Active Learner</Badge>
                      <Badge variant="outline">Math Enthusiast</Badge>
                      <Badge variant="outline">12-Day Streak</Badge>
                    </div>
                  </div>
                  <Button variant="outline">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <Card>
                    <CardContent className="p-6 text-center">
                      <stat.icon className="w-8 h-8 mx-auto mb-3 text-purple-600" />
                      <p className="text-2xl font-bold mb-1">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Subject Progress */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="w-5 h-5" />
                      <span>Subject Progress</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {subjects.map((subject, index) => (
                      <div key={subject.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{subject.name}</span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {subject.level}
                            </Badge>
                          </div>
                          <span className="text-sm text-gray-600">{subject.timeSpent}</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{subject.progress}% Complete</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Award className="w-5 h-5" />
                      <span>Achievements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={achievement.title}
                        className={`flex items-center space-x-4 p-3 rounded-lg ${
                          achievement.earned 
                            ? "bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200" 
                            : "bg-gray-50 opacity-60"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          achievement.earned 
                            ? "gradient-bg text-white" 
                            : "bg-gray-300 text-gray-500"
                        }`}>
                          <achievement.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                        {achievement.earned && (
                          <Badge className="gradient-bg text-white">Earned</Badge>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Learning Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mt-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Weekly Learning Goals</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Study Hours</span>
                        <span className="text-sm text-gray-600">15/20</span>
                      </div>
                      <Progress value={75} className="mb-2" />
                      <p className="text-sm text-gray-600">5 hours remaining</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Topics Completed</span>
                        <span className="text-sm text-gray-600">8/10</span>
                      </div>
                      <Progress value={80} className="mb-2" />
                      <p className="text-sm text-gray-600">2 topics remaining</p>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">Practice Sessions</span>
                        <span className="text-sm text-gray-600">12/15</span>
                      </div>
                      <Progress value={80} className="mb-2" />
                      <p className="text-sm text-gray-600">3 sessions remaining</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Profile;
