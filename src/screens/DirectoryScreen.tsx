import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { mockBusinesses } from '../data/mockData';
import { 
  Search, 
  Mic, 
  MapPin, 
  ShieldCheck, 
  Bookmark, 
  BookmarkCheck,
  Award,
  Sparkles,
  SlidersHorizontal
} from 'lucide-react';

export const DirectoryScreen: React.FC = () => {
  const { 
    setScreen, 
    setActiveBusinessId, 
    searchQuery, 
    setSearchQuery, 
    filterBadge, 
    setFilterBadge 
  } = useAppStore();

  const [favorites, setFavorites] = useState<string[]>(['b1', 'b3']);
  const [isListening, setIsListening] = useState(false);

  // Simulated Voice Search
  const toggleVoiceSearch = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('Cafe');
    }, 2000);
  };

  const handleFavoriteToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleCardClick = (id: string) => {
    setActiveBusinessId(id);
    setScreen('profile');
  };

  // Ownership badges filters
  const filterOptions = [
    { label: 'All', value: 'All' },
    { label: 'Verified Only', value: 'Verified' },
    { label: 'Minority Owned', value: 'Minority' },
    { label: 'Women Owned', value: 'Women' },
    { label: 'Veteran Owned', value: 'Veteran' },
    { label: 'Black Owned', value: 'Black' },
    { label: 'Latino Owned', value: 'Latino' },
    { label: 'Asian Owned', value: 'Asian' },
  ];

  // Filtering Logic
  const filteredBusinesses = mockBusinesses.filter((biz) => {
    // Search query match
    const matchesSearch = 
      biz.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      biz.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      biz.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      biz.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Filter badge match
    if (filterBadge === 'All') return true;
    if (filterBadge === 'Verified') return biz.isVerified;
    
    // Type checking for ownership badges
    return biz.ownershipBadges.includes(filterBadge as any);
  });

  return (
    <div className="flex-1 w-full overflow-y-auto no-scrollbar smooth-scroll px-5 pt-4 pb-8 space-y-5">
      
      {/* Page Title */}
      <div className="mt-3">
        <span className="text-[10px] font-bold text-brand-stone dark:text-dark-muted uppercase tracking-wider">Community Directory</span>
        <h2 className="text-2xl font-extrabold tracking-tight text-brand-charcoal dark:text-white leading-tight">Find Partners</h2>
      </div>

      {/* Dynamic Search & Voice Field */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-stone/60 dark:text-dark-muted/65">
          <Search className="w-4.5 h-4.5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={isListening ? "Listening..." : "Search organic bakery, woodworks..."}
          className="w-full pl-11 pr-11 py-3.5 rounded-2xl bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/35 dark:border-dark-border text-xs font-semibold focus:outline-none focus:border-brand-sage dark:focus:border-brand-sage transition duration-200 shadow-premium"
        />
        <button
          onClick={toggleVoiceSearch}
          className={`absolute inset-y-0 right-0 pr-3.5 flex items-center transition ${isListening ? 'text-brand-terracotta scale-110' : 'text-brand-stone dark:text-dark-muted hover:opacity-85'}`}
        >
          <Mic className={`w-4.5 h-4.5 ${isListening ? 'animate-bounce' : ''}`} />
        </button>
      </div>

      {/* Voice listening waves overlay */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="bg-brand-sage/10 dark:bg-brand-sage/5 border border-brand-sage/20 rounded-xl p-3 flex items-center justify-center space-x-2"
          >
            <span className="text-[10px] font-bold text-brand-forest dark:text-brand-sage animate-pulse">Try saying "Cafe"</span>
            <div className="flex space-x-1 items-end h-3">
              <span className="w-0.75 h-2 bg-brand-forest dark:bg-brand-sage animate-bounce" style={{ animationDelay: '0.1s' }} />
              <span className="w-0.75 h-3 bg-brand-forest dark:bg-brand-sage animate-bounce" style={{ animationDelay: '0.3s' }} />
              <span className="w-0.75 h-1.5 bg-brand-forest dark:bg-brand-sage animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HORIZONTAL FILTERS */}
      <div className="space-y-2">
        <div className="flex items-center space-x-1.5 text-brand-stone dark:text-dark-muted">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider">Business Attributes</span>
        </div>
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
          {filterOptions.map((opt) => {
            const isActive = filterBadge === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setFilterBadge(opt.value)}
                className={`px-3.5 py-2 rounded-xl text-[10px] font-bold tracking-wider uppercase whitespace-nowrap transition-all border ${
                  isActive 
                    ? 'bg-brand-charcoal text-white border-brand-charcoal dark:bg-brand-warmWhite dark:text-brand-charcoal dark:border-brand-warmWhite' 
                    : 'bg-brand-warmWhite border-brand-sand/20 dark:bg-dark-card dark:border-dark-border text-brand-stone dark:text-dark-muted hover:bg-brand-sand/10'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* RESULTS LIST */}
      <div className="space-y-4">
        <div className="flex justify-between items-center text-[10px] text-brand-stone/60 dark:text-dark-muted/60 font-bold uppercase tracking-wider">
          <span>Found {filteredBusinesses.length} results</span>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-brand-forest dark:text-brand-sage hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>

        <div className="space-y-4">
          {filteredBusinesses.map((biz) => {
            const isFav = favorites.includes(biz.id);
            return (
              <motion.div
                key={biz.id}
                layoutId={`card-${biz.id}`}
                onClick={() => handleCardClick(biz.id)}
                className="bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border rounded-3xl overflow-hidden cursor-pointer hover:shadow-premium-lg group transition duration-300 flex flex-col shadow-premium"
              >
                {/* Image & Favorite overlay */}
                <div className="h-36 relative overflow-hidden bg-zinc-100">
                  <img src={biz.coverImage} alt={biz.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" />
                  
                  {/* Top tags on image */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-1.5 z-10">
                    {biz.isVerified && (
                      <span className="bg-brand-forest text-[#FCFAF7] text-[8px] font-extrabold px-2 py-0.5 rounded-md flex items-center space-x-0.5 shadow-premium">
                        <ShieldCheck className="w-2.5 h-2.5 fill-current" />
                        <span>VERIFIED</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => handleFavoriteToggle(biz.id, e)}
                    className="absolute top-3 right-3 w-8.5 h-8.5 rounded-full glass border border-white/25 flex items-center justify-center text-brand-charcoal dark:text-white shadow-premium active:scale-90 transition z-10"
                  >
                    {isFav ? (
                      <BookmarkCheck className="w-4.5 h-4.5 text-brand-gold fill-brand-gold" />
                    ) : (
                      <Bookmark className="w-4.5 h-4.5" />
                    )}
                  </button>

                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-[#FCFAF7] text-[9px] font-bold px-2 py-0.75 rounded-md flex items-center space-x-1">
                    <MapPin className="w-2.5 h-2.5 text-brand-sage" />
                    <span>{biz.distance}</span>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-4.5 text-left flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-extrabold text-brand-stone/60 dark:text-dark-muted/65 uppercase tracking-wide">{biz.category}</span>
                      <div className="flex items-center space-x-0.5 text-brand-gold text-[10px] font-extrabold">
                        <span>★</span>
                        <span>{biz.rating}</span>
                        <span className="text-brand-stone/40 dark:text-dark-muted/40 font-semibold">({biz.reviewsCount})</span>
                      </div>
                    </div>
                    <h3 className="text-base font-extrabold text-brand-charcoal dark:text-white truncate mb-1 group-hover:text-brand-forest dark:group-hover:text-brand-sage transition-colors">{biz.name}</h3>
                    <p className="text-[11px] text-brand-stone dark:text-dark-muted font-medium line-clamp-2 leading-relaxed">{biz.description}</p>
                  </div>

                  {/* Ownership tags indicators */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-brand-sand/15 dark:border-dark-border">
                    <div className="flex items-center space-x-1.5 overflow-hidden">
                      {biz.ownershipBadges.map((badge, idx) => (
                        <span key={idx} className="bg-brand-sage/10 text-brand-forest dark:bg-brand-sage/20 dark:text-brand-sage text-[8px] font-bold px-2 py-0.5 rounded-md">
                          {badge}
                        </span>
                      ))}
                    </div>
                    <span className="text-[9px] font-bold text-brand-stone/40 dark:text-dark-muted/45 tracking-tight">{biz.address}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {filteredBusinesses.length === 0 && (
            <div className="text-center py-12 px-6 bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/20 dark:border-dark-border rounded-3xl">
              <Sparkles className="w-8 h-8 text-brand-sand dark:text-dark-border mx-auto mb-3" />
              <div className="text-xs font-bold text-brand-charcoal dark:text-white mb-1">No businesses match filters</div>
              <p className="text-[10px] text-brand-stone dark:text-dark-muted max-w-[200px] mx-auto leading-relaxed">Try typing a different keyword or removing some filter attributes.</p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
export default DirectoryScreen;
