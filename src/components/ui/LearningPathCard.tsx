import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface LearningPathCardProps {
  title: string;
  description: string;
  phaseCount: number;
  path: string;
  color: string;
  index: number;
}

const LearningPathCard = ({ 
  title, 
  description, 
  phaseCount, 
  path, 
  color, 
  index 
}: LearningPathCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Calculate delay based on index for staggered animation
  const delay = index * 0.15;
  
  // Get gradient based on color prop
  const getGradient = () => {
    switch (color) {
      case 'blue':
        return 'from-blue-600 to-blue-900';
      case 'purple':
        return 'from-purple-600 to-purple-900';
      case 'green':
        return 'from-green-600 to-green-900';
      case 'red':
        return 'from-red-600 to-red-900';
      default:
        return 'from-primary-600 to-primary-900';
    }
  };
  
  return (
    <motion.div
      className="relative h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-50px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={path}>
        <div 
          className={`h-full card overflow-hidden group cursor-pointer transition-all duration-300 ${
            isHovered ? 'translate-y-[-8px] shadow-lg shadow-primary-500/20' : ''
          }`}
        >
          {/* Background Gradient */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${getGradient()} opacity-20 group-hover:opacity-30 transition-opacity`}
          />
          
          {/* Content */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-xl text-white flex-grow">{title}</h3>
              <div className="bg-secondary-900/80 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                <span>{phaseCount} Phases</span>
              </div>
            </div>
            
            <p className="text-secondary-300 text-sm mb-6">
              {description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-wider text-secondary-500">Learning Path</div>
              
              <motion.div 
                className="text-primary-400 flex items-center gap-1 text-sm"
                animate={{ x: isHovered ? 5 : 0 }}
              >
                Explore Path
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </motion.div>
            </div>
          </div>
          
          {/* Path indicator */}
          <AnimatePresence>
            {isHovered && (
              <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>
        </div>
      </Link>
    </motion.div>
  );
};

export default LearningPathCard;
