
// Chat Types
export interface ChatMessage {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: string;
  isRead: boolean;
  isDelivered: boolean; // Track message delivery status
  attachments?: MessageAttachment[];
  reactions?: MessageReaction[]; // Support for message reactions
}

export interface MessageReaction {
  id: string;
  emoji: string;
  userId: string;
  userName: string;
}

export interface MessageAttachment {
  id: string;
  type: 'image' | 'document' | 'link';
  url: string;
  name: string;
  size?: number;
  previewUrl?: string;
}

export interface ChatParticipant {
  id: string;
  name: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  role?: string;
  lastSeen?: string; // Track when user was last active
}

export interface DocumentContext {
  documentId: string;
  documentType: string;
  documentName: string;
  status?: string; // Document status (e.g., "pending", "approved")
  lastUpdated?: string;
}

export interface ChatThread {
  id: string;
  type: 'direct' | 'group' | 'document' | 'dispute';
  name?: string;
  participants: ChatParticipant[];
  lastMessage?: ChatMessage;
  unreadCount: number;
  isFavorite: boolean;
  isPinned?: boolean;
  isUrgent?: boolean;
  isDispute?: boolean;
  category?: string;
  createdAt: string;
  updatedAt: string;
  documentContext?: DocumentContext;
}

// New interface for typing indicators
export interface TypingIndicator {
  threadId: string;
  userId: string;
  userName: string;
  timestamp: string;
}

// New interface for rich text content
export interface RichTextContent {
  type: 'paragraph' | 'heading' | 'list' | 'quote' | 'code';
  content: string;
  attributes?: Record<string, any>;
}
