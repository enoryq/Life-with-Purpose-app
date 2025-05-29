
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, LogOut, User, Wrench, Menu, X, Info, BookOpen, FileText, Users } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <Heart className="h-8 w-8 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Life with Purpose
            </span>
          </Link>
          
          {/* Desktop Navigation */}
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
          
          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link to="/dashboard" className="flex items-center space-x-2 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-purple-100 text-purple-600">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700">Dashboard</span>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" className="text-purple-600 hover:text-purple-700">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-gray-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 shadow-lg z-40">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Navigation Links */}
            <div className="space-y-3">
              <Link 
                to="/about" 
                className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors py-2"
                onClick={closeMobileMenu}
              >
                <Info className="w-4 h-4" />
                About
              </Link>
              <Link 
                to="/programs" 
                className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors py-2"
                onClick={closeMobileMenu}
              >
                <BookOpen className="w-4 h-4" />
                Programs
              </Link>
              <Link 
                to="/resources" 
                className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors py-2"
                onClick={closeMobileMenu}
              >
                <FileText className="w-4 h-4" />
                Resources
              </Link>
              <Link 
                to="/tools" 
                className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors py-2"
                onClick={closeMobileMenu}
              >
                <Wrench className="w-4 h-4" />
                Tools
              </Link>
              <Link 
                to="/community" 
                className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors py-2"
                onClick={closeMobileMenu}
              >
                <Users className="w-4 h-4" />
                Community
              </Link>
              {user && (
                <Link 
                  to="/chat" 
                  className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors py-2"
                  onClick={closeMobileMenu}
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
                    onClick={closeMobileMenu}
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
                    onClick={() => {
                      handleSignOut();
                      closeMobileMenu();
                    }}
                    className="w-full justify-start text-gray-600 hover:text-gray-800"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link to="/auth" onClick={closeMobileMenu}>
                    <Button variant="outline" className="w-full text-purple-600 hover:text-purple-700">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={closeMobileMenu}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
