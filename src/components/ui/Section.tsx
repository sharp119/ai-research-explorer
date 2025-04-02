import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  titleColor?: string;
  gradient?: boolean;
  fullWidth?: boolean;
}

const Section = ({
  id,
  title,
  subtitle,
  children,
  className = '',
  titleColor = 'text-white',
  gradient = false,
  fullWidth = false,
}: SectionProps) => {
  
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };
  
  return (
    <section 
      id={id} 
      className={`py-16 ${className}`}
    >
      <motion.div 
        className={fullWidth ? 'w-full' : 'container mx-auto px-4'}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div 
          className="text-center mb-12" 
          variants={childVariants}
        >
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-4 ${
              gradient ? 'text-gradient' : titleColor
            }`}
          >
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-secondary-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
          
          <div className="w-16 h-1 bg-primary-500 mx-auto mt-6 rounded-full" />
        </motion.div>
        
        <motion.div variants={childVariants}>
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Section;
