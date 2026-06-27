import React from 'react';
import PhoneShell from './components/PhoneShell';
import RootedApp from './components/RootedApp';
import './App.css'; // Vite default App.css (if any) or clean styling

function App() {
  return (
    <PhoneShell>
      <RootedApp />
    </PhoneShell>
  );
}

export default App;
