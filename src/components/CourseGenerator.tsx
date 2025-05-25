
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, BookOpen, Clock, Users, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/clerk-react";
import GeminiService from "@/services/geminiService";
import MongoService from "@/services/mongoService";

interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedDuration: string;
  modules: Array<{
    id: string;
    title: string;
    description: string;
    duration: string;
    topics: string[];
  }>;
  prerequisites: string[];
}

const CourseGenerator = () => {
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<Course | null>(null);
  const { toast } = useToast();
  const { user } = useUser();

  const geminiService = new GeminiService();
  const mongoService = new MongoService();

  const handleGenerateCourse = async () => {
    if (!subject || !level || !duration) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const course = await geminiService.generateCourse(subject, level, duration);
      setGeneratedCourse(course);
      toast({
        title: "Course Generated!",
        description: "Your personalized course has been created successfully."
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate course. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveCourse = async () => {
    if (!generatedCourse || !user) {
      toast({
        title: "Error",
        description: "Please generate a course first and ensure you're logged in.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      await mongoService.saveCourse(generatedCourse, user.id);
      toast({
        title: "Course Saved!",
        description: "Your course has been saved to your library."
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save course. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-200 dark:border-purple-800">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-purple-600" />
            <span>AI Course Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="e.g., JavaScript, Mathematics, Physics"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="border-purple-200 focus:border-purple-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Difficulty Level</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="border-purple-200 focus:border-purple-500">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Course Duration</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger className="border-purple-200 focus:border-purple-500">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 week">1 Week</SelectItem>
                  <SelectItem value="2 weeks">2 Weeks</SelectItem>
                  <SelectItem value="1 month">1 Month</SelectItem>
                  <SelectItem value="3 months">3 Months</SelectItem>
                  <SelectItem value="6 months">6 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button 
              onClick={handleGenerateCourse} 
              disabled={isGenerating}
              className="flex-1 gradient-bg text-white hover:opacity-90"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating Course...
                </>
              ) : (
                "Generate Course"
              )}
            </Button>

            {generatedCourse && (
              <Button 
                onClick={handleSaveCourse} 
                disabled={isSaving}
                variant="outline"
                className="border-purple-500 text-purple-600 hover:bg-purple-50"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {generatedCourse && (
        <Card className="border-2 border-green-200 dark:border-green-800">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <CardTitle className="text-green-800 dark:text-green-200">{generatedCourse.title}</CardTitle>
            <p className="text-green-600 dark:text-green-300">{generatedCourse.description}</p>
            <div className="flex items-center space-x-4 text-sm text-green-600 dark:text-green-400">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{generatedCourse.difficulty}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{generatedCourse.estimatedDuration}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {generatedCourse.prerequisites.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Prerequisites:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                    {generatedCourse.prerequisites.map((prereq, index) => (
                      <li key={index}>{prereq}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">Course Modules:</h4>
                <div className="space-y-3">
                  {generatedCourse.modules.map((module, index) => (
                    <Card key={module.id} className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-800 dark:text-gray-200">Module {index + 1}: {module.title}</h5>
                          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{module.duration}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{module.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {module.topics.map((topic, topicIndex) => (
                            <span 
                              key={topicIndex}
                              className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CourseGenerator;
