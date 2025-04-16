
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { FileUpIcon, X, Check, AlertTriangle, File, Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export interface DocumentUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
  userName?: string;
  missingCount?: number;
  documentId?: string | null;
}

const DocumentUploadModal = ({ 
  isOpen, 
  onClose, 
  userId, 
  userName, 
  missingCount,
  documentId
}: DocumentUploadModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Get document title if documentId is provided
  const getDocumentTitle = () => {
    if (!documentId) return "Upload Document";
    
    // This is mock data - in a real app you would fetch the document info
    const documentTypes: {[key: string]: string} = {
      '1': 'Employment Contract',
      '2': 'Tax Form',
      '3': 'ID Document',
      '4': 'Insurance'
    };
    
    return `Upload ${documentTypes[documentId] || "Document"}`;
  };
  
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
  
  const handleUpload = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsUploading(false);
          
          // Show success message
          toast.success('Document uploaded successfully');
          
          // Close the modal
          onClose();
        }, 500);
      }
    }, 100);
  };
  
  const documentTypeLabels = [
    { id: 'contract', name: 'Contract' },
    { id: 'id', name: 'ID Document' },
    { id: 'certificate', name: 'Certificate' },
    { id: 'insurance', name: 'Insurance' },
    { id: 'tax', name: 'Tax Document' }
  ];
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getDocumentTitle()}</DialogTitle>
          {userName && (
            <div className="text-sm text-gray-500">
              {userName} {missingCount && missingCount > 0 && `(${missingCount} document${missingCount > 1 ? 's' : ''} missing)`}
            </div>
          )}
        </DialogHeader>
        
        <div className="space-y-5 py-4">
          {missingCount && missingCount > 0 && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 text-amber-800 rounded-md">
              <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium">Required Documents Missing</p>
                <p className="mt-1">Please upload the remaining {missingCount} required document{missingCount > 1 ? 's' : ''}.</p>
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="document-type">Document Type</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {documentTypeLabels.map(type => (
                <div key={type.id} className="relative">
                  <input
                    type="radio"
                    id={type.id}
                    name="document-type"
                    value={type.id}
                    className="peer absolute w-full h-full opacity-0 cursor-pointer z-10"
                    defaultChecked={documentId === '2' && type.id === 'tax' ||
                                   documentId === '3' && type.id === 'id' ||
                                   documentId === '4' && type.id === 'insurance' ||
                                   documentId === '1' && type.id === 'contract'}
                  />
                  <label 
                    htmlFor={type.id}
                    className="block border rounded-md p-2 text-center text-sm peer-checked:bg-blue-50 peer-checked:border-blue-500 peer-checked:text-blue-700 peer-hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    {type.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="expiry-date">Expiry Date (if applicable)</Label>
            <Input 
              id="expiry-date" 
              type="date" 
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Upload Document</Label>
            <div 
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${selectedFile ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
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
                      setSelectedFile(null);
                    }}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Remove File
                  </Button>
                </div>
              ) : (
                <>
                  <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mb-3">
                    <Upload className="h-6 w-6" />
                  </div>
                  <div className="font-medium">Drop your file here or click to browse</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Supported formats: PDF, JPEG, PNG, DOC
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Maximum file size: 10MB
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
            disabled={!selectedFile || isUploading}
            className="gap-2"
          >
            {isUploading ? (
              <>Processing...</>
            ) : (
              <>
                <FileUpIcon className="h-4 w-4" />
                Upload Document
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUploadModal;
