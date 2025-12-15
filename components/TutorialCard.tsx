import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Eye, Monitor, Bookmark } from 'lucide-react';
import { Tutorial, Difficulty } from '../types';
import { useAuth } from '../context/AuthContext';

interface Props {
  tutorial: Tutorial;
}

const TutorialCard: React.FC<Props> = ({ tutorial }) => {
  const { user, toggleBookmark, openLoginModal } = useAuth();
  
  const difficultyColor = {
    [Difficulty.Beginner]: 'text-green-400 border-green-400/30 bg-green-400/10',
    [Difficulty.Intermediate]: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
    [Difficulty.Advanced]: 'text-red-400 border-red-400/30 bg-red-400/10',
  };

  const isBookmarked = user?.bookmarks?.includes(tutorial.id);

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    if (!user) {
      openLoginModal();
      return;
    }
    toggleBookmark(tutorial.id);
  };

  return (
    <Link to={`/tutorial/${tutorial.id}`} className="group relative block h-full">
      <div className="h-full bg-nexus-card rounded-xl overflow-hidden border border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-nexus-primary/20 hover:border-nexus-primary/50 flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={tutorial.thumbnail} 
            alt={tutorial.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          
          <div className="absolute top-3 right-3 flex gap-2">
             <button 
              onClick={handleBookmark}
              className={`p-1.5 rounded-full transition-all ${isBookmarked ? 'bg-nexus-primary text-white' : 'bg-black/50 text-gray-300 hover:bg-nexus-primary hover:text-white'}`}
              title="Bookmark"
             >
               <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
             </button>
            <span className={`px-2 py-1 rounded text-xs font-semibold border ${difficultyColor[tutorial.difficulty]} backdrop-blur-sm`}>
              {tutorial.difficulty}
            </span>
          </div>
          
          <div className="absolute bottom-3 right-3 bg-black/70 px-2 py-1 rounded text-xs text-white flex items-center">
            <Clock className="w-3 h-3 mr-1" /> {tutorial.duration}
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex gap-2 mb-2 flex-wrap">
            {tutorial.software.map(sw => (
              <span key={sw} className="text-xs text-nexus-accent bg-nexus-accent/10 px-2 py-0.5 rounded-full">
                {sw}
              </span>
            ))}
          </div>
          
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-nexus-primary transition-colors">
            {tutorial.title}
          </h3>
          
          <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
            {tutorial.description}
          </p>
          
          <div className="flex items-center justify-between text-gray-500 text-xs mt-auto">
            <span>By {tutorial.author}</span>
            <div className="flex items-center">
              <Eye className="w-3 h-3 mr-1" />
              {tutorial.views.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TutorialCard;