
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Index from "./pages/Index";
import DashboardPage from "./pages/dashboard/DashboardPage";
import NotFound from "./pages/NotFound";
import DealDetailPage from "./pages/deals/DealDetailPage";
import DealLoanAdminPage from "./pages/deals/DealLoanAdminPage";
import DealMonitoringPage from "./pages/deals/DealMonitoringPage";
import DocumentIntelligencePage from "./pages/deals/DocumentIntelligencePage";
import AIAgentDashboardPage from "./pages/ai/AIAgentDashboardPage";
import AIChatAssistantButton from "./components/ai/AIChatAssistantButton";

const queryClient = new QueryClient();

// Wrapper component to provide deal context to AIChatAssistantButton
const DealPageWrapper = () => {
  const { dealId } = useParams();
  return (
    <>
      <AIChatAssistantButton context={{ dealId }} />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/deals/:dealId" element={<DealDetailPage />} />
          <Route path="/deals/:dealId/loan-admin" element={<DealLoanAdminPage />} />
          <Route path="/deals/:dealId/monitoring" element={<DealMonitoringPage />} />
          <Route path="/deals/:dealId/documents" element={<DocumentIntelligencePage />} />
          <Route path="/ai/agent-dashboard" element={<AIAgentDashboardPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AIChatAssistantButton />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
