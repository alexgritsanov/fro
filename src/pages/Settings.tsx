
import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save, Lock, Bell, Shield } from 'lucide-react';

const Settings = () => {
  const { profile, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    position: profile?.position || '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Only include fields that are in the Profile type
      const profileUpdate = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        position: formData.position,
      };

      await updateProfile(profileUpdate);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
        variant: "success",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Header 
        title="Settings" 
        subtitle="Manage your account settings and preferences"
        className="mb-6"
      />
      
      <div className="grid gap-6">
        <Card className="shadow-sm border border-unidoc-light-gray">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-unidoc-dark">Profile Settings</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
              
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
              
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit"
                  className="w-full md:w-auto"
                  disabled={isLoading}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? 'Updating...' : 'Update Profile'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      
        <Card className="shadow-sm border border-unidoc-light-gray">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-unidoc-dark">Account Settings</CardTitle>
            <CardDescription>Manage your account security and preferences</CardDescription>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 border border-unidoc-light-gray rounded-md hover:bg-unidoc-extra-light transition-colors">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-unidoc-primary-blue mt-0.5" />
                  <div>
                    <h3 className="font-medium text-unidoc-dark">Change Password</h3>
                    <p className="text-sm text-unidoc-medium">Update your password regularly for security</p>
                  </div>
                </div>
                <Button variant="outline">
                  Change
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-4 border border-unidoc-light-gray rounded-md hover:bg-unidoc-extra-light transition-colors">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-unidoc-primary-blue mt-0.5" />
                  <div>
                    <h3 className="font-medium text-unidoc-dark">Two-Factor Authentication</h3>
                    <p className="text-sm text-unidoc-medium">Add an extra layer of security to your account</p>
                  </div>
                </div>
                <Button variant="outline">
                  Setup
                </Button>
              </div>
              
              <div className="flex justify-between items-center p-4 border border-unidoc-light-gray rounded-md hover:bg-unidoc-extra-light transition-colors">
                <div className="flex items-start gap-3">
                  <Bell className="h-5 w-5 text-unidoc-primary-blue mt-0.5" />
                  <div>
                    <h3 className="font-medium text-unidoc-dark">Notification Preferences</h3>
                    <p className="text-sm text-unidoc-medium">Control how you receive notifications</p>
                  </div>
                </div>
                <Button variant="outline">
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="border-t border-unidoc-light-gray pt-6">
            <Button variant="destructive" className="ml-auto">
              Delete Account
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
