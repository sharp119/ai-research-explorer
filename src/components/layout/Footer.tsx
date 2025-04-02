import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-secondary-900/80 backdrop-blur-sm py-12 border-t border-secondary-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-400 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="text-white font-bold text-xl">AI</div>
              </div>
              <div>
                <div className="font-bold text-lg tracking-tight">AI Research</div>
                <div className="text-xs text-secondary-400 -mt-1">Explorer</div>
              </div>
            </Link>
            <p className="text-secondary-400 text-sm">
              An interactive platform exploring AI technologies, research opportunities, and learning resources.
            </p>
            <div className="text-xs text-secondary-500">
              © {currentYear} AI Research Explorer
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-primary-400 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/capabilities" className="text-secondary-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  AI Capability Enhancement Technologies
                </Link>
              </li>
              <li>
                <Link to="/india-research" className="text-secondary-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  AI Research in India
                </Link>
              </li>
              <li>
                <Link to="/internships" className="text-secondary-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  Internship Opportunities
                </Link>
              </li>
              <li>
                <Link to="/learning-paths" className="text-secondary-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  Learning Paths
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-secondary-400 hover:text-white transition-colors text-sm flex items-center gap-2">
                  <span className="w-1 h-1 bg-primary-500 rounded-full"></span>
                  Additional Resources
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-primary-400 font-semibold mb-4">Stay Updated</h3>
            <p className="text-secondary-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates in AI research and opportunities.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 bg-secondary-800 border border-secondary-700 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary-500 text-sm w-full"
              />
              <motion.button 
                className="bg-primary-600 hover:bg-primary-500 px-4 py-2 text-white font-medium rounded-r-lg text-sm whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
        
        {/* Bottom Separator */}
        <div className="flex items-center mt-10 pt-6 border-t border-secondary-800">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-primary-500/20 to-transparent"></div>
        </div>
        
        {/* Credit */}
        <div className="text-center mt-6 text-secondary-500 text-xs">
          Designed with 💜 for AI researchers and enthusiasts
        </div>
      </div>
    </footer>
  );
};

export default Footer;
