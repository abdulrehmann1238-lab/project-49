import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, ScreenType } from '../store/useAppStore';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Home, 
  Search, 
  Users, 
  Award, 
  User, 
  Bell, 
  Moon, 
  Sun,
  ShieldCheck,
  Zap,
  MessageSquare
} from 'lucide-react';

interface PhoneShellProps {
  children: React.ReactNode;
}

export const PhoneShell: React.FC<PhoneShellProps> = ({ children }) => {
  const { 
    currentScreen, 
    setScreen, 
    activeNotification, 
    clearActiveNotification, 
    darkMode, 
    toggleDarkMode,
    isLoggedIn
  } = useAppStore();

  const [time, setTime] = useState('');

  // Ticking time effect for status bar
  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Automatically dismiss Dynamic Island notification after 4.5 seconds
  useEffect(() => {
    if (activeNotification) {
      const timer = setTimeout(() => {
        clearActiveNotification();
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [activeNotification, clearActiveNotification]);

  // Tab configurations
  const tabs: { id: ScreenType; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'directory', label: 'Explore', icon: Search },
    { id: 'networking', label: 'Feed', icon: Users },
    { id: 'loyalty', label: 'Rewards', icon: Award },
    { id: 'dashboard', label: 'Profile', icon: User },
  ];

  const showNavbar = isLoggedIn && ![
    'loading', 
    'splash', 
    'onboarding', 
    'login'
  ].includes(currentScreen);

  // Dynamic Island Notification Icon
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reward':
        return <Zap className="w-5 h-5 text-brand-gold fill-brand-gold animate-bounce" />;
      case 'networking':
        return <MessageSquare className="w-5 h-5 text-brand-sage animate-pulse" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-brand-ocean" />;
    }
  };

  return (
    <div className={`min-h-[100dvh] w-full flex flex-col md:flex-row items-center justify-center p-0 md:p-8 select-none transition-colors duration-500 ${darkMode ? 'bg-zinc-950 text-dark-text' : 'bg-[#FAF8F5] text-brand-charcoal'}`}>
      
      {/* App Simulator Info Panel (Left Side on Desktop) */}
      <div className="hidden md:flex mb-6 md:mb-0 md:mr-12 md:max-w-xs text-center md:text-left flex-col items-center md:items-start">
        <div className="flex items-center space-x-2 bg-brand-forest/10 dark:bg-brand-sage/10 px-3.5 py-1.5 rounded-full mb-3">
          <span className="w-2 h-2 rounded-full bg-brand-forest dark:bg-brand-sage animate-ping" />
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-forest dark:text-brand-sage">Interactive Demo</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight mb-2">Rooted.</h1>
        <p className="text-sm opacity-70 mb-4">
          A premium local business community ecosystem. Experience high-end micro-interactions, smooth scrolling animations, and beautiful layouts.
        </p>

        {/* Global Control Widget */}
        <div className="bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/40 dark:border-dark-border p-4 rounded-2xl w-full max-w-xs text-left shadow-premium">
          <div className="text-xs font-bold text-brand-stone dark:text-dark-muted uppercase tracking-wider mb-3">Simulator Settings</div>
          <button 
            onClick={toggleDarkMode}
            className="flex items-center justify-between w-full p-2.5 rounded-xl bg-brand-cream dark:bg-dark-bg border border-brand-sand/20 dark:border-dark-border hover:bg-brand-sand/10 dark:hover:bg-dark-border transition"
          >
            <div className="flex items-center space-x-2.5">
              {darkMode ? <Sun className="w-4.5 h-4.5 text-brand-gold" /> : <Moon className="w-4.5 h-4.5 text-brand-stone" />}
              <span className="text-xs font-medium">Dark Mode Toggle</span>
            </div>
            <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 ${darkMode ? 'bg-brand-sage' : 'bg-brand-sand'}`}>
              <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-300 ${darkMode ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
          </button>

          <div className="mt-3.5 text-[11px] opacity-60 leading-relaxed">
            💡 <span className="font-semibold">Tip:</span> Tap Face ID or Spin the Rewards Wheel to experience premium UI animations!
          </div>
        </div>
      </div>

      {/* Main iPhone 15 Pro Frame */}
      <div className="relative w-full h-[100dvh] md:w-[385px] md:h-[812px] md:rounded-[55px] md:p-[12px] md:bg-gradient-to-br md:from-zinc-800 md:to-zinc-950 md:border-[4px] md:border-zinc-700 md:shadow-[0_25px_60px_-15px_rgba(40,30,20,0.22)] dark:md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] md:flex-shrink-0 transition-transform duration-500 hover:scale-[1.01]">
        
        {/* Physical buttons styling */}
        <div className="hidden md:block absolute top-[120px] -left-[16px] w-[4px] h-[40px] bg-zinc-800 rounded-l" />
        <div className="hidden md:block absolute top-[175px] -left-[16px] w-[4px] h-[55px] bg-zinc-800 rounded-l" />
        <div className="hidden md:block absolute top-[240px] -left-[16px] w-[4px] h-[55px] bg-zinc-800 rounded-l" />
        <div className="hidden md:block absolute top-[190px] -right-[16px] w-[4px] h-[75px] bg-zinc-800 rounded-r" />

        {/* Screen Container */}
        <div className={`relative w-full h-full rounded-none md:rounded-[44px] overflow-hidden flex flex-col transition-colors duration-500 ${darkMode ? 'bg-dark-bg' : 'bg-brand-cream'}`}>
          
          {/* Status Bar */}
          <div className="relative z-50 h-11 hidden md:flex items-center justify-between px-7 select-none text-[13px] font-semibold text-brand-charcoal dark:text-dark-text bg-transparent">
            <div>{time || '9:41 AM'}</div>
            
            {/* Battery / Wifi Signals right align */}
            <div className="flex items-center space-x-2">
              <Signal className="w-3.5 h-3.5" />
              <Wifi className="w-3.5 h-3.5" />
              <div className="flex items-center space-x-0.5">
                <span className="text-[10px] font-bold">84%</span>
                <Battery className="w-4 h-4 rotate-0" />
              </div>
            </div>
          </div>

          {/* DYNAMIC ISLAND (Notification Pill) */}
          <div className="absolute top-2 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              {activeNotification ? (
                /* Expanded Dynamic Island Notification banner */
                <motion.div
                  initial={{ width: 110, height: 28, borderRadius: 99 }}
                  animate={{ 
                    width: 340, 
                    height: 80, 
                    borderRadius: 24,
                    transition: { type: "spring", stiffness: 260, damping: 25 }
                  }}
                  exit={{ 
                    width: 110, 
                    height: 28, 
                    borderRadius: 99, 
                    transition: { duration: 0.2 } 
                  }}
                  className="bg-brand-charcoal text-white dark:bg-neutral-900 border border-neutral-800 shadow-xl flex items-center px-4 py-3 space-x-3 pointer-events-auto cursor-pointer"
                  onClick={clearActiveNotification}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5">
                    {getNotificationIcon(activeNotification.type)}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="text-xs font-bold text-brand-sage leading-none mb-1">{activeNotification.title}</div>
                    <div className="text-[11px] text-zinc-300 font-medium truncate leading-tight">{activeNotification.body}</div>
                  </div>
                  <div className="text-[9px] text-zinc-500 font-semibold self-start mt-0.5">now</div>
                </motion.div>
              ) : (
                /* Collapsed Standard Dynamic Island */
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-[110px] h-[28px] bg-brand-charcoal dark:bg-neutral-950 rounded-full hidden md:flex items-center justify-center shadow-inner-soft"
                >
                  {/* Camera hole simulation inside pill */}
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 absolute left-4" />
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-900/40 absolute right-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Active Screen Rendering Box */}
          <div className="flex-1 w-full overflow-hidden flex flex-col relative">
            {children}
          </div>

          {/* BOTTOM NAVIGATION TAB BAR */}
          {showNavbar && (
            <div className="border-t border-brand-sand/30 dark:border-dark-border px-4 pt-2 pb-5 bg-brand-warmWhite/90 dark:bg-dark-card/90 backdrop-blur-md relative z-40">
              <div className="flex justify-between items-center px-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = currentScreen === tab.id || 
                    (tab.id === 'dashboard' && ['dashboard', 'chat', 'qr', 'membership'].includes(currentScreen));

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setScreen(tab.id)}
                      className="flex flex-col items-center justify-center w-12 py-1 relative group"
                    >
                      <div className="relative">
                        <Icon className={`w-5.5 h-5.5 transition-transform duration-300 group-active:scale-90 ${isActive ? 'text-brand-forest dark:text-brand-sage scale-105' : 'text-brand-stone/60 dark:text-dark-muted'}`} />
                        {isActive && (
                          <motion.div 
                            layoutId="activeIndicator"
                            className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full bg-brand-forest dark:bg-brand-sage" 
                          />
                        )}
                      </div>
                      <span className={`text-[9px] font-semibold mt-1 tracking-wider uppercase transition-colors ${isActive ? 'text-brand-forest dark:text-brand-sage font-bold' : 'text-brand-stone/50 dark:text-dark-muted/50'}`}>
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom Physical Home Bar Indicator */}
          <div className="h-6 hidden md:flex items-center justify-center bg-transparent z-40 pointer-events-none select-none">
            <div className="w-32 h-[4px] rounded-full bg-brand-charcoal/20 dark:bg-white/20" />
          </div>

        </div>
      </div>

      {/* App Simulator Info Panel (Right Side on Desktop) */}
      <div className="mt-6 md:mt-0 md:ml-12 hidden lg:flex flex-col max-w-[200px] text-xs space-y-3 opacity-60">
        <div className="font-bold uppercase tracking-wider text-brand-stone dark:text-dark-muted">Demo Milestones</div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-brand-sage" />
          <span>Smooth transitions</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-brand-sage" />
          <span>Face ID morph details</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-brand-sage" />
          <span>Dynamic island events</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-brand-sage" />
          <span>Spin rewards wheel</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-brand-sage" />
          <span>Stripe success invoice</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-brand-sage" />
          <span>Networking conversations</span>
        </div>
      </div>

    </div>
  );
};
export default PhoneShell;
