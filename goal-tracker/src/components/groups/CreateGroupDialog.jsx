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
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

const CreateGroupDialog = ({ open, onOpenChange }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Group</DialogTitle>
            <DialogDescription>
              Create a group to achieve goals together with others.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="group-name">Group Name</Label>
              <Input
                id="group-name"
                placeholder="e.g., Fitness Champions"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What's this group about?"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="goal">Group Goal</Label>
              <Input
                id="goal"
                placeholder="e.g., Exercise 3 times a week"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="duration-type">Goal Duration</Label>
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
              <Label htmlFor="target">Group Target</Label>
              <Input
                id="target"
                placeholder="e.g., 30 days"
                type="number"
                min="1"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="individual-targets">Individual Targets</Label>
                <div className="text-sm text-muted-foreground">
                  Set specific targets for each member
                </div>
              </div>
              <Switch id="individual-targets" />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="private">Private Group</Label>
                <div className="text-sm text-muted-foreground">
                  Only invited members can join
                </div>
              </div>
              <Switch id="private" />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Create Group</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupDialog;