import React from 'react';
import { Download, HardDrive } from 'lucide-react';
import { Resource } from '../types';

interface Props {
  resource: Resource;
}

const ResourceCard: React.FC<Props> = ({ resource }) => {
  return (
    <div className="bg-nexus-card rounded-xl overflow-hidden border border-gray-700 hover:border-nexus-secondary/50 transition-all hover:shadow-lg hover:shadow-nexus-secondary/10 flex flex-col">
      <div className="h-32 bg-gray-800 relative overflow-hidden group">
        <img 
          src={resource.thumbnail} 
          alt={resource.title} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
           <button className="bg-nexus-secondary hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
             <Download className="w-4 h-4 mr-2" /> Download
           </button>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs text-nexus-secondary uppercase tracking-wider font-bold">
            {resource.type}
          </span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${resource.price === 'Free' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
            {typeof resource.price === 'number' ? `$${resource.price}` : 'FREE'}
          </span>
        </div>
        
        <h4 className="text-white font-semibold text-sm mb-1 line-clamp-1">{resource.title}</h4>
        <p className="text-gray-500 text-xs mb-3">by {resource.author}</p>
        
        <div className="mt-auto flex items-center justify-between text-gray-500 text-xs pt-3 border-t border-gray-700">
           <div className="flex items-center">
             <HardDrive className="w-3 h-3 mr-1" />
             {resource.fileSize}
           </div>
           <div>
             {resource.downloads.toLocaleString()} dls
           </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;