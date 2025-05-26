
import React from 'react';
import Hero from '../components/Hero';
import FeaturesOverview from '../components/FeaturesOverview';
import ProgramsPreview from '../components/ProgramsPreview';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <Hero />
      <FeaturesOverview />
      <ProgramsPreview />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
