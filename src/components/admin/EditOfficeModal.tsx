
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';

// Mock service types
const serviceTypes = [
  'Concrete Pumping',
  'Construction',
  'Electrical Services',
  'Plumbing',
  'HVAC',
  'Landscaping'
];

// Mock admin users
const adminUsers = [
  { id: 1, name: 'Ahmad Imtiaz' },
  { id: 2, name: 'Admin User 2' },
  { id: 3, name: 'Admin User 3' }
];

const EditOfficeModal = ({ isOpen, onClose, office }) => {
  const form = useForm({
    defaultValues: {
      companyName: '',
      companyId: '',
      officeNumber: '',
      officeAddress: '',
      serviceType: '',
      admin: '',
      userLimits: {
        subcontractor: 100,
        employee: 200,
        foreman: 10,
        customer: 300
      },
      toolsLimit: 5
    }
  });
  
  useEffect(() => {
    if (office) {
      form.reset({
        companyName: office.name || '',
        companyId: '12546882',
        officeNumber: '015491679421',
        officeAddress: 'Hsmonhim 48, Jerusalem',
        serviceType: office.serviceType || '',
        admin: '1',
        userLimits: {
          subcontractor: office.users?.subcontractor || 100,
          employee: office.users?.employee || 200,
          foreman: office.users?.foreman || 10,
          customer: office.users?.customer || 300
        },
        toolsLimit: 5
      });
    }
  }, [office, form]);
  
  const handleSubmit = (data) => {
    console.log('Office updated:', data);
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-0">
        <div className="p-6">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-semibold">Edit Office</DialogTitle>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <h3 className="text-lg font-medium">Details About Office</h3>
                
                <FormField
                  control={form.control}
                  name="companyName"
                  rules={{ required: 'Company name is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="companyId"
                  rules={{ required: 'Company ID is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company No</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="officeNumber"
                  rules={{ required: 'Office number is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Office Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="officeAddress"
                  rules={{ required: 'Office address is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Office Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="serviceType"
                  rules={{ required: 'Service type is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type Of Service</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {serviceTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="admin"
                  rules={{ required: 'Admin selection is required' }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Admin</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {adminUsers.map((admin) => (
                            <SelectItem key={admin.id} value={admin.id.toString()}>
                              {admin.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <h3 className="text-lg font-medium mt-6">User Limit</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="userLimits.subcontractor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subcontractor</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="userLimits.employee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Employee</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="userLimits.foreman"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Foreman</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="userLimits.customer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <h3 className="text-lg font-medium mt-6">Tools Limit</h3>
                
                <FormField
                  control={form.control}
                  name="toolsLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Limit</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    className="bg-teal-500 hover:bg-teal-600"
                  >
                    Update
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditOfficeModal;
