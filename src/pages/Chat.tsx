
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, BookOpen, Lightbulb, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import GeminiService from "@/services/geminiService";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  subject?: string;
}

const Chat = () => {
  const { subject } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini-api-key') || "");
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize with welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      content: subject 
        ? `Hello! I'm your AI tutor for ${subject}. What would you like to learn today?`
        : "Hello! I'm your AI tutor powered by Gemini AI. I can help you with any subject. What would you like to learn today?",
      sender: "ai",
      timestamp: new Date(),
      subject
    };
    setMessages([welcomeMessage]);
  }, [subject]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const saveApiKey = (key: string) => {
    localStorage.setItem('gemini-api-key', key);
    setApiKey(key);
    setShowApiKeyInput(false);
  };

  const getAIResponse = async (userMessage: string): Promise<string> => {
    if (!apiKey) {
      return "Please provide your Gemini API key to start chatting with AI.";
    }

    try {
      const geminiService = new GeminiService(apiKey);
      return await geminiService.getChatResponse(userMessage);
    } catch (error) {
      console.error('Error getting AI response:', error);
      return "Sorry, I'm having trouble connecting to the AI service. Please check your API key and try again.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

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

      setMessages(prev => [...prev, aiResponse]);
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
    "Explain this concept",
    "Give me an example",
    "How do I solve this?",
    "What's the next step?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
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
            <p className="text-gray-600">
              Get personalized help powered by Gemini AI
            </p>
          </div>

          {showApiKeyInput && (
            <Card className="mb-6 border-yellow-200 bg-yellow-50">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Gemini API Key Required</h3>
                <p className="text-sm text-gray-600 mb-3">
                  To use AI features, please enter your Gemini API key. You can get one from Google AI Studio.
                </p>
                <div className="flex space-x-2">
                  <Input
                    type="password"
                    placeholder="Enter your Gemini API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <Button onClick={() => saveApiKey(apiKey)} disabled={!apiKey}>
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Gemini AI Tutor</h3>
                    <p className="text-sm text-gray-600">Online • Ready to help</p>
                  </div>
                </div>
                {apiKey && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowApiKeyInput(true)}
                  >
                    Change API Key
                  </Button>
                )}
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
                    <div className={`flex items-start space-x-2 max-w-[70%] ${
                      message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.sender === "user" 
                          ? "bg-purple-100 text-purple-600" 
                          : "gradient-bg text-white"
                      }`}>
                        {message.sender === "user" ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      <div className={`rounded-lg p-3 ${
                        message.sender === "user"
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === "user" ? "text-purple-200" : "text-gray-500"
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
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
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
              <div className="p-4 border-t bg-gray-50">
                <p className="text-sm text-gray-600 mb-2">Quick prompts:</p>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map((prompt) => (
                    <Button
                      key={prompt}
                      variant="outline"
                      size="sm"
                      onClick={() => setInput(prompt)}
                      className="text-xs"
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask me anything about your studies..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  disabled={!apiKey}
                />
                <Button onClick={handleSend} disabled={!input.trim() || isTyping || !apiKey}>
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
