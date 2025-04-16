import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserType } from '../UserCreationModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, Building2, Mail, Phone, Upload, MapPin, CalendarClock, Briefcase, UserPlus, Plus, X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export interface ContactPerson {
  name: string;
  position: string;
  email: string;
  phone: string;
}

export interface UserData {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position?: string;
  company?: string;
  address?: string;
  status?: string;
  notes?: string;
  nickname?: string;
  officePhone?: string;
  avatar?: File | null;
  id?: string;
  contactPersons?: ContactPerson[];
}

interface BasicInformationProps {
  userType: UserType;
  userData: UserData;
  onChange: (data: Partial<UserData>) => void;
}

const BasicInformation = ({
  userType,
  userData,
  onChange
}: BasicInformationProps) => {
  const [showAdditionalInfo, setShowAdditionalInfo] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showContactPersonForm, setShowContactPersonForm] = useState(false);
  const [contactPerson, setContactPerson] = useState<ContactPerson>({
    name: '',
    position: '',
    email: '',
    phone: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onChange({
        avatar: file
      });

      const reader = new FileReader();
      reader.onload = e => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getNameLabel = () => {
    switch (userType) {
      case 'client':
        return 'Customer Name';
      case 'employee':
      case 'foreman':
        return 'Full Name';
      case 'subcontractor':
        return 'Company Name';
      default:
        return 'Name';
    }
  };

  const getPositionLabel = () => {
    switch (userType) {
      case 'client':
        return 'Contact Position';
      case 'employee':
      case 'foreman':
        return 'Position/Title';
      case 'subcontractor':
        return 'Business Type';
      default:
        return 'Position';
    }
  };

  const getCompanyLabel = () => {
    switch (userType) {
      case 'client':
        return 'Company Name';
      case 'employee':
      case 'foreman':
        return 'Department';
      case 'subcontractor':
        return 'Business Name';
      default:
        return 'Company';
    }
  };

  const handleAddContactPerson = () => {
    if (!contactPerson.name || !contactPerson.email || !contactPerson.phone) {
      return;
    }
    const updatedContactPersons = [...(userData.contactPersons || []), contactPerson];
    onChange({
      contactPersons: updatedContactPersons
    });

    setContactPerson({
      name: '',
      position: '',
      email: '',
      phone: ''
    });
    setShowContactPersonForm(false);
  };

  const handleRemoveContactPerson = (index: number) => {
    const updatedContactPersons = [...(userData.contactPersons || [])];
    updatedContactPersons.splice(index, 1);
    onChange({
      contactPersons: updatedContactPersons
    });
  };

  const handleContactPersonChange = (field: keyof ContactPerson, value: string) => {
    setContactPerson(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return <div className="space-y-6">
      <div className="flex justify-center mb-6">
        <div className="relative">
          <Avatar className="h-24 w-24 cursor-pointer border-2 border-gray-200" onClick={() => document.getElementById('avatar-upload')?.click()}>
            {imagePreview ? <AvatarImage src={imagePreview} alt="Profile preview" /> : <AvatarFallback className="bg-gray-100 text-gray-400 text-lg">
                {userData.name ? userData.name.charAt(0).toUpperCase() : userType === 'client' ? 'C' : userType === 'employee' ? 'E' : userType === 'foreman' ? 'F' : 'S'}
              </AvatarFallback>}
          </Avatar>
          <Button size="icon" variant="outline" className="absolute bottom-0 right-0 rounded-full h-8 w-8 bg-white shadow-sm" onClick={() => document.getElementById('avatar-upload')?.click()}>
            <Upload className="h-4 w-4" />
          </Button>
          <input id="avatar-upload" type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              {userType === 'client' ? <Building2 className="h-4 w-4 text-blue-600" /> : <User className="h-4 w-4 text-blue-600" />}
              {getNameLabel()} <span className="text-red-500">*</span>
            </Label>
            <Input value={userData.name} onChange={e => onChange({
            name: e.target.value
          })} placeholder={userType === 'client' ? "Enter customer name" : "Enter name"} className="border-gray-300" />
          </div>
          
          {userType !== 'subcontractor' && userType !== 'client' && <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-600" />
                Nickname
              </Label>
              <Input value={userData.nickname || ''} onChange={e => onChange({
            nickname: e.target.value
          })} placeholder="Enter nickname (optional)" className="border-gray-300" />
            </div>}
          
          {userType === 'client' && <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-blue-600" />
                Short Name / Nickname
              </Label>
              <Input value={userData.nickname || ''} onChange={e => onChange({
            nickname: e.target.value
          })} placeholder="Enter customer nickname (optional)" className="border-gray-300" />
            </div>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blue-600" />
              Email <span className="text-red-500">*</span>
            </Label>
            <Input value={userData.email} onChange={e => onChange({
            email: e.target.value
          })} placeholder="Enter email address" type="email" className="border-gray-300" />
          </div>
          
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-600" />
              Phone <span className="text-red-500">*</span>
            </Label>
            <Input value={userData.phone} onChange={e => onChange({
            phone: e.target.value
          })} placeholder="Enter phone number" className="border-gray-300" />
          </div>
        </div>
        
        {userType === 'client' && <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-600" />
              Office Phone
            </Label>
            <Input value={userData.officePhone || ''} onChange={e => onChange({
          officePhone: e.target.value
        })} placeholder="Enter office phone number" className="border-gray-300" />
          </div>}
        
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-blue-600" />
            Address
          </Label>
          <Input value={userData.address || ''} onChange={e => onChange({
          address: e.target.value
        })} placeholder="Enter address" className="border-gray-300" />
        </div>
        
        {userType === 'client' && <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-100 rounded-md p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-blue-600" />
                <span className="text-blue-800 font-medium">Contact Persons</span>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => setShowContactPersonForm(true)} className="text-blue-600 border-blue-200 hover:bg-blue-50">
                <Plus className="h-4 w-4 mr-1" /> Add Person
              </Button>
            </div>

            {userData.contactPersons && userData.contactPersons.length > 0 && <div className="space-y-3">
                {userData.contactPersons.map((person, index) => <div key={index} className="bg-gray-50 border border-gray-200 rounded-md p-3 flex justify-between items-start">
                    <div>
                      <div className="font-medium">{person.name}</div>
                      <div className="text-sm text-gray-500">{person.position}</div>
                      <div className="flex items-center gap-4 mt-1 text-sm">
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-gray-400" /> {person.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-gray-400" /> {person.phone}
                        </span>
                      </div>
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveContactPerson(index)} className="h-8 w-8 text-gray-500 hover:text-red-500">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>)}
              </div>}

            {showContactPersonForm && <div className="bg-gray-50 p-4 rounded-md border border-gray-200 animate-fade-in">
                <h4 className="font-medium mb-3">Add Contact Person</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>
                      Name <span className="text-red-500">*</span>
                    </Label>
                    <Input value={contactPerson.name} onChange={e => handleContactPersonChange('name', e.target.value)} placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input value={contactPerson.position} onChange={e => handleContactPersonChange('position', e.target.value)} placeholder="Enter position" />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input value={contactPerson.email} onChange={e => handleContactPersonChange('email', e.target.value)} placeholder="Enter email address" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label>
                      Phone <span className="text-red-500">*</span>
                    </Label>
                    <Input value={contactPerson.phone} onChange={e => handleContactPersonChange('phone', e.target.value)} placeholder="Enter phone number" />
                  </div>
                </div>
                <div className="flex justify-end mt-4 gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowContactPersonForm(false)}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={handleAddContactPerson}>
                    Add Contact
                  </Button>
                </div>
              </div>}
          </div>}
        
        
        
        {showAdditionalInfo && <div className="space-y-4 bg-gray-50 p-4 rounded-md border border-gray-200 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-blue-600" />
                  {getPositionLabel()}
                </Label>
                <Input value={userData.position || ''} onChange={e => onChange({
              position: e.target.value
            })} placeholder={`Enter ${getPositionLabel().toLowerCase()}`} className="border-gray-300" />
              </div>
              
              {(userType === 'employee' || userType === 'foreman') && <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-600" />
                    {getCompanyLabel()}
                  </Label>
                  <Input value={userData.company || ''} onChange={e => onChange({
              company: e.target.value
            })} placeholder={`Enter ${getCompanyLabel().toLowerCase()}`} className="border-gray-300" />
                </div>}
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-blue-600" />
                  Status
                </Label>
                <Select value={userData.status || 'active'} onValueChange={value => onChange({
              status: value
            })}>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    {userType === 'client' && <SelectItem value="prospect">Prospect</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="h-4 w-4 text-blue-600" />
                Notes
              </Label>
              <Textarea value={userData.notes || ''} onChange={e => onChange({
            notes: e.target.value
          })} placeholder="Enter additional notes" className="border-gray-300 min-h-[100px]" />
            </div>
          </div>}
      </div>
    </div>;
};

export default BasicInformation;
