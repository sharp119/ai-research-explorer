import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../store/DataContext';
import Section from '../components/ui/Section';
import { fadeIn, staggerContainer, staggerItem } from '../utils/animations';
import Loader from '../components/ui/Loader';

// Simple SVG icons as components to replace react-icons
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ExternalLinkIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const BookmarkIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
  </svg>
);

const DownloadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const FilterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
  </svg>
);

const CopyIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon = ({ size = 18 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const Resources = () => {
  const { data, loading } = useData();
  const [activeTab, setActiveTab] = useState<string>('courses');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [savedResources, setSavedResources] = useState<string[]>(() => {
    const saved = localStorage.getItem('savedResources');
    return saved ? JSON.parse(saved) : [];
  });
  const [copied, setCopied] = useState<string | null>(null);
  
  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('savedResources', JSON.stringify(savedResources));
  }, [savedResources]);
  
  if (loading || !data) {
    return <Loader />;
  }
  
  const { additionalResources } = data;
  const { description, academicCourses, bookRecommendations, ragResources, chainOfThoughtGuide, searchQueries } = additionalResources;
  
  const tabOptions = [
    { id: 'courses', name: 'Academic Courses', icon: '🎓', count: academicCourses.courses.length },
    { id: 'books', name: 'Books', icon: '📚', count: bookRecommendations.books.length },
    { id: 'rag', name: 'RAG Resources', icon: '🔄', count: ragResources.details.length },
    { id: 'cot', name: 'Chain-of-Thought Guide', icon: '🧠', count: chainOfThoughtGuide.details.length },
    { id: 'search', name: 'Search Queries', icon: '🔍', count: searchQueries.queries.length },
  ];
  
  // Toggle save resource
  const toggleSaveResource = (id: string) => {
    if (savedResources.includes(id)) {
      setSavedResources(savedResources.filter(item => item !== id));
    } else {
      setSavedResources([...savedResources, id]);
    }
  };
  
  // Copy content to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  };
  
  // Get all resources for search
  const getAllResources = () => {
    const allResources: { id: string; type: string; title: string; content: string | string[]; tabId: string }[] = [];
    
    // Add courses
    academicCourses.courses.forEach((course, index) => {
      const courseId = `course-${index}`;
      allResources.push({
        id: courseId,
        type: 'Course',
        title: course.name,
        content: course.details,
        tabId: 'courses'
      });
    });
    
    // Add books
    bookRecommendations.books.forEach((book, index) => {
      const bookId = `book-${index}`;
      allResources.push({
        id: bookId,
        type: 'Book',
        title: book.name,
        content: book.details,
        tabId: 'books'
      });
    });
    
    // Add RAG resources
    ragResources.details.forEach((detail, index) => {
      const ragId = `rag-${index}`;
      allResources.push({
        id: ragId,
        type: 'RAG',
        title: ragResources.title,
        content: detail,
        tabId: 'rag'
      });
    });
    
    // Add Chain of Thought guide
    chainOfThoughtGuide.details.forEach((detail, index) => {
      const cotId = `cot-${index}`;
      allResources.push({
        id: cotId,
        type: 'Chain-of-Thought',
        title: chainOfThoughtGuide.title,
        content: detail,
        tabId: 'cot'
      });
    });
    
    // Add search queries
    searchQueries.queries.forEach((query, index) => {
      const queryId = `query-${index}`;
      allResources.push({
        id: queryId,
        type: 'Search Query',
        title: 'Search Query',
        content: query,
        tabId: 'search'
      });
    });
    
    return allResources;
  };
  
  const allResources = getAllResources();
  
  // Filter resources based on search query and type filter
  const filteredResources = allResources.filter(resource => {
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof resource.content === 'string' 
        ? resource.content.toLowerCase().includes(searchQuery.toLowerCase())
        : resource.content.some(item => item.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesFilter = filterType === 'all' || resource.type.toLowerCase() === filterType.toLowerCase();
    
    return matchesSearch && matchesFilter;
  });
  
  // Get saved resources
  const savedResourcesList = allResources.filter(resource => savedResources.includes(resource.id));
  
  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-accent-900 to-secondary-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
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
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-black/30 backdrop-blur-md border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500 text-white"
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
                <div className="absolute right-0 mt-2 w-56 bg-secondary-900 border border-secondary-800 rounded-lg shadow-lg z-10 filter-dropdown">
                  <div className="p-3">
                    <h4 className="font-medium text-white mb-2">Resource Type</h4>
                    <div className="space-y-2">
                      <label className="flex items-center text-secondary-300 hover:text-white cursor-pointer">
                        <input 
                          type="radio" 
                          name="resourceType" 
                          value="all" 
                          checked={filterType === 'all'} 
                          onChange={() => setFilterType('all')}
                          className="mr-2"
                        />
                        All Types
                      </label>
                      <label className="flex items-center text-secondary-300 hover:text-white cursor-pointer">
                        <input 
                          type="radio" 
                          name="resourceType" 
                          value="course" 
                          checked={filterType === 'course'} 
                          onChange={() => setFilterType('course')}
                          className="mr-2"
                        />
                        Courses
                      </label>
                      <label className="flex items-center text-secondary-300 hover:text-white cursor-pointer">
                        <input 
                          type="radio" 
                          name="resourceType" 
                          value="book" 
                          checked={filterType === 'book'} 
                          onChange={() => setFilterType('book')}
                          className="mr-2"
                        />
                        Books
                      </label>
                      <label className="flex items-center text-secondary-300 hover:text-white cursor-pointer">
                        <input 
                          type="radio" 
                          name="resourceType" 
                          value="rag" 
                          checked={filterType === 'rag'} 
                          onChange={() => setFilterType('rag')}
                          className="mr-2"
                        />
                        RAG Resources
                      </label>
                      <label className="flex items-center text-secondary-300 hover:text-white cursor-pointer">
                        <input 
                          type="radio" 
                          name="resourceType" 
                          value="chain-of-thought" 
                          checked={filterType === 'chain-of-thought'} 
                          onChange={() => setFilterType('chain-of-thought')}
                          className="mr-2"
                        />
                        Chain-of-Thought
                      </label>
                      <label className="flex items-center text-secondary-300 hover:text-white cursor-pointer">
                        <input 
                          type="radio" 
                          name="resourceType" 
                          value="search query" 
                          checked={filterType === 'search query'} 
                          onChange={() => setFilterType('search query')}
                          className="mr-2"
                        />
                        Search Queries
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Search Results */}
            {searchQuery && (
              <div className="mt-8 text-left bg-secondary-900/80 backdrop-blur-md rounded-lg border border-secondary-800 max-h-96 overflow-y-auto search-results">
                <div className="p-4 border-b border-secondary-800">
                  <h3 className="text-white font-semibold">Search Results ({filteredResources.length})</h3>
                </div>
                {filteredResources.length > 0 ? (
                  <div className="p-4 space-y-4">
                    {filteredResources.map((resource, index) => (
                      <div key={index} className="p-3 bg-secondary-800/50 rounded hover:bg-secondary-800 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="text-xs font-medium text-accent-500 mb-1">
                              {resource.type}
                            </div>
                            <div className="font-medium text-white mb-1">{resource.title}</div>
                          </div>
                          <button 
                            onClick={() => toggleSaveResource(resource.id)}
                            className={`p-1 rounded hover:bg-secondary-700 focus:outline-none transition-colors ${savedResources.includes(resource.id) ? 'text-yellow-500' : 'text-secondary-500'}`}
                            aria-label={savedResources.includes(resource.id) ? "Remove from saved" : "Save resource"}
                          >
                            <BookmarkIcon />
                          </button>
                        </div>
                        
                        <div className="text-sm text-secondary-400 mb-3 line-clamp-2">
                          {typeof resource.content === 'string' 
                            ? resource.content 
                            : resource.content[0]}
                        </div>
                        
                        <button 
                          onClick={() => {
                            setSearchQuery('');
                            setActiveTab(resource.tabId);
                            setTimeout(() => {
                              const element = document.getElementById(resource.id);
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                                element.classList.add('highlight-animation');
                                setTimeout(() => {
                                  element.classList.remove('highlight-animation');
                                }, 2000);
                              }
                            }, 100);
                          }}
                          className="text-sm text-accent-500 hover:text-accent-400 flex items-center"
                        >
                          View resource <span className="ml-1"><ExternalLinkIcon size={14} /></span>
                        </button>
                      </div>
                    ))}
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
      
      {/* Saved Resources Section (if there are any saved) */}
      {savedResources.length > 0 && (
        <Section>
          <h2 className="text-2xl font-bold mb-6 text-center text-gradient">
            Your Saved Resources ({savedResources.length})
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {savedResourcesList.map((resource, index) => (
              <motion.div
                key={resource.id}
                className="card card-hover relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <div className="absolute top-3 right-3 text-yellow-500">
                  <StarIcon />
                </div>
                
                <div className="mt-2">
                  <div className="text-xs font-medium uppercase tracking-wider text-accent-500 mb-2">
                    {resource.type}
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 text-white">{resource.title}</h3>
                  
                  <div className="text-sm text-secondary-300 mb-4 line-clamp-3">
                    {typeof resource.content === 'string' 
                      ? resource.content 
                      : resource.content[0]}
                  </div>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <button 
                      onClick={() => {
                        setActiveTab(resource.tabId);
                        setTimeout(() => {
                          const element = document.getElementById(resource.id);
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                            element.classList.add('highlight-animation');
                            setTimeout(() => {
                              element.classList.remove('highlight-animation');
                            }, 2000);
                          }
                        }, 100);
                      }}
                      className="text-accent-500 hover:text-accent-400 text-sm flex items-center"
                    >
                      View <span className="ml-1"><ExternalLinkIcon size={14} /></span>
                    </button>
                    
                    <button 
                      onClick={() => toggleSaveResource(resource.id)}
                      className="p-1 rounded hover:bg-secondary-800 text-yellow-500"
                      aria-label="Remove from saved"
                    >
                      <BookmarkIcon />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>
      )}
      
      {/* Tab Navigation */}
      <div className="bg-secondary-900/70 sticky top-16 z-20 backdrop-blur-lg border-y border-secondary-800 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabOptions.map((tab) => (
              <button
                key={tab.id}
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-all flex items-center ${
                  activeTab === tab.id
                    ? 'bg-accent-600 text-white'
                    : 'text-secondary-400 hover:text-white hover:bg-secondary-800'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
                <span className="ml-2 text-xs bg-secondary-800/60 px-2 py-1 rounded-full">
                  {tab.count}
                </span>
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
                {academicCourses.courses.map((course, index) => {
                  const courseId = `course-${index}`;
                  const isSaved = savedResources.includes(courseId);
                  
                  return (
                    <motion.div
                      id={courseId}
                      key={course.name}
                      className="card card-hover transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-accent-400">{course.name}</h3>
                        <button 
                          onClick={() => toggleSaveResource(courseId)}
                          className={`p-1 rounded hover:bg-secondary-800 focus:outline-none transition-colors ${isSaved ? 'text-yellow-500' : 'text-secondary-500'}`}
                          aria-label={isSaved ? "Remove from saved" : "Save resource"}
                        >
                          <BookmarkIcon />
                        </button>
                      </div>
                      
                      <ul className="space-y-2">
                        {course.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-accent-500 mr-2">•</span>
                            <span className="text-secondary-300 text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex justify-end mt-4">
                        <button 
                          className="text-accent-500 hover:text-accent-400 text-sm flex items-center"
                          onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(course.name)}`, '_blank')}
                        >
                          Find Online <span className="ml-1"><ExternalLinkIcon size={14} /></span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
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
                {bookRecommendations.books.map((book, index) => {
                  const bookId = `book-${index}`;
                  const isSaved = savedResources.includes(bookId);
                  
                  return (
                    <motion.div
                      id={bookId}
                      key={book.name}
                      className="card card-hover"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-accent-400">{book.name}</h3>
                        <button 
                          onClick={() => toggleSaveResource(bookId)}
                          className={`p-1 rounded hover:bg-secondary-800 focus:outline-none transition-colors ${isSaved ? 'text-yellow-500' : 'text-secondary-500'}`}
                          aria-label={isSaved ? "Remove from saved" : "Save resource"}
                        >
                          <BookmarkIcon />
                        </button>
                      </div>
                      
                      <ul className="space-y-2">
                        {book.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-accent-500 mr-2">•</span>
                            <span className="text-secondary-300 text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <div className="flex justify-end mt-4">
                        <button 
                          className="text-accent-500 hover:text-accent-400 text-sm flex items-center"
                          onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(book.name)}+book`, '_blank')}
                        >
                          Find Online <span className="ml-1"><ExternalLinkIcon size={14} /></span>
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
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
                  {ragResources.details.map((detail, index) => {
                    const ragId = `rag-${index}`;
                    const isSaved = savedResources.includes(ragId);
                    
                    return (
                      <li id={ragId} key={index} className="flex items-start group p-2 rounded-lg hover:bg-secondary-800/60 transition-colors">
                        <span className="text-accent-500 mr-2 mt-1">•</span>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="text-secondary-300">{detail}</span>
                            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => toggleSaveResource(ragId)}
                                className={`p-1 rounded hover:bg-secondary-700 focus:outline-none ${isSaved ? 'text-yellow-500' : 'text-secondary-500'}`}
                                aria-label={isSaved ? "Remove from saved" : "Save resource"}
                              >
                                <BookmarkIcon size={14} />
                              </button>
                              <button 
                                onClick={() => copyToClipboard(detail, ragId)}
                                className="p-1 rounded hover:bg-secondary-700 focus:outline-none text-secondary-500"
                                aria-label="Copy to clipboard"
                              >
                                {copied === ragId ? <span className="text-green-500"><CheckIcon size={14} /></span> : <CopyIcon size={14} />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                
                <div className="mt-6 p-4 bg-secondary-800/60 rounded-lg flex items-start">
                  <span className="text-accent-500 mt-1 mr-3 flex-shrink-0">
                    <InfoIcon />
                  </span>
                  <div>
                    <p className="text-white font-medium mb-2">Using RAG Resources</p>
                    <p className="text-sm text-secondary-300">
                      Retrieval-Augmented Generation (RAG) enhances AI models by connecting them to external knowledge sources. 
                      These resources will help you implement RAG systems in your own applications.
                    </p>
                  </div>
                </div>
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
                  {chainOfThoughtGuide.details.map((detail, index) => {
                    const cotId = `cot-${index}`;
                    const isSaved = savedResources.includes(cotId);
                    
                    return (
                      <li id={cotId} key={index} className="flex items-start group p-2 rounded-lg hover:bg-secondary-800/60 transition-colors">
                        <span className="text-accent-500 mr-2 mt-1">•</span>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <span className="text-secondary-300">{detail}</span>
                            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => toggleSaveResource(cotId)}
                                className={`p-1 rounded hover:bg-secondary-700 focus:outline-none ${isSaved ? 'text-yellow-500' : 'text-secondary-500'}`}
                                aria-label={isSaved ? "Remove from saved" : "Save resource"}
                              >
                                <BookmarkIcon size={14} />
                              </button>
                              <button 
                                onClick={() => copyToClipboard(detail, cotId)}
                                className="p-1 rounded hover:bg-secondary-700 focus:outline-none text-secondary-500"
                                aria-label="Copy to clipboard"
                              >
                                {copied === cotId ? <span className="text-green-500"><CheckIcon size={14} /></span> : <CopyIcon size={14} />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                
                <div className="mt-6 p-4 bg-secondary-800/60 rounded-lg flex items-start">
                  <span className="text-accent-500 mt-1 mr-3 flex-shrink-0">
                    <InfoIcon />
                  </span>
                  <div>
                    <p className="text-white font-medium mb-2">Chain of Thought Prompting</p>
                    <p className="text-sm text-secondary-300">
                      Chain of Thought (CoT) prompting helps AI models solve complex reasoning tasks by breaking them down into sequential, 
                      logical steps. This technique can significantly improve problem-solving accuracy.
                    </p>
                  </div>
                </div>
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
                {searchQueries.queries.map((query, index) => {
                  const queryId = `query-${index}`;
                  const isSaved = savedResources.includes(queryId);
                  
                  return (
                    <motion.div
                      id={queryId}
                      key={index}
                      className="group bg-secondary-800/60 p-4 rounded-lg backdrop-blur-sm hover:bg-secondary-800/80 transition-colors relative"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                    >
                      <p className="text-secondary-300 text-sm font-mono pr-8">{query}</p>
                      
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <button 
                          onClick={() => toggleSaveResource(queryId)}
                          className={`p-1 rounded hover:bg-secondary-700 focus:outline-none ${isSaved ? 'text-yellow-500' : 'text-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity'}`}
                          aria-label={isSaved ? "Remove from saved" : "Save resource"}
                        >
                          <BookmarkIcon size={14} />
                        </button>
                        <button 
                          onClick={() => copyToClipboard(query, queryId)}
                          className="p-1 rounded hover:bg-secondary-700 focus:outline-none text-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Copy to clipboard"
                        >
                          {copied === queryId ? <span className="text-green-500"><CheckIcon size={14} /></span> : <CopyIcon size={14} />}
                        </button>
                        <button 
                          onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank')}
                          className="p-1 rounded hover:bg-secondary-700 focus:outline-none text-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          aria-label="Search on Google"
                        >
                          <ExternalLinkIcon size={14} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="mt-8 max-w-4xl mx-auto p-4 bg-secondary-800/60 rounded-lg flex items-start">
                <span className="text-accent-500 mt-1 mr-3 flex-shrink-0">
                  <InfoIcon />
                </span>
                <div>
                  <p className="text-white font-medium mb-2">Using These Search Queries</p>
                  <p className="text-sm text-secondary-300">
                    These search queries have been curated to help you find high-quality information about AI research and cognitive science. 
                    Click on a query to search directly, or copy and modify them to suit your specific needs.
                  </p>
                </div>
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
                <div className="flex justify-between w-full">
                  <span>Google Scholar - Search academic papers across disciplines</span>
                  <a href="https://scholar.google.com/" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:text-accent-400">
                    <ExternalLinkIcon size={14} />
                  </a>
                </div>
              </li>
              <li className="text-secondary-300 text-sm flex items-start">
                <span className="text-accent-500 mr-2">•</span>
                <div className="flex justify-between w-full">
                  <span>arXiv - Open access archive for AI research papers</span>
                  <a href="https://arxiv.org/" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:text-accent-400">
                    <ExternalLinkIcon size={14} />
                  </a>
                </div>
              </li>
              <li className="text-secondary-300 text-sm flex items-start">
                <span className="text-accent-500 mr-2">•</span>
                <div className="flex justify-between w-full">
                  <span>Connected Papers - Explore related academic papers visually</span>
                  <a href="https://www.connectedpapers.com/" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:text-accent-400">
                    <ExternalLinkIcon size={14} />
                  </a>
                </div>
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
                <div className="flex justify-between w-full">
                  <span>Google Colab - Free Jupyter notebooks with GPU/TPU support</span>
                  <a href="https://colab.research.google.com/" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:text-accent-400">
                    <ExternalLinkIcon size={14} />
                  </a>
                </div>
              </li>
              <li className="text-secondary-300 text-sm flex items-start">
                <span className="text-accent-500 mr-2">•</span>
                <div className="flex justify-between w-full">
                  <span>Kaggle - Datasets, competitions, and notebooks for ML</span>
                  <a href="https://www.kaggle.com/" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:text-accent-400">
                    <ExternalLinkIcon size={14} />
                  </a>
                </div>
              </li>
              <li className="text-secondary-300 text-sm flex items-start">
                <span className="text-accent-500 mr-2">•</span>
                <div className="flex justify-between w-full">
                  <span>Hugging Face - Open-source NLP models and datasets</span>
                  <a href="https://huggingface.co/" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:text-accent-400">
                    <ExternalLinkIcon size={14} />
                  </a>
                </div>
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
                <div className="flex justify-between w-full">
                  <span>AI Research Communities on Discord</span>
                  <a href="https://discord.com/invite/cc3XGVrSSk" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:text-accent-400">
                    <ExternalLinkIcon size={14} />
                  </a>
                </div>
              </li>
              <li className="text-secondary-300 text-sm flex items-start">
                <span className="text-accent-500 mr-2">•</span>
                <div className="flex justify-between w-full">
                  <span>Reddit communities: r/MachineLearning, r/neuroscience</span>
                  <a href="https://www.reddit.com/r/MachineLearning/" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:text-accent-400">
                    <ExternalLinkIcon size={14} />
                  </a>
                </div>
              </li>
              <li className="text-secondary-300 text-sm flex items-start">
                <span className="text-accent-500 mr-2">•</span>
                <div className="flex justify-between w-full">
                  <span>LessWrong - Community focused on AI alignment</span>
                  <a href="https://www.lesswrong.com/" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:text-accent-400">
                    <ExternalLinkIcon size={14} />
                  </a>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </Section>
      
      {/* Export & Share Section */}
      <Section className="bg-gradient-to-br from-secondary-900 to-secondary-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6 text-gradient">
            Export Your Resources
          </h2>
          
          <p className="text-secondary-300 mb-8">
            Save your collection of resources for offline use or share with colleagues.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => {
                const exportData = {
                  savedResources: savedResourcesList.map(resource => ({
                    id: resource.id,
                    type: resource.type,
                    title: resource.title,
                    content: resource.content
                  }))
                };
                
                const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'ai-research-resources.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="btn-primary flex items-center"
              disabled={savedResources.length === 0}
            >
              <span className="mr-2"><DownloadIcon /></span> Export Resources
            </button>
            
            <button 
              onClick={() => {
                localStorage.removeItem('savedResources');
                setSavedResources([]);
              }}
              className="btn-outline flex items-center"
              disabled={savedResources.length === 0}
            >
              Clear All Saved
            </button>
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

export default Resources;
