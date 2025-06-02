
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <SidebarTrigger className="text-gray-600 hover:text-gray-800" />
          
          {/* Space for future header content if needed */}
          <div className="flex-1"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
