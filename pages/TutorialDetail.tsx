import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, CheckCircle, Bookmark } from 'lucide-react';
import { MOCK_TUTORIALS } from '../constants';
import { useAuth } from '../context/AuthContext';

const TutorialDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const tutorial = MOCK_TUTORIALS.find(t => t.id === id);
  const { user, addToHistory, toggleBookmark, openLoginModal } = useAuth();

  useEffect(() => {
    if (user && id && tutorial) {
      addToHistory(id);
    }
  }, [id, user, tutorial]);

  const isBookmarked = user?.bookmarks?.includes(id || '');

  const handleBookmark = () => {
    if (!user) {
      openLoginModal();
      return;
    }
    if (id) {
      toggleBookmark(id);
    }
  };

  if (!tutorial) {
    return (
      <div className="pt-32 text-center">
        <h2 className="text-2xl text-white">Tutorial not found</h2>
        <Link to="/tutorials" className="text-nexus-primary mt-4 inline-block">Back to Tutorials</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/tutorials" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Library
        </Link>
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
           <div>
             <div className="flex gap-2 mb-4">
              {tutorial.software.map(sw => (
                <span key={sw} className="text-sm font-medium text-nexus-accent bg-nexus-accent/10 px-3 py-1 rounded-full">
                  {sw}
                </span>
              ))}
             </div>
             <h1 className="text-4xl font-bold text-white mb-4">{tutorial.title}</h1>
             <div className="flex items-center gap-6 text-gray-400 text-sm">
                <span className="flex items-center"><Clock className="w-4 h-4 mr-1"/> {tutorial.duration}</span>
                <span className="flex items-center"><Calendar className="w-4 h-4 mr-1"/> {tutorial.date}</span>
                <span>By <span className="text-white font-medium">{tutorial.author}</span></span>
             </div>
           </div>
           
           <button 
             onClick={handleBookmark}
             className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${isBookmarked ? 'bg-nexus-primary text-white shadow-lg shadow-nexus-primary/25' : 'bg-white/10 text-gray-300 hover:bg-white/20'}`}
           >
             <Bookmark className={`w-5 h-5 mr-2 ${isBookmarked ? 'fill-current' : ''}`} />
             {isBookmarked ? 'Saved' : 'Bookmark'}
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player Placeholder */}
            <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800 relative group">
              {tutorial.videoUrl ? (
                <iframe 
                  src={tutorial.videoUrl} 
                  title={tutorial.title}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-gray-500">
                  <div className="w-16 h-16 border-4 border-gray-600 rounded-full flex items-center justify-center mb-4">
                    <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[20px] border-l-gray-400 border-b-[10px] border-b-transparent ml-1"></div>
                  </div>
                  <p>Video Placeholder</p>
                </div>
              )}
            </div>

            {/* Description/Content */}
            <div className="bg-nexus-card/30 p-8 rounded-xl border border-white/5">
              <h3 className="text-2xl font-bold text-white mb-4">About this Tutorial</h3>
              <div className="prose prose-invert prose-p:text-gray-300 prose-headings:text-white max-w-none">
                 <p className="whitespace-pre-wrap">{tutorial.content}</p>
              </div>
            </div>
          </div>

          {/* Sidebar / Chapters */}
          <div className="lg:col-span-1">
            <div className="bg-nexus-card border border-gray-700 rounded-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4">Chapters</h3>
              <div className="space-y-4">
                {tutorial.chapters && tutorial.chapters.length > 0 ? (
                  tutorial.chapters.map((chapter, idx) => (
                    <div key={idx} className="flex items-start group cursor-pointer">
                       <div className="mr-3 mt-1 text-gray-600 group-hover:text-nexus-primary">
                         <CheckCircle className="w-5 h-5" />
                       </div>
                       <div>
                         <span className="text-nexus-primary text-xs font-mono block mb-1">{chapter.timestamp}</span>
                         <span className="text-gray-300 text-sm group-hover:text-white transition-colors">{chapter.title}</span>
                       </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No chapters available for this video.</p>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-gray-700">
                <h4 className="text-white font-bold mb-2">Resources</h4>
                <p className="text-sm text-gray-400 mb-4">Project files included with this tutorial.</p>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm font-medium transition-colors">
                  Download Project Files
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialDetail;