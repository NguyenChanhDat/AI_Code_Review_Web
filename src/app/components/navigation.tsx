import { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Code2, Users, Server, Settings, BookOpen } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const navigationItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'code-quality', label: 'Code Quality', icon: Code2 },
  { id: 'contributors', label: 'Contributors', icon: Users },
  { id: 'ai-infrastructure', label: 'AI & Infrastructure', icon: Server },
  { id: 'rules', label: 'Review Rules', icon: BookOpen },
  { id: 'settings', label: 'Settings', icon: Settings },
];

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
          <div>
            <h1 className="font-semibold text-lg">CodeQuality AI</h1>
            <p className="text-xs text-gray-500">Quality Assessment</p>
          </div>
        </div>
        
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors",
                  isActive 
                    ? "bg-blue-50 text-blue-700 font-medium" 
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
