
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Start Tutoring",
      description: "Begin a personalized learning session",
      icon: MessageCircle,
      action: () => navigate("/chat"),
      color: "bg-purple-500"
    },
    {
      title: "Browse Subjects",
      description: "Explore all available subjects",
      icon: BookOpen,
      action: () => navigate("/subjects"),
      color: "bg-blue-500"
    },
    {
      title: "View Progress",
      description: "Track your learning journey",
      icon: TrendingUp,
      action: () => navigate("/dashboard"),
      color: "bg-green-500"
    },
    {
      title: "Community",
      description: "Connect with other learners",
      icon: Users,
      action: () => navigate("/profile"),
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold gradient-text mb-6">
            Welcome back, {user?.firstName || "Learner"}!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Ready to continue your learning journey? Your AI tutor is here to help you master any subject.
          </p>
          <Button 
            onClick={() => navigate("/chat")}
            size="lg"
            className="gradient-bg text-white hover:opacity-90 transition-opacity"
          >
            Start Learning Now
          </Button>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group" onClick={action.action}>
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Featured Subjects */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Popular Subjects</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {["Mathematics", "Physics", "Chemistry", "Biology", "English", "History"].map((subject, index) => (
              <motion.div
                key={subject}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              >
                <Card 
                  className="hover:shadow-md transition-shadow cursor-pointer text-center p-4"
                  onClick={() => navigate(`/chat/${subject.toLowerCase()}`)}
                >
                  <h3 className="font-medium text-sm">{subject}</h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "10M+", label: "Questions Answered" },
              { number: "500K+", label: "Students Helped" },
              { number: "99%", label: "Success Rate" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
              >
                <h3 className="text-4xl font-bold gradient-text mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
};

export default Index;
