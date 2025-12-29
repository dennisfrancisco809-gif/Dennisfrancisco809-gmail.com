
import React, { useState, useEffect } from 'react';
import { AppTab, User, ThemeType, ThemeOption } from './types';
import Registration from './components/Registration';
import Feed from './components/Feed';
import VideoFeed from './components/VideoFeed';
import ChatList from './components/ChatList';
import ChatRoom from './components/ChatRoom';

const THEMES: ThemeOption[] = [
    { id: 'light', name: 'Messenger', colors: ['#0084FF', '#f0f2f5'] },
    { id: 'dark', name: 'Midnight', colors: ['#2d8cf0', '#18191a'] },
    { id: 'sunset', name: 'Sunset', colors: ['#ff7e5f', '#2b1055'] },
    { id: 'forest', name: 'Forest', colors: ['#2ecc71', '#0d1b1e'] },
    { id: 'ocean', name: 'Ocean', colors: ['#00d2ff', '#000c18'] },
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.FEED);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('light');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-sunset', 'theme-forest', 'theme-ocean');
    if (currentTheme !== 'light') {
        root.classList.add(`theme-${currentTheme}`);
    }
  }, [currentTheme]);

  if (!currentUser) {
    return <Registration onComplete={(user) => setCurrentUser(user)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.FEED: return <Feed />;
      case AppTab.VIDEOS: return <VideoFeed />;
      case AppTab.CHATS: return <ChatList onSelect={setActiveChatId} />;
      case AppTab.PROFILE: 
        return (
          <div className="pt-24 px-6 flex flex-col items-center animate-fadeIn">
            <div className="relative">
                <img src={currentUser.avatar} className="w-24 h-24 rounded-full border-4 border-app-surface shadow-lg mb-4" />
                <div className="absolute bottom-4 right-0 w-6 h-6 bg-green-500 border-4 border-app-surface rounded-full"></div>
            </div>
            <h2 className="text-2xl font-bold text-app-main">{currentUser.name}</h2>
            <p className="text-app-muted mb-8">{currentUser.phone}</p>
            
            <div className="w-full max-w-sm">
                <h3 className="text-sm font-bold text-app-muted uppercase tracking-wider mb-4">Ambiente</h3>
                <div className="grid grid-cols-1 gap-3">
                    {THEMES.map((theme) => (
                        <button
                            key={theme.id}
                            onClick={() => setCurrentTheme(theme.id)}
                            className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                                currentTheme === theme.id 
                                ? 'border-app-primary bg-app-primary/10' 
                                : 'border-app-border bg-app-surface'
                            }`}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="flex space-x-1">
                                    {theme.colors.map((c, i) => (
                                        <div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: c }}></div>
                                    ))}
                                </div>
                                <span className={`font-semibold ${currentTheme === theme.id ? 'text-app-primary' : 'text-app-main'}`}>
                                    {theme.name}
                                </span>
                            </div>
                            {currentTheme === theme.id && (
                                <svg className="w-5 h-5 text-app-primary" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <button className="mt-12 w-full max-w-sm bg-red-500/10 text-red-500 py-3 rounded-2xl font-bold hover:bg-red-500/20 transition-colors" onClick={() => setCurrentUser(null)}>
              Sair da conta
            </button>
          </div>
        );
      default: return <Feed />;
    }
  };

  return (
    <div className="relative min-h-screen bg-app-bg text-app-main max-w-lg mx-auto shadow-2xl overflow-hidden border-x border-app-border transition-colors duration-300">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 max-w-lg mx-auto bg-app-surface/80 backdrop-blur-md border-b border-app-border z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-app-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-xs">CO</span>
            </div>
            <span className="font-bold text-lg text-app-primary tracking-tight">Chat On</span>
        </div>
        <div className="flex items-center space-x-4">
            <button className="text-app-main opacity-70 hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </button>
            <button className="text-app-main opacity-70 hover:opacity-100 transition-opacity">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/></svg>
            </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen pb-24">
        {renderContent()}
      </main>

      {/* Chat Room Overlay */}
      {activeChatId && (
          <ChatRoom 
            participant={{
                id: 'other', 
                name: 'Alice Cooper', 
                avatar: 'https://picsum.photos/seed/alice/100', 
                phone: '555-0199'
            }} 
            onBack={() => setActiveChatId(null)} 
          />
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-app-surface border-t border-app-border px-6 py-3 flex items-center justify-between z-40">
        <button 
            onClick={() => setActiveTab(AppTab.FEED)}
            className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === AppTab.FEED ? 'text-app-primary' : 'text-app-muted'}`}
        >
            <svg className="w-6 h-6" fill={activeTab === AppTab.FEED ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            <span className="text-[10px] font-medium">Home</span>
        </button>
        <button 
            onClick={() => setActiveTab(AppTab.VIDEOS)}
            className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === AppTab.VIDEOS ? 'text-app-primary' : 'text-app-muted'}`}
        >
            <svg className="w-6 h-6" fill={activeTab === AppTab.VIDEOS ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            <span className="text-[10px] font-medium">Videos</span>
        </button>
        <button 
            onClick={() => setActiveTab(AppTab.CHATS)}
            className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === AppTab.CHATS ? 'text-app-primary' : 'text-app-muted'}`}
        >
            <div className="relative">
                <svg className="w-6 h-6" fill={activeTab === AppTab.CHATS ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-app-surface"></div>
            </div>
            <span className="text-[10px] font-medium">Chats</span>
        </button>
        <button 
            onClick={() => setActiveTab(AppTab.PROFILE)}
            className={`flex flex-col items-center space-y-1 transition-colors ${activeTab === AppTab.PROFILE ? 'text-app-primary' : 'text-app-muted'}`}
        >
            <div className={`w-6 h-6 rounded-full border-2 ${activeTab === AppTab.PROFILE ? 'border-app-primary' : 'border-app-border'} overflow-hidden transition-all`}>
                <img src={currentUser.avatar} alt="profile" />
            </div>
            <span className="text-[10px] font-medium">Me</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
