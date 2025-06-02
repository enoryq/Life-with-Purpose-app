
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
  const { user, signIn, signUp } = useAuth();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'signin'; // 'signin' or 'signup'
  const [loading, setLoading] = useState(false);

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
                  disabled={loading}
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
