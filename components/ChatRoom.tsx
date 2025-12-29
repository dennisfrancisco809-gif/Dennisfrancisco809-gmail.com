
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage, User } from '../types';
import { getSmartReply } from '../services/geminiService';

interface ChatRoomProps {
  participant: User;
  onBack: () => void;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ participant, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', senderId: 'other', text: 'Hey there!', timestamp: '10:00 AM' },
    { id: '2', senderId: 'me', text: 'Hello! Chat On is great.', timestamp: '10:01 AM' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (messages[messages.length - 1]?.senderId === 'other') {
        const fetchSuggestion = async () => {
            const reply = await getSmartReply(messages.slice(-3).map(m => m.text));
            setSuggestion(reply);
        };
        fetchSuggestion();
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setSuggestion(null);

    // Simulate reply
    setIsTyping(true);
    setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            senderId: 'other',
            text: "That's awesome! Love using Chat On.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-app-bg z-50 flex flex-col h-full animate-fadeIn max-w-lg mx-auto border-x border-app-border shadow-2xl">
      {/* Chat Header */}
      <div className="p-3 border-b border-app-border flex items-center bg-app-surface/90 backdrop-blur-md sticky top-0 z-10">
        <button onClick={onBack} className="p-2 mr-2 text-app-primary">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div className="flex items-center space-x-3 flex-1">
          <img src={participant.avatar} className="w-10 h-10 rounded-full border border-app-border" alt={participant.name} />
          <div>
            <h3 className="font-semibold text-sm leading-tight text-app-main">{participant.name}</h3>
            <p className="text-[10px] text-green-500 font-medium">Online agora</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-app-primary">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm shadow-sm transition-all duration-300 ${
              msg.senderId === 'me' 
              ? 'bg-app-primary text-white rounded-tr-none' 
              : 'bg-app-surface text-app-main border border-app-border rounded-tl-none'
            }`}>
              {msg.text}
              <div className={`text-[9px] mt-1 opacity-70 ${msg.senderId === 'me' ? 'text-white' : 'text-app-muted'}`}>
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
            <div className="flex justify-start">
                <div className="bg-app-surface px-4 py-2 rounded-2xl rounded-tl-none flex space-x-1 border border-app-border">
                    <div className="w-1.5 h-1.5 bg-app-muted rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-app-muted rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-app-muted rounded-full animate-bounce delay-200"></div>
                </div>
            </div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* AI Suggestions */}
      {suggestion && !input && (
          <div className="px-4 py-2 bg-app-surface flex space-x-2 border-t border-app-border overflow-x-auto no-scrollbar">
              <button 
                onClick={() => setInput(suggestion)}
                className="whitespace-nowrap bg-app-primary/10 text-app-primary px-3 py-1.5 rounded-full text-xs border border-app-primary/20 font-medium hover:bg-app-primary/20 transition-all"
              >
                ✨ {suggestion}
              </button>
          </div>
      )}

      {/* Input Bar */}
      <div className="p-3 border-t border-app-border bg-app-surface pb-6">
        <div className="flex items-center space-x-2">
          <button className="text-app-primary p-1 hover:opacity-80 transition-all">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
          </button>
          <input
            type="text"
            placeholder="Escreva uma mensagem..."
            className="flex-1 bg-app-bg rounded-full px-4 py-2 text-sm text-app-main outline-none focus:ring-1 focus:ring-app-primary transition-all border border-app-border"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          {input.trim() ? (
            <button onClick={handleSend} className="text-app-primary p-1">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
            </button>
          ) : (
            <button className="text-app-primary p-1">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/><path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
