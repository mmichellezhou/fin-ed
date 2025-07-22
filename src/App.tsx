import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatbotWidget from "./components/ChatbotWidget";
import Index from "./pages/Index";
import LessonSelector from "./pages/LessonSelector";
import LessonViewer from "./pages/LessonViewer";
import QuizPage from "./pages/QuizPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProfileSetup from "./pages/ProfileSetup";
import NotFound from "./pages/NotFound";
import { UserProvider } from "./contexts/UserContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen">
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/setup" element={<ProfileSetup />} />
              {/* <Route path="/lesson-selector" element={<LessonSelector />} /> */}
              <Route path="/lessons" element={<LessonViewer />} />
              <Route path="/lessons/:ageGroup" element={<LessonViewer />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ChatbotWidget />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
