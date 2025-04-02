import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Layout from './components/layout/Layout'
import Loader from './components/ui/Loader'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const AICapabilities = lazy(() => import('./pages/AICapabilities'))
const IndiaResearch = lazy(() => import('./pages/IndiaResearch'))
const Internships = lazy(() => import('./pages/Internships'))
const LearningPaths = lazy(() => import('./pages/LearningPaths'))
const Resources = lazy(() => import('./pages/Resources'))

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="capabilities" element={<AICapabilities />} />
          <Route path="india-research" element={<IndiaResearch />} />
          <Route path="internships" element={<Internships />} />
          <Route path="learning-paths" element={<LearningPaths />} />
          <Route path="resources" element={<Resources />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
