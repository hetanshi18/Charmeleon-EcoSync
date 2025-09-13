import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Marketplace from "./pages/Marketplace";
import CarbonBudget from "./pages/CarbonBudget";
import NotFound from "./pages/NotFound";
import TripTracker from "./pages/TripTracker";
import SwipePage from "./pages/SwipePage";
import LandingPage from './pages/LandingPage';
import EcoConnect from "./pages/EcoConnect";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/carbon-budget"
              element={
                <ProtectedRoute>
                  <CarbonBudget />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trip-tracker"
              element={
                <ProtectedRoute>
                  <TripTracker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/swipe-page"
              element={
                <ProtectedRoute>
                  <SwipePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/marketplace"
              element={
                <ProtectedRoute>
                  <Marketplace />
                </ProtectedRoute>
              }
            />
            <Route
              path="/eco-connect"
              element={
                <ProtectedRoute>
                  <EcoConnect />
                </ProtectedRoute>
              }
            />
            
            {/* Redirect any unknown routes */}
            <Route path="*" element={<Navigate to="/landing" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;