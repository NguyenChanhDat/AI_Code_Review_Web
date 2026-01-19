import { Card } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { DollarSign, Zap, Clock, Database, Activity, TrendingUp } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart } from 'recharts';

const tokenUsageTrend = [
  { date: 'Jan 15', tokens: 1250000, cost: 25.5, reviews: 45 },
  { date: 'Jan 22', tokens: 1380000, cost: 28.2, reviews: 52 },
  { date: 'Jan 29', tokens: 1520000, cost: 31.0, reviews: 58 },
  { date: 'Feb 5', tokens: 1420000, cost: 29.0, reviews: 54 },
  { date: 'Feb 12', tokens: 1680000, cost: 34.2, reviews: 62 },
  { date: 'Feb 19', tokens: 1750000, cost: 35.7, reviews: 65 },
];

const repositoryTokens = [
  { repo: 'backend-api', tokens: 425000, cost: 8.5, reviews: 45 },
  { repo: 'frontend-web', tokens: 520000, cost: 10.4, reviews: 52 },
  { repo: 'mobile-app', tokens: 380000, cost: 7.6, reviews: 38 },
  { repo: 'data-pipeline', tokens: 285000, cost: 5.7, reviews: 28 },
  { repo: 'admin-dashboard', tokens: 340000, cost: 6.8, reviews: 33 },
];

const performanceMetrics = [
  { time: '00:00', latency: 245, throughput: 12 },
  { time: '04:00', latency: 220, throughput: 8 },
  { time: '08:00', latency: 380, throughput: 25 },
  { time: '12:00', latency: 420, throughput: 32 },
  { time: '16:00', latency: 390, throughput: 28 },
  { time: '20:00', latency: 310, throughput: 18 },
];

const cacheMetrics = [
  { week: 'W1', hitRate: 65, avgTime: 280 },
  { week: 'W2', hitRate: 72, avgTime: 245 },
  { week: 'W3', hitRate: 78, avgTime: 220 },
  { week: 'W4', hitRate: 82, avgTime: 195 },
  { week: 'W5', hitRate: 85, avgTime: 180 },
];

const ruleTokenConsumption = [
  { rule: 'Security analysis', tokens: 185000, avgPerFile: 2500, impact: 'High' },
  { rule: 'Performance check', tokens: 145000, avgPerFile: 1800, impact: 'High' },
  { rule: 'Code complexity', tokens: 95000, avgPerFile: 1200, impact: 'Medium' },
  { rule: 'Naming conventions', tokens: 68000, avgPerFile: 850, impact: 'Low' },
  { rule: 'Documentation check', tokens: 52000, avgPerFile: 680, impact: 'Low' },
];

const infrastructureHealth = [
  { metric: 'CPU Usage', value: 68, status: 'normal', threshold: 80 },
  { metric: 'Memory Usage', value: 72, status: 'normal', threshold: 85 },
  { metric: 'Queue Length', value: 12, status: 'good', threshold: 50 },
  { metric: 'Error Rate', value: 0.8, status: 'good', threshold: 5 },
];

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  color: string;
}

