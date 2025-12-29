
export interface User {
  id: string;
  name: string;
  avatar: string;
  phone: string;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
}

export interface Video {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  title: string;
  videoUrl: string;
  likes: number;
  shares: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: string;
  lastTimestamp: string;
  unread: boolean;
}

export enum AppTab {
  FEED = 'FEED',
  VIDEOS = 'VIDEOS',
  CHATS = 'CHATS',
  PROFILE = 'PROFILE'
}

export enum AuthStep {
  PHONE = 'PHONE',
  OTP = 'OTP',
  PROFILE = 'PROFILE',
  COMPLETED = 'COMPLETED'
}

export type ThemeType = 'light' | 'dark' | 'sunset' | 'forest' | 'ocean';

export interface ThemeOption {
    id: ThemeType;
    name: string;
    colors: string[];
}
