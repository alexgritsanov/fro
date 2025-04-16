
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface DocumentChatButtonProps {
  documentId: string;
  documentType: 'service-call' | 'delivery-certificate' | 'price-agreement' | 'report' | 'invoice' | 'dispute';
  documentName: string;
  customerId?: string;
  customerName?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
  hideLabel?: boolean;
  tooltipText?: string;
  count?: number;
}

const DocumentChatButton: React.FC<DocumentChatButtonProps> = ({
  documentId,
  documentType,
  documentName,
  customerId,
  customerName,
  size = 'sm',
  variant = 'outline',
  className = '',
  hideLabel = false,
  tooltipText = 'Discuss this document',
  count
}) => {
  const navigate = useNavigate();
  
  const handleOpenChat = () => {
    // Prepare URL parameters for the chat page
    const params = new URLSearchParams();
    params.set('documentId', documentId);
    params.set('documentType', documentType);
    params.set('documentName', documentName);
    
    if (customerId) {
      params.set('customerId', customerId);
    }
    
    if (customerName) {
      params.set('customerName', customerName);
    }
    
    // Navigate to the chat page with document context
    navigate(`/chat?${params.toString()}`);
    
    toast.success(`Chat opened for ${documentName}`, {
      description: `Starting conversation about this ${documentType.replace('-', ' ')}`
    });
  };
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          onClick={handleOpenChat} 
          size={size} 
          variant={variant}
          className={`flex items-center gap-1 ${className}`}
        >
          <div className="relative">
            <MessageSquare className="h-4 w-4" />
            {typeof count === 'number' && count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white text-[10px] rounded-full min-w-[14px] h-[14px] flex items-center justify-center">
                {count > 99 ? '99+' : count}
              </span>
            )}
          </div>
          {!hideLabel && <span>Discuss</span>}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltipText}</TooltipContent>
    </Tooltip>
  );
};

export default DocumentChatButton;
