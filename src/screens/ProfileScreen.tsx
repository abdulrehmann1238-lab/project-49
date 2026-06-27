import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { mockBusinesses } from '../data/mockData';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Globe, 
  MessageSquare, 
  Calendar,
  ShieldCheck,
  Star,
  Check,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { activeBusinessId, setScreen, sendMessage, addPoints } = useAppStore();
  const biz = mockBusinesses.find(b => b.id === activeBusinessId) || mockBusinesses[0];

  const [activeTab, setActiveTab] = useState<'services' | 'reviews' | 'about'>('services');
  const [bookingService, setBookingService] = useState<{ name: string; price: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const dates = [
    { day: 'Mon', num: 29 },
    { day: 'Tue', num: 30 },
    { day: 'Wed', num: 1 },
    { day: 'Thu', num: 2 },
    { day: 'Fri', num: 3 }
  ];

  const timeSlots = ['9:00 AM', '10:30 AM', '1:00 PM', '3:30 PM', '5:00 PM'];

  const handleBack = () => {
    // Navigate back to home or explore
    setScreen('directory');
  };

  const handleChatOpen = () => {
    setScreen('chat');
  };

  const handleBookingSubmit = () => {
    if (selectedDate !== null && selectedTime !== null) {
      setBookingSuccess(true);
      // Give points to user for local engagement!
      addPoints(100);
      
      // Simulate booking confirmation message in chat
      setTimeout(() => {
        setBookingSuccess(false);
        setBookingService(null);
        setSelectedDate(null);
        setSelectedTime(null);
        setScreen('chat');
        
        // Add booking reply to state
        setTimeout(() => {
          sendMessage(
            biz.id, 
            `Hi! I've booked the "${bookingService?.name}" for Friday, Jul ${selectedDate} at ${selectedTime}. Looking forward to it!`
          );
        }, 500);
      }, 1500);
    }
  };

  return (
    <div className="flex-1 w-full overflow-y-auto no-scrollbar smooth-scroll relative bg-brand-cream dark:bg-dark-bg text-left">
      
      {/* Cover Header Image */}
      <div className="h-52 w-full relative bg-zinc-200">
        <img src={biz.coverImage} alt={biz.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Floating Back Action Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 w-9 h-9 rounded-full glass border border-white/20 flex items-center justify-center text-brand-charcoal dark:text-white shadow-premium active:scale-95 transition"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        {/* Floating Verification Badge */}
        {biz.isVerified && (
          <span className="absolute bottom-4 left-4 bg-brand-forest text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center space-x-1 shadow-premium">
            <ShieldCheck className="w-3 h-3 fill-current text-white" />
            <span>VERIFIED MEMBER</span>
          </span>
        )}
      </div>

      {/* Profile Header Details */}
      <div className="px-5 pt-4 pb-1.5 space-y-3.5">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-brand-charcoal dark:text-white leading-tight">{biz.name}</h1>
            <p className="text-[10px] text-brand-stone/60 dark:text-dark-muted/65 uppercase tracking-wider font-extrabold mt-0.5">{biz.category} • {biz.distance}</p>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-warmWhite dark:border-dark-border shadow-premium flex-shrink-0">
            <img src={biz.avatar} alt={biz.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Ownership Badges */}
        <div className="flex items-center space-x-1.5 flex-wrap">
          {biz.ownershipBadges.map((badge, idx) => (
            <span key={idx} className="bg-brand-sage/10 text-brand-forest dark:bg-brand-sage/20 dark:text-brand-sage text-[8px] font-extrabold px-2.5 py-0.75 rounded-md uppercase tracking-wider">
              {badge} owned
            </span>
          ))}
        </div>

        {/* Contact Quick Buttons grid */}
        <div className="grid grid-cols-4 gap-2 pt-2 border-y border-brand-sand/15 dark:border-dark-border py-3">
          <button 
            onClick={handleChatOpen}
            className="flex flex-col items-center py-2 px-1 rounded-xl bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border hover:bg-brand-sand/10 transition space-y-1 shadow-premium"
          >
            <MessageSquare className="w-4.5 h-4.5 text-brand-forest dark:text-brand-sage" />
            <span className="text-[8px] font-bold text-brand-stone dark:text-dark-text uppercase tracking-wider">Message</span>
          </button>
          
          <button 
            onClick={() => window.open(`tel:${biz.phone}`)}
            className="flex flex-col items-center py-2 px-1 rounded-xl bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border hover:bg-brand-sand/10 transition space-y-1 shadow-premium"
          >
            <Phone className="w-4.5 h-4.5 text-brand-ocean dark:text-sky" />
            <span className="text-[8px] font-bold text-brand-stone dark:text-dark-text uppercase tracking-wider">Call</span>
          </button>

          <button 
            onClick={() => setScreen('map')}
            className="flex flex-col items-center py-2 px-1 rounded-xl bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border hover:bg-brand-sand/10 transition space-y-1 shadow-premium"
          >
            <MapPin className="w-4.5 h-4.5 text-brand-terracotta" />
            <span className="text-[8px] font-bold text-brand-stone dark:text-dark-text uppercase tracking-wider">Directions</span>
          </button>

          <button 
            onClick={() => window.open(`https://${biz.website}`)}
            className="flex flex-col items-center py-2 px-1 rounded-xl bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border hover:bg-brand-sand/10 transition space-y-1 shadow-premium"
          >
            <Globe className="w-4.5 h-4.5 text-brand-gold" />
            <span className="text-[8px] font-bold text-brand-stone dark:text-dark-text uppercase tracking-wider">Website</span>
          </button>
        </div>
      </div>

      {/* Tabs selectors */}
      <div className="flex border-b border-brand-sand/15 dark:border-dark-border px-5">
        {(['services', 'reviews', 'about'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-3.5 px-4 font-bold text-xs uppercase tracking-wider border-b-2 transition relative ${
              activeTab === tab 
                ? 'text-brand-forest dark:text-brand-sage border-brand-forest dark:border-brand-sage' 
                : 'text-brand-stone/50 dark:text-dark-muted/50 border-transparent hover:text-brand-charcoal'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB CONTENTS */}
      <div className="px-5 py-5 pb-20">
        <AnimatePresence mode="wait">
          
          {/* Services Listing */}
          {activeTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-4"
            >
              {biz.services.map((service, idx) => (
                <div 
                  key={idx}
                  className="p-4 bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border rounded-2xl flex justify-between items-start shadow-premium hover:border-brand-sage dark:hover:border-brand-sage/40 transition duration-200"
                >
                  <div className="flex-1 pr-4">
                    <h3 className="text-sm font-extrabold text-brand-charcoal dark:text-white leading-tight">{service.name}</h3>
                    <div className="flex items-center space-x-2 text-[10px] text-brand-stone/60 dark:text-dark-muted/65 font-bold uppercase mt-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{service.duration}</span>
                    </div>
                    <p className="text-[11px] text-brand-stone dark:text-dark-muted leading-relaxed font-medium mt-2">{service.description}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-3.5">
                    <span className="text-sm font-extrabold text-brand-forest dark:text-brand-sage">{service.price}</span>
                    <button
                      onClick={() => setBookingService(service)}
                      className="py-1.5 px-3 rounded-lg bg-brand-charcoal text-white hover:bg-neutral-800 dark:bg-brand-warmWhite dark:text-brand-charcoal text-[9px] font-extrabold uppercase tracking-wider shadow-premium"
                    >
                      Book
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Reviews tab */}
          {activeTab === 'reviews' && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="text-3xl font-extrabold text-brand-charcoal dark:text-white">{biz.rating}</div>
                <div>
                  <div className="flex items-center text-brand-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <div className="text-[9px] font-bold text-brand-stone/60 dark:text-dark-muted/65 uppercase mt-0.5">Based on {biz.reviewsCount} reviews</div>
                </div>
              </div>

              {biz.reviews.map((rev) => (
                <div key={rev.id} className="p-4 bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border rounded-2xl space-y-2.5 shadow-premium">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-brand-sand/20">
                        <img src={rev.avatar} alt={rev.user} className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-brand-charcoal dark:text-white leading-none">{rev.user}</div>
                        <span className="text-[9px] text-brand-stone/50 dark:text-dark-muted/50 font-bold mt-0.5">{rev.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-brand-gold text-[10px] font-extrabold bg-brand-gold/10 px-2 py-0.5 rounded-lg">
                      <span>★ {rev.rating}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-brand-stone dark:text-dark-muted leading-relaxed font-medium">{rev.text}</p>
                </div>
              ))}
            </motion.div>
          )}

          {/* About description tab */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="space-y-4"
            >
              <div className="p-4.5 bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border rounded-2xl space-y-3.5 shadow-premium">
                <div>
                  <h3 className="text-xs font-extrabold text-brand-stone dark:text-dark-muted uppercase tracking-wider">Our Story</h3>
                  <p className="text-[11px] text-brand-stone dark:text-dark-text leading-relaxed font-medium mt-1.5">{biz.description}</p>
                </div>
                
                <div className="pt-3.5 border-t border-brand-sand/10 dark:border-dark-border text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-brand-stone dark:text-dark-muted font-semibold">Owner</span>
                    <span className="font-bold text-brand-charcoal dark:text-white flex items-center space-x-1.5">
                      <img src={biz.ownerAvatar} alt={biz.ownerName} className="w-4.5 h-4.5 rounded-full object-cover" />
                      <span>{biz.ownerName}</span>
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-stone dark:text-dark-muted font-semibold">Address</span>
                    <span className="font-bold text-brand-charcoal dark:text-white">{biz.address}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-brand-stone dark:text-dark-muted font-semibold">Hours</span>
                    <span className="font-bold text-brand-forest dark:text-brand-sage">Open: 8:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* APPOINTMENT BOOKING BOTTOM SHEET MODAL */}
      <AnimatePresence>
        {bookingService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-charcoal/60 dark:bg-black/80 z-50 flex flex-col justify-end"
          >
            {/* Click backdrop to exit */}
            <div className="flex-1" onClick={() => setBookingService(null)} />
            
            {/* Sheet wrapper */}
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-brand-cream dark:bg-neutral-900 border-t border-brand-sand/20 dark:border-neutral-800 rounded-t-[36px] p-6 max-h-[90%] overflow-y-auto shadow-premium-lg"
            >
              {/* Drag indicator pill */}
              <div className="w-12 h-1 rounded-full bg-brand-sand dark:bg-neutral-800 mx-auto mb-5" />

              <div className="text-left space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-extrabold text-brand-forest dark:text-brand-sage uppercase tracking-wider">Book service</span>
                    <h3 className="text-lg font-extrabold text-brand-charcoal dark:text-white leading-tight">{bookingService.name}</h3>
                  </div>
                  <span className="text-base font-extrabold text-brand-forest dark:text-brand-sage">{bookingService.price}</span>
                </div>

                {/* Calendar Schedule Grid */}
                <div className="space-y-3.5 pt-2">
                  <div className="text-[10px] font-bold text-brand-stone/60 dark:text-dark-muted uppercase tracking-wider">Select Date (Jul 2026)</div>
                  
                  <div className="flex justify-between items-center space-x-2.5">
                    {dates.map((date) => (
                      <button
                        key={date.num}
                        onClick={() => setSelectedDate(date.num)}
                        className={`flex-1 py-3 px-1 rounded-2xl border flex flex-col items-center transition ${
                          selectedDate === date.num 
                            ? 'bg-brand-charcoal border-brand-charcoal text-white dark:bg-brand-warmWhite dark:border-brand-warmWhite dark:text-brand-charcoal shadow-premium' 
                            : 'bg-brand-warmWhite dark:bg-dark-card border-brand-sand/20 dark:border-dark-border text-brand-stone dark:text-dark-text hover:bg-brand-sand/10'
                        }`}
                      >
                        <span className="text-[9px] font-bold uppercase tracking-wider mb-1 opacity-70">{date.day}</span>
                        <span className="text-sm font-extrabold">{date.num}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Time slots Selector */}
                <div className="space-y-3.5 pt-2">
                  <div className="text-[10px] font-bold text-brand-stone/60 dark:text-dark-muted uppercase tracking-wider">Select Time Slot</div>
                  
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2 px-3 rounded-xl border text-[10px] font-bold tracking-wide transition ${
                          selectedTime === slot
                            ? 'bg-brand-forest border-brand-forest text-white dark:bg-brand-sage dark:border-brand-sage dark:text-brand-charcoal shadow-premium' 
                            : 'bg-brand-warmWhite dark:bg-dark-card border-brand-sand/20 dark:border-dark-border text-brand-stone dark:text-dark-text hover:bg-brand-sand/10'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Booking actions */}
                <div className="pt-6 border-t border-brand-sand/15 dark:border-dark-border">
                  <button
                    onClick={handleBookingSubmit}
                    disabled={selectedDate === null || selectedTime === null || bookingSuccess}
                    className={`w-full py-4 rounded-2xl font-semibold text-sm flex items-center justify-center space-x-2 transition shadow-premium ${
                      selectedDate !== null && selectedTime !== null
                        ? 'bg-brand-forest hover:bg-brand-forest/90 text-white'
                        : 'bg-brand-sand/30 dark:bg-dark-card dark:border dark:border-dark-border text-brand-stone/40 dark:text-dark-muted/40 cursor-not-allowed'
                    }`}
                  >
                    {bookingSuccess ? (
                      <div className="flex items-center space-x-2">
                        <Check className="w-5 h-5 text-white animate-bounce" />
                        <span>Appointment Booked! (+100 XP)</span>
                      </div>
                    ) : (
                      <>
                        <Calendar className="w-4.5 h-4.5" />
                        <span>Confirm Appointment Booking</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default ProfileScreen;
