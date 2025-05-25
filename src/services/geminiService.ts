
interface CourseModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: string[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedDuration: string;
  modules: CourseModule[];
  prerequisites: string[];
}

export class GeminiService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateCourse(subject: string, level: string, duration: string): Promise<Course> {
    const prompt = `Generate a comprehensive course structure for ${subject} at ${level} level that can be completed in ${duration}. 

    Please provide a JSON response with the following structure:
    {
      "title": "Course Title",
      "description": "Brief course description",
      "difficulty": "${level}",
      "estimatedDuration": "${duration}",
      "modules": [
        {
          "id": "module-1",
          "title": "Module Title",
          "description": "Module description",
          "duration": "2 hours",
          "topics": ["Topic 1", "Topic 2", "Topic 3"]
        }
      ],
      "prerequisites": ["Prerequisite 1", "Prerequisite 2"]
    }

    Make sure the course is well-structured, progressive, and practical.`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate course');
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Extract JSON from the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format');
      }

      const courseData = JSON.parse(jsonMatch[0]);
      
      return {
        id: `course-${Date.now()}`,
        ...courseData
      };
    } catch (error) {
      console.error('Error generating course:', error);
      throw error;
    }
  }

  async getChatResponse(message: string): Promise<string> {
    const prompt = `You are an AI tutor assistant. Help the user with their educational questions. Be concise, helpful, and encouraging. 

    User question: ${message}

    Please provide a helpful response:`;

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error getting AI response:', error);
      throw error;
    }
  }
}

export default GeminiService;
