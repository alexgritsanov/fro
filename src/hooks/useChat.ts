
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatThread, ChatMessage, MessageAttachment, TypingIndicator } from '@/models/Chat';

interface UseChatOptions {
  initialThreads?: ChatThread[];
  initialMessages?: Record<string, ChatMessage[]>;
  currentUserId: string;
}

export function useChat({ 
  initialThreads = [], 
  initialMessages = {}, 
  currentUserId 
}: UseChatOptions) {
  const [threads, setThreads] = useState<ChatThread[]>(initialThreads);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(initialMessages);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const [typingIndicators, setTypingIndicators] = useState<TypingIndicator[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const activeThread = threads.find(thread => thread.id === activeThreadId);
  const activeMessages = activeThreadId ? messages[activeThreadId] || [] : [];
  const activeTypingUsers = typingIndicators
    .filter(indicator => 
      indicator.threadId === activeThreadId && 
      indicator.userId !== currentUserId && 
      new Date().getTime() - new Date(indicator.timestamp).getTime() < 5000
    )
    .map(indicator => indicator.userName);
  
  const markThreadAsRead = useCallback((threadId: string) => {
    setThreads(prevThreads => 
      prevThreads.map(thread => 
        thread.id === threadId 
          ? { ...thread, unreadCount: 0 } 
          : thread
      )
    );
  }, []);
  
  const markThreadAsUnread = useCallback((threadId: string) => {
    setThreads(prevThreads => 
      prevThreads.map(thread => 
        thread.id === threadId 
          ? { ...thread, unreadCount: 1 } 
          : thread
      )
    );
  }, []);
  
  const toggleFavorite = useCallback((threadId: string) => {
    setThreads(prevThreads => 
      prevThreads.map(thread => 
        thread.id === threadId 
          ? { ...thread, isFavorite: !thread.isFavorite } 
          : thread
      )
    );
  }, []);
  
  const toggleUrgent = useCallback((threadId: string) => {
    setThreads(prevThreads => 
      prevThreads.map(thread => 
        thread.id === threadId 
          ? { ...thread, isUrgent: !thread.isUrgent } 
          : thread
      )
    );
  }, []);
  
  const togglePin = useCallback((threadId: string) => {
    setThreads(prevThreads => 
      prevThreads.map(thread => 
        thread.id === threadId 
          ? { ...thread, isPinned: !thread.isPinned } 
          : thread
      )
    );
  }, []);
  
  const setThreadCategory = useCallback((threadId: string, category: string) => {
    setThreads(prevThreads => 
      prevThreads.map(thread => 
        thread.id === threadId 
          ? { ...thread, category } 
          : thread
      )
    );
  }, []);
  
  const sendMessage = useCallback((threadId: string, content: string, attachments?: MessageAttachment[]) => {
    if (!threadId || content.trim() === '' && (!attachments || attachments.length === 0)) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const newMessage: ChatMessage = {
        id: uuidv4(),
        content,
        sender: {
          id: currentUserId,
          name: 'Current User'
        },
        timestamp: new Date().toISOString(),
        isRead: false,
        isDelivered: true,
        attachments
      };
      
      setMessages(prev => ({
        ...prev,
        [threadId]: [...(prev[threadId] || []), newMessage]
      }));
      
      setThreads(prevThreads => 
        prevThreads.map(thread => 
          thread.id === threadId 
            ? { 
                ...thread, 
                lastMessage: newMessage,
                updatedAt: new Date().toISOString()
              } 
            : thread
        )
      );
      
      setIsLoading(false);
      
      if (Math.random() > 0.5) {
        simulateReceivedMessage(threadId);
      }
    }, 500);
  }, [currentUserId]);
  
  const addReaction = useCallback((threadId: string, messageId: string, emoji: string) => {
    setMessages(prev => {
      const threadMessages = prev[threadId] || [];
      return {
        ...prev,
        [threadId]: threadMessages.map(message => 
          message.id === messageId
            ? {
                ...message,
                reactions: [
                  ...(message.reactions || []),
                  {
                    id: uuidv4(),
                    emoji,
                    userId: currentUserId,
                    userName: 'Current User'
                  }
                ]
              }
            : message
        )
      };
    });
  }, [currentUserId]);
  
  const createThread = useCallback((type: 'direct' | 'group' | 'document' | 'dispute', data: any) => {
    const newThreadId = uuidv4();
    let newThread: ChatThread;
    
    if (type === 'direct') {
      newThread = {
        id: newThreadId,
        type: 'direct',
        participants: [data.participant],
        unreadCount: 0,
        isFavorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    } else if (type === 'group') {
      newThread = {
        id: newThreadId,
        type: 'group',
        name: data.name,
        participants: data.members,
        unreadCount: 0,
        isFavorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    } else if (type === 'document') {
      newThread = {
        id: newThreadId,
        type: 'document',
        participants: data.participants?.length ? data.participants : [
          {
            id: currentUserId,
            name: 'Current User',
            status: 'online',
            role: 'Office'
          }
        ],
        documentContext: {
          documentId: data.document.id,
          documentType: data.document.type,
          documentName: data.document.name,
          status: data.document.status
        },
        unreadCount: 0,
        isFavorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    } else if (type === 'dispute') {
      newThread = {
        id: newThreadId,
        type: 'dispute',
        participants: [data.participant],
        unreadCount: 0,
        isFavorite: false,
        isDispute: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    } else {
      // Fallback for type safety
      newThread = {
        id: newThreadId,
        type: 'direct',
        participants: [data.participant || { id: 'unknown', name: 'Unknown User' }],
        unreadCount: 0,
        isFavorite: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
    }
    
    setThreads(prev => [newThread, ...prev]);
    setMessages(prev => ({
      ...prev,
      [newThreadId]: []
    }));
    
    return newThreadId;
  }, [currentUserId]);
  
  const deleteThread = useCallback((threadId: string) => {
    setThreads(prev => prev.filter(thread => thread.id !== threadId));
    setMessages(prev => {
      const newMessages = { ...prev };
      delete newMessages[threadId];
      return newMessages;
    });
    
    if (activeThreadId === threadId) {
      setActiveThreadId(null);
    }
  }, [activeThreadId]);
  
  const renameThread = useCallback((threadId: string, newName: string) => {
    setThreads(prev => 
      prev.map(thread => 
        thread.id === threadId && (thread.type === 'group' || thread.type === 'document')
          ? { ...thread, name: newName }
          : thread
      )
    );
  }, []);
  
  const updateTypingStatus = useCallback((isTyping: boolean) => {
    if (!activeThreadId) return;
    
    if (isTyping) {
      const newIndicator: TypingIndicator = {
        threadId: activeThreadId,
        userId: currentUserId,
        userName: 'Current User',
        timestamp: new Date().toISOString()
      };
      
      setTypingIndicators(prev => 
        [
          ...prev.filter(
            indicator => 
              indicator.threadId !== activeThreadId || 
              indicator.userId !== currentUserId
          ),
          newIndicator
        ]
      );
    }
  }, [activeThreadId, currentUserId]);
  
  const simulateReceivedMessage = useCallback((threadId: string) => {
    setTimeout(() => {
      const thread = threads.find(t => t.id === threadId);
      if (!thread) return;
      
      const sender = thread.participants.find(p => p.id !== currentUserId);
      if (!sender) return;
      
      const responses = [
        "Thanks for your message!",
        "I'll look into this right away.",
        "Got it, I'll get back to you soon.",
        "Thanks for the update.",
        "I understand, let me check on that.",
        "Perfect, thanks for letting me know."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const newMessage: ChatMessage = {
        id: uuidv4(),
        content: randomResponse,
        sender: {
          id: sender.id,
          name: sender.name,
          avatar: sender.avatar
        },
        timestamp: new Date().toISOString(),
        isRead: activeThreadId === threadId,
        isDelivered: true
      };
      
      setMessages(prev => ({
        ...prev,
        [threadId]: [...(prev[threadId] || []), newMessage]
      }));
      
      setThreads(prevThreads => 
        prevThreads.map(thread => 
          thread.id === threadId 
            ? { 
                ...thread, 
                lastMessage: newMessage,
                updatedAt: new Date().toISOString(),
                unreadCount: activeThreadId === threadId ? 0 : thread.unreadCount + 1
              } 
            : thread
        )
      );
    }, 2000 + Math.random() * 3000);
  }, [threads, currentUserId, activeThreadId]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      
      setTypingIndicators(prev => 
        prev.filter(indicator => 
          now - new Date(indicator.timestamp).getTime() < 5000
        )
      );
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return {
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
  };
}
