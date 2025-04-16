
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Building, 
  CreditCard, 
  Calendar, 
  CheckCircle, 
  Globe, 
  Info, 
  Briefcase, 
  Save, 
  X, 
  FileText 
} from 'lucide-react';
import QuoteModal from './QuoteModal';

// Define schema for form validation
const customerFormSchema = z.object({
  name: z.string().min(2, { message: "Company name must be at least 2 characters." }),
  nickname: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(6, { message: "Phone number must be at least 6 characters." }),
  officePhone: z.string().optional(),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  address2: z.string().optional(),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  zipCode: z.string().min(4, { message: "Zip code must be at least 4 characters." }),
  country: z.string().optional(),
  type: z.string(),
  status: z.string(),
  contactName: z.string().min(2, { message: "Contact name must be at least 2 characters." }),
  contactEmail: z.string().email({ message: "Please enter a valid contact email address." }),
  contactPhone: z.string().min(6, { message: "Contact phone must be at least 6 characters." }),
  contactPosition: z.string().optional(),
  website: z.string().optional(),
  taxId: z.string().optional(),
  notes: z.string().optional(),
  paymentTerms: z.string().optional(),
  customerSince: z.string().optional(),
  documentsRequired: z.string().optional(),
});

interface CustomerCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: any;
  isEditMode?: boolean;
}

