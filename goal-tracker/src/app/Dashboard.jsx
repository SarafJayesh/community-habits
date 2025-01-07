import { Plus, Target, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  // Mock data - will be replaced with real data from API
  const stats = [
    {
      title: "Active Goals",
      value: "5",
      icon: Target,
    },
    {
      title: "Group Goals",
      value: "3",
      icon: Users,
    },
    {
      title: "Current Streak",
      value: "7 days",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Goal
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Goals Progress */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Mock goals - will be replaced with real data */}
              {[
                { name: "Read 20 pages daily", progress: 80 },
                { name: "Exercise 3 times a week", progress: 60 },
                { name: "Meditate for 10 minutes", progress: 40 },
              ].map((goal) => (
                <div key={goal.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{goal.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {goal.progress}%
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Completed 'Read 20 pages' goal",
                "Joined 'Fitness Champions' group",
                "Created new goal 'Meditate daily'",
                "Achieved 7-day streak",
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-lg border p-3"
                >
                  <div className="flex-1">{activity}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;