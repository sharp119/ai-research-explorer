import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 300);
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    if (progress === 100) {
      const finalTimer = setTimeout(() => {
        // Additional delay after reaching 100% for visual effect
      }, 500);
      
      return () => clearTimeout(finalTimer);
    }
  }, [progress]);
  
  return (
    <div className="fixed inset-0 bg-secondary-950 flex flex-col items-center justify-center z-50">
      <div className="w-24 h-24 relative mb-8">
        <motion.div 
          className="absolute inset-0 border-4 border-primary-500 rounded-full"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute inset-0 border-4 border-accent-400 rounded-full"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
        />
        
        <motion.div 
          className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 1 }}
        >
          <div className="text-2xl font-bold text-white">AI</div>
        </motion.div>
      </div>
      
      <div className="w-64 h-2 bg-secondary-800 rounded-full overflow-hidden mb-4">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary-600 to-accent-400"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      
      <div className="text-secondary-400 text-sm font-mono">
        {Math.round(progress)}% • Loading Neural Networks
      </div>
    </div>
  );
};

export default Loader;
