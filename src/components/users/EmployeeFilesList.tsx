
import React, { useState } from 'react';
import {
  FileText, Download, Eye, FileImage, Calendar, File, Search, Filter, Grid, List as ListIcon,
  FolderOpen, FilePlus, Upload, MoreHorizontal, FileSpreadsheet, ArrowLeft, User, Tag, Image, 
  FileCheck, MessageSquare, Clock, CheckCircle, XCircle, ExternalLink, PlusCircle, Trash
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import Card from '@/components/Card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

// Enhanced folder data with improved organization
const mockFolders = [
  { 
    id: '1', 
    name: 'Employment Documents', 
    count: 6, 
    icon: FileCheck, 
    color: 'text-amber-500',
    description: 'Employment contracts and agreements', 
    lastUpdated: '2023-11-25'
  },
  { 
    id: '2', 
    name: 'Training Certificates', 
    count: 8, 
    icon: FileText, 
    color: 'text-blue-500',
    description: 'Completed training and certification records', 
    lastUpdated: '2023-10-31'
  },
  { 
    id: '3', 
    name: 'ID Documents', 
    count: 5, 
    icon: FileText, 
    color: 'text-green-500',
    description: 'Identification and verification documents', 
    lastUpdated: '2023-11-15'
  },
  { 
    id: '4', 
    name: 'Performance Reviews', 
    count: 4, 
    icon: FileText, 
    color: 'text-purple-500',
    description: 'Annual and quarterly performance reviews', 
    lastUpdated: '2023-09-20'
  },
  { 
    id: '5', 
    name: 'Service Records', 
    count: 7, 
    icon: FolderOpen, 
    color: 'text-orange-500',
    description: 'Service delivery and client interaction records', 
    lastUpdated: '2023-11-28'
  },
  { 
    id: '6', 
    name: 'Field Photos', 
    count: 12, 
    icon: Image, 
    color: 'text-indigo-500',
    description: 'On-site job and equipment photos', 
    lastUpdated: '2023-11-05'
  }
];

// Improved files data with more detail and consistent structure
const mockFiles = {
  '1': [
    { 
      id: 'f1', 
      name: 'Employment Contract.pdf', 
      type: 'PDF', 
      size: '3.2 MB', 
      date: '2023-11-24', 
      status: 'signed',
      tags: ['contract', 'signed', 'employment'],
      createdBy: 'HR Department',
      thumbnail: null
    },
    { 
      id: 'f2', 
      name: 'Non-Disclosure Agreement.pdf', 
      type: 'PDF', 
      size: '2.8 MB', 
      date: '2023-10-18', 
      status: 'signed',
      tags: ['nda', 'signed', 'legal'],
      createdBy: 'Legal Department',
      thumbnail: null
    },
    { 
      id: 'f3', 
      name: 'Employee Handbook Acknowledgment.pdf', 
      type: 'PDF', 
      size: '3.5 MB', 
      date: '2023-09-05', 
      status: 'signed',
      tags: ['handbook', 'policy', 'signed'],
      createdBy: 'HR Department',
      thumbnail: null
    },
    { 
      id: 'f4', 
      name: 'Background Check Consent.pdf', 
      type: 'PDF', 
      size: '2.9 MB', 
      date: '2023-08-10', 
      status: 'signed',
      tags: ['background', 'consent', 'legal'],
      createdBy: 'HR Department',
      thumbnail: null
    },
    { 
      id: 'f5', 
      name: 'Benefits Enrollment Form.pdf', 
      type: 'PDF', 
      size: '3.1 MB', 
      date: '2023-07-22', 
      status: 'signed',
      tags: ['benefits', 'enrollment', 'hr'],
      createdBy: 'HR Department',
      thumbnail: null
    },
    { 
      id: 'f6', 
      name: 'Confidentiality Agreement.pdf', 
      type: 'PDF', 
      size: '3.0 MB', 
      date: '2023-06-15', 
      status: 'pending',
      tags: ['confidentiality', 'legal', 'pending'],
      createdBy: 'Legal Department',
      thumbnail: null
    }
  ],
  '2': [
    { 
      id: 'f7', 
      name: 'Safety Training Certificate.pdf', 
      type: 'PDF', 
      size: '1.8 MB', 
      date: '2023-11-30', 
      status: 'completed',
      tags: ['training', 'safety', 'certificate'],
      createdBy: 'Training Department',
      thumbnail: null
    },
    { 
      id: 'f8', 
      name: 'Equipment Operation Certification.pdf', 
      type: 'PDF', 
      size: '1.9 MB', 
      date: '2023-10-31', 
      status: 'completed',
      tags: ['equipment', 'certification', 'operations'],
      createdBy: 'Operations Department',
      thumbnail: null
    },
    { 
      id: 'f9', 
      name: 'First Aid Training.pdf', 
      type: 'PDF', 
      size: '4.5 MB', 
      date: '2023-09-30', 
      status: 'completed',
      tags: ['first aid', 'medical', 'training'],
      createdBy: 'Safety Department',
      thumbnail: null
    },
    { 
      id: 'f10', 
      name: 'Customer Service Workshop.pdf', 
      type: 'PDF', 
      size: '2.0 MB', 
      date: '2023-09-30', 
      status: 'completed',
      tags: ['customer service', 'workshop', 'training'],
      createdBy: 'Training Department',
      thumbnail: null
    },
    { 
      id: 'f11', 
      name: 'Leadership Development Program.pdf', 
      type: 'PDF', 
      size: '1.7 MB', 
      date: '2023-08-31', 
      status: 'completed',
      tags: ['leadership', 'development', 'training'],
      createdBy: 'HR Department',
      thumbnail: null
    },
    { 
      id: 'f12', 
      name: 'Quality Assurance Certification.pdf', 
      type: 'PDF', 
      size: '4.2 MB', 
      date: '2023-06-30', 
      status: 'completed',
      tags: ['quality', 'certification', 'standards'],
      createdBy: 'Quality Department',
      thumbnail: null
    }
  ],
  '6': [
    { 
      id: 'f25', 
      name: 'Job Site - Project Alpha.jpg', 
      type: 'JPG', 
      size: '3.8 MB', 
      date: '2023-11-05', 
      status: 'active',
      tags: ['photo', 'job site', 'project alpha'],
      createdBy: 'Field Operations',
      thumbnail: null
    },
    { 
      id: 'f26', 
      name: 'Equipment Setup - Client XYZ.jpg', 
      type: 'JPG', 
      size: '4.2 MB', 
      date: '2023-11-05', 
      status: 'active',
      tags: ['photo', 'equipment', 'client xyz'],
      createdBy: 'Field Operations',
      thumbnail: null
    },
    { 
      id: 'f27', 
      name: 'Safety Inspection - Site B.jpg', 
      type: 'JPG', 
      size: '2.9 MB', 
      date: '2023-11-05', 
      status: 'active',
      tags: ['photo', 'safety', 'inspection'],
      createdBy: 'Safety Department',
      thumbnail: null
    },
    { 
      id: 'f28', 
      name: 'Client Meeting - Project Omega.jpg', 
      type: 'JPG', 
      size: '5.1 MB', 
      date: '2023-10-15', 
      status: 'active',
      tags: ['photo', 'client', 'meeting'],
      createdBy: 'Account Management',
      thumbnail: null
    },
    { 
      id: 'f29', 
      name: 'Equipment Maintenance - Before.jpg', 
      type: 'JPG', 
      size: '3.4 MB', 
      date: '2023-09-18', 
      status: 'active',
      tags: ['photo', 'maintenance', 'before'],
      createdBy: 'Maintenance Team',
      thumbnail: null
    },
    { 
      id: 'f30', 
      name: 'Equipment Maintenance - After.jpg', 
      type: 'JPG', 
      size: '3.6 MB', 
      date: '2023-09-18', 
      status: 'active',
      tags: ['photo', 'maintenance', 'after'],
      createdBy: 'Maintenance Team',
      thumbnail: null
    }
  ]
};

interface EmployeeFilesListProps {
  userId: string;
}

const EmployeeFilesList: React.FC<EmployeeFilesListProps> = ({ userId }) => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('dateDesc');
  const [tagFilter, setTagFilter] = useState('all');
  const [selectedFile, setSelectedFile] = useState<any | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  
  // Get all unique tags across files
  const getAllTags = () => {
    const tags = new Set<string>();
    Object.values(mockFiles).forEach(files => {
      files.forEach(file => {
        file.tags?.forEach(tag => tags.add(tag));
      });
    });
    return Array.from(tags);
  };
  
  const allTags = getAllTags();

  // Filter files based on search term and tag filter
  const getFilteredFiles = () => {
    if (!selectedFolder) return [];
    
    return (mockFiles[selectedFolder] || []).filter(file => {
      const nameMatch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
      const tagMatch = tagFilter === 'all' || (file.tags && file.tags.includes(tagFilter));
      
      // Apply date range filter
      let dateMatch = true;
      if (dateRange !== 'all') {
        const fileDate = new Date(file.date);
        const now = new Date();
        
        switch (dateRange) {
          case 'today':
            dateMatch = fileDate.toDateString() === now.toDateString();
            break;
          case 'thisWeek':
            const lastWeek = new Date(now);
            lastWeek.setDate(now.getDate() - 7);
            dateMatch = fileDate >= lastWeek;
            break;
          case 'thisMonth':
            dateMatch = fileDate.getMonth() === now.getMonth() && 
                        fileDate.getFullYear() === now.getFullYear();
            break;
          case 'thisYear':
            dateMatch = fileDate.getFullYear() === now.getFullYear();
            break;
        }
      }
      
      return nameMatch && tagMatch && dateMatch;
    });
  };

  const getSortedFiles = () => {
    const filteredFiles = getFilteredFiles();
    
    return [...filteredFiles].sort((a, b) => {
      switch (sortBy) {
        case 'nameAsc':
          return a.name.localeCompare(b.name);
        case 'nameDesc':
          return b.name.localeCompare(a.name);
        case 'dateAsc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'dateDesc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'sizeAsc':
          return parseFloat(a.size) - parseFloat(b.size);
        case 'sizeDesc':
          return parseFloat(b.size) - parseFloat(a.size);
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  };

  const filteredFiles = getSortedFiles();
  
  const getFileIcon = (fileType: string, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeMap = {
      sm: 'h-6 w-6',
      md: 'h-10 w-10',
      lg: 'h-16 w-16'
    };
    
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <FileText className={`${sizeMap[size]} text-red-500`} />;
      case 'docx':
      case 'doc':
        return <FileText className={`${sizeMap[size]} text-blue-500`} />;
      case 'xlsx':
      case 'xls':
        return <FileSpreadsheet className={`${sizeMap[size]} text-green-500`} />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FileImage className={`${sizeMap[size]} text-purple-500`} />;
      default:
        return <File className={`${sizeMap[size]} text-gray-500`} />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'signed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Signed</Badge>;
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Completed</Badge>;
      case 'paid':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Paid</Badge>;
      case 'active':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Active</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const handleOpenFilePreview = (file: any) => {
    setSelectedFile(file);
  };
  
  const handleCloseFilePreview = () => {
    setSelectedFile(null);
  };
  
  const handleSelectFolder = (folderId: string) => {
    setSelectedFolder(folderId);
    setSelectedFile(null);
  };
  
  const handleBackToFolders = () => {
    setSelectedFolder(null);
    setSelectedFile(null);
  };

  return (
    <div className="space-y-4">
      {selectedFile ? (
        // File preview mode
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0" 
              onClick={handleCloseFilePreview}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to files
            </Button>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4 mr-2" />
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="h-4 w-4 mr-2" />
                    Open in new tab
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add Comment
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500">
                    <Trash className="h-4 w-4 mr-2" />
                    Delete File
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-start">
                {getFileIcon(selectedFile.type, 'lg')}
                <div className="ml-4">
                  <h2 className="text-xl font-semibold mb-1">{selectedFile.name}</h2>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      {format(new Date(selectedFile.date), 'MMM dd, yyyy')}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FileText className="h-4 w-4 mr-1 text-gray-400" />
                      {selectedFile.size}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="h-4 w-4 mr-1 text-gray-400" />
                      {selectedFile.createdBy}
                    </div>
                    {getStatusBadge(selectedFile.status)}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedFile.tags?.map((tag: string) => (
                      <Badge key={tag} variant="outline" className="bg-gray-100">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <Tabs defaultValue="preview">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="comments">Comments</TabsTrigger>
                </TabsList>
                
                <TabsContent value="preview" className="pt-4">
                  <div className="flex items-center justify-center bg-gray-50 rounded-lg h-[400px] border border-gray-200">
                    {selectedFile.type.toLowerCase() === 'jpg' || 
                     selectedFile.type.toLowerCase() === 'png' || 
                     selectedFile.type.toLowerCase() === 'jpeg' ? (
                      <div className="text-center p-8">
                        <FileImage className="h-24 w-24 mx-auto text-gray-300" />
                        <p className="mt-4 text-gray-500">Image preview would appear here</p>
                      </div>
                    ) : selectedFile.type.toLowerCase() === 'pdf' ? (
                      <div className="text-center p-8">
                        <FileText className="h-24 w-24 mx-auto text-gray-300" />
                        <p className="mt-4 text-gray-500">PDF preview would appear here</p>
                      </div>
                    ) : (
                      <div className="text-center p-8">
                        <File className="h-24 w-24 mx-auto text-gray-300" />
                        <p className="mt-4 text-gray-500">Preview not available for this file type</p>
                        <Button variant="outline" className="mt-4">
                          <Download className="h-4 w-4 mr-2" />
                          Download to View
                        </Button>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="activity" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex items-center p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-blue-700">File uploaded by {selectedFile.createdBy}</p>
                        <p className="text-xs text-blue-600">
                          {format(new Date(selectedFile.date), 'MMM dd, yyyy h:mm a')}
                        </p>
                      </div>
                    </div>
                    
                    {selectedFile.status === 'signed' && (
                      <div className="flex items-center p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                        <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-green-700">Document signed by employee</p>
                          <p className="text-xs text-green-600">
                            {format(new Date(selectedFile.date), 'MMM dd, yyyy h:mm a')}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {selectedFile.status === 'pending' && (
                      <div className="flex items-center p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
                        <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mr-3">
                          <Clock className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-yellow-700">Awaiting signature from employee</p>
                          <p className="text-xs text-yellow-600">
                            {format(new Date(selectedFile.date), 'MMM dd, yyyy h:mm a')}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="comments" className="pt-4">
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <p className="text-center text-gray-500">No comments yet.</p>
                    <div className="mt-4">
                      <Textarea placeholder="Add a comment..." className="min-h-[100px]" />
                      <Button className="mt-2">Post Comment</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Header and controls */}
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div className="flex items-center gap-2">
              {selectedFolder ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 mr-2" 
                  onClick={handleBackToFolders}
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to folders
                </Button>
              ) : (
                <h3 className="text-lg font-medium">Document Library</h3>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsUploadDialogOpen(true)}
              >
                <Upload className="h-4 w-4 mr-2" />
                <span>Upload</span>
              </Button>
              {selectedFolder && (
                <Button variant="outline" size="sm">
                  <FilePlus className="h-4 w-4 mr-2" />
                  <span>New File</span>
                </Button>
              )}
            </div>
          </div>
          
          {/* Search and filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="relative flex-1 min-w-0 w-full">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input 
                placeholder={selectedFolder ? "Search files..." : "Search folders..."} 
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {selectedFolder && (
                <>
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="thisWeek">This Week</SelectItem>
                      <SelectItem value="thisMonth">This Month</SelectItem>
                      <SelectItem value="thisYear">This Year</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={tagFilter} onValueChange={setTagFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Filter by Tag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tags</SelectItem>
                      {allTags.map(tag => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nameAsc">Name (A-Z)</SelectItem>
                      <SelectItem value="nameDesc">Name (Z-A)</SelectItem>
                      <SelectItem value="dateAsc">Date (Oldest)</SelectItem>
                      <SelectItem value="dateDesc">Date (Newest)</SelectItem>
                      <SelectItem value="sizeAsc">Size (Smallest)</SelectItem>
                      <SelectItem value="sizeDesc">Size (Largest)</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
              
              <div className="flex rounded-md border border-gray-200 overflow-hidden">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    'rounded-none px-2',
                    viewMode === 'grid' ? 'bg-gray-100' : ''
                  )}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    'rounded-none px-2',
                    viewMode === 'list' ? 'bg-gray-100' : ''
                  )}
                  onClick={() => setViewMode('list')}
                >
                  <ListIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Folder/File display */}
          {!selectedFolder ? (
            // Folders view - enhanced with more visual appeal
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mockFolders
                .filter(folder => folder.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((folder) => (
                  <Card 
                    key={folder.id} 
                    className="p-5 hover:shadow-md transition-shadow flex flex-col h-full border border-gray-100 bg-white relative overflow-hidden group"
                    interactive
                    onClick={() => handleSelectFolder(folder.id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start relative z-10">
                      <div className={cn(
                        "h-12 w-12 rounded-xl flex items-center justify-center",
                        folder.color === 'text-amber-500' ? 'bg-amber-100' :
                        folder.color === 'text-blue-500' ? 'bg-blue-100' :
                        folder.color === 'text-green-500' ? 'bg-green-100' :
                        folder.color === 'text-purple-500' ? 'bg-purple-100' :
                        folder.color === 'text-orange-500' ? 'bg-orange-100' :
                        folder.color === 'text-indigo-500' ? 'bg-indigo-100' :
                        'bg-gray-100'
                      )}>
                        <folder.icon className={cn("h-6 w-6", folder.color)} />
                      </div>
                      <div className="flex-1 ml-3">
                        <h3 className="font-medium text-base mb-1">{folder.name}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2">{folder.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-medium">{folder.count} files</span>
                          <span className="text-xs text-gray-500">Updated: {folder.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </Card>
                ))}
            </div>
          ) : (
            // Files view based on selected mode
            viewMode === 'grid' ? (
              // Enhanced grid view with better visual presentation
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredFiles.map((file) => (
                  <Card 
                    key={file.id} 
                    className="overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col h-full border border-gray-100 bg-white group"
                    interactive
                    onClick={() => handleOpenFilePreview(file)}
                  >
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center justify-center h-14 w-14 bg-gray-50 rounded-lg">
                          {file.type.toLowerCase() === 'jpg' || 
                           file.type.toLowerCase() === 'png' || 
                           file.type.toLowerCase() === 'jpeg' ? (
                            // Show thumbnail for images 
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                              <FileImage className="h-8 w-8 text-gray-400" />
                            </div>
                          ) : (
                            getFileIcon(file.type)
                          )}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              handleOpenFilePreview(file);
                            }}>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Open in New Tab
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Comment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <h3 className="font-medium text-sm mb-2 line-clamp-2">{file.name}</h3>
                      
                      <div className="flex flex-wrap gap-1 mt-1 mb-2">
                        {file.tags?.slice(0, 2).map((tag: string) => (
                          <Badge 
                            key={tag} 
                            variant="outline" 
                            className="text-xs py-0 h-5"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {(file.tags?.length || 0) > 2 && (
                          <Badge variant="outline" className="text-xs py-0 h-5">
                            +{file.tags!.length - 2}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="mt-auto pt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                          <span>{file.size}</span>
                          <span>{format(new Date(file.date), 'MMM dd, yyyy')}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          {getStatusBadge(file.status)}
                          <span className="text-xs text-gray-500">{file.createdBy}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              // Enhanced table view with better visual organization
              <div className="rounded-md border border-gray-200 overflow-hidden bg-white">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="hidden md:table-cell">Size</TableHead>
                      <TableHead className="hidden lg:table-cell">Created By</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredFiles.map((file) => (
                      <TableRow 
                        key={file.id}
                        className="cursor-pointer hover:bg-gray-50"
                        onClick={() => handleOpenFilePreview(file)}
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {getFileIcon(file.type, 'sm')}
                            <div>
                              <span className="font-medium text-sm">{file.name}</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {file.tags?.slice(0, 2).map((tag: string) => (
                                  <Badge 
                                    key={tag} 
                                    variant="outline" 
                                    className="text-xs py-0 h-5"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                                {(file.tags?.length || 0) > 2 && (
                                  <Badge variant="outline" className="text-xs py-0 h-5">
                                    +{file.tags!.length - 2}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {format(new Date(file.date), 'MMM dd, yyyy')}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{file.size}</TableCell>
                        <TableCell className="hidden lg:table-cell">{file.createdBy}</TableCell>
                        <TableCell>{getStatusBadge(file.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleOpenFilePreview(file);
                              }}>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Comment
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          )}
          
          {/* Enhanced empty state */}
          {((selectedFolder && filteredFiles.length === 0) || 
           (!selectedFolder && mockFolders.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0)) && (
            <div className="mt-8 text-center bg-white rounded-lg border border-gray-100 p-8">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                {selectedFolder ? (
                  <FileText className="h-8 w-8 text-gray-300" />
                ) : (
                  <FolderOpen className="h-8 w-8 text-gray-300" />
                )}
              </div>
              <h3 className="text-lg font-medium mb-2">No {selectedFolder ? 'files' : 'folders'} found</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                {selectedFolder 
                  ? (searchTerm || dateRange !== 'all' || tagFilter !== 'all'
                    ? "Try changing your search or filter criteria" 
                    : "This folder is empty. Upload files to get started.")
                  : (searchTerm
                    ? "Try changing your search term" 
                    : "No folders found. Create a new folder to organize your files.")}
              </p>
              <Button 
                className="bg-blue-600"
                onClick={() => selectedFolder ? setIsUploadDialogOpen(true) : null}
              >
                {selectedFolder ? (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Files
                  </>
                ) : (
                  <>
                    <FolderOpen className="h-4 w-4 mr-2" />
                    Create Folder
                  </>
                )}
              </Button>
            </div>
          )}
          
          {/* File upload dialog */}
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Upload Files</DialogTitle>
                <DialogDescription>
                  Upload files to {selectedFolder ? mockFolders.find(f => f.id === selectedFolder)?.name || 'this folder' : 'your document library'}.
                </DialogDescription>
              </DialogHeader>
              
              <div className="border-2 border-dashed rounded-lg p-10 text-center">
                <Upload className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Drag and drop files here</h3>
                <p className="text-sm text-gray-500 mb-4">or</p>
                <Button>
                  Browse Files
                </Button>
                <p className="text-xs text-gray-500 mt-4">
                  Accepted file types: PDF, DOCX, XLSX, JPG, PNG (Max file size: 10MB)
                </p>
              </div>
              
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
                  Cancel
                </Button>
                <Button disabled className="bg-blue-600">
                  Upload Files
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default EmployeeFilesList;
