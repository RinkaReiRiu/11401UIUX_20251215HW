import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, SlidersHorizontal, Sparkles } from 'lucide-react';
import TutorialCard from '../components/TutorialCard';
import ResourceCard from '../components/ResourceCard';
import { MOCK_TUTORIALS, MOCK_RESOURCES } from '../constants';
import { getSearchInsights } from '../services/geminiService';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [activeTab, setActiveTab] = useState<'all' | 'tutorials' | 'resources'>('all');
  const [aiSummary, setAiSummary] = useState<string>('');
  const [loadingAi, setLoadingAi] = useState(false);

  // Filter Data
  const filteredTutorials = MOCK_TUTORIALS.filter(t => 
    t.title.toLowerCase().includes(query.toLowerCase()) || 
    t.description.toLowerCase().includes(query.toLowerCase())
  );
  
  const filteredResources = MOCK_RESOURCES.filter(r => 
    r.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const fetchAi = async () => {
      if (query.length > 2) {
        setLoadingAi(true);
        const summary = await getSearchInsights(query);
        setAiSummary(summary);
        setLoadingAi(false);
      } else {
        setAiSummary('');
      }
    };
    fetchAi();
  }, [query]);

  const hasResults = filteredTutorials.length > 0 || filteredResources.length > 0;

  return (
    <div className="pt-24 pb-20 min-h-screen px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-gray-700 pb-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Results for <span className="text-nexus-primary">"{query}"</span>
          </h1>
          <p className="text-gray-400 text-sm">Found {filteredTutorials.length} tutorials and {filteredResources.length} resources.</p>
        </div>
        
        <div className="flex gap-2 mt-4 md:mt-0">
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === 'all' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            All
          </button>
          <button 
             onClick={() => setActiveTab('tutorials')}
             className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === 'tutorials' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Tutorials
          </button>
          <button 
             onClick={() => setActiveTab('resources')}
             className={`px-4 py-2 rounded-lg text-sm transition-colors ${activeTab === 'resources' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            Resources
          </button>
        </div>
      </div>

      {/* AI Insight Box */}
      {query && (
        <div className="mb-10 bg-gradient-to-r from-nexus-primary/20 to-nexus-secondary/20 border border-white/10 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nexus-primary to-nexus-secondary" />
          <div className="flex items-start gap-4">
             <div className="bg-white/10 p-2 rounded-lg">
               <Sparkles className="w-6 h-6 text-yellow-300" />
             </div>
             <div>
               <h3 className="text-lg font-bold text-white mb-1">AI Quick Insight</h3>
               {loadingAi ? (
                 <div className="h-4 w-64 bg-white/10 rounded animate-pulse mt-2"></div>
               ) : (
                 <p className="text-gray-200 text-sm leading-relaxed max-w-3xl">
                   {aiSummary}
                 </p>
               )}
             </div>
          </div>
        </div>
      )}

      {/* Content Grid */}
      <div className="space-y-12">
        {!hasResults && !loadingAi && (
          <div className="text-center py-20 bg-nexus-card/30 rounded-xl border border-dashed border-gray-700">
             <SearchIcon className="w-12 h-12 text-gray-600 mx-auto mb-4" />
             <h3 className="text-xl text-white font-medium mb-2">No matches found</h3>
             <p className="text-gray-500">Try adjusting your keywords or browse our categories.</p>
          </div>
        )}

        {/* Tutorials Section */}
        {(activeTab === 'all' || activeTab === 'tutorials') && filteredTutorials.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              Tutorials <span className="ml-2 text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">{filteredTutorials.length}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTutorials.map(t => <TutorialCard key={t.id} tutorial={t} />)}
            </div>
          </div>
        )}

        {/* Resources Section */}
        {(activeTab === 'all' || activeTab === 'resources') && filteredResources.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              Resources <span className="ml-2 text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">{filteredResources.length}</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {filteredResources.map(r => <ResourceCard key={r.id} resource={r} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;