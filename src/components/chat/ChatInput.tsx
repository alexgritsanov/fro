
import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Send, 
  Paperclip, 
  Smile, 
  Image as ImageIcon, 
  FileText, 
  Link, 
  Plus,
  X,
  Mic,
  Camera,
  Calendar,
  Award,
  AtSign,
  Hash,
  Sparkles,
  Clock,
  User,
  Coffee,
  Activity,
  MapPin,
  Briefcase,
  Flag,
  Search
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { MessageAttachment } from '@/models/Chat';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DocumentContext } from '@/models/Chat';
import { EmojiPicker } from '@/components/ui/emoji-picker';

// Define QuickReply interface
interface QuickReply {
  id: string;
  text: string;
  category: string;
}

// AI-powered suggestions
interface AISuggestion {
  id: string;
  text: string;
  context: string;
}

interface ChatInputProps {
  onSendMessage: (message: string, attachments?: MessageAttachment[]) => void;
  isLoading?: boolean;
  threadType?: 'direct' | 'group' | 'document' | 'dispute';
  documentContext?: DocumentContext;
  onTypingStart?: () => void;
  onTypingEnd?: () => void;
  quickReplies?: QuickReply[];
}

// Mock AI suggestions based on conversation context
const mockAISuggestions: AISuggestion[] = [
  {
    id: 'ai-1',
    text: "I'll check the delivery status and get back to you shortly.",
    context: "delivery status"
  },
  {
    id: 'ai-2',
    text: "I'll need to review the service call details before I can proceed.",
    context: "service call"
  },
  {
    id: 'ai-3',
    text: "Your delivery is scheduled for tomorrow between 9am and 12pm.",
    context: "delivery schedule"
  },
  {
    id: 'ai-4',
    text: "Thank you for your patience. I'll escalate this to our technical team.",
    context: "technical issue"
  },
  {
    id: 'ai-5',
    text: "I've reviewed the document and everything looks correct.",
    context: "document review"
  }
];

