
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Subjects from "./pages/Subjects";
import AuthPage from "./pages/AuthPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SignedOut>
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={<AuthPage />} />
            </Routes>
          </SignedOut>
          <SignedIn>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/chat/:subject" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SignedIn>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
