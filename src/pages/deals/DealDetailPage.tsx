
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const DealDetailPage = () => {
  const { dealId } = useParams<{ dealId: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Default behavior - redirect to monitoring tab
    navigate(`/deals/${dealId}/monitoring`);
  }, [dealId, navigate]);
  
  return (
    <div className="min-h-screen bg-white">
      {/* This page is just a redirect to the monitoring tab */}
      <div className="flex justify-center items-center h-full">
        <p>Redirecting...</p>
      </div>
    </div>
  );
};

export default DealDetailPage;
