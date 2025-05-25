
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import CourseGenerator from "@/components/CourseGenerator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calculator, Atom, Dna, Globe, Palette, Music, Code } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Subjects = () => {
  const navigate = useNavigate();

  const subjects = [
    { name: "Mathematics", icon: Calculator, color: "bg-blue-500", description: "Algebra, Calculus, Geometry" },
    { name: "Physics", icon: Atom, color: "bg-purple-500", description: "Mechanics, Thermodynamics, Quantum" },
    { name: "Chemistry", icon: Dna, color: "bg-green-500", description: "Organic, Inorganic, Physical" },
    { name: "Biology", icon: Dna, color: "bg-emerald-500", description: "Cell Biology, Genetics, Ecology" },
    { name: "History", icon: Globe, color: "bg-yellow-500", description: "World History, Ancient Civilizations" },
    { name: "Art", icon: Palette, color: "bg-pink-500", description: "Drawing, Painting, Design" },
    { name: "Music", icon: Music, color: "bg-indigo-500", description: "Theory, Composition, Instruments" },
    { name: "Programming", icon: Code, color: "bg-gray-700", description: "JavaScript, Python, Web Development" },
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold gradient-text mb-4">Explore Subjects</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from our wide range of subjects or generate a custom course with AI
            </p>
          </div>

          {/* AI Course Generator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-12"
          >
            <CourseGenerator />
          </motion.div>

          {/* Subjects Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-center mb-8">Popular Subjects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {subjects.map((subject, index) => (
                <motion.div
                  key={subject.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 ${subject.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <subject.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-lg">{subject.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-gray-600 text-sm mb-4">{subject.description}</p>
                      <Button 
                        onClick={() => navigate(`/chat/${subject.name.toLowerCase()}`)}
                        className="w-full gradient-bg text-white"
                      >
                        Start Learning
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default Subjects;
