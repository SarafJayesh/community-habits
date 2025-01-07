import { useState } from 'react';
import { Plus, Users, Trophy, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateGroupDialog from '../components/groups/CreateGroupDialog';

const Groups = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Mock data - will be replaced with real data
  const groups = [
    {
      id: 1,
      name: "Fitness Champions",
      goal: "Exercise 3 times a week",
      members: 8,
      progress: 65,
      streak: 14,
      leaderboard: [
        { name: "John D.", score: 28 },
        { name: "Sarah M.", score: 25 },
        { name: "Mike R.", score: 22 },
      ]
    },
    {
      id: 2,
      name: "Book Club",
      goal: "Read 30 pages daily",
      members: 12,
      progress: 45,
      streak: 7,
      leaderboard: [
        { name: "Emma S.", score: 30 },
        { name: "James L.", score: 28 },
        { name: "Anna K.", score: 25 },
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Groups</h1>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Group
        </Button>
      </div>

      <Tabs defaultValue="my-groups">
        <TabsList>
          <TabsTrigger value="my-groups">My Groups</TabsTrigger>
          <TabsTrigger value="discover">Discover</TabsTrigger>
        </TabsList>

        <TabsContent value="my-groups" className="space-y-4">
          {groups.map((group) => (
            <Card key={group.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle>{group.name}</CardTitle>
                    <div className="text-sm text-muted-foreground">
                      Goal: {group.goal}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{group.members} members</span>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Progress Section */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Group Progress</span>
                      <span>{group.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary">
                      <div
                        className="h-2 rounded-full bg-primary transition-all"
                        style={{ width: `${group.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <TrendingUp className="mr-1 h-4 w-4" />
                      {group.streak} day streak
                    </div>
                  </div>

                  {/* Leaderboard Section */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm font-medium">
                      <Trophy className="mr-1 h-4 w-4 text-yellow-500" />
                      Top Contributors
                    </div>
                    {group.leaderboard.map((member, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={`/api/placeholder/32/32`} />
                            <AvatarFallback>{member.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{member.name}</span>
                        </div>
                        <span className="text-sm font-medium">{member.score} pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="discover">
          <Card>
            <CardContent className="py-6">
              <div className="text-center space-y-2">
                <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="font-medium">Discover Groups</h3>
                <p className="text-sm text-muted-foreground">
                  Find and join groups with similar goals
                </p>
                <Button variant="outline">
                  Browse All Groups
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateGroupDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen} 
      />
    </div>
  );
};

export default Groups;