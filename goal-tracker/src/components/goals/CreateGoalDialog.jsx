import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from '@/components/ui/dialog';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Label } from '@/components/ui/label';
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from '@/components/ui/select';
  import { Switch } from '@/components/ui/switch';
  
  const CreateGoalDialog = ({ open, onOpenChange }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission
      onOpenChange(false);
    };
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
              <DialogDescription>
                Set up your new goal and start tracking your progress.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Goal Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Read 20 pages daily"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="duration-type">Duration Type</Label>
                <Select defaultValue="fixed">
                  <SelectTrigger id="duration-type">
                    <SelectValue placeholder="Select duration type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fixed">Fixed Duration</SelectItem>
                    <SelectItem value="continuous">Continuous</SelectItem>
                  </SelectContent>
                </Select>
              </div>
  
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration (days)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  placeholder="e.g., 30"
                  required
                />
              </div>
  
              <div className="grid gap-2">
                <Label htmlFor="reminder-time">Reminder Time</Label>
                <Input
                  id="reminder-time"
                  type="time"
                  required
                />
              </div>
  
              <div className="flex items-center justify-between">
                <Label htmlFor="group-sync">Sync with Group</Label>
                <Switch id="group-sync" />
              </div>
            </div>
  
            <DialogFooter>
              <Button type="submit">Create Goal</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default CreateGoalDialog;