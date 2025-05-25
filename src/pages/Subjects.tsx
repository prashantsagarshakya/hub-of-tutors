
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator, 
  Atom, 
  FlaskConical, 
  Dna, 
  BookText, 
  Globe, 
  Palette, 
  Music,
  Code,
  DollarSign,
  Languages,
  Search
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Subjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const subjects = [
    {
      id: "mathematics",
      name: "Mathematics",
      icon: Calculator,
      description: "Algebra, Calculus, Geometry, Statistics",
      level: "All Levels",
      students: "1.2M",
      color: "bg-blue-500",
      topics: ["Algebra", "Calculus", "Geometry", "Statistics", "Trigonometry"]
    },
    {
      id: "physics",
      name: "Physics",
      icon: Atom,
      description: "Mechanics, Thermodynamics, Quantum Physics",
      level: "High School+",
      students: "850K",
      color: "bg-purple-500",
      topics: ["Mechanics", "Thermodynamics", "Quantum Physics", "Electromagnetism"]
    },
    {
      id: "chemistry",
      name: "Chemistry",
      icon: FlaskConical,
      description: "Organic, Inorganic, Physical Chemistry",
      level: "All Levels",
      students: "650K",
      color: "bg-green-500",
      topics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry"]
    },
    {
      id: "biology",
      name: "Biology",
      icon: Dna,
      description: "Cell Biology, Genetics, Ecology",
      level: "All Levels",
      students: "920K",
      color: "bg-emerald-500",
      topics: ["Cell Biology", "Genetics", "Ecology", "Human Anatomy"]
    },
    {
      id: "english",
      name: "English",
      icon: BookText,
      description: "Literature, Grammar, Writing",
      level: "All Levels",
      students: "1.5M",
      color: "bg-red-500",
      topics: ["Literature", "Grammar", "Creative Writing", "Essay Writing"]
    },
    {
      id: "history",
      name: "History",
      icon: Globe,
      description: "World History, Ancient Civilizations",
      level: "All Levels",
      students: "480K",
      color: "bg-orange-500",
      topics: ["World History", "Ancient Civilizations", "Modern History"]
    },
    {
      id: "computer-science",
      name: "Computer Science",
      icon: Code,
      description: "Programming, Algorithms, Data Structures",
      level: "Beginner+",
      students: "750K",
      color: "bg-indigo-500",
      topics: ["Programming", "Algorithms", "Data Structures", "Web Development"]
    },
    {
      id: "economics",
      name: "Economics",
      icon: DollarSign,
      description: "Microeconomics, Macroeconomics",
      level: "High School+",
      students: "320K",
      color: "bg-yellow-500",
      topics: ["Microeconomics", "Macroeconomics", "Business Studies"]
    },
    {
      id: "art",
      name: "Art & Design",
      icon: Palette,
      description: "Drawing, Painting, Digital Art",
      level: "All Levels",
      students: "280K",
      color: "bg-pink-500",
      topics: ["Drawing", "Painting", "Digital Art", "Art History"]
    },
    {
      id: "music",
      name: "Music",
      icon: Music,
      description: "Music Theory, Composition",
      level: "All Levels",
      students: "190K",
      color: "bg-teal-500",
      topics: ["Music Theory", "Composition", "Instruments"]
    },
    {
      id: "languages",
      name: "Languages",
      icon: Languages,
      description: "Spanish, French, German, Mandarin",
      level: "All Levels",
      students: "670K",
      color: "bg-cyan-500",
      topics: ["Spanish", "French", "German", "Mandarin", "Japanese"]
    }
  ];

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subject.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/chat/${subjectId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">Choose Your Subject</h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Select from our comprehensive range of subjects and start learning with your AI tutor
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search subjects or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Subjects Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredSubjects.map((subject, index) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <subject.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{subject.name}</h3>
                        <p className="text-sm text-gray-600">{subject.description}</p>
                      </div>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Level: {subject.level}</span>
                        <span className="text-gray-600">{subject.students} students</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {subject.topics.slice(0, 3).map((topic) => (
                          <Badge key={topic} variant="secondary" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {subject.topics.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{subject.topics.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleSubjectClick(subject.id)}
                      className="w-full gradient-bg text-white hover:opacity-90"
                    >
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredSubjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 mb-4">No subjects found matching "{searchTerm}"</p>
              <Button onClick={() => setSearchTerm("")} variant="outline">
                Clear Search
              </Button>
            </motion.div>
          )}

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "11", label: "Subjects Available" },
                { number: "6.8M+", label: "Total Students" },
                { number: "24/7", label: "AI Tutor Available" },
                { number: "99%", label: "Student Satisfaction" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                >
                  <h3 className="text-3xl font-bold gradient-text mb-2">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
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
