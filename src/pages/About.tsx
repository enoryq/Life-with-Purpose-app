
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Target, Users, Award } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach every individual with empathy and understanding"
    },
    {
      icon: Target,
      title: "Purpose",
      description: "Everything we do is aimed at helping you find your true calling"
    },
    {
      icon: Users,
      title: "Community",
      description: "Building supportive connections that last a lifetime"
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to the highest quality in all our programs and resources"
    }
  ];

  return (
    <Layout>
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent mb-6">
              About Life with Purpose
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We believe everyone deserves to live a life filled with meaning, direction, and fulfillment. 
              Our mission is to provide the tools and guidance needed for transformative personal growth.
            </p>
          </div>

          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Life with Purpose was born from a simple yet profound realization: too many people go through 
                life feeling disconnected from their true calling. Our founders experienced this firsthand and 
                embarked on a journey to create comprehensive resources for personal transformation.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                What started as a small community of like-minded individuals has grown into a platform 
                serving thousands of people worldwide. We've helped people discover their passions, 
                overcome obstacles, and create lives they truly love.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we continue to evolve and expand our offerings, always keeping our core mission 
                at the heart of everything we do: helping you live with purpose.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Impact</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-purple-700">10,000+</div>
                  <div className="text-gray-600">Lives Transformed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-700">50+</div>
                  <div className="text-gray-600">Expert Programs</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-indigo-700">95%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-8 h-8 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands who have transformed their lives with our free platform.</p>
            <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full">
              Get Started Free Today
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
