
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

  constructor() {
    // Using your provided Gemini API key
    this.apiKey = 'AIzaSyBtPGgfBv1fgQFU67Wq6uXHpPspvgpQEm8';
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

    Make sure the course is well-structured, progressive, and practical with real-world applications.`;

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

  async getChatResponse(message: string, subject?: string): Promise<string> {
    const contextPrompt = subject 
      ? `You are an expert AI tutor specializing in ${subject}.` 
      : 'You are an AI tutor assistant.';

    const prompt = `${contextPrompt} Help the user with their educational questions. Be detailed, helpful, and encouraging. Provide examples and step-by-step explanations when appropriate.

    User question: ${message}

    Please provide a comprehensive and helpful response:`;

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

  async getPersonalizedRecommendations(userId: string, interests: string[]): Promise<string[]> {
    const prompt = `Based on a user's interests: ${interests.join(', ')}, suggest 5 personalized learning topics or courses that would help them grow. Return only a JSON array of strings.`;

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

      const data = await response.json();
      const suggestions = JSON.parse(data.candidates[0].content.parts[0].text);
      return suggestions;
    } catch (error) {
      console.error('Error getting recommendations:', error);
      return [];
    }
  }
}

export default GeminiService;
