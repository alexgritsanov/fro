
import React, { useState } from 'react';
import { Search, AlertCircle, Phone, Mail, MapPin, IdCard, Badge, Award, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge as UIBadge } from '@/components/ui/badge';
import Avatar from '@/components/Avatar';
import Card from '@/components/Card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import QuoteModal from './QuoteModal';
import { Customer } from '@/services/api/customersApi';

interface CustomerListProps {
  customers: Customer[];
  isLoading: boolean;
  onSelectCustomer: (customer: Customer) => void;
  viewMode: 'grid' | 'list';
  onCreateCustomer: () => void;
  onCreateAgreement?: (customerId: string, customerName: string) => void;
}

type RatingTier = 'standard' | 'premium' | 'elite';

interface RatingConfig {
  label: string;
  color: string;
  badgeClass: string;
  icon: React.ElementType;
  description: string;
}

const EnhancedCustomerList = ({
  customers,
  isLoading,
  onSelectCustomer,
  viewMode,
  onCreateCustomer,
  onCreateAgreement
}: CustomerListProps) => {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  
  const ratingConfigs: Record<RatingTier, RatingConfig> = {
    standard: {
      label: 'Standard',
      color: '#8E9196',
      badgeClass: 'bg-gray-100 text-gray-700 border-gray-200',
      icon: Shield,
      description: '10,000/mo'
    },
    premium: {
      label: 'Premium',
      color: '#0EA5E9',
      badgeClass: 'bg-blue-100 text-blue-700 border-blue-200',
      icon: Badge,
      description: '10,001-50,000/mo'
    },
    elite: {
      label: 'Elite',
      color: '#F59E0B',
      badgeClass: 'bg-amber-100 text-amber-700 border-amber-200',
      icon: Award,
      description: '50,000+/mo'
    }
  };

  const getCustomerRating = (customer: Customer): RatingTier => {
    const hash = customer.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    
    if (hash % 3 === 0) return 'elite';
    if (hash % 3 === 1) return 'premium';
    return 'standard';
  };

  const generateCompanyId = (customerId: string) => {
    const seed = customerId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    let result = '';
    for (let i = 0; i < 9; i++) {
      result += Math.floor(seed * (i + 1) * Date.now() % 10);
    }
    return result;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-500 border-gray-200';
      case 'prospect':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleQuoteNeededClick = (e: React.MouseEvent, customerId: string, customerName: string) => {
    e.stopPropagation();
    
    if (onCreateAgreement) {
      onCreateAgreement(customerId, customerName);
    } else {
      setSelectedCustomerId(customerId);
      setShowQuoteModal(true);
    }
  };

  const handleCloseQuoteModal = () => {
    setShowQuoteModal(false);
    setSelectedCustomerId(null);
  };

  const GridSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="border rounded-lg p-5 space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );

  const ListSkeleton = () => (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-3">
        <div className="grid grid-cols-12 gap-4">
          <Skeleton className="h-5 w-32 col-span-3" />
          <Skeleton className="h-5 w-24 col-span-3" />
          <Skeleton className="h-5 w-20 col-span-2" />
          <Skeleton className="h-5 w-24 col-span-2" />
          <Skeleton className="h-5 w-20 col-span-2" />
        </div>
      </div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border-t p-3">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-3 flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-32 col-span-3" />
            <Skeleton className="h-4 w-16 col-span-2" />
            <Skeleton className="h-4 w-20 col-span-2" />
            <Skeleton className="h-6 w-16 rounded-full col-span-2" />
          </div>
        </div>
      ))}
    </div>
  );

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="space-y-4 p-4">
      {isLoading ? (
        viewMode === 'grid' ? <GridSkeleton /> : <ListSkeleton />
      ) : (
        <>
          {customers.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <div className="mx-auto w-16 h-16 bg-gray-100 flex items-center justify-center rounded-full mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium">No customers found</h3>
              <p className="text-gray-500 mt-2 mb-6">Try adjusting your search or add a new customer</p>
              <Button onClick={onCreateCustomer} className="bg-unidoc-primary-blue hover:bg-unidoc-primary-blue/90">
                Add New Customer
              </Button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {customers.map(customer => {
                const rating = getCustomerRating(customer);

                return (
                  <Card key={customer.id} interactive onClick={() => onSelectCustomer(customer)} className="p-5 bg-white hover:bg-gray-50 border border-gray-100 rounded-xl hover:shadow-lg shadow-sm transition-all duration-200 overflow-hidden">
                    <div className="absolute -top-0.5 -right-0.5">
                      <div className={cn(
                        "flex items-center justify-center px-3 py-1",
                        "text-xs font-semibold whitespace-nowrap",
                        "rounded-bl-md",
                        ratingConfigs[rating].badgeClass
                      )}>
                        {React.createElement(ratingConfigs[rating].icon, { className: "h-3 w-3 mr-1.5" })}
                        {ratingConfigs[rating].label}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-4 pt-4">
                      <Avatar alt={customer.name} size="md" status={customer.status === 'active' ? 'online' : 'offline'} />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{customer.name}</h3>
                        <p className="text-gray-500 text-sm">
                          {customer.nickname || customer.email}
                        </p>
                      </div>
                    </div>
                    
                    {customer.needs_quote && (
                      <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-2.5 flex items-center cursor-pointer hover:bg-amber-100 transition-colors" 
                        onClick={e => handleQuoteNeededClick(e, customer.id, customer.name)}>
                        <AlertCircle className="h-4 w-4 text-amber-600 mr-2 flex-shrink-0" />
                        <span className="text-amber-800 text-xs font-medium">Click to create a price agreement</span>
                      </div>
                    )}
                    
                    <div className="space-y-2.5 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="flex items-center justify-center w-7 mr-2">
                          <IdCard className="h-4 w-4 text-gray-400" />
                        </div>
                        <span className="font-medium text-gray-700">ID:</span>
                        <span className="ml-2 truncate">{customer.customerId || generateCompanyId(customer.id)}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="flex items-center justify-center w-7 mr-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                        </div>
                        <span className="font-medium text-gray-700">Phone:</span>
                        <span className="ml-2 truncate">{customer.phone || 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="flex items-center justify-center w-7 mr-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                        </div>
                        <span className="font-medium text-gray-700">Email:</span>
                        <span className="ml-2 truncate">{customer.email || 'N/A'}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="flex items-center justify-center w-7 mr-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                        </div>
                        <span className="font-medium text-gray-700">Address:</span>
                        <span className="ml-2 truncate">{customer.address || 'N/A'}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <UIBadge variant="outline" className={cn("text-xs font-medium px-2.5 py-0.5", getStatusColor(customer.status))}>
                        {customer.status}
                      </UIBadge>
                      <div className="text-xs text-gray-500">
                        Last activity: {formatDate(customer.last_active || customer.created_at)}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <div className="bg-gray-50 p-3">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-3 text-sm font-medium text-gray-700 flex items-center">
                    Company
                  </div>
                  <div className="col-span-3 text-sm font-medium text-gray-700 flex items-center">
                    Contact Info
                  </div>
                  <div className="col-span-2 text-sm font-medium text-gray-700 hidden md:flex items-center">
                    Tier
                  </div>
                  <div className="col-span-2 text-sm font-medium text-gray-700 hidden md:flex items-center">
                    Last Activity
                  </div>
                  <div className="col-span-2 text-sm font-medium text-gray-700 flex items-center">
                    Status
                  </div>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {customers.map(customer => {
                  const rating = getCustomerRating(customer);
                  const ratingConfig = ratingConfigs[rating];
                  const RatingIcon = ratingConfig.icon;

                  return (
                    <div key={customer.id} className="p-3 hover:bg-gray-50 cursor-pointer relative" onClick={() => onSelectCustomer(customer)}>
                      <div className="absolute right-0 top-0 bottom-0 flex items-center">
                        <div className={cn(
                          "inline-flex items-center justify-center px-3 py-1 text-xs",
                          "border-l rounded-l-md shadow-sm",
                          ratingConfig.badgeClass
                        )}>
                          <RatingIcon className="h-3 w-3 mr-1.5" />
                          {ratingConfig.label}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-3 flex items-center gap-3">
                          <Avatar alt={customer.name} size="sm" status={customer.status === 'active' ? 'online' : 'offline'} />
                          <div>
                            <div className="font-medium flex items-center">
                              {customer.name}
                              {customer.needs_quote && (
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="ml-2 p-1 h-auto bg-amber-50 text-amber-800 hover:bg-amber-100 rounded-sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuoteNeededClick(e, customer.id, customer.name);
                                  }}
                                >
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  <span className="text-xs">Needs Agreement</span>
                                </Button>
                              )}
                            </div>
                            <div className="text-xs text-gray-500">
                              {customer.nickname}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center mt-1">
                              <IdCard className="h-3 w-3 mr-1" />
                              ID: {customer.customerId || generateCompanyId(customer.id)}
                            </div>
                          </div>
                        </div>
                        <div className="col-span-3">
                          <div className="text-sm flex items-center">
                            <Mail className="h-3 w-3 mr-1 text-gray-400" />
                            {customer.email || 'N/A'}
                          </div>
                          <div className="text-sm flex items-center mt-1">
                            <Phone className="h-3 w-3 mr-1 text-gray-400" />
                            {customer.phone || 'N/A'}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                            {customer.address || 'N/A'}
                          </div>
                        </div>
                        <div className="col-span-2 hidden md:block text-sm">
                          <div className="flex items-center">
                            <RatingIcon className="h-4 w-4 mr-1.5" style={{ color: ratingConfig.color }} />
                            {ratingConfig.label}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {ratingConfig.description}
                          </div>
                        </div>
                        <div className="col-span-2 hidden md:block text-sm">
                          {formatDate(customer.last_active || customer.created_at)}
                        </div>
                        <div className="col-span-2 flex items-center">
                          <UIBadge variant="outline" className={cn("text-xs font-medium px-2 py-0.5", getStatusColor(customer.status))}>
                            {customer.status}
                          </UIBadge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
      {showQuoteModal && selectedCustomerId && (
        <QuoteModal 
          customerId={selectedCustomerId} 
          onClose={handleCloseQuoteModal}
          isOpen={true} 
        />
      )}
    </div>
  );
};

export default EnhancedCustomerList;
