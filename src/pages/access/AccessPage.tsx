
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const AccessPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSSOLogin = () => {
    setIsLoading(true);
    
    // Simulate SSO authentication process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Authentication successful",
        description: "Welcome to Nítido Debt",
      });
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8">
          <img 
            src="/lovable-uploads/97e9da13-fe84-4a49-9699-535c9539831f.png" 
            alt="Nítido Logo" 
            className="h-12"
          />
        </div>
        
        {/* Tagline */}
        <h2 className="text-xl font-medium text-gray-800 mb-8">
          AI-First Syndicated Lending Platform
        </h2>
        
        {/* Login Panel */}
        <div className="w-full bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <p className="text-center text-gray-600 mb-6">
            Sign in via Corporate SSO to access Nítido
          </p>
          
          <Button 
            className="w-full bg-white text-black border border-black hover:bg-black hover:text-white transition-colors"
            onClick={handleSSOLogin}
            disabled={isLoading}
          >
            {isLoading ? "Authenticating..." : "Login with SSO"}
          </Button>
        </div>
        
        {/* Features highlight */}
        <div className="mt-12 grid grid-cols-3 gap-8 w-full max-w-lg">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 flex items-center justify-center border border-gray-300 rounded-full mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text">
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <line x1="10" y1="9" x2="8" y2="9"/>
              </svg>
            </div>
            <span className="text-sm font-medium">Document AI</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 flex items-center justify-center border border-gray-300 rounded-full mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bar-chart-2">
                <line x1="18" y1="20" x2="18" y2="10"/>
                <line x1="12" y1="20" x2="12" y2="4"/>
                <line x1="6" y1="20" x2="6" y2="14"/>
              </svg>
            </div>
            <span className="text-sm font-medium">Covenant Monitoring</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 flex items-center justify-center border border-gray-300 rounded-full mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot">
                <path d="M12 8V4H8"/>
                <rect width="16" height="12" x="4" y="8" rx="2"/>
                <path d="M2 14h2"/>
                <path d="M20 14h2"/>
                <path d="M15 13v2"/>
                <path d="M9 13v2"/>
              </svg>
            </div>
            <span className="text-sm font-medium">Agentic Bots</span>
          </div>
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-xs text-gray-500">
          <a href="#" className="hover:underline mr-4">Support</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </div>
  );
};

export default AccessPage;
