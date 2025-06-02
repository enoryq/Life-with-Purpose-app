
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AppSidebar from './AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

const Layout = ({ children, showFooter = true }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto">{children}</main>
          {showFooter && <Footer />}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
