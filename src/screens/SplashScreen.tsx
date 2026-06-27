import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { ArrowRight } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const setScreen = useAppStore((state) => state.setScreen);

  return (
    <div className="absolute inset-0 bg-[#FCFAF7] dark:bg-dark-bg flex flex-col justify-between p-8 z-40 overflow-hidden">
      
      {/* Decorative vector background */}
      <div className="absolute inset-x-0 top-0 h-[45%] pointer-events-none opacity-30 dark:opacity-10 overflow-hidden">
        <svg className="w-full h-full text-brand-sage" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 C30,40 70,20 100,50 L100,0 L0,0 Z" fill="currentColor" opacity="0.3" />
          <path d="M0,0 C40,25 60,45 100,30 L100,0 L0,0 Z" fill="currentColor" opacity="0.5" />
        </svg>
      </div>

      {/* Top Section: Mini branding */}
      <div className="mt-8 z-10 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-brand-forest dark:bg-brand-sage flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">R</span>
          </div>
          <span className="font-bold tracking-tight text-brand-charcoal dark:text-white text-base">Rooted.</span>
        </div>
        <div className="text-xs font-semibold text-brand-stone dark:text-dark-muted">v1.0.4</div>
      </div>

      {/* Center Section: Core Brand statement */}
      <div className="my-auto z-10 flex flex-col items-start text-left max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4"
        >
          <span className="text-xs font-extrabold uppercase tracking-wider text-brand-forest dark:text-brand-sage bg-brand-forest/5 dark:bg-brand-sage/10 px-3 py-1 rounded-full">
            Ecosystem
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl font-extrabold tracking-tight text-brand-charcoal dark:text-white leading-[1.1] mb-5"
        >
          Cultivating local <br />
          <span className="text-brand-forest dark:text-brand-sage">connections.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-base text-brand-stone dark:text-dark-muted leading-relaxed font-medium"
        >
          Powering independent merchants, professional networking, and neighborhood loyalty with beautiful, human-centric design.
        </motion.p>
      </div>

      {/* Bottom Section: Action button */}
      <div className="mb-6 z-10 w-full flex flex-col items-center">
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setScreen('onboarding')}
          className="w-full py-4 px-6 rounded-2xl bg-brand-charcoal dark:bg-brand-warmWhite hover:bg-neutral-800 dark:hover:bg-neutral-100 text-[#FCFAF7] dark:text-brand-charcoal font-semibold text-sm flex items-center justify-between shadow-premium transition group"
        >
          <span>Begin the experience</span>
          <div className="w-7 h-7 rounded-xl bg-brand-forest/20 dark:bg-brand-charcoal/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="w-4 h-4 text-[#FCFAF7] dark:text-brand-charcoal" />
          </div>
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          onClick={() => {
            // Fast login as guest bypassing onboarding
            useAppStore.getState().login();
          }}
          className="mt-4 text-xs font-bold text-brand-stone dark:text-dark-muted hover:underline"
        >
          Quick Guest Access
        </motion.button>
      </div>

    </div>
  );
};
export default SplashScreen;
