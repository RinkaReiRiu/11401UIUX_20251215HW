import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Zap, User, LogOut, Upload, History, Bookmark } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout, openLoginModal } = useAuth();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsOpen(false);
    }
  };

  const handleUpload = () => {
    alert("Upload feature coming soon!");
    setIsUserMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <>
      <nav className="fixed w-full z-50 glass-panel border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <Zap className="h-8 w-8 text-nexus-secondary" />
                <span className="font-display font-bold text-2xl tracking-tighter text-white">
                  VFX<span className="text-nexus-primary">NEXUS</span>
                </span>
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</Link>
                  <Link to="/tutorials" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Tutorials</Link>
                  <Link to="/community" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Community</Link>
                  <Link to="/resources" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">Resources</Link>
                </div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search tutorials..."
                  className="bg-nexus-dark/50 border border-gray-600 text-gray-300 rounded-full py-1.5 px-4 pl-10 focus:outline-none focus:border-nexus-primary focus:ring-1 focus:ring-nexus-primary w-64 text-sm transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
              </form>

              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 focus:outline-none"
                  >
                    <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-gray-500 hover:border-nexus-primary transition-colors" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-nexus-card border border-gray-700 rounded-xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in duration-200">
                      <div className="px-4 py-2 border-b border-gray-700">
                        <p className="text-sm text-gray-400">Signed in as</p>
                        <p className="text-sm font-bold text-white truncate">{user.name}</p>
                      </div>
                      
                      <Link to="/profile" state={{ tab: 'history' }} onClick={() => setIsUserMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                        <User className="w-4 h-4 mr-2" /> My Profile
                      </Link>
                      <Link to="/profile" state={{ tab: 'bookmarks' }} onClick={() => setIsUserMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                        <Bookmark className="w-4 h-4 mr-2" /> Bookmarks
                      </Link>
                      <Link to="/profile" state={{ tab: 'history' }} onClick={() => setIsUserMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">
                         <History className="w-4 h-4 mr-2" /> History
                      </Link>
                      <button onClick={handleUpload} className="w-full flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors text-left">
                        <Upload className="w-4 h-4 mr-2" /> Upload Work
                      </button>
                      
                      <div className="border-t border-gray-700 mt-1">
                        <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:bg-red-400/10 transition-colors text-left">
                          <LogOut className="w-4 h-4 mr-2" /> Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={openLoginModal}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors border border-white/10"
                >
                  Log in
                </button>
              )}
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden glass-panel border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
              <Link to="/tutorials" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Tutorials</Link>
              <Link to="/community" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Community</Link>
              <Link to="/resources" onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Resources</Link>
              
              <div className="border-t border-gray-700 pt-3 mt-2">
                {user ? (
                   <>
                    <div className="flex items-center px-3 mb-3">
                      <img src={user.avatar} className="w-8 h-8 rounded-full mr-2"/>
                      <span className="text-white font-medium">{user.name}</span>
                    </div>
                    <Link to="/profile" state={{ tab: 'history' }} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">My Profile</Link>
                    <Link to="/profile" state={{ tab: 'bookmarks' }} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Bookmarks</Link>
                    <button onClick={handleLogout} className="text-red-400 hover:text-red-300 block w-full text-left px-3 py-2 rounded-md text-base font-medium">Sign Out</button>
                   </>
                ) : (
                   <button onClick={() => { setIsOpen(false); openLoginModal(); }} className="w-full text-left text-nexus-primary hover:text-white block px-3 py-2 rounded-md text-base font-medium">Log In</button>
                )}
              </div>

              <form onSubmit={handleSearch} className="mt-4 px-3 pb-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-nexus-dark/50 border border-gray-600 text-gray-300 rounded-md py-2 px-4 pl-10 focus:outline-none focus:border-nexus-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </form>
            </div>
          </div>
        )}
      </nav>
      <LoginModal />
    </>
  );
};

export default Navbar;