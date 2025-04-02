import { ReactNode, useEffect, useRef, useState } from 'react';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'framer-motion';

// Animation variants
const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    }
  }
};

const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.6 
    }
  }
};

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const fadeInDownVariants: Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6 
    }
  }
};

const fadeInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6 
    }
  }
};

const fadeInRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6 
    }
  }
};

const zoomInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5 
    }
  }
};

const animations = {
  default: defaultVariants,
  staggerContainer: staggerContainerVariants,
  fadeIn: fadeInVariants,
  fadeInUp: fadeInUpVariants,
  fadeInDown: fadeInDownVariants,
  fadeInLeft: fadeInLeftVariants,
  fadeInRight: fadeInRightVariants,
  zoomIn: zoomInVariants,
};

type AnimationType = keyof typeof animations;

interface ScrollAnimationProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  once?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
}

const ScrollAnimation = ({
  children,
  animation = 'default',
  delay = 0,
  duration,
  threshold = 0.1,
  className = '',
  once = true,
  stagger = false,
  staggerDelay = 0.1,
}: ScrollAnimationProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once, 
    amount: threshold,
  });
  
  // Get the correct animation variant
  const variant = animations[animation];
  
  // Custom transition based on props
  const customTransition = {
    delay,
    duration,
  };
  
  // Apply custom transition if provided
  const customVariant = duration || delay ? {
    ...variant,
    visible: {
      ...variant.visible,
      transition: {
        ...variant.visible.transition,
        ...customTransition,
      }
    }
  } : variant;
  
  // Apply stagger config if needed
  const staggerVariant = stagger ? {
    ...staggerContainerVariants,
    visible: {
      ...staggerContainerVariants.visible,
      transition: {
        ...staggerContainerVariants.visible.transition,
        staggerChildren: staggerDelay,
        delayChildren: delay,
      }
    }
  } : customVariant;
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, isInView, once]);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={staggerVariant}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimation;

// Export a child component for use with stagger containers
export const ScrollAnimationItem = ({ 
  children, 
  animation = 'fadeInUp',
  delay = 0,
  className = ''
}: Omit<ScrollAnimationProps, 'once' | 'threshold' | 'stagger' | 'staggerDelay'>) => {
  const variant = animations[animation];
  
  return (
    <motion.div 
      variants={variant}
      className={className}
      style={{ transition: `delay ${delay}s` }}
    >
      {children}
    </motion.div>
  );
};
