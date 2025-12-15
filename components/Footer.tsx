import React from 'react';
import { Zap, Github, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-nexus-dark border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-4">
              <Zap className="h-6 w-6 text-nexus-secondary" />
              <span className="font-display font-bold text-xl tracking-tighter text-white">
                VFX<span className="text-nexus-primary">NEXUS</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Empowering the next generation of visual storytellers with world-class tutorials and resources.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Learn</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-nexus-primary">Beginner Courses</a></li>
              <li><a href="#" className="hover:text-nexus-primary">Advanced Compositing</a></li>
              <li><a href="#" className="hover:text-nexus-primary">3D Modeling</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-nexus-primary">Showcase</a></li>
              <li><a href="#" className="hover:text-nexus-primary">Discord Server</a></li>
              <li><a href="#" className="hover:text-nexus-primary">Collaborations</a></li>
            </ul>
          </div>
          
          <div>
             <h3 className="text-white font-bold mb-4">Follow Us</h3>
             <div className="flex space-x-4">
               <a href="#" className="text-gray-400 hover:text-white"><Twitter className="h-5 w-5" /></a>
               <a href="#" className="text-gray-400 hover:text-white"><Instagram className="h-5 w-5" /></a>
               <a href="#" className="text-gray-400 hover:text-white"><Github className="h-5 w-5" /></a>
             </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} VFX Nexus. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;