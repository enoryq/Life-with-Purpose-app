
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Book, Video, MessageCircle, Mail, Phone, Clock } from 'lucide-react';

const Help = () => {
  const faqCategories = [
    {
      title: "Getting Started",
      questions: [
        "How do I create an account?",
        "What programs should I start with?",
        "How do I access the resources?",
        "Is everything really free?"
      ]
    },
    {
      title: "Programs & Content",
      questions: [
        "How long do programs take to complete?",
        "Can I do multiple programs at once?",
        "Are programs self-paced?",
        "Do I get certificates?"
      ]
    },
    {
      title: "Community",
      questions: [
        "How do I join the community forums?",
        "When are the virtual events?",
        "Can I create my own support group?",
        "How do I report inappropriate content?"
      ]
    },
    {
      title: "Technical Support",
      questions: [
        "I can't access my account",
        "Video content won't play",
        "How do I download resources?",
        "Mobile app issues"
      ]
    }
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      availability: "24/7",
      responseTime: "< 5 minutes"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message about your issue",
      availability: "24/7",
      responseTime: "< 24 hours"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Talk directly with a support specialist",
      availability: "Mon-Fri 9AM-6PM EST",
      responseTime: "Immediate"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Self-help video guides and walkthroughs",
      availability: "Always available",
      responseTime: "Self-paced"
    }
  ];

  return (
    <Layout>
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent mb-6">
              Help Center
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
              Find answers to your questions and get the support you need to make the most of your journey.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input 
                placeholder="Search for help articles, FAQs, and guides..." 
                className="pl-12 py-4 text-lg border-purple-200 focus:border-purple-500"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-600">
                Search
              </Button>
            </div>
          </div>

          {/* Support Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {supportOptions.map((option, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mx-auto mb-4">
                    <option.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{option.title}</CardTitle>
                  <div className="flex gap-2 justify-center">
                    <Badge variant="secondary">{option.availability}</Badge>
                    <Badge variant="outline">{option.responseTime}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 mb-4">
                    {option.description}
                  </CardDescription>
                  <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                    Get Help
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqCategories.map((category, index) => (
                <Card key={index} className="bg-white border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                      <Book className="w-6 h-6 text-purple-600" />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {category.questions.map((question, qIndex) => (
                        <button
                          key={qIndex}
                          className="w-full text-left p-3 rounded-lg hover:bg-purple-50 transition-colors text-gray-700 hover:text-purple-700"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-3xl p-12 mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Popular Help Topics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Button variant="outline" size="lg" className="h-auto p-6 text-left flex-col items-start border-purple-200 hover:bg-white">
                <div className="font-semibold text-gray-800">Getting Started Guide</div>
                <div className="text-sm text-gray-600 mt-2">Complete walkthrough for new users</div>
              </Button>
              <Button variant="outline" size="lg" className="h-auto p-6 text-left flex-col items-start border-purple-200 hover:bg-white">
                <div className="font-semibold text-gray-800">Program Navigation</div>
                <div className="text-sm text-gray-600 mt-2">How to make the most of our programs</div>
              </Button>
              <Button variant="outline" size="lg" className="h-auto p-6 text-left flex-col items-start border-purple-200 hover:bg-white">
                <div className="font-semibold text-gray-800">Community Guidelines</div>
                <div className="text-sm text-gray-600 mt-2">Rules and best practices for community interaction</div>
              </Button>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-xl mb-8 opacity-90">
              Our support team is here to help you succeed on your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full">
                <MessageCircle className="mr-2 w-5 h-5" />
                Start Live Chat
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-full">
                <Mail className="mr-2 w-5 h-5" />
                Send Email
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
