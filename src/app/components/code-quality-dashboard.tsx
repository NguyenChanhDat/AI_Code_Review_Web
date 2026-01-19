import { Card } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const violationTrend = [
  { date: 'Jan 15', critical: 15, major: 32, minor: 45 },
  { date: 'Jan 22', critical: 12, major: 28, minor: 42 },
  { date: 'Jan 29', critical: 8, major: 25, minor: 38 },
  { date: 'Feb 5', critical: 10, major: 22, minor: 35 },
  { date: 'Feb 12', critical: 6, major: 18, minor: 30 },
  { date: 'Feb 19', critical: 5, major: 15, minor: 25 },
];

const violationsByCategory = [
  { name: 'Security', value: 45, color: '#ef4444' },
  { name: 'Performance', value: 32, color: '#f59e0b' },
  { name: 'Best Practices', value: 58, color: '#3b82f6' },
  { name: 'Maintainability', value: 28, color: '#8b5cf6' },
  { name: 'Documentation', value: 22, color: '#10b981' },
];

const ruleEffectiveness = [
  { rule: 'No hardcoded secrets', violations: 8, accepted: 95, impact: 'High' },
  { rule: 'Proper error handling', violations: 23, accepted: 88, impact: 'High' },
  { rule: 'Code complexity limit', violations: 15, accepted: 76, impact: 'Medium' },
  { rule: 'Naming conventions', violations: 42, accepted: 65, impact: 'Low' },
  { rule: 'Comment requirements', violations: 38, accepted: 58, impact: 'Low' },
];

const repositoryScores = [
  { repo: 'backend-api', score: 92, mrs: 45 },
  { repo: 'frontend-web', score: 88, mrs: 52 },
  { repo: 'mobile-app', score: 85, mrs: 38 },
  { repo: 'data-pipeline', score: 78, mrs: 28 },
  { repo: 'admin-dashboard', score: 90, mrs: 33 },
];

interface MetricCardProps {
  label: string;
  value: number;
  total?: number;
  color: string;
  icon: React.ReactNode;
}

function MetricCard({ label, value, total, color, icon }: MetricCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{label}</span>
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
      <div className="text-2xl font-semibold">
        {value}
        {total && <span className="text-sm text-gray-500 font-normal ml-1">/ {total}</span>}
      </div>
    </Card>
  );
}

export function CodeQualityDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Code Quality Dashboard</h2>
        <p className="text-gray-600">Detailed analysis of code quality metrics and violations</p>
      </div>

      {/* Violation Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          label="Critical Issues"
          value={5}
          color="bg-red-100"
          icon={<XCircle className="w-5 h-5 text-red-600" />}
        />
        <MetricCard
          label="Major Issues"
          value={15}
          color="bg-orange-100"
          icon={<AlertTriangle className="w-5 h-5 text-orange-600" />}
        />
        <MetricCard
          label="Minor Issues"
          value={25}
          color="bg-yellow-100"
          icon={<Info className="w-5 h-5 text-yellow-600" />}
        />
        <MetricCard
          label="Resolved This Week"
          value={78}
          color="bg-green-100"
          icon={<CheckCircle2 className="w-5 h-5 text-green-600" />}
        />
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList>
          <TabsTrigger value="trends">Violation Trends</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="repositories">By Repository</TabsTrigger>
          <TabsTrigger value="rules">Rule Effectiveness</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Violation Trends Over Time</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={violationTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={2} name="Critical" />
                <Line type="monotone" dataKey="major" stroke="#f59e0b" strokeWidth={2} name="Major" />
                <Line type="monotone" dataKey="minor" stroke="#fbbf24" strokeWidth={2} name="Minor" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Violations by Category</h3>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={violationsByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {violationsByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Category Details</h3>
              <div className="space-y-4">
                {violationsByCategory.map((category) => (
                  <div key={category.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-sm font-semibold">{category.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${(category.value / 185) * 100}%`,
                          backgroundColor: category.color 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="repositories" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quality Scores by Repository</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={repositoryScores}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="repo" stroke="#6b7280" />
                <YAxis stroke="#6b7280" domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Repository</th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Score</th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">MRs Reviewed</th>
                  </tr>
                </thead>
                <tbody>
                  {repositoryScores.map((repo) => (
                    <tr key={repo.repo} className="border-b border-gray-100">
                      <td className="py-2 px-4 text-sm">{repo.repo}</td>
                      <td className="py-2 px-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          repo.score >= 90 ? 'bg-green-100 text-green-700' :
                          repo.score >= 80 ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {repo.score}
                        </span>
                      </td>
                      <td className="py-2 px-4 text-sm text-gray-600">{repo.mrs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Review Rule Effectiveness</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Rule</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Violations</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Acceptance Rate</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Impact</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Effectiveness</th>
                  </tr>
                </thead>
                <tbody>
                  {ruleEffectiveness.map((rule, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm font-medium">{rule.rule}</td>
                      <td className="py-3 px-4 text-sm">{rule.violations}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 max-w-[120px] bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ width: `${rule.accepted}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{rule.accepted}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          rule.impact === 'High' ? 'bg-red-100 text-red-700' :
                          rule.impact === 'Medium' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {rule.impact}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < (rule.accepted / 20) ? 'bg-blue-500' : 'bg-gray-300'
                              }`}
                            ></div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
