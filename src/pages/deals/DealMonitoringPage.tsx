import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronLeft, Upload, Download, Search, CheckCircle, AlertTriangle, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Sidebar from "@/components/dashboard/Sidebar";
import DealPageHeader from "@/components/deals/DealPageHeader";

// Sample data for the prototype
const dealData = {
  "1": {
    name: "Apollo Energy Loan",
    amount: "€100,000,000",
    type: "Term Loan B",
    maturity: "Dec 31, 2028",
    interest: "3M EURIBOR + 250 bps",
    arranger: "BigBank Corp",
    agent: "BigBank Corp",
    syndicateSize: "5 Lenders",
    status: "breach",  // "normal", "breach", "warning"
    events: [
      { id: "e1", date: "Feb 3, 2025", type: "covenant", title: "Covenant breach detected: Leverage 3.8× > 3.5×", severity: "high" },
      { id: "e2", date: "Feb 1, 2025", type: "document", title: "Q4 2024 Compliance Certificate uploaded", severity: "low" },
      { id: "e3", date: "Jan 5, 2025", type: "payment", title: "Interest payment made (€1.2M)", severity: "low" },
      { id: "e4", date: "Dec 15, 2024", type: "other", title: "Interest period rollover completed", severity: "low" }
    ],
    covenants: [
      { id: "c1", name: "Max Net Leverage Ratio", requirement: "≤ 3.5×", status: "breached", value: "3.8×", date: "Dec 31, 2024", nextTest: "Mar 31, 2025" },
      { id: "c2", name: "Min DSCR", requirement: "≥ 1.20×", status: "compliant", value: "1.35×", date: "Dec 31, 2024", nextTest: "Mar 31, 2025" },
      { id: "c3", name: "Cash Balance", requirement: "≥ €10M", status: "compliant", value: "€15M", date: "Dec 31, 2024", nextTest: "Ongoing" },
    ],
    documents: [
      { id: "d1", name: "Credit Agreement", type: "contract", uploadDate: "Jan 01, 2025", status: "extracted", category: "Contracts" },
      { id: "d2", name: "Compliance Cert Q4 2024", type: "report", uploadDate: "Feb 01, 2025", status: "extracted", category: "Financial Reports" },
      { id: "d3", name: "Q4 2024 Financials", type: "spreadsheet", uploadDate: "Feb 01, 2025", status: "extracted", category: "Financial Reports" },
      { id: "d4", name: "Borrower Notice Feb 2025", type: "notice", uploadDate: "Feb 03, 2025", status: "needs_review", category: "Notices" },
    ],
    participants: [
      { id: "p1", name: "BigBank", role: "Agent", share: "35%", contact: "John Smith (john.smith@bigbank.com)" },
      { id: "p2", name: "SmallBank", role: "Participant", share: "15%", contact: "Jane Doe (jane.doe@smallbank.com)" },
      { id: "p3", name: "MidBank", role: "Participant", share: "20%", contact: "Robert Johnson (robert.j@midbank.com)" },
      { id: "p4", name: "Apollo Energy Corp", role: "Borrower", share: "N/A", contact: "CFO: Mike Williams (mike.w@apolloenergy.com)" },
    ]
  },
  "2": {
    name: "Beta Real Estate Facility",
    amount: "€80,000,000",
    type: "Revolving Credit Facility",
    maturity: "Jun 30, 2027",
    interest: "3M EURIBOR + 200 bps",
    arranger: "BigBank Corp",
    agent: "BigBank Corp",
    syndicateSize: "3 Lenders",
    status: "normal",
    events: [
      { id: "e1", date: "Feb 15, 2025", type: "payment", title: "Interest payment due tomorrow", severity: "medium" },
      { id: "e2", date: "Jan 30, 2025", type: "document", title: "Monthly report uploaded", severity: "low" },
      { id: "e3", date: "Jan 15, 2025", type: "payment", title: "Interest payment made (€450K)", severity: "low" }
    ],
    covenants: [
      { id: "c1", name: "LTV", requirement: "≤ 75%", status: "compliant", value: "68%", date: "Dec 31, 2024", nextTest: "Mar 31, 2025" },
      { id: "c2", name: "DSCR", requirement: "≥ 1.15×", status: "compliant", value: "1.25×", date: "Dec 31, 2024", nextTest: "Mar 31, 2025" }
    ],
    documents: [
      { id: "d1", name: "Credit Agreement", type: "contract", uploadDate: "Jun 01, 2024", status: "extracted", category: "Contracts" },
      { id: "d2", name: "Monthly Report Jan 2025", type: "report", uploadDate: "Jan 30, 2025", status: "extracted", category: "Financial Reports" }
    ],
    participants: [
      { id: "p1", name: "BigBank", role: "Agent", share: "50%", contact: "John Smith (john.smith@bigbank.com)" },
      { id: "p2", name: "SmallBank", role: "Participant", share: "25%", contact: "Jane Doe (jane.doe@smallbank.com)" },
      { id: "p3", name: "Beta Group", role: "Borrower", share: "N/A", contact: "CFO: Sarah Brown (sarah.b@betagroup.com)" }
    ]
  }
};

