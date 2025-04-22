
import clsx from "clsx";

export type Message = { from: "user" | "bot"; text: string; id: number };

interface ChatMessageListProps {
  messages: Message[];
}

export default function ChatMessageList({ messages }: ChatMessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
      {messages.map((m) => (
        <div
          key={m.id}
          className={clsx(
            "max-w-[80%] text-sm leading-relaxed whitespace-pre-line",
            m.from === "bot"
              ? "bg-gray-100 p-3 rounded-md shadow"
              : "ml-auto bg-black text-white p-3 rounded-md shadow"
          )}
        >
          {m.text}
        </div>
      ))}
    </div>
  );
}
