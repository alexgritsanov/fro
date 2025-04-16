
import React, { useState } from 'react';
import { UserType } from '../UserCreationModal';
import { Button } from '@/components/ui/button';
import { Upload, X, File, CheckCircle2, AlertCircle, FileX, FileCheck, Info, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

interface Document {
  name: string;
  file: File | null;
  required: boolean;
  status?: 'pending' | 'approved' | 'rejected';
}

interface DocumentManagementProps {
  userType: UserType;
  documents: Document[];
  onUpdateDocuments: (documents: Document[]) => void;
}

const DocumentManagement = ({ userType, documents, onUpdateDocuments }: DocumentManagementProps) => {
  const [previewDocument, setPreviewDocument] = useState<Document | null>(null);
  
  const handleFileChange = (index: number, file: File | null) => {
    const updatedDocs = [...documents];
    updatedDocs[index].file = file;
    if (file) {
      updatedDocs[index].status = 'pending';
    }
    onUpdateDocuments(updatedDocs);
  };
  
  const handleFileUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(index, e.target.files[0]);
      toast({
        title: "Document uploaded",
        description: `${e.target.files[0].name} has been uploaded successfully.`,
        variant: "success"
      });
    }
  };
  
  const handleRemoveFile = (index: number) => {
    handleFileChange(index, null);
  };
  
  const handleAddDocument = () => {
    onUpdateDocuments([
      ...documents,
      { name: 'Additional Document', file: null, required: false, status: 'pending' }
    ]);
  };
  
  const handleDocumentNameChange = (index: number, name: string) => {
    const updatedDocs = [...documents];
    updatedDocs[index].name = name;
    onUpdateDocuments(updatedDocs);
  };
  
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };
  
  const getDocumentIcon = (doc: Document) => {
    if (!doc.file) return <File className="h-5 w-5 text-gray-400" />;
    
    switch (doc.status) {
      case 'approved':
        return <FileCheck className="h-5 w-5 text-green-600" />;
      case 'rejected':
        return <FileX className="h-5 w-5 text-red-600" />;
      case 'pending':
      default:
        return <File className="h-5 w-5 text-amber-600" />;
    }
  };
  
  const countMissingRequiredDocuments = () => {
    return documents.filter(doc => doc.required && !doc.file).length;
  };
  
  const previewFile = (doc: Document) => {
    if (doc.file) {
      setPreviewDocument(doc);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium">Document Management</h2>
        <p className="text-gray-500">
          Upload required documents based on user type
        </p>
      </div>
      
      {countMissingRequiredDocuments() > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-amber-800">Missing Required Documents</p>
            <p className="text-amber-700 text-sm mt-1">
              {countMissingRequiredDocuments()} required {countMissingRequiredDocuments() === 1 ? 'document is' : 'documents are'} missing. 
              Please upload all required documents to continue.
            </p>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {documents.map((doc, index) => (
          <Card key={index} className="p-4 relative border hover:shadow-sm transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="mr-2">{getDocumentIcon(doc)}</div>
                  <Input
                    value={doc.name}
                    onChange={(e) => handleDocumentNameChange(index, e.target.value)}
                    className="border-0 p-0 h-auto text-base font-medium focus-visible:ring-0"
                  />
                  {doc.required && (
                    <span className="text-red-500 ml-1 text-sm">*</span>
                  )}
                </div>
                
                {doc.file ? (
                  <div className="flex items-center text-sm text-gray-600 mt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="p-0 h-auto hover:bg-transparent hover:text-blue-600 font-normal"
                      onClick={() => previewFile(doc)}
                    >
                      <span className="flex-1 truncate mr-2">{doc.file.name}</span>
                    </Button>
                    <Badge 
                      variant="outline" 
                      className={getStatusColor(doc.status)}
                    >
                      {doc.status || 'pending'}
                    </Badge>
                    <span className="ml-2 text-gray-500 text-xs">
                      {(doc.file.size / 1024).toFixed(1)} KB
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 ml-2 text-gray-500 hover:text-red-500"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="mt-2">
                    <label
                      htmlFor={`file-upload-${index}`}
                      className="flex items-center justify-center border border-dashed border-gray-300 rounded-md p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <Upload className="h-6 w-6 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Click to upload {doc.required ? 'required' : 'optional'} document
                        </span>
                      </div>
                      <input
                        id={`file-upload-${index}`}
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileUpload(index, e)}
                      />
                    </label>
                  </div>
                )}
              </div>
              
              <div className="ml-4 mt-1">
                {doc.required ? (
                  doc.file ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-amber-500" />
                  )
                ) : (
                  doc.file ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <div className="h-5 w-5" />
                  )
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <Separator />
      
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={handleAddDocument}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Additional Document
        </Button>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 text-blue-800 text-sm">
        <div className="flex items-start">
          <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5 text-blue-600" />
          <div>
            <p className="font-medium">Document Management</p>
            <p className="mt-1">All documents uploaded here will be available in the user's document folder. Required documents must be uploaded before the user can be created.</p>
          </div>
        </div>
      </div>
      
      {previewDocument && previewDocument.file && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setPreviewDocument(null)}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl max-h-[90vh] w-full p-4 m-4 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">{previewDocument.name}</h3>
              <Button variant="ghost" size="icon" onClick={() => setPreviewDocument(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="overflow-auto max-h-[calc(90vh-120px)]">
              {previewDocument.file.type.startsWith('image/') ? (
                <img 
                  src={URL.createObjectURL(previewDocument.file)} 
                  alt={previewDocument.name} 
                  className="max-w-full h-auto rounded"
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <File className="h-16 w-16 text-gray-400 mb-4" />
                  <p className="text-gray-800 font-medium mb-2">{previewDocument.file.name}</p>
                  <p className="text-gray-500 text-sm mb-4">
                    {previewDocument.file.type || 'Unknown file type'} · {(previewDocument.file.size / 1024).toFixed(1)} KB
                  </p>
                  <Button onClick={() => window.open(URL.createObjectURL(previewDocument.file))}>
                    Open Document
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManagement;
