
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DashboardPage from "./pages/dashboard/DashboardPage";
import NotFound from "./pages/NotFound";
import DealDetailPage from "./pages/deals/DealDetailPage";
import DealLoanAdminPage from "./pages/deals/DealLoanAdminPage";
import DealMonitoringPage from "./pages/deals/DealMonitoringPage";

const queryClient = new QueryClient();

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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
