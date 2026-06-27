import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, ScreenType } from '../store/useAppStore';
import { 
  User, 
  Settings, 
  Moon, 
  Sun, 
  TrendingUp, 
  DollarSign, 
  Eye, 
  Users, 
  Award,
  CreditCard,
  LogOut,
  Building,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

export const DashboardScreen: React.FC = () => {
  const { 
    userPoints, 
    darkMode, 
    toggleDarkMode, 
    logout, 
    setScreen, 
    addPoints,
    userCoupons
  } = useAppStore();

  const [isMerchantMode, setIsMerchantMode] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'basic' | 'pro' | 'premium' | null>(null);
  
  // Checkout flow states
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'form' | 'processing' | 'success'>('idle');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber && cardExpiry && cardCVC) {
      setCheckoutStep('processing');
      // Simulate payment processing
      setTimeout(() => {
        setCheckoutStep('success');
        addPoints(250); // Upgrade reward points
        setTimeout(() => {
          setCheckoutStep('idle');
          setSelectedTier(null);
          setShowSubscription(false);
        }, 3000);
      }, 2500);
    }
  };

  const handleTierSelect = (tier: 'basic' | 'pro' | 'premium') => {
    setSelectedTier(tier);
    setCheckoutStep('form');
  };

  const currentTierDetails = () => {
    switch (selectedTier) {
      case 'premium':
        return { name: 'Platinum Enterprise', price: '$89 / mo', points: '+250 Bonus Points' };
      case 'pro':
        return { name: 'Growth Professional', price: '$39 / mo', points: '+100 Bonus Points' };
      default:
        return { name: 'Basic Community', price: '$12 / mo', points: '+30 Bonus Points' };
    }
  };

  return (
    <div className="flex-1 w-full overflow-y-auto no-scrollbar smooth-scroll px-5 pt-4 pb-8 space-y-6 text-left relative bg-brand-cream dark:bg-dark-bg">
      
      {/* Top Banner and Toggle */}
      <div className="mt-3 flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold text-brand-stone dark:text-dark-muted uppercase tracking-wider">Account Portal</span>
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-charcoal dark:text-white leading-tight">
            {isMerchantMode ? 'Business Hub' : 'My Profile'}
          </h2>
        </div>

        {/* Merchant/Client Toggle switch */}
        <button
          onClick={() => setIsMerchantMode(!isMerchantMode)}
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-[10px] font-bold tracking-wider uppercase border transition ${
            isMerchantMode 
              ? 'bg-brand-forest border-brand-forest text-white' 
              : 'bg-brand-warmWhite border-brand-sand/20 text-brand-stone dark:bg-dark-card dark:border-dark-border dark:text-dark-text'
          }`}
        >
          {isMerchantMode ? <Building className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
          <span>{isMerchantMode ? 'Merchant View' : 'Customer View'}</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!isMerchantMode ? (
          
          /* ========================================================================= */
          /* CUSTOMER PROFILE VIEW */
          /* ========================================================================= */
          <motion.div
            key="customer"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* User Info Header card */}
            <div className="p-4 bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border rounded-3xl flex items-center space-x-4 shadow-premium">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-brand-cream dark:border-dark-border shadow-premium flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60" alt="Alex Mercer" className="w-full h-full object-cover" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-base font-extrabold text-brand-charcoal dark:text-white truncate">Alex Mercer</h3>
                  <span className="bg-brand-gold/15 text-brand-gold text-[8px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">Gold</span>
                </div>
                <p className="text-[10px] text-brand-stone dark:text-dark-muted font-semibold truncate mt-0.5">Community Advocate since 2024</p>
                
                {/* Points ledger mini display */}
                <div className="flex items-center space-x-1.5 mt-2 text-brand-forest dark:text-brand-sage text-[10px] font-bold">
                  <Award className="w-4 h-4 text-brand-gold fill-brand-gold/20" />
                  <span>{userPoints} Available Points</span>
                </div>
              </div>
            </div>

            {/* Quick stats grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border p-4.5 rounded-2xl shadow-premium">
                <div className="text-[9px] font-extrabold text-brand-stone/60 dark:text-dark-muted uppercase tracking-wider">Total Coupons</div>
                <div className="text-xl font-extrabold text-brand-charcoal dark:text-white mt-1">{userCoupons.length} Active</div>
                <p className="text-[9px] text-brand-stone dark:text-dark-muted font-medium mt-1">Check Rewards tab to redeem.</p>
              </div>
              <div className="bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border p-4.5 rounded-2xl shadow-premium">
                <div className="text-[9px] font-extrabold text-brand-stone/60 dark:text-dark-muted uppercase tracking-wider">Local Support</div>
                <div className="text-xl font-extrabold text-brand-charcoal dark:text-white mt-1">8 check-ins</div>
                <p className="text-[9px] text-brand-stone dark:text-dark-muted font-medium mt-1">2 reviews written.</p>
              </div>
            </div>

            {/* Member Tiers callout card */}
            <div className="relative rounded-3xl bg-brand-charcoal text-white p-5 border border-neutral-800 shadow-premium-lg overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/15 rounded-full blur-2xl" />
              
              <span className="bg-brand-gold/90 text-brand-charcoal text-[9px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-block mb-2">
                Merchant Alliance
              </span>
              <h3 className="text-base font-extrabold tracking-tight">Expand Your Local Reach</h3>
              <p className="text-[10px] text-zinc-400 font-semibold leading-relaxed mt-1 max-w-[240px]">
                Upgrade to a merchant alliance listing. Unlock advanced analytics, custom scheduling grids, and verification badges.
              </p>
              
              <button
                onClick={() => setShowSubscription(true)}
                className="mt-4 py-2.5 px-4 rounded-xl bg-brand-gold text-brand-charcoal hover:bg-yellow-600 text-[10px] font-extrabold uppercase tracking-wider shadow-premium flex items-center space-x-1"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>See Alliance Plans</span>
              </button>
            </div>

            {/* System Preferences */}
            <div className="bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border p-4 rounded-3xl space-y-3.5 shadow-premium">
              <div className="text-[9px] font-extrabold text-brand-stone/60 dark:text-dark-muted uppercase tracking-wider mb-1">Preferences</div>

              <button 
                onClick={toggleDarkMode}
                className="flex items-center justify-between w-full p-2.5 rounded-xl bg-brand-cream dark:bg-dark-bg border border-brand-sand/10 dark:border-dark-border hover:bg-brand-sand/10 transition"
              >
                <div className="flex items-center space-x-2.5">
                  {darkMode ? <Sun className="w-4 h-4 text-brand-gold" /> : <Moon className="w-4 h-4 text-brand-stone" />}
                  <span className="text-xs font-semibold">Simulated Dark Mode</span>
                </div>
                <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-300 ${darkMode ? 'bg-brand-sage' : 'bg-brand-sand'}`}>
                  <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-300 ${darkMode ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
              </button>

              <button
                onClick={() => {
                  useAppStore.setState({ currentScreen: 'qr' });
                }}
                className="flex items-center justify-between w-full p-2.5 rounded-xl bg-brand-cream dark:bg-dark-bg border border-brand-sand/10 dark:border-dark-border hover:bg-brand-sand/10 transition"
              >
                <div className="flex items-center space-x-2.5 text-xs font-semibold">
                  <Building className="w-4 h-4 text-brand-forest dark:text-brand-sage" />
                  <span>Show Profile QR Code</span>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-stone/40" />
              </button>

              <button 
                onClick={logout}
                className="flex items-center space-x-2.5 w-full p-2.5 rounded-xl text-red-500 hover:bg-red-50/10 transition text-xs font-bold"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout Session</span>
              </button>
            </div>
          </motion.div>
        ) : (
          
          /* ========================================================================= */
          /* MERCHANT ANALYTICS HUB VIEW */
          /* ========================================================================= */
          <motion.div
            key="merchant"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Merchant Business Card Header */}
            <div className="p-4 bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border rounded-3xl flex items-center space-x-4 shadow-premium">
              <div className="w-14 h-14 rounded-2xl overflow-hidden border border-brand-sand/20 shadow-premium flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=100&auto=format&fit=crop&q=60" alt="Sage & Stone Cafe" className="w-full h-full object-cover" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-base font-extrabold text-brand-charcoal dark:text-white truncate">Sage & Stone Cafe</h3>
                  <span className="bg-brand-forest text-white text-[8px] font-extrabold px-2 py-0.5 rounded flex items-center space-x-0.5">
                    <ShieldCheck className="w-2.5 h-2.5 fill-current" />
                    <span>Vetted</span>
                  </span>
                </div>
                <p className="text-[10px] text-brand-stone dark:text-dark-muted font-semibold truncate mt-0.5">Elena Rostova • Owner portal</p>
                <div className="text-[9px] text-brand-forest dark:text-brand-sage font-bold mt-2 hover:underline cursor-pointer" onClick={() => setScreen('profile')}>
                  View Public Profile Page
                </div>
              </div>
            </div>

            {/* Merchant Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border p-4 rounded-2xl shadow-premium text-left">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-extrabold text-brand-stone/60 dark:text-dark-muted uppercase tracking-wider">Revenue (wk)</span>
                  <DollarSign className="w-3.5 h-3.5 text-brand-forest dark:text-brand-sage" />
                </div>
                <div className="text-xl font-extrabold text-brand-charcoal dark:text-white mt-1.5">$2,842</div>
                <span className="text-[9px] text-brand-forest dark:text-brand-sage font-bold flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                  <span>+18.4% vs last week</span>
                </span>
              </div>

              <div className="bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border p-4 rounded-2xl shadow-premium text-left">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-extrabold text-brand-stone/60 dark:text-dark-muted uppercase tracking-wider">Page Views</span>
                  <Eye className="w-3.5 h-3.5 text-brand-ocean dark:text-sky" />
                </div>
                <div className="text-xl font-extrabold text-brand-charcoal dark:text-white mt-1.5">1,248</div>
                <span className="text-[9px] text-brand-forest dark:text-brand-sage font-bold flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-0.5" />
                  <span>+24.1% vs last week</span>
                </span>
              </div>
            </div>

            {/* GORGEOUS ANIMATED SVG CHART */}
            <div className="p-4 bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border rounded-3xl shadow-premium space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold text-brand-stone/60 dark:text-dark-muted uppercase tracking-wider">Views Analytics</span>
                <span className="text-[10px] text-brand-stone dark:text-dark-muted font-bold">Mon - Fri Overview</span>
              </div>

              {/* SVG Area chart */}
              <div className="h-28 w-full relative">
                <svg className="w-full h-full text-brand-sage/40 dark:text-brand-sage/20" viewBox="0 0 300 100" preserveAspectRatio="none">
                  {/* Gradient Area Fill */}
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Area */}
                  <path d="M 0 90 L 0 65 L 60 72 L 120 40 L 180 50 L 240 18 L 300 30 L 300 100 Z" fill="url(#chartGradient)" />
                  
                  {/* Line */}
                  <path d="M 0 65 L 60 72 L 120 40 L 180 50 L 240 18 L 300 30" fill="none" stroke="#3F4E3F" strokeWidth="2.5" strokeLinecap="round" className="dark:stroke-brand-sage" />

                  {/* Dot anchors */}
                  <circle cx="0" cy="65" r="3.5" fill="#3F4E3F" className="dark:fill-brand-sage" />
                  <circle cx="60" cy="72" r="3.5" fill="#3F4E3F" className="dark:fill-brand-sage" />
                  <circle cx="120" cy="40" r="3.5" fill="#3F4E3F" className="dark:fill-brand-sage" />
                  <circle cx="180" cy="50" r="3.5" fill="#3F4E3F" className="dark:fill-brand-sage" />
                  <circle cx="240" cy="18" r="3.5" fill="#C4A46D animate-pulse" stroke="#3F4E3F" strokeWidth="1.5" />
                  <circle cx="300" cy="30" r="3.5" fill="#3F4E3F" className="dark:fill-brand-sage" />
                </svg>

                {/* Days Label Axis */}
                <div className="flex justify-between items-center text-[9px] text-brand-stone/50 dark:text-dark-muted/50 font-bold uppercase tracking-wider mt-2.5">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri (Peak)</span>
                  <span>Sat</span>
                </div>
              </div>
            </div>

            {/* Quick Actions for Merchant */}
            <div className="bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border p-4 rounded-3xl space-y-3.5 shadow-premium">
              <div className="text-[9px] font-extrabold text-brand-stone/60 dark:text-dark-muted uppercase tracking-wider mb-1">Business Setup</div>
              
              <button className="flex items-center justify-between w-full p-2.5 rounded-xl bg-brand-cream dark:bg-dark-bg border border-brand-sand/10 dark:border-dark-border hover:bg-brand-sand/10 transition text-xs font-semibold">
                <div className="flex items-center space-x-2.5">
                  <Building className="w-4 h-4 text-brand-stone" />
                  <span>Update Business Details</span>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-stone/40" />
              </button>

              <button className="flex items-center justify-between w-full p-2.5 rounded-xl bg-brand-cream dark:bg-dark-bg border border-brand-sand/10 dark:border-dark-border hover:bg-brand-sand/10 transition text-xs font-semibold">
                <div className="flex items-center space-x-2.5">
                  <CreditCard className="w-4 h-4 text-brand-stone" />
                  <span>Manage Billing & Stripe Payouts</span>
                </div>
                <ChevronRight className="w-4 h-4 text-brand-stone/40" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STRIPE SUBSCRIPTIONS OVERLAY SHEET */}
      <AnimatePresence>
        {showSubscription && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-charcoal/60 dark:bg-black/80 z-50 flex flex-col justify-end"
          >
            {/* Backdrop click to close */}
            <div className="flex-1" onClick={() => setShowSubscription(false)} />
            
            {/* Sheet contents */}
            <motion.div
              initial={{ y: 350 }}
              animate={{ y: 0 }}
              exit={{ y: 350 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-[#FCFAF7] dark:bg-neutral-900 border-t border-brand-sand/20 dark:border-neutral-800 rounded-t-[36px] p-6 max-h-[92%] overflow-y-auto shadow-premium-lg text-left"
            >
              <div className="w-12 h-1 rounded-full bg-brand-sand dark:bg-neutral-800 mx-auto mb-5" />

              {/* Upgrading state screen switches */}
              {checkoutStep === 'idle' && (
                <div className="space-y-4">
                  <div className="text-center">
                    <span className="text-[9px] font-extrabold text-brand-forest dark:text-brand-sage uppercase tracking-wider">Alliance Subscriptions</span>
                    <h3 className="text-lg font-extrabold text-brand-charcoal dark:text-white leading-tight">Elevate Your Presence</h3>
                    <p className="text-[10px] text-brand-stone dark:text-dark-muted font-medium mt-1 leading-relaxed">
                      Upgrade to tap into the high-intent local community network and boost referrals.
                    </p>
                  </div>

                  {/* Subscription card comparisons */}
                  <div className="space-y-3 pt-2">
                    
                    {/* Basic Plan */}
                    <div 
                      onClick={() => handleTierSelect('basic')}
                      className="p-4 bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/20 dark:border-dark-border rounded-2xl cursor-pointer hover:border-brand-sage transition duration-200 text-left flex justify-between items-center"
                    >
                      <div>
                        <div className="text-xs font-bold text-brand-charcoal dark:text-white">Basic Community</div>
                        <span className="text-[9px] text-brand-stone dark:text-dark-muted">Verify badge, basic analytics, 1 custom card</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-brand-charcoal dark:text-white">$12/mo</div>
                        <span className="text-[8px] font-extrabold text-brand-gold uppercase tracking-wider">+30 pts</span>
                      </div>
                    </div>

                    {/* Pro Plan (Best Value) */}
                    <div 
                      onClick={() => handleTierSelect('pro')}
                      className="p-4 bg-brand-warmWhite dark:bg-dark-card border-2 border-brand-forest rounded-2xl cursor-pointer hover:border-brand-sage transition duration-200 text-left flex justify-between items-center relative"
                    >
                      <span className="absolute -top-2.5 right-4 bg-brand-forest text-white text-[8px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">Best Value</span>
                      <div>
                        <div className="text-xs font-extrabold text-brand-charcoal dark:text-white">Growth Alliance</div>
                        <span className="text-[9px] text-brand-stone dark:text-dark-muted">Premium search boost, networking feed posting</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-brand-forest dark:text-brand-sage">$39/mo</div>
                        <span className="text-[8px] font-extrabold text-brand-gold uppercase tracking-wider">+100 pts</span>
                      </div>
                    </div>

                    {/* Premium Plan */}
                    <div 
                      onClick={() => handleTierSelect('premium')}
                      className="p-4 bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/20 dark:border-dark-border rounded-2xl cursor-pointer hover:border-brand-sage transition duration-200 text-left flex justify-between items-center"
                    >
                      <div>
                        <div className="text-xs font-bold text-brand-charcoal dark:text-white">Platinum Enterprise</div>
                        <span className="text-[9px] text-brand-stone dark:text-dark-muted">VIP client referrals, dedicated support representative</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-brand-charcoal dark:text-white">$89/mo</div>
                        <span className="text-[8px] font-extrabold text-brand-gold uppercase tracking-wider">+250 pts</span>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* STRIPE CHECKOUT PAYMENT FORM */}
              {checkoutStep === 'form' && selectedTier && (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[9px] font-extrabold text-brand-forest dark:text-brand-sage uppercase tracking-wider">Securing checkout</span>
                      <h3 className="text-lg font-extrabold text-brand-charcoal dark:text-white leading-tight">Alliance Payment Details</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-brand-charcoal dark:text-white">{currentTierDetails().name}</div>
                      <span className="text-sm font-black text-brand-forest dark:text-brand-sage">{currentTierDetails().price}</span>
                    </div>
                  </div>

                  <div className="bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/25 dark:border-dark-border p-4.5 rounded-2xl space-y-3.5 shadow-premium">
                    {/* Simulated Card input */}
                    <div className="space-y-1 text-left">
                      <label className="text-[9px] font-bold text-brand-stone dark:text-dark-muted uppercase tracking-wider">Credit Card Number</label>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4242 4242 4242 4242"
                        className="w-full p-2.5 rounded-xl bg-brand-cream dark:bg-dark-bg border border-brand-sand/20 dark:border-dark-border text-xs font-mono font-bold focus:outline-none focus:border-brand-sage"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3.5">
                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-bold text-brand-stone dark:text-dark-muted uppercase tracking-wider">Expiration Date</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full p-2.5 rounded-xl bg-brand-cream dark:bg-dark-bg border border-brand-sand/20 dark:border-dark-border text-xs font-mono font-bold focus:outline-none focus:border-brand-sage"
                        />
                      </div>
                      <div className="space-y-1 text-left">
                        <label className="text-[9px] font-bold text-brand-stone dark:text-dark-muted uppercase tracking-wider">Security Code (CVC)</label>
                        <input
                          type="text"
                          required
                          value={cardCVC}
                          onChange={(e) => setCardCVC(e.target.value)}
                          placeholder="123"
                          className="w-full p-2.5 rounded-xl bg-brand-cream dark:bg-dark-bg border border-brand-sand/20 dark:border-dark-border text-xs font-mono font-bold focus:outline-none focus:border-brand-sage"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Apple / Google Pay shortcuts */}
                  <div className="grid grid-cols-2 gap-3.5">
                    <button 
                      type="button" 
                      onClick={() => setCheckoutStep('processing')}
                      className="py-3 rounded-xl bg-brand-charcoal text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center justify-center space-x-1.5"
                    >
                      <span> Pay</span>
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setCheckoutStep('processing')}
                      className="py-3 rounded-xl bg-brand-warmWhite border border-brand-sand/20 text-brand-charcoal text-[10px] font-extrabold uppercase tracking-wider flex items-center justify-center space-x-1.5"
                    >
                      <span>G Pay</span>
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3.5 pt-3 border-t border-brand-sand/15 dark:border-dark-border">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('idle')}
                      className="flex-1 py-3.5 rounded-2xl bg-brand-warmWhite border border-brand-sand/15 text-brand-stone text-xs font-bold"
                    >
                      Cancel
                    </button>
                    
                    <button
                      type="submit"
                      className="flex-1 py-3.5 rounded-2xl bg-brand-forest hover:bg-brand-forest/90 text-white text-xs font-bold shadow-premium"
                    >
                      Pay Securely
                    </button>
                  </div>
                </form>
              )}

              {/* STRIPE PROCESSING VIEW */}
              {checkoutStep === 'processing' && (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full border-4 border-t-brand-forest border-brand-sand/25 animate-spin" />
                  <h3 className="text-base font-extrabold text-brand-charcoal dark:text-white">Authorizing Payment</h3>
                  <p className="text-xs text-brand-stone dark:text-dark-muted font-medium">Stripe is verification routing card credentials...</p>
                </div>
              )}

              {/* PAYMENT SUCCESS RECEIPT SCREEN */}
              {checkoutStep === 'success' && selectedTier && (
                <div className="py-6 flex flex-col items-center text-center space-y-5">
                  <div className="w-14 h-14 rounded-full bg-brand-sage/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-brand-forest" />
                  </div>
                  
                  <div>
                    <span className="text-[10px] font-extrabold text-brand-forest uppercase tracking-wider">Payment Received</span>
                    <h3 className="text-xl font-black text-brand-charcoal dark:text-white mt-1">Transaction Successful!</h3>
                    <p className="text-xs text-brand-stone dark:text-dark-muted font-medium mt-1">Receipt reference invoice: RTD-2026-9811</p>
                  </div>

                  {/* Receipt display table */}
                  <div className="w-full bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/25 dark:border-dark-border p-4.5 rounded-2xl text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-brand-stone font-semibold">Tier Plan</span>
                      <span className="font-bold text-brand-charcoal dark:text-white">{currentTierDetails().name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-stone font-semibold">Total Cost</span>
                      <span className="font-bold text-brand-charcoal dark:text-white">{currentTierDetails().price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-stone font-semibold">Reward Gain</span>
                      <span className="font-bold text-brand-gold uppercase tracking-wider">{currentTierDetails().points}</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default DashboardScreen;
