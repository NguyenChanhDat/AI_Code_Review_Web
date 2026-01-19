import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs';
import {
  Save,
  AlertCircle,
  Bell,
  Shield,
  Database,
  Webhook,
  Brain,
} from 'lucide-react';
import { ModelSelector } from '@/app/components/model-selector';
import { Badge } from '@/app/components/ui/badge';

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Settings</h2>
        <p className="text-gray-600">
          Configure system preferences and integrations
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="model">AI Model</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Review Settings</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="min-score">Minimum Acceptable Score</Label>
                  <Input
                    id="min-score"
                    type="number"
                    defaultValue="75"
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    MRs below this score will be flagged
                  </p>
                </div>
                <div>
                  <Label htmlFor="review-timeout">
                    Review Timeout (seconds)
                  </Label>
                  <Input
                    id="review-timeout"
                    type="number"
                    defaultValue="120"
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Maximum time for AI review
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-review on MR creation</Label>
                  <p className="text-sm text-gray-600">
                    Automatically trigger reviews when MRs are opened
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Block merge on critical issues</Label>
                  <p className="text-sm text-gray-600">
                    Prevent merging if critical violations are found
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable caching</Label>
                  <p className="text-sm text-gray-600">
                    Cache results for identical code patterns
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Display Preferences</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="date-format">Date Format</Label>
                <Select defaultValue="mdy">
                  <SelectTrigger id="date-format" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                    <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                    <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="timezone">Timezone</Label>
                <Select defaultValue="utc">
                  <SelectTrigger id="timezone" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                    <SelectItem value="est">Eastern Time (EST)</SelectItem>
                    <SelectItem value="cet">
                      Central European Time (CET)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="model" className="mt-6 space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-5 h-5" />
              <h3 className="text-lg font-semibold">AI Model Selection</h3>
            </div>
            <div className="space-y-6">
              {/* <div>
                <Label>Default AI Model</Label>
                <p className="text-sm text-gray-600 mb-3">Select the model used for code reviews</p>
                <ModelSelector />
              </div> */}

              <div className="flex items-center justify-between py-4 border-t border-gray-200">
                <div>
                  <Label>Auto-select model based on MR size</Label>
                  <p className="text-sm text-gray-600">
                    Automatically choose cost-effective models for smaller MRs
                  </p>
                </div>
                <Switch />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-700"
                    >
                      $
                    </Badge>
                    <span className="text-sm font-medium">Small MRs</span>
                  </div>
                  <ModelSelector />
                  <p className="text-xs text-gray-600">≤ 100 lines changed</p>

                  <p className="text-sm font-medium mt-2">Claude 3 Haiku</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className="bg-yellow-100 text-yellow-700"
                    >
                      $$
                    </Badge>
                    <span className="text-sm font-medium">Medium MRs</span>
                  </div>
                  <ModelSelector />
                  <p className="text-xs text-gray-600">100-500 lines</p>
                  <p className="text-sm font-medium mt-2">Claude 3 Sonnet</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className="bg-red-100 text-red-700"
                    >
                      $$$
                    </Badge>
                    <span className="text-sm font-medium">Large MRs</span>
                  </div>
                  <ModelSelector />
                  <p className="text-xs text-gray-600">&gt; 500 lines</p>
                  <p className="text-sm font-medium mt-2">GPT-4 Turbo</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">
                  Model Selection Tips
                </h4>
                <ul className="text-sm text-blue-800 mt-2 space-y-1">
                  <li>
                    • <strong>Fast models</strong> (GPT-3.5, Claude Haiku) are
                    ideal for quick checks and small changes
                  </li>
                  <li>
                    • <strong>Balanced models</strong> (Claude Sonnet) offer
                    good quality at moderate cost
                  </li>
                  <li>
                    • <strong>Premium models</strong> (GPT-4, Claude Opus)
                    provide the most thorough analysis
                  </li>
                  <li>
                    • Enable auto-selection to optimize cost while maintaining
                    quality
                  </li>
                </ul>
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6 space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5" />
              <h3 className="text-lg font-semibold">
                Notification Preferences
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <Label>MR review completed</Label>
                  <p className="text-sm text-gray-600">
                    Get notified when a review finishes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <Label>Critical issues found</Label>
                  <p className="text-sm text-gray-600">
                    Immediate alert for critical violations
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <Label>Weekly quality report</Label>
                  <p className="text-sm text-gray-600">
                    Receive weekly summary of team performance
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <Label>Infrastructure alerts</Label>
                  <p className="text-sm text-gray-600">
                    System health and performance warnings
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <Label>Cost threshold alerts</Label>
                  <p className="text-sm text-gray-600">
                    Alert when AI costs exceed threshold
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Label htmlFor="cost-threshold">Monthly Cost Threshold</Label>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm">$</span>
                <Input
                  id="cost-threshold"
                  type="number"
                  defaultValue="500"
                  className="max-w-[200px]"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Notification Channels
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-gray-600">team@company.com</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Webhook className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Slack</p>
                  <p className="text-sm text-gray-600">#code-quality channel</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="mt-6 space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Git Integrations</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center font-semibold text-orange-600">
                    GL
                  </div>
                  <div>
                    <p className="font-medium">GitLab</p>
                    <p className="text-sm text-gray-600">
                      Connected to gitlab.company.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Connected
                  </span>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center font-semibold text-white">
                    GH
                  </div>
                  <div>
                    <p className="font-medium">GitHub</p>
                    <p className="text-sm text-gray-600">Not connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center font-semibold text-blue-600">
                    BB
                  </div>
                  <div>
                    <p className="font-medium">Bitbucket</p>
                    <p className="text-sm text-gray-600">Not connected</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Connect
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Webhook Configuration
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input
                  id="webhook-url"
                  type="url"
                  placeholder="https://your-domain.com/webhook"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="webhook-secret">Webhook Secret</Label>
                <Input
                  id="webhook-secret"
                  type="password"
                  placeholder="Enter webhook secret"
                  className="mt-2"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Enable webhooks</Label>
                  <p className="text-sm text-gray-600">
                    Send events to external services
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6 space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Security Settings</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <Label>Two-factor authentication</Label>
                  <p className="text-sm text-gray-600">
                    Add an extra layer of security
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <Label>API key rotation</Label>
                  <p className="text-sm text-gray-600">
                    Automatically rotate API keys monthly
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <Label>Audit logging</Label>
                  <p className="text-sm text-gray-600">
                    Log all system access and changes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <Label>Require approval for high-risk changes</Label>
                  <p className="text-sm text-gray-600">
                    Manual approval for critical rule changes
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Access Control</h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="session-timeout">
                  Session Timeout (minutes)
                </Label>
                <Input
                  id="session-timeout"
                  type="number"
                  defaultValue="60"
                  className="mt-2 max-w-[200px]"
                />
              </div>

              <div>
                <Label htmlFor="password-policy">Password Policy</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="password-policy" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (8+ characters)</SelectItem>
                    <SelectItem value="strong">
                      Strong (12+ with special chars)
                    </SelectItem>
                    <SelectItem value="enterprise">
                      Enterprise (15+ with complexity)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-orange-50 border-orange-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-900">
                  Security Best Practices
                </h4>
                <p className="text-sm text-orange-800 mt-1">
                  Ensure all team members use strong passwords, enable 2FA, and
                  regularly review access logs. Never share API keys or
                  credentials.
                </p>
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
