import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../store/DataContext';
import Section from '../components/ui/Section';
import TechnologyCard from '../components/ui/TechnologyCard';
import { staggerContainer, staggerItem, fadeIn } from '../utils/animations';
import Loader from '../components/ui/Loader';

const AICapabilities = () => {
  const { data, loading } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  if (loading || !data) {
    return <Loader />;
  }
  
  const { aiCapabilityEnhancementTechnologies } = data;
  const { description, collectiveTerms, categories } = aiCapabilityEnhancementTechnologies;
  
  const allCategories = [
    {
      id: 'all',
      title: 'All Technologies',
    },
    {
      id: 'memory',
      title: categories.memoryAndInformationRetrieval.title,
      description: categories.memoryAndInformationRetrieval.description,
    },
    {
      id: 'agentic',
      title: categories.agenticCapabilities.title,
      description: categories.agenticCapabilities.description,
    },
    {
      id: 'other',
      title: categories.otherAdvancedCapabilities.title,
      description: categories.otherAdvancedCapabilities.description,
    },
  ];
  
  // Filter technologies based on active category
  const getTechnologies = () => {
    switch (activeCategory) {
      case 'memory':
        return categories.memoryAndInformationRetrieval.technologies;
      case 'agentic':
        return categories.agenticCapabilities.technologies;
      case 'other':
        return categories.otherAdvancedCapabilities.technologies;
      default:
        return [
          ...categories.memoryAndInformationRetrieval.technologies,
          ...categories.agenticCapabilities.technologies,
          ...categories.otherAdvancedCapabilities.technologies,
        ];
    }
  };
  
  const getActiveDescription = () => {
    const found = allCategories.find(cat => cat.id === activeCategory);
    return found?.description || description;
  };
  
  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <div className="bg-secondary-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 to-secondary-900/50 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(67,56,202,0.1),rgba(10,10,30,0.5))]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              AI Capability Enhancement Technologies
            </h1>
            
            <p className="text-xl text-secondary-300 mb-8">
              {description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              {collectiveTerms.map((term, index) => (
                <motion.span 
                  key={term} 
                  className="inline-block px-3 py-1.5 bg-secondary-800/70 backdrop-blur-sm rounded-full text-sm font-medium text-secondary-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  {term}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Category Navigation */}
      <div className="bg-secondary-900/70 sticky top-16 z-20 backdrop-blur-lg border-y border-secondary-800 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {allCategories.map((category) => (
              <button
                key={category.id}
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'text-secondary-400 hover:text-white hover:bg-secondary-800'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Active Category Description */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeCategory}
          className="bg-secondary-800/50 py-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4">
            <p className="text-center text-lg text-secondary-300 max-w-3xl mx-auto">
              {getActiveDescription()}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Technologies */}
      <Section>
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {getTechnologies().map((technology, index) => (
              <TechnologyCard 
                key={technology.name} 
                technology={technology} 
                index={index} 
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </Section>
      
      {/* Resource Section */}
      <Section
        title="Why These Technologies Matter"
        subtitle="Understanding the impact of AI capability enhancement technologies on the future of computing"
        className="bg-secondary-900/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            className="card"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="text-3xl mb-4">🧠</div>
            <h3 className="text-xl font-bold mb-3 text-white">Enhanced Reasoning</h3>
            <p className="text-secondary-300 text-sm">
              These technologies enable AI systems to reason more effectively, connecting pieces of information
              to form logical conclusions and insights that weren't explicitly programmed.
            </p>
          </motion.div>
          
          <motion.div 
            className="card"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-3xl mb-4">🔄</div>
            <h3 className="text-xl font-bold mb-3 text-white">Adaptive Intelligence</h3>
            <p className="text-secondary-300 text-sm">
              By incorporating external knowledge and autonomous capabilities, these technologies create
              AI systems that adapt to new contexts and requirements without retraining.
            </p>
          </motion.div>
          
          <motion.div 
            className="card"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-3xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3 text-white">Future Applications</h3>
            <p className="text-secondary-300 text-sm">
              As these technologies mature, they'll enable increasingly sophisticated AI applications
              across healthcare, science, education, and business, solving complex problems that
              require advanced coordination and knowledge integration.
            </p>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default AICapabilities;
