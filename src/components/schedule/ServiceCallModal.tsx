import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableResponsive
} from '@/components/ui/table';
import { 
  User,
  Check,
  ArrowLeft,
  ArrowRight,
  Maximize,
  Printer,
  Search,
  Filter,
  CalendarIcon,
  List,
  Clock,
  Users,
  UserCircle,
  UserCog,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { createServiceCall, updateServiceCall } from '@/models/ServiceCall';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { ProgressSteps, Step } from "@/components/ui/progress-steps";
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ServiceCallPreview from './ServiceCallPreview';
import { ServiceInfoGameflow } from './ServiceInfoGameflow';
import Avatar from '@/components/Avatar';
import OperatorCalendarPreview from './OperatorCalendarPreview';

export interface ServiceCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceCall?: any;
  onSave?: (data: any) => void;
  onUpdate?: (updatedCall: any) => void;
}

export interface ScheduleCall {
  id: string;
  customer: string;
  address: string;
  date: string;
  endDate: string;
  status: string;
  operator: string;
  serviceType: string;
  notes: string;
  projectSite?: string;
  hourlyBooking?: number | string;
  pumpType?: string;
  quantity?: string;
  vehicleNumber?: string;
  startTime: string;
}

const ServiceCallModal = ({ 
  isOpen, 
  onClose, 
  serviceCall,
  onSave,
  onUpdate
}: ServiceCallModalProps) => {
  const [date, setDate] = useState<Date>(serviceCall ? new Date(serviceCall.date) : new Date());
  const [startTime, setStartTime] = useState(serviceCall ? serviceCall.startTime : '09:00');
  const [serviceType, setServiceType] = useState(serviceCall?.serviceType || 'concrete-pumping');
  const [customer, setCustomer] = useState(serviceCall?.customer || '');
  const [projectSite, setProjectSite] = useState(serviceCall?.projectSite || '');
  const [hourlyBooking, setHourlyBooking] = useState(serviceCall?.hourlyBooking || '0');
  const [pumpType, setPumpType] = useState(serviceCall?.pumpType || '');
  const [quantity, setQuantity] = useState(serviceCall?.quantity || '');
  const [vehicleNumber, setVehicleNumber] = useState(serviceCall?.vehicleNumber || '');
  const [operator, setOperator] = useState(serviceCall?.operator || '');
  const [notes, setNotes] = useState(serviceCall?.notes || '');
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState<string>("service-info");
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [customSites, setCustomSites] = useState<string[]>([]);
  const [operatorFilter, setOperatorFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [activeTabView, setActiveTabView] = useState('list');
  const [showOperatorCalendar, setShowOperatorCalendar] = useState(false);
  const [selectedOperatorId, setSelectedOperatorId] = useState<string>('');
  const [selectedOperatorName, setSelectedOperatorName] = useState<string>('');
  const [showFullDocumentPreview, setShowFullDocumentPreview] = useState(false);

  const steps: Step[] = [
    { id: "service-info", title: "Service Info" },
    { id: "assigned-operator", title: "Assigned Operator" },
    { id: "preview", title: "Preview" }
  ];

  const handleStepClick = (stepId: string) => {
    setActiveStep(stepId);
  };

  const { data: customers = [] } = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('customer_quotes')
        .select('customer_id, title')
        .order('title');
      
      if (error) {
        console.error('Error fetching customers:', error);
        return [];
      }
      
      const uniqueCustomers = Array.from(new Set(data.map(item => item.customer_id)))
        .map(customerId => {
          const customerData = data.find(item => item.customer_id === customerId);
          return {
            id: customerId,
            name: customerData?.title || 'Unknown Customer'
          };
        });
      
      return uniqueCustomers;
    },
    staleTime: 300000
  });

  const { data: operators = [] } = useQuery({
    queryKey: ['operators'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, position')
        .order('full_name');
      
      if (error) {
        console.error('Error fetching operators:', error);
        return [];
      }
      
      return data.filter(user => 
        user.position?.toLowerCase().includes('operator') || 
        user.position?.toLowerCase().includes('technician')
      ).map(user => ({
        id: user.id,
        name: user.full_name || 'Unknown Operator',
        position: user.position || 'Employee'
      }));
    },
    staleTime: 300000
  });

  useEffect(() => {
    setCustomSites(['Jerusalem Central', 'Tel Aviv North', 'Haifa Port', 'Mevaseret Tzion']);
  }, []);

  const validateServiceInfo = () => {
    const errors: {[key: string]: string} = {};
    
    if (!customer) {
      errors.customer = "Please select a customer";
    }
    
    if (!projectSite) {
      errors.projectSite = "Please select a project site";
    }
    
    if (!serviceType) {
      errors.serviceType = "Please select a service type";
    }
    
    if (!pumpType && serviceType === 'concrete-pumping') {
      errors.pumpType = "Please select a pump type";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    if (!validateServiceInfo()) {
      toast.error("Please fill in all required fields", {
        description: "Check the form for errors and try again.",
        duration: 4000,
      });
      return;
    }

    if (!operator) {
      toast.error("Please select an operator", {
        description: "An operator must be assigned to this service call.",
        duration: 4000,
      });
      setActiveStep("assigned-operator");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const startDate = new Date(date);
      const hours = parseInt(hourlyBooking.toString()) || 0;
      const endDate = new Date(startDate);
      endDate.setHours(endDate.getHours() + hours);
      
      const serviceCallData = {
        date: date.toISOString(),
        endDate: endDate.toISOString(),
        startTime,
        serviceType,
        customer,
        projectSite,
        hourlyBooking: parseInt(hourlyBooking.toString()),
        pumpType,
        quantity,
        vehicleNumber,
        operator,
        notes,
        status: serviceCall?.status || 'pending',
        address: serviceCall?.address || ''
      };
      
      console.log('Sending Service Call Data:', {
        ...serviceCallData,
        id: serviceCall?.id ? `Updating existing call: ${serviceCall.id}` : 'Creating new call',
        date: format(new Date(serviceCallData.date), 'yyyy-MM-dd HH:mm'),
        endDate: format(new Date(serviceCallData.endDate), 'yyyy-MM-dd HH:mm')
      });
      
      let result;
      
      if (serviceCall?.id) {
        result = await updateServiceCall(serviceCall.id, serviceCallData);
      } else {
        result = await createServiceCall(serviceCallData as any);
      }
      
      if (onUpdate && serviceCall?.id) {
        onUpdate(result);
      } else if (onSave) {
        onSave(result);
      }
      
      toast.success(serviceCall ? "Service call updated" : "Service call created", {
        description: `Successfully ${serviceCall ? 'updated' : 'created'} service call for ${customer}`,
        duration: 4000,
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving service call:', error);
      toast.error("Something went wrong", {
        description: "There was an error processing your request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintPreview = () => {
    const previewContent = document.getElementById('service-call-preview')?.innerHTML;
    if (!previewContent) return;
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Service Call Print Preview</title>
          <style>
            @page { size: A4; margin: 15mm; }
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              margin: 0; 
              padding: 0;
              color: #1A1F36;
              line-height: 1.5;
            }
            .preview-wrapper {
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(to right, #3366FF, #5B21B6);
              color: white;
              padding: 20px;
              border-radius: 8px 8px 0 0;
            }
            .content {
              padding: 20px;
              border: 1px solid #E9ECF2;
              border-top: none;
              border-radius: 0 0 8px 8px;
            }
            .field {
              display: flex;
              margin-bottom: 15px;
              border-bottom: 1px solid #E9ECF2;
              padding-bottom: 15px;
            }
            .field-label {
              font-size: 14px;
              color: #6E7891;
              width: 150px;
              flex-shrink: 0;
            }
            .field-value {
              font-weight: 500;
              flex: 1;
            }
            .logo {
              text-align: right;
              font-weight: bold;
              font-size: 24px;
              margin-bottom: 20px;
            }
            h1 {
              font-size: 24px;
              margin: 0 0 10px 0;
            }
            h2 {
              font-size: 18px;
              margin: 0 0 20px 0;
              font-weight: normal;
              opacity: 0.9;
            }
          </style>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        </head>
        <body>
          <div class="preview-wrapper">
            <div class="logo">UNIDOC</div>
            <div class="header">
              <h1>Service Call Document</h1>
              <h2>${format(date, 'MMMM d, yyyy')} at ${startTime}</h2>
            </div>
            <div class="content">
              ${previewContent}
            </div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.print();
    }, 500);
  };

  const toggleFullPreview = () => {
    setShowFullPreview(!showFullPreview);
  };

  const handleNextStep = () => {
    if (activeStep === "service-info" && !validateServiceInfo()) {
      toast.error("Please fix the errors before continuing", {
        description: "Check the form for errors and try again.",
      });
      return;
    }
    
    if (activeStep === "assigned-operator" && !operator) {
      setFormErrors({...formErrors, operator: "Please select an operator"});
      toast.error("Please select an operator", {
        description: "An operator must be assigned to the service call.",
      });
      return;
    }
    
    const currentIndex = steps.findIndex(step => step.id === activeStep);
    if (currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1].id);
    }
  };

  const handlePrevStep = () => {
    const currentIndex = steps.findIndex(step => step.id === activeStep);
    if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1].id);
    }
  };

  const handleViewOperatorCalendar = (operatorId: string, operatorName: string) => {
    setSelectedOperatorId(operatorId);
    setSelectedOperatorName(operatorName);
    setShowOperatorCalendar(true);
  };

  const filteredOperators = operators.filter((op) => {
    const matchesSearch = op.name.toLowerCase().includes(operatorFilter.toLowerCase());
    
    if (activeCategory === 'all') {
      return matchesSearch;
    } else if (activeCategory === 'me') {
      return matchesSearch && op.position.includes('Manager');
    } else if (activeCategory === 'employees') {
      return matchesSearch && op.position.includes('Operator');
    } else if (activeCategory === 'subcontractors') {
      return matchesSearch && op.position.includes('Subcontractor');
    }
    
    return matchesSearch;
  });

  const serviceCallData = {
    id: serviceCall?.id || Math.random().toString(36).substring(7),
    date: date.toISOString(),
    startTime,
    serviceType,
    customer,
    projectSite,
    hourlyBooking,
    pumpType,
    quantity,
    vehicleNumber,
    operator,
    notes,
    status: serviceCall?.status || 'pending',
    endDate: '',
  };

  const renderAssignedOperatorStep = () => {
    const generateAvailabilityData = (operators: any[]) => {
      const result = new Map();
      operators.forEach(op => {
        result.set(op.id, Math.random() > 0.3);
      });
      return result;
    };

    const availabilityData = [
      { id: 'employee1', name: 'John Smith', position: 'Operator', status: 'available', avatar: '' },
      { id: 'employee2', name: 'Sarah Johnson', position: 'Operator', status: 'busy', avatar: '' },
      { id: 'employee3', name: 'Mike Wilson', position: 'Operator', status: 'available', avatar: '' },
      { id: 'employee4', name: 'Emma Davis', position: 'Operator', status: 'offline', avatar: '' },
      { id: 'subcontractor1', name: 'Robert Brown', position: 'Subcontractor', status: 'available', avatar: '' },
      { id: 'subcontractor2', name: 'Jennifer Lee', position: 'Subcontractor', status: 'busy', avatar: '' },
      { id: 'manager1', name: 'David Cohen', position: 'Manager (You)', status: 'available', avatar: '' },
    ];

    const operatorList = operators.length > 0 ? operators : availabilityData.map(op => ({
      id: op.id,
      name: op.name,
      position: op.position
    }));

    const availabilityMap = generateAvailabilityData(operatorList);

    const getFilteredOperators = () => {
      return operatorList.filter((op) => {
        const matchesSearch = op.name.toLowerCase().includes(operatorFilter.toLowerCase());
        
        if (activeCategory === 'all') {
          return matchesSearch;
        } else if (activeCategory === 'me') {
          return matchesSearch && op.position.includes('Manager');
        } else if (activeCategory === 'employees') {
          return matchesSearch && op.position.includes('Operator');
        } else if (activeCategory === 'subcontractors') {
          return matchesSearch && op.position.includes('Subcontractor');
        }
        
        return matchesSearch;
      });
    };

    const filteredOperators = getFilteredOperators();

    const formattedDate = format(date, 'MMMM d, yyyy');

    return (
      <div className="space-y-5">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 bg-blue-50 border-b border-gray-200">
            <h3 className="font-semibold text-lg">Assign Operator for Service Call</h3>
            <p className="text-sm text-gray-500">
              {formattedDate} at {startTime} • {projectSite || 'Location not specified'}
            </p>
          </div>
          
          <div className="p-4">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search operators..."
                  className="pl-9 border-gray-200"
                  value={operatorFilter}
                  onChange={(e) => setOperatorFilter(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={activeTabView === 'list' ? 'default' : 'outline'}
                  className="px-3"
                  onClick={() => setActiveTabView('list')}
                >
                  <List className="h-4 w-4 mr-1" />
                  List
                </Button>
                <Button
                  size="sm"
                  variant={activeTabView === 'calendar' ? 'default' : 'outline'}
                  className="px-3"
                  onClick={() => setActiveTabView('calendar')}
                >
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  Calendar
                </Button>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mb-4 overflow-x-auto py-1">
              <Button
                size="sm"
                variant={activeCategory === 'all' ? 'default' : 'outline'}
                className="px-3 whitespace-nowrap"
                onClick={() => setActiveCategory('all')}
              >
                <Users className="h-4 w-4 mr-1.5" />
                All
              </Button>
              <Button
                size="sm"
                variant={activeCategory === 'me' ? 'default' : 'outline'}
                className="px-3 whitespace-nowrap"
                onClick={() => setActiveCategory('me')}
              >
                <UserCircle className="h-4 w-4 mr-1.5" />
                Me
              </Button>
              <Button
                size="sm"
                variant={activeCategory === 'employees' ? 'default' : 'outline'}
                className="px-3 whitespace-nowrap"
                onClick={() => setActiveCategory('employees')}
              >
                <User className="h-4 w-4 mr-1.5" />
                Employees
              </Button>
              <Button
                size="sm"
                variant={activeCategory === 'subcontractors' ? 'default' : 'outline'}
                className="px-3 whitespace-nowrap"
                onClick={() => setActiveCategory('subcontractors')}
              >
                <UserCog className="h-4 w-4 mr-1.5" />
                Subcontractors
              </Button>
            </div>
            
            {formErrors.operator && (
              <div className="flex items-center gap-2 mb-4 p-2 bg-red-50 text-red-600 rounded-md text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>{formErrors.operator}</span>
              </div>
            )}
            
            <Tabs value={activeTabView} onValueChange={setActiveTabView}>
              <TabsContent value="list">
                <TableResponsive>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Operator</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Availability</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOperators.length > 0 ? (
                        filteredOperators.map((op) => {
                          const isAvailable = availabilityMap.get(op.id);
                          const isSelected = operator === op.id;
                          
                          return (
                            <TableRow key={op.id} className={isSelected ? "bg-blue-50" : ""}>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar alt={op.name} size="sm" />
                                  <span className="font-medium">{op.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>{op.position}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-1.5">
                                  <div className={`h-2.5 w-2.5 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                  <span>{isAvailable ? 'Available' : 'Busy'}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant={isSelected ? "default" : "outline"}
                                    onClick={() => {
                                      setOperator(op.id);
                                      setFormErrors({...formErrors, operator: ""});
                                    }}
                                  >
                                    {isSelected ? (
                                      <>
                                        <Check className="h-3.5 w-3.5 mr-1.5" />
                                        Selected
                                      </>
                                    ) : (
                                      "Assign"
                                    )}
                                  </Button>
                                  
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleViewOperatorCalendar(op.id, op.name)}
                                  >
                                    <Calendar className="h-3.5 w-3.5 mr-1.5" />
                                    View Calendar
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                            No operators match your search criteria
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableResponsive>
              </TabsContent>
              
              <TabsContent value="calendar">
                <div className="border rounded-md p-4 text-center bg-gray-50">
                  <div className="flex items-center justify-center mb-4">
                    <Button variant="outline" size="sm" className="mr-2">
                      <ArrowLeft className="h-4 w-4 mr-1" />
                      Previous day
                    </Button>
                    <h3 className="text-base font-medium px-4">{formattedDate}</h3>
                    <Button variant="outline" size="sm" className="ml-2">
                      Next day
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {filteredOperators.slice(0, 3).map((op) => {
                      const isAvailable = availabilityMap.get(op.id);
                      const isSelected = operator === op.id;
                      
                      return (
                        <div 
                          key={op.id}
                          className={`border rounded-md p-4 ${isSelected ? 'border-blue-500 bg-blue-50' : 'bg-white'}`}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar alt={op.name} size="md" />
                            <div className="text-left">
                              <h4 className="font-medium">{op.name}</h4>
                              <div className="flex items-center gap-1.5 text-sm">
                                <div className={`h-2 w-2 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                <span className={isAvailable ? 'text-green-600' : 'text-red-600'}>
                                  {isAvailable ? 'Available' : 'Busy'}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="border-t border-b py-3 my-3">
                            <div className="flex flex-col gap-1 text-sm">
                              <div className="flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100">
                                <span>08:00 - 10:00</span>
                                <span className="text-green-600">Available</span>
                              </div>
                              <div className="flex justify-between items-center px-2 py-1 rounded bg-blue-100">
                                <span>10:00 - 12:00</span>
                                <span className="text-blue-600">Selected</span>
                              </div>
                              <div className="flex justify-between items-center px-2 py-1 rounded hover:bg-gray-100">
                                <span>13:00 - 15:00</span>
                                <span className="text-green-600">Available</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Button
                              className="w-full"
                              variant={isSelected ? "default" : "outline"}
                              onClick={() => {
                                setOperator(op.id);
                                setFormErrors({...formErrors, operator: ""});
                              }}
                            >
                              {isSelected ? (
                                <>
                                  <Check className="h-4 w-4 mr-1.5" />
                                  Selected
                                </>
                              ) : (
                                "Assign Operator"
                              )}
                            </Button>
                            <Button
                              className="w-full"
                              variant="outline"
                              onClick={() => handleViewOperatorCalendar(op.id, op.name)}
                            >
                              <Calendar className="h-4 w-4 mr-1.5" />
                              View Full Calendar
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  };

  const renderPreviewStep = () => {
    return (
      <div className="space-y-5">
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 flex justify-between items-center border-b">
            <h3 className="font-medium">Service Call Preview</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrintPreview}>
                <Printer className="h-4 w-4 mr-1.5" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={toggleFullPreview}>
                <Maximize className="h-4 w-4 mr-1.5" />
                {showFullPreview ? 'Minimize' : 'Full Preview'}
              </Button>
            </div>
          </div>
          
          <div className={`p-4 ${showFullPreview ? 'h-[600px]' : 'h-[400px]'} overflow-auto`}>
            <div id="service-call-preview">
              <ServiceCallPreview serviceCallData={serviceCallData} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {serviceCall ? 'Edit Service Call' : 'Create New Service Call'}
            </DialogTitle>
            <div className="mt-2">
              <ProgressSteps
                steps={steps}
                currentStep={activeStep}
                onStepClick={handleStepClick}
                className="p-2"
              />
            </div>
          </DialogHeader>
          
          <div className="py-4">
            {activeStep === "service-info" && (
              <ServiceInfoGameflow
                date={date}
                setDate={setDate}
                startTime={startTime}
                setStartTime={setStartTime}
                serviceType={serviceType}
                setServiceType={setServiceType}
                customer={customer}
                setCustomer={setCustomer}
                projectSite={projectSite}
                setProjectSite={setProjectSite}
                hourlyBooking={hourlyBooking}
                setHourlyBooking={setHourlyBooking}
                pumpType={pumpType}
                setPumpType={setPumpType}
                quantity={quantity}
                setQuantity={setQuantity}
                vehicleNumber={vehicleNumber}
                setVehicleNumber={setVehicleNumber}
                operator={operator}
                setOperator={setOperator}
                notes={notes}
                setNotes={setNotes}
                customers={customers}
                customSites={customSites}
                setCustomSites={setCustomSites}
                validateServiceInfo={validateServiceInfo}
                onAdvance={handleNextStep}
              />
            )}
            {activeStep === "assigned-operator" && renderAssignedOperatorStep()}
            {activeStep === "preview" && renderPreviewStep()}
          </div>
          
          <DialogFooter className="flex justify-between items-center border-t pt-4">
            <Button 
              variant="outline" 
              onClick={activeStep === "service-info" ? onClose : handlePrevStep}
            >
              {activeStep === "service-info" ? 'Cancel' : (
                <>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </>
              )}
            </Button>
            
            <div className="flex gap-2">
              {activeStep === "preview" ? (
                <Button 
                  onClick={handleSave} 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Saving..."
                  ) : (
                    serviceCall ? 'Update Service Call' : 'Create Service Call'
                  )}
                </Button>
              ) : activeStep === "service-info" ? null : (
                <Button onClick={handleNextStep}>
                  Next Step
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <OperatorCalendarPreview 
        isOpen={showOperatorCalendar}
        onClose={() => setShowOperatorCalendar(false)}
        operatorId={selectedOperatorId}
        operatorName={selectedOperatorName}
        currentDate={date}
      />
      
      <Dialog open={showFullDocumentPreview} onOpenChange={setShowFullDocumentPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Service Call Document Preview</DialogTitle>
          </DialogHeader>
          <div className="p-6 overflow-y-auto">
            <div className="bg-white rounded-lg border shadow-sm">
              <ServiceCallPreview serviceCallData={serviceCallData} />
            </div>
          </div>
          <DialogFooter className="p-4 border-t">
            <Button variant="outline" onClick={() => setShowFullDocumentPreview(false)}>Close</Button>
            <Button onClick={handlePrintPreview}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServiceCallModal;
