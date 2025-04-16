import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2, X } from 'lucide-react';
import { DeleteConfirmationDialogProps } from './types';

const DeleteConfirmationDialog: React.FC<DeleteConfirmationDialogProps> = ({
  showDeleteConfirmation,
  setShowDeleteConfirmation,
  officeToDelete,
  confirmDeleteOffice,
  isDeleting
}) => {
  const handleClose = () => {
    if (!isDeleting) {
      setShowDeleteConfirmation(false);
    }
  };

  return (
    <Dialog open={showDeleteConfirmation} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Delete Office</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete {officeToDelete?.name}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-100 mt-4 dark:bg-red-900/20 dark:border-red-800">
          <p className="text-red-700 dark:text-red-400 text-sm">
            Deleting this office will remove all associated data including users, services, and documents.
          </p>
        </div>
        
        <DialogFooter className="flex justify-end gap-2 mt-6">
          <Button 
            variant="outline" 
            onClick={handleClose}
            disabled={isDeleting}
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={confirmDeleteOffice}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            {isDeleting ? 'Deleting...' : 'Delete Office'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
