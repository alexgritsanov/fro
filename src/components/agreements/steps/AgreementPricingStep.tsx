import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, ChevronLeft, Plus, Trash2, Info, Edit, PinIcon, X, Lock, Unlock, MoreVertical } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableResponsive } from '@/components/ui/table';
import FormGroup from '@/components/FormGroup';
import ActionMenu, { ActionItem } from '@/components/ActionMenu';
import { toast } from 'sonner';

interface AgreementPricingStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const AgreementPricingStep: React.FC<AgreementPricingStepProps> = ({ 
  formData, 
  updateFormData, 
  onNext, 
  onBack 
}) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [editableRows, setEditableRows] = useState<number[]>([]);
  const [editableTiers, setEditableTiers] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  useEffect(() => {
    if (!formData.pumpTypes || formData.pumpTypes.length === 0) {
      updateFormData('pumpTypes', [
        "maiko arm 22m",
        "pump up to 22m",
        "pump up to 36m",
        "pump up to 42m",
        "pump up to 48m",
        "pump up to 52m",
        "pump up to 56m",
        "pump up to 62m",
        "pump up to 65m",
        "pump up to 72m",
        "pump up to 75m",
        "pump up to 80m"
      ]);
    }

    if (!formData.pricingTiers || 
        formData.pricingTiers.length === 0 || 
        !Array.isArray(formData.pricingTiers)) {
      
      const defaultPrices = Array(formData.pumpTypes?.length || 12).fill(0);
      
      updateFormData('pricingTiers', [
        {
          id: "tier-1",
          name: "First 10 m³",
          prices: [...defaultPrices]
        },
        {
          id: "tier-2",
          name: "Each additional m³",
          prices: [...defaultPrices]
        },
        {
          id: "tier-3",
          name: "1m pipe addition",
          prices: [...defaultPrices]
        },
        {
          id: "tier-4",
          name: "On-site transfer",
          prices: [...defaultPrices]
        },
        {
          id: "tier-5",
          name: "Daily price",
          prices: [...defaultPrices]
        }
      ]);
    }

    if (!formData.additionalServices) {
      updateFormData('additionalServices', [
        {
          id: 'svc-1',
          name: 'Additional Service 1',
          price: 0
        }
      ]);
    }
  }, []);

  const handlePriceChange = (tierIndex: number, pumpIndex: number, newPrice: number) => {
    const updatedTiers = [...formData.pricingTiers].map((tier: any, index: number) => {
      if (index === tierIndex) {
        const updatedPrices = [...tier.prices];
        updatedPrices[pumpIndex] = newPrice;
        return { ...tier, prices: updatedPrices };
      }
      return tier;
    });
    updateFormData('pricingTiers', updatedTiers);
  };

  const handleTierNameChange = (index: number, newName: string) => {
    const updatedTiers = [...formData.pricingTiers].map((tier: any, i: number) =>
      i === index ? { ...tier, name: newName } : tier
    );
    updateFormData('pricingTiers', updatedTiers);
  };

  const handlePumpTypeChange = (index: number, newType: string) => {
    const updatedPumpTypes = [...formData.pumpTypes];
    updatedPumpTypes[index] = newType;
    updateFormData('pumpTypes', updatedPumpTypes);
  };

  const handleServiceNameChange = (index: number, newName: string) => {
    const updatedServices = [...formData.additionalServices].map((service: any, i: number) =>
      i === index ? { ...service, name: newName } : service
    );
    updateFormData('additionalServices', updatedServices);
  };

  const handleServicePriceChange = (index: number, newPrice: number) => {
    const updatedServices = [...formData.additionalServices].map((service: any, i: number) =>
      i === index ? { ...service, price: newPrice } : service
    );
    updateFormData('additionalServices', updatedServices);
  };

  const addTier = () => {
    const tiersList = Array.isArray(formData.pricingTiers) ? [...formData.pricingTiers] : [];
    
    const newTier = {
      id: `tier-${tiersList.length + 1}`,
      name: `New Category`,
      prices: Array(formData.pumpTypes?.length || 12).fill(0),
    };
    
    const newTiersList = [...tiersList, newTier];
    updateFormData('pricingTiers', newTiersList);
    
    setEditableTiers(prev => [...prev, newTiersList.length - 1]);
    
    toast.success("New pricing category added");
  };

  const removeTier = (index: number) => {
    if (!formData.pricingTiers || formData.pricingTiers.length <= 1) {
      toast.error("Cannot remove the last pricing category");
      return;
    }
    
    const updatedTiers = [...formData.pricingTiers].filter((_: any, i: number) => i !== index);
    updateFormData('pricingTiers', updatedTiers);
    
    setEditableTiers(prev => prev.filter(i => i !== index && (i < index ? i : i - 1)));
    
    toast.success("Pricing category removed");
  };

  const addPumpType = () => {
    const newPumpTypes = [...(formData.pumpTypes || []), ``];
    updateFormData('pumpTypes', newPumpTypes);
    
    const updatedTiers = (formData.pricingTiers || []).map((tier: any) => ({
      ...tier,
      prices: [...tier.prices, 0],
    }));
    updateFormData('pricingTiers', updatedTiers);
    
    setEditableRows(prev => [...prev, newPumpTypes.length - 1]);
  };

  const removePumpType = (index: number) => {
    if (formData.pumpTypes.length <= 1) return;
    
    const updatedPumpTypes = [...formData.pumpTypes].filter((_: any, i: number) => i !== index);
    updateFormData('pumpTypes', updatedPumpTypes);

    const updatedTiers = (formData.pricingTiers || []).map((tier: any) => ({
      ...tier,
      prices: tier.prices.filter((_: any, i: number) => i !== index),
    }));
    updateFormData('pricingTiers', updatedTiers);
    
    setEditableRows(prev => prev.filter(i => i !== index && (i < index ? i : i - 1)));
  };

  const addService = () => {
    const newService = {
      id: `svc-${(formData.additionalServices?.length || 0) + 1}`,
      name: ``,
      price: 0,
    };
    updateFormData('additionalServices', [...(formData.additionalServices || []), newService]);
  };

  const removeService = (index: number) => {
    if (formData.additionalServices.length <= 1) return;
    
    const updatedServices = [...formData.additionalServices].filter((_: any, i: number) => i !== index);
    updateFormData('additionalServices', updatedServices);
  };

  const toggleEditTier = (index: number) => {
    setEditableTiers(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
    
    if (!editableTiers.includes(index)) {
      toast.success("Column unlocked for editing", {
        description: "Make your changes and click elsewhere when done.",
      });
    }
  };

  const toggleEditRow = (index: number) => {
    setEditableRows(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
    
    if (!editableRows.includes(index)) {
      toast.success("Row unlocked for editing", {
        description: "Make your changes and click elsewhere when done.",
      });
    }
  };

  const getTierActions = (index: number) => {
    const isEditable = editableTiers.includes(index);
    
    const actions: ActionItem[] = [
      {
        label: isEditable ? "Lock Editing" : "Edit",
        icon: isEditable ? <Lock className="h-4 w-4" /> : <Edit className="h-4 w-4" />,
        onClick: () => toggleEditTier(index)
      },
      {
        label: "Delete",
        icon: <Trash2 className="h-4 w-4" />,
        onClick: () => removeTier(index),
        variant: 'destructive'
      }
    ];
    
    return actions;
  };

  const getPumpTypeActions = (index: number) => {
    const isEditable = editableRows.includes(index);
    
    const actions: ActionItem[] = [
      {
        label: isEditable ? "Lock Editing" : "Edit",
        icon: isEditable ? <Lock className="h-4 w-4" /> : <Edit className="h-4 w-4" />,
        onClick: () => toggleEditRow(index)
      },
      {
        label: "Delete",
        icon: <Trash2 className="h-4 w-4" />,
        onClick: () => removePumpType(index),
        variant: 'destructive'
      }
    ];
    
    return actions;
  };

  const getServiceActions = (index: number) => {
    const actions: ActionItem[] = [
      {
        label: "Edit",
        icon: <Edit className="h-4 w-4" />,
        onClick: () => {
          console.log(`Edit service ${index}`);
        }
      },
      {
        label: "Delete",
        icon: <Trash2 className="h-4 w-4" />,
        onClick: () => removeService(index),
        variant: 'destructive'
      }
    ];
    
    return actions;
  };

  const pumpTypes = formData.pumpTypes || [];
  const pricingTiers = Array.isArray(formData.pricingTiers) ? formData.pricingTiers : [];
  const additionalServices = formData.additionalServices || [];

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-[1200px] mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Pricing & Services</h1>
          <p className="text-sm text-gray-500 mt-1">
            Define rates for concrete pumps and additional services
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="rates" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="rates" className="text-sm">Pump Rates</TabsTrigger>
            <TabsTrigger value="additional" className="text-sm">Additional Services</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rates" className="space-y-4">
            <Card className="shadow-sm">
              <CardContent className="p-4 pt-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
                  <div>
                    <h3 className="text-lg font-medium">Concrete Pump Rates</h3>
                    <p className="text-sm text-gray-500">Define pricing for each pump type and service category</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      type="button" 
                      size="sm" 
                      variant="outline" 
                      className="h-8" 
                      onClick={addPumpType}
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Pump Type
                    </Button>
                    
                    <Button 
                      type="button" 
                      size="sm" 
                      variant="outline" 
                      className="h-8" 
                      onClick={addTier}
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add Category
                    </Button>
                  </div>
                </div>
                
                <TableResponsive className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-blue-50 border-b">
                        <TableHead className="w-[180px] py-3 px-3 text-left">
                          <div className="flex items-center">
                            Details
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-3.5 w-3.5 ml-1 inline-block text-gray-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Pump types and models</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableHead>
                        
                        {pricingTiers.map((tier: any, index: number) => (
                          <TableHead key={tier.id || index} className="text-center py-3 px-3 font-medium">
                            <div className="flex items-center justify-between gap-2">
                              <Input
                                value={tier.name || ''}
                                onChange={(e) => handleTierNameChange(index, e.target.value)}
                                className="h-9 text-xs py-1 text-center font-medium border-blue-200 bg-blue-50/50 truncate px-1"
                                title={tier.name}
                                disabled={!editableTiers.includes(index)}
                              />
                              {pricingTiers.length > 1 && (
                                <ActionMenu
                                  actions={getTierActions(index)}
                                  iconOnly={true}
                                  triggerClassName="h-6 w-6 p-0"
                                  triggerIcon={<MoreVertical className="h-4 w-4" />}
                                />
                              )}
                            </div>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                      {pumpTypes.map((pumpType: string, rowIndex: number) => (
                        <TableRow 
                          key={rowIndex}
                          className={`border-b ${hoveredRow === rowIndex ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                          onMouseEnter={() => setHoveredRow(rowIndex)}
                          onMouseLeave={() => setHoveredRow(null)}
                        >
                          <TableCell className="py-2 px-3">
                            <div className="flex items-center gap-2">
                              <Input
                                value={pumpType || ''}
                                onChange={(e) => handlePumpTypeChange(rowIndex, e.target.value)}
                                className="h-9 text-sm py-1 w-full"
                                disabled={!editableRows.includes(rowIndex)}
                              />
                              {pumpTypes.length > 1 && (
                                <ActionMenu
                                  actions={getPumpTypeActions(rowIndex)}
                                  iconOnly={true}
                                  triggerClassName="h-7 w-7 p-0"
                                  triggerIcon={<MoreVertical className="h-4 w-4" />}
                                />
                              )}
                            </div>
                          </TableCell>
                          
                          {pricingTiers.map((tier: any, colIndex: number) => {
                            const prices = tier.prices || [];
                            const currentPrice = prices[rowIndex] !== undefined ? prices[rowIndex] : 0;
                            
                            return (
                              <TableCell key={`${rowIndex}-${colIndex}`} className="text-center py-2 px-3">
                                <div className="relative w-full">
                                  <Input
                                    type="number"
                                    value={currentPrice}
                                    onChange={(e) => handlePriceChange(colIndex, rowIndex, parseFloat(e.target.value) || 0)}
                                    className="h-9 text-sm py-1 text-center"
                                    min={0}
                                    step={10}
                                  />
                                  <span className="absolute left-1/2 top-1/2 -translate-x-[calc(50%+1.5rem)] -translate-y-1/2 text-gray-500 pointer-events-none">₪</span>
                                </div>
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableResponsive>
                
                <div className="mt-4">
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="outline"
                    onClick={addPumpType}
                    className="w-full h-9 border-dashed border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Pump Type
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="additional" className="space-y-4">
            <Card className="shadow-sm">
              <CardContent className="p-4 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="text-lg font-medium">Additional Services</h3>
                    <p className="text-sm text-gray-500">Define pricing for supplementary services</p>
                  </div>
                  
                  <Button type="button" size="sm" variant="outline" className="h-8" onClick={addService}>
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Service
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {additionalServices.map((service: any, index: number) => (
                    <div key={service.id || index} className="flex items-center gap-3 border rounded-md p-3 bg-white hover:bg-gray-50">
                      <div className="flex-1">
                        <Input
                          value={service.name || ''}
                          onChange={(e) => handleServiceNameChange(index, e.target.value)}
                          placeholder="Service name"
                          className="h-9 mb-2"
                        />
                      </div>
                      <div className="w-[180px]">
                        <div className="relative">
                          <Input
                            type="number"
                            value={service.price !== undefined ? service.price : 0}
                            onChange={(e) => handleServicePriceChange(index, parseFloat(e.target.value) || 0)}
                            placeholder="Price"
                            className="h-9 text-center"
                            min={0}
                            step={10}
                          />
                          <span className="absolute left-1/2 top-1/2 -translate-x-[calc(50%+1.5rem)] -translate-y-1/2 text-gray-500 pointer-events-none">₪</span>
                        </div>
                      </div>
                      {additionalServices.length > 1 && (
                        <ActionMenu
                          actions={getServiceActions(index)}
                          iconOnly={true}
                          triggerClassName="h-9 w-9 p-0"
                          triggerIcon={<MoreVertical className="h-4 w-4" />}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-between pt-4">
          <Button 
            type="button"
            variant="outline" 
            onClick={onBack}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Customer Details
          </Button>
          
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:scale-105 transition-transform duration-300 gap-1"
          >
            Continue to Terms
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AgreementPricingStep;
