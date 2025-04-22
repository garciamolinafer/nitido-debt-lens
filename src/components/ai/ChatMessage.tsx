
import { cn } from "@/lib/utils";
import { Message } from "./types/chat";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "max-w-[80%] rounded-lg px-4 py-2",
        message.sender === "user"
          ? "bg-primary text-white ml-auto"
          : "bg-gray-100 text-gray-800"
      )}
    >
      <p className="whitespace-pre-wrap">{message.content}</p>
      
      {message.sources && message.sources.length > 0 && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-1">Sources:</p>
          {message.sources.map((source, idx) => (
            <div key={idx} className="flex items-center">
              <button className="text-xs text-primary hover:underline p-0">
                {source.name}
              </button>
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
  );
};

export default ChatMessage;
