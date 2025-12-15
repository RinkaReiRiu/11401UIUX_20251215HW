import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tutorials from './pages/Tutorials';
import TutorialDetail from './pages/TutorialDetail';
import Community from './pages/Community';
import Resources from './pages/Resources';
import Search from './pages/Search';
import Profile from './pages/Profile';
import { AuthProvider } from './context/AuthContext';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="bg-nexus-dark min-h-screen text-slate-100 font-sans selection:bg-nexus-primary selection:text-white">
          <ScrollToTop />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/tutorial/:id" element={<TutorialDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;