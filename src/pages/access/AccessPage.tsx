
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/App";
import { Banknote, Users, ChartLine, TrendingUp, Headphones, Bot, Link2 } from "lucide-react";

const featureCards = [
  {
    icon: Banknote,
    title: "Loan agency platform",
  },
  {
    icon: Users,
    title: "Syndication platform",
  },
  {
    icon: ChartLine,
    title: "Portfolio monitoring",
  },
  {
    icon: TrendingUp,
    title: "Trading platform",
  },
  {
    icon: Headphones,
    title: "24/7 Agentic AI support",
  },
  {
    icon: Bot,
    title: "AI first functionalities",
  },
  {
    icon: Link2,
    title: "Integrated and connected apps",
  },
];

const AccessPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSSOLogin = () => {
    setIsLoading(true);

    // Simulate SSO authentication process
    setTimeout(() => {
      setIsLoading(false);
      login();
      toast({
        title: "Authentication successful",
        description: "Welcome to Nítido Debt",
      });
      navigate("/");
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4 pt-8 pb-24 relative">
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
        <h2 className="text-xl font-medium text-gray-800 mb-8 text-center">
          Intelligence and efficiency platform for structured finance managers
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
      </div>

      {/* Features highlight */}
      <div className="mt-12 w-full max-w-3xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 justify-center">
          {featureCards.map(({ icon: Icon, title }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div className="h-12 w-12 flex items-center justify-center border border-gray-300 rounded-full mb-2 bg-white">
                <Icon size={28} strokeWidth={2} className="text-black" />
              </div>
              <span className="text-xs font-medium">{title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccessPage;

