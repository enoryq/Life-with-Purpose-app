
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface AuthActionsProps {
  user: any;
  onSignOut: () => Promise<void>;
}

const AuthActions = ({ user, onSignOut }: AuthActionsProps) => {
  return (
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
            onClick={onSignOut}
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
  );
};

export default AuthActions;
