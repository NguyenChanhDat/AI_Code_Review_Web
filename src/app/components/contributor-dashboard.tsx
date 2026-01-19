import { Card } from '@/app/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Avatar } from '@/app/components/ui/avatar';
import { TrendingUp, TrendingDown, Award, Target, Calendar } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';

const contributors = [
  { 
    id: '1', 
    name: 'Alice Chen', 
    role: 'Senior Engineer',
    avatar: 'AC',
    score: 92,
    trend: 5.2,
    mrs: 45,
    accepted: 95
  },
  { 
    id: '2', 
    name: 'Bob Kumar', 
    role: 'Backend Developer',
    avatar: 'BK',
    score: 88,
    trend: 3.8,
    mrs: 38,
    accepted: 92
  },
  { 
    id: '3', 
    name: 'Carol Smith', 
    role: 'Frontend Developer',
    avatar: 'CS',
    score: 85,
    trend: -2.1,
    mrs: 52,
    accepted: 88
  },
  { 
    id: '4', 
    name: 'David Lee', 
    role: 'Full Stack Developer',
    avatar: 'DL',
    score: 90,
    trend: 7.5,
    mrs: 42,
    accepted: 94
  },
  { 
    id: '5', 
    name: 'Emma Wilson', 
    role: 'DevOps Engineer',
    avatar: 'EW',
    score: 87,
    trend: 4.2,
    mrs: 28,
    accepted: 91
  },
];

const weeklyScores = [
  { week: 'W1', alice: 85, bob: 82, carol: 88, david: 86 },
  { week: 'W2', alice: 87, bob: 84, carol: 85, david: 88 },
  { week: 'W3', alice: 89, bob: 86, carol: 83, david: 89 },
  { week: 'W4', alice: 92, bob: 88, carol: 85, david: 90 },
];

const contributorCategories = [
  { category: 'Security', score: 95 },
  { category: 'Performance', score: 88 },
  { category: 'Maintainability', score: 92 },
  { category: 'Best Practices', score: 90 },
  { category: 'Documentation', score: 85 },
];

const monthlyStats = [
  { month: 'Oct', mrs: 12, avgScore: 85 },
  { month: 'Nov', mrs: 15, avgScore: 87 },
  { month: 'Dec', mrs: 18, avgScore: 89 },
  { month: 'Jan', mrs: 20, avgScore: 92 },
];

export function ContributorDashboard() {
  const [selectedContributor, setSelectedContributor] = useState('1');
  const [trendPeriod, setTrendPeriod] = useState('weekly');
  const [leaderboardPeriod, setLeaderboardPeriod] = useState('monthly');
  const selected = contributors.find(c => c.id === selectedContributor);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Contributor Performance</h2>
          <p className="text-gray-600">Individual and team quality metrics</p>
        </div>
        <Select value={selectedContributor} onValueChange={setSelectedContributor}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select contributor" />
          </SelectTrigger>
          <SelectContent>
            {contributors.map((contributor) => (
              <SelectItem key={contributor.id} value={contributor.id}>
                {contributor.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Contributor Summary */}
      {selected && (
        <Card className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-semibold">
              {selected.avatar}
            </Avatar>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{selected.name}</h3>
              <p className="text-gray-600 mb-4">{selected.role}</p>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Quality Score</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold">{selected.score}</span>
                    <div className="flex items-center gap-1">
                      {selected.trend > 0 ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm ${selected.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {Math.abs(selected.trend)}%
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">MRs This Month</p>
                  <span className="text-2xl font-semibold">{selected.mrs}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Acceptance Rate</p>
                  <span className="text-2xl font-semibold">{selected.accepted}%</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Rank</p>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <span className="text-2xl font-semibold">#{contributors.findIndex(c => c.id === selected.id) + 1}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Category Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={contributorCategories}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="category" stroke="#6b7280" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" />
              <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis yAxisId="left" stroke="#6b7280" />
              <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="mrs" fill="#8b5cf6" name="Merge Requests" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="avgScore" fill="#3b82f6" name="Avg Score" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Team Comparison */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Team Performance Trends</h3>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <Select value={trendPeriod} onValueChange={setTrendPeriod}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="per-mr">Per MR</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={weeklyScores}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="week" stroke="#6b7280" />
            <YAxis stroke="#6b7280" domain={[75, 95]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Legend />
            <Line type="monotone" dataKey="alice" stroke="#3b82f6" strokeWidth={2} name="Alice" />
            <Line type="monotone" dataKey="bob" stroke="#8b5cf6" strokeWidth={2} name="Bob" />
            <Line type="monotone" dataKey="carol" stroke="#ec4899" strokeWidth={2} name="Carol" />
            <Line type="monotone" dataKey="david" stroke="#10b981" strokeWidth={2} name="David" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Leaderboard */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Team Leaderboard</h3>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <Select value={leaderboardPeriod} onValueChange={setLeaderboardPeriod}>
              <SelectTrigger className="w-[160px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="per-mr">Per MR</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Rank</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Contributor</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Role</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Score</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Trend</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">MRs</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Acceptance</th>
              </tr>
            </thead>
            <tbody>
              {contributors.sort((a, b) => b.score - a.score).map((contributor, index) => (
                <tr key={contributor.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      {index === 0 && <Award className="w-5 h-5 text-yellow-500" />}
                      {index === 1 && <Award className="w-5 h-5 text-gray-400" />}
                      {index === 2 && <Award className="w-5 h-5 text-orange-600" />}
                      <span className="font-medium">#{index + 1}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
                        {contributor.avatar}
                      </Avatar>
                      <span className="font-medium">{contributor.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{contributor.role}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      contributor.score >= 90 ? 'bg-green-100 text-green-700' :
                      contributor.score >= 85 ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {contributor.score}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      {contributor.trend > 0 ? (
                        <>
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600">+{contributor.trend}%</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="w-4 h-4 text-red-600" />
                          <span className="text-sm text-red-600">{contributor.trend}%</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{contributor.mrs}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 max-w-[80px] bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-green-500 h-1.5 rounded-full" 
                          style={{ width: `${contributor.accepted}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{contributor.accepted}%</span>
                    </div>
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