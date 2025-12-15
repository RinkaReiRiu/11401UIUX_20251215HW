import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { History, Heart, User, Clock, MessageSquare, Bookmark } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { MOCK_TUTORIALS, MOCK_POSTS } from '../constants';
import TutorialCard from '../components/TutorialCard';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'history' | 'likes' | 'bookmarks'>('history');

  useEffect(() => {
    if (location.state && (location.state as any).tab) {
      setActiveTab((location.state as any).tab);
    }
  }, [location]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Filter data based on user history/likes/bookmarks
  const historyTutorials = MOCK_TUTORIALS.filter(t => user.history.includes(t.id));
  const likedPosts = MOCK_POSTS.filter(p => user.likedPosts.includes(p.id));
  const bookmarkedTutorials = MOCK_TUTORIALS.filter(t => user.bookmarks?.includes(t.id));

  return (
    <div className="pt-24 pb-20 min-h-screen px-4 max-w-7xl mx-auto">
      {/* Profile Header */}
      <div className="bg-nexus-card border border-gray-700 rounded-2xl p-8 mb-10 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="relative">
          <img 
            src={user.avatar} 
            alt={user.name} 
            className="w-32 h-32 rounded-full border-4 border-nexus-dark shadow-xl"
          />
          <div className="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-nexus-card"></div>
        </div>
        
        <div className="text-center md:text-left flex-grow">
          <h1 className="text-3xl font-bold text-white mb-2">{user.name}</h1>
          <p className="text-gray-400 mb-6 max-w-lg">
            Visual Effects Artist & Motion Designer. exploring the boundaries of digital art.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-6 text-sm text-gray-300">
             <div className="flex flex-col items-center md:items-start">
               <span className="font-bold text-xl text-white">{user.history.length}</span>
               <span className="text-xs uppercase tracking-wider text-gray-500">Watched</span>
             </div>
             <div className="flex flex-col items-center md:items-start">
               <span className="font-bold text-xl text-white">{user.bookmarks?.length || 0}</span>
               <span className="text-xs uppercase tracking-wider text-gray-500">Saved</span>
             </div>
             <div className="flex flex-col items-center md:items-start">
               <span className="font-bold text-xl text-white">{user.likedPosts.length}</span>
               <span className="text-xs uppercase tracking-wider text-gray-500">Liked</span>
             </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-8 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('history')}
          className={`px-6 py-4 flex items-center gap-2 font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'history' ? 'border-nexus-primary text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
        >
          <History className="w-5 h-5" /> Watch History
        </button>
        <button 
          onClick={() => setActiveTab('bookmarks')}
          className={`px-6 py-4 flex items-center gap-2 font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'bookmarks' ? 'border-nexus-accent text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
        >
          <Bookmark className="w-5 h-5" /> Bookmarks
        </button>
        <button 
          onClick={() => setActiveTab('likes')}
          className={`px-6 py-4 flex items-center gap-2 font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === 'likes' ? 'border-nexus-secondary text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
        >
          <Heart className="w-5 h-5" /> Liked Posts
        </button>
      </div>

      {/* Content */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'history' && (
          <>
            {historyTutorials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {historyTutorials.map(tut => (
                  <TutorialCard key={tut.id} tutorial={tut} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-nexus-card/30 rounded-xl border border-dashed border-gray-700">
                <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl text-white font-medium mb-2">No history yet</h3>
                <p className="text-gray-500">Start watching tutorials to build your history.</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'bookmarks' && (
          <>
            {bookmarkedTutorials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {bookmarkedTutorials.map(tut => (
                  <TutorialCard key={tut.id} tutorial={tut} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-nexus-card/30 rounded-xl border border-dashed border-gray-700">
                <Bookmark className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl text-white font-medium mb-2">No bookmarks</h3>
                <p className="text-gray-500">Save tutorials to watch them later.</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'likes' && (
          <>
            {likedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {likedPosts.map(post => (
                  <div key={post.id} className="bg-nexus-card rounded-xl border border-gray-700 overflow-hidden flex flex-col sm:flex-row">
                    <div className="w-full sm:w-1/3 aspect-video sm:aspect-auto bg-black relative">
                      <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-80" />
                    </div>
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <img src={post.avatar} className="w-6 h-6 rounded-full" />
                          <span className="text-xs text-gray-400">{post.author}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-2">{post.title}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2">{post.description}</p>
                      </div>
                      <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center text-nexus-secondary"><Heart className="w-3 h-3 mr-1 fill-current"/> Liked</span>
                        <span className="flex items-center"><MessageSquare className="w-3 h-3 mr-1"/> {post.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-nexus-card/30 rounded-xl border border-dashed border-gray-700">
                <Heart className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl text-white font-medium mb-2">No liked posts</h3>
                <p className="text-gray-500">Browse the community and like the posts that inspire you.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;