import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams, Navigate, useLocation } from "react-router-dom";
import { useState, createContext, useContext } from "react";
import AppHeader from "@/components/layout/AppHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import NotificationCenter from "@/components/notifications/NotificationCenter";

// Import all page components
import AccessPage from "@/pages/access/AccessPage";
import Index from "@/pages/Index";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import DealDetailPage from "@/pages/deals/DealDetailPage";
import DealLoanAdminPage from "@/pages/deals/DealLoanAdminPage";
import DealMonitoringPage from "@/pages/deals/DealMonitoringPage";
import DocumentIntelligencePage from "@/pages/deals/DocumentIntelligencePage";
import AIAgentDashboardPage from "@/pages/ai/AIAgentDashboardPage";
import IntegrationSettingsPage from "@/pages/settings/IntegrationSettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

type AuthContextType = {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const DealPageWrapper = () => {
  const { dealId } = useParams();
  return (
    <>
      <AIChatAssistantButton context={{ dealId }} />
    </>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/access" replace />;
  }
  
  return <>{children}</>;
};

const ShowHeaderWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const path = location.pathname;
  
  const hideHeader = path === "/access" || path.startsWith("/deals/");
  
  return (
    <>
      {!hideHeader && <AppHeader />}
      {children}
    </>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <div className="min-h-screen relative pb-16">
            <BrowserRouter>
              <ShowHeaderWrapper>
                {isAuthenticated && (
                  <div className="flex items-center justify-end gap-2 fixed top-4 right-4 z-50">
                    <NotificationCenter />
                  </div>
                )}
                <Routes>
                  <Route path="/access" element={<AccessPage />} />
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Index />
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/deals/:dealId" element={
                    <ProtectedRoute>
                      <DealDetailPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/deals/:dealId/loan-admin" element={
                    <ProtectedRoute>
                      <DealLoanAdminPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/deals/:dealId/monitoring" element={
                    <ProtectedRoute>
                      <DealMonitoringPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/deals/:dealId/documents" element={
                    <ProtectedRoute>
                      <DocumentIntelligencePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/ai/agent-dashboard" element={
                    <ProtectedRoute>
                      <AIAgentDashboardPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings/integrations" element={
                    <ProtectedRoute>
                      <IntegrationSettingsPage />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ShowHeaderWrapper>
            </BrowserRouter>
            <SiteFooter />
          </div>
        </TooltipProvider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
