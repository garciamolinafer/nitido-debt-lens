
import { useState } from "react";
import { Message } from "./types/chat";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  context?: {
    dealId?: string;
    documentId?: string;
  };
}

const ChatPanel = ({ isOpen, onClose, context }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  // Mock documents for contextual reference
  const availableDocuments = [
    { id: "doc1", name: "Credit Agreement.pdf" },
    { id: "doc2", name: "Financial Report Q4 2024.xlsx" },
    { id: "doc3", name: "Compliance Certificate.pdf" },
    { id: "doc4", name: "Amendment Agreement.pdf" },
  ];

  // Initialize with welcome message
  useState(() => {
    if (messages.length === 0) {
      let welcomeMessage = "Hello! I'm your AI assistant. How can I help you today?";
      
      if (context?.dealId) {
        welcomeMessage = `Hello! I'm your AI assistant. You're currently viewing Deal ${context.dealId}. How can I help you with this deal?`;
      }
      
      setMessages([
        {
          id: "welcome",
          content: welcomeMessage,
          sender: "ai",
          timestamp: new Date()
        }
      ]);
    }
  });

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      generateResponse(userMessage);
    }, 1500);
  };

  const generateResponse = (userMessage: Message) => {
    const messageContent = userMessage.content.toLowerCase();
    let aiResponse: Message;
    
    // Mock response logic
    if (messageContent.includes("covenant") || messageContent.includes("compliance")) {
      aiResponse = {
        id: `ai-${Date.now()}`,
        content: "Based on the latest compliance report, all covenants are being met.",
        sender: "ai",
        timestamp: new Date(),
        sources: [
          { 
            name: "Compliance Certificate.pdf",
            reference: "Section 2.1"
          }
        ]
      };
    } else {
      aiResponse = {
        id: `ai-${Date.now()}`,
        content: "I understand your question. Could you please provide more specific details about what you'd like to know?",
        sender: "ai",
        timestamp: new Date()
      };
    }
    
    setMessages(prev => [...prev, aiResponse]);
    setIsLoading(false);
    setSelectedDocument(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-full md:w-1/3 bg-white border-l border-gray-200 shadow-lg z-40 flex flex-col">
      <ChatHeader onClose={onClose} />
      
      {(context?.dealId || selectedDocument) && (
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-sm">
          <span className="text-gray-500 mr-2">Context:</span>
          {context?.dealId && (
            <span className="bg-gray-100 rounded px-2 py-1 mr-2">Deal {context.dealId}</span>
          )}
        </div>
      )}
      
      <ChatMessages messages={messages} isLoading={isLoading} />
      
      <ChatInput
        onSendMessage={handleSendMessage}
        onSelectDocument={setSelectedDocument}
        isLoading={isLoading}
        availableDocuments={availableDocuments}
      />
    </div>
  );
};

export default ChatPanel;
