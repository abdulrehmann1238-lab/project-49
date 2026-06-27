import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { 
  Award, 
  Ticket, 
  HelpCircle, 
  Check, 
  Sparkles, 
  RotateCw,
  Gift,
  ShieldCheck
} from 'lucide-react';

export const LoyaltyScreen: React.FC = () => {
  const { userPoints, userCoupons, addCoupon, addPoints } = useAppStore();
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [rotationDegrees, setRotationDegrees] = useState(0);

  const wheelRef = useRef<HTMLDivElement>(null);

  const prizes = [
    { text: 'Elena\'s Pastry Box', business: 'Sage & Stone Cafe', discount: 'Free Sourdough Pastry', code: 'SAGEPASTRY' },
    { text: 'Priya\'s Sound Bath', business: 'Sol Yoga Flow', discount: '20% Off sound healing session', code: 'SOLHEAL20' },
    { text: 'James\' Custom Board', business: 'Forest Oak Woodworks', discount: '$15 Off any customized design', code: 'FOREST15' },
    { text: 'Mateo\'s Seafood Platter', business: 'Ocean Pearl Bistro', discount: 'Free appetizer with 2 entrees', code: 'OCEANAPP' },
    { text: 'Nia\'s Wardrobe Styling', business: 'Roots Heritage Boutique', discount: 'Free styling consultation', code: 'ROOTSSTYLE' },
    { text: 'Elena\'s Cardamom Latte', business: 'Sage & Stone Cafe', discount: 'Buy 1 Get 1 free brew', code: 'SAGELATTE' }
  ];

  const colors = [
    '#B2C4B2', // Sage
    '#4B6B7C', // Ocean
    '#CBD9E0', // Sky
    '#C4A46D', // Gold
    '#D48C70', // Terracotta
    '#7C756B', // Stone
  ];

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSpinResult(null);

    // Pick a random prize index (0 to 5)
    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const selectedPrize = prizes[prizeIndex];

    // Determine final angle: Each segment is 60 degrees (360 / 6).
    // Segment 0 is at index 0, segment 1 is at index 1 etc.
    // Spin around at least 5 full rotations (1800 degrees) plus the segment angle
    const degreesPerSegment = 60;
    const targetDegrees = 1800 + (360 - (prizeIndex * degreesPerSegment)) - (degreesPerSegment / 2);
    
    setRotationDegrees(targetDegrees);

    setTimeout(() => {
      setIsSpinning(false);
      setSpinResult(selectedPrize.discount);

      // Add coupon to user Zustand store
      addCoupon({
        id: `c_${Date.now()}`,
        code: selectedPrize.code,
        businessName: selectedPrize.business,
        discount: selectedPrize.discount
      });
      
      // Deduct/Add points reward
      addPoints(25);

      // Reset rotation state so we can spin again but keep final degree for visual persistence
      setRotationDegrees(targetDegrees % 360);
    }, 4000); // matching transition duration below
  };

  return (
    <div className="flex-1 w-full overflow-y-auto no-scrollbar smooth-scroll px-5 pt-4 pb-8 space-y-6">
      
      {/* Page Title */}
      <div className="mt-3">
        <span className="text-[10px] font-bold text-brand-stone dark:text-dark-muted uppercase tracking-wider">Loyalty Ledger</span>
        <h2 className="text-2xl font-extrabold tracking-tight text-brand-charcoal dark:text-white leading-tight">Your Rewards</h2>
      </div>

      {/* Point Balance Card */}
      <div className="relative rounded-3xl bg-brand-charcoal text-white dark:bg-dark-card border border-neutral-800 p-5 shadow-premium-lg overflow-hidden flex justify-between items-center text-left">
        <div className="absolute top-0 right-0 w-28 h-28 bg-brand-forest/15 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-brand-gold/10 rounded-full blur-xl" />

        <div className="space-y-1 z-10">
          <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest flex items-center space-x-1">
            <Award className="w-3.5 h-3.5 text-brand-gold fill-brand-gold" />
            <span>Rooted Tier status</span>
          </div>
          <h3 className="text-3xl font-extrabold tracking-tight text-brand-sage">{userPoints} pts</h3>
          <p className="text-[10px] text-zinc-400 font-semibold leading-relaxed max-w-[180px]">Earn points with every booking and review. Redeem for local products.</p>
        </div>

        <div className="bg-brand-forest/30 border border-brand-sage/20 py-2.5 px-3.5 rounded-2xl flex flex-col items-center justify-center shadow-premium z-10">
          <span className="text-[16px] font-black text-brand-gold">Gold</span>
          <span className="text-[8px] font-bold text-zinc-300 uppercase tracking-wider mt-0.5">Community level</span>
        </div>
      </div>

      {/* SPIN THE WHEEL MINI GAME */}
      <div className="p-4 bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border rounded-3xl text-center space-y-4 shadow-premium">
        <div>
          <span className="text-[9px] font-extrabold text-brand-stone/60 dark:text-dark-muted uppercase tracking-wider">Daily Scratch & Spin</span>
          <h3 className="text-sm font-extrabold text-brand-charcoal dark:text-white">Interactive Rewards Wheel</h3>
          <p className="text-[10px] text-brand-stone dark:text-dark-muted font-medium mt-0.5">Spin the wheel once a day to win discount coupons from community partners.</p>
        </div>

        {/* Wheel graphics wrapper */}
        <div className="flex flex-col items-center justify-center relative py-4">
          
          {/* Top Pointer arrow */}
          <div className="absolute top-1.5 z-30 transform -translate-x-1/2 left-1/2 filter drop-shadow">
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] border-t-brand-charcoal dark:border-t-brand-warmWhite" />
          </div>

          {/* Rotatable wheel canvas */}
          <div className="w-48 h-48 rounded-full border-[6px] border-brand-charcoal dark:border-zinc-800 shadow-premium relative overflow-hidden flex items-center justify-center">
            
            <div 
              ref={wheelRef}
              style={{
                transform: `rotate(${rotationDegrees}deg)`,
                transition: isSpinning ? 'transform 4s cubic-bezier(0.15, 0.95, 0.3, 1)' : 'none'
              }}
              className="absolute inset-0 w-full h-full rounded-full transition-transform"
            >
              {/* Draw segments */}
              {prizes.map((prize, idx) => {
                const rotation = idx * 60;
                return (
                  <div
                    key={idx}
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      clipPath: 'polygon(50% 50%, 30% 0, 70% 0)',
                      backgroundColor: colors[idx % colors.length]
                    }}
                    className="absolute inset-0 w-full h-full origin-center flex items-start justify-center pt-3"
                  >
                    <span className="text-[9px] font-black text-brand-charcoal/80 dark:text-white/90 select-none rotate-180 uppercase tracking-tighter" style={{ writingMode: 'vertical-rl' }}>
                      {prize.text.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Inner spin hub button */}
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`absolute w-12 h-12 rounded-full border-4 border-brand-charcoal dark:border-zinc-800 shadow-premium flex items-center justify-center text-[10px] font-extrabold uppercase tracking-wide transition z-20 ${
                isSpinning 
                  ? 'bg-brand-sand text-brand-stone/60 cursor-not-allowed' 
                  : 'bg-brand-cream text-brand-charcoal hover:scale-105 active:scale-95'
              }`}
            >
              {isSpinning ? '...' : 'Spin'}
            </button>
          </div>
        </div>

        {/* Spin Success Banner */}
        <AnimatePresence>
          {spinResult && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-brand-sage/10 border border-brand-sage/20 rounded-xl p-3 flex items-center justify-center space-x-2"
            >
              <Gift className="w-5 h-5 text-brand-forest" />
              <div className="text-left">
                <div className="text-[9px] font-bold text-brand-forest uppercase leading-none">You Won a Coupon!</div>
                <div className="text-[11px] font-extrabold text-brand-charcoal dark:text-white leading-tight mt-0.5">{spinResult} (+25 pts)</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MY COUPON WALLET SECTION */}
      <div className="space-y-3 text-left">
        <span className="text-[10px] font-extrabold text-brand-stone/75 dark:text-dark-muted uppercase tracking-wider">Saved Wallet Coupons ({userCoupons.length})</span>
        
        <div className="space-y-3">
          {userCoupons.map((c) => (
            <div 
              key={c.id}
              className="relative bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border p-4 rounded-2xl flex items-center justify-between shadow-premium overflow-hidden border-l-4 border-l-brand-gold"
            >
              {/* Notch circular cuts representing physical tickets */}
              <div className="absolute -left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-[#FAF8F5] dark:bg-dark-bg border-r border-brand-sand/20 dark:border-dark-border" />
              <div className="absolute -right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-[#FAF8F5] dark:bg-dark-bg border-l border-brand-sand/20 dark:border-dark-border" />

              <div className="pl-2.5 text-left">
                <span className="text-[9px] font-bold text-brand-stone dark:text-dark-muted uppercase tracking-wider">{c.businessName}</span>
                <h4 className="text-xs font-extrabold text-brand-charcoal dark:text-white leading-tight mt-0.5">{c.discount}</h4>
                <div className="flex items-center space-x-1.5 mt-1">
                  <Ticket className="w-3.5 h-3.5 text-brand-gold" />
                  <span className="text-[10px] font-mono font-bold text-brand-gold">{c.code}</span>
                </div>
              </div>

              <button 
                onClick={() => {
                  useAppStore.getState().triggerNotification(
                    'Coupon Claimed',
                    `Present code "${c.code}" at checkout to redeem discount.`,
                    'system'
                  );
                }}
                className="py-1.5 px-3 rounded-xl bg-brand-charcoal hover:bg-neutral-800 text-white dark:bg-brand-warmWhite dark:text-brand-charcoal text-[9px] font-extrabold uppercase tracking-wider shadow-premium flex items-center space-x-1 z-10"
              >
                <span>Use</span>
              </button>
            </div>
          ))}

          {userCoupons.length === 0 && (
            <div className="p-6 text-center border border-dashed border-brand-sand dark:border-dark-border rounded-2xl">
              <Ticket className="w-7 h-7 text-brand-sand dark:text-dark-border mx-auto mb-2" />
              <span className="text-[10px] font-bold text-brand-stone dark:text-dark-muted">No coupons saved yet</span>
              <p className="text-[9px] text-brand-stone/60 dark:text-dark-muted/60 mt-0.5">Spin the daily rewards wheel above to win coupons!</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
export default LoyaltyScreen;
