
import React from 'react';
import { Conversation } from '../types';

interface ChatListProps {
  onSelect: (id: string) => void;
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    participant: { id: 'u1', name: 'Alice Cooper', avatar: 'https://picsum.photos/seed/alice/100', phone: '123' },
    lastMessage: 'Hey, did you see the new video?',
    lastTimestamp: '10:45 AM',
    unread: true
  },
  {
    id: 'c2',
    participant: { id: 'u2', name: 'Bob Marley', avatar: 'https://picsum.photos/seed/bob/100', phone: '456' },
    lastMessage: 'Meeting tomorrow at 9?',
    lastTimestamp: 'Yesterday',
    unread: false
  },
  {
    id: 'c3',
    participant: { id: 'u3', name: 'Charlie Day', avatar: 'https://picsum.photos/seed/charlie/100', phone: '789' },
    lastMessage: 'LOL that was funny!',
    lastTimestamp: 'Wednesday',
    unread: false
  }
];

const ChatList: React.FC<ChatListProps> = ({ onSelect }) => {
  return (
    <div className="pt-16 min-h-screen animate-fadeIn">
      <div className="px-4 py-2 border-b border-app-border flex items-center justify-between bg-app-surface sticky top-14 z-10">
        <h1 className="text-2xl font-bold text-app-main">Mensagens</h1>
        <button className="bg-app-bg p-2 rounded-full text-app-main">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
        </button>
      </div>

      {/* Active People Row */}
      <div className="flex overflow-x-auto p-4 space-x-4 no-scrollbar bg-app-surface mb-2">
        {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center space-y-1">
                <div className="relative">
                    <img src={`https://picsum.photos/seed/online${i}/100`} className="w-14 h-14 rounded-full border-2 border-app-border" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-app-surface rounded-full"></div>
                </div>
                <span className="text-[10px] text-app-muted">User {i}</span>
            </div>
        ))}
      </div>

      <div className="divide-y divide-app-border bg-app-surface">
        {MOCK_CONVERSATIONS.map(conv => (
          <div 
            key={conv.id} 
            onClick={() => onSelect(conv.id)}
            className="flex items-center p-4 hover:bg-app-bg transition-colors cursor-pointer"
          >
            <div className="relative flex-shrink-0">
              <img src={conv.participant.avatar} className="w-14 h-14 rounded-full" alt={conv.participant.name} />
              {conv.unread && <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-app-primary rounded-full border-2 border-app-surface"></div>}
            </div>
            <div className="ml-4 flex-1 overflow-hidden">
              <div className="flex justify-between items-baseline">
                <h3 className={`font-semibold text-app-main ${conv.unread ? 'font-bold' : ''}`}>{conv.participant.name}</h3>
                <span className="text-xs text-app-muted">{conv.lastTimestamp}</span>
              </div>
              <p className={`text-sm truncate ${conv.unread ? 'text-app-main font-medium' : 'text-app-muted'}`}>
                {conv.lastMessage}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
