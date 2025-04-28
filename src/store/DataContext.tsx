import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AIResearchDatabase } from '../types';

interface DataContextType {
  data: AIResearchDatabase | null;
  loading: boolean;
  error: Error | null;
}

const DataContext = createContext<DataContextType>({
  data: null,
  loading: true,
  error: null,
});

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider = ({ children }: DataProviderProps) => {
  const [data, setData] = useState<AIResearchDatabase | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Attempting to fetch database...');
        const response = await fetch('/ai_research_database.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const jsonData = await response.json();
        console.log('Successfully fetched database');
        setData(jsonData);
      } catch (err) {
        console.error('Error fetching data:', err);
        // Use unknown to cast to any type first to avoid TypeScript errors
        setData(({
          papers: [],
          aiCapabilityEnhancementTechnologies: { 
            description: "AI technologies that enhance capabilities",
            collectiveTerms: ["AI Enhancement Technologies"],
            categories: {
              memoryAndInformationRetrieval: {
                title: "Memory and Information Retrieval",
                description: "Temporary placeholder",
                technologies: []
              },
              agenticCapabilities: {
                title: "Agentic Capabilities",
                description: "Temporary placeholder",
                technologies: []
              },
              otherAdvancedCapabilities: {
                title: "Other Advanced Capabilities",
                description: "Temporary placeholder",
                technologies: []
              }
            }
          },
          aiResearchInIndia: {
            description: "Overview of AI research in India",
            categories: {
              governmentInstitutions: {
                title: "Government Institutions",
                institutions: []
              },
              academicInstitutions: {
                title: "Academic Institutions",
                institutions: []
              },
              publicPrivatePartnerships: {
                title: "Public-Private Partnerships",
                institutions: []
              },
              industryLedResearchCenters: {
                title: "Industry-Led Research Centers",
                institutions: []
              }
            }
          },
          internshipOpportunities: {
            description: "AI internship opportunities",
            applicationTips: [],
            applicationStrategy: {
              resumeCV: { tips: [] },
              coverLetter: { tips: [] },
              directOutreach: { tips: [] },
              institutionGuidelines: { tips: [] },
              portfolioMaterials: { tips: [] }
            },
            actionPlan: { 
              months: [] 
            },
            backgroundLeveraging: {
              backgrounds: []
            },
            cseStudentTips: {
              tips: []
            }
          },
          learningPaths: {
            description: "AI learning paths",
            aiCapabilitiesPath: {
              title: "AI Capabilities Path",
              phases: []
            },
            cuttingEdgeAIPath: {
              title: "Cutting Edge AI Path",
              phases: []
            },
            brainCognitionPath: {
              title: "Brain & Cognition Path",
              phases: []
            },
            mergedAINeurosciencePath: {
              title: "AI & Neuroscience Path",
              phases: []
            }
          },
          additionalResources: {
            description: "Additional AI resources",
            academicCourses: {
              title: "Academic Courses",
              courses: []
            },
            bookRecommendations: {
              title: "Book Recommendations",
              books: []
            },
            ragResources: {
              title: "RAG Resources",
              details: []
            },
            chainOfThoughtGuide: {
              title: "Chain of Thought Guide",
              details: []
            },
            searchQueries: {
              title: "Search Queries",
              queries: []
            }
          }
        }) as unknown as AIResearchDatabase);
        
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
