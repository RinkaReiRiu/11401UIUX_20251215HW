import React, { useState } from 'react';
import { X, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const [name, setName] = useState('');

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      login(name);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeLoginModal}></div>
      <div className="relative bg-nexus-card border border-gray-700 w-full max-w-md rounded-2xl shadow-2xl p-8 overflow-hidden animate-pulse-slow">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-nexus-primary to-nexus-secondary"></div>
        <button 
          onClick={closeLoginModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-nexus-primary/20 text-nexus-primary mb-4">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400 text-sm">Sign in to save your history and join the community.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
            <input 
              type="text" 
              required
              className="w-full bg-nexus-dark/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-nexus-primary focus:ring-1 focus:ring-nexus-primary transition-all placeholder-gray-600"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-nexus-primary hover:bg-violet-600 text-white font-bold py-3 rounded-lg transition-all transform active:scale-95 shadow-lg shadow-nexus-primary/25"
          >
            Start Creating
          </button>
        </form>
        
        <div className="mt-6 text-center text-xs text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </div>
      </div>
    </div>
  );
};

export default LoginModal;