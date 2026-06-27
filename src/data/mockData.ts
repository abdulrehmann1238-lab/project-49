export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  coverImage: string;
  avatar: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  address: string;
  phone: string;
  website: string;
  tags: string[];
  ownerName: string;
  ownerAvatar: string;
  isVerified: boolean;
  ownershipBadges: ('Minority' | 'Women' | 'Veteran' | 'Black' | 'Latino' | 'Asian')[];
  gallery: string[];
  services: { name: string; price: string; duration: string; description: string }[];
  reviews: { id: string; user: string; avatar: string; rating: number; date: string; text: string }[];
}

export interface Post {
  id: string;
  author: {
    name: string;
    business: string;
    avatar: string;
    role: string;
  };
  content: string;
  likes: number;
  commentsCount: number;
  hasLiked: boolean;
  timeAgo: string;
  category: 'Collaboration' | 'Referral' | 'Event' | 'Advice' | 'General';
}

export interface Event {
  id: string;
  title: string;
  organizer: string;
  organizerAvatar: string;
  date: string;
  time: string;
  location: string;
  price: string;
  coverImage: string;
  description: string;
  attendees: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  salary: string;
  postedAgo: string;
  description: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text?: string;
  audioDuration?: string;
  image?: string;
  timestamp: string;
  isRead: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  type: 'networking' | 'event' | 'reward' | 'system';
  isRead: boolean;
}

