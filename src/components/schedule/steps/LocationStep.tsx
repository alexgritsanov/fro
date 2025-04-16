
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search, Edit, Trash, ArrowRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { StepProps, containerVariants, errorShake } from '../serviceInfoUtils';

interface LocationStepProps extends StepProps {
  projectSite: string;
  setProjectSite: (site: string) => void;
  customSites: string[];
  setCustomSites: (sites: string[]) => void;
  formErrors: {[key: string]: string};
  setFormErrors: (errors: {[key: string]: string}) => void;
  errorShakeAnimate: boolean;
  moveToPrevStep: () => void;
}

const LocationStep: React.FC<LocationStepProps> = ({
  projectSite,
  setProjectSite,
  customSites,
  setCustomSites,
  formErrors,
  setFormErrors,
  errorShakeAnimate,
  moveToNextStep,
  moveToPrevStep
}) => {
  const [siteSearch, setSiteSearch] = React.useState('');
  const [newSite, setNewSite] = React.useState('');
  const [editSiteId, setEditSiteId] = React.useState<string | null>(null);
  const [editSiteValue, setEditSiteValue] = React.useState('');

  // Filtered sites based on search
  const filteredSites = customSites.filter(site => 
    site.toLowerCase().includes(siteSearch.toLowerCase())
  );

  const handleAddNewSite = () => {
    if (newSite.trim()) {
      setCustomSites([...customSites, newSite.trim()]);
      setProjectSite(newSite.trim());
      setNewSite('');
      toast.success("New project site added", {
        description: `${newSite} has been added to your sites.`,
      });
    }
  };

  const handleRemoveSite = (site: string) => {
    setCustomSites(customSites.filter(s => s !== site));
    if (projectSite === site) {
      setProjectSite('');
    }
    toast.success("Project site removed", {
      description: `${site} has been removed from your sites.`,
    });
  };

  const handleEditSite = (site: string) => {
    setEditSiteId(site);
    setEditSiteValue(site);
  };

  const handleSaveSiteEdit = () => {
    if (editSiteValue.trim() && editSiteId) {
      const oldSite = editSiteId;
      setCustomSites(customSites.map(site => 
        site === oldSite ? editSiteValue.trim() : site
      ));
      
      if (projectSite === oldSite) {
        setProjectSite(editSiteValue.trim());
      }
      
      setEditSiteValue('');
      setEditSiteId(null);
      
      toast.success("Project site updated", {
        description: `${oldSite} has been renamed to ${editSiteValue}.`,
      });
    }
  };

  const handleCancelSiteEdit = () => {
    setEditSiteId(null);
    setEditSiteValue('');
  };

  const handleSelectSite = (site: string) => {
    setProjectSite(site);
    setFormErrors({...formErrors, projectSite: ""});
  };

  return (
    <motion.div 
      key="location"
      variants={containerVariants}
      initial="hidden"
      animate={errorShakeAnimate ? "shake" : "visible"}
      exit="exit"
      className="flex flex-col min-h-[500px] p-6 bg-white rounded-xl shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <MapPin className="h-6 w-6 text-blue-600 mr-3" />
          <h2 className="text-2xl font-bold">Select Project Site</h2>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search sites..."
              value={siteSearch}
              onChange={(e) => setSiteSearch(e.target.value)}
              className="pl-10 w-[200px] h-10"
            />
          </div>
        </div>
      </div>
      
      <div className="flex gap-4 mb-4">
        <div className="flex-1 relative">
          <Input
            placeholder="Add new project site..."
            value={newSite}
            onChange={(e) => setNewSite(e.target.value)}
            className="h-10 pr-24"
          />
          <Button 
            size="sm" 
            className="absolute right-1 top-1 h-8"
            disabled={!newSite.trim()}
            onClick={handleAddNewSite}
          >
            Add Site
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-2 overflow-y-auto max-h-[300px] p-2">
        {filteredSites.map((site) => (
          <div 
            key={site}
            className={cn(
              "border rounded-lg p-3 transition-all",
              projectSite === site ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"
            )}
          >
            {editSiteId === site ? (
              <div className="flex items-center">
                <Input 
                  value={editSiteValue} 
                  onChange={(e) => setEditSiteValue(e.target.value)} 
                  className="flex-1"
                  autoFocus
                />
                <div className="flex ml-2">
                  <Button 
                    size="sm" 
                    className="mr-1 h-9"
                    onClick={handleSaveSiteEdit}
                  >
                    Save
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-9"
                    onClick={handleCancelSiteEdit}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => handleSelectSite(site)}
                >
                  <span className="font-medium">{site}</span>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0"
                    onClick={() => handleEditSite(site)}
                  >
                    <Edit className="h-4 w-4 text-gray-500" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-500"
                    onClick={() => handleRemoveSite(site)}
                  >
                    <Trash className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {filteredSites.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {siteSearch 
              ? "No sites match your search." 
              : "No project sites added yet. Add a new site above."}
          </div>
        )}
      </div>
      
      {formErrors.projectSite && (
        <motion.p 
          variants={errorShake}
          className="text-red-500 flex items-center mt-4 justify-center"
        >
          <X className="h-4 w-4 mr-1" />
          {formErrors.projectSite}
        </motion.p>
      )}
      
      <div className="mt-auto pt-4 flex justify-between">
        <Button 
          variant="outline" 
          onClick={moveToPrevStep} 
          className="text-lg h-12 px-8"
        >
          Back
        </Button>
        <Button 
          onClick={moveToNextStep} 
          className="text-lg h-12 px-8"
          disabled={!projectSite}
        >
          Continue
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </motion.div>
  );
};

export default LocationStep;
