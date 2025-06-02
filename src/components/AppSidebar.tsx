
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
  Sparkles,
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
  const { user, signOut, signInWithGoogle } = useAuth();

  const navigationItems = user ? authenticatedNavigationItems : guestNavigationItems;

  const handleSignOut = async () => {
    await signOut();
  };

  const handleGoogleSignIn = async () => {
    await signInWithGoogle();
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
                  {/* Google Sign In */}
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <button
                        onClick={handleGoogleSignIn}
                        className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md px-3 py-2 transition-colors w-full text-left"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        <span>Sign in with Google</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link 
                        to="/auth?mode=signin" 
                        className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md px-3 py-2 transition-colors"
                      >
                        <LogIn className="w-5 h-5" />
                        <span>Sign In</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link 
                        to="/auth?mode=signup" 
                        className="flex items-center gap-3 text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 rounded-md px-3 py-2 transition-all duration-200 shadow-md hover:shadow-lg"
                      >
                        <Sparkles className="w-5 h-5" />
                        <span>Get Started</span>
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
