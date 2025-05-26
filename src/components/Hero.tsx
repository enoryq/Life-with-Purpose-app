
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-indigo-600/10"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-purple-300/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-8 border border-purple-200">
          <Sparkles className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-medium text-purple-800">Transform Your Life Today</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-800 via-blue-700 to-indigo-800 bg-clip-text text-transparent mb-6 leading-tight">
          Life with Purpose
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
          Discover your potential with our comprehensive collection of tools, training programs, 
          and expert guidance designed to help you live a more meaningful and fulfilling life.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Start Your Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="px-8 py-4 text-lg font-semibold rounded-full border-2 border-purple-300 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300"
          >
            Explore Programs
          </Button>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-700">50+</div>
            <div className="text-gray-600">Training Programs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-700">10K+</div>
            <div className="text-gray-600">Lives Transformed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-700">24/7</div>
            <div className="text-gray-600">Support Access</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
