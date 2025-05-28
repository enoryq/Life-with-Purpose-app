
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '@/hooks/useAuth';
import ToolsHeader from '../components/tools/ToolsHeader';
import ToolsGrid from '../components/tools/ToolsGrid';
import GettingStartedGuide from '../components/tools/GettingStartedGuide';
import SignInRequired from '../components/tools/SignInRequired';
import ToolContainer from '../components/tools/ToolContainer';

const Tools = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Show loading state
  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white pt-20 pb-16 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </Layout>
    );
  }

  // Show sign-in required message if not authenticated
  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white pt-20 pb-16 px-4">
          <SignInRequired />
        </div>
      </Layout>
    );
  }

  if (activeTab !== 'overview') {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white pt-20 pb-16 px-4">
          <ToolContainer
            activeTab={activeTab}
            onBackToOverview={() => setActiveTab('overview')}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-white pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <ToolsHeader />
          <ToolsGrid onToolSelect={setActiveTab} />
          <GettingStartedGuide />
        </div>
      </div>
    </Layout>
  );
};

export default Tools;
