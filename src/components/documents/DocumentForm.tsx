
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Trash2, Plus, Save } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface DocumentFormProps {
  documentType: string;
  onDocumentTypeChange: (type: string) => void;
  formData: any;
  onChange: (data: any) => void;
  onClearData: () => void;
}

const DocumentForm = ({ 
  documentType, 
  onDocumentTypeChange, 
  formData, 
  onChange, 
  onClearData 
}: DocumentFormProps) => {
  const [serviceItems, setServiceItems] = useState([{ id: 1, description: '', quantity: 1, unit: 'hours' }]);
  
  useEffect(() => {
    // Reset service items when document type changes
    if (documentType === 'service-call' || documentType === 'delivery-certificate') {
      if (formData.serviceItems) {
        setServiceItems(formData.serviceItems);
      } else {
        setServiceItems([{ id: 1, description: '', quantity: 1, unit: 'hours' }]);
      }
    }
  }, [documentType, formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleDateChange = (date, fieldName) => {
    onChange({ [fieldName]: date });
  };

  const handleSelectChange = (value, name) => {
    onChange({ [name]: value });
  };

  const handleServiceItemChange = (index, field, value) => {
    const updatedItems = [...serviceItems];
    updatedItems[index][field] = value;
    setServiceItems(updatedItems);
    onChange({ serviceItems: updatedItems });
  };

  const addServiceItem = () => {
    const newItem = { 
      id: serviceItems.length > 0 ? Math.max(...serviceItems.map(item => item.id)) + 1 : 1, 
      description: '', 
      quantity: 1, 
      unit: 'hours' 
    };
    const updatedItems = [...serviceItems, newItem];
    setServiceItems(updatedItems);
    onChange({ serviceItems: updatedItems });
  };

  const removeServiceItem = (index) => {
    if (serviceItems.length <= 1) {
      toast.error("You must have at least one service item");
      return;
    }
    const updatedItems = serviceItems.filter((_, i) => i !== index);
    setServiceItems(updatedItems);
    onChange({ serviceItems: updatedItems });
  };

  const handleSaveAsTemplate = () => {
    // This would be implemented to save the current form as a custom template
    toast.success("Template saved successfully!");
  };

  const renderCustomerFields = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="customerName">Company Name</Label>
        <Input 
          id="customerName" 
          name="customerName" 
          value={formData.customerName || ''} 
          onChange={handleInputChange}
          placeholder="Enter company name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="customerAddress">Company Address</Label>
        <Input 
          id="customerAddress" 
          name="customerAddress" 
          value={formData.customerAddress || ''} 
          onChange={handleInputChange}
          placeholder="Enter company address"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contactPerson">Contact Person</Label>
          <Input 
            id="contactPerson" 
            name="contactPerson" 
            value={formData.contactPerson || ''} 
            onChange={handleInputChange}
            placeholder="Enter contact name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="telephone">Telephone</Label>
          <Input 
            id="telephone" 
            name="telephone" 
            value={formData.telephone || ''} 
            onChange={handleInputChange}
            placeholder="Enter telephone number"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email" 
          name="email" 
          type="email" 
          value={formData.email || ''} 
          onChange={handleInputChange}
          placeholder="Enter email address"
        />
      </div>
      
      {(documentType === 'service-call' || documentType === 'delivery-certificate') && (
        <div className="space-y-2">
          <Label htmlFor="projectSite">Project Site (if different from company address)</Label>
          <Input 
            id="projectSite" 
            name="projectSite" 
            value={formData.projectSite || ''} 
            onChange={handleInputChange}
            placeholder="Enter project site address"
          />
        </div>
      )}
    </div>
  );

  const renderServiceFields = () => {
    if (documentType !== 'service-call' && documentType !== 'delivery-certificate') {
      return null;
    }
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="serviceDate">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.serviceDate ? format(formData.serviceDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.serviceDate}
                  onSelect={(date) => handleDateChange(date, 'serviceDate')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="serviceTime">Time</Label>
            <Input 
              id="serviceTime" 
              name="serviceTime" 
              type="time" 
              value={formData.serviceTime || ''} 
              onChange={handleInputChange}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="serviceType">Service Type</Label>
          <Select 
            value={formData.serviceType || ''} 
            onValueChange={(value) => handleSelectChange(value, 'serviceType')}
          >
            <SelectTrigger id="serviceType">
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="concrete-pumping">Concrete Pumping</SelectItem>
              <SelectItem value="excavation">Excavation</SelectItem>
              <SelectItem value="demolition">Demolition</SelectItem>
              <SelectItem value="transportation">Transportation</SelectItem>
              <SelectItem value="equipment-rental">Equipment Rental</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="assignedOperator">Assigned Operator</Label>
          <Select 
            value={formData.assignedOperator || ''} 
            onValueChange={(value) => handleSelectChange(value, 'assignedOperator')}
          >
            <SelectTrigger id="assignedOperator">
              <SelectValue placeholder="Select operator" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="john-doe">John Doe</SelectItem>
              <SelectItem value="jane-smith">Jane Smith</SelectItem>
              <SelectItem value="bob-johnson">Bob Johnson</SelectItem>
              <SelectItem value="sarah-williams">Sarah Williams</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select 
            value={formData.status || ''} 
            onValueChange={(value) => handleSelectChange(value, 'status')}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="awaiting-signature">Awaiting Signature</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Service Items</Label>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={addServiceItem}
              className="h-8 text-blue-600"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Item
            </Button>
          </div>
          
          <div className="space-y-3">
            {serviceItems.map((item, index) => (
              <div key={item.id} className="flex gap-2 items-start">
                <div className="flex-grow">
                  <Input
                    placeholder="Item description"
                    value={item.description}
                    onChange={(e) => handleServiceItemChange(index, 'description', e.target.value)}
                  />
                </div>
                <div className="w-20">
                  <Input
                    type="number"
                    min="1"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => handleServiceItemChange(index, 'quantity', parseInt(e.target.value))}
                  />
                </div>
                <div className="w-24">
                  <Select
                    value={item.unit}
                    onValueChange={(value) => handleServiceItemChange(index, 'unit', value)}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                      <SelectItem value="units">Units</SelectItem>
                      <SelectItem value="cubic-meters">Cubic Meters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeServiceItem(index)}
                  className="text-red-500"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea 
            id="notes" 
            name="notes" 
            value={formData.notes || ''} 
            onChange={handleInputChange}
            placeholder="Enter additional notes or special instructions"
            rows={4}
          />
        </div>
      </div>
    );
  };
  
  const renderReportFields = () => {
    if (documentType !== 'report') {
      return null;
    }
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="reportStartDate">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.reportStartDate ? format(formData.reportStartDate, 'PPP') : <span>Pick a start date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.reportStartDate}
                  onSelect={(date) => handleDateChange(date, 'reportStartDate')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="reportEndDate">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.reportEndDate ? format(formData.reportEndDate, 'PPP') : <span>Pick an end date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.reportEndDate}
                  onSelect={(date) => handleDateChange(date, 'reportEndDate')}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="reportType">Report Type</Label>
          <Select 
            value={formData.reportType || ''} 
            onValueChange={(value) => handleSelectChange(value, 'reportType')}
          >
            <SelectTrigger id="reportType">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="custom">Custom Period</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="filterBy">Filter By</Label>
          <Select 
            value={formData.filterBy || ''} 
            onValueChange={(value) => handleSelectChange(value, 'filterBy')}
          >
            <SelectTrigger id="filterBy">
              <SelectValue placeholder="Select filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
              <SelectItem value="service-type">Service Type</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {formData.filterBy === 'customer' && (
          <div className="space-y-2">
            <Label htmlFor="customerFilter">Select Customer</Label>
            <Select 
              value={formData.customerFilter || ''} 
              onValueChange={(value) => handleSelectChange(value, 'customerFilter')}
            >
              <SelectTrigger id="customerFilter">
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="company-a">Company A</SelectItem>
                <SelectItem value="company-b">Company B</SelectItem>
                <SelectItem value="company-c">Company C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        {formData.filterBy === 'employee' && (
          <div className="space-y-2">
            <Label htmlFor="employeeFilter">Select Employee</Label>
            <Select 
              value={formData.employeeFilter || ''} 
              onValueChange={(value) => handleSelectChange(value, 'employeeFilter')}
            >
              <SelectTrigger id="employeeFilter">
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john-doe">John Doe</SelectItem>
                <SelectItem value="jane-smith">Jane Smith</SelectItem>
                <SelectItem value="bob-johnson">Bob Johnson</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        {formData.filterBy === 'service-type' && (
          <div className="space-y-2">
            <Label htmlFor="serviceTypeFilter">Select Service Type</Label>
            <Select 
              value={formData.serviceTypeFilter || ''} 
              onValueChange={(value) => handleSelectChange(value, 'serviceTypeFilter')}
            >
              <SelectTrigger id="serviceTypeFilter">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="concrete-pumping">Concrete Pumping</SelectItem>
                <SelectItem value="excavation">Excavation</SelectItem>
                <SelectItem value="demolition">Demolition</SelectItem>
                <SelectItem value="transportation">Transportation</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="reportFormat">Report Format</Label>
          <Select 
            value={formData.reportFormat || ''} 
            onValueChange={(value) => handleSelectChange(value, 'reportFormat')}
          >
            <SelectTrigger id="reportFormat">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tabular">Tabular</SelectItem>
              <SelectItem value="graphical">Graphical</SelectItem>
              <SelectItem value="combined">Combined</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Document Type</Label>
        <Tabs 
          defaultValue={documentType} 
          onValueChange={onDocumentTypeChange}
          className="w-full"
        >
          <TabsList className="grid grid-cols-3 md:grid-cols-5 w-full">
            <TabsTrigger value="service-call">Service Call</TabsTrigger>
            <TabsTrigger value="delivery-certificate">Delivery Certificate</TabsTrigger>
            <TabsTrigger value="report">Report</TabsTrigger>
            <TabsTrigger value="customer-report">Customer Report</TabsTrigger>
            <TabsTrigger value="employee-report">Employee Report</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Customer Information</h3>
        {renderCustomerFields()}
      </div>
      
      {(documentType === 'service-call' || documentType === 'delivery-certificate') && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Service Details</h3>
          {renderServiceFields()}
        </div>
      )}
      
      {documentType === 'report' && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Report Details</h3>
          {renderReportFields()}
        </div>
      )}
      
      <div className="flex justify-between">
        <Button 
          variant="destructive" 
          onClick={onClearData}
          className="flex items-center gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Clear Data
        </Button>
        <Button 
          variant="outline" 
          onClick={handleSaveAsTemplate}
          className="flex items-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save as Template
        </Button>
      </div>
    </div>
  );
};

export default DocumentForm;