export const mockBusinesses: Business[] = [
  {
    id: 'b1',
    name: 'Sage & Stone Cafe',
    category: 'Food & Beverage',
    description: 'A cozy, plant-filled coffee shop sourcing organic ingredients directly from local family farms. Famous for our house-made cardamom lattes and sourdough pastries.',
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=60',
    avatar: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=150&auto=format&fit=crop&q=60',
    rating: 4.9,
    reviewsCount: 142,
    distance: '0.4 miles',
    address: '422 Sage Blvd, Suite A',
    phone: '(555) 321-9876',
    website: 'www.sageandstone.com',
    tags: ['Organic', 'Coffee', 'Bakery', 'Outdoor Seating'],
    ownerName: 'Elena Rostova',
    ownerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60',
    isVerified: true,
    ownershipBadges: ['Women', 'Minority'],
    gallery: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&auto=format&fit=crop&q=60'
    ],
    services: [
      { name: 'Coffee Tasting Workshop', price: '$35', duration: '60 min', description: 'Sample single-origin brews guided by our head barista and take home a custom bean blend.' },
      { name: 'Table Reservation (Quiet Zone)', price: 'Free', duration: '2 hours', description: 'Reserve a guaranteed desk space with fast Wi-Fi and power outlets.' },
      { name: 'Pastry Box Catering', price: '$48', duration: '1 day notice', description: 'An assortment of 12 fresh pastries, perfect for morning meetings.' }
    ],
    reviews: [
      { id: 'r1', user: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60', rating: 5, date: 'Yesterday', text: 'The atmosphere is incredibly peaceful, and the saffron bun is a revelation. Will be back with my laptop!' },
      { id: 'r2', user: 'Clara Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60', rating: 5, date: '3 days ago', text: 'Best local networking space. I met two clients right here. Their coffee is premium grade.' }
    ]
  },
  {
    id: 'b2',
    name: 'Forest Oak Woodworks',
    category: 'Home & Craft',
    description: 'Custom handcrafted furniture made from sustainably reclaimed urban forestry. Every piece carries the signature ring structure and character of aged local trees.',
    coverImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=60',
    avatar: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=150&auto=format&fit=crop&q=60',
    rating: 4.8,
    reviewsCount: 64,
    distance: '1.2 miles',
    address: '887 Industrial Parkway',
    phone: '(555) 765-4321',
    website: 'www.forestoakwoodworks.com',
    tags: ['Sustainable', 'Handmade', 'Custom Order', 'Furniture'],
    ownerName: 'James Carter',
    ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60',
    isVerified: true,
    ownershipBadges: ['Veteran'],
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=60'
    ],
    services: [
      { name: 'Custom Dining Table Consultation', price: 'Free', duration: '45 min', description: 'Discuss wood species, dimensions, and metal base selections for your custom dining room project.' },
      { name: 'Wood Restoration Service', price: '$120+', duration: 'Varies', description: 'Bring in a family heirloom for stripping, sanding, and organic oil refinishing.' }
    ],
    reviews: [
      { id: 'r3', user: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60', rating: 5, date: '1 week ago', text: 'James built us a stunning white oak coffee table. Excellent communication throughout the build.' }
    ]
  },
  {
    id: 'b3',
    name: 'Sol Yoga & Mindfulness',
    category: 'Health & Wellness',
    description: 'A sanctuary dedicated to somatic healing, vinyasa flows, and sound bath meditation. We believe movement is medicine and community heals.',
    coverImage: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=60',
    avatar: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=150&auto=format&fit=crop&q=60',
    rating: 4.95,
    reviewsCount: 98,
    distance: '0.8 miles',
    address: '15 Ocean Drive, Suite 104',
    phone: '(555) 456-7890',
    website: 'www.solyogaflow.com',
    tags: ['Meditation', 'Yoga', 'Sound Healing', 'In-Person'],
    ownerName: 'Priya Patel',
    ownerAvatar: 'https://images.unsplash.com/photo-1534751516642-a131ffd1037f?w=100&auto=format&fit=crop&q=60',
    isVerified: true,
    ownershipBadges: ['Minority', 'Women', 'Asian'],
    gallery: [
      'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=600&auto=format&fit=crop&q=60'
    ],
    services: [
      { name: 'Intro Sound Bath Healing', price: '$25', duration: '45 min', description: 'Settle into restorative poses while crystal singing bowls restore your nervous system.' },
      { name: '1-on-1 Somatic Coaching', price: '$90', duration: '75 min', description: 'Personalized alignment, breathwork, and emotional release session with Priya.' }
    ],
    reviews: [
      { id: 'r4', user: 'Jordan West', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=60', rating: 5, date: '2 weeks ago', text: 'Stunning space and incredible sound bath. I felt light as a feather afterward.' }
    ]
  },
  {
    id: 'b4',
    name: 'Ocean Pearl Bistro',
    category: 'Food & Beverage',
    description: 'Upscale coastal dining focused on sustainable wild-caught seafood and organic local microgreens. Enjoy our heated seaside patio.',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=60',
    avatar: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=150&auto=format&fit=crop&q=60',
    rating: 4.7,
    reviewsCount: 215,
    distance: '1.5 miles',
    address: '1 Marina Promenade',
    phone: '(555) 888-2323',
    website: 'www.oceanpearlbistro.com',
    tags: ['Seafood', 'Fine Dining', 'Wine Bar', 'Sea View'],
    ownerName: 'Mateo Rodriguez',
    ownerAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&auto=format&fit=crop&q=60',
    isVerified: true,
    ownershipBadges: ['Minority', 'Latino'],
    gallery: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=60'
    ],
    services: [
      { name: '5-Course Seafood Tasting', price: '$85', duration: '2 hours', description: 'Chef Mateo curates a journey of wild-caught treats with wine pairings.' },
      { name: 'Patio Private Dining Booking', price: '$200', duration: '3 hours', description: 'Reserve our glass-screened sea view deck for groups up to 10.' }
    ],
    reviews: [
      { id: 'r5', user: 'Emily Davis', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=60', rating: 5, date: '1 month ago', text: 'The lobster ravioli was absolutely phenomenal. Service was five-star.' }
    ]
  },
  {
    id: 'b5',
    name: 'Roots & Heritage Boutique',
    category: 'Fashion & Retail',
    description: 'An artisanal clothing boutique specializing in hand-woven ethical fabrics, vintage apparel, and unique lifestyle products supporting global and local craft makers.',
    coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=60',
    avatar: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=150&auto=format&fit=crop&q=60',
    rating: 4.9,
    reviewsCount: 78,
    distance: '0.6 miles',
    address: '110 Heritage Sq',
    phone: '(555) 999-8811',
    website: 'www.rootsheritage.com',
    tags: ['Ethical', 'Clothing', 'Artisanal', 'Boutique'],
    ownerName: 'Nia Mbeki',
    ownerAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&auto=format&fit=crop&q=60',
    isVerified: true,
    ownershipBadges: ['Black', 'Women', 'Minority'],
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1567401893930-7db7158576e8?w=600&auto=format&fit=crop&q=60'
    ],
    services: [
      { name: 'Custom Wardrobe Styling', price: '$50', duration: '60 min', description: 'Nia curates a capsule selection of sustainable designs customized to your color archetype.' }
    ],
    reviews: [
      { id: 'r6', user: 'Aaliyah Cole', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=60', rating: 5, date: '3 weeks ago', text: 'Beautiful clothes that actually have a story. The linen sets fit perfectly!' }
    ]
  }
];

export const mockPosts: Post[] = [
  {
    id: 'p1',
    author: {
      name: 'Elena Rostova',
      business: 'Sage & Stone Cafe',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=60',
      role: 'Founder & Head Pastry Chef'
    },
    content: 'Looking for a local designer to collaborate on designing our eco-friendly takeaway cups and bags. We want to feature art that represents our local community forest! Open to trading delicious coffee + marketing spotlight, or paid contracting. Let\'s chat!',
    likes: 24,
    commentsCount: 8,
    hasLiked: false,
    timeAgo: '2 hours ago',
    category: 'Collaboration'
  },
  {
    id: 'p2',
    author: {
      name: 'James Carter',
      business: 'Forest Oak Woodworks',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60',
      role: 'Master Craftsman & Vet'
    },
    content: 'Just finished custom cedar shelving for the library room at Sol Yoga! Super proud of this project, using wood salvaged from the storm fall last autumn. High-quality craftsmanship for high-quality community members. Go check out Priya\'s space if you haven\'t yet!',
    likes: 42,
    commentsCount: 5,
    hasLiked: true,
    timeAgo: '5 hours ago',
    category: 'Referral'
  },
  {
    id: 'p3',
    author: {
      name: 'Priya Patel',
      business: 'Sol Yoga & Mindfulness',
      avatar: 'https://images.unsplash.com/photo-1534751516642-a131ffd1037f?w=100&auto=format&fit=crop&q=60',
      role: 'Wellness Director'
    },
    content: 'Announcing our "Community Mindful Sunday" happening this weekend. Free yoga session on the harbor lawn followed by clean-up. Sage & Stone is providing cold brew teas for all volunteers. Register under the Events tab to secure your free ticket!',
    likes: 56,
    commentsCount: 12,
    hasLiked: false,
    timeAgo: '1 day ago',
    category: 'Event'
  }
];

export const mockEvents: Event[] = [
  {
    id: 'e1',
    title: 'Community Mindful Sunday',
    organizer: 'Sol Yoga & Mindfulness',
    organizerAvatar: 'https://images.unsplash.com/photo-1534751516642-a131ffd1037f?w=100&auto=format&fit=crop&q=60',
    date: 'Jun 28, 2026',
    time: '8:00 AM - 11:30 AM',
    location: 'Harbor Central Lawn, Pier 4',
    price: 'Free',
    coverImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=60',
    description: 'Start your Sunday with a somatic vinyasa flow with Priya Patel, followed by a harbor lawn cleanup to keep our ocean pristine. All cleanup tools and hydrating herbal cold teas are provided courtesy of Sage & Stone Cafe.',
    attendees: 84
  },
  {
    id: 'e2',
    title: 'Local Merchant Mastermind',
    organizer: 'Roots & Heritage Boutique',
    organizerAvatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&auto=format&fit=crop&q=60',
    date: 'Jul 02, 2026',
    time: '6:30 PM - 9:00 PM',
    location: 'Rooted Coworking Loft',
    price: '$15',
    coverImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=60',
    description: 'An intimate panel discussion with leading local retailers, discussing supply chain localization, community partnerships, and how to utilize the Rooted app to grow member referrals.',
    attendees: 35
  }
];

export const mockJobs: Job[] = [
  {
    id: 'j1',
    title: 'Barista & Hospitality Lead',
    company: 'Sage & Stone Cafe',
    logo: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=100&auto=format&fit=crop&q=60',
    location: '422 Sage Blvd',
    type: 'Full-time',
    salary: '$19 - $23 / hour',
    postedAgo: '3 days ago',
    description: 'We are seeking a warm, community-minded Lead Barista to guide our coffee team. Must have at least 1 year of specialty coffee experience and a passion for ethical sourcing. Includes free meals, health stipend, and profit sharing.'
  },
  {
    id: 'j2',
    title: 'Apprentice Woodcrafter',
    company: 'Forest Oak Woodworks',
    logo: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=100&auto=format&fit=crop&q=60',
    location: '887 Industrial Parkway',
    type: 'Full-time',
    salary: '$40k - $52k / year',
    postedAgo: '5 days ago',
    description: 'Learn the trade from a master woodcrafter. This apprentice role involves wood preparation, safety management, sanding, finishing, and installing custom millwork. Ideal for veterans looking to learn a rewarding trade.'
  }
];

export const initialChats: Record<string, ChatMessage[]> = {
  'b1': [
    { id: 'm1', senderId: 'user', text: 'Hi Elena! I love the cafe. Are you guys open for remote work on weekends?', timestamp: '3:42 PM', isRead: true },
    { id: 'm2', senderId: 'b1', text: 'Hi! Yes we are, but it does get busy between 10am and 1pm. We have dedicated quiet zone tables you can reserve in the app!', timestamp: '3:45 PM', isRead: true },
    { id: 'm3', senderId: 'user', text: 'That is awesome. I will reserve one for this Saturday morning.', timestamp: '3:47 PM', isRead: true }
  ],
  'b2': [
    { id: 'm4', senderId: 'user', text: 'Hey James, saw the cedar shelves you built for Sol Yoga. Absolutely stunning.', timestamp: 'Yesterday', isRead: true },
    { id: 'm5', senderId: 'b2', text: 'Thank you! Appreciate that. Reclaimed lumber has so much character.', timestamp: 'Yesterday', isRead: true }
  ]
};

export const mockNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Networking Request Accepted',
    body: 'Elena Rostova (Sage & Stone) accepted your community request. Say hello!',
    time: '2 hours ago',
    type: 'networking',
    isRead: false
  },
  {
    id: 'n2',
    title: 'Points Earned!',
    body: 'You earned 50 Rooted Points for writing a review on Forest Oak Woodworks.',
    time: '1 day ago',
    type: 'reward',
    isRead: true
  },
  {
    id: 'n3',
    title: 'New Event Nearby',
    body: '"Local Merchant Mastermind" was announced by Nia Mbeki. Save a seat!',
    time: '2 days ago',
    type: 'event',
    isRead: true
  }
];
