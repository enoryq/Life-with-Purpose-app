
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Navigate, useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface AuthFormData {
  email: string;
  password: string;
  fullName?: string;
}

const Auth = () => {
  const { user, signIn, signUp, signInWithGoogle } = useAuth();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'signin'; // 'signin' or 'signup'
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const form = useForm<AuthFormData>({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast.error('Google authentication failed. Please try again.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred with Google authentication.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const onSubmit = async (data: AuthFormData) => {
    setLoading(true);
    try {
      let error;
      
      if (mode === 'signup') {
        const result = await signUp(data.email, data.password, data.fullName || '');
        error = result.error;
        if (!error) {
          toast.success('Welcome! Let\'s get you started on your journey.');
          // The onboarding will be handled by a redirect after successful signup
        }
      } else {
        const result = await signIn(data.email, data.password);
        error = result.error;
        if (!error) {
          toast.success('Welcome back! Ready to continue your journey?');
        }
      }

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password. Please try again.');
        } else if (error.message.includes('User already registered')) {
          toast.error('An account with this email already exists. Please sign in instead.');
        } else {
          toast.error(error.message);
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isSignUp = mode === 'signup';

  return (
    <Layout showFooter={false}>
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <Card className={`w-full max-w-md ${isSignUp ? 'border-2 border-purple-200 shadow-xl' : 'border-gray-200 shadow-lg'}`}>
          <CardHeader className="space-y-1 text-center">
            <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
              isSignUp ? 'bg-gradient-to-br from-purple-500 to-blue-500' : 'bg-purple-100'
            }`}>
              {isSignUp ? (
                <Sparkles className="w-6 h-6 text-white" />
              ) : (
                <Heart className="w-6 h-6 text-purple-600" />
              )}
            </div>
            
            <CardTitle className={`text-2xl font-bold ${
              isSignUp ? 'bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent' : 'text-gray-800'
            }`}>
              {isSignUp ? 'Start Your Journey' : 'Welcome Back'}
            </CardTitle>
            
            <CardDescription className={`${
              isSignUp ? 'text-purple-700' : 'text-gray-600'
            }`}>
              {isSignUp 
                ? 'Join thousands discovering their purpose and living with intention' 
                : 'Continue your purposeful journey where you left off'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {/* Google Authentication Button */}
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleAuth}
              disabled={googleLoading || loading}
              className="w-full mb-6 border-gray-300 hover:bg-gray-50"
            >
              {googleLoading ? (
                'Connecting...'
              ) : (
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </div>
              )}
            </Button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with email</span>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {isSignUp && (
                  <FormField
                    control={form.control}
                    name="fullName"
                    rules={{ required: 'Full name is required' }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="What should we call you?" 
                            className="focus:ring-purple-500 focus:border-purple-500"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={form.control}
                  name="email"
                  rules={{ 
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: 'Please enter a valid email address'
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder={isSignUp ? "Enter your email" : "Welcome back! Enter your email"} 
                          className={isSignUp ? "focus:ring-purple-500 focus:border-purple-500" : ""}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  rules={{ 
                    required: 'Password is required',
                    minLength: isSignUp ? {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    } : undefined
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder={isSignUp ? "Create a secure password" : "Enter your password"} 
                          className={isSignUp ? "focus:ring-purple-500 focus:border-purple-500" : ""}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className={`w-full ${
                    isSignUp 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6' 
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                  disabled={loading || googleLoading}
                >
                  {loading ? 'Please wait...' : (
                    <div className="flex items-center gap-2">
                      {isSignUp ? 'Begin My Journey' : 'Welcome Back'}
                      {isSignUp && <ArrowRight className="w-4 h-4" />}
                    </div>
                  )}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => window.location.href = isSignUp ? '/auth?mode=signin' : '/auth?mode=signup'}
                className={`text-sm ${
                  isSignUp ? 'text-purple-600 hover:text-purple-700' : 'text-gray-600 hover:text-gray-800'
                } hover:underline transition-colors`}
              >
                {isSignUp 
                  ? 'Already have an account? Sign in' 
                  : "New here? Start your journey"
                }
              </button>
            </div>

            {isSignUp && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-700 text-center">
                  ✨ After signing up, we'll ask you a few quick questions to personalize your experience
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Auth;
