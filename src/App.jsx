import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [active, setActive] = useState('dashboard');

  const handleLogout = () => {
    setLoggedIn(false);
    setActive('dashboard');
  };

  return loggedIn ? (
    <Dashboard active={active} onNavigate={setActive} onLogout={handleLogout} />
  ) : (
    <Login onLogin={() => setLoggedIn(true)} />
  );
}
