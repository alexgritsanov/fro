
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Search, Download } from 'lucide-react';
import { OfficeFiltersProps } from './types';

const OfficeFilters: React.FC<OfficeFiltersProps> = ({
  showFilters,
  setShowFilters,
  searchTerm,
  setSearchTerm,
  activeFilter,
  setActiveFilter,
  locationFilter,
  setLocationFilter,
  serviceTypeFilter,
  setServiceTypeFilter,
  userLimitFilter,
  setUserLimitFilter,
  uniqueLocations,
  uniqueServiceTypes,
  handleResetFilters,
  handleExport
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 dark:text-gray-500" />
          <Input 
            placeholder="Search offices..." 
            className="pl-10 w-full sm:w-[350px] bg-white dark:bg-gray-800 border shadow-sm" 
            value={searchTerm} 
            onChange={e => setSearchTerm(e.target.value)} 
          />
        </div>
        
        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className={`bg-white dark:bg-gray-800 transition-colors duration-300 border-gray-200 dark:border-gray-700 ${
              showFilters ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : ''
            }`} 
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          
          <Button 
            variant="outline" 
            className="bg-white dark:bg-gray-800 transition-colors duration-300 border-gray-200 dark:border-gray-700 ml-auto sm:ml-0" 
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</h3>
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant={activeFilter === 'all' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setActiveFilter('all')} 
                  className={activeFilter === 'all' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500' : 'bg-white dark:bg-gray-800'}
                >
                  All
                </Button>
                <Button 
                  variant={activeFilter === 'active' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setActiveFilter('active')} 
                  className={activeFilter === 'active' ? 'bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500' : 'bg-white dark:bg-gray-800'}
                >
                  Active
                </Button>
                <Button 
                  variant={activeFilter === 'inactive' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setActiveFilter('inactive')} 
                  className={activeFilter === 'inactive' ? 'bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500' : 'bg-white dark:bg-gray-800'}
                >
                  Inactive
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Location</h3>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueLocations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Service Type</h3>
              <Select value={serviceTypeFilter} onValueChange={setServiceTypeFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueServiceTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type === 'all' ? 'All Service Types' : type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">User Limit</h3>
              <Select value={userLimitFilter} onValueChange={setUserLimitFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select user limit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Limits</SelectItem>
                  <SelectItem value="small">Small (&lt; 100 users)</SelectItem>
                  <SelectItem value="medium">Medium (100-300 users)</SelectItem>
                  <SelectItem value="large">Large (&gt; 300 users)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" onClick={handleResetFilters} className="mr-2">
              Reset Filters
            </Button>
            <Button onClick={() => setShowFilters(false)}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default OfficeFilters;