const AISuggestionsPopover: React.FC<{ onSelect: (text: string) => void, documentContext?: DocumentContext }> = ({ 
  onSelect,
  documentContext
}) => {
  // In a real implementation, this would use the document context and chat history
  // to generate relevant suggestions
  
  const contextualSuggestions = documentContext
    ? mockAISuggestions.filter(suggestion => 
        suggestion.context.includes(documentContext.documentType) || 
        suggestion.text.toLowerCase().includes(documentContext.documentName.toLowerCase())
      )
    : mockAISuggestions;
  
  return (
    <div className="w-80 p-2">
      <div className="flex items-center mb-3">
        <Sparkles className="h-4 w-4 text-blue-500 mr-2" />
        <h3 className="text-sm font-medium">AI-Powered Reply Suggestions</h3>
      </div>
      
      {contextualSuggestions.length === 0 ? (
        <p className="text-center py-4 text-gray-500 text-sm">No suggestions available</p>
      ) : (
        <div className="space-y-2">
          {contextualSuggestions.map(suggestion => (
            <div 
              key={suggestion.id}
              className="p-2 border rounded-md hover:bg-blue-50 hover:border-blue-200 cursor-pointer transition-colors"
              onClick={() => onSelect(suggestion.text)}
            >
              <p className="text-sm">{suggestion.text}</p>
              <p className="text-xs text-gray-500 mt-1">Context: {suggestion.context}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading = false,
  threadType = 'direct',
  documentContext,
  onTypingStart,
  onTypingEnd,
  quickReplies = []
}) => {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<MessageAttachment[]>([]);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [showQuickReplyPreview, setShowQuickReplyPreview] = useState(false);
  const [selectedQuickReply, setSelectedQuickReply] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isAISuggestionsOpen, setIsAISuggestionsOpen] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
    
    // Trigger typing indicators
    if (value && onTypingStart) {
      onTypingStart();
    } else if (!value && onTypingEnd) {
      onTypingEnd();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSendMessage = () => {
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message, attachments);
      setMessage('');
      setAttachments([]);
      
      if (onTypingEnd) {
        onTypingEnd();
      }
    }
  };
  
  const handleAddEmoji = (emoji: string) => {
    setMessage(prev => prev + emoji);
    setIsEmojiPickerOpen(false);
    
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };
  
  const handleSelectQuickReply = (text: string) => {
    setSelectedQuickReply(text);
    setShowQuickReplyPreview(true);
  };
  
  const handleAddAttachment = (type: 'image' | 'document' | 'link') => {
    // Mock implementation - in a real app, this would open a file picker or link dialog
    const mockAttachments: Record<string, MessageAttachment> = {
      image: {
        id: `attachment-${Date.now()}`,
        type: 'image',
        url: '#',
        name: 'image.jpg',
        size: 1200000,
        previewUrl: '#'
      },
      document: {
        id: `attachment-${Date.now()}`,
        type: 'document',
        url: '#',
        name: 'document.pdf',
        size: 2500000
      },
      link: {
        id: `attachment-${Date.now()}`,
        type: 'link',
        url: 'https://example.com',
        name: 'Example Website'
      }
    };
    
    setAttachments(prev => [...prev, mockAttachments[type]]);
    
    toast({
      title: "Attachment Added",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} has been attached to your message.`
    });
  };
  
  const handleRemoveAttachment = (id: string) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
  };
  
  const handleSelectAISuggestion = (text: string) => {
    setSelectedQuickReply(text);
    setShowQuickReplyPreview(true);
    setIsAISuggestionsOpen(false);
  };
  
  const handleConfirmQuickReply = () => {
    if (selectedQuickReply) {
      onSendMessage(selectedQuickReply);
      setSelectedQuickReply(null);
      setShowQuickReplyPreview(false);
    }
  };
  
  const handleCancelQuickReply = () => {
    setSelectedQuickReply(null);
    setShowQuickReplyPreview(false);
  };
  
  // Group quick replies by category
  const groupedQuickReplies = quickReplies.reduce((acc, reply) => {
    if (!acc[reply.category]) {
      acc[reply.category] = [];
    }
    acc[reply.category].push(reply);
    return acc;
  }, {} as Record<string, QuickReply[]>);
  
  return (
    <div className="border-t border-gray-200 bg-white p-3 space-y-2">
      {/* Quick Reply Preview */}
      {showQuickReplyPreview && selectedQuickReply && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-start">
            <Sparkles className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-blue-700 mb-1">AI Suggested Response</h4>
              <p className="text-sm text-gray-700">{selectedQuickReply}</p>
              
              <div className="flex justify-end gap-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8"
                  onClick={handleCancelQuickReply}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="h-8 bg-blue-600 hover:bg-blue-700"
                  onClick={handleConfirmQuickReply}
                >
                  <Send className="h-4 w-4 mr-1" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attachments.map(attachment => (
            <div 
              key={attachment.id} 
              className="flex items-center p-1.5 bg-gray-100 rounded-md border border-gray-200"
            >
              {attachment.type === 'image' ? (
                <ImageIcon className="h-4 w-4 text-blue-500 mr-1.5" />
              ) : attachment.type === 'document' ? (
                <FileText className="h-4 w-4 text-orange-500 mr-1.5" />
              ) : (
                <Link className="h-4 w-4 text-green-500 mr-1.5" />
              )}
              
              <span className="text-sm truncate max-w-[150px]">{attachment.name}</span>
              
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 ml-1 text-gray-500 hover:text-red-500"
                onClick={() => handleRemoveAttachment(attachment.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      {/* Document Context Banner */}
      {threadType === 'document' && documentContext && (
        <div className="flex items-center p-2 bg-amber-50 rounded-md border border-amber-200 text-amber-800 text-sm">
          <FileText className="h-4 w-4 mr-2 text-amber-600" />
          <span>Discussing: {documentContext.documentName}</span>
          <Badge variant="outline" className="ml-2 text-xs border-amber-300">
            {documentContext.documentType.replace('-', ' ')}
          </Badge>
        </div>
      )}
      
      {/* Input Area */}
      <div className="flex items-end gap-2">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            placeholder="Type your message..."
            className="pr-10 min-h-[80px] resize-none"
            value={message}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          
          <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 bottom-2 h-8 w-8 text-gray-500 hover:text-gray-700"
              >
                <Smile className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" align="end" className="w-auto p-0">
              <EmojiPicker onEmojiSelect={handleAddEmoji} />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full"
              >
                <Plus className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleAddAttachment('image')}>
                <ImageIcon className="h-4 w-4 mr-2 text-blue-500" />
                <span>Image</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAddAttachment('document')}>
                <FileText className="h-4 w-4 mr-2 text-orange-500" />
                <span>Document</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAddAttachment('link')}>
                <Link className="h-4 w-4 mr-2 text-green-500" />
                <span>Link</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                <span>Schedule</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mic className="h-4 w-4 mr-2 text-red-500" />
                <span>Voice Message</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Camera className="h-4 w-4 mr-2 text-cyan-500" />
                <span>Camera</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Popover open={isAISuggestionsOpen} onOpenChange={setIsAISuggestionsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full"
              >
                <Sparkles className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="top" align="end" className="w-auto p-0">
              <AISuggestionsPopover 
                onSelect={handleSelectAISuggestion} 
                documentContext={documentContext}
              />
            </PopoverContent>
          </Popover>
          
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            size="icon"
            disabled={isLoading || (!message.trim() && attachments.length === 0)}
            onClick={handleSendMessage}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
