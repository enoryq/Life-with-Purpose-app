
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AppSidebar from './AppSidebar';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const Layout = ({ children, showFooter = true }: LayoutProps) => {
  const location = useLocation();
  
  // Show sidebar on dashboard and other authenticated pages
  const showSidebar = ['/dashboard', '/tools', '/programs', '/community', '/chat'].some(path => 
    location.pathname.startsWith(path)
  );

  if (showSidebar) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto">{children}</main>
          {showFooter && <Footer />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Header />
      <main>{children}</main>
      {showFooter && <Footer />}
    </div>
  );
};

export default Layout;
