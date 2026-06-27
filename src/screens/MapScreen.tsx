import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { mockBusinesses, Business } from '../data/mockData';
import { 
  ArrowLeft, 
  MapPin, 
  Navigation, 
  ShieldCheck, 
  Star,
  Compass,
  Search,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

export const MapScreen: React.FC = () => {
  const { setScreen, setActiveBusinessId } = useAppStore();
  const [selectedBiz, setSelectedBiz] = useState<Business | null>(mockBusinesses[0]);
  const [mapScale, setMapScale] = useState(1);
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });

  const handleBack = () => {
    setScreen('home');
  };

  const handlePinClick = (biz: Business, x: number, y: number) => {
    setSelectedBiz(biz);
    // Center map around the pin coordinates
    setMapScale(1.3);
    setMapOffset({ x: (50 - x) * 3, y: (50 - y) * 3 });
  };

  const handleCardClick = () => {
    if (selectedBiz) {
      setActiveBusinessId(selectedBiz.id);
      setScreen('profile');
    }
  };

  const resetMap = () => {
    setSelectedBiz(null);
    setMapScale(1);
    setMapOffset({ x: 0, y: 0 });
  };

  // Mock Pin positions (X, Y in percentages for SVG map placement)
  const pinCoordinates: Record<string, { x: number; y: number; label: string }> = {
    'b1': { x: 38, y: 35, label: '☕' }, // Sage & Stone Cafe
    'b2': { x: 72, y: 65, label: '🔨' }, // Forest Oak Woodworks
    'b3': { x: 25, y: 55, label: '🧘' }, // Sol Yoga
    'b4': { x: 60, y: 25, label: '🐟' }, // Ocean Pearl Bistro
    'b5': { x: 45, y: 50, label: '🛍️' }  // Roots Boutique
  };

  return (
    <div className="absolute inset-0 bg-[#E3E8EC] dark:bg-zinc-950 flex flex-col justify-between overflow-hidden">
      
      {/* Floating Top search overlay */}
      <div className="absolute top-14 inset-x-4 z-20 flex items-center space-x-2">
        <button
          onClick={handleBack}
          className="w-10 h-10 rounded-full bg-brand-cream dark:bg-dark-card border border-brand-sand/35 dark:border-dark-border flex items-center justify-center text-brand-charcoal dark:text-white shadow-premium active:scale-95 transition"
        >
          <ArrowLeft className="w-5 h-5 text-brand-stone dark:text-dark-muted" />
        </button>

        <div className="flex-1 relative">
          <input
            type="text"
            readOnly
            onClick={() => setScreen('directory')}
            placeholder="Search nearby businesses..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-brand-cream dark:bg-dark-card border border-brand-sand/35 dark:border-dark-border text-xs font-semibold shadow-premium cursor-pointer text-brand-stone"
          />
          <Search className="w-4 h-4 text-brand-stone/60 absolute left-3.5 top-3" />
        </div>

        {(mapScale > 1 || selectedBiz) && (
          <button
            onClick={resetMap}
            className="px-3.5 h-10 rounded-full bg-brand-forest text-white text-[10px] font-extrabold uppercase tracking-wider shadow-premium"
          >
            Reset
          </button>
        )}
      </div>

      {/* MAP GRID CANVAS - SVG VECTOR GRAPHICS */}
      <div className="flex-1 w-full relative overflow-hidden flex items-center justify-center bg-[#E5ECF1] dark:bg-neutral-900">
        
        {/* Animated grid vectors simulating Mapbox */}
        <motion.div
          animate={{
            scale: mapScale,
            x: mapOffset.x,
            y: mapOffset.y
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 150 }}
          className="w-[1000px] h-[1000px] relative pointer-events-auto"
        >
          {/* SVG Map Streets design */}
          <svg className="absolute inset-0 w-full h-full text-white/50 dark:text-neutral-800" viewBox="0 0 1000 1000" fill="none">
            {/* Neighborhood parks */}
            <rect x="150" y="250" width="300" height="200" rx="40" fill="#D3E0D3" opacity="0.4" />
            <rect x="650" y="450" width="200" height="250" rx="30" fill="#D3E0D3" opacity="0.4" />
            
            {/* Waterfront Ocean */}
            <path d="M 0 150 Q 300 200 600 50 T 1000 100 L 1000 0 L 0 0 Z" fill="#CBD9E0" opacity="0.5" />
            
            {/* Grid street lines */}
            <line x1="100" y1="0" x2="100" y2="1000" stroke="currentColor" strokeWidth="6" />
            <line x1="300" y1="0" x2="300" y2="1000" stroke="currentColor" strokeWidth="10" />
            <line x1="500" y1="0" x2="500" y2="1000" stroke="currentColor" strokeWidth="8" />
            <line x1="750" y1="0" x2="750" y2="1000" stroke="currentColor" strokeWidth="6" />
            <line x1="900" y1="0" x2="900" y2="1000" stroke="currentColor" strokeWidth="6" />

            <line x1="0" y1="200" x2="1000" y2="200" stroke="currentColor" strokeWidth="8" />
            <line x1="0" y1="380" x2="1000" y2="380" stroke="currentColor" strokeWidth="12" strokeDasharray="15,10" />
            <line x1="0" y1="550" x2="1000" y2="550" stroke="currentColor" strokeWidth="8" />
            <line x1="0" y1="720" x2="1000" y2="720" stroke="currentColor" strokeWidth="10" />
            <line x1="0" y1="880" x2="1000" y2="880" stroke="currentColor" strokeWidth="6" />

            {/* Custom Scenic Route */}
            <path d="M 100 880 C 300 700, 500 750, 750 550 C 900 400, 950 200, 1000 100" stroke="#E6DFD3" strokeWidth="24" strokeLinecap="round" opacity="0.6" />
          </svg>

          {/* Render Pin Anchors */}
          {mockBusinesses.map((biz) => {
            const coords = pinCoordinates[biz.id] || { x: 50, y: 50, label: '📍' };
            const isSelected = selectedBiz?.id === biz.id;

            // Coordinates on 1000x1000 canvas
            const posX = coords.x * 10;
            const posY = coords.y * 10;

            return (
              <div
                key={biz.id}
                style={{ position: 'absolute', left: posX, top: posY }}
                className="transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30"
                onClick={() => handlePinClick(biz, coords.x, coords.y)}
              >
                {/* Pulse Glow */}
                <span className={`absolute -inset-2.5 rounded-full ${isSelected ? 'bg-brand-forest/30 dark:bg-brand-sage/40 scale-150' : 'bg-brand-ocean/15 animate-ping'} transition-transform duration-300`} />
                
                {/* Pin Container */}
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-sm shadow-premium border transition-all duration-300 ${
                  isSelected 
                    ? 'bg-brand-charcoal text-white border-brand-charcoal scale-120' 
                    : 'bg-brand-cream text-brand-charcoal border-brand-sand/40 dark:bg-dark-card dark:border-dark-border dark:text-white hover:scale-110'
                }`}>
                  {coords.label}
                </div>

                {/* Micro Label Bubble */}
                <div className={`absolute top-10 left-1/2 transform -translate-x-1/2 px-2 py-0.5 rounded bg-white dark:bg-neutral-900 shadow-premium border border-zinc-200 dark:border-neutral-800 text-[8px] font-extrabold uppercase tracking-wide whitespace-nowrap transition-opacity duration-300 ${
                  isSelected ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}>
                  {biz.name}
                </div>
              </div>
            );
          })}

          {/* User Location Pulse indicator */}
          <div style={{ position: 'absolute', left: 400, top: 480 }} className="transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
            <span className="absolute -inset-4 rounded-full bg-blue-500/25 animate-pulse" />
            <div className="w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white shadow-premium" />
          </div>
        </motion.div>
      </div>

      {/* FLOATING PREVIEW BOTTOM CARD */}
      <div className="p-4 z-20 pb-8 pointer-events-none bg-transparent">
        <AnimatePresence>
          {selectedBiz && (
            <motion.div
              initial={{ y: 150, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 150, opacity: 0 }}
              className="bg-brand-cream dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border p-4 rounded-[28px] shadow-premium-lg flex items-center justify-between text-left cursor-pointer pointer-events-auto active:scale-[0.99] transition w-full"
              onClick={handleCardClick}
            >
              <div className="flex items-center space-x-3.5 min-w-0 flex-1">
                <div className="w-14 h-14 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={selectedBiz.coverImage} alt={selectedBiz.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-extrabold text-brand-stone/60 dark:text-dark-muted/65 uppercase tracking-wide leading-none">{selectedBiz.category}</span>
                    <div className="flex items-center space-x-0.5 text-brand-gold text-[10px] font-bold leading-none pr-1">
                      <span>★</span>
                      <span>{selectedBiz.rating}</span>
                    </div>
                  </div>
                  <h4 className="text-sm font-extrabold text-brand-charcoal dark:text-white truncate mt-1">{selectedBiz.name}</h4>
                  <p className="text-[10px] text-brand-stone dark:text-dark-muted font-medium truncate mt-0.5">{selectedBiz.address} • {selectedBiz.distance}</p>
                  
                  <div className="flex items-center space-x-1.5 mt-1.5 overflow-hidden">
                    {selectedBiz.ownershipBadges.slice(0, 2).map((badge, idx) => (
                      <span key={idx} className="bg-brand-sage/10 text-brand-forest dark:bg-brand-sage/20 dark:text-brand-sage text-[8px] font-bold px-1.5 py-0.25 rounded-md">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation CTA button */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  // Simulate GPS route
                  useAppStore.getState().triggerNotification(
                    'Routing Initiated',
                    `Directions mapped to ${selectedBiz.name}. ETA: 3 mins.`,
                    'system'
                  );
                }}
                className="w-10 h-10 rounded-full bg-brand-charcoal hover:bg-neutral-800 text-white dark:bg-brand-warmWhite dark:text-brand-charcoal flex items-center justify-center shadow-premium ml-3 flex-shrink-0"
              >
                <Navigation className="w-4.5 h-4.5 fill-current rotate-45 text-brand-sage dark:text-brand-charcoal" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};
export default MapScreen;
