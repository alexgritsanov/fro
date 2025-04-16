
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, ChevronDown, ChevronUp, ExternalLink, MessageCircle, DownloadCloud, Link, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DocumentContext } from '@/models/Chat';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Card } from '@/components/ui/card';

interface DocumentPreviewInChatProps {
  documentContext: DocumentContext;
  onExpand: () => void;
}

interface RelatedDocument {
  id: string;
  name: string;
  type: string;
  relationship: string;
}

const DocumentPreviewInChat: React.FC<DocumentPreviewInChatProps> = ({
  documentContext,
  onExpand
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Mock related documents - in a real app, this would come from the backend
  const relatedDocuments: RelatedDocument[] = [
    {
      id: 'rel-1',
      name: 'Service Call #SC-1234',
      type: 'service-call',
      relationship: 'Based on'
    },
    {
      id: 'rel-2',
      name: 'Invoice #INV-2345',
      type: 'invoice',
      relationship: 'Referenced by'
    }
  ];
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const getDocumentIcon = () => {
    return <FileText className="h-10 w-10 text-amber-500" />;
  };
  
  const getDocumentTypeLabel = () => {
    return documentContext.documentType.replace('-', ' ');
  };
  
  return (
    <div className="border-b border-gray-200">
      <div className="p-3 bg-amber-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 mr-1 text-amber-600 hover:text-amber-700 hover:bg-amber-100"
              onClick={toggleCollapse}
            >
              {isCollapsed ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
            </Button>
            <h3 className="font-medium text-amber-800">Document Discussion</h3>
          </div>
          
          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7 text-amber-600 hover:text-amber-700 hover:bg-amber-100"
                >
                  <DownloadCloud className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Download Document</TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7 text-amber-600 hover:text-amber-700 hover:bg-amber-100"
                  onClick={onExpand}
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Expand Document</TooltipContent>
            </Tooltip>
          </div>
        </div>
        
        {!isCollapsed && (
          <div className="mt-2">
            <div className="flex">
              <div className="mr-3">
                {getDocumentIcon()}
              </div>
              
              <div className="flex-1">
                <h4 className="font-medium text-amber-900">{documentContext.documentName}</h4>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="text-xs border-amber-200 text-amber-700">
                    {getDocumentTypeLabel()}
                  </Badge>
                  
                  {documentContext.status && (
                    <Badge variant="outline" className="ml-2 text-xs border-amber-200 text-amber-700">
                      {documentContext.status}
                    </Badge>
                  )}
                  
                  {documentContext.lastUpdated && (
                    <span className="text-xs text-amber-700 ml-2">
                      Last updated: {documentContext.lastUpdated}
                    </span>
                  )}
                </div>
                
                {relatedDocuments.length > 0 && (
                  <div className="mt-3">
                    <h5 className="text-xs font-medium text-amber-800 mb-1">Related Documents</h5>
                    <div className="space-y-1">
                      {relatedDocuments.map(doc => (
                        <Card key={doc.id} className="p-2 border-amber-200 bg-amber-50">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FileText className="h-3.5 w-3.5 text-amber-600 mr-1.5" />
                              <span className="text-xs text-amber-900">{doc.name}</span>
                            </div>
                            <Badge variant="outline" className="text-[10px] h-4 border-amber-200 text-amber-700">
                              {doc.relationship}
                            </Badge>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-3 bg-amber-100 border-amber-200 text-amber-800 hover:bg-amber-200 hover:text-amber-900"
              onClick={onExpand}
            >
              <ExternalLink className="h-3.5 w-3.5 mr-1.5" />
              <span>View Full Document</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentPreviewInChat;
