import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../store/DataContext';
import Section from '../components/ui/Section';
import InstitutionCard from '../components/ui/InstitutionCard';
import { fadeIn, staggerContainer, staggerItem } from '../utils/animations';
import Loader from '../components/ui/Loader';
import IndiaMap from '../components/three/IndiaMap';

const IndiaResearch = () => {
  const { data, loading } = useData();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  if (loading || !data) {
    return <Loader />;
  }
  
  const { aiResearchInIndia } = data;
  const { description, categories } = aiResearchInIndia;
  
  const categoryOptions = [
    { id: 'all', name: 'All Institutions' },
    { id: 'government', name: categories.governmentInstitutions.title },
    { id: 'academic', name: categories.academicInstitutions.title },
    { id: 'public-private', name: categories.publicPrivatePartnerships.title },
    { id: 'industry', name: categories.industryLedResearchCenters.title },
  ];
  
  const getFilteredInstitutions = () => {
    let institutions = [];
    
    switch (activeCategory) {
      case 'government':
        institutions = categories.governmentInstitutions.institutions.map(inst => ({
          ...inst,
          type: 'government'
        }));
        break;
      case 'academic':
        institutions = categories.academicInstitutions.institutions.map(inst => ({
          ...inst,
          type: 'academic'
        }));
        break;
      case 'public-private':
        institutions = categories.publicPrivatePartnerships.institutions.map(inst => ({
          ...inst,
          type: 'partnership'
        }));
        break;
      case 'industry':
        institutions = categories.industryLedResearchCenters.institutions.map(inst => ({
          ...inst,
          type: 'industry'
        }));
        break;
      default:
        institutions = [
          ...categories.governmentInstitutions.institutions.map(inst => ({
            ...inst,
            type: 'government'
          })),
          ...categories.academicInstitutions.institutions.map(inst => ({
            ...inst,
            type: 'academic'
          })),
          ...categories.publicPrivatePartnerships.institutions.map(inst => ({
            ...inst,
            type: 'partnership'
          })),
          ...categories.industryLedResearchCenters.institutions.map(inst => ({
            ...inst,
            type: 'industry'
          })),
        ];
    }
    
    return institutions;
  };
  
  const institutions = getFilteredInstitutions();
  
  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <div className="bg-indigo-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),rgba(10,10,30,0.5))]"></div>
          
          {/* India map outline */}
          <svg className="absolute w-full h-full opacity-10" viewBox="0 0 500 500">
            <path
              d="M250,100 C300,120 350,130 380,170 C410,210 420,260 400,310 C380,360 340,390 290,400 C240,410 190,390 150,350 C110,310 90,260 100,210 C110,160 140,120 190,100 C210,90 230,90 250,100 Z"
              fill="white"
            />
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
              AI Research in <span className="text-gradient">India</span>
            </h1>
            
            <p className="text-xl text-indigo-100 mb-8">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Category Navigation */}
      <div className="bg-secondary-900/70 sticky top-16 z-20 backdrop-blur-lg border-y border-secondary-800 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categoryOptions.map((category) => (
              <button
                key={category.id}
                className={`whitespace-nowrap px-4 py-2 rounded-lg font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'text-secondary-400 hover:text-white hover:bg-secondary-800'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Institutions */}
      <Section>
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            className="grid grid-cols-1 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {institutions.map((institution, index) => (
              <InstitutionCard
                key={institution.name}
                name={institution.name}
                description={institution.description}
                details={institution}
                type={institution.type}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </Section>
      
      {/* Interactive 3D Map Section */}
      <Section
        title="Research Hubs Across India"
        subtitle="Key locations for AI and cognitive science research in India"
        className="bg-secondary-900/50"
      >
        <div className="h-[500px] rounded-xl overflow-hidden glass">
          <IndiaMap />
        </div>
      </Section>
      
      {/* Highlights Section */}
      <Section
        title="Key Research Areas in India"
        subtitle="India's distinctive contributions to global AI research"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="card"
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3 className="text-xl font-bold mb-3 text-white">AI for Social Good</h3>
            <p className="text-secondary-300 text-sm">
              India leads in developing AI applications that address unique socioeconomic challenges in healthcare, 
              agriculture, education, and financial inclusion for underserved populations.
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
            <h3 className="text-xl font-bold mb-3 text-white">Language & Cultural AI</h3>
            <p className="text-secondary-300 text-sm">
              Research on NLP and language models for India's diverse languages, with initiatives to 
              incorporate cultural context and nuances specific to the Indian subcontinent.
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
            <h3 className="text-xl font-bold mb-3 text-white">Cognitive Science Integration</h3>
            <p className="text-secondary-300 text-sm">
              Distinctive research on integrating traditional knowledge systems with modern cognitive science,
              creating unique approaches to understanding consciousness and cognition.
            </p>
          </motion.div>
        </div>
      </Section>
    </div>
  );
};

export default IndiaResearch;
