
import React from 'react';
import { Post } from '../types';

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: 'u1',
    userName: 'John Doe',
    userAvatar: 'https://picsum.photos/seed/john/100',
    content: 'Just launched my new social app! What do you guys think? 🚀 #ChatOn',
    image: 'https://picsum.photos/seed/tech/800/600',
    likes: 124,
    comments: 12,
    timestamp: '2h ago'
  },
  {
    id: '2',
    userId: 'u2',
    userName: 'Sarah Smith',
    userAvatar: 'https://picsum.photos/seed/sarah/100',
    content: 'The sunset today was absolutely breathtaking. Nature is amazing.',
    image: 'https://picsum.photos/seed/sunset/800/600',
    likes: 342,
    comments: 45,
    timestamp: '4h ago'
  }
];

const Feed: React.FC = () => {
  return (
    <div className="pb-2 pt-16 min-h-screen">
      <div className="max-w-xl mx-auto space-y-4 px-2 sm:px-0">
        {/* Create Post Bar */}
        <div className="bg-app-surface p-4 rounded-xl shadow-sm border border-app-border flex items-center space-x-3">
          <img src="https://picsum.photos/seed/me/100" className="w-10 h-10 rounded-full" alt="me" />
          <button className="flex-1 bg-app-bg text-left px-4 py-2.5 rounded-full text-app-muted text-sm hover:opacity-80 transition-all">
            What's on your mind?
          </button>
        </div>

        {/* Stories Placeholder */}
        <div className="flex overflow-x-auto py-2 space-x-3 no-scrollbar">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-shrink-0 w-24 h-40 bg-app-surface rounded-xl relative overflow-hidden shadow-sm border border-app-border">
                <img src={`https://picsum.photos/seed/story${i}/200/400`} className="w-full h-full object-cover opacity-80" />
                <div className="absolute top-2 left-2 ring-2 ring-app-primary rounded-full overflow-hidden w-8 h-8">
                    <img src={`https://picsum.photos/seed/u${i}/50`} className="w-full h-full object-cover" />
                </div>
            </div>
          ))}
        </div>

        {/* Posts List */}
        {MOCK_POSTS.map(post => (
          <div key={post.id} className="bg-app-surface rounded-xl shadow-sm border border-app-border overflow-hidden animate-fadeIn">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={post.userAvatar} className="w-10 h-10 rounded-full border border-app-border" alt={post.userName} />
                <div>
                  <h3 className="font-semibold text-app-main leading-tight">{post.userName}</h3>
                  <p className="text-xs text-app-muted">{post.timestamp}</p>
                </div>
              </div>
              <button className="text-app-muted hover:text-app-main">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
              </button>
            </div>
            <div className="px-4 pb-3">
              <p className="text-app-main text-sm whitespace-pre-wrap">{post.content}</p>
            </div>
            {post.image && (
              <img src={post.image} className="w-full aspect-video object-cover" alt="post content" />
            )}
            <div className="p-3 border-t border-app-border flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-1 text-app-muted hover:text-app-primary transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                  <span className="text-xs font-medium">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-app-muted hover:text-app-primary transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                  <span className="text-xs font-medium">{post.comments}</span>
                </button>
              </div>
              <button className="text-app-muted hover:text-app-primary transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
