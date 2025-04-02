import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Check if we're on a touch device
  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  useEffect(() => {
    if (isTouchDevice()) {
      setHidden(true);
      return;
    }

    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      
      // Track window resize for cursor hiding
      window.addEventListener('resize', onResize);
      
      // Track link hovering
      const links = document.querySelectorAll('a, button, [role="button"]');
      links.forEach(link => {
        link.addEventListener('mouseenter', onLinkMouseEnter);
        link.addEventListener('mouseleave', onLinkMouseLeave);
      });
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      
      window.removeEventListener('resize', onResize);
      
      const links = document.querySelectorAll('a, button, [role="button"]');
      links.forEach(link => {
        link.removeEventListener('mouseenter', onLinkMouseEnter);
        link.removeEventListener('mouseleave', onLinkMouseLeave);
      });
    };

    // Update cursor position based on mouse movement
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Show cursor when mouse enters window
    const onMouseEnter = () => {
      setHidden(false);
    };

    // Hide cursor when mouse leaves window
    const onMouseLeave = () => {
      setHidden(true);
    };

    // Animate cursor when clicking
    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };
    
    // Track window size for responsive hiding
    const onResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    // Handle link hovering
    const onLinkMouseEnter = () => {
      setLinkHovered(true);
    };
    
    const onLinkMouseLeave = () => {
      setLinkHovered(false);
    };

    // Add listeners
    addEventListeners();
    
    // Apply cursor style to body
    document.body.style.cursor = 'none';

    // Cleanup
    return () => {
      removeEventListeners();
      document.body.style.cursor = 'auto';
    };
  }, []);

  // Hide cursor on small screens
  useEffect(() => {
    if (windowSize.width <= 768) {
      setHidden(true);
    }
  }, [windowSize]);
  
  // Don't render on touch devices or when hidden
  if (hidden || isTouchDevice()) {
    return null;
  }

  return (
    <>
      {/* Main dot cursor */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-primary-500 rounded-full pointer-events-none z-[999] mix-blend-difference"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          scale: clicked ? 0.5 : linkHovered ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          mass: 0.3,
          stiffness: 500,
          damping: 28,
        }}
      />
      
      {/* Circle follower with delay */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-primary-400 rounded-full pointer-events-none z-[998] opacity-60"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          scale: clicked ? 0.7 : linkHovered ? 1.6 : 1,
          opacity: clicked ? 0.2 : linkHovered ? 0.5 : 0.6,
        }}
        transition={{
          type: "spring",
          mass: 0.8,
          stiffness: 200,
          damping: 20,
          delay: 0.02,
        }}
      />
      
      {/* Outer ring highlight effect */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 rounded-full pointer-events-none z-[997]"
        style={{
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
        }}
        animate={{
          x: position.x - 48,
          y: position.y - 48,
          scale: clicked ? 0.5 : linkHovered ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          mass: 1,
          stiffness: 150,
          damping: 15,
          delay: 0.04,
        }}
      />
    </>
  );
};

export default CustomCursor;
