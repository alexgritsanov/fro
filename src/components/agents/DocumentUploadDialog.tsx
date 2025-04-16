
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  FileUp, 
  Upload, 
  File, 
  X, 
  CheckCircle
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

interface DocumentUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const DocumentUploadDialog: React.FC<DocumentUploadDialogProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [notes, setNotes] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const handleRemoveFile = () => {
    setSelectedFile(null);
  };
  
  const handleUpload = () => {
    if (!selectedFile || !documentType) {
      toast.error('Please select a file and document type');
      return;
    }
    
    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          toast.success('Document uploaded successfully');
          onClose();
          
          // Reset form
          setSelectedFile(null);
          setDocumentType('');
          setExpiryDate('');
          setNotes('');
          setUploadProgress(0);
        }, 500);
      }
    }, 300);
  };
  
  const documentTypes = [
    { id: 'agent-agreement', name: 'Agent Agreement' },
    { id: 'tax-registration', name: 'Tax Registration' },
    { id: 'identity-verification', name: 'Identity Verification' },
    { id: 'business-license', name: 'Business License' },
    { id: 'insurance-verification', name: 'Insurance Verification' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Upload className="mr-2 h-5 w-5 text-blue-600" />
            Upload Document
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="document-type">Document Type</Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div 
            className={`
              border-2 border-dashed rounded-lg p-6 
              ${selectedFile ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
              transition-colors cursor-pointer
            `}
            onDrop={handleFileDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            {selectedFile ? (
              <div className="flex flex-col items-center">
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-3">
                  <File className="h-6 w-6" />
                </div>
                <div className="font-medium text-blue-600">{selectedFile.name}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                >
                  <X className="h-4 w-4 mr-1" />
                  Remove File
                </Button>
              </div>
            ) : (
              <>
                <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-3 mx-auto">
                  <Upload className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <div className="font-medium">Drop your file here or click to browse</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Supported formats: PDF, JPEG, PNG, DOC
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Maximum file size: 10MB
                  </div>
                </div>
              </>
            )}
            <input 
              id="file-upload" 
              type="file" 
              className="hidden" 
              onChange={handleFileChange} 
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expiry-date">Expiry Date (if applicable)</Label>
            <Input 
              id="expiry-date" 
              type="date" 
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              placeholder="Add any relevant notes about this document..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
          
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={!selectedFile || !documentType || isUploading}
            className="flex items-center gap-2"
          >
            {isUploading ? (
              <>Processing...</>
            ) : (
              <>
                <FileUp className="h-4 w-4" />
                Upload Document
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUploadDialog;
