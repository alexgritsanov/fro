
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  FileText, 
  MoreVertical, 
  Star, 
  StarOff, 
  Info, 
  Phone, 
  Video,
  Flag,
  Check,
  Bell,
  Pin,
  Archive,
  Edit,
  Trash,
  User,
  Folder,
  AlertTriangle
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { ChatThread } from '@/models/Chat';
import { format } from 'date-fns';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ChatThreadHeaderProps {
  thread: ChatThread;
  onViewInfo: () => void;
  onCall?: () => void;
  onVideoCall?: () => void;
  onToggleFavorite: () => void;
  onMarkAsRead: () => void;
  onMarkAsUnread: () => void;
  onMarkAsUrgent: () => void;
  onToggleCustomerPanel: () => void;
  onTogglePin: () => void;
  onSetCategory: (category: string) => void;
  onRename: () => void;
  onDelete: () => void;
  onArchive: () => void;
  hasCustomerContext?: boolean;
}

const ChatThreadHeader: React.FC<ChatThreadHeaderProps> = ({
  thread,
  onViewInfo,
  onCall,
  onVideoCall,
  onToggleFavorite,
  onMarkAsRead,
  onMarkAsUnread,
  onMarkAsUrgent,
  onToggleCustomerPanel,
  onTogglePin,
  onSetCategory,
  onRename,
  onDelete,
  onArchive,
  hasCustomerContext = false
}) => {
  const getThreadName = () => {
    if (thread.name) {
      return thread.name;
    }
    
    if (thread.type === 'direct') {
      return thread.participants[0]?.name || 'Unknown';
    }
    
    if (thread.type === 'document' && thread.documentContext) {
      return thread.documentContext.documentName;
    }
    
    return `Chat (${thread.participants.length} participants)`;
  };
  
  const getThreadStatusIndicator = () => {
    const statuses = [];
    
    if (thread.isFavorite) {
      statuses.push(
        <Tooltip key="favorite">
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
              <span className="text-xs text-amber-600">Favorite</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Marked as favorite</TooltipContent>
        </Tooltip>
      );
    }
    
    if (thread.isUrgent) {
      statuses.push(
        <Tooltip key="urgent">
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1">
              <Flag className="h-3.5 w-3.5 text-red-500" />
              <span className="text-xs text-red-600">Urgent</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Marked as urgent</TooltipContent>
        </Tooltip>
      );
    }
    
    if (thread.isPinned) {
      statuses.push(
        <Tooltip key="pinned">
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1">
              <Pin className="h-3.5 w-3.5 text-blue-500" />
              <span className="text-xs text-blue-600">Pinned</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Pinned conversation</TooltipContent>
        </Tooltip>
      );
    }
    
    if (thread.isDispute) {
      statuses.push(
        <Tooltip key="dispute">
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5 text-orange-500" />
              <span className="text-xs text-orange-600">Dispute</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>Active dispute</TooltipContent>
        </Tooltip>
      );
    }
    
    if (thread.category) {
      statuses.push(
        <Badge key="category" variant="outline" className="text-xs">
          {thread.category}
        </Badge>
      );
    }
    
    return statuses.length > 0 ? (
      <div className="flex items-center gap-2 ml-2">
        {statuses}
      </div>
    ) : null;
  };
  
  const getThreadStatus = () => {
    if (thread.type === 'direct') {
      const participant = thread.participants[0];
      return participant?.status ? (
        <div className="flex items-center">
          <span className={`h-2 w-2 rounded-full mr-1 ${
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
      ) : null;
    }
    
    if (thread.type === 'group') {
      const onlineCount = thread.participants.filter(p => p.status === 'online').length;
      return onlineCount > 0 ? (
        <span className="text-xs text-gray-500">{onlineCount} online</span>
      ) : null;
    }
    
    if (thread.type === 'document' && thread.documentContext) {
      return (
        <span className="text-xs text-gray-500">
          {thread.documentContext.documentType.replace('-', ' ')}
        </span>
      );
    }
    
    return null;
  };
  
  const getThreadIcon = () => {
    if (thread.type === 'direct') {
      return (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white font-semibold">
          {thread.participants[0]?.name.charAt(0) || 'U'}
        </div>
      );
    }
    
    if (thread.type === 'group') {
      return (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white">
          <Users className="h-5 w-5" />
        </div>
      );
    }
    
    if (thread.type === 'document') {
      return (
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white">
          <FileText className="h-5 w-5" />
        </div>
      );
    }
    
    return (
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
        <Users className="h-5 w-5" />
      </div>
    );
  };
  
  return (
    <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
      <div className="flex items-center">
        {getThreadIcon()}
        
        <div className="ml-3">
          <div className="flex items-center">
            <h2 className="font-medium text-gray-800">{getThreadName()}</h2>
            {getThreadStatusIndicator()}
          </div>
          <div className="flex items-center mt-0.5">
            {getThreadStatus()}
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        {hasCustomerContext && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleCustomerPanel}
                className="text-gray-500 hover:text-gray-700"
              >
                <Folder className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>View Customer Profile</TooltipContent>
          </Tooltip>
        )}
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCall}
              className="text-gray-500 hover:text-gray-700"
            >
              <Phone className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Call</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onVideoCall}
              className="text-gray-500 hover:text-gray-700"
            >
              <Video className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Video Call</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onViewInfo}
              className="text-gray-500 hover:text-gray-700"
            >
              <Info className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Info</TooltipContent>
        </Tooltip>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Conversation Options</DropdownMenuLabel>
            
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={onToggleFavorite}>
                {thread.isFavorite ? (
                  <>
                    <StarOff className="h-4 w-4 mr-2" />
                    <span>Remove from Favorites</span>
                  </>
                ) : (
                  <>
                    <Star className="h-4 w-4 mr-2" />
                    <span>Add to Favorites</span>
                  </>
                )}
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={onTogglePin}>
                <Pin className="h-4 w-4 mr-2" />
                <span>{thread.isPinned ? 'Unpin Conversation' : 'Pin Conversation'}</span>
              </DropdownMenuItem>
              
              <DropdownMenuItem onClick={onMarkAsUrgent}>
                <Flag className="h-4 w-4 mr-2" />
                <span>{thread.isUrgent ? 'Remove Urgent Flag' : 'Mark as Urgent'}</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={thread.unreadCount ? onMarkAsRead : onMarkAsUnread}>
                {thread.unreadCount ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    <span>Mark as Read</span>
                  </>
                ) : (
                  <>
                    <Bell className="h-4 w-4 mr-2" />
                    <span>Mark as Unread</span>
                  </>
                )}
              </DropdownMenuItem>
              
              {(thread.type === 'group' || thread.type === 'document') && (
                <DropdownMenuItem onClick={onRename}>
                  <Edit className="h-4 w-4 mr-2" />
                  <span>Rename</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={onArchive}>
              <Archive className="h-4 w-4 mr-2" />
              <span>Archive</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={onDelete} className="text-red-600 hover:text-red-700 hover:bg-red-50">
              <Trash className="h-4 w-4 mr-2" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChatThreadHeader;
