
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { Check, Shield, X, Info, Phone, Mail, Building, Briefcase, User, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import UserDetails from './UserDetails';
import UserFolder from './UserFolder';
import { toast } from 'sonner';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, user }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    status: '',
    notes: '',
    company: '',
    position: '',
    businessType: '',
    address: '',
    nickname: '',
    officePhone: '',
    contactPerson: '',
    contactPersonEmail: '',
    contactPersonPhone: '',
  });
  
  const [showDetails, setShowDetails] = useState(false);
  const [showFolder, setShowFolder] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        role: user.role || '',
        status: user.status || '',
        notes: user.notes || '',
        company: user.company || '',
        position: user.position || '',
        businessType: user.businessType || '',
        address: user.address || '',
        nickname: user.nickname || '',
        officePhone: user.officePhone || '',
        contactPerson: user.contactPerson || '',
        contactPersonEmail: user.contactPersonEmail || '',
        contactPersonPhone: user.contactPersonPhone || '',
      });
    }
  }, [user]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleShowDetails = () => {
    setShowDetails(true);
  };
  
  const handleShowFolder = () => {
    setShowFolder(true);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated user data:', formData);
    
    // Here you would typically send the data to your backend
    
    toast.success("User updated successfully");
    
    onClose();
  };
  
  // Define role-based permissions
  const getRolePermissions = (role: string) => {
    const permissions = {
      'admin': {
        dashboardAccess: true,
        manageCustomers: true, 
        manageSchedule: true,
        manageAgreements: true,
        manageUsers: true,
        viewReports: true,
        editSettings: true
      },
      'office': {
        dashboardAccess: true,
        manageCustomers: true,
        manageSchedule: true,
        manageAgreements: false,
        manageUsers: false,
        viewReports: true,
        editSettings: false
      },
      'foreman': {
        dashboardAccess: true,
        manageCustomers: false,
        manageSchedule: true,
        manageAgreements: false,
        manageUsers: false,
        viewReports: true,
        editSettings: false
      },
      'employee': {
        dashboardAccess: true,
        manageCustomers: false,
        manageSchedule: false,
        manageAgreements: false,
        manageUsers: false,
        viewReports: false,
        editSettings: false
      },
      'subcontractor': {
        dashboardAccess: true,
        manageCustomers: false,
        manageSchedule: false,
        manageAgreements: false,
        manageUsers: false,
        viewReports: false,
        editSettings: false
      },
      'client': {
        dashboardAccess: true,
        manageCustomers: false,
        manageSchedule: false,
        manageAgreements: false,
        manageUsers: false,
        viewReports: false,
        editSettings: false
      },
      'default': {
        dashboardAccess: false,
        manageCustomers: false,
        manageSchedule: false,
        manageAgreements: false,
        manageUsers: false,
        viewReports: false,
        editSettings: false
      }
    };
    
    return permissions[role.toLowerCase() as keyof typeof permissions] || permissions.default;
  };
  
  const userPermissions = getRolePermissions(formData.role);
  
  // Role-specific fields
  const renderRoleSpecificFields = () => {
    const role = formData.role.toLowerCase();
    
    if (role === 'client') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-1">
                <Building className="h-4 w-4 text-gray-500" />
                Company
              </Label>
              <Input 
                id="company" 
                name="company" 
                value={formData.company} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-500" />
                Address
              </Label>
              <Input 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
          
          <div className="border-t pt-4 mt-4">
            <h3 className="text-sm font-medium mb-3">Contact Person</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactPerson" className="flex items-center gap-1">
                  <User className="h-4 w-4 text-gray-500" />
                  Contact Name
                </Label>
                <Input 
                  id="contactPerson" 
                  name="contactPerson" 
                  value={formData.contactPerson} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPersonEmail" className="flex items-center gap-1">
                  <Mail className="h-4 w-4 text-gray-500" />
                  Contact Email
                </Label>
                <Input 
                  id="contactPersonEmail" 
                  name="contactPersonEmail" 
                  type="email"
                  value={formData.contactPersonEmail} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactPersonPhone" className="flex items-center gap-1">
                  <Phone className="h-4 w-4 text-gray-500" />
                  Contact Phone
                </Label>
                <Input 
                  id="contactPersonPhone" 
                  name="contactPersonPhone" 
                  value={formData.contactPersonPhone} 
                  onChange={handleInputChange} 
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (role === 'employee' || role === 'foreman') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="position" className="flex items-center gap-1">
                <Briefcase className="h-4 w-4 text-gray-500" />
                Position
              </Label>
              <Input 
                id="position" 
                name="position" 
                value={formData.position} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-500" />
                Address
              </Label>
              <Input 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nickname" className="flex items-center gap-1">
                <User className="h-4 w-4 text-gray-500" />
                Nickname
              </Label>
              <Input 
                id="nickname" 
                name="nickname" 
                value={formData.nickname} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="officePhone" className="flex items-center gap-1">
                <Phone className="h-4 w-4 text-gray-500" />
                Office Phone
              </Label>
              <Input 
                id="officePhone" 
                name="officePhone" 
                value={formData.officePhone} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
        </div>
      );
    } else if (role === 'subcontractor') {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="businessType" className="flex items-center gap-1">
                <Building className="h-4 w-4 text-gray-500" />
                Business Type
              </Label>
              <Input 
                id="businessType" 
                name="businessType" 
                value={formData.businessType} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company" className="flex items-center gap-1">
                <Building className="h-4 w-4 text-gray-500" />
                Company
              </Label>
              <Input 
                id="company" 
                name="company" 
                value={formData.company} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address" className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-gray-500" />
                Address
              </Label>
              <Input 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <>
      <Dialog open={isOpen && !showDetails && !showFolder} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="details">User Details</TabsTrigger>
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-1">
                      <User className="h-4 w-4 text-gray-500" />
                      Full Name
                    </Label>
                    <Input 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-1">
                      <Mail className="h-4 w-4 text-gray-500" />
                      Email
                    </Label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-1">
                      <Phone className="h-4 w-4 text-gray-500" />
                      Phone
                    </Label>
                    <Input 
                      id="phone" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select 
                      value={formData.role} 
                      onValueChange={(value) => handleSelectChange('role', value)}
                    >
                      <SelectTrigger id="role">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="office">Office</SelectItem>
                        <SelectItem value="foreman">Foreman</SelectItem>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="subcontractor">Subcontractor</SelectItem>
                        <SelectItem value="client">Client</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select 
                      value={formData.status} 
                      onValueChange={(value) => handleSelectChange('status', value)}
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {renderRoleSpecificFields()}
                
                <div className="space-y-2 mt-4">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea 
                    id="notes" 
                    name="notes" 
                    value={formData.notes} 
                    onChange={handleInputChange} 
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="permissions" className="pt-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium flex items-center gap-1">
                      <Shield className="h-4 w-4 text-blue-600" />
                      Permissions
                    </h3>
                    <Badge className="bg-blue-100 text-blue-600 border-blue-200">
                      Based on {formData.role} role
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-gray-500 mb-4 flex items-center gap-2 italic">
                    <Info className="h-4 w-4" />
                    Permissions are determined by user role and cannot be modified individually
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    {Object.entries(userPermissions).map(([permission, granted], index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-3 rounded-md border">
                        <span className="capitalize">{permission.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <div className="flex items-center">
                          {granted ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
                              <Check className="h-3 w-3" />
                              Granted
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200 flex items-center gap-1">
                              <X className="h-3 w-3" />
                              Not Granted
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="mt-6">
              <Button variant="outline" type="button" onClick={handleShowFolder}>
                View User Folder
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {showDetails && (
        <UserDetails 
          isOpen={showDetails} 
          onClose={() => setShowDetails(false)} 
          user={{...user, ...formData}}
          onEdit={() => setShowDetails(false)}
        />
      )}
      
      {showFolder && (
        <UserFolder 
          user={{...user, ...formData}}
          onClose={() => setShowFolder(false)}
          open={showFolder}
        />
      )}
    </>
  );
};

export default UserModal;
