# AI Research Explorer

An immersive, interactive platform for exploring AI research, technologies, and learning resources. This application provides a visually stunning interface to navigate through AI capabilities, research institutions in India, internship opportunities, and comprehensive learning paths.

## 🌟 Features

- **Interactive 3D Visualizations** - Powered by Three.js with advanced data visualizations
- **Dynamic Content Loading** - Fetches content from a comprehensive JSON database
- **Responsive Design** - Fully functional across all device sizes
- **Smooth Animations** - Rich motion effects using Framer Motion
- **Modern UI/UX** - Award-winning design aesthetics with Tailwind CSS
- **Progress Tracking** - Save your progress through learning paths and resources
- **Search & Filter** - Find exactly what you need across all content types
- **Resource Management** - Bookmark, save, and export valuable resources

## 🚀 Technologies Used

- **React** - Frontend library for building user interfaces
- **TypeScript** - Static type-checking for improved development experience
- **Vite** - Next-generation frontend tooling
- **Three.js** - 3D graphics library for creating immersive visualizations
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - Animation library for React
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Routing for React applications
- **React Icons** - Icon library for React applications
- **Local Storage** - For persistent user data storage

## 📋 Content Sections

1. **AI Capability Enhancement Technologies**
   - Memory and Information Retrieval
   - Agentic Capabilities
   - Other Advanced Capabilities

2. **AI Research in India**
   - Government Institutions
   - Academic Institutions
   - Public-Private Partnerships
   - Industry-Led Research Centers

3. **Internship Opportunities**
   - Application Tips
   - Resume/CV Guidance
   - Direct Outreach Templates
   - 4-Month Action Plan

4. **Learning Paths**
   - AI Capabilities Path
   - Cutting-Edge AI Path
   - Brain & Cognition Path
   - AI & Neuroscience Integration Path
   - Progress Tracking & Bookmarking
   - Topic Search & Filtering

5. **Additional Resources**
   - Academic Courses
   - Book Recommendations
   - RAG Resources
   - Chain-of-Thought Implementation Guide
   - Resource Bookmarking & Export
   - Copy-to-Clipboard & External Links

## 🆕 Recent Updates

### Enhanced Learning Paths Page

The Learning Paths page has been significantly improved with:

- **Progress Tracking System** - Mark topics as completed and bookmark for later
- **Search Functionality** - Search across all learning paths and topics
- **Difficulty Filtering** - Filter paths by difficulty level (beginner to advanced)
- **Interactive UI** - Visual feedback, animations, and better organization
- **Persistent Storage** - Your progress is saved between sessions

See `LEARNING_PATHS_CHANGES.md` for detailed information and `PREVIEW_LEARNING_PATHS.html` for visual previews.

### Enhanced Resources Page

The Resources page now includes:

- **Resource Management** - Bookmark resources and export your collection
- **Advanced Search** - Full-text search with type filtering
- **Interactive Elements** - Copy-to-clipboard, external links, and visual feedback
- **Saved Resources Section** - Quick access to all your bookmarked resources
- **Export Functionality** - Save your collection as a JSON file

See `RESOURCES_PAGE_CHANGES.md` for detailed information and `PREVIEW_RESOURCES.html` for visual previews.

## 🖥️ Development

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Getting Started

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd ai-research-explorer
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🎨 Design Philosophy

This project aims to create an immersive, educational experience through:

- **Dynamic 3D Visualizations** - Making complex data relationships intuitive
- **Motion-Rich Interfaces** - Using animation to guide attention and create engagement
- **Intuitive Navigation** - Ensuring users can easily explore the content depth
- **Visually Distinct Sections** - Using color theory and spatial design to differentiate content areas
- **Accessibility Focus** - Ensuring content is accessible despite rich visual elements
- **Personal Progress** - Allowing users to track their learning journey
- **Resource Management** - Helping users organize and save valuable resources

## 📱 Responsive Behavior

The application is designed to work across:
- Desktop (1200px+)
- Tablet (768px+)
- Mobile (< 768px)

3D visualizations gracefully degrade on smaller devices to maintain performance.

## 🔄 Data Management

Content is loaded from a structured JSON database, allowing for easy updates and extensions without changing the codebase. User progress and saved resources are stored in localStorage for persistence between sessions.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
