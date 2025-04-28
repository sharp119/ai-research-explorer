import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../store/DataContext';
import Section from '../components/ui/Section';
import { fadeIn, staggerContainer, staggerItem } from '../utils/animations';
import Loader from '../components/ui/Loader';

// Simple SVG icons as components to replace react-icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const BookmarkIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bookmark">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

const CheckCircleIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check-circle">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const CircleIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-circle">
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

const FilterIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const InfoIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-info">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const LearningPaths = () => {
  const { data, loading } = useData();
  const [activePath, setActivePath] = useState<string>('ai-capabilities');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [savedTopics, setSavedTopics] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedTopics');
    return saved ? JSON.parse(saved) : [];
  });
  const [completedTopics, setCompletedTopics] = useState<string[]>(() => {
    const completed = localStorage.getItem('completedTopics');
    return completed ? JSON.parse(completed) : [];
  });
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  // Save to localStorage whenever these states change
  useEffect(() => {
    localStorage.setItem('savedTopics', JSON.stringify(savedTopics));
  }, [savedTopics]);
  
  useEffect(() => {
    localStorage.setItem('completedTopics', JSON.stringify(completedTopics));
  }, [completedTopics]);
  
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
    { id: 'ai-capabilities', name: 'AI Capabilities', ref: aiCapabilitiesRef, difficulty: 'beginner', description: 'Start with fundamental AI capabilities and work your way up to advanced topics.', color: 'primary-600' },
    { id: 'cutting-edge', name: 'Cutting-Edge AI', ref: cuttingEdgeRef, difficulty: 'advanced', description: 'For those who want to push the boundaries of what\'s possible with AI.', color: 'purple-600' },
    { id: 'brain-cognition', name: 'Brain & Cognition', ref: brainCognitionRef, difficulty: 'intermediate', description: 'Understand how the brain works and how it relates to cognitive processes.', color: 'blue-600' },
    { id: 'ai-neuroscience', name: 'AI & Neuroscience', ref: aiNeuroscienceRef, difficulty: 'advanced', description: 'Explore the intersection of AI and neuroscience for advanced insights.', color: 'green-600' },
  ];
  
  const scrollToPath = (id: string) => {
    setActivePath(id);
    const option = pathOptions.find(opt => opt.id === id);
    if (option && option.ref.current) {
      option.ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  const filteredPathOptions = selectedDifficulty === 'all' 
    ? pathOptions 
    : pathOptions.filter(path => path.difficulty === selectedDifficulty);
  
  const toggleSavedTopic = (topicId: string) => {
    if (savedTopics.includes(topicId)) {
      setSavedTopics(savedTopics.filter(id => id !== topicId));
    } else {
      setSavedTopics([...savedTopics, topicId]);
    }
  };
  
  const toggleCompletedTopic = (topicId: string) => {
    if (completedTopics.includes(topicId)) {
      setCompletedTopics(completedTopics.filter(id => id !== topicId));
    } else {
      setCompletedTopics([...completedTopics, topicId]);
    }
  };

  const createTopicId = (pathId: string, phaseTitle: string, topicName: string) => {
    return `${pathId}-${phaseTitle}-${topicName}`.replace(/\s+/g, '-').toLowerCase();
  };
  
  // Function to get all topics from all paths
  const getAllTopics = () => {
    const allTopics: { id: string; pathId: string; phase: string; topic: string; phaseIndex: number; topicIndex: number }[] = [];
    
    // Add aiCapabilitiesPath topics
    aiCapabilitiesPath.phases.forEach((phase, phaseIndex) => {
      phase.topics.forEach((topic, topicIndex) => {
        const topicId = createTopicId('ai-capabilities', phase.title, topic.topic);
        allTopics.push({
          id: topicId,
          pathId: 'ai-capabilities',
          phase: phase.title,
          topic: topic.topic,
          phaseIndex,
          topicIndex
        });
      });
    });
    
    // Add cuttingEdgeAIPath topics
    cuttingEdgeAIPath.phases.forEach((phase, phaseIndex) => {
      phase.topics.forEach((topic, topicIndex) => {
        const topicId = createTopicId('cutting-edge', phase.title, topic.topic);
        allTopics.push({
          id: topicId,
          pathId: 'cutting-edge',
          phase: phase.title,
          topic: topic.topic,
          phaseIndex,
          topicIndex
        });
      });
    });
    
    // Add brainCognitionPath topics
    brainCognitionPath.phases.forEach((phase, phaseIndex) => {
      phase.topics.forEach((topic, topicIndex) => {
        const topicId = createTopicId('brain-cognition', phase.title, topic.topic);
        allTopics.push({
          id: topicId,
          pathId: 'brain-cognition',
          phase: phase.title,
          topic: topic.topic,
          phaseIndex,
          topicIndex
        });
      });
    });
    
    // Add mergedAINeurosciencePath topics
    mergedAINeurosciencePath.phases.forEach((phase, phaseIndex) => {
      phase.topics.forEach((topic, topicIndex) => {
        const topicId = createTopicId('ai-neuroscience', phase.title, topic.topic);
        allTopics.push({
          id: topicId,
          pathId: 'ai-neuroscience',
          phase: phase.title,
          topic: topic.topic,
          phaseIndex,
          topicIndex
        });
      });
    });
    
    return allTopics;
  };
  
  const allTopics = getAllTopics();
  
  // Search functionality
  const searchResults = searchQuery === '' 
    ? [] 
    : allTopics.filter(item => 
        item.topic.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.phase.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
  // Render a phase from any of the learning paths
  const renderPhase = (phase: any, index: number, colorClass: string, pathId: string) => {
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
            {phase.topics.map((topic: any, tIndex: number) => {
              const topicId = createTopicId(pathId, phase.title, topic.topic);
              const isCompleted = completedTopics.includes(topicId);
              const isSaved = savedTopics.includes(topicId);
              
              return (
                <div key={tIndex} className="border-t border-secondary-800 pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className={`font-bold text-lg text-secondary-200 flex items-center ${isCompleted ? 'line-through opacity-70' : ''}`}>
                      <button 
                        onClick={() => toggleCompletedTopic(topicId)} 
                        className="mr-2 text-xl focus:outline-none"
                        aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                      >
                        {isCompleted ? (
                          <span className="text-green-500">
                            <CheckCircleIcon size={24} />
                          </span>
                        ) : (
                          <span className="text-secondary-500">
                            <CircleIcon size={24} />
                          </span>
                        )}
                      </button>
                      {topic.topic}
                    </h4>
                    <button 
                      onClick={() => toggleSavedTopic(topicId)}
                      className={`p-1 rounded hover:bg-secondary-800 focus:outline-none transition-colors ${isSaved ? 'text-yellow-500' : 'text-secondary-500'}`}
                      aria-label={isSaved ? "Remove from bookmarks" : "Add to bookmarks"}
                    >
                      <BookmarkIcon />
                    </button>
                  </div>
                  
                  {topic.resources && (
                    <div className="space-y-4">
                      {topic.resources.map((resource: any, rIndex: number) => (
                        <div key={rIndex} className="bg-secondary-800/50 p-4 rounded-lg hover:bg-secondary-800 transition-colors">
                          <div className="flex justify-between items-start mb-1">
                            <div className="font-semibold text-secondary-100">{resource.name}</div>
                            <div className="text-xs uppercase tracking-wider text-secondary-500">{resource.type}</div>
                          </div>
                          
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
                          
                          {resource.focus && (
                            <div className="mt-2 text-sm text-secondary-400">
                              <span className="text-primary-500 font-semibold">Focus: </span>
                              {resource.focus}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {topic.ideas && (
                    <div className="space-y-3">
                      {topic.ideas.map((idea: any, iIndex: number) => (
                        <div key={iIndex} className="bg-secondary-800/50 p-4 rounded-lg hover:bg-secondary-800 transition-colors">
                          <div className="font-semibold text-secondary-100">{idea.name}</div>
                          <p className="text-sm text-secondary-400 mt-1">{idea.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {topic.projects && (
                    <div className="space-y-3">
                      {topic.projects.map((project: any, pIndex: number) => (
                        <div key={pIndex} className="bg-secondary-800/50 p-4 rounded-lg hover:bg-secondary-800 transition-colors">
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
                        <div key={tIndex} className="bg-secondary-800/50 p-4 rounded-lg hover:bg-secondary-800 transition-colors">
                          <div className="font-semibold text-secondary-100">{tip.tip}</div>
                          <p className="text-sm text-secondary-400 mt-1">{tip.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  };
  
  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-900 to-primary-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
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
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search topics or resources..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-black/30 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
              />
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-400">
                <SearchIcon />
              </span>
              
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-white"
                aria-label="Toggle filters"
              >
                <FilterIcon />
              </button>
              
              {/* Filter dropdown */}
              {showFilters && (
                <div className="absolute right-0 mt-2 w-56 bg-secondary-900 border border-secondary-800 rounded-lg shadow-lg z-10">
                  <div className="p-3">
                    <h4 className="font-medium text-white mb-2">Difficulty Level</h4>
                    <div className="space-y-2">
                      <label className="flex items-center text-secondary-300 hover:text-white cursor-pointer">
                        <input 
                          type="radio" 
                          name="difficulty" 
                          value="all" 
                          checked={selectedDifficulty === 'all'} 
                          onChange={() => setSelectedDifficulty('all')}
                          className="mr-2"
                        />
                        All Levels
                      </label>
                      <label className="flex items-center text-secondary-300 hover:text-white cursor-pointer">
                        <input 
                          type="radio" 
                          name="difficulty" 
                          value="beginner" 
                          checked={selectedDifficulty === 'beginner'} 
                          onChange={() => setSelectedDifficulty('beginner')}
                          className="mr-2"
                        />
                        Beginner
                      </label>
                      <label className="flex items-center text-secondary-300 hover:text-white cursor-pointer">
                        <input 
                          type="radio" 
                          name="difficulty" 
                          value="intermediate" 
                          checked={selectedDifficulty === 'intermediate'} 
                          onChange={() => setSelectedDifficulty('intermediate')}
                          className="mr-2"
                        />
                        Intermediate
                      </label>
                      <label className="flex items-center text-secondary-300 hover:text-white cursor-pointer">
                        <input 
                          type="radio" 
                          name="difficulty" 
                          value="advanced" 
                          checked={selectedDifficulty === 'advanced'} 
                          onChange={() => setSelectedDifficulty('advanced')}
                          className="mr-2"
                        />
                        Advanced
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Search Results */}
            {searchQuery && (
              <div className="mt-8 text-left bg-secondary-900/80 backdrop-blur-md rounded-lg border border-secondary-800 max-h-96 overflow-y-auto">
                <div className="p-4 border-b border-secondary-800">
                  <h3 className="text-white font-semibold">Search Results ({searchResults.length})</h3>
                </div>
                {searchResults.length > 0 ? (
                  <div className="p-4 space-y-4">
                    {searchResults.map((result, index) => {
                      const pathOption = pathOptions.find(p => p.id === result.pathId);
                      const colorClass = pathOption ? `text-${pathOption.color}` : 'text-primary-500';
                      
                      return (
                        <div key={index} className="p-3 bg-secondary-800/50 rounded hover:bg-secondary-800 transition-colors">
                          <div className={`text-xs font-medium ${colorClass} mb-1`}>
                            {pathOption?.name} • {result.phase}
                          </div>
                          <div className="font-medium text-white mb-1">{result.topic}</div>
                          <button 
                            onClick={() => {
                              setSearchQuery('');
                              setActivePath(result.pathId);
                              setTimeout(() => {
                                const element = document.getElementById(result.id);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth' });
                                  element.classList.add('highlight-animation');
                                  setTimeout(() => {
                                    element.classList.remove('highlight-animation');
                                  }, 2000);
                                }
                              }, 100);
                            }}
                            className="text-sm text-primary-500 hover:text-primary-400"
                          >
                            Jump to topic
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 text-center text-secondary-400">
                    No results found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Path Cards */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-white">Choose Your Path</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPathOptions.map(path => {
            const bgColor = `bg-${path.color}`;
            const bgColorHover = `hover:bg-${path.color}/80`;
            
            return (
              <div 
                key={path.id}
                className="relative overflow-hidden rounded-xl bg-secondary-900/50 backdrop-blur-sm border border-secondary-800 hover:border-secondary-700 transition-all"
              >
                <div className={`absolute top-0 left-0 w-full h-1 ${bgColor}`}></div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">{path.name}</h3>
                  <div className="text-xs font-medium uppercase tracking-wider mb-4 inline-block px-2 py-1 rounded bg-secondary-800 text-secondary-300">
                    {path.difficulty}
                  </div>
                  
                  <p className="text-secondary-300 mb-6 min-h-[80px]">{path.description}</p>
                  
                  <button
                    onClick={() => scrollToPath(path.id)}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors text-white ${bgColor} ${bgColorHover}`}
                  >
                    Explore Path
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Your Progress */}
        {(savedTopics.length > 0 || completedTopics.length > 0) && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-white">Your Progress</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bookmarked Topics */}
              {savedTopics.length > 0 && (
                <div className="bg-secondary-900/50 backdrop-blur-sm rounded-xl border border-secondary-800 p-6">
                  <h3 className="text-xl font-bold mb-4 text-white flex items-center">
                    <span className="mr-2 text-yellow-500"><BookmarkIcon /></span>
                    Bookmarked Topics ({savedTopics.length})
                  </h3>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {savedTopics.map(topicId => {
                      const topic = allTopics.find(t => t.id === topicId);
                      if (!topic) return null;
                      
                      const pathOption = pathOptions.find(p => p.id === topic.pathId);
                      const colorClass = pathOption ? `text-${pathOption.color}` : 'text-primary-500';
                      
                      return (
                        <div key={topicId} className="p-3 bg-secondary-800/50 rounded hover:bg-secondary-800 transition-colors">
                          <div className={`text-xs font-medium ${colorClass} mb-1`}>
                            {pathOption?.name} • {topic.phase}
                          </div>
                          <div className="font-medium text-white mb-1 flex items-center justify-between">
                            <span>{topic.topic}</span>
                            <button 
                              onClick={() => toggleSavedTopic(topicId)}
                              className="text-yellow-500 hover:text-yellow-400 p-1"
                              aria-label="Remove bookmark"
                            >
                              <BookmarkIcon size={14} />
                            </button>
                          </div>
                          <button 
                            onClick={() => {
                              setActivePath(topic.pathId);
                              setTimeout(() => {
                                const element = document.getElementById(topicId);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth' });
                                  element.classList.add('highlight-animation');
                                  setTimeout(() => {
                                    element.classList.remove('highlight-animation');
                                  }, 2000);
                                }
                              }, 100);
                            }}
                            className="text-sm text-primary-500 hover:text-primary-400"
                          >
                            Jump to topic
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              
              {/* Completed Topics */}
              {completedTopics.length > 0 && (
                <div className="bg-secondary-900/50 backdrop-blur-sm rounded-xl border border-secondary-800 p-6">
                  <h3 className="text-xl font-bold mb-4 text-white flex items-center">
                    <span className="mr-2 text-green-500"><CheckCircleIcon /></span>
                    Completed Topics ({completedTopics.length})
                  </h3>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {completedTopics.map(topicId => {
                      const topic = allTopics.find(t => t.id === topicId);
                      if (!topic) return null;
                      
                      const pathOption = pathOptions.find(p => p.id === topic.pathId);
                      const colorClass = pathOption ? `text-${pathOption.color}` : 'text-primary-500';
                      
                      return (
                        <div key={topicId} className="p-3 bg-secondary-800/50 rounded hover:bg-secondary-800 transition-colors">
                          <div className={`text-xs font-medium ${colorClass} mb-1`}>
                            {pathOption?.name} • {topic.phase}
                          </div>
                          <div className="font-medium text-white mb-1 flex items-center justify-between">
                            <span>{topic.topic}</span>
                            <button 
                              onClick={() => toggleCompletedTopic(topicId)}
                              className="text-green-500 hover:text-green-400 p-1"
                              aria-label="Mark as incomplete"
                            >
                              <CheckCircleIcon size={14} />
                            </button>
                          </div>
                          <button 
                            onClick={() => {
                              setActivePath(topic.pathId);
                              setTimeout(() => {
                                const element = document.getElementById(topicId);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth' });
                                  element.classList.add('highlight-animation');
                                  setTimeout(() => {
                                    element.classList.remove('highlight-animation');
                                  }, 2000);
                                }
                              }, 100);
                            }}
                            className="text-sm text-primary-500 hover:text-primary-400"
                          >
                            Jump to topic
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
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
                    ? `bg-${path.color} text-white`
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
            renderPhase(phase, index, 'bg-primary-600', 'ai-capabilities')
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
            renderPhase(phase, index, 'bg-purple-600', 'cutting-edge')
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
            renderPhase(phase, index, 'bg-blue-600', 'brain-cognition')
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
            renderPhase(phase, index, 'bg-green-600', 'ai-neuroscience')
          )}
        </div>
      </Section>
      
      {/* Learning Paths Resources */}
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
                  <strong className="text-white">Track your progress:</strong> Use the bookmark and completion features to 
                  mark topics you want to study later and track what you've already learned.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span>
                  <strong className="text-white">Join communities:</strong> Connect with others studying similar topics 
                  through online forums, social media groups, and local meetups.
                </span>
              </li>
            </ul>
            
            <div className="mt-8 p-4 bg-secondary-800/80 rounded-lg border border-secondary-700 flex items-start">
              <span className="text-primary-500 mt-1 mr-3 flex-shrink-0">
                <InfoIcon />
              </span>
              <div>
                <p className="text-white font-medium mb-2">Your Progress is Saved Locally</p>
                <p className="text-sm text-secondary-300">
                  Your bookmarked and completed topics are saved in your browser's local storage. 
                  This means they will persist between sessions on the same device, but won't be available 
                  if you switch browsers or devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
      
      {/* Highlight animation style */}
      <style jsx global>{`
        @keyframes highlight {
          0% { background-color: rgba(16, 185, 129, 0.2); }
          50% { background-color: rgba(16, 185, 129, 0.3); }
          100% { background-color: transparent; }
        }
        .highlight-animation {
          animation: highlight 2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LearningPaths;
