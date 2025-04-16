
import React, { useState, useEffect } from 'react';
import { Check, Edit, Plus, Trash, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface VehicleInformationProps {
  vehicleNumber: string;
  setVehicleNumber: (number: string) => void;
}

const VehicleInformation: React.FC<VehicleInformationProps> = ({
  vehicleNumber,
  setVehicleNumber
}) => {
  const [vehicles, setVehicles] = useState([
    "VEH-123",
    "VEH-456",
    "VEH-789",
    "VEH-101"
  ]);
  
  const [newVehicle, setNewVehicle] = useState("");
  const [editVehicleId, setEditVehicleId] = useState<string | null>(null);
  const [editVehicleValue, setEditVehicleValue] = useState("");
  
  const handleAddVehicle = () => {
    if (newVehicle.trim()) {
      const newVehicles = [...vehicles, newVehicle.trim()];
      setVehicles(newVehicles);
      setVehicleNumber(newVehicle.trim());
      setNewVehicle("");
      toast.success("New vehicle added", {
        description: `${newVehicle} has been added to your vehicles.`,
      });
    }
  };
  
  const handleSelectVehicle = (vehicle: string) => {
    setVehicleNumber(vehicle);
  };
  
  const handleEditVehicle = (vehicle: string) => {
    setEditVehicleId(vehicle);
    setEditVehicleValue(vehicle);
  };
  
  const handleSaveVehicleEdit = () => {
    if (editVehicleValue.trim() && editVehicleId) {
      const oldVehicle = editVehicleId;
      setVehicles(vehicles.map(vehicle => 
        vehicle === oldVehicle ? editVehicleValue.trim() : vehicle
      ));
      
      if (vehicleNumber === oldVehicle) {
        setVehicleNumber(editVehicleValue.trim());
      }
      
      setEditVehicleId(null);
      setEditVehicleValue("");
      
      toast.success("Vehicle updated", {
        description: `${oldVehicle} has been renamed to ${editVehicleValue}.`,
      });
    }
  };
  
  const handleCancelVehicleEdit = () => {
    setEditVehicleId(null);
    setEditVehicleValue("");
  };
  
  const handleDeleteVehicle = (vehicle: string) => {
    setVehicles(vehicles.filter(v => v !== vehicle));
    
    if (vehicleNumber === vehicle) {
      setVehicleNumber("");
    }
    
    toast.success("Vehicle removed", {
      description: `${vehicle} has been removed from your vehicles.`,
    });
  };
  
  return (
    <div>
      <div className="mb-3">
        <h3 className="text-sm font-medium flex items-center">
          <Truck className="h-4 w-4 mr-1 text-blue-600" /> Vehicle Information
        </h3>
      </div>
      
      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Add new vehicle..."
          value={newVehicle}
          onChange={(e) => setNewVehicle(e.target.value)}
          className="flex-grow border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        <Button 
          onClick={handleAddVehicle}
          disabled={!newVehicle.trim()}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          size="sm"
        >
          <Plus className="h-4 w-4 mr-1" /> Add
        </Button>
      </div>
      
      <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
        {vehicles.map((vehicle) => (
          <div 
            key={vehicle}
            className={`flex justify-between items-center p-3 border rounded-lg transition-all ${
              vehicleNumber === vehicle 
                ? 'border-blue-500 bg-blue-50 shadow-sm' 
                : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
            }`}
            onClick={() => handleSelectVehicle(vehicle)}
          >
            {editVehicleId === vehicle ? (
              <div className="flex items-center w-full gap-2">
                <Input 
                  value={editVehicleValue} 
                  onChange={(e) => setEditVehicleValue(e.target.value)} 
                  className="flex-1 h-9"
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
                <Button 
                  className="h-9 bg-green-500 hover:bg-green-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveVehicleEdit();
                  }}
                  size="sm"
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  className="h-9"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancelVehicleEdit();
                  }}
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <span className="text-sm font-medium">{vehicle}</span>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 p-0 rounded-full hover:bg-blue-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditVehicle(vehicle);
                    }}
                  >
                    <Edit className="h-3.5 w-3.5 text-blue-600" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-7 w-7 p-0 rounded-full hover:bg-red-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteVehicle(vehicle);
                    }}
                  >
                    <Trash className="h-3.5 w-3.5 text-red-500" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
        
        {vehicles.length === 0 && (
          <div className="text-center py-4 text-sm text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            No vehicles added yet. Add a new vehicle above.
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleInformation;
