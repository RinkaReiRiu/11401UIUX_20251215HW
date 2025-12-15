export enum Difficulty {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

export enum ResourceType {
  Preset = 'Preset',
  StockFootage = 'Stock Footage',
  ProjectFile = 'Project File',
  Texture = 'Texture'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  history: string[]; // Tutorial IDs
  likedPosts: string[]; // Post IDs
  bookmarks: string[]; // Tutorial IDs
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string; // Using placeholders
  author: string;
  difficulty: Difficulty;
  duration: string;
  software: string[];
  views: number;
  date: string;
  chapters: { title: string; timestamp: string }[];
  content: string; // Markdown-like content
}

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  fileSize: string;
  downloads: number;
  thumbnail: string;
  author: string;
  price: number | 'Free';
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  image: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  tags: string[];
  date: string;
}

export interface FilterState {
  keyword: string;
  difficulty?: Difficulty | 'All';
  software?: string | 'All';
  sortBy: 'latest' | 'popular' | 'relevance';
}