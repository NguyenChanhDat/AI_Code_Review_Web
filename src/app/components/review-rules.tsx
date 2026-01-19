import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Switch } from '@/app/components/ui/switch';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Plus, Search, Shield, Zap, BookOpen, Code2, FileText, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Rule {
  id: string;
  name: string;
  category: string;
  description: string;
  enabled: boolean;
  priority: 'High' | 'Medium' | 'Low';
  repositories: string[];
}

const initialRules: Rule[] = [
  {
    id: '1',
    name: 'No hardcoded secrets',
    category: 'Security',
    description: 'Detect hardcoded API keys, passwords, and tokens in source code',
    enabled: true,
    priority: 'High',
    repositories: ['all']
  },
  {
    id: '2',
    name: 'Proper error handling',
    category: 'Best Practices',
    description: 'Ensure all functions have proper try-catch blocks and error propagation',
    enabled: true,
    priority: 'High',
    repositories: ['all']
  },
  {
    id: '3',
    name: 'Code complexity limit',
    category: 'Maintainability',
    description: 'Flag functions with cyclomatic complexity above threshold',
    enabled: true,
    priority: 'Medium',
    repositories: ['backend-api', 'frontend-web']
  },
  {
    id: '4',
    name: 'SQL injection prevention',
    category: 'Security',
    description: 'Check for unsafe SQL query construction',
    enabled: true,
    priority: 'High',
    repositories: ['backend-api', 'data-pipeline']
  },
  {
    id: '5',
    name: 'Performance best practices',
    category: 'Performance',
    description: 'Identify inefficient loops, unnecessary re-renders, and memory leaks',
    enabled: true,
    priority: 'Medium',
    repositories: ['frontend-web', 'mobile-app']
  },
  {
    id: '6',
    name: 'Naming conventions',
    category: 'Best Practices',
    description: 'Enforce consistent naming patterns for variables, functions, and classes',
    enabled: false,
    priority: 'Low',
    repositories: ['all']
  },
  {
    id: '7',
    name: 'Documentation requirements',
    category: 'Documentation',
    description: 'Ensure public APIs and complex functions have JSDoc comments',
    enabled: false,
    priority: 'Low',
    repositories: ['all']
  },
];

interface Boilerplate {
  id: string;
  name: string;
  pattern: string;
  description: string;
  fileType: string;
}

const boilerplates: Boilerplate[] = [
  {
    id: '1',
    name: 'Express server setup',
    pattern: 'express().use()',
    description: 'Standard Express.js server configuration',
    fileType: 'JavaScript/TypeScript'
  },
  {
    id: '2',
    name: 'React component boilerplate',
    pattern: 'import React from',
    description: 'Basic React functional component structure',
    fileType: 'JSX/TSX'
  },
  {
    id: '3',
    name: 'Database connection',
    pattern: 'mongoose.connect()',
    description: 'MongoDB connection setup',
    fileType: 'JavaScript/TypeScript'
  },
];

const principles = [
  { id: '1', name: 'SOLID Principles', enabled: true, description: 'Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion' },
  { id: '2', name: 'Clean Code', enabled: true, description: 'Meaningful names, small functions, DRY principle' },
  { id: '3', name: 'OWASP Top 10', enabled: true, description: 'Security best practices for web applications' },
  { id: '4', name: 'Performance First', enabled: true, description: 'Optimize for speed and efficiency' },
  { id: '5', name: 'Test-Driven Development', enabled: false, description: 'Write tests before implementation' },
];

export function ReviewRules() {
  const [rules, setRules] = useState<Rule[]>(initialRules);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const filteredRules = rules.filter(rule =>
    rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rule.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Security': return <Shield className="w-4 h-4" />;
      case 'Performance': return <Zap className="w-4 h-4" />;
      case 'Best Practices': return <Code2 className="w-4 h-4" />;
      case 'Maintainability': return <BookOpen className="w-4 h-4" />;
      case 'Documentation': return <FileText className="w-4 h-4" />;
      default: return <Code2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Review Rules & Configuration</h2>
          <p className="text-gray-600">Manage custom review rules and coding principles</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add New Rule
        </Button>
      </div>

      <Tabs defaultValue="rules" className="w-full">
        <TabsList>
          <TabsTrigger value="rules">Custom Rules</TabsTrigger>
          <TabsTrigger value="principles">Coding Principles</TabsTrigger>
          <TabsTrigger value="boilerplate">Boilerplate Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="mt-6">
          <Card className="p-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search rules..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-3">
              {filteredRules.map((rule) => (
                <div
                  key={rule.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          {getCategoryIcon(rule.category)}
                        </div>
                        <div>
                          <h3 className="font-medium">{rule.name}</h3>
                          <p className="text-sm text-gray-600">{rule.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="outline" className="text-xs">
                          {rule.category}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            rule.priority === 'High' ? 'border-red-300 text-red-700' :
                            rule.priority === 'Medium' ? 'border-orange-300 text-orange-700' :
                            'border-gray-300 text-gray-700'
                          }`}
                        >
                          {rule.priority} Priority
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {rule.repositories.includes('all') ? 'All repositories' : `${rule.repositories.length} repositories`}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                      <Switch
                        checked={rule.enabled}
                        onCheckedChange={() => toggleRule(rule.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="text-2xl font-semibold">{rules.length}</p>
                  <p className="text-sm text-gray-600">Total Rules</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-green-600">{rules.filter(r => r.enabled).length}</p>
                  <p className="text-sm text-gray-600">Active Rules</p>
                </div>
                <div>
                  <p className="text-2xl font-semibold text-gray-400">{rules.filter(r => !r.enabled).length}</p>
                  <p className="text-sm text-gray-600">Disabled Rules</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="principles" className="mt-6">
          <Card className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Coding Principles</h3>
              <p className="text-sm text-gray-600">
                Enable or disable high-level coding principles that guide the AI review process
              </p>
            </div>

            <div className="space-y-3">
              {principles.map((principle) => (
                <div
                  key={principle.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{principle.name}</h4>
                      <p className="text-sm text-gray-600">{principle.description}</p>
                    </div>
                    <Switch checked={principle.enabled} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">About Coding Principles</h4>
                  <p className="text-sm text-blue-800 mt-1">
                    These principles provide high-level guidance to the AI system. Specific rules are derived from these principles to ensure consistent code quality across your projects.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="boilerplate" className="mt-6">
          <Card className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Boilerplate Code Patterns</h3>
                <p className="text-sm text-gray-600">
                  Register common code patterns to reduce noise in AI reviews
                </p>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Pattern
              </Button>
            </div>

            <div className="space-y-3">
              {boilerplates.map((boilerplate) => (
                <div
                  key={boilerplate.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{boilerplate.name}</h4>
                        <Badge variant="outline" className="text-xs">{boilerplate.fileType}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{boilerplate.description}</p>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {boilerplate.pattern}
                      </code>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-purple-50 rounded-lg">
              <div className="flex items-start gap-3">
                <Code2 className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-900">How Boilerplate Awareness Works</h4>
                  <p className="text-sm text-purple-800 mt-1">
                    The AI system learns to recognize these patterns and reduces review comments on standard boilerplate code, focusing instead on business logic and custom implementations.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
