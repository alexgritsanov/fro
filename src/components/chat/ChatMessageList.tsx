
import React, { useEffect, useRef, useState } from 'react';
import { ChatMessage, ChatThread, MessageReaction } from '@/models/Chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { FileText, X, ChevronDown, CheckCheck, Check, Clock, Smile, ThumbsUp, Heart, Frown, Laugh } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ChatMessageListProps {
  messages: ChatMessage[];
  currentUser: {
    id: string;
    name: string;
    avatar?: string;
  };
  thread: ChatThread;
  showExpandedDocument?: boolean;
  onCloseExpandedDocument?: () => void;
  onAddReaction?: (messageId: string, emoji: string) => void;
  typingUsers?: string[];
}

const ChatMessageList = ({ 
  messages, 
  currentUser, 
  thread, 
  showExpandedDocument, 
  onCloseExpandedDocument,
  onAddReaction,
  typingUsers = []
}: ChatMessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hoveredMessageId, setHoveredMessageId] = useState<string | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatMessageTime = (timestamp: string) => {
    return format(new Date(timestamp), 'HH:mm');
  };

  const formatMessageDate = (timestamp: string) => {
    const today = new Date();
    const messageDate = new Date(timestamp);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Today';
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    
    return format(messageDate, 'EEEE, MMMM d, yyyy');
  };

  // Group messages by date
  const groupedMessages: { [key: string]: ChatMessage[] } = {};
  messages.forEach(message => {
    const date = new Date(message.timestamp).toDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  // Get unique dates and sort them
  const dates = Object.keys(groupedMessages).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  );

  // Render message status icon
  const renderMessageStatus = (message: ChatMessage) => {
    if (message.sender.id === currentUser.id) {
      if (message.isRead) {
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      } else if (message.isDelivered) {
        return <Check className="h-3 w-3 text-gray-500" />;
      } else {
        return <Clock className="h-3 w-3 text-gray-400" />;
      }
    }
    return null;
  };

  // Render message reactions
  const renderReactions = (message: ChatMessage) => {
    if (!message.reactions || message.reactions.length === 0) return null;
    
    // Group reactions by emoji
    const groupedReactions: Record<string, MessageReaction[]> = {};
    message.reactions.forEach(reaction => {
      if (!groupedReactions[reaction.emoji]) {
        groupedReactions[reaction.emoji] = [];
      }
      groupedReactions[reaction.emoji].push(reaction);
    });
    
    return (
      <div className="flex mt-1 flex-wrap gap-1">
        {Object.entries(groupedReactions).map(([emoji, reactions]) => (
          <TooltipProvider key={emoji}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center bg-gray-100 rounded-full px-2 py-0.5 text-xs cursor-pointer">
                  <span className="mr-1">{emoji}</span>
                  <span className="text-gray-600">{reactions.length}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                {reactions.map(r => r.userName).join(', ')}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    );
  };

  return (
    <div className={cn(
      "flex-1 p-4 overflow-y-auto bg-gray-50",
      showExpandedDocument && "flex"
    )}>
      {showExpandedDocument && thread.documentContext && (
        <div className="w-1/2 border-r border-gray-200 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-blue-800">
              {thread.documentContext.documentName}
            </h3>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8" 
              onClick={onCloseExpandedDocument}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 bg-white rounded-lg border border-gray-200 overflow-auto p-4 flex flex-col items-center justify-center">
            <FileText className="h-24 w-24 text-blue-200 mb-4" />
            <p className="text-gray-500 mb-6">Document preview</p>
            <Button variant="outline" className="gap-2">
              <ChevronDown className="h-4 w-4" />
              Download document
            </Button>
          </div>
        </div>
      )}
      
      <div className={cn(
        "flex flex-col space-y-4",
        showExpandedDocument ? "w-1/2 pl-4" : "w-full"
      )}>
        {dates.map(date => (
          <div key={date} className="space-y-4">
            <div className="flex justify-center">
              <div className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">
                {formatMessageDate(date)}
              </div>
            </div>
            
            {groupedMessages[date].map((message) => {
              const isCurrentUser = message.sender.id === currentUser.id;
              
              return (
                <div 
                  key={message.id} 
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                  onMouseEnter={() => setHoveredMessageId(message.id)}
                  onMouseLeave={() => setHoveredMessageId(null)}
                >
                  <div className={`flex ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'} items-start gap-2 max-w-[75%] group`}>
                    {!isCurrentUser && (
                      <Avatar className="h-8 w-8 mt-0.5">
                        <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                        <AvatarFallback className="bg-blue-500 text-white">
                          {message.sender.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className="relative">
                      <div className={cn(
                        "rounded-xl px-4 py-2",
                        isCurrentUser 
                          ? "bg-blue-500 text-white rounded-tr-none" 
                          : "bg-white border border-gray-200 rounded-tl-none"
                      )}>
                        {!isCurrentUser && (
                          <p className="text-xs font-medium mb-1 text-gray-600">
                            {message.sender.name}
                          </p>
                        )}
                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                        
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {message.attachments.map(attachment => (
                              <div 
                                key={attachment.id} 
                                className={cn(
                                  "p-2 rounded flex items-center gap-2",
                                  isCurrentUser ? "bg-blue-600" : "bg-gray-100"
                                )}
                              >
                                <FileText className={cn(
                                  "h-4 w-4",
                                  isCurrentUser ? "text-blue-200" : "text-blue-500"
                                )} />
                                <span className="text-sm">{attachment.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      {/* Message reactions */}
                      {renderReactions(message)}
                      
                      {/* Reaction menu - show on hover */}
                      {hoveredMessageId === message.id && onAddReaction && (
                        <div className={cn(
                          "absolute bottom-0 bg-white border border-gray-200 rounded-full py-1 px-2 shadow-md flex items-center space-x-1",
                          isCurrentUser ? "right-full mr-2" : "left-full ml-2"
                        )}>
                          <button 
                            className="hover:bg-gray-100 p-1 rounded-full" 
                            onClick={() => onAddReaction(message.id, '👍')}
                          >
                            <span className="text-lg">👍</span>
                          </button>
                          <button 
                            className="hover:bg-gray-100 p-1 rounded-full"
                            onClick={() => onAddReaction(message.id, '❤️')}
                          >
                            <span className="text-lg">❤️</span>
                          </button>
                          <button 
                            className="hover:bg-gray-100 p-1 rounded-full"
                            onClick={() => onAddReaction(message.id, '😂')}
                          >
                            <span className="text-lg">😂</span>
                          </button>
                          <button 
                            className="hover:bg-gray-100 p-1 rounded-full"
                            onClick={() => onAddReaction(message.id, '😮')}
                          >
                            <span className="text-lg">😮</span>
                          </button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className="hover:bg-gray-100 p-1 rounded-full">
                                <Smile className="h-5 w-5 text-gray-500" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="p-2 grid grid-cols-6 gap-1">
                              {['😀', '😊', '🎉', '👏', '🙏', '👌', '🔥', '✅', '❌', '⭐', '🎂', '🚀'].map(emoji => (
                                <DropdownMenuItem key={emoji} className="p-1 flex justify-center" onClick={() => onAddReaction?.(message.id, emoji)}>
                                  <span className="text-lg">{emoji}</span>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )}
                      
                      <p className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? 'text-right' : 'text-left'} flex items-center`}>
                        <span>{formatMessageTime(message.timestamp)}</span>
                        <span className="ml-1">{renderMessageStatus(message)}</span>
                      </p>
                    </div>
                    
                    {isCurrentUser && (
                      <Avatar className="h-8 w-8 mt-0.5">
                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                        <AvatarFallback className="bg-green-500 text-white">
                          {currentUser.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        
        {/* Typing indicator */}
        {typingUsers.length > 0 && (
          <div className="flex items-center text-gray-500 text-sm mt-2">
            <div className="flex space-x-1 mr-2">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <span>
              {typingUsers.length === 1 
                ? `${typingUsers[0]} is typing...` 
                : `${typingUsers.slice(0, -1).join(', ')} and ${typingUsers[typingUsers.length - 1]} are typing...`}
            </span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatMessageList;
