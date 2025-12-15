import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle, Users, Download } from 'lucide-react';
import TutorialCard from '../components/TutorialCard';
import { MOCK_TUTORIALS } from '../constants';

const Home: React.FC = () => {
  const featuredTutorials = MOCK_TUTORIALS.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-nexus-dark">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-nexus-dark via-nexus-dark/80 to-transparent"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nexus-primary/30 rounded-full blur-[100px] animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-nexus-secondary/30 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-nexus-accent text-sm font-medium mb-6 backdrop-blur-sm">
            🚀 The Future of VFX Learning
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
            Master the Art of <br />
            <span className="gradient-text">Visual Illusion</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            Join the fastest-growing community of VFX artists. Access high-quality tutorials, assets, and feedback to elevate your creations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tutorials" className="bg-nexus-primary hover:bg-violet-600 text-white px-8 py-3 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center shadow-lg shadow-nexus-primary/25">
              Start Learning <PlayCircle className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/community" className="bg-white/10 hover:bg-white/20 text-white border border-white/10 px-8 py-3 rounded-full font-bold text-lg transition-all backdrop-blur-md flex items-center justify-center">
              Join Community <Users className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stats/Features Banner */}
      <div className="border-y border-white/5 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="p-4">
              <h3 className="text-3xl font-bold text-white mb-1">500+</h3>
              <p className="text-gray-400 text-sm">Premium Tutorials</p>
            </div>
            <div className="p-4">
              <h3 className="text-3xl font-bold text-white mb-1">10k+</h3>
              <p className="text-gray-400 text-sm">Active Creators</p>
            </div>
            <div className="p-4">
              <h3 className="text-3xl font-bold text-white mb-1">Free</h3>
              <p className="text-gray-400 text-sm">Asset Downloads</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Tutorials */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Trending Effects</h2>
            <p className="text-gray-400">Learn what everyone is talking about this week.</p>
          </div>
          <Link to="/tutorials" className="hidden sm:flex items-center text-nexus-accent hover:text-white transition-colors">
            View All <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTutorials.map(tut => (
            <TutorialCard key={tut.id} tutorial={tut} />
          ))}
        </div>
      </div>

      {/* Categories / Tools */}
      <div className="bg-nexus-card/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-white mb-4">Master Your Tools</h2>
             <p className="text-gray-400 max-w-xl mx-auto">We cover the industry standard software used in Hollywood and top creative agencies.</p>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['After Effects', 'Blender', 'Premiere Pro', 'Unreal Engine'].map((tool, idx) => (
                <div key={idx} className="bg-nexus-dark border border-gray-700 p-6 rounded-xl flex items-center justify-center hover:border-nexus-primary transition-colors cursor-pointer group">
                  <span className="text-xl font-bold text-gray-300 group-hover:text-white">{tool}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;