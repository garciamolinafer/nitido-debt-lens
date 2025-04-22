
import { FileText, Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Document {
  id: string;
  name: string;
}

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onSelectDocument: (docId: string) => void;
  isLoading?: boolean;
  availableDocuments: Document[];
}

const ChatInput = ({ onSendMessage, onSelectDocument, isLoading, availableDocuments }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t p-4">
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
                    onSelectDocument(doc.id);
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
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none mr-2"
        />
        <Button 
          className="h-10 px-3" 
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
