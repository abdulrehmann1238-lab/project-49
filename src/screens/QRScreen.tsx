import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { 
  ArrowLeft, 
  QrCode, 
  Camera, 
  Sparkles, 
  CheckCircle, 
  Maximize,
  ShieldCheck
} from 'lucide-react';

export const QRScreen: React.FC = () => {
  const { setScreen, addPoints } = useAppStore();
  const [activeTab, setActiveTab] = useState<'scan' | 'my-code'>('scan');
  const [isScanning, setIsScanning] = useState(true);
  const [scanSuccess, setScanSuccess] = useState(false);

  useEffect(() => {
    if (activeTab === 'scan' && isScanning) {
      // Simulate scan completion after 3 seconds
      const timer = setTimeout(() => {
        setScanSuccess(true);
        setIsScanning(false);
        addPoints(50); // Scan bonus!
        
        setTimeout(() => {
          setScanSuccess(false);
          setIsScanning(true);
          setScreen('loyalty'); // Route to rewards where points were added
        }, 1500);
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [activeTab, isScanning, setScreen, addPoints]);

  const handleBack = () => {
    setScreen('dashboard');
  };

  return (
    <div className="absolute inset-0 bg-[#1E201E] text-white z-40 flex flex-col justify-between overflow-hidden text-left">
      
      {/* Top Header */}
      <div className="pt-12 pb-3 px-5 border-b border-neutral-800 bg-neutral-900/90 backdrop-blur-md flex items-center justify-between z-10">
        <div className="flex items-center space-x-3.5">
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white hover:opacity-85 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div>
            <h3 className="text-sm font-extrabold leading-tight">Rooted QR Portal</h3>
            <span className="text-[9px] text-brand-sage font-bold">Fast Merchant Interactions</span>
          </div>
        </div>

        {/* Tab switch inside scanner */}
        <div className="bg-neutral-800 p-0.75 rounded-xl flex">
          <button
            onClick={() => {
              setActiveTab('scan');
              setIsScanning(true);
            }}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition ${
              activeTab === 'scan' ? 'bg-brand-sage text-brand-charcoal' : 'text-zinc-400'
            }`}
          >
            Scan
          </button>
          <button
            onClick={() => setActiveTab('my-code')}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition ${
              activeTab === 'my-code' ? 'bg-brand-sage text-brand-charcoal' : 'text-zinc-400'
            }`}
          >
            My QR
          </button>
        </div>
      </div>

      {/* Main scanning screen canvas */}
      <div className="flex-1 w-full relative flex items-center justify-center bg-black">
        <AnimatePresence mode="wait">
          
          {/* CAMERA SCANNER SIMULATION */}
          {activeTab === 'scan' && (
            <motion.div
              key="scan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6"
            >
              {/* Simulated camera feed representation (dimmed borders and clear center) */}
              <div className="absolute inset-0 bg-neutral-950/60 z-0 pointer-events-none" />
              
              {/* Scan box frame */}
              <div className="relative w-56 h-56 z-10 flex items-center justify-center">
                
                {/* Corner guide brackets (CSS borders) */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-brand-sage rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-brand-sage rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-brand-sage rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-brand-sage rounded-br-lg" />

                {/* Laser scan line anim */}
                {isScanning && (
                  <motion.div
                    animate={{ y: [-100, 100, -100] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-3 right-3 h-[2px] bg-brand-sage shadow-[0_0_12px_#B2C4B2]"
                  />
                )}

                {/* Simulated merchant QR inside frame */}
                <div className="w-48 h-48 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center p-4">
                  <QrCode className={`w-36 h-36 stroke-[1] text-white ${isScanning ? 'animate-pulse opacity-50' : 'opacity-100'}`} />
                </div>

                {/* Success checkmark pop */}
                {scanSuccess && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute inset-0 bg-brand-charcoal/90 rounded-2xl flex flex-col items-center justify-center space-y-2 z-20"
                  >
                    <CheckCircle className="w-12 h-12 text-brand-sage fill-brand-sage/10 animate-bounce" />
                    <span className="text-xs font-bold text-brand-sage">Scan Verified (+50 XP)</span>
                  </motion.div>
                )}
              </div>

              {/* Instructions bottom overlay */}
              <div className="mt-8 text-center max-w-[200px] z-10">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
                  {scanSuccess 
                    ? 'Processing coupon check...' 
                    : 'Position any merchant QR code within the frame to claim rewards'
                  }
                </span>
              </div>
            </motion.div>
          )}

          {/* MY PERSONAL CODE DISPLAY */}
          {activeTab === 'my-code' && (
            <motion.div
              key="my-code"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-brand-charcoal"
            >
              <div className="bg-white p-6 rounded-[32px] shadow-premium-lg flex flex-col items-center space-y-4 max-w-[260px] text-brand-charcoal text-center">
                <div className="flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4 text-brand-forest" />
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-stone">Rooted Network Pass</span>
                </div>
                
                {/* Visual Premium QR Code */}
                <div className="w-40 h-40 border border-brand-sand/30 p-2.5 rounded-2xl flex items-center justify-center">
                  <svg className="w-full h-full text-brand-charcoal" viewBox="0 0 100 100" fill="currentColor">
                    <rect width="100" height="100" fill="none" />
                    {/* Concentric grid lines simulating high-end design QR */}
                    <rect x="10" y="10" width="25" height="25" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                    <rect x="15" y="15" width="15" height="15" rx="2" />
                    
                    <rect x="65" y="10" width="25" height="25" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                    <rect x="70" y="15" width="15" height="15" rx="2" />

                    <rect x="10" y="65" width="25" height="25" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                    <rect x="15" y="70" width="15" height="15" rx="2" />
                    
                    {/* Randomized dot patterns inside QR code */}
                    <rect x="45" y="15" width="8" height="8" rx="1" />
                    <rect x="55" y="25" width="6" height="6" rx="1" />
                    <rect x="40" y="45" width="12" height="6" rx="1" />
                    <rect x="45" y="60" width="6" height="14" rx="1" />
                    <rect x="70" y="45" width="14" height="6" rx="1" />
                    <rect x="65" y="65" width="8" height="8" rx="1" />
                    <rect x="75" y="75" width="12" height="12" rx="2" />
                  </svg>
                </div>

                <div>
                  <h4 className="text-xs font-black">Alex Mercer</h4>
                  <p className="text-[9px] text-brand-stone font-semibold mt-0.5">Gold Tier ID: #RTD-8829</p>
                </div>
              </div>

              <div className="mt-6 text-center max-w-[200px]">
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
                  Present this pass to any cashier at check-out to earn local points
                </span>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
};
export default QRScreen;