const CustomerCreationModal: React.FC<CustomerCreationModalProps> = ({ 
  isOpen, 
  onClose, 
  customer, 
  isEditMode = false 
}) => {
  const [activeTab, setActiveTab] = useState('company');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  
  // Initialize form with default values
  const form = useForm<z.infer<typeof customerFormSchema>>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      nickname: "",
      email: "",
      phone: "",
      officePhone: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      type: "business",
      status: "active",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      contactPosition: "",
      website: "",
      taxId: "",
      notes: "",
      paymentTerms: "Net 30",
      customerSince: new Date().toISOString().split('T')[0],
      documentsRequired: "Standard Documentation",
    },
  });

  // If in edit mode, populate form with customer data
  useEffect(() => {
    if (isEditMode && customer) {
      form.reset({
        name: customer.name || "",
        nickname: customer.nickname || "",
        email: customer.email || "",
        phone: customer.phone || "",
        officePhone: customer.officePhone || "",
        address: customer.address || "",
        address2: customer.address2 || "",
        city: customer.city || "",
        state: customer.state || "",
        zipCode: customer.zipCode || "",
        country: customer.country || "United States",
        type: customer.type || "business",
        status: customer.status || "active",
        contactName: customer.contactName || "",
        contactEmail: customer.contactEmail || customer.email || "",
        contactPhone: customer.contactPhone || customer.phone || "",
        contactPosition: customer.contactPosition || "",
        website: customer.website || "",
        taxId: customer.taxId || "",
        notes: customer.notes || "",
        paymentTerms: customer.paymentTerms || "Net 30",
        customerSince: customer.customerSince || new Date().toISOString().split('T')[0],
        documentsRequired: customer.documentsRequired || "Standard Documentation",
      });
    }
  }, [isEditMode, customer, form]);

  // Handle form submission
  const onSubmit = (values: z.infer<typeof customerFormSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form values:', values);
      
      // Show success toast
      toast.success(isEditMode ? "Customer updated successfully" : "Customer created successfully", {
        description: `${values.name} has been ${isEditMode ? "updated" : "added"} to your customers.`,
      });
      
      setIsSubmitting(false);
      
      // If not in edit mode, show option to create price agreement
      if (!isEditMode) {
        setShowQuoteModal(true);
      } else {
        onClose();
      }
    }, 800);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Building2 className="h-5 w-5 text-blue-600" />
              </div>
              {isEditMode ? "Edit Customer" : "New Customer"}
            </DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Tabs defaultValue="company" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="company">Company Info</TabsTrigger>
                  <TabsTrigger value="contact">Contact Details</TabsTrigger>
                  <TabsTrigger value="additional">Additional Info</TabsTrigger>
                </TabsList>
                
                <TabsContent value="company" className="space-y-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Building2 className="h-4 w-4 mr-1.5 text-blue-600" />
                            Company Name <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="nickname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Building className="h-4 w-4 mr-1.5 text-blue-600" />
                            Company Nickname
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="border-gray-200" />
                          </FormControl>
                          <FormDescription>
                            A shorter name for internal reference
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Mail className="h-4 w-4 mr-1.5 text-blue-600" />
                            Email <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="email" className="border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Globe className="h-4 w-4 mr-1.5 text-blue-600" />
                            Website
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Phone className="h-4 w-4 mr-1.5 text-blue-600" />
                            Phone <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" className="border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="officePhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Phone className="h-4 w-4 mr-1.5 text-blue-600" />
                            Office Phone
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" className="border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1.5 text-blue-600" />
                            Address <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1.5 text-blue-600" />
                            Address Line 2
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1.5 text-blue-600" />
                              City <span className="text-red-500 ml-1">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input {...field} className="border-gray-200" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1.5 text-blue-600" />
                              State <span className="text-red-500 ml-1">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input {...field} className="border-gray-200" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1.5 text-blue-600" />
                              Zip Code <span className="text-red-500 ml-1">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input {...field} className="border-gray-200" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1.5 text-blue-600" />
                            Country
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="contact" className="space-y-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <User className="h-4 w-4 mr-1.5 text-blue-600" />
                            Contact Name <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactPosition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1.5 text-blue-600" />
                            Position
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="contactEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Mail className="h-4 w-4 mr-1.5 text-blue-600" />
                            Contact Email <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="email" className="border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Phone className="h-4 w-4 mr-1.5 text-blue-600" />
                            Contact Phone <span className="text-red-500 ml-1">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" className="border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="additional" className="space-y-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Building2 className="h-4 w-4 mr-1.5 text-blue-600" />
                            Customer Type
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-gray-200">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="business">Business</SelectItem>
                              <SelectItem value="individual">Individual</SelectItem>
                              <SelectItem value="government">Government</SelectItem>
                              <SelectItem value="non-profit">Non-Profit</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1.5 text-blue-600" />
                            Status
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-gray-200">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                              <SelectItem value="prospect">Prospect</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="taxId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-1.5 text-blue-600" />
                            Tax ID
                          </FormLabel>
                          <FormControl>
                            <Input {...field} className="border-gray-200" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="paymentTerms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <CreditCard className="h-4 w-4 mr-1.5 text-blue-600" />
                            Payment Terms
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-gray-200">
                                <SelectValue placeholder="Select payment terms" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Net 15">Net 15</SelectItem>
                              <SelectItem value="Net 30">Net 30</SelectItem>
                              <SelectItem value="Net 45">Net 45</SelectItem>
                              <SelectItem value="Net 60">Net 60</SelectItem>
                              <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="customerSince"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1.5 text-blue-600" />
                            Customer Since
                          </FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="date" 
                              className="border-gray-200" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="documentsRequired"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center">
                            <FileText className="h-4 w-4 mr-1.5 text-blue-600" />
                            Documents Required
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-gray-200">
                                <SelectValue placeholder="Select documents required" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Standard Documentation">Standard Documentation</SelectItem>
                              <SelectItem value="Extended Documentation">Extended Documentation</SelectItem>
                              <SelectItem value="Minimal Documentation">Minimal Documentation</SelectItem>
                              <SelectItem value="Custom Documentation">Custom Documentation</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          <Info className="h-4 w-4 mr-1.5 text-blue-600" />
                          Notes
                        </FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field} 
                            className="border-gray-200 min-h-[100px]" 
                            placeholder="Enter any additional notes about this customer"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {activeTab === "company" ? (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setActiveTab("contact")}
                      className="ml-auto"
                    >
                      Next: Contact Details
                    </Button>
                  ) : activeTab === "contact" ? (
                    <>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setActiveTab("company")}
                      >
                        Back: Company Info
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setActiveTab("additional")}
                      >
                        Next: Additional Info
                      </Button>
                    </>
                  ) : (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setActiveTab("contact")}
                    >
                      Back: Contact Details
                    </Button>
                  )}
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    type="button" 
                    variant="ghost"
                    onClick={onClose}
                    disabled={isSubmitting}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {isEditMode ? "Updating..." : "Creating..."}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        {isEditMode ? "Update Customer" : "Create Customer"}
                      </>
                    )}
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Price Agreement Modal (for new customers only) */}
      {showQuoteModal && (
        <QuoteModal
          isOpen={showQuoteModal}
          onClose={() => {
            setShowQuoteModal(false);
            onClose();
          }}
          onComplete={() => {
            setShowQuoteModal(false);
            onClose();
          }}
          customerId={customer?.id || "new-customer"}
          customerName={form.getValues().name}
          fromCustomerCreation={true}
        />
      )}
    </>
  );
};

export default CustomerCreationModal;
