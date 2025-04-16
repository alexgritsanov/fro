
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid, List } from 'lucide-react';
import ScheduleList from '@/components/schedule/ScheduleList';
import ScheduleGrid from '@/components/schedule/ScheduleGrid';
import { ScheduleCall } from '@/pages/Schedule';
import { Button } from '@/components/ui/button';

interface IncompleteServiceCallsModalProps {
  isOpen: boolean;
  onClose: () => void;
  incompleteCalls: ScheduleCall[];
  onOpenModal: (call: ScheduleCall) => void;
  onDeleteCall: (id: string) => void;
  onUploadSignature: (id: string) => void;
  title?: string;
  status?: string;
}

const IncompleteServiceCallsModal: React.FC<IncompleteServiceCallsModalProps> = ({
  isOpen,
  onClose,
  incompleteCalls,
  onOpenModal,
  onDeleteCall,
  onUploadSignature,
  title = "Incomplete Service Calls",
  status = "incomplete"
}) => {
  const [view, setView] = useState<'list' | 'grid'>('list');

  // Determine color based on status
  const getColor = () => {
    if (status.includes('incomplete')) return 'text-red-500';
    if (status.includes('awaiting') || status.includes('without')) return 'text-amber-500';
    return 'text-blue-500';
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-11/12 max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center">
            <span className={getColor()}>
              {incompleteCalls.length}
            </span> 
            <span className="ml-2">{title}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">
            {status === 'incomplete' && (
              "Service calls that have not been completed by their scheduled date."
            )}
            {status === 'awaiting-signature' && (
              "Service calls that are waiting for customer signatures."
            )}
            {status === 'without-signature' && (
              "Completed service calls that do not have customer signatures."
            )}
          </div>
          
          <div className="bg-white border border-gray-200 rounded-md flex">
            <Button
              variant="ghost"
              className={`rounded-l-md rounded-r-none text-xs px-3 py-2 ${view === 'list' ? 'bg-gray-100' : ''}`}
              onClick={() => setView('list')}
            >
              <List className="h-4 w-4 mr-1" />
              List
            </Button>
            <Button
              variant="ghost"
              className={`rounded-l-none rounded-r-md text-xs px-3 py-2 ${view === 'grid' ? 'bg-gray-100' : ''}`}
              onClick={() => setView('grid')}
            >
              <Grid className="h-4 w-4 mr-1" />
              Grid
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto">
          {view === 'list' ? (
            <ScheduleList 
              schedules={incompleteCalls}
              onOpenModal={onOpenModal}
              onDeleteCall={onDeleteCall}
              onUploadSignature={onUploadSignature}
              statusFilter={status}
            />
          ) : (
            <ScheduleGrid 
              schedules={incompleteCalls}
              onOpenModal={onOpenModal}
              onDeleteCall={onDeleteCall}
              onUploadSignature={onUploadSignature}
              statusFilter={status}
            />
          )}
        </div>
        
        <DialogFooter className="mt-4 border-t pt-4">
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IncompleteServiceCallsModal;
