import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Paperclip, Send, X, ArrowUpSquare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  sources?: {
    name: string;
    reference: string;
  }[];
}

interface AIChatAssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
  context?: {
    dealId?: string;
    documentId?: string;
  };
}

const getGreetingForRoute = (pathname: string): string => {
  const section = pathname.split('/')[1] || 'home';
  return `Marina, let me know how can I assist you in ${section === 'home' ? 'the command center' : `this ${section} section`}`;
};

const AIChatAssistantPanel = ({ isOpen, onClose, context }: AIChatAssistantPanelProps) => {
  const location = useLocation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const availableDocuments = [
    { id: "doc1", name: "Credit Agreement.pdf" },
    { id: "doc2", name: "Financial Report Q4 2024.xlsx" },
    { id: "doc3", name: "Compliance Certificate.pdf" },
    { id: "doc4", name: "Amendment Agreement.pdf" },
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          content: getGreetingForRoute(location.pathname),
          sender: "ai",
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages.length, location.pathname]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    
    setTimeout(() => {
      generateAIResponse(userMessage);
    }, 1500);
  };
  
  const generateAIResponse = (userMessage: Message) => {
    const messageContent = userMessage.content.toLowerCase();
    let aiResponse: Message;
    
    if (messageContent.includes("ebitda") || messageContent.includes("financial")) {
      aiResponse = {
        id: `ai-${Date.now()}`,
        content: "Based on the latest financial report (Q4 2024), the EBITDA for Apollo Energy Corp is $120 million, which is within the expected range for covenant compliance.",
        sender: "ai",
        timestamp: new Date(),
        sources: [
          { 
            name: "Financial Report Q4 2024.xlsx", 
            reference: "Sheet 1, Cell B15" 
          }
        ]
      };
    }
    else if (messageContent.includes("covenant") || messageContent.includes("compliance")) {
      aiResponse = {
        id: `ai-${Date.now()}`,
        content: "The Leverage covenant requires that Debt/EBITDA ≤ 3.5×. With current Debt at $450M and EBITDA at $120M, the ratio is approximately 3.75×, which exceeds the limit and indicates a breach.",
        sender: "ai",
        timestamp: new Date(),
        sources: [
          { 
            name: "Credit Agreement.pdf", 
            reference: "Section 5.1, page 42" 
          },
          {
            name: "Compliance Certificate.pdf",
            reference: "Calculation Table, page 2"
          }
        ]
      };
    }
    else if (messageContent.includes("email") || messageContent.includes("draft")) {
      aiResponse = {
        id: `ai-${Date.now()}`,
        content: `Here's a draft email regarding the covenant breach:

Subject: NOTICE: Covenant Breach - Apollo Energy Loan

Dear Lenders,

Please be advised that as of Q4 2024 reporting period, the borrower under the Apollo Energy Loan (the "Borrower") has breached the Maximum Leverage Ratio covenant specified in Section 5.1 of the Credit Agreement.

Details:
- Required: Debt/EBITDA ≤ 3.5×
- Actual: Debt/EBITDA = 3.75× (Debt: $450M, EBITDA: $120M)

The Borrower has been notified of this breach and is currently preparing a remediation plan as required under the Agreement. A lenders call will be scheduled within the next 7 business days to discuss this matter.

Please contact me if you have any questions.

Regards,
[Your Name]
Loan Administrator`,
        sender: "ai",
        timestamp: new Date()
      };
    }
    else if (selectedDocument && selectedDocument.includes("Credit Agreement")) {
      aiResponse = {
        id: `ai-${Date.now()}`,
        content: "I've analyzed the Credit Agreement for this deal. Here are the key covenants:\n\n1. Maximum Leverage Ratio: ≤ 3.5×\n2. Minimum Interest Coverage Ratio: ≥ 2.0×\n3. Minimum Liquidity: $25M\n4. Capital Expenditure Limitation: ≤ $50M annually\n5. Permitted Acquisitions: Must be less than $100M individually",
        sender: "ai",
        timestamp: new Date(),
        sources: [
          { 
            name: "Credit Agreement.pdf", 
            reference: "Section 5.1-5.5, pages 42-47" 
          }
        ]
      };
    }
    else {
      aiResponse = {
        id: `ai-${Date.now()}`,
        content: "I understand you're asking about " + userMessage.content.split(" ").slice(0, 3).join(" ") + "... To provide a more accurate response, could you specify which aspect of the deal you're interested in? I can help with financials, covenants, document analysis, or draft communications.",
        sender: "ai",
        timestamp: new Date()
      };
    }
    
    setMessages(prev => [...prev, aiResponse]);
    setIsLoading(false);
    setSelectedDocument(null);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
  const selectDocument = (docId: string) => {
    const document = availableDocuments.find(doc => doc.id === docId);
    if (document) {
      setSelectedDocument(document.name);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-16 right-0 h-[calc(100vh-4rem)] w-full md:w-1/3 bg-white border-l border-gray-200 shadow-lg z-40 flex flex-col">
      <div className="h-16 border-b border-gray-200 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/lovable-uploads/e985ead7-bf16-4994-b9ef-1a26e9fc4d8b.png"
              alt="Nitidina"
            />
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
          <h2 className="font-semibold">Nitidina</h2>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      {(context?.dealId || selectedDocument) && (
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-sm flex items-center">
          <span className="text-gray-500 mr-2">Context:</span>
          {context?.dealId && (
            <span className="bg-gray-100 rounded px-2 py-1 mr-2">Deal {context.dealId}</span>
          )}
          {selectedDocument && (
            <span className="bg-gray-100 rounded px-2 py-1 flex items-center">
              <FileText className="h-3 w-3 mr-1" />
              {selectedDocument}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-5 w-5 ml-1" 
                onClick={() => setSelectedDocument(null)}
              >
                <X className="h-3 w-3" />
              </Button>
            </span>
          )}
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[85%] rounded-lg p-4",
              message.sender === "user"
                ? "bg-gray-100 ml-auto"
                : "bg-white border border-gray-200"
            )}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
            
            {message.sources && message.sources.length > 0 && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Sources:</p>
                {message.sources.map((source, idx) => (
                  <div key={idx} className="flex items-center">
                    <Button variant="link" className="text-xs p-0 h-auto">
                      {source.name}
                    </Button>
                    <span className="text-xs text-gray-500 ml-1">
                      ({source.reference})
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            <div className="text-xs text-gray-400 mt-1 text-right">
              {message.timestamp.toLocaleTimeString()}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="bg-white border border-gray-200 max-w-[85%] rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "250ms" }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "500ms" }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef}></div>
      </div>
      
      {selectedDocument && (
        <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
          <p className="text-xs text-gray-500">Using document context: {selectedDocument}</p>
        </div>
      )}
      
      <div className="border-t border-gray-200 p-4">
        <div className="flex mb-2">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => {
                const docsDropdown = document.getElementById("docs-dropdown");
                if (docsDropdown) {
                  docsDropdown.classList.toggle("hidden");
                }
              }}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            
            <div 
              id="docs-dropdown" 
              className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 rounded shadow-lg hidden z-10"
            >
              <div className="p-2">
                <p className="text-xs text-gray-500 mb-2">Select a document for context:</p>
                {availableDocuments.map((doc) => (
                  <div 
                    key={doc.id}
                    className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                    onClick={() => {
                      selectDocument(doc.id);
                      const docsDropdown = document.getElementById("docs-dropdown");
                      if (docsDropdown) {
                        docsDropdown.classList.add("hidden");
                      }
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm">{doc.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-end">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask a question or enter a command..."
            className="flex-1 resize-none min-h-[80px] mr-2"
          />
          <Button 
            className="h-10 px-3" 
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIChatAssistantPanel;
