
import React, { useState, useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, Clock, AlertTriangle, X, FileText, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { mockCustomers } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  time: string;
  read: boolean;
  action?: {
    type: string;
    data: any;
  };
}

interface NotificationDropdownProps {
  notificationCount: number;
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onClearNotifications: () => void;
  onCreateAgreement?: (customerId: string, customerName: string) => void;
}

const NotificationDropdown = ({
  notificationCount,
  notifications: externalNotifications,
  onNotificationClick,
  onMarkAsRead,
  onMarkAllAsRead,
  onClearNotifications,
  onCreateAgreement
}: NotificationDropdownProps) => {
  const navigate = useNavigate();
  const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
  
  // Generate agreement notifications from customers needing quotes
  useEffect(() => {
    const customersNeedingAgreement = mockCustomers.filter(customer => customer.needs_quote);
    
    const agreementNotifications = customersNeedingAgreement.map((customer, index) => ({
      id: `agreement-${customer.id}`,
      title: 'Price Agreement Needed',
      message: `${customer.name} needs a price agreement.`,
      type: 'warning' as const,
      time: '1 hour ago',
      read: false,
      action: {
        type: 'create_agreement',
        data: {
          customerId: customer.id,
          customerName: customer.name
        }
      }
    }));
    
    setAllNotifications([...externalNotifications, ...agreementNotifications]);
  }, [externalNotifications]);
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'error':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'info':
      default:
        return <Clock className="h-5 w-5 text-blue-500" />;
    }
  };

  const handleNotificationAction = (notification: Notification) => {
    if (notification.action?.type === 'create_agreement' && onCreateAgreement) {
      onCreateAgreement(
        notification.action.data.customerId,
        notification.action.data.customerName
      );
      
      // Mark as read after taking action
      onMarkAsRead(notification.id);
    } else {
      onNotificationClick(notification);
    }
  };

  const handleViewAllAgreements = () => {
    navigate('/customers?filter=needs_agreement');
  };

  // Get count of agreement-related notifications
  const agreementNotificationCount = allNotifications.filter(
    n => n.action?.type === 'create_agreement' && !n.read
  ).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-10 w-10 relative"
        >
          <Bell className="h-5 w-5 text-gray-600" />
          {allNotifications.filter(n => !n.read).length > 0 && (
            <Badge 
              variant="countRed" 
              className="absolute -top-2 -right-2 min-w-[1.3rem] h-5 flex items-center justify-center text-[11px] font-medium rounded-full"
            >
              {allNotifications.filter(n => !n.read).length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {allNotifications.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-xs whitespace-nowrap"
                onClick={onMarkAllAsRead}
              >
                Mark all as read
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-xs whitespace-nowrap"
                onClick={onClearNotifications}
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {agreementNotificationCount > 0 && (
            <div className="p-3 bg-amber-50">
              <div className="flex justify-between items-center">
                <div className="font-medium text-sm text-amber-800">
                  {agreementNotificationCount} {agreementNotificationCount === 1 ? 'customer needs' : 'customers need'} a price agreement
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 text-xs bg-white border-amber-200 text-amber-800"
                  onClick={handleViewAllAgreements}
                >
                  View All
                </Button>
              </div>
            </div>
          )}
          
          {allNotifications.length > 0 ? (
            <div className="divide-y">
              {allNotifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={cn(
                    "p-4 hover:bg-gray-50 cursor-pointer transition-colors",
                    !notification.read && "bg-blue-50"
                  )}
                  onClick={() => handleNotificationAction(notification)}
                >
                  <div className="flex justify-between">
                    <div className="flex items-start space-x-3">
                      <div>
                        {notification.action?.type === 'create_agreement' ? (
                          <FileText className="h-5 w-5 text-amber-500" />
                        ) : (
                          getNotificationIcon(notification.type)
                        )}
                      </div>
                      <div>
                        <h4 className={cn(
                          "text-sm font-medium",
                          !notification.read && "font-semibold"
                        )}>
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.time}
                        </p>
                        {notification.action?.type === 'create_agreement' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="mt-2 h-8 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onCreateAgreement) {
                                onCreateAgreement(
                                  notification.action.data.customerId,
                                  notification.action.data.customerName
                                );
                                onMarkAsRead(notification.id);
                              }
                            }}
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Create Agreement
                          </Button>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 opacity-0 hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        onMarkAsRead(notification.id);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500">No notifications</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationDropdown;
