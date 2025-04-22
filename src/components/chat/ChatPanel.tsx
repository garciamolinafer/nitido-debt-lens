
import React from 'react';

interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ open, onClose, onOpen }) => {
  return (
    <div 
      className={`transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'} 
      fixed right-0 top-0 bottom-0 w-80 bg-white shadow-lg z-50`}
    >
      <div className="p-4">
        <button onClick={onClose}>Close Chat</button>
        {/* Placeholder content */}
        <p>Chat Panel Content</p>
      </div>
    </div>
  );
};

export default ChatPanel;
