import { useState } from 'react';
import { Navigation } from '@/app/components/navigation';
import { TopBar } from '@/app/components/top-bar';
import { OverviewDashboard } from '@/app/components/overview-dashboard';
import { CodeQualityDashboard } from '@/app/components/code-quality-dashboard';
import { ContributorDashboard } from '@/app/components/contributor-dashboard';
import { AIInfrastructureDashboard } from '@/app/components/ai-infrastructure-dashboard';
import { ReviewRules } from '@/app/components/review-rules';
import { Settings } from '@/app/components/settings';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedModel, setSelectedModel] = useState('gpt-4-turbo');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewDashboard />;
      case 'code-quality':
        return <CodeQualityDashboard />;
      case 'contributors':
        return <ContributorDashboard />;
      case 'ai-infrastructure':
        return <AIInfrastructureDashboard />;
      case 'rules':
        return <ReviewRules />;
      case 'settings':
        return <Settings />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <TopBar selectedModel={selectedModel} onModelChange={setSelectedModel} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}