
import React from 'react';
import { Link } from 'react-router-dom';
import { Info, BookOpen, FileText, Wrench, Users, MessageCircle } from 'lucide-react';

interface DesktopNavigationProps {
  user: any;
}

const DesktopNavigation = ({ user }: DesktopNavigationProps) => {
  return (
    <nav className="hidden md:flex space-x-8">
      <Link to="/about" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2">
        <Info className="w-4 h-4" />
        About
      </Link>
      <Link to="/programs" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2">
        <BookOpen className="w-4 h-4" />
        Programs
      </Link>
      <Link to="/resources" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2">
        <FileText className="w-4 h-4" />
        Resources
      </Link>
      <Link to="/tools" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2">
        <Wrench className="w-4 h-4" />
        Tools
      </Link>
      <Link to="/community" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2">
        <Users className="w-4 h-4" />
        Community
      </Link>
      {user && (
        <Link to="/chat" className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          AI Companion
        </Link>
      )}
    </nav>
  );
};

export default DesktopNavigation;
