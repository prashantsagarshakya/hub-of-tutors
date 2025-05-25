
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2, BookOpen, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GeminiService from "@/services/geminiService";

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
  const [apiKey, setApiKey] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<Course | null>(null);
  const { toast } = useToast();

  const handleGenerateCourse = async () => {
    if (!subject || !level || !duration || !apiKey) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields including your Gemini API key",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const geminiService = new GeminiService(apiKey);
      const course = await geminiService.generateCourse(subject, level, duration);
      setGeneratedCourse(course);
      toast({
        title: "Course Generated!",
        description: "Your personalized course has been created successfully."
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate course. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>AI Course Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="e.g., JavaScript, Mathematics, Physics"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Difficulty Level</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
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
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 week">1 Week</SelectItem>
                  <SelectItem value="2 weeks">2 Weeks</SelectItem>
                  <SelectItem value="1 month">1 Month</SelectItem>
                  <SelectItem value="3 months">3 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apikey">Gemini API Key</Label>
              <Input
                id="apikey"
                type="password"
                placeholder="Enter your Gemini API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </div>
          </div>

          <Button 
            onClick={handleGenerateCourse} 
            disabled={isGenerating}
            className="w-full gradient-bg text-white"
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
        </CardContent>
      </Card>

      {generatedCourse && (
        <Card>
          <CardHeader>
            <CardTitle>{generatedCourse.title}</CardTitle>
            <p className="text-gray-600">{generatedCourse.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
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
          <CardContent>
            <div className="space-y-4">
              {generatedCourse.prerequisites.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Prerequisites:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {generatedCourse.prerequisites.map((prereq, index) => (
                      <li key={index}>{prereq}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="font-semibold mb-3">Course Modules:</h4>
                <div className="space-y-3">
                  {generatedCourse.modules.map((module, index) => (
                    <Card key={module.id} className="border-l-4 border-l-purple-500">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium">Module {index + 1}: {module.title}</h5>
                          <span className="text-xs text-gray-500">{module.duration}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{module.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {module.topics.map((topic, topicIndex) => (
                            <span 
                              key={topicIndex}
                              className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded"
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
