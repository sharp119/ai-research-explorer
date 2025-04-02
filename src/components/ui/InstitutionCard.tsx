import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InstitutionCardProps {
  name: string;
  description: string;
  details?: any;
  type: 'government' | 'academic' | 'industry' | 'partnership';
  index: number;
}

const InstitutionCard = ({ name, description, details, type, index }: InstitutionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calculate delay based on index for staggered animation
  const delay = index * 0.1;
  
  // Get color based on institution type
  const getTypeColor = () => {
    switch (type) {
      case 'government':
        return 'from-blue-600 to-blue-800';
      case 'academic':
        return 'from-purple-600 to-purple-800';
      case 'industry':
        return 'from-red-600 to-red-800';
      case 'partnership':
        return 'from-green-600 to-green-800';
      default:
        return 'from-primary-600 to-primary-800';
    }
  };
  
  // Get icon based on institution type
  const getTypeIcon = () => {
    switch (type) {
      case 'government':
        return '🏛️';
      case 'academic':
        return '🎓';
      case 'industry':
        return '🏢';
      case 'partnership':
        return '🤝';
      default:
        return '🔬';
    }
  };
  
  return (
    <motion.div 
      className="card card-hover overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b" style={{ backgroundImage: `linear-gradient(to bottom, ${getTypeColor()})` }} />
      
      <div className="flex flex-col">
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-secondary-800 flex items-center justify-center mr-3 shrink-0">
            <span className="text-lg">{getTypeIcon()}</span>
          </div>
          
          <div className="flex-grow">
            <h3 className="font-bold text-xl text-white">{name}</h3>
            <p className="text-secondary-300 text-sm mt-2">{description}</p>
          </div>
          
          <button 
            className="ml-2 p-1 rounded-full bg-secondary-800 hover:bg-secondary-700 transition-colors"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 text-secondary-400 transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        <AnimatePresence>
          {isExpanded && details && (
            <motion.div 
              className="mt-4 pt-4 border-t border-secondary-800"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Placeholder for details rendering - will be customized based on actual data */}
              <div className="text-sm text-secondary-300">
                <pre className="text-xs overflow-auto whitespace-pre-wrap bg-secondary-800 p-3 rounded-lg">
                  {JSON.stringify(details, null, 2)}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default InstitutionCard;
