import { create } from 'zustand';
import { 
  mockBusinesses, 
  mockPosts, 
  mockEvents, 
  mockJobs, 
  initialChats, 
  mockNotifications,
  Business, 
  Post, 
  Event, 
  Job, 
  ChatMessage, 
  NotificationItem 
} from '../data/mockData';

export type ScreenType = 
  | 'loading' 
  | 'splash' 
  | 'onboarding' 
  | 'login' 
  | 'home' 
  | 'directory' 
  | 'profile' 
  | 'map' 
  | 'loyalty' 
  | 'networking' 
  | 'membership' 
  | 'dashboard' 
  | 'chat'
  | 'qr';

interface AppState {
  currentScreen: ScreenType;
  prevScreen: ScreenType;
  onboardingStep: number;
  activeBusinessId: string | null;
  searchQuery: string;
  filterBadge: string;
  userPoints: number;
  userCoupons: { id: string; code: string; businessName: string; discount: string }[];
  posts: Post[];
  chats: Record<string, ChatMessage[]>;
  notifications: NotificationItem[];
  activeNotification: NotificationItem | null;
  darkMode: boolean;
  isLoggedIn: boolean;
  
  // Actions
  setScreen: (screen: ScreenType) => void;
  nextOnboardingStep: () => void;
  prevOnboardingStep: () => void;
  setActiveBusinessId: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  setFilterBadge: (badge: string) => void;
  addPoints: (points: number) => void;
  addCoupon: (coupon: { id: string; code: string; businessName: string; discount: string }) => void;
  addPost: (content: string, category: Post['category']) => void;
  likePost: (id: string) => void;
  sendMessage: (businessId: string, text?: string, audioDuration?: string) => void;
  triggerNotification: (title: string, body: string, type: NotificationItem['type']) => void;
  clearActiveNotification: () => void;
  toggleDarkMode: () => void;
  login: () => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentScreen: 'loading',
  prevScreen: 'loading',
  onboardingStep: 0,
  activeBusinessId: null,
  searchQuery: '',
  filterBadge: 'All',
  userPoints: 350,
  userCoupons: [],
  posts: mockPosts,
  chats: initialChats,
  notifications: mockNotifications,
  activeNotification: null,
  darkMode: false,
  isLoggedIn: false,

  setScreen: (screen) => set((state) => {
    // If transitioning away from dynamic island, clear it
    if (state.activeNotification) {
      return { prevScreen: state.currentScreen, currentScreen: screen, activeNotification: null };
    }
    return { prevScreen: state.currentScreen, currentScreen: screen };
  }),

  nextOnboardingStep: () => set((state) => {
    if (state.onboardingStep < 2) {
      return { onboardingStep: state.onboardingStep + 1 };
    } else {
      return { currentScreen: 'login' };
    }
  }),

  prevOnboardingStep: () => set((state) => {
    if (state.onboardingStep > 0) {
      return { onboardingStep: state.onboardingStep - 1 };
    }
    return {};
  }),

  setActiveBusinessId: (id) => set({ activeBusinessId: id }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setFilterBadge: (badge) => set({ filterBadge: badge }),
  
  addPoints: (points) => set((state) => {
    const nextPoints = state.userPoints + points;
    // Trigger notification when points are earned
    setTimeout(() => {
      get().triggerNotification(
        'Points Earned!', 
        `You gained +${points} points! Total: ${nextPoints} points.`, 
        'reward'
      );
    }, 1500);
    return { userPoints: nextPoints };
  }),
  
  addCoupon: (coupon) => set((state) => ({
    userCoupons: [coupon, ...state.userCoupons]
  })),

  addPost: (content, category) => set((state) => {
    const newPost: Post = {
      id: `p_${Date.now()}`,
      author: {
        name: 'Alex Mercer (You)',
        business: 'Local Sphere LLC',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60',
        role: 'Community Member'
      },
      content,
      likes: 0,
      commentsCount: 0,
      hasLiked: false,
      timeAgo: 'Just now',
      category
    };
    return { posts: [newPost, ...state.posts] };
  }),

  likePost: (id) => set((state) => ({
    posts: state.posts.map((post) => {
      if (post.id === id) {
        return {
          ...post,
          likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
          hasLiked: !post.hasLiked
        };
      }
      return post;
    })
  })),

  sendMessage: (businessId, text, audioDuration) => set((state) => {
    const chatHistory = state.chats[businessId] || [];
    const newMessage: ChatMessage = {
      id: `m_${Date.now()}`,
      senderId: 'user',
      text,
      audioDuration,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true
    };
    
    const updatedChats = {
      ...state.chats,
      [businessId]: [...chatHistory, newMessage]
    };

    // Simulate reply after 2 seconds
    setTimeout(() => {
      const biz = mockBusinesses.find(b => b.id === businessId);
      const replyMessage: ChatMessage = {
        id: `m_${Date.now() + 1}`,
        senderId: businessId,
        text: text 
          ? `Thanks for your message! This is Elena from ${biz?.name || 'our shop'}. We\'d love to host you. Let me know if you need anything else!`
          : `Got your voice message! Listening now. Talk soon!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false
      };
      
      set((s) => {
        const currentBizChats = s.chats[businessId] || [];
        // Trigger notification if not active on chat screen or activeBusinessId is different
        if (s.currentScreen !== 'chat' || s.activeBusinessId !== businessId) {
          s.triggerNotification(
            `New message from ${biz?.name || 'Partner'}`,
            replyMessage.text || 'Sent an audio message.',
            'networking'
          );
        }
        return {
          chats: {
            ...s.chats,
            [businessId]: [...currentBizChats, replyMessage]
          }
        };
      });
    }, 2000);

    return { chats: updatedChats };
  }),

  triggerNotification: (title, body, type) => {
    const newNotif: NotificationItem = {
      id: `n_${Date.now()}`,
      title,
      body,
      time: 'Just now',
      type,
      isRead: false
    };
    set((state) => ({
      notifications: [newNotif, ...state.notifications],
      activeNotification: newNotif
    }));
  },

  clearActiveNotification: () => set({ activeNotification: null }),
  
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  
  login: () => set({ isLoggedIn: true, currentScreen: 'home' }),
  
  logout: () => set({ isLoggedIn: false, currentScreen: 'splash', activeBusinessId: null })
}));
