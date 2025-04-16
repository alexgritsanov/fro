
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, ArrowRight, Search, Edit, Trash, Check, Plus } from 'lucide-react';
import { CertificateStepProps } from '../hooks/useCertificateStepProps';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { containerVariants, errorShake } from '../../serviceInfoUtils';
import { toast } from 'sonner';

export const ProjectSiteStepRenderer: React.FC<CertificateStepProps> = ({
  formData,
  updateFormData,
  formErrors,
  setFormErrors,
  errorShakeAnimate,
  moveToNextStep,
  moveToPrevStep,
  serviceCall
}) => {
  const [siteSearch, setSiteSearch] = useState('');
  const [newSite, setNewSite] = useState('');
  const [editSiteId, setEditSiteId] = useState<string | null>(null);
  const [editSiteValue, setEditSiteValue] = useState('');
  
  // Default sites (would be fetched from an API in a real app)
  const [sites, setSites] = useState([
    "Jerusalem Central",
    "Tel Aviv North",
    "Haifa Port",
    "Mevaseret Tzion"
  ]);
  
  // Filtered sites based on search
  const filteredSites = sites.filter(site => 
    site.toLowerCase().includes(siteSearch.toLowerCase())
  );
  
  // Pre-select project site from service call if available
  useEffect(() => {
    if (serviceCall && serviceCall.projectSite && !formData.projectSite) {
      updateFormData('projectSite', serviceCall.projectSite);
    }
  }, [serviceCall]);

  const handleAddSite = () => {
    if (newSite.trim()) {
      const newSites = [...sites, newSite.trim()];
      setSites(newSites);
      updateFormData('projectSite', newSite.trim());
      setNewSite('');
      toast.success("New project site added", {
        description: `${newSite} has been added to your sites.`,
      });
    }
  };

  const handleSelectSite = (site: string) => {
    updateFormData('projectSite', site);
  };
  
  const handleEditSite = (site: string) => {
    setEditSiteId(site);
    setEditSiteValue(site);
  };
  
  const handleSaveSiteEdit = () => {
    if (editSiteValue.trim() && editSiteId) {
      const oldSite = editSiteId;
      setSites(sites.map(site => 
        site === oldSite ? editSiteValue.trim() : site
      ));
      
      if (formData.projectSite === oldSite) {
        updateFormData('projectSite', editSiteValue.trim());
      }
      
      setEditSiteId(null);
      setEditSiteValue('');
      
      toast.success("Project site updated", {
        description: `${oldSite} has been renamed to ${editSiteValue}.`,
      });
    }
  };
  
  const handleCancelSiteEdit = () => {
    setEditSiteId(null);
    setEditSiteValue('');
  };
  
  const handleDeleteSite = (site: string) => {
    setSites(sites.filter(s => s !== site));
    
    if (formData.projectSite === site) {
      updateFormData('projectSite', '');
    }
    
    toast.success("Project site removed", {
      description: `${site} has been removed from your sites.`,
    });
  };

  return (
    <motion.div 
      variants={errorShakeAnimate ? errorShake : containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <MapPin className="h-6 w-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold">Select Project Site</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search sites..."
            value={siteSearch}
            onChange={(e) => setSiteSearch(e.target.value)}
            className="pl-10 w-[260px] h-11 rounded-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex gap-3 mb-6">
        <Input
          placeholder="Add new project site..."
          value={newSite}
          onChange={(e) => setNewSite(e.target.value)}
          className="h-12 rounded-full flex-grow border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
        <Button 
          onClick={handleAddSite}
          disabled={!newSite.trim()}
          className="rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 h-12 font-medium"
        >
          <Plus className="h-5 w-5 mr-1" /> Add Site
        </Button>
      </div>
      
      <div className="space-y-3 mb-8">
        {filteredSites.map((site) => (
          <div 
            key={site}
            className={`flex justify-between items-center p-4 border rounded-2xl transition-all ${
              formData.projectSite === site 
                ? 'border-blue-500 bg-blue-50 shadow-sm' 
                : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
            }`}
            onClick={() => handleSelectSite(site)}
          >
            {editSiteId === site ? (
              <div className="flex items-center w-full gap-2">
                <Input 
                  value={editSiteValue} 
                  onChange={(e) => setEditSiteValue(e.target.value)} 
                  className="flex-1 h-10"
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
                <Button 
                  className="h-10 bg-green-500 hover:bg-green-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSaveSiteEdit();
                  }}
                >
                  <Check className="h-4 w-4 mr-1" /> Save
                </Button>
                <Button 
                  variant="outline" 
                  className="h-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancelSiteEdit();
                  }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <>
                <span className="text-lg font-medium">{site}</span>
                <div className="flex space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-2 rounded-full hover:bg-blue-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditSite(site);
                    }}
                  >
                    <Edit className="h-5 w-5 text-blue-600" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-2 rounded-full hover:bg-red-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSite(site);
                    }}
                  >
                    <Trash className="h-5 w-5 text-red-500" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
        
        {filteredSites.length === 0 && (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            {siteSearch 
              ? "No sites match your search." 
              : "No project sites added yet. Add a new site above."}
          </div>
        )}
      </div>
      
      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={moveToPrevStep} 
          className="text-lg h-12 px-8 rounded-full border-gray-300 hover:bg-gray-100"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </Button>
        
        <Button 
          onClick={moveToNextStep}
          disabled={!formData.projectSite}
          className="text-lg h-12 px-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center shadow-md hover:shadow-lg transition-all"
        >
          Continue <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
};
