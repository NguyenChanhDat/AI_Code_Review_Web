import { Card } from '@/app/components/ui/card';
import { TrendingUp, TrendingDown, Code2, GitMerge, Users, AlertCircle } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const qualityTrendData = [
  { week: 'W1', score: 72, issues: 45 },
  { week: 'W2', score: 75, issues: 38 },
  { week: 'W3', score: 78, issues: 32 },
  { week: 'W4', score: 82, issues: 28 },
  { week: 'W5', score: 85, issues: 22 },
  { week: 'W6', score: 87, issues: 18 },
];

const categoryScores = [
  { category: 'Security', score: 92 },
  { category: 'Performance', score: 85 },
  { category: 'Maintainability', score: 88 },
  { category: 'Best Practices', score: 83 },
  { category: 'Documentation', score: 76 },
];

const recentMRs = [
  { id: 'MR-1234', title: 'Refactor authentication module', score: 92, status: 'approved', contributor: 'Alice Chen' },
  { id: 'MR-1235', title: 'Add caching layer to API', score: 88, status: 'approved', contributor: 'Bob Kumar' },
  { id: 'MR-1236', title: 'Update user profile component', score: 78, status: 'pending', contributor: 'Carol Smith' },
  { id: 'MR-1237', title: 'Fix memory leak in dashboard', score: 95, status: 'approved', contributor: 'David Lee' },
];

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
}

function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-semibold">{value}</h3>
          {change !== undefined && (
            <div className="flex items-center gap-1 mt-2">
              {trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
              <span className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(change)}% vs last week
              </span>
            </div>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          {icon}
        </div>
      </div>
    </Card>
  );
}

export function OverviewDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Dashboard Overview</h2>
        <p className="text-gray-600">Real-time insights into code quality and team performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Average Quality Score"
          value={85}
          change={7.2}
          trend="up"
          icon={<Code2 className="w-6 h-6 text-blue-600" />}
        />
        <StatCard
          title="MRs Reviewed (30d)"
          value={342}
          change={12.5}
          trend="up"
          icon={<GitMerge className="w-6 h-6 text-purple-600" />}
        />
        <StatCard
          title="Active Contributors"
          value={28}
          change={3.2}
          trend="up"
          icon={<Users className="w-6 h-6 text-green-600" />}
        />
        <StatCard
          title="Critical Issues"
          value={12}
          change={25}
          trend="down"
          icon={<AlertCircle className="w-6 h-6 text-orange-600" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quality Score Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={qualityTrendData}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#3b82f6" 
                fill="url(#colorScore)" 
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Category Scores</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryScores} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" domain={[0, 100]} stroke="#6b7280" />
              <YAxis dataKey="category" type="category" width={120} stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Bar dataKey="score" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent MRs */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Merge Requests</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">MR ID</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Title</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Contributor</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Score</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentMRs.map((mr) => (
                <tr key={mr.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-sm font-medium text-blue-600">{mr.id}</td>
                  <td className="py-3 px-4 text-sm">{mr.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{mr.contributor}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-[100px] bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${mr.score}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{mr.score}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      mr.status === 'approved' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {mr.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
