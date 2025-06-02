
import React from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Target, 
  Wrench, 
  Users, 
  MessageCircle, 
  BookOpen, 
  Calendar,
  User,
  Settings,
  HelpCircle,
  Home,
  Info,
  Heart,
  LogIn,
  UserPlus,
  LogOut,
  Phone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';

const guestNavigationItems = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'About', url: '/about', icon: Info },
  { title: 'Programs', url: '/programs', icon: BookOpen },
  { title: 'Community', url: '/community', icon: Users },
  { title: 'Contact', url: '/contact', icon: Phone },
];

const authenticatedNavigationItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Programs', url: '/programs', icon: BookOpen },
  { title: 'Tools', url: '/tools', icon: Wrench },
  { title: 'Community', url: '/community', icon: Users },
  { title: 'Chat', url: '/chat', icon: MessageCircle },
  { title: 'Calendar', url: '/calendar', icon: Calendar },
  { title: 'Profile', url: '/profile', icon: User },
  { title: 'Settings', url: '/settings', icon: Settings },
  { title: 'Help', url: '/help', icon: HelpCircle },
];

const AppSidebar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navigationItems = user ? authenticatedNavigationItems : guestNavigationItems;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Sidebar className="border-r border-gray-200">
      {/* Logo Header */}
      <SidebarHeader className="p-6 border-b border-gray-200">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-gray-800">Life with Purpose</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink
                        to={item.url}
                        className="flex items-center gap-3 text-sm font-medium"
                      >
                        <item.icon className="w-5 h-5" />
                        {item.title}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Authentication Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {user ? (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/dashboard" className="flex items-center gap-3 text-sm font-medium">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-purple-100 text-purple-600">
                            <User className="w-3 h-3" />
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 text-sm font-medium w-full text-left text-gray-600 hover:text-gray-800"
                      >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              ) : (
                <>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/auth" className="flex items-center gap-3 text-sm font-medium text-purple-600 hover:text-purple-700">
                        <LogIn className="w-5 h-5" />
                        Sign In
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link to="/auth" className="flex items-center gap-3 text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 rounded-md px-3 py-2">
                        <UserPlus className="w-5 h-5" />
                        Get Started
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
