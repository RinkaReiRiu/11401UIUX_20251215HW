import React, { useState } from 'react';
import { MessageSquare, Heart, Share2, Sparkles, Upload } from 'lucide-react';
import { MOCK_POSTS } from '../constants';
import { getCreativeFeedback } from '../services/geminiService';
import { useAuth } from '../context/AuthContext';

const Community: React.FC = () => {
  const { user, toggleLike, openLoginModal } = useAuth();
  const [feedbackLoading, setFeedbackLoading] = useState<string | null>(null);
  const [aiFeedbacks, setAiFeedbacks] = useState<Record<string, string>>({});

  const handleGetAiFeedback = async (postId: string, description: string) => {
    setFeedbackLoading(postId);
    const feedback = await getCreativeFeedback(description);
    setAiFeedbacks(prev => ({ ...prev, [postId]: feedback }));
    setFeedbackLoading(null);
  };

  const handleLike = (postId: string) => {
    if (!user) {
      openLoginModal();
      return;
    }
    toggleLike(postId);
  };

  const isLiked = (postId: string) => user?.likedPosts.includes(postId);

  return (
    <div className="pt-24 pb-20 min-h-screen max-w-5xl mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 text-center md:text-left">
        <div className="mb-6 md:mb-0">
          <h1 className="text-4xl font-bold text-white mb-2">Community Showcase</h1>
          <p className="text-gray-400">Share your work in progress and get feedback.</p>
        </div>
        {!user && (
          <div className="bg-nexus-card/50 border border-nexus-primary/30 p-4 rounded-xl flex items-center gap-4 animate-pulse-slow">
            <div className="p-2 bg-nexus-primary/20 rounded-full text-nexus-primary">
              <Upload className="w-6 h-6" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-sm">Want to share your art?</p>
              <button onClick={openLoginModal} className="text-nexus-primary text-xs hover:underline">Log in to upload</button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {MOCK_POSTS.map(post => {
          const liked = isLiked(post.id);
          // Calculate display likes: base mock count + 1 if user liked (just for visual feedback)
          // In a real app, this would be handled by the backend
          const displayLikes = post.likes + (liked ? 1 : 0); 

          return (
            <div key={post.id} className="bg-nexus-card rounded-2xl border border-gray-700 overflow-hidden">
              {/* Post Header */}
              <div className="p-4 flex items-center">
                <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full mr-3 border border-gray-600" />
                <div>
                  <h3 className="text-white font-semibold text-sm">{post.author}</h3>
                  <p className="text-gray-500 text-xs">{post.date}</p>
                </div>
              </div>

              {/* Post Image */}
              <div className="w-full bg-black aspect-video relative group">
                 <img src={post.image} alt={post.title} className="w-full h-full object-contain" />
              </div>

              {/* Post Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-2">{post.title}</h2>
                <p className="text-gray-300 text-sm mb-4">{post.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs text-nexus-secondary bg-nexus-secondary/10 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                  <div className="flex items-center space-x-6">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center transition-colors ${liked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                    >
                      <Heart className={`w-5 h-5 mr-1 ${liked ? 'fill-current' : ''}`} /> {displayLikes}
                    </button>
                    <button className="flex items-center text-gray-400 hover:text-white transition-colors">
                      <MessageSquare className="w-5 h-5 mr-1" /> {post.comments}
                    </button>
                    <button className="flex items-center text-gray-400 hover:text-white transition-colors">
                      <Share2 className="w-5 h-5 mr-1" /> Share
                    </button>
                  </div>

                  <button 
                    onClick={() => handleGetAiFeedback(post.id, post.description)}
                    disabled={!!feedbackLoading || !!aiFeedbacks[post.id]}
                    className="flex items-center text-sm font-medium text-nexus-accent hover:text-white disabled:opacity-50 transition-colors"
                  >
                    <Sparkles className={`w-4 h-4 mr-2 ${feedbackLoading === post.id ? 'animate-spin' : ''}`} />
                    {aiFeedbacks[post.id] ? 'AI Feedback Received' : 'Ask AI for Tips'}
                  </button>
                </div>

                {/* AI Feedback Section */}
                {aiFeedbacks[post.id] && (
                  <div className="mt-4 bg-nexus-dark/50 p-4 rounded-lg border border-nexus-accent/30 animate-pulse-slow">
                     <div className="flex items-center gap-2 mb-2 text-nexus-accent text-sm font-bold">
                       <Sparkles className="w-4 h-4" /> AI Critique
                     </div>
                     <p className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">
                       {aiFeedbacks[post.id]}
                     </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Community;