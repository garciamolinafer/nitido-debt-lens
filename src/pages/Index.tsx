import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart2, FileText, MessageSquare, Settings, Database, Bot } from "lucide-react";
import { useAuth } from "@/App";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="container max-w-7xl mx-auto p-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Nítido Loan Management Platform</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          AI-powered loan management platform for syndicated lending portfolios
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5" /> Dashboard
            </CardTitle>
            <CardDescription>View overall portfolio health and deal metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Access charts, tables and reports on your syndicated loan portfolio. Monitor covenant compliance, 
              payments, and other key metrics.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/dashboard")} className="w-full">
              Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Document Intelligence */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" /> Document Intelligence
            </CardTitle>
            <CardDescription>Process and extract data from documents</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Upload credit agreements, financial statements, and other documents for 
              AI-powered extraction and analysis.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/deals/1/documents")} className="w-full">
              Try Document Intelligence <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* AI Chat Assistant */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" /> AI Chat Assistant
            </CardTitle>
            <CardDescription>Get help and insights from your AI assistant</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Ask questions about deals, generate summaries, draft communications, and get 
              analysis using natural language.
            </p>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => {
                // The AI chat assistant is accessible from anywhere via the floating button
                const chatButton = document.querySelector('[aria-label="Open AI Chat Assistant"]');
                if (chatButton instanceof HTMLElement) {
                  chatButton.click();
                }
              }}
              className="w-full"
            >
              Open AI Assistant <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* AI Agent Dashboard */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" /> AI Agent Dashboard
            </CardTitle>
            <CardDescription>Configure and manage AI automation tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Set up automated workflows, monitor bot activity, and manage task queues for 
              document processing, notifications, and more.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/ai/agent-dashboard")} className="w-full">
              Go to AI Agent Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Integration Settings */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" /> Integration Settings
            </CardTitle>
            <CardDescription>Configure connections to external systems</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Connect to loan servicing systems, email providers, calendars, and other 
              third-party services to enhance automation capabilities.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/settings/integrations")} className="w-full">
              Configure Integrations <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        {/* Demo Deals */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" /> Deal Explorer
            </CardTitle>
            <CardDescription>Explore sample deals in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Browse demo deals with sample data to see how Nítido manages loan portfolios, 
              covenants, payments, and documentation.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/deals/1")} className="w-full">
              View Sample Deal <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
