import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingBag, FolderTree, ShoppingCart, 
  Users, Store, Megaphone, Star, BarChart3, 
  DollarSign, MonitorSmartphone, Settings,
  LogOut, Bell, Menu, X, Search
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: ShoppingBag },
  { name: 'Categories', href: '/admin/categories', icon: FolderTree },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Vendors', href: '/admin/vendors', icon: Store },
  { name: 'Marketing', href: '/admin/marketing', icon: Megaphone },
  { name: 'Reviews', href: '/admin/reviews', icon: Star },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Finance', href: '/admin/finance', icon: DollarSign },
  { name: 'Website Builder', href: '/admin/cms', icon: MonitorSmartphone },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Ensure scroll triggers are reset when changing routes inside dashboard
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="h-screen w-full bg-slate-100 flex font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 bg-slate-950 border-b border-slate-800">
          <span className="text-xl font-bold font-display text-white tracking-tight">
            Trendit <span className="text-blue-500">OS</span>
          </span>
          <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto hide-scrollbar py-4 px-3 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === '/admin'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' 
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <item.icon className={`w-5 h-5 ${window.location.pathname === item.href ? 'text-white' : 'text-slate-400'}`} />
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-sm">
              {user?.name?.[0] || 'A'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-slate-400 truncate">Super Admin</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center relative text-gray-500 focus-within:text-blue-600">
              <Search className="w-5 h-5 absolute left-3 pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search orders, clients, or products... (Cmd+K)" 
                className="pl-10 pr-4 py-2 w-80 bg-slate-100 hover:bg-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg text-sm transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="/" target="_blank" className="text-sm text-blue-600 font-medium hover:underline hidden sm:block">
              View Store
            </a>
            
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
