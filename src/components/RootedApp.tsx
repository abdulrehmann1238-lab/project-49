import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';

// Screen imports
import LoadingScreen from '../screens/LoadingScreen';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import DirectoryScreen from '../screens/DirectoryScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MapScreen from '../screens/MapScreen';
import LoyaltyScreen from '../screens/LoyaltyScreen';
import NetworkingScreen from '../screens/NetworkingScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ChatScreen from '../screens/ChatScreen';
import QRScreen from '../screens/QRScreen';

export const RootedApp: React.FC = () => {
  const currentScreen = useAppStore((state) => state.currentScreen);

  // Map Screen components
  const renderScreen = () => {
    switch (currentScreen) {
      case 'loading':
        return <LoadingScreen key="loading" />;
      case 'splash':
        return <SplashScreen key="splash" />;
      case 'onboarding':
        return <OnboardingScreen key="onboarding" />;
      case 'login':
        return <LoginScreen key="login" />;
      case 'home':
        return <HomeScreen key="home" />;
      case 'directory':
        return <DirectoryScreen key="directory" />;
      case 'profile':
        return <ProfileScreen key="profile" />;
      case 'map':
        return <MapScreen key="map" />;
      case 'loyalty':
        return <LoyaltyScreen key="loyalty" />;
      case 'networking':
        return <NetworkingScreen key="networking" />;
      case 'dashboard':
        return <DashboardScreen key="dashboard" />;
      case 'chat':
        return <ChatScreen key="chat" />;
      case 'qr':
        return <QRScreen key="qr" />;
      default:
        return <HomeScreen key="home" />;
    }
  };

  return (
    <div className="flex-1 w-full h-full relative overflow-hidden flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full flex flex-col"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default RootedApp;
