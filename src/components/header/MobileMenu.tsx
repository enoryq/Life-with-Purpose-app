
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Info, BookOpen, FileText, Wrench, Users, MessageCircle, LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface MobileMenuProps {
  isOpen: boolean;
  user: any;
  onSignOut: () => Promise<void>;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, user, onSignOut, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  const handleSignOut = async () => {
    await onSignOut();
    onClose();
  };

  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg z-40">
      <div className="px-4 py-6 space-y-4">
        {/* Mobile Navigation Links */}
        <div className="space-y-3">
          <Link 
            to="/about" 
            className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors py-2"
            onClick={onClose}
          >
            <Info className="w-4 h-4" />
            About
          </Link>
          <Link 
            to="/programs" 
            className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors py-2"
            onClick={onClose}
          >
            <BookOpen className="w-4 h-4" />
            Programs
          </Link>
          <Link 
            to="/resources" 
            className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors py-2"
            onClick={onClose}
          >
            <FileText className="w-4 h-4" />
            Resources
          </Link>
          <Link 
            to="/tools" 
            className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors py-2"
            onClick={onClose}
          >
            <Wrench className="w-4 h-4" />
            Tools
          </Link>
          <Link 
            to="/community" 
            className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors py-2"
            onClick={onClose}
          >
            <Users className="w-4 h-4" />
            Community
          </Link>
          {user && (
            <Link 
              to="/chat" 
              className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors py-2"
              onClick={onClose}
            >
              <MessageCircle className="w-4 h-4" />
              AI Companion
            </Link>
          )}
        </div>

        {/* Mobile Auth Actions */}
        <div className="pt-4 border-t border-gray-200">
          {user ? (
            <div className="space-y-3">
              <Link 
                to="/dashboard" 
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-purple-100 text-purple-600">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-700">Dashboard</span>
              </Link>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="w-full justify-start text-gray-600 hover:text-gray-800"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Link to="/auth" onClick={onClose}>
                <Button variant="outline" className="w-full text-purple-600 hover:text-purple-700">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth" onClick={onClose}>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