function MetricCard({ label, value, change, icon, color }: MetricCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          <h3 className="text-3xl font-semibold mb-2">{value}</h3>
          {change && (
            <p className="text-sm text-green-600 flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              {change}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
}

export function AIInfrastructureDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">AI System & Infrastructure</h2>
        <p className="text-gray-600">Monitor AI resource usage, costs, and system performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Total Tokens (30d)"
          value="9.2M"
          change="+12% vs last month"
          icon={<Database className="w-6 h-6 text-blue-600" />}
          color="bg-blue-100"
        />
        <MetricCard
          label="Estimated Cost"
          value="$187"
          change="+8% vs last month"
          icon={<DollarSign className="w-6 h-6 text-green-600" />}
          color="bg-green-100"
        />
        <MetricCard
          label="Avg Response Time"
          value="285ms"
          change="-15% improvement"
          icon={<Clock className="w-6 h-6 text-purple-600" />}
          color="bg-purple-100"
        />
        <MetricCard
          label="Cache Hit Rate"
          value="85%"
          change="+18% vs last month"
          icon={<Zap className="w-6 h-6 text-yellow-600" />}
          color="bg-yellow-100"
        />
      </div>

      <Tabs defaultValue="usage" className="w-full">
        <TabsList>
          <TabsTrigger value="usage">Token Usage</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="rules">Rule Analysis</TabsTrigger>
          <TabsTrigger value="health">Infrastructure Health</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="mt-6 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Token Usage & Cost Trend</h3>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={tokenUsageTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="tokens" 
                  fill="#3b82f6" 
                  fillOpacity={0.3}
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  name="Tokens"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="cost" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="Cost ($)"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Token Usage by Repository</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={repositoryTokens}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="repo" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="tokens" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Repository</th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Total Tokens</th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Cost</th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Reviews</th>
                    <th className="text-left py-2 px-4 text-sm font-medium text-gray-600">Avg Tokens/Review</th>
                  </tr>
                </thead>
                <tbody>
                  {repositoryTokens.map((repo) => (
                    <tr key={repo.repo} className="border-b border-gray-100">
                      <td className="py-2 px-4 text-sm font-medium">{repo.repo}</td>
                      <td className="py-2 px-4 text-sm">{(repo.tokens / 1000).toFixed(0)}K</td>
                      <td className="py-2 px-4 text-sm">${repo.cost.toFixed(2)}</td>
                      <td className="py-2 px-4 text-sm">{repo.reviews}</td>
                      <td className="py-2 px-4 text-sm">{(repo.tokens / repo.reviews).toFixed(0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Response Time & Throughput</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={performanceMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis yAxisId="left" stroke="#6b7280" />
                  <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="latency" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Latency (ms)"
                  />
                  <Bar 
                    yAxisId="right"
                    dataKey="throughput" 
                    fill="#3b82f6" 
                    name="Reviews/hour"
                    radius={[4, 4, 0, 0]}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Cache Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={cacheMetrics}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="week" stroke="#6b7280" />
                  <YAxis yAxisId="left" stroke="#6b7280" domain={[0, 100]} />
                  <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="hitRate" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    name="Hit Rate (%)"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="avgTime" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    name="Avg Time (ms)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Processing Breakdown</h3>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Preprocessing</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="text-sm font-semibold">72ms</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Model Inference</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div className="bg-purple-500 h-3 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm font-semibold">168ms</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Post-processing</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="text-sm font-semibold">45ms</span>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Token Consumption by Review Rule</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Rule</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Total Tokens</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Avg per File</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Impact</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">Cost Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {ruleTokenConsumption.map((rule, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm font-medium">{rule.rule}</td>
                      <td className="py-3 px-4 text-sm">{(rule.tokens / 1000).toFixed(0)}K</td>
                      <td className="py-3 px-4 text-sm">{rule.avgPerFile}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          rule.impact === 'High' ? 'bg-green-100 text-green-700' :
                          rule.impact === 'Medium' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {rule.impact}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 max-w-[120px] bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                rule.impact === 'High' ? 'bg-green-500' :
                                rule.impact === 'Medium' ? 'bg-blue-500' :
                                'bg-gray-500'
                              }`}
                              style={{ width: `${rule.impact === 'High' ? 85 : rule.impact === 'Medium' ? 60 : 35}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Infrastructure Metrics</h3>
              <div className="space-y-6">
                {infrastructureHealth.map((item) => (
                  <div key={item.metric}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">{item.metric}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold">{item.value}{item.metric.includes('Rate') ? '%' : ''}</span>
                        <div className={`w-2 h-2 rounded-full ${
                          item.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            item.status === 'good' ? 'bg-green-500' : 'bg-yellow-500'
                          }`}
                          style={{ width: `${(item.value / item.threshold) * 100}%` }}
                        ></div>
                      </div>
                      <div 
                        className="absolute top-0 w-0.5 h-2 bg-red-500" 
                        style={{ left: `${(item.threshold / (item.metric.includes('Usage') ? 100 : item.threshold * 1.5)) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Threshold: {item.threshold}{item.metric.includes('Usage') ? '%' : ''}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">System Uptime</p>
                      <p className="text-sm text-gray-600">99.8% (30 days)</p>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Queue Status</p>
                      <p className="text-sm text-gray-600">12 reviews pending</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-blue-600">Normal</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Processing Rate</p>
                      <p className="text-sm text-gray-600">24 reviews/hour</p>
                    </div>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Last 24 Hours</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Total Reviews</p>
                      <p className="font-semibold">542</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Success Rate</p>
                      <p className="font-semibold">99.2%</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Avg Latency</p>
                      <p className="font-semibold">285ms</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Errors</p>
                      <p className="font-semibold">4</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
