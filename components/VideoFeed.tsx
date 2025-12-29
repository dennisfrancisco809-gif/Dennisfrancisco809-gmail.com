
import React from 'react';
import { Video } from '../types';

const MOCK_VIDEOS: Video[] = [
  {
    id: 'v1',
    userId: 'u1',
    userName: 'Chef Gordon',
    userAvatar: 'https://picsum.photos/seed/chef/100',
    title: 'How to make the perfect pasta 🍝',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    likes: 1200,
    shares: 450
  },
  {
    id: 'v2',
    userId: 'u2',
    userName: 'Traveler Jane',
    userAvatar: 'https://picsum.photos/seed/travel/100',
    title: 'Hidden gems in Portugal 🇵🇹',
    videoUrl: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    likes: 3400,
    shares: 890
  }
];

const VideoFeed: React.FC = () => {
  return (
    <div className="h-screen bg-black overflow-y-scroll snap-y snap-mandatory pt-14 pb-16">
      {MOCK_VIDEOS.map(video => (
        <div key={video.id} className="h-full w-full relative snap-start flex flex-col justify-center bg-zinc-900">
          {/* Mock Video Placeholder using colored boxes with title for now since real videos can be heavy */}
          <div className="w-full aspect-[9/16] bg-zinc-800 flex items-center justify-center relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
             <video 
                src={video.videoUrl} 
                className="w-full h-full object-cover"
                autoPlay 
                muted 
                loop 
                playsInline
             />
          </div>

          {/* Video Info Overlay */}
          <div className="absolute bottom-20 left-4 right-16 text-white pointer-events-none">
            <div className="flex items-center space-x-2 mb-3 pointer-events-auto">
              <img src={video.userAvatar} className="w-10 h-10 rounded-full border-2 border-white" alt={video.userName} />
              <span className="font-bold">@{video.userName}</span>
              <button className="bg-[#0084FF] text-white px-3 py-1 rounded-full text-xs font-bold">Follow</button>
            </div>
            <p className="text-sm font-light drop-shadow-md">{video.title}</p>
          </div>

          {/* Sidebar Actions */}
          <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6 text-white">
            <div className="flex flex-col items-center">
                <button className="p-3 bg-zinc-800/50 rounded-full backdrop-blur-sm">
                    <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
                <span className="text-xs mt-1 font-bold">{video.likes}</span>
            </div>
            <div className="flex flex-col items-center">
                <button className="p-3 bg-zinc-800/50 rounded-full backdrop-blur-sm">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </button>
                <span className="text-xs mt-1 font-bold">89</span>
            </div>
            <div className="flex flex-col items-center">
                <button className="p-3 bg-zinc-800/50 rounded-full backdrop-blur-sm">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
                </button>
                <span className="text-xs mt-1 font-bold">{video.shares}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;
