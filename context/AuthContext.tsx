import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
  toggleLike: (postId: string) => void;
  toggleBookmark: (tutorialId: string) => void;
  addToHistory: (tutorialId: string) => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Load user from local storage on mount (simple persistence)
  useEffect(() => {
    const storedUser = localStorage.getItem('nexus_user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Ensure bookmarks array exists for backward compatibility
      if (!parsedUser.bookmarks) {
        parsedUser.bookmarks = [];
      }
      setUser(parsedUser);
    }
  }, []);

  // Save user to local storage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('nexus_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('nexus_user');
    }
  }, [user]);

  const login = (name: string) => {
    // Mock login
    const newUser: User = {
      id: 'u_' + Date.now(),
      name: name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      history: [],
      likedPosts: [],
      bookmarks: []
    };
    setUser(newUser);
    setIsLoginModalOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const toggleLike = (postId: string) => {
    if (!user) return;
    const isLiked = user.likedPosts.includes(postId);
    const newLikedPosts = isLiked
      ? user.likedPosts.filter(id => id !== postId)
      : [...user.likedPosts, postId];
    
    setUser({ ...user, likedPosts: newLikedPosts });
  };

  const toggleBookmark = (tutorialId: string) => {
    if (!user) return;
    const isBookmarked = user.bookmarks.includes(tutorialId);
    const newBookmarks = isBookmarked
      ? user.bookmarks.filter(id => id !== tutorialId)
      : [...user.bookmarks, tutorialId];
    
    setUser({ ...user, bookmarks: newBookmarks });
  };

  const addToHistory = (tutorialId: string) => {
    if (!user) return;
    // Remove if exists then add to front
    const newHistory = [tutorialId, ...user.history.filter(id => id !== tutorialId)].slice(0, 20);
    setUser({ ...user, history: newHistory });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      toggleLike,
      toggleBookmark, 
      addToHistory, 
      isLoginModalOpen, 
      openLoginModal: () => setIsLoginModalOpen(true), 
      closeLoginModal: () => setIsLoginModalOpen(false) 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};