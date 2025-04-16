
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from 'sonner';
import { Building2, Mail, Phone, MapPin, User, Check } from 'lucide-react';

export interface CustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: any;
  isEditMode?: boolean;
}

const CustomerModal = ({ isOpen, onClose, customer, isEditMode = false }: CustomerModalProps) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Company name must be at least 2 characters.",
    }),
    nickname: z.string().optional(),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phone: z.string().min(6, {
      message: "Phone number must be at least 6 characters.",
    }),
    officePhone: z.string().optional(),
    address: z.string().min(5, {
      message: "Address must be at least 5 characters.",
    }),
    address2: z.string().optional(),
    type: z.string(),
    status: z.string(),
    contactName: z.string().min(2, {
      message: "Contact name must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: customer?.name || "",
      nickname: customer?.nickname || "",
      email: customer?.email || "",
      phone: customer?.phone || "",
      officePhone: customer?.officePhone || "",
      address: customer?.address || "",
      address2: customer?.address2 || "",
      type: customer?.type || "business",
      status: customer?.status || "active",
      contactName: customer?.contactName || "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form values:', values);
      toast.success(customer ? 'Customer updated successfully' : 'Customer created successfully', {
        description: `${values.name} has been ${customer ? 'updated' : 'added'} to your customers list.`,
      });
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            {customer ? 'Edit Customer' : 'Create New Customer'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Details
            </TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Contacts
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Settings
            </TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <TabsContent value="details" className="space-y-4 py-4">
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
                          <Building2 className="h-4 w-4 mr-1.5 text-blue-600" />
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
                </div>
                
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
              </TabsContent>
              
              <TabsContent value="contacts" className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center">
                        <User className="h-4 w-4 mr-1.5 text-blue-600" />
                        Primary Contact Name <span className="text-red-500 ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="border-gray-200" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <p className="text-sm text-gray-500 mt-4">More contact options will be available in future updates.</p>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-4 py-4">
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
                          <Building2 className="h-4 w-4 mr-1.5 text-blue-600" />
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
              </TabsContent>
              
              <DialogFooter className="mt-6 gap-2">
                <Button variant="outline" onClick={onClose} type="button" className="border-gray-200 bg-white">
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="gap-2 bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {customer ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4" />
                      {customer ? "Update Customer" : "Create Customer"}
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerModal;
