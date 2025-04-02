import { motion } from 'framer-motion';
import { Technology } from '../../types';

interface TechnologyCardProps {
  technology: Technology;
  index: number;
}

const TechnologyCard = ({ technology, index }: TechnologyCardProps) => {
  // Calculate delay based on index for staggered animation
  const delay = index * 0.1;
  
  return (
    <motion.div 
      className="card card-hover h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-primary-900 flex items-center justify-center mr-3">
            <span className="text-primary-400 font-bold">{index + 1}</span>
          </div>
          <h3 className="font-bold text-xl text-white">{technology.name}</h3>
        </div>
        
        <p className="text-secondary-300 text-sm flex-grow">
          {technology.description}
        </p>
        
        <div className="mt-4 pt-4 border-t border-secondary-800">
          <div className="text-xs uppercase tracking-wider text-secondary-500">Technology</div>
        </div>
      </div>
    </motion.div>
  );
};

export default TechnologyCard;
