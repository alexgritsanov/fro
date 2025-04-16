
import React from 'react';
import { MessageSquare, Users, FileText, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyChatStateProps {
  onNewChat: () => void;
  onNewGroup: () => void;
}

const EmptyChatState: React.FC<EmptyChatStateProps> = ({
  onNewChat,
  onNewGroup
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 text-center">
      <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 flex items-center justify-center mb-4">
        <MessageCircle className="h-10 w-10 text-blue-600" />
      </div>
      
      <h2 className="text-xl font-semibold mb-2">Your messages</h2>
      <p className="text-gray-600 mb-6 max-w-md">
        Send private messages, create group chats, or discuss documents with colleagues and customers.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-32 p-4 hover:bg-blue-50 hover:border-blue-200 transition-colors"
          onClick={onNewChat}
          data-chat-type="direct"
        >
          <MessageSquare className="h-8 w-8 mb-2 text-blue-600" />
          <span className="font-medium">New message</span>
          <span className="text-xs text-gray-500 mt-1">Chat directly with a user</span>
        </Button>
        
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-32 p-4 hover:bg-purple-50 hover:border-purple-200 transition-colors"
          onClick={onNewGroup}
          data-chat-type="group"
        >
          <Users className="h-8 w-8 mb-2 text-purple-600" />
          <span className="font-medium">Create group</span>
          <span className="text-xs text-gray-500 mt-1">Start a conversation with multiple users</span>
        </Button>
        
        <Button
          variant="outline"
          className="flex flex-col items-center justify-center h-32 p-4 hover:bg-amber-50 hover:border-amber-200 transition-colors"
          onClick={onNewChat}
          data-chat-type="document"
        >
          <FileText className="h-8 w-8 mb-2 text-amber-600" />
          <span className="font-medium">Document chat</span>
          <span className="text-xs text-gray-500 mt-1">Discuss details about a document</span>
        </Button>
      </div>
    </div>
  );
};

export default EmptyChatState;
