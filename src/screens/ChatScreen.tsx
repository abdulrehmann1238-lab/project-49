import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { mockBusinesses } from '../data/mockData';
import { 
  ArrowLeft, 
  Send, 
  Mic, 
  Image, 
  Play, 
  Pause,
  CheckCheck,
  Check,
  Phone,
  Video
} from 'lucide-react';

export const ChatScreen: React.FC = () => {
  const { activeBusinessId, setScreen, chats, sendMessage } = useAppStore();
  const biz = mockBusinesses.find(b => b.id === activeBusinessId) || mockBusinesses[0];

  const [inputVal, setInputVal] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeChats = chats[biz.id] || [];

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChats, isTyping]);

  // Simulate typing indicator when activeChats length increases (e.g. user sends message)
  useEffect(() => {
    if (activeChats.length > 0 && activeChats[activeChats.length - 1].senderId === 'user') {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1800);
      return () => clearTimeout(timer);
    }
  }, [activeChats]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      sendMessage(biz.id, inputVal.trim());
      setInputVal('');
    }
  };

  const handleSendVoice = () => {
    sendMessage(biz.id, undefined, '0:14');
  };

  const toggleAudio = (msgId: string) => {
    if (isPlayingAudio === msgId) {
      setIsPlayingAudio(null);
    } else {
      setIsPlayingAudio(msgId);
      // Stop playing after 3 seconds
      setTimeout(() => {
        setIsPlayingAudio(null);
      }, 3000);
    }
  };

  const handleBack = () => {
    setScreen('profile');
  };

  return (
    <div className="absolute inset-0 bg-[#FCFAF7] dark:bg-dark-bg flex flex-col justify-between z-40 overflow-hidden text-left">
      
      {/* Top Header chat details */}
      <div className="pt-12 pb-3 px-5 border-b border-brand-sand/15 dark:border-dark-border bg-brand-warmWhite/90 dark:bg-dark-card/90 backdrop-blur-md flex items-center justify-between z-10 flex-shrink-0">
        <div className="flex items-center space-x-3.5">
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-full bg-brand-cream/80 dark:bg-dark-bg border border-brand-sand/35 dark:border-dark-border flex items-center justify-center text-brand-charcoal dark:text-white hover:opacity-85 transition"
          >
            <ArrowLeft className="w-5 h-5 text-brand-stone dark:text-dark-muted" />
          </button>
          
          <div className="flex items-center space-x-2.5 cursor-pointer" onClick={handleBack}>
            <div className="w-9 h-9 rounded-full overflow-hidden border border-brand-sand/20">
              <img src={biz.avatar} alt={biz.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-xs font-extrabold text-brand-charcoal dark:text-white leading-tight truncate max-w-[120px]">{biz.name}</h3>
              <span className="text-[9px] text-brand-forest dark:text-brand-sage font-bold flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-forest dark:bg-brand-sage animate-pulse mr-1" />
                <span>Online</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="text-brand-stone hover:text-brand-charcoal transition"><Phone className="w-4.5 h-4.5" /></button>
          <button className="text-brand-stone hover:text-brand-charcoal transition"><Video className="w-4.5 h-4.5" /></button>
        </div>
      </div>

      {/* CHAT MESSAGES PANEL */}
      <div className="flex-1 w-full overflow-y-auto no-scrollbar smooth-scroll p-5 space-y-4 bg-brand-cream dark:bg-dark-bg">
        
        {/* Intro notice banner */}
        <div className="text-center py-2 bg-brand-warmWhite dark:bg-dark-card border border-brand-sand/15 dark:border-dark-border rounded-xl max-w-xs mx-auto text-[9px] text-brand-stone/60 dark:text-dark-muted font-bold uppercase tracking-wider">
          🔒 Encrypted local business covenant channel
        </div>

        {activeChats.map((msg) => {
          const isUser = msg.senderId === 'user';
          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'} w-full`}
            >
              {/* Message box wrapper */}
              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-xs font-semibold leading-relaxed shadow-premium ${
                  isUser
                    ? 'bg-brand-charcoal text-[#FCFAF7] rounded-tr-sm dark:bg-brand-warmWhite dark:text-brand-charcoal'
                    : 'bg-brand-warmWhite text-brand-charcoal border border-brand-sand/15 dark:bg-dark-card dark:border-dark-border dark:text-dark-text rounded-tl-sm'
                }`}
              >
                {/* Check for standard text or simulated audio file */}
                {msg.text ? (
                  <p>{msg.text}</p>
                ) : (
                  /* Audio message wave simulation rendering */
                  <div className="flex items-center space-x-3.5 py-1">
                    <button
                      onClick={() => toggleAudio(msg.id)}
                      className={`w-7.5 h-7.5 rounded-full flex items-center justify-center transition shadow-premium ${
                        isUser 
                          ? 'bg-[#FCFAF7]/15 hover:bg-[#FCFAF7]/20 text-[#FCFAF7] dark:bg-brand-charcoal/10 dark:text-brand-charcoal' 
                          : 'bg-brand-sand/20 hover:bg-brand-sand/30 text-brand-charcoal dark:text-white'
                      }`}
                    >
                      {isPlayingAudio === msg.id ? (
                        <Pause className="w-3.5 h-3.5 fill-current" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </button>
                    
                    {/* Simulated vector audio wave visual */}
                    <div className="flex items-end space-x-1 h-5 w-24">
                      {[...Array(12)].map((_, i) => {
                        const randomHeight = isPlayingAudio === msg.id
                          ? [8, 20, 10, 16, 6][(i + Math.floor(Math.random() * 5)) % 5]
                          : 4 + (i % 3) * 3;
                        return (
                          <motion.span
                            key={i}
                            animate={{ height: randomHeight }}
                            transition={{ duration: 0.3 }}
                            className={`w-0.75 rounded-full ${isUser ? 'bg-[#FCFAF7] dark:bg-brand-charcoal' : 'bg-brand-stone dark:bg-dark-muted'}`}
                          />
                        );
                      })}
                    </div>

                    <span className={`text-[9px] font-bold ${isUser ? 'text-zinc-400' : 'text-brand-stone dark:text-dark-muted'}`}>
                      {msg.audioDuration}
                    </span>
                  </div>
                )}

                {/* Footer time & ticks */}
                <div className={`flex justify-end items-center space-x-1 text-[9px] mt-1.5 opacity-60 leading-none ${isUser ? 'text-zinc-400' : 'text-brand-stone'}`}>
                  <span>{msg.timestamp}</span>
                  {isUser && (
                    msg.isRead ? (
                      <CheckCheck className="w-3.5 h-3.5 text-brand-sage dark:text-brand-charcoal" />
                    ) : (
                      <Check className="w-3.5 h-3.5" />
                    )
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* TYPING PULSING INDICATOR BUBBLE */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 5 }}
              className="flex justify-start w-full"
            >
              <div className="bg-brand-warmWhite border border-brand-sand/15 dark:bg-dark-card dark:border-dark-border px-4.5 py-3 rounded-2xl rounded-tl-sm flex items-center space-x-1.5 shadow-premium">
                <span className="text-[9px] font-extrabold text-brand-stone dark:text-dark-muted uppercase tracking-wider mr-1">
                  {biz.name.split(' ')[0]} is typing
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-stone/60 dark:bg-dark-muted animate-bounce" style={{ animationDelay: '0s' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-stone/60 dark:bg-dark-muted animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-stone/60 dark:bg-dark-muted animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* INPUT FORM CONTAINER */}
      <form
        onSubmit={handleSend}
        className="p-3 border-t border-brand-sand/15 dark:border-dark-border bg-brand-warmWhite/90 dark:bg-dark-card/90 flex items-center space-x-2.5 z-10 flex-shrink-0"
      >
        <button
          type="button"
          onClick={handleSendVoice}
          className="w-10 h-10 rounded-xl bg-brand-cream border border-brand-sand/20 dark:bg-dark-bg dark:border-dark-border flex items-center justify-center text-brand-stone dark:text-dark-text hover:bg-brand-sand/10 transition flex-shrink-0"
        >
          <Mic className="w-4.5 h-4.5" />
        </button>

        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Message..."
          className="flex-1 px-4 py-2.5 rounded-xl bg-brand-cream dark:bg-dark-bg border border-brand-sand/20 dark:border-dark-border text-xs font-semibold focus:outline-none focus:border-brand-sage flex-shrink-1"
        />

        {inputVal.trim() ? (
          <button
            type="submit"
            className="w-10 h-10 rounded-xl bg-brand-forest text-white dark:bg-brand-sage dark:text-brand-charcoal flex items-center justify-center shadow-premium transition flex-shrink-0"
          >
            <Send className="w-4 h-4 fill-current rotate-0" />
          </button>
        ) : (
          <button
            type="button"
            className="w-10 h-10 rounded-xl bg-brand-cream border border-brand-sand/20 dark:bg-dark-bg dark:border-dark-border flex items-center justify-center text-brand-stone dark:text-dark-text hover:bg-brand-sand/10 transition flex-shrink-0"
          >
            <Image className="w-4.5 h-4.5" />
          </button>
        )}
      </form>

    </div>
  );
};
export default ChatScreen;
