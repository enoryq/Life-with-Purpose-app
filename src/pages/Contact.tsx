
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Send us a message and we'll respond within 24 hours",
      contact: "hello@lifewithpurpose.com",
      action: "Send Email"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Speak directly with our support team",
      contact: "+1 (555) 123-4567",
      action: "Call Now"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help through our live chat feature",
      contact: "Available 24/7",
      action: "Start Chat"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Our headquarters are open for visits by appointment",
      contact: "San Francisco, CA",
      action: "Get Directions"
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM EST" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM EST" },
    { day: "Sunday", hours: "Closed" }
  ];

  return (
    <Layout>
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center mx-auto mb-4">
                    <method.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{method.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <CardDescription className="text-gray-600">
                    {method.description}
                  </CardDescription>
                  <div className="font-medium text-purple-700">{method.contact}</div>
                  <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form and Office Hours */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-gray-800">Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you within 24 hours.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <Input placeholder="Enter your first name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <Input placeholder="Enter your last name" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <Input type="email" placeholder="Enter your email address" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <Input placeholder="What is this regarding?" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <Textarea 
                      placeholder="Tell us how we can help you..." 
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Send className="mr-2 w-5 h-5" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Office Hours and Info */}
            <div className="space-y-8">
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {officeHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.hours}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-100 to-blue-100 border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">Quick Response</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">
                    Need immediate assistance? Use our live chat for instant support.
                  </p>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">
                    <MessageCircle className="mr-2 w-4 h-4" />
                    Start Live Chat
                  </Button>
                </CardContent>
              </Card>

              <div className="text-center">
                <Badge variant="secondary" className="bg-green-100 text-green-800 px-4 py-2">
                  Average Response Time: 2 hours
                </Badge>
              </div>
            </div>
          </div>

          {/* FAQ Link */}
          <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Have a Quick Question?</h2>
            <p className="text-xl mb-8 opacity-90">
              Check out our FAQ section - you might find your answer right away!
            </p>
            <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full">
              View FAQ
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
