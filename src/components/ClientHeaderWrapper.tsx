'use client';

import { useAuth } from './PasswordProtection';
import { LogOut } from 'lucide-react';

interface ClientHeaderWrapperProps {
  requiresAuth: boolean;
  children: React.ReactNode;
}

export function ClientHeaderWrapper({ requiresAuth, children }: ClientHeaderWrapperProps) {
  const { logout } = useAuth();

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out? You will need to enter the password again to access the dashboard.')) {
      logout();
    }
  };

  return (
    <header className="bg-[#00205B] text-white py-8 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-start">
        <div className="flex-1">
          {children}
        </div>

        {requiresAuth && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 group ml-4"
            title="Logout from dashboard"
          >
            <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        )}
      </div>
    </header>
  );
}
