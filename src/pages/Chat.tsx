import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';
import { ChatThread, ChatMessage, MessageAttachment, TypingIndicator } from '@/models/Chat';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatMessageList from '@/components/chat/ChatMessageList';
import ChatInput from '@/components/chat/ChatInput';
import ChatThreadHeader from '@/components/chat/ChatThreadHeader';
import ChatInfoPanel from '@/components/chat/ChatInfoPanel';
import CustomerProfilePanel from '@/components/chat/CustomerProfilePanel';
import DocumentPreviewInChat from '@/components/chat/DocumentPreviewInChat';
import EmptyChatState from '@/components/chat/EmptyChatState';
import CreateChatModal from '@/components/chat/CreateChatModal';
import PageHeader from '@/components/PageHeader';
import { 
  Bell, MessageSquare, Users, Flag, 
  ChevronLeft, ChevronRight, Plus, User, File
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useChat } from '@/hooks/useChat';

const Chat = () => {
  const [searchParams] = useSearchParams();
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [showCustomerPanel, setShowCustomerPanel] = useState(false);
  const [showExpandedDocument, setShowExpandedDocument] = useState(false);
  const [isCreateChatModalOpen, setIsCreateChatModalOpen] = useState(false);
  
  const {
    threads,
    setThreads,
    messages,
    setMessages,
    activeThreadId,
    setActiveThreadId,
    activeThread,
    activeMessages,
    activeTypingUsers,
    isLoading,
    markThreadAsRead,
    markThreadAsUnread,
    toggleFavorite,
    toggleUrgent,
    togglePin,
    setThreadCategory,
    sendMessage,
    addReaction,
    createThread,
    deleteThread,
    renameThread,
    updateTypingStatus
  } = useChat({
    initialThreads: [
      {
        id: '1',
        type: 'direct',
        participants: [
          { 
            id: 'user-1',
            name: 'Alice Smith',
            avatar: '',
            status: 'online',
            role: 'Customer'
          }
        ],
        lastMessage: {
          id: 'msg-1',
          content: 'When will the delivery arrive?',
          sender: {
            id: 'user-1',
            name: 'Alice Smith'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
          isRead: true,
          isDelivered: true
        },
        unreadCount: 0,
        isFavorite: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 5).toISOString()
      },
      {
        id: '2',
        type: 'group',
        name: 'Project Alpha Team',
        participants: [
          { 
            id: 'user-1',
            name: 'Alice Smith',
            avatar: '',
            status: 'online',
            role: 'Customer'
          },
          { 
            id: 'user-2',
            name: 'Bob Johnson',
            avatar: '',
            status: 'away',
            role: 'Employee'
          },
          { 
            id: 'user-3',
            name: 'Charlie Brown',
            avatar: '',
            status: 'offline',
            role: 'Foreman'
          }
        ],
        lastMessage: {
          id: 'msg-2',
          content: 'I updated the project schedule',
          sender: {
            id: 'user-2',
            name: 'Bob Johnson'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          isRead: false,
          isDelivered: true
        },
        unreadCount: 2,
        isFavorite: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString()
      },
      {
        id: '3',
        type: 'document',
        participants: [
          { 
            id: 'user-1',
            name: 'Alice Smith',
            avatar: '',
            status: 'online',
            role: 'Customer'
          },
          { 
            id: 'user-3',
            name: 'Charlie Brown',
            avatar: '',
            status: 'offline',
            role: 'Foreman'
          }
        ],
        documentContext: {
          documentId: 'doc-1',
          documentType: 'service-call',
          documentName: 'Service Call #SC-1234'
        },
        lastMessage: {
          id: 'msg-3',
          content: 'Please review the service details',
          sender: {
            id: 'user-3',
            name: 'Charlie Brown'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          isRead: true,
          isDelivered: true
        },
        unreadCount: 0,
        isFavorite: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
      },
      {
        id: '4',
        type: 'direct',
        participants: [
          { 
            id: 'user-4',
            name: 'David Miller',
            avatar: '',
            status: 'online',
            role: 'Subcontractor'
          }
        ],
        lastMessage: {
          id: 'msg-4',
          content: 'I need to discuss the contract terms',
          sender: {
            id: 'user-4',
            name: 'David Miller'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          isRead: false,
          isDelivered: true
        },
        unreadCount: 1,
        isFavorite: false,
        isDispute: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        updatedAt: new Date(Date.now() - 1000 * 60 * 120).toISOString()
      }
    ],
    initialMessages: {
      '1': [
        {
          id: 'msg-1-1',
          content: 'Hello, I wanted to check on my delivery status',
          sender: {
            id: 'user-1',
            name: 'Alice Smith'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
          isRead: true,
          isDelivered: true
        },
        {
          id: 'msg-1-2',
          content: 'We have scheduled your delivery for tomorrow between 9AM and 12PM',
          sender: {
            id: 'current-user',
            name: 'Current User'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
          isRead: true,
          isDelivered: true
        },
        {
          id: 'msg-1-3',
          content: 'Great, thank you! Will I receive a notification before delivery?',
          sender: {
            id: 'user-1',
            name: 'Alice Smith'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
          isRead: true,
          isDelivered: true
        },
        {
          id: 'msg-1-4',
          content: 'Yes, the driver will call you 30 minutes before arriving',
          sender: {
            id: 'current-user',
            name: 'Current User'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
          isRead: true,
          isDelivered: true
        },
        {
          id: 'msg-1-5',
          content: 'Perfect! Looking forward to it',
          sender: {
            id: 'user-1',
            name: 'Alice Smith'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
          isRead: true,
          isDelivered: true
        },
        {
          id: 'msg-1-6',
          content: 'When will the delivery arrive?',
          sender: {
            id: 'user-1',
            name: 'Alice Smith'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
          isRead: true,
          isDelivered: true
        }
      ],
      '2': [
        {
          id: 'msg-2-1',
          content: "Hey team, we need to finalize the project timeline",
          sender: {
            id: 'user-1',
            name: 'Alice Smith'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          isRead: true,
          isDelivered: true
        },
        {
          id: 'msg-2-2',
          content: "I'll prepare a draft schedule for review",
          sender: {
            id: 'current-user',
            name: 'Current User'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
          isRead: true,
          isDelivered: true
        },
        {
          id: 'msg-2-3',
          content: "Thanks, please share it by tomorrow",
          sender: {
            id: 'user-1',
            name: 'Alice Smith'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 100).toISOString(),
          isRead: true,
          isDelivered: true
        },
        {
          id: 'msg-2-4',
          content: "I updated the project schedule",
          sender: {
            id: 'user-2',
            name: 'Bob Johnson'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          isRead: false,
          isDelivered: true
        }
      ],
      '3': [
        {
          id: 'msg-3-1',
          content: "I've attached the service call details for your review",
          sender: {
            id: 'current-user',
            name: 'Current User'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
          isRead: true,
          isDelivered: true,
          attachments: [
            {
              id: 'attachment-1',
              type: 'document',
              url: '#',
              name: 'ServiceCall_SC-1234.pdf',
              size: 1240000
            }
          ]
        },
        {
          id: 'msg-3-2',
          content: "Please review the service details",
          sender: {
            id: 'user-3',
            name: 'Charlie Brown'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          isRead: true,
          isDelivered: true
        }
      ],
      '4': [
        {
          id: 'msg-4-1',
          content: "I have some concerns about my recent contract",
          sender: {
            id: 'user-4',
            name: 'David Miller'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
          isRead: true,
          isDelivered: true
        },
        {
          id: 'msg-4-2',
          content: "What specific concerns do you have?",
          sender: {
            id: 'current-user',
            name: 'Current User'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 170).toISOString(),
          isRead: true,
          isDelivered: true
        },
        {
          id: 'msg-4-3',
          content: "The payment terms are different from what we discussed",
          sender: {
            id: 'user-4',
            name: 'David Miller'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 160).toISOString(),
          isRead: true,
          isDelivered: true
        },
        {
          id: 'msg-4-4',
          content: "I need to discuss the contract terms and would like to file a formal dispute",
          sender: {
            id: 'user-4',
            name: 'David Miller'
          },
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          isRead: false,
          isDelivered: true
        }
      ]
    },
    currentUserId: 'current-user'
  });
  
  const totalUnreadCount = threads.reduce((total, thread) => total + thread.unreadCount, 0);
  const totalDisputeCount = threads.filter(thread => thread.isDispute).length;
  const totalUrgentCount = threads.filter(thread => thread.isUrgent).length;
  const totalActionNeeded = totalUnreadCount + totalDisputeCount + totalUrgentCount;
  
  useEffect(() => {
    const documentId = searchParams.get('documentId');
    const documentType = searchParams.get('documentType');
    const documentName = searchParams.get('documentName');
    
    if (documentId && documentType && documentName) {
      const existingThread = threads.find(thread => 
        thread.type === 'document' && 
        thread.documentContext?.documentId === documentId
      );
      
      if (existingThread) {
        setActiveThreadId(existingThread.id);
      } else {
        const newThreadId = createThread('document', {
          document: {
            id: documentId,
            type: documentType,
            name: documentName
          },
          participants: []
        });
        
        setActiveThreadId(newThreadId);
        
        toast({
          title: "Document Discussion Created",
          description: `Started a discussion about ${documentName}`
        });
      }
    }
  }, [searchParams, threads, createThread]);
  
  const handleSelectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    setShowInfoPanel(false);
    
    const selectedThread = threads.find(t => t.id === threadId);
    if (selectedThread?.type === 'direct' || selectedThread?.type === 'group') {
      setShowCustomerPanel(true);
    }
    
    if (threads.find(t => t.id === threadId)?.unreadCount) {
      markThreadAsRead(threadId);
    }
  };
  
  const handleSendMessage = (content: string, attachments?: MessageAttachment[]) => {
    if (!activeThreadId) return;
    sendMessage(activeThreadId, content, attachments);
  };
  
  const handleAddReaction = (messageId: string, emoji: string) => {
    if (!activeThreadId) return;
    addReaction(activeThreadId, messageId, emoji);
  };
  
  const handleNewChat = () => {
    setIsCreateChatModalOpen(true);
  };
  
  const handleNewGroup = () => {
    setIsCreateChatModalOpen(true);
  };
  
  const handleCreateChat = (type: 'direct' | 'group' | 'document' | 'dispute', data: any) => {
    const newThreadId = createThread(type, data);
    setActiveThreadId(newThreadId);
    
    if (type === 'direct' || type === 'group') {
      setShowCustomerPanel(true);
    }
    
    toast({
      title: `${type === 'direct' ? 'Chat' : type === 'group' ? 'Group' : type === 'document' ? 'Document Discussion' : 'Dispute'}`,
      description: type === 'direct' 
        ? `Started a chat with ${data.participant.name}`
        : type === 'group'
        ? `Created group "${data.name}"`
        : type === 'document'
        ? `Started a discussion about ${data.document.name}`
        : `Started a dispute case`
    });
  };
  
  const handleTypingStart = () => {
    updateTypingStatus(true);
  };
  
  const handleTypingEnd = () => {
    updateTypingStatus(false);
  };
  
  const handleDeleteThread = () => {
    if (!activeThreadId) return;
    
    const confirmDelete = window.confirm('Are you sure you want to delete this conversation? This action cannot be undone.');
    if (confirmDelete) {
      deleteThread(activeThreadId);
      toast({
        title: "Conversation Deleted",
        description: "The conversation has been permanently deleted."
      });
    }
  };
  
  const handleRenameThread = () => {
    if (!activeThreadId || !activeThread || (activeThread.type !== 'group' && activeThread.type !== 'document')) return;
    
    const newName = prompt('Enter a new name for this conversation:', activeThread.name);
    if (newName && newName.trim()) {
      renameThread(activeThreadId, newName.trim());
      
      toast({
        title: "Conversation Renamed",
        description: `The conversation has been renamed to "${newName.trim()}".`
      });
    }
  };
  
  const hasCustomerContext = activeThread?.type === 'direct' || 
                            (activeThread?.type === 'group' && 
                             activeThread.participants.some(p => p.role === 'Customer'));
  
  const currentUser = {
    id: 'current-user',
    name: 'Current User',
    avatar: ''
  };
  
  return (
    <div className="flex flex-col h-full">
      <PageHeader 
        title="Communications" 
        subtitle="Chat with your team and customers"
        className="px-6 mb-0 sm:h-16 flex justify-between items-center"
        actions={
          <div className="flex items-center gap-2 justify-end ml-auto">
            <Button 
              variant="blueTeal" 
              size="sm"
              className="shadow-sm transition-all hover:shadow-md"
              onClick={handleNewChat}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              New Chat
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant={totalActionNeeded > 0 ? "destructive" : "outline"} 
                  size="sm" 
                >
                  <Bell className="h-4 w-4 mr-1" />
                  <span>Notifications</span>
                  {totalActionNeeded > 0 && (
                    <Badge variant="destructive" className="ml-1 min-w-5 h-5 flex items-center justify-center">
                      {totalActionNeeded}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {totalUnreadCount > 0 && (
                  <DropdownMenuItem 
                    className="flex justify-between cursor-pointer"
                    onClick={() => {
                      if (threads.find(t => t.unreadCount > 0)) {
                        const firstUnreadThread = threads.find(t => t.unreadCount > 0);
                        if (firstUnreadThread) {
                          handleSelectThread(firstUnreadThread.id);
                        }
                      }
                    }}
                  >
                    <span>Unread messages</span>
                    <Badge>{totalUnreadCount}</Badge>
                  </DropdownMenuItem>
                )}
                
                {totalDisputeCount > 0 && (
                  <DropdownMenuItem 
                    className="flex justify-between cursor-pointer"
                    onClick={() => {
                      if (threads.find(t => t.isDispute)) {
                        const firstDisputeThread = threads.find(t => t.isDispute);
                        if (firstDisputeThread) {
                          handleSelectThread(firstDisputeThread.id);
                        }
                      }
                    }}
                  >
                    <span>Active disputes</span>
                    <Badge variant="destructive">{totalDisputeCount}</Badge>
                  </DropdownMenuItem>
                )}
                
                {totalUrgentCount > 0 && (
                  <DropdownMenuItem 
                    className="flex justify-between cursor-pointer"
                    onClick={() => {
                      if (threads.find(t => t.isUrgent)) {
                        const firstUrgentThread = threads.find(t => t.isUrgent);
                        if (firstUrgentThread) {
                          handleSelectThread(firstUrgentThread.id);
                        }
                      }
                    }}
                  >
                    <span>Urgent messages</span>
                    <Badge className="bg-orange-500">{totalUrgentCount}</Badge>
                  </DropdownMenuItem>
                )}
                
                {totalActionNeeded === 0 && (
                  <div className="px-2 py-4 text-center text-gray-500">
                    <p>No new notifications</p>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        }
      />
        
      <div className="h-[calc(100vh-8rem)] bg-white border rounded-lg overflow-hidden mx-6 my-4 relative">
        <div className="flex h-full">
          <ChatSidebar 
            threads={threads} 
            activeThreadId={activeThreadId}
            onSelectThread={handleSelectThread}
            onNewChat={handleNewChat}
            onNewGroup={handleNewGroup}
            onToggleFavorite={toggleFavorite}
            onMarkAsRead={markThreadAsRead}
            onMarkAsUnread={markThreadAsUnread}
            onMarkAsUrgent={toggleUrgent}
          />
            
          <div className="flex-1 flex flex-col overflow-hidden border-l border-gray-200">
            {activeThread ? (
              <>
                <ChatThreadHeader 
                  thread={activeThread}
                  onViewInfo={() => setShowInfoPanel(!showInfoPanel)}
                  onCall={() => toast({
                    title: "Call Feature",
                    description: "Calling functionality will be implemented in a future update.",
                  })}
                  onVideoCall={() => toast({
                    title: "Video Call Feature",
                    description: "Video calling functionality will be implemented in a future update.",
                  })}
                  onToggleFavorite={() => toggleFavorite(activeThread.id)}
                  onMarkAsRead={() => markThreadAsRead(activeThread.id)}
                  onMarkAsUnread={() => markThreadAsUnread(activeThread.id)}
                  onMarkAsUrgent={() => toggleUrgent(activeThread.id)}
                  onToggleCustomerPanel={() => setShowCustomerPanel(!showCustomerPanel)}
                  onTogglePin={() => togglePin(activeThread.id)}
                  onSetCategory={(category) => setThreadCategory(activeThread.id, category)}
                  onRename={handleRenameThread}
                  onDelete={handleDeleteThread}
                  onArchive={() => toast({
                    title: "Archive Feature",
                    description: "Archiving functionality will be implemented in a future update.",
                  })}
                  hasCustomerContext={hasCustomerContext}
                />
                
                <div className="flex-1 flex flex-col overflow-hidden">
                  {activeThread.type === 'document' && activeThread.documentContext && !showExpandedDocument && (
                    <DocumentPreviewInChat 
                      documentContext={activeThread.documentContext}
                      onExpand={() => setShowExpandedDocument(true)}
                    />
                  )}
                  
                  <ChatMessageList 
                    messages={activeMessages}
                    currentUser={currentUser}
                    thread={activeThread}
                    showExpandedDocument={showExpandedDocument && activeThread.type === 'document'}
                    onCloseExpandedDocument={() => setShowExpandedDocument(false)}
                    onAddReaction={handleAddReaction}
                    typingUsers={activeTypingUsers}
                  />
                </div>
                  
                <ChatInput 
                  onSendMessage={handleSendMessage}
                  isLoading={isLoading}
                  threadType={activeThread.type}
                  documentContext={activeThread.documentContext}
                  onTypingStart={handleTypingStart}
                  onTypingEnd={handleTypingEnd}
                  quickReplies={[
                    { id: '1', text: 'Thanks for your message. I\'ll get back to you shortly.', category: 'General' },
                    { id: '2', text: 'Could you please provide more details?', category: 'General' },
                    { id: '3', text: 'I\'ve resolved your issue. Please let me know if you have any other questions.', category: 'Support' },
                    { id: '4', text: 'I\'ve scheduled a follow-up call for next week.', category: 'Scheduling' }
                  ]}
                />
              </>
            ) : (
              <EmptyChatState 
                onNewChat={handleNewChat}
                onNewGroup={handleNewGroup}
              />
            )}
          </div>
            
          {activeThread && showInfoPanel && (
            <ChatInfoPanel 
              thread={activeThread}
              onClose={() => setShowInfoPanel(false)}
              onAddParticipant={() => toast({
                title: "Add Participant",
                description: "This feature will be implemented soon.",
              })}
            />
          )}
          
          {activeThread && showCustomerPanel && hasCustomerContext && (
            <CustomerProfilePanel 
              customerId={activeThread.type === 'direct' ? activeThread.participants[0]?.id : undefined}
              onClose={() => setShowCustomerPanel(false)}
            />
          )}
        </div>
      </div>
        
      <CreateChatModal 
        isOpen={isCreateChatModalOpen}
        onClose={() => setIsCreateChatModalOpen(false)}
        onCreateChat={handleCreateChat}
      />
    </div>
  );
};

export default Chat;
