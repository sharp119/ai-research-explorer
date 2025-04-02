// AI Capability Enhancement Technologies Types
export interface Technology {
  name: string;
  description: string;
}

export interface CategoryTechnologies {
  title: string;
  description: string;
  technologies: Technology[];
}

export interface AICapabilityEnhancementTechnologies {
  description: string;
  collectiveTerms: string[];
  categories: {
    memoryAndInformationRetrieval: CategoryTechnologies;
    agenticCapabilities: CategoryTechnologies;
    otherAdvancedCapabilities: CategoryTechnologies;
  };
}

// AI Research in India Types
export interface Initiative {
  name: string;
  description: string;
  funding?: string;
  allocation?: string[];
  oversight?: string;
}

export interface Partner {
  partner: string;
  details: string[];
}

export interface Division {
  name: string;
  description: string;
  focus?: string[] | any;
}

export interface Government {
  name: string;
  description: string;
  initiatives?: Initiative[];
  partnerships?: Partner[];
  locations?: string[];
  focus?: string[];
  divisions?: Division[];
}

export interface Department {
  name: string;
  internships?: string | any;
  description?: string;
  labs?: string[];
  focus?: string[] | any;
  details?: string;
  applications?: string;
  approach?: string;
  research?: string[] | string;
  collaborations?: string;
}

export interface Campus {
  name: string;
  description: string;
  internships?: any;
  department?: string;
  programs?: string[];
  research?: string;
  approach?: string;
  focus?: string[];
  partnerships?: any[];
}

export interface Center {
  name: string;
  designation?: string;
  approach?: string;
  research?: string[];
  description?: string;
  focus?: string[];
}

export interface Program {
  name: string;
  deadline?: string;
  duration?: string;
  notification?: string;
  status?: string;
  benefits?: string;
}

export interface Academic {
  name: string;
  description: string;
  departments?: Department[];
  campuses?: Campus[];
  internships?: any;
  centers?: Center[];
  labs?: any;
  programs?: Program[];
  locations?: string[];
}

export interface PublicPrivate {
  name: string;
  description: string;
  organizer?: string;
  activities?: string[];
  focus?: string;
}

export interface IndustryLed {
  name: string;
  location?: string;
  description: string;
  internships?: any;
  lab?: any;
  locations?: string[];
}

export interface AIResearchInIndia {
  description: string;
  categories: {
    governmentInstitutions: {
      title: string;
      institutions: Government[];
    };
    academicInstitutions: {
      title: string;
      institutions: Academic[];
    };
    publicPrivatePartnerships: {
      title: string;
      institutions: PublicPrivate[];
    };
    industryLedResearchCenters: {
      title: string;
      institutions: IndustryLed[];
    };
  };
}

// Internship Opportunities Types
export interface Tip {
  tip: string;
  description: string;
}

export interface Component {
  section?: string;
  items?: string[];
  tip?: string;
  details?: string;
  institution?: string;
  emailTemplate?: string;
}

export interface ApplicationStrategy {
  title: string;
  components: Component[];
}

export interface Activity {
  category: string;
  tasks: string[];
}

export interface Month {
  month: number;
  title: string;
  activities: Activity[];
}

export interface ActionPlan {
  title: string;
  months: Month[];
}

export interface Point {
  area: string;
  details: string;
}

export interface BackgroundLeveraging {
  title: string;
  subtitle: string;
  points: Point[];
}

export interface CategoryTip {
  category: string;
  tips: string[];
}

export interface CSEStudentTips {
  title: string;
  categories: CategoryTip[];
  note: string;
}

export interface InternshipOpportunities {
  description: string;
  applicationTips: Tip[];
  applicationStrategy: {
    resumeCV: ApplicationStrategy;
    coverLetter: ApplicationStrategy;
    directOutreach: ApplicationStrategy;
    institutionGuidelines: ApplicationStrategy;
    portfolioMaterials: ApplicationStrategy;
  };
  actionPlan: ActionPlan;
  backgroundLeveraging: BackgroundLeveraging;
  cseStudentTips: CSEStudentTips;
}

// Learning Paths Types
export interface Resource {
  name: string;
  type: string;
  details?: string[] | any;
  focus?: string;
  items?: string[];
}

export interface Topic {
  topic: string;
  resources?: Resource[];
  ideas?: any[];
  categories?: any[];
  platforms?: string[];
  tips?: any[];
}

export interface Phase {
  phase?: number;
  title: string;
  description?: string;
  topics: Topic[];
}

export interface Project {
  name: string;
  details: string[];
}

export interface Category {
  category: string;
  resources: string[] | any;
  details?: string;
}

export interface Strategy {
  strategy: string;
  details: string[];
}

export interface AICapabilitiesPath {
  title: string;
  phases: Phase[];
}

export interface CuttingEdgeAIPath {
  title: string;
  description: string;
  phases: Phase[];
}

export interface BrainCognitionPath {
  title: string;
  description: string;
  phases: Phase[];
}

export interface MergedAINeurosciencePath {
  title: string;
  description: string;
  phases: Phase[];
}

export interface LearningPaths {
  description: string;
  aiCapabilitiesPath: AICapabilitiesPath;
  cuttingEdgeAIPath: CuttingEdgeAIPath;
  brainCognitionPath: BrainCognitionPath;
  mergedAINeurosciencePath: MergedAINeurosciencePath;
}

// Additional Resources Types
export interface Course {
  name: string;
  details: string[];
}

export interface Book {
  name: string;
  details: string[];
}

export interface AdditionalResources {
  description: string;
  academicCourses: {
    title: string;
    courses: Course[];
  };
  bookRecommendations: {
    title: string;
    books: Book[];
  };
  ragResources: {
    title: string;
    details: string[];
  };
  chainOfThoughtGuide: {
    title: string;
    details: string[];
  };
  searchQueries: {
    title: string;
    queries: string[];
  };
}

// Main Database Type
export interface AIResearchDatabase {
  aiCapabilityEnhancementTechnologies: AICapabilityEnhancementTechnologies;
  aiResearchInIndia: AIResearchInIndia;
  internshipOpportunities: InternshipOpportunities;
  learningPaths: LearningPaths;
  additionalResources: AdditionalResources;
}
