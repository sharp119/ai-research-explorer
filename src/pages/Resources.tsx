import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../store/DataContext';
import Section from '../components/ui/Section';
import { fadeIn, staggerContainer, staggerItem } from '../utils/animations';
import Loader from '../components/ui/Loader';

const Resources = () => {
  const { data, loading } = useData();
  const [activeTab, setActiveTab] = useState<string>('courses');
  
  if (loading || !data) {
    return <Loader />;
  }
  
  const { additionalResources } = data;
  const { description, academicCourses, bookRecommendations, ragResources, chainOfThoughtGuide, searchQueries } = additionalResources;
  
  const tabOptions = [
    { id: 'courses', name: 'Academic Courses' },
    { id: 'books', name: 'Books' },
    { id: 'rag', name: 'RAG Resources' },
    { id: 'cot', name: 'Chain-of-Thought Guide' },
    { id: 'search', name: 'Search Queries' },
  ];
  
  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <div className="bg-secondary-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-900/50 to-secondary-900/50 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),rgba(10,10,30,0.5))]"></div>
          
          {/* Resource illustration */}
          <svg className="absolute left-0 bottom-0 w-1/3 h-auto opacity-10" viewBox="0 0 100 100">
            <rect x="10" y="20" width="80" height="60" fill="none" stroke="white" strokeWidth="2" />
            <line x1="10" y1="35" x2="90" y2="35" stroke="white" strokeWidth="2" />
            <circle cx="20" cy="28" r="3" fill="white" />
            <circle cx="30" cy="28" r="3" fill="white" />
            <circle cx="40" cy="28" r="3" fill="white" />
            <rect x="20" y="45" width="60" height="10" fill="white" fillOpacity="0.2" />
            <rect x="20" y="60" width="40" height="10" fill="white" fillOpacity="0.2" />
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
              Additional <span className="text-gradient">Resources</span>
            </h1>
            
            <p className="text-xl text-secondary-300 mb-8">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="bg-secondary-900/70 sticky top-16 z-20 backdrop-blur-lg border-y border-secondary-800 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabOptions.map((tab) => (
              <button
                key={tab.id}
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-accent-600 text-white'
                    : 'text-secondary-400 hover:text-white hover:bg-secondary-800'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Tab Content */}
      <Section>
        <AnimatePresence mode="wait">
          {activeTab === 'courses' && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gradient">
                {academicCourses.title}
              </h2>
              
              <div className="space-y-6 max-w-4xl mx-auto">
                {academicCourses.courses.map((course, index) => (
                  <motion.div
                    key={course.name}
                    className="card card-hover"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-xl font-bold mb-4 text-accent-400">{course.name}</h3>
                    <ul className="space-y-2">
                      {course.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-accent-500 mr-2">•</span>
                          <span className="text-secondary-300 text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {activeTab === 'books' && (
            <motion.div
              key="books"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gradient">
                {bookRecommendations.title}
              </h2>
              
              <div className="space-y-6 max-w-4xl mx-auto">
                {bookRecommendations.books.map((book, index) => (
                  <motion.div
                    key={book.name}
                    className="card card-hover"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-xl font-bold mb-4 text-accent-400">{book.name}</h3>
                    <ul className="space-y-2">
                      {book.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-accent-500 mr-2">•</span>
                          <span className="text-secondary-300 text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {activeTab === 'rag' && (
            <motion.div
              key="rag"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gradient">
                {ragResources.title}
              </h2>
              
              <div className="card card-hover max-w-4xl mx-auto">
                <ul className="space-y-3">
                  {ragResources.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent-500 mr-2">•</span>
                      <span className="text-secondary-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'cot' && (
            <motion.div
              key="cot"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gradient">
                {chainOfThoughtGuide.title}
              </h2>
              
              <div className="card card-hover max-w-4xl mx-auto">
                <ul className="space-y-3">
                  {chainOfThoughtGuide.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-accent-500 mr-2">•</span>
                      <span className="text-secondary-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gradient">
                {searchQueries.title}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {searchQueries.queries.map((query, index) => (
                  <motion.div
                    key={index}
                    className="bg-secondary-800/60 p-4 rounded-lg backdrop-blur-sm hover:bg-secondary-800/80 transition-colors cursor-pointer"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.03 }}
                  >
                    <p className="text-secondary-300 text-sm font-mono">{query}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
      
      {/* Research Tools */}
      <Section
        title="Research & Learning Tools"
        subtitle="Essential tools and platforms to support your AI and cognitive science journey"
        className="bg-secondary-900/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="card card-hover"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-xl font-bold mb-3 text-white">Academic Resources</h3>
            <ul className="space-y-2">
              <li className="text-secondary-300 text-sm flex items-start">
                <span className="text-accent-500 mr-2">•</span>
                <span>Google Scholar - Search academic papers across disciplines</span>
              </li>
              <li className="text-secondary-300 text-sm flex items-start">
                <span className="text-accent-500 mr-2">•</span>
                <span>arXiv - Open access archive for AI research papers</span>
              </li>
              <li className="text-secondary-300 text-sm flex items-start">
                <span className="text-accent-500 mr-2">•</span>
                <span>Connected Papers - Explore related academic papers visually</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="card card-hover"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-3xl mb-4">💻</div>
            <h3 className="text-xl font-bold mb-3 text-white">Development Platforms</h3>
            <ul className="space-y-2">
              <li className="text-secondary-300 text-sm flex items-start">
                <span className="text-accent-500 mr-2">•</span>
                <span>Google Colab - Free Jupyter notebooks with GPU/TPU support</span>
              </li>
              <li className="text-secondary-300 text-sm flex items-start">
                <span className="text-accent-500 mr-2">•</span>
                <span>Kaggle - Datasets, competitions, and notebooks for ML</span>
              </li>
              <li className="text-secondary-300 text-sm flex items-start">
                <span className="text-accent-500 mr-2">•</span>
                <span>Hugging Face - Open-source NLP models and datasets</span>
              </li>
            </ul>
          </motion.div>
          
          <motion.div 
            className="card card-hover"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-3xl mb-4">👥</div>
            <h3 className="text-xl font-bold mb-3 text-white">Communities</h3>
            <ul className="space-y-2">
              <li className="text-secondary-300 text-sm flex items-start">
                <span className="text-accent-500 mr-2">•</span>
                <span>AI Research Communities on Discord</span>
              </li>
              <li className="text-secondary-300 text-sm flex items-start">
                <span className="text-accent-500 mr-2">•</span>
                <span>Reddit communities: r/MachineLearning, r/neuroscience</span>
              </li>
              <li className="text-secondary-300 text-sm flex items-start">
                <span className="text-accent-500 mr-2">•</span>
                <span>LessWrong - Community focused on AI alignment</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default Resources;
