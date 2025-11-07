'use client';

import { useAuth } from './PasswordProtection';
import { LogOut } from 'lucide-react';

interface DashboardHeaderProps {
  title?: string;
  description?: string;
  showLogout?: boolean;
}

export function DashboardHeader({
  title = "O2 Competitive Analysis Dashboard",
  description = "Comprehensive insights into market positioning, competitive landscapes, and strategic opportunities",
  showLogout = true
}: DashboardHeaderProps) {
  const { logout } = useAuth();

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out? You will need to enter the password again to access the dashboard.')) {
      logout();
    }
  };

  return (
    <header className="bg-[#00205B] text-white py-8 px-6 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-blue-100">{description}</p>
        </div>

        {showLogout && (
          <LogoutButton onLogout={handleLogout} />
        )}
      </div>
    </header>
  );
}

function LogoutButton({ onLogout }: { onLogout: () => void }) {
  return (
    <button
      onClick={onLogout}
      className="flex items-center gap-2 px-4 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 group"
      title="Logout from dashboard"
    >
      <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform" />
      <span className="hidden sm:inline">Logout</span>
    </button>
  );
}
