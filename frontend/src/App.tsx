import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Games from "./pages/dyslexia/Games";
import Instruction from "./pages/dyslexia/Instruction";
import { BubbleGame } from "./pages/dyslexia/BubbleGame";
import Auth from "./pages/auth";
import Main from "./pages/dysgraphia/main"
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/protectedRoute";
import Instruction2 from "./pages/dyslexia/instruction2";
import Instruction3 from "./pages/dyslexia/instruction3";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Index />} />

          <Route path="/auth" element={<Auth />} />

          <Route
            path="/alphabet-game"
            element={
              <ProtectedRoute>
                <BubbleGame />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dyslexia-games"
            element={
              <ProtectedRoute>
                <Games />
              </ProtectedRoute>
            }
          />

          <Route
            path="/game-instruction"
            element={
              <ProtectedRoute>
                <Instruction />
              </ProtectedRoute>
            }
          />

          <Route
            path="/buildsentence-instructions"
            element={
              <ProtectedRoute>
                <Instruction2 />
              </ProtectedRoute>
            }
          />

          <Route
            path="/guesscorrectword-instructions"
            element={
              <ProtectedRoute>
                <Instruction3 />
              </ProtectedRoute>
            }
          />


          <Route path="/main" element={<Main />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
