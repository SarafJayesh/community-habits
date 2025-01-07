import { useState } from 'react';
import { Plus, Calendar, Check, X, SkipForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import CreateGoalDialog from '../components/goals/CreateGoalDialog';

const Goals = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock data - will be replaced with real data
  const goals = [
    {
      id: 1,
      name: "Read 20 pages daily",
      duration: "30 days",
      progress: 10,
      total: 30,
      streak: 10,
      status: "active"
    },
    {
      id: 2,
      name: "Exercise 3 times a week",
      duration: "Continuous",
      progress: 8,
      total: 12,
      streak: 2,
      status: "active"
    },
    {
      id: 3,
      name: "Learn Spanish",
      duration: "90 days",
      progress: 45,
      total: 90,
      streak: 0,
      status: "missed"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Goals</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Goal
        </Button>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          {goals.map((goal) => (
            <Card key={goal.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle>{goal.name}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {goal.duration}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <Check className="h-4 w-4 text-green-500" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <SkipForward className="h-4 w-4 text-yellow-500" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress: {goal.progress}/{goal.total} days</span>
                    <span className="font-medium">
                      Streak: {goal.streak} days
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary">
                    <div
                      className="h-2 rounded-full bg-primary transition-all"
                      style={{ width: `${(goal.progress / goal.total) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardContent className="py-6 text-center text-muted-foreground">
              No completed goals yet
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateGoalDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
};

export default Goals;