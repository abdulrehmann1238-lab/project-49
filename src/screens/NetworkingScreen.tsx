import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { mockEvents } from '../data/mockData';
import { 
  MessageSquare, 
  ThumbsUp, 
  Share2, 
  PenSquare, 
  X, 
  Plus, 
  Briefcase, 
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Megaphone
} from 'lucide-react';

export const NetworkingScreen: React.FC = () => {
  const { posts, addPost, likePost, addPoints, setScreen } = useAppStore();
  const [showPostModal, setShowPostModal] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState<'Collaboration' | 'Referral' | 'Advice' | 'General'>('Collaboration');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (postContent.trim()) {
      addPost(postContent, postCategory);
      addPoints(50); // Get community engagement points
      setPostContent('');
      setShowPostModal(false);
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Collaboration':
        return 'bg-brand-sage/10 text-brand-forest dark:bg-brand-sage/20 dark:text-brand-sage';
      case 'Referral':
        return 'bg-brand-ocean/10 text-brand-ocean dark:bg-brand-ocean/20 dark:text-sky';
      case 'Advice':
        return 'bg-brand-gold/15 text-brand-gold';
      default:
        return 'bg-brand-sand/30 text-brand-stone dark:bg-dark-border dark:text-dark-muted';
    }
  };

  return (
    <div className="flex-1 w-full overflow-y-auto no-scrollbar smooth-scroll relative px-5 pt-4 pb-8 space-y-6 text-left">
      
      {/* Page Title */}
      <div className="mt-3 flex justify-between items-center">
        <div>
          <span className="text-[10px] font-bold text-brand-stone dark:text-dark-muted uppercase tracking-wider">Local Alliance</span>
          <h2 className="text-2xl font-extrabold tracking-tight text-brand-charcoal dark:text-white leading-tight">Networking</h2>
        </div>
        
        {/* Events Schedule quick trigger */}
        <button
          onClick={() => {
            // Quick trigger showing upcoming event tickets
            useAppStore.getState().triggerNotification(
              'Event Registered!',
              'You registered for Community Mindful Sunday. Ticket generated!',
              'event'
            );
          }}
          className="bg-brand-sage/10 border border-brand-sage/20 text-brand-forest dark:bg-brand-sage/20 dark:text-brand-sage text-[9px] font-extrabold px-3 py-2 rounded-xl uppercase tracking-wider shadow-premium flex items-center space-x-1 hover:bg-brand-sage/15 active:scale-95 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Register Event</span>
        </button>
      </div>

      {/* UPCOMING COMMUNITY EVENT CORNER */}
      <div className="space-y-3">
        <div className="flex items-center space-x-1.5 text-brand-stone dark:text-dark-muted">
          <Megaphone className="w-4 h-4 text-brand-forest dark:text-brand-sage" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider">Featured Event</span>
        </div>
        
        {mockEvents.slice(0, 1).map((event) => (
          <div 
            key={event.id}
            className="bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border rounded-3xl overflow-hidden shadow-premium"
          >
            <div className="h-28 relative">
              <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/35" />
              <span className="absolute top-3 left-3 bg-brand-gold text-brand-charcoal text-[8px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {event.price}
              </span>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="text-sm font-extrabold text-brand-charcoal dark:text-white">{event.title}</h3>
              <p className="text-[10px] text-brand-stone dark:text-dark-muted font-medium line-clamp-2">{event.description}</p>
              
              <div className="flex items-center justify-between pt-2 border-t border-brand-sand/10 dark:border-dark-border text-[9px] text-brand-stone/60 dark:text-dark-muted/65 font-bold uppercase">
                <span>📅 {event.date}</span>
                <span className="text-brand-forest dark:text-brand-sage font-extrabold">{event.attendees} Attending</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* REUSABLE SOCIAL NETWORKING POSTS FEED */}
      <div className="space-y-4">
        <div className="text-[10px] font-extrabold text-brand-stone/75 dark:text-dark-muted uppercase tracking-wider">Alliance Feed</div>

        <div className="space-y-4">
          {posts.map((post) => (
            <div 
              key={post.id}
              className="p-4 bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border rounded-3xl space-y-3.5 shadow-premium"
            >
              {/* Author header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-brand-sand/20">
                    <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-extrabold text-brand-charcoal dark:text-white flex items-center space-x-1">
                      <span>{post.author.name}</span>
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-forest dark:text-brand-sage fill-brand-sage/10" />
                    </div>
                    <span className="text-[9px] text-brand-stone/60 dark:text-dark-muted/65 font-bold">{post.author.business} • {post.author.role}</span>
                  </div>
                </div>
                <span className="text-[9px] text-brand-stone/50 dark:text-dark-muted/50 font-bold">{post.timeAgo}</span>
              </div>

              {/* Feed Content text */}
              <p className="text-xs text-brand-charcoal dark:text-dark-text leading-relaxed font-medium">{post.content}</p>

              {/* Category chip */}
              <div>
                <span className={`text-[8px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
              </div>

              {/* Like / Comment Actions */}
              <div className="flex justify-between items-center pt-2.5 border-t border-brand-sand/10 dark:border-dark-border text-[10px] font-bold text-brand-stone/60 dark:text-dark-muted/65 uppercase tracking-wider">
                <button
                  onClick={() => likePost(post.id)}
                  className={`flex items-center space-x-1.5 transition ${post.hasLiked ? 'text-brand-forest dark:text-brand-sage font-extrabold' : 'hover:text-brand-charcoal'}`}
                >
                  <ThumbsUp className={`w-4 h-4 ${post.hasLiked ? 'fill-current' : ''}`} />
                  <span>{post.likes} Likes</span>
                </button>

                <div className="flex items-center space-x-1.5">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.commentsCount} Comments</span>
                </div>

                <button 
                  onClick={() => {
                    useAppStore.getState().triggerNotification(
                      'Link Shared',
                      'Collaboration post link copied to clipboard.',
                      'system'
                    );
                  }}
                  className="hover:text-brand-charcoal"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FLOATING ACTION ACTION POSTING BUTTON */}
      <button
        onClick={() => setShowPostModal(true)}
        className="fixed bottom-24 right-8 w-12 h-12 rounded-full bg-brand-charcoal dark:bg-brand-warmWhite hover:bg-neutral-800 text-white dark:text-brand-charcoal flex items-center justify-center shadow-premium-lg z-30 transition hover:scale-105 active:scale-95"
      >
        <PenSquare className="w-5.5 h-5.5 text-brand-sage dark:text-brand-charcoal" />
      </button>

      {/* CREATE POST MODAL SHEET */}
      <AnimatePresence>
        {showPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-charcoal/60 dark:bg-black/80 z-50 flex flex-col justify-end"
          >
            <div className="flex-1" onClick={() => setShowPostModal(false)} />
            
            <motion.form
              onSubmit={handleCreatePost}
              initial={{ y: 250 }}
              animate={{ y: 0 }}
              exit={{ y: 250 }}
              className="bg-brand-cream dark:bg-neutral-900 border-t border-brand-sand/20 dark:border-neutral-800 rounded-t-[36px] p-6 text-left shadow-premium-lg"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-extrabold text-brand-charcoal dark:text-white uppercase tracking-wider">Create Feed Announcement</h3>
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="w-7 h-7 rounded-full bg-brand-sand/20 flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-brand-stone" />
                </button>
              </div>

              {/* Category chip selector */}
              <div className="space-y-2 mb-4">
                <div className="text-[9px] font-bold text-brand-stone/60 dark:text-dark-muted uppercase tracking-wider">Choose Category</div>
                <div className="flex flex-wrap gap-2">
                  {(['Collaboration', 'Referral', 'Advice', 'General'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setPostCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-[9px] font-bold tracking-wider uppercase border transition ${
                        postCategory === cat
                          ? 'bg-brand-charcoal border-brand-charcoal text-white dark:bg-brand-warmWhite dark:border-brand-warmWhite dark:text-brand-charcoal'
                          : 'bg-brand-warmWhite border-brand-sand/15 dark:bg-dark-card dark:border-dark-border text-brand-stone dark:text-dark-text'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Post details textarea */}
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="What collaboration or referral do you want to share with local owners?"
                rows={4}
                className="w-full p-4 rounded-2xl bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/35 dark:border-dark-border text-xs font-medium focus:outline-none focus:border-brand-sage dark:focus:border-brand-sage resize-none transition"
              />

              {/* Submit trigger */}
              <button
                type="submit"
                disabled={!postContent.trim()}
                className={`w-full py-3.5 mt-4 rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 transition shadow-premium ${
                  postContent.trim()
                    ? 'bg-brand-forest hover:bg-brand-forest/90 text-white'
                    : 'bg-brand-sand/30 dark:bg-dark-card dark:border dark:border-dark-border text-brand-stone/40 dark:text-dark-muted/40 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Post Announcement (+50 XP)</span>
              </button>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default NetworkingScreen;
