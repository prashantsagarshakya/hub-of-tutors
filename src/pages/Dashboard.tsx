
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Clock, 
  Trophy, 
  TrendingUp, 
  Calendar,
  Target,
  Star,
  MessageCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Study Streak",
      value: "12 days",
      icon: Trophy,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      title: "Hours Studied",
      value: "24.5h",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Subjects Active",
      value: "5",
      icon: BookOpen,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Questions Asked",
      value: "147",
      icon: MessageCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  const subjects = [
    { name: "Mathematics", progress: 75, sessions: 12, lastStudied: "2 hours ago" },
    { name: "Physics", progress: 60, sessions: 8, lastStudied: "1 day ago" },
    { name: "Chemistry", progress: 45, sessions: 6, lastStudied: "3 days ago" },
    { name: "Biology", progress: 80, sessions: 15, lastStudied: "5 hours ago" },
    { name: "English", progress: 90, sessions: 20, lastStudied: "1 hour ago" }
  ];

  const recentActivity = [
    { action: "Completed", subject: "Calculus", topic: "Derivatives", time: "2 hours ago" },
    { action: "Asked", subject: "Physics", topic: "Quantum Mechanics", time: "4 hours ago" },
    { action: "Studied", subject: "Chemistry", topic: "Organic Compounds", time: "1 day ago" },
    { action: "Completed", subject: "Biology", topic: "Cell Division", time: "2 days ago" }
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
          <div className="mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">Dashboard</h1>
            <p className="text-gray-600">Track your learning progress and achievements</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
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
                    <TrendingUp className="w-5 h-5" />
                    <span>Subject Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {subjects.map((subject, index) => (
                    <div key={subject.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{subject.name}</span>
                        <span className="text-sm text-gray-600">{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{subject.sessions} sessions</span>
                        <span>Last: {subject.lastStudied}</span>
                      </div>
                    </div>
                  ))}
                  <Button 
                    onClick={() => navigate("/subjects")}
                    className="w-full mt-4"
                    variant="outline"
                  >
                    View All Subjects
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2" />
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium">{activity.action}</span> {activity.subject} - {activity.topic}
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button 
                    onClick={() => navigate("/chat")}
                    className="w-full mt-4 gradient-bg text-white"
                  >
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Goals Section */}
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
                  <span>Weekly Goals</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">Study 20 hours</h3>
                    <Progress value={75} className="mb-2" />
                    <p className="text-sm text-gray-600">15/20 hours completed</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">Complete 5 subjects</h3>
                    <Progress value={60} className="mb-2" />
                    <p className="text-sm text-gray-600">3/5 subjects completed</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">Maintain streak</h3>
                    <Progress value={85} className="mb-2" />
                    <p className="text-sm text-gray-600">12/14 days streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