const DealMonitoringPage = () => {
  const { dealId } = useParams<{ dealId: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [documentFilter, setDocumentFilter] = useState<string>('');
  
  // Find the deal data based on dealId
  const deal = dealId && dealData[dealId as keyof typeof dealData] ? dealData[dealId as keyof typeof dealData] : {
    name: `Deal ${dealId}`,
    amount: "Unknown",
    type: "Unknown",
    maturity: "Unknown",
    interest: "Unknown",
    arranger: "Unknown",
    agent: "Unknown",
    syndicateSize: "Unknown",
    status: "normal",
    events: [],
    covenants: [],
    documents: [],
    participants: []
  };
  
  useEffect(() => {
    // Check if there's a tab in the URL params
    const tabParam = searchParams.get('tab');
    if (tabParam && ['overview', 'covenants', 'documents', 'participants', 'ai-qa'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);
  
  const handleTabChange = (value: string) => {
    if (value === "loan-admin") {
      navigate(`/deals/${dealId}/loan-admin`);
    } else {
      setActiveTab(value);
      setSearchParams({ tab: value });
    }
  };
  
  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'breach':
        return (
          <span className="flex items-center text-red-600">
            <AlertTriangle className="h-4 w-4 mr-1" /> 
            Covenant Breach
          </span>
        );
      case 'warning':
        return (
          <span className="flex items-center text-amber-600">
            <AlertTriangle className="h-4 w-4 mr-1" /> 
            Warning
          </span>
        );
      default:
        return (
          <span className="flex items-center text-green-600">
            <CheckCircle className="h-4 w-4 mr-1" /> 
            In Compliance
          </span>
        );
    }
  };
  
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'covenant':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'document':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'payment':
        return <Calendar className="h-5 w-5 text-amber-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const getEventSeverityClass = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-50 border-l-4 border-red-500';
      case 'medium':
        return 'bg-amber-50 border-l-4 border-amber-500';
      default:
        return 'bg-gray-50 border-l-4 border-gray-300';
    }
  };
  
  const filteredDocuments = deal.documents.filter(doc => 
    doc.name.toLowerCase().includes(documentFilter.toLowerCase()) ||
    doc.category.toLowerCase().includes(documentFilter.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header with deal name and navigation */}
        <DealPageHeader dealName={deal.name} />
        
        {/* Tabs for navigation */}
        <div className="border-b px-6">
          <Tabs 
            defaultValue={activeTab} 
            value={activeTab} 
            onValueChange={handleTabChange}
          >
            <TabsList className="mb-0">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="covenants">Covenants & Compliance</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="participants">Participants</TabsTrigger>
              <TabsTrigger value="ai-qa">AI Q&A</TabsTrigger>
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
          
          {/* Tab Content */}
          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Key Deal Parameters */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Deal Parameters</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Deal Amount</p>
                    <p className="font-medium">{deal.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Deal Type</p>
                    <p className="font-medium">{deal.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Maturity</p>
                    <p className="font-medium">{deal.maturity}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Interest</p>
                    <p className="font-medium">{deal.interest}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Arranger</p>
                    <p className="font-medium">{deal.arranger}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Agent</p>
                    <p className="font-medium">{deal.agent}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Syndicate Size</p>
                    <p className="font-medium">{deal.syndicateSize}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium">{getStatusLabel(deal.status)}</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Recent Events Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Events Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {deal.events.map(event => (
                    <div 
                      key={event.id} 
                      className={`flex p-3 rounded-md ${getEventSeverityClass(event.severity)}`}
                    >
                      <div className="mr-3">
                        {getEventIcon(event.type)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{event.title}</p>
                        <p className="text-xs text-gray-500">{event.date}</p>
                      </div>
                    </div>
                  ))}
                  {deal.events.length === 0 && (
                    <p className="text-center text-gray-500 text-sm p-4">
                      No recent events
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="covenants" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Covenant Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Covenant</TableHead>
                      <TableHead>Requirement</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Latest Value</TableHead>
                      <TableHead>Date Measured</TableHead>
                      <TableHead>Next Test</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deal.covenants.map(covenant => (
                      <TableRow key={covenant.id}>
                        <TableCell className="font-medium">{covenant.name}</TableCell>
                        <TableCell>{covenant.requirement}</TableCell>
                        <TableCell>
                          {covenant.status === 'breached' ? (
                            <span className="flex items-center text-red-600">
                              <AlertTriangle className="h-4 w-4 mr-1" /> Breached
                            </span>
                          ) : (
                            <span className="flex items-center text-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" /> Compliant
                            </span>
                          )}
                        </TableCell>
                        <TableCell className={covenant.status === 'breached' ? "text-red-600 font-medium" : ""}>
                          {covenant.value}
                        </TableCell>
                        <TableCell>{covenant.date}</TableCell>
                        <TableCell>{covenant.nextTest}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {deal.covenants.length === 0 && (
                  <p className="text-center text-gray-500 text-sm p-4">
                    No covenants found for this deal
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documents" className="mt-0">
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search documents..."
                  className="pl-8"
                  value={documentFilter}
                  onChange={(e) => setDocumentFilter(e.target.value)}
                />
              </div>
              <Button>
                <Upload className="h-4 w-4 mr-2" /> Upload Document
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Documents</CardTitle>
              </CardHeader>
              <CardContent>
                {filteredDocuments.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Document Name</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Upload Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDocuments.map(doc => (
                        <TableRow key={doc.id}>
                          <TableCell className="font-medium">{doc.name}</TableCell>
                          <TableCell>{doc.category}</TableCell>
                          <TableCell>{doc.uploadDate}</TableCell>
                          <TableCell>
                            {doc.status === 'extracted' ? (
                              <span className="flex items-center text-green-600 text-sm">
                                <CheckCircle className="h-3 w-3 mr-1" /> Extracted
                              </span>
                            ) : doc.status === 'needs_review' ? (
                              <span className="flex items-center text-amber-600 text-sm">
                                <AlertTriangle className="h-3 w-3 mr-1" /> Needs Review
                              </span>
                            ) : (
                              <span className="text-gray-500 text-sm">{doc.status}</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="h-7 text-xs">
                              <Download className="h-3 w-3 mr-1" /> Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-center text-gray-500 text-sm p-4">
                    No documents match your search
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="participants" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Deal Participants</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Participant</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Share</TableHead>
                      <TableHead>Contact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {deal.participants.map(participant => (
                      <TableRow key={participant.id}>
                        <TableCell className="font-medium">{participant.name}</TableCell>
                        <TableCell>{participant.role}</TableCell>
                        <TableCell>{participant.share}</TableCell>
                        <TableCell>{participant.contact}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="ai-qa" className="mt-0">
            <Card className="h-[calc(100vh-220px)]">
              <CardHeader>
                <CardTitle>AI Assistant - {deal.name}</CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(100%-80px)] flex flex-col">
                <div className="flex-1 bg-gray-50 rounded-md p-4 mb-4 overflow-y-auto">
                  <div className="bg-white p-3 rounded-lg mb-4 max-w-3xl ml-auto">
                    <p className="text-gray-600">How can I help with the {deal.name} deal?</p>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg mb-4 max-w-3xl">
                    <p>You're looking at the {deal.name} deal. This is a {deal.type} with a total amount of {deal.amount}. 
                    {deal.status === 'breach' && " There's currently a covenant breach that requires attention."} 
                    {deal.status === 'warning' && " There are some items that need your attention."} 
                    {deal.status === 'normal' && " All parameters are currently in compliance."}
                    </p>
                    <p className="mt-2">You can ask me questions about this deal's covenants, documentation, payment history, or other specifics. How can I assist you today?</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Input placeholder="Ask a question about this deal..." className="mr-2" />
                  <Button>Send</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </div>
    </div>
  );
};

export default DealMonitoringPage;
