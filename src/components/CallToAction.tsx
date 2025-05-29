
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-purple-600 to-blue-700 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Transform Your Life?
            </h2>
            
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Join thousands of people who have already started their journey. Everything is completely free while we're in beta!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-lg">100% Free Access</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-lg">All Programs Included</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <span className="text-lg">Community Support</span>
              </div>
            </div>
            
            <Link to="/auth">
              <Button 
                size="lg" 
                className="bg-white text-purple-700 hover:bg-gray-100 px-12 py-4 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Get Started Free
                <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
            
            <p className="text-sm opacity-75 mt-6">
              No credit card required • No hidden fees • Start immediately
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
