import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useData } from '../store/DataContext';
import Section from '../components/ui/Section';
import { staggerContainer, staggerItem, fadeIn } from '../utils/animations';
import Loader from '../components/ui/Loader';

const Internships = () => {
  const { data, loading } = useData();
  const [activeTab, setActiveTab] = useState<string>('application-tips');
  
  if (loading || !data) {
    return <Loader />;
  }
  
  const { internshipOpportunities } = data;
  const { description, applicationTips, applicationStrategy, actionPlan, backgroundLeveraging, cseStudentTips } = internshipOpportunities;
  
  const tabOptions = [
    { id: 'application-tips', name: 'Application Tips' },
    { id: 'resume-cv', name: 'Resume/CV' },
    { id: 'cover-letter', name: 'Cover Letter' },
    { id: 'outreach', name: 'Direct Outreach' },
    { id: 'action-plan', name: '4-Month Plan' },
    { id: 'cse-tips', name: 'CS Student Tips' },
  ];
  
  return (
    <div className="pt-20 pb-20">
      {/* Hero Section */}
      <div className="bg-purple-900 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-indigo-900/50 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),rgba(10,10,30,0.5))]"></div>
          
          {/* Internship illustration */}
          <svg className="absolute right-0 bottom-0 w-1/3 h-auto opacity-10" viewBox="0 0 100 100">
            <path
              d="M20,20 L40,20 L40,80 L20,80 Z M60,20 L80,20 L80,80 L60,80 Z M40,40 L60,40 L60,60 L40,60 Z"
              stroke="white"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="30" cy="30" r="5" fill="white"/>
            <circle cx="70" cy="30" r="5" fill="white"/>
            <circle cx="50" cy="50" r="5" fill="white"/>
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
              AI & Cognitive Science <span className="text-gradient">Internships</span>
            </h1>
            
            <p className="text-xl text-purple-100 mb-8">
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
                    ? 'bg-purple-600 text-white'
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
          {activeTab === 'application-tips' && (
            <motion.div
              key="application-tips"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gradient">
                Application Tips for Success
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {applicationTips.map((tip, index) => (
                  <motion.div
                    key={tip.tip}
                    className="card card-hover"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-xl font-bold mb-3 text-purple-400">{tip.tip}</h3>
                    <p className="text-secondary-300 text-sm">{tip.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {activeTab === 'resume-cv' && (
            <motion.div
              key="resume-cv"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gradient">
                {applicationStrategy.resumeCV.title}
              </h2>
              
              <div className="max-w-4xl mx-auto">
                {applicationStrategy.resumeCV.components.map((component, index) => (
                  <motion.div
                    key={component.section}
                    className="card card-hover mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-xl font-bold mb-4 text-purple-400">{component.section}</h3>
                    <ul className="space-y-3">
                      {component.items?.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          <span className="text-secondary-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {activeTab === 'cover-letter' && (
            <motion.div
              key="cover-letter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gradient">
                {applicationStrategy.coverLetter.title}
              </h2>
              
              <div className="max-w-4xl mx-auto">
                {applicationStrategy.coverLetter.components.map((component, index) => (
                  <motion.div
                    key={component.section}
                    className="card card-hover mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-xl font-bold mb-4 text-purple-400">{component.section}</h3>
                    <ul className="space-y-3">
                      {component.items?.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          <span className="text-secondary-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {activeTab === 'outreach' && (
            <motion.div
              key="outreach"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gradient">
                {applicationStrategy.directOutreach.title}
              </h2>
              
              <div className="max-w-4xl mx-auto">
                {applicationStrategy.directOutreach.components.map((component, index) => (
                  <motion.div
                    key={index}
                    className="card card-hover mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {component.tip && (
                      <h3 className="text-xl font-bold mb-4 text-purple-400">{component.tip}</h3>
                    )}
                    
                    {component.details && (
                      <p className="text-secondary-300 mb-4">{component.details}</p>
                    )}
                    
                    {component.emailTemplate && (
                      <div className="p-4 bg-secondary-800 rounded-lg font-mono text-sm text-secondary-300 whitespace-pre-wrap">
                        {component.emailTemplate}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {activeTab === 'action-plan' && (
            <motion.div
              key="action-plan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gradient">
                {actionPlan.title}
              </h2>
              
              <div className="max-w-4xl mx-auto">
                {actionPlan.months.map((month, index) => (
                  <motion.div
                    key={month.month}
                    className="card card-hover mb-6 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="absolute -left-4 top-4 w-8 h-8 rounded-full bg-purple-700 flex items-center justify-center text-white font-bold">
                      {month.month}
                    </div>
                    
                    <div className="ml-6">
                      <h3 className="text-xl font-bold mb-4 text-purple-400">{month.title}</h3>
                      
                      {month.activities.map((activity, actIndex) => (
                        <div key={actIndex} className="mb-4">
                          <h4 className="font-semibold text-secondary-200 mb-2">{activity.category}</h4>
                          <ul className="space-y-2">
                            {activity.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="flex items-start">
                                <span className="text-purple-500 mr-2">•</span>
                                <span className="text-secondary-300 text-sm">{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {activeTab === 'cse-tips' && (
            <motion.div
              key="cse-tips"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gradient">
                {cseStudentTips.title}
              </h2>
              
              <div className="max-w-4xl mx-auto">
                {cseStudentTips.categories.map((category, index) => (
                  <motion.div
                    key={category.category}
                    className="card card-hover mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-xl font-bold mb-4 text-purple-400">{category.category}</h3>
                    <ul className="space-y-3">
                      {category.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-purple-500 mr-2">•</span>
                          <span className="text-secondary-300">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
                
                <motion.div
                  className="p-4 rounded-lg bg-secondary-800 border-l-4 border-purple-500 text-secondary-300 my-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <p className="italic">{cseStudentTips.note}</p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
      
      {/* Leveraging Background Section */}
      <Section
        title={backgroundLeveraging.title}
        subtitle={backgroundLeveraging.subtitle}
        className="bg-secondary-900/50"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {backgroundLeveraging.points.map((point, index) => (
            <motion.div 
              key={point.area}
              className="card"
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2 }}
            >
              <h3 className="text-xl font-bold mb-3 text-purple-400">{point.area}</h3>
              <p className="text-secondary-300 text-sm">{point.details}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Internships;
