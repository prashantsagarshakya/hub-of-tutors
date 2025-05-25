
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/clerk-react";
import GeminiService from "@/services/geminiService";
import MongoService from "@/services/mongoService";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  subject?: string;
}

const Chat = () => {
  const { subject } = useParams();
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const geminiService = new GeminiService();
  const mongoService = new MongoService();

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      content: subject 
        ? `Hello ${user?.firstName || 'there'}! I'm your AI tutor for ${subject}. I'm powered by advanced AI and ready to help you master this subject. What would you like to learn today?`
        : `Hello ${user?.firstName || 'there'}! I'm your AI tutor powered by Gemini AI. I can help you with any subject and adapt to your learning style. What would you like to explore today?`,
      sender: "ai",
      timestamp: new Date(),
      subject
    };
    setMessages([welcomeMessage]);
    
    // Create new chat session
    if (user) {
      initializeChat();
    }
  }, [subject, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const initializeChat = async () => {
    if (!user) return;
    
    try {
      const chatData = {
        subject: subject || 'general',
        messages: [],
        startedAt: new Date()
      };
      
      const result = await mongoService.saveChat(chatData, user.id);
      setChatId(result.insertedId);
    } catch (error) {
      console.error('Error initializing chat:', error);
    }
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    try {
      return await geminiService.getChatResponse(userMessage, subject);
    } catch (error) {
      console.error('Error getting AI response:', error);
      return "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.";
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
      subject
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const aiResponseText = await getAIResponse(input);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseText,
        sender: "ai",
        timestamp: new Date(),
        subject
      };

      const updatedMessages = [...messages, userMessage, aiResponse];
      setMessages(prev => [...prev, aiResponse]);

      // Save to MongoDB
      if (chatId) {
        await mongoService.updateChat(chatId, updatedMessages);
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    "Explain this concept step by step",
    "Give me a practical example",
    "How do I solve this problem?",
    "What should I learn next?",
    "Create a practice exercise"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              {subject ? `${subject} Tutor` : "AI Tutor Chat"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Get personalized help powered by Gemini AI
            </p>
          </div>

          <Card className="h-[600px] flex flex-col shadow-xl border-2 border-purple-200 dark:border-purple-800">
            {/* Chat Header */}
            <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">Gemini AI Tutor</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Online • Ready to help</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                  <MessageCircle className="w-4 h-4" />
                  <span>{messages.length - 1} messages</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === "user" 
                          ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400" 
                          : "gradient-bg text-white"
                      }`}>
                        {message.sender === "user" ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      <div className={`rounded-lg p-3 shadow-md ${
                        message.sender === "user"
                          ? "bg-purple-600 text-white"
                          : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === "user" ? "text-purple-200" : "text-gray-500 dark:text-gray-400"
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Quick Prompts */}
            {messages.length <= 1 && (
              <div className="p-4 border-t bg-gray-50 dark:bg-gray-900/50">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Quick prompts:</p>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt) => (
                    <Button
                      key={prompt}
                      variant="outline"
                      size="sm"
                      onClick={() => setInput(prompt)}
                      className="text-xs hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-800"
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t bg-white dark:bg-gray-800">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask me anything about your studies..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-purple-200 dark:border-purple-800 focus:border-purple-500"
                />
                <Button 
                  onClick={handleSend} 
                  disabled={!input.trim() || isTyping}
                  className="gradient-bg text-white hover:opacity-90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default Chat;
