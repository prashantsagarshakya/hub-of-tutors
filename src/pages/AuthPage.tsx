
import { SignIn, SignUp } from "@clerk/clerk-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookOpen, Brain, Users, Zap } from "lucide-react";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Hero content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold mb-4">
              Welcome to <span className="text-yellow-300">TutHub</span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Your AI-powered learning companion. Get personalized tutoring in any subject, anytime, anywhere.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Brain, title: "AI-Powered", desc: "Smart tutoring with advanced AI" },
              { icon: BookOpen, title: "All Subjects", desc: "Math, Science, Languages & more" },
              { icon: Users, title: "Personalized", desc: "Adapted to your learning style" },
              { icon: Zap, title: "Instant Help", desc: "Get answers 24/7" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                className="glass-effect rounded-lg p-4 text-center"
              >
                <feature.icon className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <h3 className="font-semibold text-sm">{feature.title}</h3>
                <p className="text-xs text-white/80">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right side - Auth form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <Card className="w-full max-w-md glass-effect border-white/20">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isSignUp ? "Join TutHub" : "Welcome Back"}
                </h2>
                <p className="text-white/80">
                  {isSignUp ? "Start your learning journey today" : "Continue your learning journey"}
                </p>
              </div>

              <div className="mb-6">
                {isSignUp ? (
                  <SignUp 
                    fallbackRedirectUrl="/dashboard"
                    appearance={{
                      elements: {
                        formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
                        card: "bg-transparent shadow-none",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden"
                      }
                    }}
                  />
                ) : (
                  <SignIn 
                    fallbackRedirectUrl="/dashboard"
                    appearance={{
                      elements: {
                        formButtonPrimary: "bg-purple-600 hover:bg-purple-700",
                        card: "bg-transparent shadow-none",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden"
                      }
                    }}
                  />
                )}
              </div>

              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-white/80 hover:text-white hover:bg-white/10"
                >
                  {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
