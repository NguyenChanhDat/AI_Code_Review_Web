// import { ModelSelector } from '@/app/components/model-selector';
import { Bell, User } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';

interface TopBarProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
}

export function TopBar({ selectedModel, onModelChange }: TopBarProps) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-10">
      {/* <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">AI Model:</span>
          <ModelSelector value={selectedModel} onValueChange={onModelChange} compact />
        </div>
      </div> */}

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-gray-500">Current usage</p>
          <p className="text-sm font-medium">$187 / $500</p>
        </div>
        
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-xs">
            3
          </Badge>
        </Button>

        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}
