import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout({ children, active, onNavigate, onLogout }) {
  const [sidebarAbierto, setSidebarAbierto] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar
        active={active}
        onNavigate={onNavigate}
        abierto={sidebarAbierto}
        cerrar={() => setSidebarAbierto(false)}
      />

      {/* Spacer for fixed sidebar on desktop */}
      <div className="hidden lg:block lg:w-72 shrink-0" />

      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <TopBar
          active={active}
          onMenuClick={() => setSidebarAbierto(true)}
          onLogout={onLogout}
        />
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
