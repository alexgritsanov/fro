import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  MoreVertical,
  FileText,
  Calendar,
  Clock,
  User,
  MapPin,
  FileCheck,
  ClipboardSignature,
  Download,
  Eye,
  Filter,
  ChevronDown,
  Printer,
  Copy,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { mockServiceCallsExtended, mockCertificates } from '@/data/mockData';

interface CustomerServiceHistoryViewProps {
  customer: any;
  serviceCalls?: any[];
  certificates?: any[];
  isLoading?: boolean;
}

const CustomerServiceHistoryView: React.FC<CustomerServiceHistoryViewProps> = ({
  customer,
  serviceCalls = [],
  certificates = [],
  isLoading = false
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  // Use local mock data for faster loading and better demo experience
  const useLocalMockData = true;
  
  // Get service calls and certificates for this customer from mock data
  const customerServiceCalls = useLocalMockData 
    ? mockServiceCallsExtended.filter(call => call.customer === customer.id)
    : serviceCalls;
    
  const customerCertificates = useLocalMockData
    ? mockCertificates.filter(cert => cert.customer === customer.id)
    : certificates;
  
  // Combine service calls and certificates for the All tab
  const allItems = [
    ...customerServiceCalls.map(call => ({
      ...call,
      type: 'service-call',
      date: new Date(call.date),
    })),
    ...customerCertificates.map(cert => ({
      ...cert,
      type: 'certificate',
      date: new Date(cert.date),
    }))
  ];
  
  // Sort items by date
  const sortedItems = [...allItems].sort((a, b) => {
    if (sortDirection === "desc") {
      return b.date.getTime() - a.date.getTime();
    } else {
      return a.date.getTime() - b.date.getTime();
    }
  });
  
  // Filter items based on search term and status filter
  const filteredItems = sortedItems.filter(item => {
    // Filter by search term
    const matchesSearch = 
      searchTerm === "" ||
      (item.serviceType && item.serviceType.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.service_details && item.service_details.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by status
    const matchesStatus = 
      statusFilter === "all" ||
      item.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Filter items based on active tab
  const displayedItems = activeTab === "all" 
    ? filteredItems 
    : filteredItems.filter(item => item.type === activeTab);
  
  const handleDownloadCertificate = (id: string) => {
    toast.success("Downloading certificate", {
      description: "Your certificate will be ready shortly."
    });
  };
  
  const handleViewCertificate = (id: string) => {
    toast.success("Opening certificate preview", {
      description: "Preparing certificate for viewing."
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'signed':
        return <Badge className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          {status}
        </Badge>;
      case 'pending':
      case 'scheduled':
      case 'awaiting-signature':
      case 'draft':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-200">
          <Clock className="h-3 w-3 mr-1" />
          {status}
        </Badge>;
      case 'in-progress':
      case 'waiting-signature':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">
          <AlertCircle className="h-3 w-3 mr-1" />
          {status}
        </Badge>;
      case 'canceled':
      case 'without-signature':
        return <Badge className="bg-red-100 text-red-800 border-red-200">
          <XCircle className="h-3 w-3 mr-1" />
          {status}
        </Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getServiceTypeLabel = (type: string) => {
    if (!type) return 'N/A';
    
    const typeMap: Record<string, string> = {
      'concrete-pumping': 'Concrete Pumping',
      'line-pumping': 'Line Pumping',
      'boom-lift': 'Boom Lift',
      'material-delivery': 'Material Delivery',
    };
    
    return typeMap[type] || type;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Service History</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSortDirection(sortDirection === "desc" ? "asc" : "desc")}
          >
            Sort: {sortDirection === "desc" ? "Newest first" : "Oldest first"}
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Search service history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>
        </div>
        
        <div className="w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="signed">Signed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="awaiting-signature">Awaiting Signature</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="service-call">Service Calls</TabsTrigger>
          <TabsTrigger value="certificate">Certificates</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Card key={i} className="p-5">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </Card>
              ))}
            </div>
          ) : displayedItems.length === 0 ? (
            <div className="text-center py-12 border rounded-lg bg-gray-50">
              <div className="mx-auto w-16 h-16 bg-blue-50 flex items-center justify-center rounded-full mb-4">
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-medium">No service history found</h3>
              <p className="text-gray-500 max-w-md mx-auto mt-2">
                {activeTab === "all" 
                  ? "No service calls or certificates found for this customer." 
                  : activeTab === "service-call"
                    ? "No service calls found for this customer."
                    : "No certificates found for this customer."}
              </p>
              {searchTerm || statusFilter !== "all" ? (
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              ) : null}
            </div>
          ) : (
            <div className="space-y-4">
              {displayedItems.map(item => (
                <Card key={`${item.type}-${item.id}`} className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-lg">
                          {item.type === 'service-call' 
                            ? getServiceTypeLabel(item.serviceType) 
                            : 'Delivery Certificate'}
                        </h4>
                        <Badge variant="outline" className="bg-gray-50">
                          {item.type === 'service-call' ? 'Service Call' : 'Certificate'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {format(new Date(item.date), 'MMM d, yyyy')}
                        {item.type === 'service-call' && item.endDate && (
                          <> - {format(new Date(item.endDate), 'h:mm a')}</>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(item.status)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {item.type === 'certificate' ? (
                            <>
                              <DropdownMenuItem onClick={() => handleViewCertificate(item.id)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Certificate
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownloadCertificate(item.id)}>
                                <Download className="h-4 w-4 mr-2" />
                                Download PDF
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Printer className="h-4 w-4 mr-2" />
                                Print Certificate
                              </DropdownMenuItem>
                            </>
                          ) : (
                            <>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {item.type === 'service-call' && (
                      <>
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-500 mr-2" />
                          <div>
                            <p className="text-xs text-gray-500">Operator</p>
                            <p className="text-sm font-medium">{item.operator}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                          <div>
                            <p className="text-xs text-gray-500">Project Site</p>
                            <p className="text-sm font-medium">{item.projectSite || 'N/A'}</p>
                          </div>
                        </div>
                        
                        {item.notes && (
                          <div className="flex items-start col-span-1 md:col-span-2 lg:col-span-3">
                            <FileText className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500">Notes</p>
                              <p className="text-sm">{item.notes}</p>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    
                    {item.type === 'certificate' && (
                      <>
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-gray-500 mr-2" />
                          <div>
                            <p className="text-xs text-gray-500">Operator</p>
                            <p className="text-sm font-medium">{item.operator}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-gray-500 mr-2" />
                          <div>
                            <p className="text-xs text-gray-500">Service Hours</p>
                            <p className="text-sm font-medium">{item.service_hours} hours</p>
                          </div>
                        </div>
                        
                        {item.signature_type && (
                          <div className="flex items-center">
                            <ClipboardSignature className="h-4 w-4 text-gray-500 mr-2" />
                            <div>
                              <p className="text-xs text-gray-500">Signature Type</p>
                              <p className="text-sm font-medium capitalize">{item.signature_type}</p>
                            </div>
                          </div>
                        )}
                        
                        {item.service_details && (
                          <div className="flex items-start col-span-1 md:col-span-2 lg:col-span-3">
                            <FileText className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                            <div>
                              <p className="text-xs text-gray-500">Service Details</p>
                              <p className="text-sm">{item.service_details}</p>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerServiceHistoryView;
