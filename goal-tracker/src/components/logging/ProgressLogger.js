import { useState } from 'react';
import { Check, X, SkipForward, Calendar } from 'lucide-react';
import { useLogging } from '@/context/LoggingContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { format } from 'date-fns';

const ProgressLogger = ({ goalId, goalName, groupId = null }) => {
  const { logProgress, loggingHistory, loading } = useLogging();
  const [showHistory, setShowHistory] = useState(false);

  const handleLog = async (status) => {
    try {
      await logProgress(goalId, {
        status,
        date: new Date(),
        groupId
      });
    } catch (error) {
      console.error('Error logging progress:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-500';
      case 'skipped':
        return 'text-yellow-500';
      case 'missed':
        return 'text-red-500';
      default:
        return '';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Check className={`h-4 w-4 ${getStatusColor(status)}`} />;
      case 'skipped':
        return <SkipForward className={`h-4 w-4 ${getStatusColor(status)}`} />;
      case 'missed':
        return <X className={`h-4 w-4 ${getStatusColor(status)}`} />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">{goalName}</CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            disabled={loading}
            onClick={() => handleLog('completed')}
          >
            <Check className="h-4 w-4 text-green-500" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={loading}
            onClick={() => handleLog('skipped')}
          >
            <SkipForward className="h-4 w-4 text-yellow-500" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled={loading}
            onClick={() => handleLog('missed')}
          >
            <X className="h-4 w-4 text-red-500" />
          </Button>
          <Dialog open={showHistory} onOpenChange={setShowHistory}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon">
                <Calendar className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Progress History</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {loggingHistory[goalId]?.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(log.status)}
                      <span className="font-medium">
                        {format(new Date(log.date), 'MMM d, yyyy')}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {format(new Date(log.date), 'h:mm a')}
                    </span>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          Log your progress for today
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressLogger;