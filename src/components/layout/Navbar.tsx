import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavLink {
  name: string;
  path: string;
  icon: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', path: '/', icon: '🏠' },
  { name: 'AI Capabilities', path: '/capabilities', icon: '🧠' },
  { name: 'India Research', path: '/india-research', icon: '🇮🇳' },
  { name: 'Internships', path: '/internships', icon: '🎓' },
  { name: 'Learning Paths', path: '/learning-paths', icon: '🛤️' },
  { name: 'Resources', path: '/resources', icon: '📚' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-secondary-900/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group"
        >
          <motion.div 
            className="relative w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-400 rounded-lg flex items-center justify-center overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-white font-bold text-xl">AI</div>
            <motion.div 
              className="absolute inset-0 bg-white mix-blend-overlay opacity-0 group-hover:opacity-20"
              initial={false}
              animate={{ opacity: isScrolled ? 0.1 : 0 }}
              whileHover={{ opacity: 0.2 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <div>
            <div className="font-bold text-lg tracking-tight">AI Research</div>
            <div className="text-xs text-secondary-400 -mt-1">Explorer</div>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive 
                    ? 'text-white' 
                    : 'text-secondary-400 hover:text-white hover:bg-secondary-800/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-primary-900/40 rounded-lg -z-10"
                    initial={false}
                    transition={{ type: 'spring', duration: 0.6 }}
                  />
                )}
                <span className="flex items-center gap-1.5">
                  <span>{link.icon}</span>
                  <span>{link.name}</span>
                </span>
              </Link>
            );
          })}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="block md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-8 h-8 flex flex-col justify-center items-center gap-1.5">
            <span 
              className={`w-6 h-0.5 bg-white transition-all ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''
              }`}
            />
            <span 
              className={`w-6 h-0.5 bg-white transition-all ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span 
              className={`w-6 h-0.5 bg-white transition-all ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''
              }`}
            />
          </div>
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <motion.nav 
        className={`md:hidden overflow-hidden`}
        initial={false}
        animate={{ height: isMobileMenuOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className={`px-4 py-3 bg-secondary-900/90 backdrop-blur-lg shadow-lg space-y-2`}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 p-3 rounded-lg font-medium transition-all ${
                  isActive 
                    ? 'bg-primary-900/40 text-white' 
                    : 'text-secondary-400 hover:text-white hover:bg-secondary-800/50'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;
