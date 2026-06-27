import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { 
  ScanFace, 
  Fingerprint, 
  Mail, 
  Phone, 
  ArrowRight,
  ShieldAlert,
  CheckCircle2
} from 'lucide-react';

export const LoginScreen: React.FC = () => {
  const login = useAppStore((state) => state.login);
  
  const [email, setEmail] = useState('alex.mercer@community.com');
  const [phone, setPhone] = useState('(555) 019-2834');
  const [activeBiometric, setActiveBiometric] = useState<'face' | 'finger' | null>(null);
  const [biometricStatus, setBiometricStatus] = useState<'scanning' | 'success' | 'idle'>('idle');

  // Trigger Biometric Scanner animation
  const handleBiometricTrigger = (type: 'face' | 'finger') => {
    setActiveBiometric(type);
    setBiometricStatus('scanning');
    
    // Simulate scan duration
    setTimeout(() => {
      setBiometricStatus('success');
      // Complete login after success checkmark shows
      setTimeout(() => {
        login();
        setActiveBiometric(null);
        setBiometricStatus('idle');
      }, 1200);
    }, 2200);
  };

  const handlePasswordlessLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email || phone) {
      login();
    }
  };

  return (
    <div className="absolute inset-0 bg-[#FCFAF7] dark:bg-dark-bg flex flex-col justify-between p-7 z-40 overflow-hidden">
      
      {/* Top Graphic decoration */}
      <div className="absolute top-0 right-0 w-36 h-36 rounded-full bg-brand-sage/10 blur-2xl pointer-events-none" />

      {/* Brand logo top spacing */}
      <div className="mt-8 flex flex-col items-center">
        <div className="w-11 h-11 rounded-2xl bg-brand-forest dark:bg-brand-sage flex items-center justify-center shadow-premium mb-3">
          <span className="text-white text-lg font-bold">R</span>
        </div>
        <h2 className="text-xl font-extrabold tracking-tight text-brand-charcoal dark:text-white">Welcome to Rooted</h2>
        <p className="text-xs text-brand-stone dark:text-dark-muted font-semibold mt-1">Join the community network</p>
      </div>

      {/* Login forms */}
      <div className="my-auto z-10 w-full space-y-4 px-2">
        <form onSubmit={handlePasswordlessLogin} className="space-y-3.5">
          {/* Email input field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-stone dark:text-dark-muted opacity-65">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/35 dark:border-dark-border text-xs font-semibold focus:outline-none focus:border-brand-sage dark:focus:border-brand-sage transition duration-200"
            />
          </div>

          {/* Phone input field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-stone dark:text-dark-muted opacity-65">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/35 dark:border-dark-border text-xs font-semibold focus:outline-none focus:border-brand-sage dark:focus:border-brand-sage transition duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={!email && !phone}
            className={`w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 transition shadow-premium ${
              email || phone 
                ? 'bg-brand-charcoal hover:bg-neutral-800 text-white dark:bg-brand-warmWhite dark:text-brand-charcoal dark:hover:bg-neutral-100' 
                : 'bg-brand-sand/40 text-brand-stone/60 dark:bg-dark-card dark:text-dark-muted dark:border dark:border-dark-border cursor-not-allowed'
            }`}
          >
            <span>Sign in with code</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Separator line */}
        <div className="flex items-center justify-between text-[10px] text-brand-stone/50 dark:text-dark-muted/50 font-bold uppercase tracking-wider py-1">
          <div className="w-[30%] h-[1px] bg-brand-sand/30 dark:bg-dark-border" />
          <span>Biometric & Guest</span>
          <div className="w-[30%] h-[1px] bg-brand-sand/30 dark:bg-dark-border" />
        </div>

        {/* Biometrics Actions */}
        <div className="flex justify-between items-center space-x-3">
          <button
            onClick={() => handleBiometricTrigger('face')}
            className="flex-1 py-3 px-4 rounded-2xl bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/20 dark:border-dark-border hover:bg-brand-sand/15 dark:hover:bg-dark-border transition flex flex-col items-center justify-center space-y-1 shadow-premium group"
          >
            <ScanFace className="w-5 h-5 text-brand-forest dark:text-brand-sage group-hover:scale-105 transition-transform" />
            <span className="text-[10px] font-bold text-brand-charcoal dark:text-white">Face ID</span>
          </button>
          
          <button
            onClick={() => handleBiometricTrigger('finger')}
            className="flex-1 py-3 px-4 rounded-2xl bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/20 dark:border-dark-border hover:bg-brand-sand/15 dark:hover:bg-dark-border transition flex flex-col items-center justify-center space-y-1 shadow-premium group"
          >
            <Fingerprint className="w-5 h-5 text-brand-ocean dark:text-sky group-hover:scale-105 transition-transform" />
            <span className="text-[10px] font-bold text-brand-charcoal dark:text-white">Fingerprint</span>
          </button>
        </div>

        {/* Apple & Google Sign-In Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-1">
          <button 
            onClick={login}
            className="py-3 px-3 rounded-2xl bg-brand-cream dark:bg-dark-card border border-brand-sand/25 dark:border-dark-border text-[10px] font-bold text-brand-charcoal dark:text-white flex items-center justify-center space-x-1.5"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-6.887 4.114-4.831 0-8.77-3.896-8.77-8.714 0-4.818 3.939-8.714 8.77-8.714 2.215 0 4.218.803 5.776 2.348l3.078-3.077C18.17 1.053 15.398 0 12.24 0c-6.63 0-12 5.37-12 12s5.37 12 12 12c6.262 0 11.52-4.437 11.52-12 0-.825-.098-1.575-.28-1.714H12.24z"/></svg>
            <span>Google</span>
          </button>
          <button 
            onClick={login}
            className="py-3 px-3 rounded-2xl bg-brand-cream dark:bg-dark-card border border-brand-sand/25 dark:border-dark-border text-[10px] font-bold text-brand-charcoal dark:text-white flex items-center justify-center space-x-1.5"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-.99 2.94.1.08 2.16.88 2.82-1.33z"/></svg>
            <span>Apple</span>
          </button>
        </div>
      </div>

      {/* Guest Mode & Privacy bottom */}
      <div className="mb-6 z-10 text-center flex flex-col items-center">
        <button
          onClick={login}
          className="text-xs font-bold text-brand-forest dark:text-brand-sage hover:underline"
        >
          Continue as Guest
        </button>
        <span className="text-[9px] text-brand-stone/40 dark:text-dark-muted/40 font-medium max-w-[240px] mt-2">
          By signing in, you agree to our local networking covenant and privacy policies.
        </span>
      </div>

      {/* INTERACTIVE BIOMETRICS SCANNING MODAL */}
      <AnimatePresence>
        {activeBiometric && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-charcoal/80 dark:bg-black/90 z-50 flex items-center justify-center p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-brand-cream dark:bg-neutral-900 border border-brand-sand/10 dark:border-neutral-800 p-8 rounded-[36px] flex flex-col items-center justify-center text-center shadow-premium-lg max-w-xs w-full"
            >
              <div className="relative w-28 h-28 flex items-center justify-center mb-6">
                
                {/* SCANNING ACTIVE INDICATORS */}
                {biometricStatus === 'scanning' && (
                  <>
                    {/* Ring scanner border */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 rounded-full border-4 border-t-brand-forest border-brand-sand/10 dark:border-t-brand-sage dark:border-neutral-800"
                    />
                    
                    {/* Scanning radar line overlay */}
                    <motion.div
                      animate={{ y: [-40, 40, -40] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-4 right-4 h-[1px] bg-brand-forest dark:bg-brand-sage opacity-75 shadow-[0_0_10px_#B2C4B2]"
                    />
                  </>
                )}

                {/* SUCCESS ANIMATION RINGS */}
                {biometricStatus === 'success' && (
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    className="absolute inset-0 rounded-full bg-brand-sage/10 dark:bg-brand-sage/5 flex items-center justify-center"
                  />
                )}

                {/* Biometric Main icons */}
                <AnimatePresence mode="wait">
                  {biometricStatus === 'scanning' ? (
                    <motion.div
                      key="scanning-icon"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className="text-brand-charcoal dark:text-white"
                    >
                      {activeBiometric === 'face' ? (
                        <ScanFace className="w-14 h-14 stroke-[1.2] text-brand-forest dark:text-brand-sage" />
                      ) : (
                        <Fingerprint className="w-14 h-14 stroke-[1.2] text-brand-ocean dark:text-sky" />
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success-icon"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1.1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      className="text-brand-forest dark:text-brand-sage"
                    >
                      <CheckCircle2 className="w-16 h-16 fill-brand-sage/20" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <h3 className="text-base font-extrabold text-brand-charcoal dark:text-white mb-2">
                {biometricStatus === 'scanning' 
                  ? `Authenticating ${activeBiometric === 'face' ? 'Face ID' : 'Fingerprint'}`
                  : 'Authentication Success'
                }
              </h3>
              
              <p className="text-xs text-brand-stone dark:text-dark-muted font-medium">
                {biometricStatus === 'scanning'
                  ? 'Verify your biometrics to sign in securely'
                  : 'Accessing local community profile...'
                }
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default LoginScreen;
