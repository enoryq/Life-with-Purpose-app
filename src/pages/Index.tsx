
import React from 'react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import FeaturesOverview from '../components/FeaturesOverview';
import ProgramsPreview from '../components/ProgramsPreview';
import CallToAction from '../components/CallToAction';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturesOverview />
      <ProgramsPreview />
      <CallToAction />
    </Layout>
  );
};

export default Index;
