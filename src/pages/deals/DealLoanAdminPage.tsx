
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, RefreshCw, Download, ExternalLink, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/dashboard/Sidebar";
import DealPageHeader from "@/components/deals/DealPageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for the prototype
const trancheData = [
  {
    id: "t1",
    name: "Term Loan A",
    originalCommitment: "€50,000,000", 
    currentOutstanding: "€45,000,000",
    accruedInterest: "€200,000",
    interestRateTerms: "3M EURIBOR + 2.5%",
    nextPaymentDate: "30 Jun 2025",
    repaymentType: "Amortizing"
  },
  {
    id: "t2",
    name: "Revolver B",
    originalCommitment: "€30,000,000", 
    currentOutstanding: "€20,000,000",
    accruedInterest: "€125,000",
    interestRateTerms: "3M EURIBOR + 3.0%",
    nextPaymentDate: "30 Jun 2025",
    repaymentType: "Revolving",
    utilization: 66
  }
];

const transactionHistory = [
  {
    id: "tx1",
    date: "Feb 1, 2025",
    event: "Principal Repayment",
    amount: "€5,000,000",
    newBalance: "€45,000,000"
  },
  {
    id: "tx2",
    date: "Jan 5, 2025",
    event: "Interest Payment",
    amount: "€1,200,000",
    newBalance: "€50,000,000"
  },
  {
    id: "tx3",
    date: "Dec 15, 2024",
    event: "Interest Period Rollover",
    amount: "-",
    newBalance: "€50,000,000"
  }
];

const lenderPositions = [
  {
    id: "l1",
    name: "BigBank",
    role: "Agent",
    termA: "€30,000,000",
    revolverB: "€5,000,000",
    total: "€35,000,000"
  },
  {
    id: "l2",
    name: "SmallBank",
    role: "Participant",
    termA: "€15,000,000",
    revolverB: "€15,000,000",
    total: "€30,000,000"
  },
  {
    id: "l3",
    name: "MidBank",
    role: "Participant",
    termA: "€0",
    revolverB: "€10,000,000",
    total: "€10,000,000"
  }
];

const DealLoanAdminPage = () => {
  const { dealId } = useParams<{ dealId: string }>();
  const navigate = useNavigate();
  const [integrationStatus, setIntegrationStatus] = useState({
    loanIQ: { connected: true, lastSync: "1 hour ago", hasDiscrepancy: false },
    versana: { synced: false }
  });
  
  const handleTabChange = (value: string) => {
    if (value === "monitoring") {
      navigate(`/deals/${dealId}/monitoring`);
    }
  };
  
  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };
  
  const syncWithVersana = () => {
    setIntegrationStatus(prev => ({
      ...prev,
      versana: { synced: true }
    }));
  };
  
  const refreshLoanIQSync = () => {
    setIntegrationStatus(prev => ({
      ...prev,
      loanIQ: { ...prev.loanIQ, lastSync: "just now" }
    }));
  };

  // Get deal name from dealId (in real app, would come from API)
  const dealName = dealId === "1" ? "Apollo Energy Loan" : 
                   dealId === "2" ? "Beta Real Estate Facility" :
                   dealId === "3" ? "Gamma Technology Credit" : 
                   dealId === "4" ? "Delta Manufacturing Loan" : `Deal ${dealId}`;

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header with deal name and navigation */}
        <DealPageHeader dealName={dealName} />
        
        {/* Tabs for navigation */}
        <div className="border-b px-6">
          <Tabs defaultValue="loan-admin" onValueChange={handleTabChange}>
            <TabsList className="mb-0">
              <TabsTrigger value="monitoring">Overview & Monitoring</TabsTrigger>
              <TabsTrigger value="loan-admin">Loan Administration</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Main content area with scrolling */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Back button */}
          <Button 
            variant="ghost" 
            className="mb-4 flex items-center text-gray-600"
            onClick={handleBackToDashboard}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Back to Dashboard
          </Button>
          
          {/* Integration Status Panel */}
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Integration & Reconciliation Status</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <span>LoanIQ:</span>
                {integrationStatus.loanIQ.connected ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Connected</span>
                    <span className="text-xs text-gray-500">
                      (Data last synced {integrationStatus.loanIQ.lastSync})
                    </span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-7 ml-2 text-xs"
                      onClick={refreshLoanIQSync}
                    >
                      <RefreshCw className="h-3 w-3 mr-1" /> Refresh
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-7 text-xs"
                    >
                      <ExternalLink className="h-3 w-3 mr-1" /> Open in LoanIQ
                    </Button>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Not Connected</span>
                    <Button size="sm" variant="outline" className="h-7 ml-2 text-xs">Connect</Button>
                  </>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <span>Versana:</span>
                {integrationStatus.versana.synced ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Synced</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">Not Synced</span>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-7 ml-2 text-xs"
                      onClick={syncWithVersana}
                    >
                      Push to Versana
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Tranche Summary */}
          <div className="mb-6">
            <h2 className="text-lg font-bold mb-3">Tranche Summary</h2>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tranche Name</TableHead>
                    <TableHead>Original Commitment</TableHead>
                    <TableHead>Current Outstanding</TableHead>
                    <TableHead>Accrued Interest</TableHead>
                    <TableHead>Interest Rate Terms</TableHead>
                    <TableHead>Next Payment Date</TableHead>
                    <TableHead>Repayment Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trancheData.map((tranche) => (
                    <TableRow key={tranche.id}>
                      <TableCell className="font-medium">{tranche.name}</TableCell>
                      <TableCell>{tranche.originalCommitment}</TableCell>
                      <TableCell>{tranche.currentOutstanding}</TableCell>
                      <TableCell>{tranche.accruedInterest}</TableCell>
                      <TableCell>{tranche.interestRateTerms}</TableCell>
                      <TableCell>{tranche.nextPaymentDate}</TableCell>
                      <TableCell>{tranche.repaymentType}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Utilization for revolving facilities */}
            {trancheData.some(t => t.repaymentType === "Revolving") && (
              <div className="mt-4">
                <h3 className="text-md font-medium mb-2">Revolver Utilization</h3>
                <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-md">
                  <div className="w-1/3">
                    <p className="text-sm font-medium">Revolver B</p>
                    <p className="text-xs text-gray-600">€20M drawn of €30M limit (66%)</p>
                  </div>
                  <div className="flex-1">
                    <Progress value={66} className="h-2" />
                  </div>
                  <div className="w-16">
                    <p className="text-sm text-right">66%</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Transaction History */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-bold">Transaction History</h2>
              <Button variant="outline" size="sm" className="text-xs">
                <Download className="h-3 w-3 mr-1" /> Export
              </Button>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>New Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactionHistory.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.event}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.newBalance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant="link" className="mt-2 text-xs p-0">
              View Full History
            </Button>
          </div>
          
          {/* Lender Positions */}
          <div>
            <h2 className="text-lg font-bold mb-3">Lender Positions</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lender</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Term A</TableHead>
                  <TableHead>Revolver B</TableHead>
                  <TableHead>Total Exposure</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lenderPositions.map((lender) => (
                  <TableRow key={lender.id}>
                    <TableCell className="font-medium">{lender.name}</TableCell>
                    <TableCell>{lender.role}</TableCell>
                    <TableCell>{lender.termA}</TableCell>
                    <TableCell>{lender.revolverB}</TableCell>
                    <TableCell className="font-medium">{lender.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealLoanAdminPage;
