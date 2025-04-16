import React, { useState } from 'react';
import { X, Building, Search, Grid, List, MapPin, User, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import CreateOfficeModal from '@/components/admin/create-office/CreateOfficeModal';
import EditOfficeModal from '@/components/admin/EditOfficeModal';

interface Office {
  id: string;
  name: string;
  address: string;
  region: string;
  status: 'active' | 'pending' | 'inactive';
  customersCount: number;
}

interface OfficesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  agentName?: string;
  offices: Office[];
  onAddOffice: () => void;
}

const OfficesDialog = ({ isOpen, onClose, agentName, offices, onAddOffice }: OfficesDialogProps) => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [showCreateOfficeModal, setShowCreateOfficeModal] = useState(false);
  const [showEditOfficeModal, setShowEditOfficeModal] = useState(false);
  const [showOfficeDetails, setShowOfficeDetails] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<Office | null>(null);
  
  const filteredOffices = offices.filter(office => 
    office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    office.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const handleOpenCreateModal = () => {
    setShowCreateOfficeModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateOfficeModal(false);
  };

  const handleCreateSuccess = () => {
    setShowCreateOfficeModal(false);
  };
  
  const handleOpenEditModal = (office: Office) => {
    setSelectedOffice(office);
    setShowEditOfficeModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditOfficeModal(false);
    setSelectedOffice(null);
  };

  const handleViewOfficeDetails = (office: Office) => {
    setSelectedOffice(office);
    setShowOfficeDetails(true);
  };
  
  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <DialogTitle className="text-xl flex items-center">
                  <Building className="h-5 w-5 mr-2 text-blue-600" />
                  {agentName ? `${agentName}'s Offices` : 'Offices'}
                </DialogTitle>
                <DialogDescription>
                  {offices.length} {offices.length === 1 ? 'office' : 'offices'} found
                </DialogDescription>
              </div>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>
          
          <div className="flex items-center justify-between mb-4 gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search offices..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex rounded-md overflow-hidden border">
              <Button 
                variant={view === 'grid' ? 'default' : 'ghost'} 
                size="sm"
                className="rounded-none border-0"
                onClick={() => setView('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button 
                variant={view === 'list' ? 'default' : 'ghost'} 
                size="sm"
                className="rounded-none border-0"
                onClick={() => setView('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <Button onClick={handleOpenCreateModal} className="whitespace-nowrap">
              <Plus className="h-4 w-4 mr-2" />
              Add Office
            </Button>
          </div>
          
          <div className="overflow-y-auto flex-grow">
            {filteredOffices.length === 0 ? (
              <div className="bg-slate-50 rounded-lg border border-dashed p-8 text-center">
                <Building className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <h3 className="text-lg font-medium text-gray-600">No Offices Found</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {searchQuery ? 'Try a different search term' : 'No offices have been added yet'}
                </p>
                <Button size="sm" onClick={handleOpenCreateModal}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Office
                </Button>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredOffices.map((office) => (
                  <Card key={office.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{office.name}</h3>
                        <Badge 
                          variant="outline" 
                          className={getStatusColor(office.status)}
                        >
                          {office.status.charAt(0).toUpperCase() + office.status.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          {office.address}
                        </div>
                        <div className="flex items-center text-sm">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          {office.customersCount} Customers
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleOpenEditModal(office)}
                        >
                          Edit
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleViewOfficeDetails(office)}
                        >
                          Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-gray-50">
                    <tr>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Address</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Customers</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOffices.map((office) => (
                      <tr key={office.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{office.name}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                            {office.address}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge 
                            variant="outline" 
                            className={getStatusColor(office.status)}
                          >
                            {office.status.charAt(0).toUpperCase() + office.status.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">{office.customersCount}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleOpenEditModal(office)}
                            >
                              Edit
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleViewOfficeDetails(office)}
                            >
                              Details
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      <CreateOfficeModal 
        isOpen={showCreateOfficeModal} 
        onClose={handleCloseCreateModal}
        onSuccess={handleCreateSuccess}
      />
      
      <EditOfficeModal 
        isOpen={showEditOfficeModal} 
        onClose={handleCloseEditModal}
        office={selectedOffice}
      />
      
      <Dialog open={showOfficeDetails} onOpenChange={(open) => !open && setShowOfficeDetails(false)}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-semibold">Office Details</DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowOfficeDetails(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          {selectedOffice && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Office Name</p>
                  <p className="text-lg font-semibold">{selectedOffice.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <Badge 
                    variant="outline" 
                    className={getStatusColor(selectedOffice.status)}
                  >
                    {selectedOffice.status.charAt(0).toUpperCase() + selectedOffice.status.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-lg font-semibold">{selectedOffice.address}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Region</p>
                <p className="text-lg">{selectedOffice.region}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Customer Count</p>
                <p className="text-lg">{selectedOffice.customersCount}</p>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowOfficeDetails(false)}
                >
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    setShowOfficeDetails(false);
                    handleOpenEditModal(selectedOffice);
                  }}
                >
                  Edit Office
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OfficesDialog;
