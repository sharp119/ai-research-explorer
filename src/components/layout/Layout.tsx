import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import { DataProvider } from '../../store/DataContext';

const Layout = () => {
  const { pathname } = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return (
    <DataProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <AnimatePresence mode="wait">
          <motion.main 
            key={pathname}
            className="flex-grow pt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        
        <Footer />
      </div>
    </DataProvider>
  );
};

export default Layout;
