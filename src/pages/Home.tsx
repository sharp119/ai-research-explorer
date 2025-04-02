import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../components/three/AnimatedBackground';
import Section from '../components/ui/Section';
import LearningPathCard from '../components/ui/LearningPathCard';
import { useData } from '../store/DataContext';

const Home = () => {
  const { data, loading } = useData();
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Main sections based on our JSON data
  const sections = [
    {
      title: 'AI Capability Enhancement Technologies',
      description: data?.aiCapabilityEnhancementTechnologies.description || '',
      icon: '🧠',
      path: '/capabilities',
      color: 'text-primary-400',
    },
    {
      title: 'AI Research in India',
      description: data?.aiResearchInIndia.description || '',
      icon: '🇮🇳',
      path: '/india-research',
      color: 'text-blue-400',
    },
    {
      title: 'Internship Opportunities',
      description: data?.internshipOpportunities.description || '',
      icon: '🎓',
      path: '/internships',
      color: 'text-purple-400',
    },
    {
      title: 'Learning Paths',
      description: data?.learningPaths.description || '',
      icon: '🛤️',
      path: '/learning-paths',
      color: 'text-green-400',
    },
  ];
  
  // Learning path summaries
  const learningPaths = [
    {
      title: 'AI Capabilities',
      description: 'Master advanced AI capabilities from RAG to agentic systems.',
      phaseCount: data?.learningPaths.aiCapabilitiesPath.phases.length || 0,
      path: '/learning-paths#ai-capabilities',
      color: 'primary',
    },
    {
      title: 'Cutting-Edge AI',
      description: 'Explore bleeding-edge AI technologies and research frontiers.',
      phaseCount: data?.learningPaths.cuttingEdgeAIPath.phases.length || 0,
      path: '/learning-paths#cutting-edge',
      color: 'purple',
    },
    {
      title: 'Brain & Cognition',
      description: 'Understanding the brain and cognitive processes fundamentals.',
      phaseCount: data?.learningPaths.brainCognitionPath.phases.length || 0,
      path: '/learning-paths#brain-cognition',
      color: 'blue',
    },
    {
      title: 'AI & Neuroscience',
      description: 'Merging AI with neuroscience for advanced cognitive systems.',
      phaseCount: data?.learningPaths.mergedAINeurosciencePath.phases.length || 0,
      path: '/learning-paths#ai-neuroscience',
      color: 'green',
    },
  ];
  
  return (
    <>
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          ref={heroRef}
          className="container mx-auto px-4 py-20 z-10 relative"
        >
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="text-gradient">AI Research</span> Explorer
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-secondary-300 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Explore cutting-edge AI technologies, research opportunities in India, 
              and comprehensive learning paths to advance your knowledge.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/capabilities" className="btn-primary">
                Explore Technologies
              </Link>
              <Link to="/learning-paths" className="btn-secondary">
                View Learning Paths
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
        >
          <div className="flex flex-col items-center">
            <span className="text-secondary-400 text-sm mb-2">Scroll to explore</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-primary-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </motion.div>
      </div>
      
      {/* Main Sections Overview */}
      <Section
        title="Explore Our Database"
        subtitle="Dive into comprehensive resources for AI researchers, students, and enthusiasts"
        gradient
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <motion.div 
              key={section.title}
              className="card card-hover h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={section.path} className="flex flex-col h-full">
                <div className="text-4xl mb-4">{section.icon}</div>
                
                <h3 className={`font-bold text-2xl mb-3 ${section.color}`}>
                  {section.title}
                </h3>
                
                <p className="text-secondary-300 mb-6 flex-grow">
                  {section.description}
                </p>
                
                <div className="flex items-center text-primary-400 mt-auto">
                  <span>Explore</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>
      
      {/* Featured Learning Paths */}
      <Section
        title="Learning Paths"
        subtitle="Structured learning journeys from fundamentals to mastery"
        className="bg-secondary-900/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningPaths.map((path, index) => (
            <LearningPathCard
              key={path.title}
              title={path.title}
              description={path.description}
              phaseCount={path.phaseCount}
              path={path.path}
              color={path.color}
              index={index}
            />
          ))}
        </div>
      </Section>
      
      {/* Call to Action */}
      <Section className="bg-gradient-to-b from-secondary-900 to-secondary-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            Ready to Advance Your AI Knowledge?
          </h2>
          
          <p className="text-xl text-secondary-300 mb-10">
            Explore our comprehensive database of AI research, technologies, and learning resources.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/capabilities" className="btn-primary">
              Get Started
            </Link>
            <Link to="/india-research" className="btn-outline">
              Explore Research in India
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Home;
