import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

export const LoadingScreen: React.FC = () => {
  const setScreen = useAppStore((state) => state.setScreen);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScreen('splash');
    }, 3800);
    return () => clearTimeout(timer);
  }, [setScreen]);

  return (
    <div className="absolute inset-0 bg-brand-cream dark:bg-dark-bg flex flex-col items-center justify-center p-6 z-50 overflow-hidden">
      
      {/* Wave animated background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-10">
        <motion.div
          animate={{
            scale: [1, 1.05, 0.95, 1],
            x: [0, 15, -15, 0],
            y: [0, -20, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-brand-sage blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 0.9, 1.1, 1],
            x: [0, -20, 15, 0],
            y: [0, 15, -15, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          className="absolute -bottom-12 -left-12 w-80 h-80 rounded-full bg-brand-ocean blur-3xl"
        />
      </div>

      <div className="z-10 flex flex-col items-center justify-center">
        {/* Geometric Root Growth Logo Reveal */}
        <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
          
          {/* Animated concentric growth rings */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.15 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-[1.5px] border-brand-forest dark:border-brand-sage"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.25 }}
            transition={{ duration: 1.8, delay: 0.4, ease: "easeOut" }}
            className="absolute w-16 h-16 rounded-full border-[1px] border-brand-forest dark:border-brand-sage"
          />
          
          {/* Main growing root nodes (SVG drawing effect) */}
          <svg className="w-16 h-16 text-brand-forest dark:text-brand-sage" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Trunk */}
            <motion.path
              d="M50 85V45"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            {/* Left Branch */}
            <motion.path
              d="M50 55C40 50 30 35 32 25"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeInOut" }}
            />
            {/* Right Branch */}
            <motion.path
              d="M50 48C60 45 70 32 68 22"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 1.2, ease: "easeInOut" }}
            />
            {/* Top Leaf Node */}
            <motion.circle
              cx="50"
              cy="25"
              r="6"
              fill="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 1.6 }}
            />
            {/* Left Leaf Node */}
            <motion.circle
              cx="32"
              cy="25"
              r="4.5"
              fill="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 1.9 }}
            />
            {/* Right Leaf Node */}
            <motion.circle
              cx="68"
              cy="22"
              r="4.5"
              fill="currentColor"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 2.2 }}
            />
          </svg>
        </div>

        {/* Elegant Logo Text Reveal */}
        <div className="overflow-hidden mb-2.5">
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-extrabold tracking-tight text-brand-charcoal dark:text-white"
          >
            Rooted
          </motion.h2>
        </div>

        {/* Slogan sync */}
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
            className="text-sm tracking-wider uppercase font-semibold text-brand-stone dark:text-dark-muted"
          >
            Stronger together
          </motion.p>
        </div>
      </div>

      {/* Minimal loading dot trail */}
      <div className="absolute bottom-16 flex items-center space-x-2">
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
          className="w-1.5 h-1.5 rounded-full bg-brand-forest dark:bg-brand-sage"
        />
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
          className="w-1.5 h-1.5 rounded-full bg-brand-forest dark:bg-brand-sage"
        />
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
          className="w-1.5 h-1.5 rounded-full bg-brand-forest dark:bg-brand-sage"
        />
      </div>

    </div>
  );
};
export default LoadingScreen;
