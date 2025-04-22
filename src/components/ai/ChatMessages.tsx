
import { useEffect, useRef } from "react";
import { Message } from "./types/chat";
import ChatMessage from "./ChatMessage";

interface ChatMessagesProps {
  messages: Message[];
  isLoading?: boolean;
}

const ChatMessages = ({ messages, isLoading }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
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
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
