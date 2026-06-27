import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { mockBusinesses, mockEvents } from '../data/mockData';
import { 
  Search, 
  MapPin, 
  Sparkles, 
  ArrowUpRight, 
  Calendar, 
  ChevronRight,
  ShieldCheck,
  Flame,
  Award
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { setScreen, setActiveBusinessId, toggleDarkMode, darkMode } = useAppStore();

  const handleSpotlightClick = () => {
    setActiveBusinessId('b1');
    setScreen('profile');
  };

  const handleBusinessClick = (id: string) => {
    setActiveBusinessId(id);
    setScreen('profile');
  };

  // Stories mock data
  const stories = [
    { id: 'b1', name: 'Elena R.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60', active: true },
    { id: 'b3', name: 'Priya P.', avatar: 'https://images.unsplash.com/photo-1534751516642-a131ffd1037f?w=100&auto=format&fit=crop&q=60', active: true },
    { id: 'b5', name: 'Nia M.', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&auto=format&fit=crop&q=60', active: false },
    { id: 'b2', name: 'James C.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60', active: false },
    { id: 'b4', name: 'Mateo R.', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&auto=format&fit=crop&q=60', active: false },
  ];

  // Featured Categories
  const categories = [
    { name: 'Food & Beverage', icon: '☕', count: 18 },
    { name: 'Health & Wellness', icon: '🧘', count: 12 },
    { name: 'Home & Craft', icon: '🔨', count: 8 },
    { name: 'Fashion & Retail', icon: '🛍️', count: 15 },
  ];

  // Motion Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 200, damping: 22 } }
  };

  return (
    <div className="flex-1 w-full overflow-y-auto no-scrollbar smooth-scroll px-5 pt-4 pb-8 space-y-6">
      
      {/* Header section */}
      <div className="flex justify-between items-center mt-3">
        <div>
          <span className="text-[10px] font-bold text-brand-stone dark:text-dark-muted uppercase tracking-wider">Saturday, Jun 27</span>
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-charcoal dark:text-white leading-tight">Explore Local</h2>
        </div>
        <button 
          onClick={() => setScreen('map')}
          className="w-10 h-10 rounded-full bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/35 dark:border-dark-border flex items-center justify-center text-brand-charcoal dark:text-white shadow-premium active:scale-95 transition"
        >
          <MapPin className="w-5 h-5 text-brand-forest dark:text-brand-sage" />
        </button>
      </div>

      {/* SEARCH BAR Short-cut */}
      <div 
        onClick={() => setScreen('directory')}
        className="w-full flex items-center space-x-3 px-4 py-3 bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/25 dark:border-dark-border rounded-2xl cursor-pointer text-brand-stone/60 dark:text-dark-muted/60 shadow-premium active:scale-[0.99] transition"
      >
        <Search className="w-4.5 h-4.5" />
        <span className="text-xs font-semibold">Search local services, shops, owners...</span>
      </div>

      {/* STORIES CIRCLES */}
      <div className="space-y-2">
        <div className="text-[10px] font-extrabold text-brand-stone/75 dark:text-dark-muted uppercase tracking-wider">Owner Chronicles</div>
        <div className="flex items-center space-x-4 overflow-x-auto no-scrollbar py-1">
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => handleBusinessClick(story.id)}
              className="flex flex-col items-center flex-shrink-0 space-y-1.5 focus:outline-none"
            >
              <div className={`relative p-0.5 rounded-full ${story.active ? 'bg-gradient-to-tr from-brand-gold to-brand-sage' : 'bg-brand-sand/30 dark:bg-dark-border'}`}>
                <div className="w-13 h-13 rounded-full overflow-hidden border-2 border-brand-cream dark:border-dark-bg">
                  <img src={story.avatar} alt={story.name} className="w-full h-full object-cover" />
                </div>
                {story.active && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-brand-forest border-2 border-brand-cream dark:border-dark-bg rounded-full flex items-center justify-center text-[7px] text-white font-bold">
                    live
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold text-brand-charcoal dark:text-white opacity-85">{story.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* FEATURED SPOTLIGHT HERO CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        onClick={handleSpotlightClick}
        className="relative rounded-3xl overflow-hidden shadow-premium-lg cursor-pointer bg-brand-charcoal text-white group h-56"
      >
        {/* Card backdrop image */}
        <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-300 group-hover:opacity-50" />
        <img 
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=60" 
          alt="Sage & Stone Cafe" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Content overlays */}
        <div className="absolute inset-x-0 bottom-0 p-5 z-20 flex flex-col justify-end h-full bg-gradient-to-t from-black/85 via-black/30 to-transparent">
          <div className="flex items-center space-x-1.5 mb-2">
            <span className="bg-brand-gold/90 text-brand-charcoal text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center space-x-0.5">
              <Sparkles className="w-2.5 h-2.5 fill-current" />
              <span>Spotlight of the Week</span>
            </span>
            <span className="bg-brand-sage/20 border border-brand-sage/35 text-brand-sage text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center space-x-0.5 backdrop-blur-md">
              <ShieldCheck className="w-3 h-3" />
              <span>Minority Owned</span>
            </span>
          </div>

          <h3 className="text-xl font-extrabold tracking-tight mb-1 group-hover:text-brand-sage transition-colors">Sage & Stone Cafe</h3>
          <p className="text-[11px] text-zinc-300 font-medium line-clamp-2 leading-relaxed">
            Discover organic cardamom lattes and fresh sourdough pastries built upon community connections.
          </p>

          <div className="flex justify-between items-center mt-3.5 pt-3 border-t border-white/10 text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
            <span>By Elena Rostova</span>
            <div className="flex items-center text-brand-gold group-hover:translate-x-0.5 transition-transform">
              <span>View Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* QUICK SUB ACTIONS (Events & Loyalty cards) */}
      <div className="grid grid-cols-2 gap-4">
        {/* Events preview card */}
        <div 
          onClick={() => setScreen('networking')}
          className="bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/20 dark:border-dark-border p-4.5 rounded-2xl cursor-pointer hover:bg-brand-sand/10 dark:hover:bg-dark-border transition shadow-premium flex flex-col justify-between h-28"
        >
          <div className="w-8 h-8 rounded-xl bg-brand-forest/10 dark:bg-brand-sage/10 flex items-center justify-center">
            <Calendar className="w-4.5 h-4.5 text-brand-forest dark:text-brand-sage" />
          </div>
          <div>
            <div className="text-[10px] font-extrabold text-brand-stone/60 dark:text-dark-muted uppercase tracking-wider">Events Today</div>
            <div className="text-sm font-extrabold mt-0.5 truncate text-brand-charcoal dark:text-white">Mindful Sunday Flow</div>
            <div className="text-[10px] text-brand-stone dark:text-dark-muted font-bold mt-0.5">8:00 AM @ Pier 4</div>
          </div>
        </div>

        {/* Loyalty point tracker card */}
        <div 
          onClick={() => setScreen('loyalty')}
          className="bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/20 dark:border-dark-border p-4.5 rounded-2xl cursor-pointer hover:bg-brand-sand/10 dark:hover:bg-dark-border transition shadow-premium flex flex-col justify-between h-28"
        >
          <div className="w-8 h-8 rounded-xl bg-brand-gold/15 flex items-center justify-center">
            <Award className="w-4.5 h-4.5 text-brand-gold" />
          </div>
          <div>
            <div className="text-[10px] font-extrabold text-brand-stone/60 dark:text-dark-muted uppercase tracking-wider">Rewards Wallet</div>
            <div className="text-sm font-extrabold mt-0.5 text-brand-charcoal dark:text-white">350 Points</div>
            <div className="text-[10px] text-brand-gold font-bold mt-0.5 flex items-center">
              <span>Spin & Win Rewards</span>
              <ChevronRight className="w-3 h-3 ml-0.5" />
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORIES SECTIONS */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-extrabold text-brand-stone/75 dark:text-dark-muted uppercase tracking-wider">Explore categories</span>
          <button 
            onClick={() => setScreen('directory')}
            className="text-[10px] font-extrabold text-brand-forest dark:text-brand-sage hover:underline flex items-center uppercase tracking-wider"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
        <div className="flex items-center space-x-3.5 overflow-x-auto no-scrollbar py-1">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                useAppStore.setState({ filterBadge: 'All', searchQuery: cat.name });
                setScreen('directory');
              }}
              className="flex items-center space-x-2.5 px-4 py-3 bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/20 dark:border-dark-border rounded-2xl hover:bg-brand-sand/10 dark:hover:bg-dark-border transition shadow-premium flex-shrink-0"
            >
              <span className="text-lg">{cat.icon}</span>
              <div className="text-left">
                <div className="text-xs font-extrabold text-brand-charcoal dark:text-white leading-none mb-0.5">{cat.name}</div>
                <span className="text-[9px] font-bold text-brand-stone/60 dark:text-dark-muted/65 uppercase tracking-wide">{cat.count} listings</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* TRENDING NEAR YOU LIST */}
      <div className="space-y-3.5">
        <div className="flex items-center space-x-1.5">
          <Flame className="w-4 h-4 text-brand-terracotta" />
          <span className="text-[10px] font-extrabold text-brand-stone/75 dark:text-dark-muted uppercase tracking-wider">Trending Near You</span>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          {mockBusinesses.slice(1, 4).map((biz) => (
            <motion.div
              key={biz.id}
              variants={itemVariants}
              onClick={() => handleBusinessClick(biz.id)}
              className="flex items-center space-x-3.5 p-3 bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border rounded-2xl cursor-pointer hover:bg-brand-sand/10 dark:hover:bg-dark-border transition shadow-premium"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img src={biz.coverImage} alt={biz.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-brand-stone dark:text-dark-muted uppercase tracking-wider">{biz.category}</span>
                  <div className="flex items-center space-x-0.5 text-brand-gold text-[10px] font-bold">
                    <span>★</span>
                    <span>{biz.rating}</span>
                  </div>
                </div>
                <h4 className="text-sm font-extrabold text-brand-charcoal dark:text-white truncate">{biz.name}</h4>
                <p className="text-[10px] text-brand-stone dark:text-dark-muted font-medium truncate mt-0.5">{biz.description}</p>
                <div className="flex items-center space-x-2 mt-1.5">
                  <span className="text-[9px] font-bold text-brand-stone/60 dark:text-dark-muted/60">{biz.distance}</span>
                  <span className="text-[8px] font-extrabold text-brand-stone/30 dark:text-dark-border">•</span>
                  <div className="flex items-center space-x-1">
                    {biz.ownershipBadges.slice(0, 2).map((badge, idx) => (
                      <span key={idx} className="bg-brand-sage/10 text-brand-forest dark:bg-brand-sage/20 dark:text-brand-sage text-[8px] font-bold px-1.5 py-0.25 rounded-md">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </div>
  );
};
export default HomeScreen;
