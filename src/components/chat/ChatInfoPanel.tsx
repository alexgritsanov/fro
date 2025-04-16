
import React from 'react';
import { X, FileText, Link, Image as ImageIcon, Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ChatThread } from '@/models/Chat';

interface ChatInfoPanelProps {
  thread: ChatThread;
  onClose: () => void;
  onAddParticipant?: () => void;
}

const ChatInfoPanel: React.FC<ChatInfoPanelProps> = ({
  thread,
  onClose,
  onAddParticipant
}) => {
  // Mock data for shared files and links
  const sharedFiles = [
    { id: '1', name: 'Project Proposal.pdf', type: 'document', size: '2.5 MB', date: '2023-05-15' },
    { id: '2', name: 'Site Photo.jpg', type: 'image', size: '1.2 MB', date: '2023-05-14' },
    { id: '3', name: 'Budget Spreadsheet.xlsx', type: 'document', size: '850 KB', date: '2023-05-13' },
  ];
  
  const sharedLinks = [
    { id: '1', title: 'Material Specifications', url: 'https://example.com/specs', date: '2023-05-12' },
    { id: '2', title: 'Reference Design', url: 'https://example.com/design', date: '2023-05-10' },
  ];
  
  return (
    <div className="w-80 border-l border-gray-200 flex flex-col h-full bg-white">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="font-semibold">Chat Info</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          {thread.type === 'document' && thread.documentContext && (
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Document</h4>
              <div className="flex items-start p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <FileText className="h-10 w-10 text-orange-500 mr-3 flex-shrink-0" />
                <div>
                  <h5 className="font-medium">{thread.documentContext.documentName}</h5>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {thread.documentContext.documentType}
                  </Badge>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-sm text-blue-600"
                    onClick={() => {
                      // In a real app, this would navigate to the document
                      alert('Navigate to document: ' + thread.documentContext?.documentId);
                    }}
                  >
                    View Document
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Participants ({thread.participants.length})</h4>
              {thread.type !== 'direct' && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-xs"
                  onClick={onAddParticipant}
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              )}
            </div>
            
            <div className="space-y-2">
              {thread.participants.map((participant) => (
                <div key={participant.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                        {participant.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{participant.name}</p>
                      {participant.status && (
                        <div className="flex items-center">
                          <span className={`h-1.5 w-1.5 rounded-full mr-1 ${
                            participant.status === 'online' ? 'bg-green-500' : 
                            participant.status === 'away' ? 'bg-yellow-500' : 
                            'bg-gray-400'
                          }`} />
                          <span className="text-xs text-gray-500">
                            {participant.status === 'online' ? 'Online' : 
                             participant.status === 'away' ? 'Away' : 
                             'Offline'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Shared Files</h4>
            <div className="space-y-2">
              {sharedFiles.length === 0 ? (
                <p className="text-sm text-gray-500">No files shared yet</p>
              ) : (
                sharedFiles.map((file) => (
                  <div key={file.id} className="flex items-center p-2 border border-gray-200 rounded-md">
                    {file.type === 'image' ? (
                      <ImageIcon className="h-8 w-8 text-blue-500 mr-2" />
                    ) : (
                      <FileText className="h-8 w-8 text-orange-500 mr-2" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.size} • {file.date}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-2">Shared Links</h4>
            <div className="space-y-2">
              {sharedLinks.length === 0 ? (
                <p className="text-sm text-gray-500">No links shared yet</p>
              ) : (
                sharedLinks.map((linkItem) => (
                  <div key={linkItem.id} className="flex items-start p-2 border border-gray-200 rounded-md">
                    <Link className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{linkItem.title}</p>
                      <a 
                        href={linkItem.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 truncate block"
                      >
                        {linkItem.url}
                      </a>
                      <p className="text-xs text-gray-500 mt-1">{linkItem.date}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
      
      <div className="border-t border-gray-200 p-4">
        <Button variant="outline" className="w-full text-red-600" size="sm">
          {thread.type === 'document' ? 'Leave discussion' : thread.type === 'group' ? 'Leave group' : 'Block user'}
        </Button>
      </div>
    </div>
  );
};

export default ChatInfoPanel;
