import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { Brain, DollarSign, Zap } from 'lucide-react';

export interface AIModel {
  id: string;
  name: string;
  provider: string;
  cost: '$' | '$$' | '$$$';
  latency: 'fast' | 'medium' | 'slow';
  description: string;
}

export const aiModels: AIModel[] = [
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    cost: '$$$',
    latency: 'medium',
    description: 'Most accurate, best for complex code reviews',
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    cost: '$$$',
    latency: 'slow',
    description: 'High quality, comprehensive analysis',
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    cost: '$',
    latency: 'fast',
    description: 'Fast and cost-effective',
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    cost: '$$$',
    latency: 'medium',
    description: 'Excellent for nuanced analysis',
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'Anthropic',
    cost: '$$',
    latency: 'fast',
    description: 'Balanced performance and cost',
  },
  {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'Anthropic',
    cost: '$',
    latency: 'fast',
    description: 'Fastest, most economical',
  },
];

interface ModelSelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
  compact?: boolean;
}

export function ModelSelector({
  value = 'gpt-4-turbo',
  onValueChange,
  compact = false,
}: ModelSelectorProps) {
  const selectedModel = aiModels.find((m) => m.id === value);

  const getCostColor = (cost: string) => {
    switch (cost) {
      case '$':
        return 'bg-green-100 text-green-700';
      case '$$':
        return 'bg-yellow-100 text-yellow-700';
      case '$$$':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getLatencyColor = (latency: string) => {
    switch (latency) {
      case 'fast':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'slow':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full max-w-full overflow-hidden">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-purple-600" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {aiModels.map((model) => (
          <SelectItem key={model.id} value={model.id}>
            <div className="flex items-center justify-between gap-4 py-1">
              <div className="flex-1">
                <div className="font-medium">{model.name}</div>
                {!compact && (
                  <div className="text-xs text-gray-500">
                    {model.description}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`text-xs ${getCostColor(model.cost)}`}
                >
                  {model.cost}
                </Badge>
                <Badge
                  variant="outline"
                  className={`text-xs ${getLatencyColor(model.latency)}`}
                >
                  {model.latency}
                </Badge>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
