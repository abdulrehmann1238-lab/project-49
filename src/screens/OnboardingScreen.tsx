import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { ArrowRight, Compass, MessageCircle, Star } from 'lucide-react';

interface OnboardingSlide {
  title: string;
  description: string;
  badge: string;
  color: string;
  icon: React.ElementType;
}

const slides: OnboardingSlide[] = [
  {
    title: 'Discover Local Excellence',
    description: 'Find premium vetted merchants, artisan craftsmen, and local professionals near you. Filter by values: women-owned, veteran-owned, and verified community businesses.',
    badge: 'Curated Directory',
    color: 'bg-brand-sage/10 text-brand-forest dark:bg-brand-sage/20 dark:text-brand-sage',
    icon: Compass
  },
  {
    title: 'Deep Community Networking',
    description: 'Connect directly with local business owners. Collaborate on projects, share community referrals, request mentorship, or chat instantly inside our messaging suite.',
    badge: 'Owner Alliances',
    color: 'bg-brand-ocean/10 text-brand-ocean dark:bg-brand-ocean/20 dark:text-sky',
    icon: MessageCircle
  },
  {
    title: 'Rewarding Local Loyalty',
    description: 'Support independent shops and gain valuable Rooted Points. Redeem coupons, earn exclusive merchant badges, and play interactive games to claim daily rewards.',
    badge: 'Loyalty Ecosystem',
    color: 'bg-brand-gold/10 text-brand-gold dark:bg-brand-gold/25 dark:text-brand-gold',
    icon: Star
  }
];

export const OnboardingScreen: React.FC = () => {
  const { onboardingStep, nextOnboardingStep, prevOnboardingStep, setScreen } = useAppStore();

  const currentSlide = slides[onboardingStep];
  const IconComponent = currentSlide.icon;

  // Custom animations for transitions
  const slideVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    active: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { duration: 0.3 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <div className="absolute inset-0 bg-[#FCFAF7] dark:bg-dark-bg flex flex-col justify-between p-7 z-40 overflow-hidden">
      
      {/* Top Header: Skip */}
      <div className="mt-8 flex justify-between items-center z-10">
        {onboardingStep > 0 ? (
          <button 
            onClick={prevOnboardingStep}
            className="text-xs font-bold text-brand-stone dark:text-dark-muted hover:opacity-80 transition"
          >
            Back
          </button>
        ) : (
          <div />
        )}
        <button 
          onClick={() => setScreen('login')}
          className="text-xs font-bold text-brand-stone dark:text-dark-muted hover:opacity-80 transition"
        >
          Skip to login
        </button>
      </div>

      {/* Main slide display with anims */}
      <div className="my-auto z-10 relative h-[480px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={onboardingStep} mode="wait">
          <motion.div
            key={onboardingStep}
            custom={onboardingStep}
            variants={slideVariants}
            initial="initial"
            animate="active"
            exit="exit"
            className="w-full flex flex-col items-center text-center px-2"
          >
            {/* Visual Icon card representation */}
            <div className={`w-28 h-28 rounded-[32px] ${currentSlide.color} flex items-center justify-center shadow-inner-soft mb-8 relative`}>
              
              {/* Pulsing ring background */}
              <div className="absolute inset-0 rounded-[32px] border border-current opacity-20 scale-125 animate-pulse-slow" />
              
              <IconComponent className="w-12 h-12 stroke-[1.5]" />
            </div>

            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full mb-4 inline-block ${currentSlide.color}`}>
              {currentSlide.badge}
            </span>

            <h2 className="text-2xl font-extrabold tracking-tight text-brand-charcoal dark:text-white mb-4 leading-tight">
              {currentSlide.title}
            </h2>

            <p className="text-sm text-brand-stone dark:text-dark-muted leading-relaxed font-medium max-w-[280px]">
              {currentSlide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Indicators & Actions */}
      <div className="mb-6 z-10 w-full flex flex-col items-center">
        
        {/* Progress dots bar */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          {slides.map((_, index) => (
            <div
              key={index}
              onClick={() => {
                // Navigate directly to step
                useAppStore.setState({ onboardingStep: index });
              }}
              className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${onboardingStep === index ? 'w-6 bg-brand-forest dark:bg-brand-sage' : 'w-1.5 bg-brand-sand dark:bg-dark-border'}`}
            />
          ))}
        </div>

        {/* Action Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          onClick={nextOnboardingStep}
          className="w-full py-4 px-6 rounded-2xl bg-brand-charcoal dark:bg-brand-warmWhite hover:bg-neutral-800 dark:hover:bg-neutral-100 text-white dark:text-brand-charcoal font-semibold text-sm flex items-center justify-between shadow-premium transition group"
        >
          <span>{onboardingStep === 2 ? 'Let\'s get started' : 'Continue'}</span>
          <div className="w-7 h-7 rounded-xl bg-brand-forest/20 dark:bg-brand-charcoal/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="w-4 h-4 text-white dark:text-brand-charcoal" />
          </div>
        </motion.button>
      </div>

    </div>
  );
};
export default OnboardingScreen;
