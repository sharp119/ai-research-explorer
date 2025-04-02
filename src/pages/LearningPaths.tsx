import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../store/DataContext';
import Section from '../components/ui/Section';
import { fadeIn, staggerContainer, staggerItem } from '../utils/animations';
import Loader from '../components/ui/Loader';

const LearningPaths = () => {
  const { data, loading } = useData();
  const [activePath, setActivePath] = useState<string>('ai-capabilities');
  
  const aiCapabilitiesRef = useRef<HTMLDivElement>(null);
  const cuttingEdgeRef = useRef<HTMLDivElement>(null);
  const brainCognitionRef = useRef<HTMLDivElement>(null);
  const aiNeuroscienceRef = useRef<HTMLDivElement>(null);
  
  if (loading || !data) {
    return <Loader />;
  }
  
  const { learningPaths } = data;
  const { description, aiCapabilitiesPath, cuttingEdgeAIPath, brainCognitionPath, mergedAINeurosciencePath } = learningPaths;
  
  const pathOptions = [
    { id: 'ai-capabilities', name: 'AI Capabilities', ref: aiCapabilitiesRef },
    { id: 'cutting-edge', name: 'Cutting-Edge AI', ref: cuttingEdgeRef },
    { id: 'brain-cognition', name: 'Brain & Cognition', ref: brainCognitionRef },
    { id: 'ai-neuroscience', name: 'AI & Neuroscience', ref: aiNeuroscienceRef },
  ];
  
  const scrollToPath = (id: string) => {
    setActivePath(id);
    const option = pathOptions.find(opt => opt.id === id);
    if (option && option.ref.current) {
      option.ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  // Render a phase from any of the learning paths
  const renderPhase = (phase: any, index: number, colorClass: string) => {
    return (
      <motion.div
        key={phase.title}
        className="card card-hover mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className={`absolute top-0 left-0 w-1 h-full ${colorClass}`}></div>
        
        <div className="ml-4">
          {phase.phase && (
            <div className="inline-block px-3 py-1 bg-secondary-800 rounded-full text-xs font-medium mb-3">
              Phase {phase.phase}
            </div>
          )}
          
          <h3 className="text-2xl font-bold mb-4 text-white">{phase.title}</h3>
          
          {phase.description && (
            <p className="text-secondary-300 mb-6">{phase.description}</p>
          )}
          
          <div className="space-y-6">
            {phase.topics.map((topic: any, tIndex: number) => (
              <div key={tIndex} className="border-t border-secondary-800 pt-4">
                <h4 className="font-bold text-lg mb-3 text-secondary-200">{topic.topic}</h4>
                
                {topic.resources && (
                  <div className="space-y-4">
                    {topic.resources.map((resource: any, rIndex: number) => (
                      <div key={rIndex} className="bg-secondary-800/50 p-4 rounded-lg">
                        <div className="font-semibold text-secondary-100 mb-1">{resource.name}</div>
                        <div className="text-xs uppercase tracking-wider text-secondary-500 mb-2">{resource.type}</div>
                        
                        {resource.details && Array.isArray(resource.details) && (
                          <ul className="mt-2 space-y-1">
                            {resource.details.map((detail: string, dIndex: number) => (
                              <li key={dIndex} className="text-sm text-secondary-400 flex items-start">
                                <span className="text-primary-500 mr-2">•</span>
                                <span>{detail}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {topic.ideas && (
                  <div className="space-y-3">
                    {topic.ideas.map((idea: any, iIndex: number) => (
                      <div key={iIndex} className="bg-secondary-800/50 p-4 rounded-lg">
                        <div className="font-semibold text-secondary-100">{idea.name}</div>
                        <p className="text-sm text-secondary-400 mt-1">{idea.description}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {topic.projects && (
                  <div className="space-y-3">
                    {topic.projects.map((project: any, pIndex: number) => (
                      <div key={pIndex} className="bg-secondary-800/50 p-4 rounded-lg">
                        <div className="font-semibold text-secondary-100">{project.name}</div>
                        <ul className="mt-2 space-y-1">
                          {project.details.map((detail: string, dIndex: number) => (
                            <li key={dIndex} className="text-sm text-secondary-400 flex items-start">
                              <span className="text-primary-500 mr-2">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
                
                {topic.tips && (
                  <div className="space-y-3">
                    {topic.tips.map((tip: any, tIndex: number) => (
                      <div key={tIndex} className="bg-secondary-800/50 p-4 rounded-lg">
                        <div className="font-semibold text-secondary-100">{tip.tip}</div>
                        <p className="text-sm text-secondary-400 mt-1">{tip.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  };
  
  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <div className="bg-green-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/50 to-primary-900/50 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),rgba(10,10,30,0.5))]"></div>
          
          {/* Path illustration */}
          <svg className="absolute right-0 bottom-0 w-2/3 h-auto opacity-10" viewBox="0 0 100 50">
            <path
              d="M10,40 C30,40 30,10 50,10 C70,10 70,40 90,40"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4"
            />
            <circle cx="10" cy="40" r="3" fill="white"/>
            <circle cx="50" cy="10" r="3" fill="white"/>
            <circle cx="90" cy="40" r="3" fill="white"/>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Learning <span className="text-gradient">Paths</span>
            </h1>
            
            <p className="text-xl text-green-100 mb-8">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Path Navigation */}
      <div className="bg-secondary-900/70 sticky top-16 z-20 backdrop-blur-lg border-y border-secondary-800 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {pathOptions.map((path) => (
              <button
                key={path.id}
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-all ${
                  activePath === path.id
                    ? 'bg-green-600 text-white'
                    : 'text-secondary-400 hover:text-white hover:bg-secondary-800'
                }`}
                onClick={() => scrollToPath(path.id)}
              >
                {path.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* AI Capabilities Path */}
      <Section
        id="ai-capabilities"
        title={aiCapabilitiesPath.title}
        className="border-l-4 border-primary-600 pl-4"
      >
        <div ref={aiCapabilitiesRef}>
          {aiCapabilitiesPath.phases.map((phase, index) => 
            renderPhase(phase, index, 'bg-primary-600')
          )}
        </div>
      </Section>
      
      {/* Cutting-Edge AI Path */}
      <Section
        id="cutting-edge"
        title={cuttingEdgeAIPath.title}
        subtitle={cuttingEdgeAIPath.description}
        className="border-l-4 border-purple-600 pl-4 bg-secondary-900/50"
      >
        <div ref={cuttingEdgeRef}>
          {cuttingEdgeAIPath.phases.map((phase, index) => 
            renderPhase(phase, index, 'bg-purple-600')
          )}
        </div>
      </Section>
      
      {/* Brain & Cognition Path */}
      <Section
        id="brain-cognition"
        title={brainCognitionPath.title}
        subtitle={brainCognitionPath.description}
        className="border-l-4 border-blue-600 pl-4"
      >
        <div ref={brainCognitionRef}>
          {brainCognitionPath.phases.map((phase, index) => 
            renderPhase(phase, index, 'bg-blue-600')
          )}
        </div>
      </Section>
      
      {/* AI & Neuroscience Path */}
      <Section
        id="ai-neuroscience"
        title={mergedAINeurosciencePath.title}
        subtitle={mergedAINeurosciencePath.description}
        className="border-l-4 border-green-600 pl-4 bg-secondary-900/50"
      >
        <div ref={aiNeuroscienceRef}>
          {mergedAINeurosciencePath.phases.map((phase, index) => 
            renderPhase(phase, index, 'bg-green-600')
          )}
        </div>
      </Section>
      
      {/* Recommendation Section */}
      <Section className="mt-12">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-secondary-800/80 to-secondary-900/80 backdrop-blur-sm p-8 rounded-xl border border-secondary-700">
          <h2 className="text-2xl font-bold mb-4 text-gradient">How to Use These Learning Paths</h2>
          
          <div className="space-y-4 text-secondary-300">
            <p>
              These learning paths are designed to guide you from foundational concepts to advanced expertise 
              in AI, neuroscience, and their intersection. Here are some tips for getting the most out of them:
            </p>
            
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span>
                  <strong className="text-white">Start with your interests:</strong> Choose the path that aligns most 
                  with your current goals and background. You don't need to follow them in order.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span>
                  <strong className="text-white">Be practical:</strong> For each topic, try to implement a small project 
                  that applies what you've learned before moving to the next topic.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span>
                  <strong className="text-white">Mix and match:</strong> Feel free to combine elements from different paths 
                  to create a personalized learning journey.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span>
                  <strong className="text-white">Track your progress:</strong> Create a learning journal to document 
                  your journey, insights, and questions as you work through these resources.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default LearningPaths;
