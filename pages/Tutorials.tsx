import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import TutorialCard from '../components/TutorialCard';
import { MOCK_TUTORIALS, SOFTWARE_TOOLS } from '../constants';
import { Difficulty, Tutorial } from '../types';

const Tutorials: React.FC = () => {
  const [selectedSoftware, setSelectedSoftware] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');

  const filteredTutorials = MOCK_TUTORIALS.filter(t => {
    const matchSoftware = selectedSoftware === 'All' || t.software.includes(selectedSoftware);
    const matchDifficulty = selectedDifficulty === 'All' || t.difficulty === selectedDifficulty;
    return matchSoftware && matchDifficulty;
  });

  return (
    <div className="pt-24 pb-20 min-h-screen px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Tutorial Library</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">Step-by-step guides to help you achieve the impossible. From basic keyframing to complex node-based compositing.</p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 bg-nexus-card p-4 rounded-xl border border-gray-700 items-center justify-between">
        <div className="flex items-center gap-2 text-white font-medium">
          <Filter className="w-5 h-5 text-nexus-primary" />
          <span>Filters:</span>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select 
            className="bg-nexus-dark border border-gray-600 text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-nexus-primary"
            value={selectedSoftware}
            onChange={(e) => setSelectedSoftware(e.target.value)}
          >
            <option value="All">All Software</option>
            {SOFTWARE_TOOLS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select 
            className="bg-nexus-dark border border-gray-600 text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-nexus-primary"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="All">All Levels</option>
            {Object.values(Difficulty).map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      {filteredTutorials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.map(tut => (
            <TutorialCard key={tut.id} tutorial={tut} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No tutorials found matching your filters.</p>
          <button 
            onClick={() => { setSelectedSoftware('All'); setSelectedDifficulty('All'); }}
            className="mt-4 text-nexus-primary hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Tutorials;