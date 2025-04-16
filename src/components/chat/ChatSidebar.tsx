import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Star, 
  StarOff, 
  MessageCircle, 
  Users, 
  FileText, 
  Bell,
  Check,
  Flag,
  Filter,
  User,
  SlidersHorizontal,
  X,
  AlertTriangle,
  Pin
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ChatThread } from '@/models/Chat';
import { format, isToday, isYesterday, isThisWeek } from 'date-fns';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface ChatSidebarProps {
  threads: ChatThread[];
  activeThreadId: string | null;
  onSelectThread: (threadId: string) => void;
  onNewChat: () => void;
  onNewGroup: () => void;
  onToggleFavorite: (threadId: string) => void;
  onMarkAsRead: (threadId: string) => void;
  onMarkAsUnread: (threadId: string) => void;
  onMarkAsUrgent: (threadId: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  threads,
  activeThreadId,
  onSelectThread,
  onNewChat,
  onNewGroup,
  onToggleFavorite,
  onMarkAsRead,
  onMarkAsUnread,
  onMarkAsUrgent
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string[]>([]);
  
  const applyFilters = (thread: ChatThread) => {
    if (searchTerm) {
      const threadName = thread.name || thread.participants[0]?.name || '';
      const participantNames = thread.participants.map(p => p.name).join(' ');
      const documentName = thread.documentContext?.documentName || '';
      
      const searchLower = searchTerm.toLowerCase();
      if (!threadName.toLowerCase().includes(searchLower) && 
          !participantNames.toLowerCase().includes(searchLower) &&
          !documentName.toLowerCase().includes(searchLower)) {
        return false;
      }
    }
    
    if (filterStatus.length > 0) {
      if (filterStatus.includes('unread') && thread.unreadCount === 0) {
        return false;
      }
      if (filterStatus.includes('urgent') && !thread.isUrgent) {
        return false;
      }
      if (filterStatus.includes('disputes') && !thread.isDispute) {
        return false;
      }
      if (filterStatus.includes('favorites') && !thread.isFavorite) {
        return false;
      }
    }
    
    if (filterType.length > 0) {
      if (filterType.includes('direct') && thread.type !== 'direct') {
        return false;
      }
      if (filterType.includes('group') && thread.type !== 'group') {
        return false;
      }
      if (filterType.includes('document') && thread.type !== 'document') {
        return false;
      }
    }
    
    return true;
  };
  
  const filteredThreads = threads.filter(applyFilters);
  
  const groupedThreads = filteredThreads.reduce((groups, thread) => {
    const date = new Date(thread.updatedAt);
    let group = 'Older';
    
    if (isToday(date)) {
      group = 'Today';
    } else if (isYesterday(date)) {
      group = 'Yesterday';
    } else if (isThisWeek(date)) {
      group = 'This Week';
    }
    
    if (!groups[group]) {
      groups[group] = [];
    }
    
    groups[group].push(thread);
    return groups;
  }, {} as Record<string, ChatThread[]>);
  
  Object.keys(groupedThreads).forEach(group => {
    groupedThreads[group].sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  });
  
  const groupOrder = ['Today', 'Yesterday', 'This Week', 'Older'];
  const sortedGroups = groupOrder.filter(group => groupedThreads[group]?.length > 0);
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return format(date, 'HH:mm');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else if (isThisWeek(date)) {
      return format(date, 'EEE');
    } else {
      return format(date, 'dd/MM/yyyy');
    }
  };
  
  const getThreadName = (thread: ChatThread) => {
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
  
  const getThreadIcon = (thread: ChatThread) => {
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
        <MessageCircle className="h-5 w-5" />
      </div>
    );
  };
  
  const handleClearFilters = () => {
    setFilterStatus([]);
    setFilterType([]);
    setSearchTerm('');
  };
  
  const hasActiveFilters = filterStatus.length > 0 || filterType.length > 0 || searchTerm.length > 0;
  
  return (
    <div className="w-80 flex flex-col h-full border-r border-gray-200 bg-white">
      <div className="p-3 flex flex-col space-y-3">
        <div className="flex items-center gap-2">
          <Button
            onClick={onNewChat}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search conversations..."
            className="pl-9 pr-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 text-gray-400 hover:text-gray-500"
              onClick={() => setSearchTerm('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <ToggleGroup 
              type="multiple" 
              value={filterStatus}
              onValueChange={setFilterStatus}
              className="justify-start"
            >
              <ToggleGroupItem value="unread" size="sm" className="h-8 px-2 text-xs gap-1">
                <Bell className="h-3.5 w-3.5" />
                <span>Unread</span>
              </ToggleGroupItem>
              
              <ToggleGroupItem value="urgent" size="sm" className="h-8 px-2 text-xs gap-1">
                <Flag className="h-3.5 w-3.5" />
                <span>Urgent</span>
              </ToggleGroupItem>
              
              <ToggleGroupItem value="disputes" size="sm" className="h-8 px-2 text-xs gap-1">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Disputes</span>
              </ToggleGroupItem>
              
              <ToggleGroupItem value="favorites" size="sm" className="h-8 px-2 text-xs gap-1">
                <Star className="h-3.5 w-3.5" />
                <span>Favorites</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 px-1.5"
              onClick={handleClearFilters}
            >
              <X className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">Clear</span>
            </Button>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            <ToggleGroup 
              type="multiple" 
              value={filterType}
              onValueChange={setFilterType}
              className="justify-start"
            >
              <ToggleGroupItem value="direct" size="sm" className="h-8 px-2 text-xs gap-1">
                <User className="h-3.5 w-3.5" />
                <span>Direct</span>
              </ToggleGroupItem>
              
              <ToggleGroupItem value="group" size="sm" className="h-8 px-2 text-xs gap-1">
                <Users className="h-3.5 w-3.5" />
                <span>Groups</span>
              </ToggleGroupItem>
              
              <ToggleGroupItem value="document" size="sm" className="h-8 px-2 text-xs gap-1">
                <FileText className="h-3.5 w-3.5" />
                <span>Documents</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        {sortedGroups.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <MessageCircle className="h-12 w-12 text-gray-300 mx-auto mb-2" />
            <p>No conversations found</p>
            <p className="text-sm mt-1">Try different search terms or filters</p>
          </div>
        ) : (
          sortedGroups.map(group => (
            <div key={group} className="mb-3">
              <div className="px-3 py-1 sticky top-0 bg-gray-50 border-y border-gray-200 flex justify-between items-center">
                <h3 className="text-xs font-medium text-gray-500">{group}</h3>
                <p className="text-xs text-gray-400">{groupedThreads[group].length} chats</p>
              </div>
              
              <div className="space-y-1 p-2">
                {groupedThreads[group].map(thread => (
                  <div
                    key={thread.id}
                    className={cn(
                      "p-2 rounded-md cursor-pointer flex items-start transition-colors relative",
                      activeThreadId === thread.id 
                        ? "bg-blue-50 hover:bg-blue-100" 
                        : "hover:bg-gray-50"
                    )}
                    onClick={() => onSelectThread(thread.id)}
                  >
                    {getThreadIcon(thread)}
                    
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className={cn(
                          "font-medium text-sm truncate",
                          thread.unreadCount ? "text-gray-900" : "text-gray-700"
                        )}>
                          {getThreadName(thread)}
                        </h4>
                        <div className="flex items-center">
                          {thread.isPinned && (
                            <Pin className="h-3 w-3 text-gray-500 mr-1" />
                          )}
                          <span className="text-xs text-gray-500">
                            {formatTime(thread.updatedAt)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <p className={cn(
                          "text-xs truncate max-w-[160px]",
                          thread.unreadCount ? "text-gray-800" : "text-gray-500"
                        )}>
                          {thread.lastMessage?.content || "No messages yet"}
                        </p>
                        
                        <div className="flex items-center gap-1">
                          {thread.isFavorite && (
                            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                          )}
                          
                          {thread.isUrgent && (
                            <Flag className="h-3 w-3 text-red-500" />
                          )}
                          
                          {thread.isDispute && (
                            <AlertTriangle className="h-3 w-3 text-orange-500" />
                          )}
                          
                          {thread.unreadCount > 0 && (
                            <Badge className="h-4 min-w-4 text-[10px] bg-blue-500">
                              {thread.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className={cn(
                        "absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1 bg-white shadow-sm rounded-md border opacity-0 transition-opacity",
                        activeThreadId === thread.id ? "opacity-100" : "group-hover:opacity-100"
                      )}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleFavorite(thread.id);
                          }}
                        >
                          {thread.isFavorite ? (
                            <StarOff className="h-3.5 w-3.5 text-amber-500" />
                          ) : (
                            <Star className="h-3.5 w-3.5 text-gray-500" />
                          )}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation();
                            thread.unreadCount ? onMarkAsRead(thread.id) : onMarkAsUnread(thread.id);
                          }}
                        >
                          {thread.unreadCount ? (
                            <Check className="h-3.5 w-3.5 text-gray-500" />
                          ) : (
                            <Bell className="h-3.5 w-3.5 text-gray-500" />
                          )}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation();
                            onMarkAsUrgent(thread.id);
                          }}
                        >
                          <Flag className={cn(
                            "h-3.5 w-3.5",
                            thread.isUrgent ? "text-red-500" : "text-gray-500"
                          )} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
