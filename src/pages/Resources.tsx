
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Video, Headphones, FileText, Download, ExternalLink, Wrench } from 'lucide-react';
import ToolsAndTemplates from '../components/tools/ToolsAndTemplates';

const Resources = () => {
  const resourceTypes = [
    {
      icon: Book,
      title: "E-Books & Guides",
      description: "Comprehensive guides and workbooks for self-directed learning",
      count: 25,
      color: "text-purple-600"
    },
    {
      icon: Video,
      title: "Video Content",
      description: "Engaging video lessons and masterclasses from experts",
      count: 150,
      color: "text-blue-600"
    },
    {
      icon: Headphones,
      title: "Audio & Podcasts",
      description: "Meditation guides, interviews, and audio courses",
      count: 80,
      color: "text-green-600"
    },
    {
      icon: Wrench,
      title: "Interactive Tools",
      description: "Hands-on tools and templates for immediate use",
      count: 12,
      color: "text-orange-600"
    }
  ];

  const featuredResources = [
    {
      title: "The Purpose Finder Workbook",
      type: "E-Book",
      description: "A comprehensive 50-page workbook to help you discover your life's purpose",
      downloadCount: "2.3K",
      category: "Self-Discovery"
    },
    {
      title: "Daily Mindfulness Meditation Series",
      type: "Audio",
      description: "21-day guided meditation series for building consistent mindfulness practice",
      downloadCount: "5.1K",
      category: "Wellness"
    },
    {
      title: "Goal Setting Masterclass",
      type: "Video",
      description: "2-hour comprehensive masterclass on setting and achieving meaningful goals",
      downloadCount: "3.7K",
      category: "Productivity"
    },
    {
      title: "Values Assessment Tool",
      type: "Interactive Tool",
      description: "Discover your core values through an engaging, interactive questionnaire",
      downloadCount: "4.2K",
      category: "Self-Discovery"
    }
  ];

  return (
    <Layout>
      <div className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-800 to-blue-800 bg-clip-text text-transparent mb-6">
              Free Resources
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Access our extensive library of free resources designed to support your personal growth journey. 
              All available at no cost during our beta period.
            </p>
          </div>

          {/* Resource Types */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {resourceTypes.map((type, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center mx-auto mb-4">
                    <type.icon className={`w-8 h-8 ${type.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold">{type.title}</CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto">{type.count} items</Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {type.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content Tabs */}
          <Tabs defaultValue="featured" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="tools">Interactive Tools</TabsTrigger>
              <TabsTrigger value="browse">Browse All</TabsTrigger>
            </TabsList>

            <TabsContent value="featured" className="space-y-8">
              {/* Featured Resources */}
              <div>
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Featured Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {featuredResources.map((resource, index) => (
                    <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="text-purple-600 border-purple-300">
                            {resource.type}
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            Free
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-semibold text-gray-800">
                          {resource.title}
                        </CardTitle>
                        <Badge variant="secondary" className="w-fit bg-purple-100 text-purple-800">
                          {resource.category}
                        </Badge>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <CardDescription className="text-gray-600 leading-relaxed">
                          {resource.description}
                        </CardDescription>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{resource.downloadCount} downloads</span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              Preview
                            </Button>
                            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                              <Download className="w-4 h-4 mr-2" />
                              {resource.type === "Interactive Tool" ? "Use Tool" : "Download"}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tools" className="space-y-8">
              <ToolsAndTemplates />
            </TabsContent>

            <TabsContent value="browse" className="space-y-8">
              {/* Browse All Section */}
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Browse All Resources</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Explore our complete library organized by category, type, and difficulty level.
                </p>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 text-lg font-semibold rounded-full">
                  Browse Resource Library
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
