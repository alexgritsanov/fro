import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  FileText, 
  FileImage, 
  FileArchive, 
  FileCheck, 
  Upload, 
  FolderPlus, 
  Search, 
  List, 
  Grid, 
  MoreHorizontal, 
  Download, 
  Trash, 
  Share,
  MessageSquare
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DocumentChatButton from '@/components/documents/DocumentChatButton';

interface UserFilesProps {
  userId: string;
  role: string;
  userName?: string;
}

const UserFiles: React.FC<UserFilesProps> = ({ userId, role, userName = 'User' }) => {
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const folders = [
    { id: '1', name: 'Documents', count: 12, icon: <FileText className="h-6 w-6" /> },
    { id: '2', name: 'Images', count: 8, icon: <FileImage className="h-6 w-6" /> },
    { id: '3', name: 'Archives', count: 5, icon: <FileArchive className="h-6 w-6" /> },
    { id: '4', name: 'Contracts', count: 3, icon: <FileCheck className="h-6 w-6" /> },
  ];

  const generateFiles = () => {
    const baseFiles = [
      { 
        id: '1', 
        name: 'Profile Documentation.pdf', 
        type: 'pdf', 
        size: '2.4 MB', 
        modified: '2023-05-22', 
        folder: 'Documents',
        icon: <FileText className="h-8 w-8 text-blue-500" />
      },
      { 
        id: '2', 
        name: 'Contract Agreement.pdf', 
        type: 'pdf', 
        size: '1.8 MB', 
        modified: '2023-06-14', 
        folder: 'Contracts',
        icon: <FileCheck className="h-8 w-8 text-green-500" /> 
      },
      { 
        id: '3', 
        name: 'ID Document.jpg', 
        type: 'jpg', 
        size: '3.5 MB', 
        modified: '2023-07-03', 
        folder: 'Images',
        icon: <FileImage className="h-8 w-8 text-purple-500" /> 
      },
    ];
    
    if (role === 'employee' || role === 'subcontractor') {
      baseFiles.push(
        { 
          id: '4', 
          name: 'Performance Review.pdf', 
          type: 'pdf', 
          size: '0.9 MB', 
          modified: '2023-08-12', 
          folder: 'Documents',
          icon: <FileText className="h-8 w-8 text-blue-500" /> 
        },
        { 
          id: '5', 
          name: 'Training Certificate.pdf', 
          type: 'pdf', 
          size: '1.2 MB', 
          modified: '2023-04-18', 
          folder: 'Documents',
          icon: <FileText className="h-8 w-8 text-blue-500" /> 
        }
      );
    } else if (role === 'client') {
      baseFiles.push(
        { 
          id: '4', 
          name: 'Service Agreement.pdf', 
          type: 'pdf', 
          size: '2.1 MB', 
          modified: '2023-07-22', 
          folder: 'Contracts',
          icon: <FileCheck className="h-8 w-8 text-green-500" /> 
        },
        { 
          id: '5', 
          name: 'Company Logo.png', 
          type: 'png', 
          size: '0.8 MB', 
          modified: '2023-03-10', 
          folder: 'Images',
          icon: <FileImage className="h-8 w-8 text-purple-500" /> 
        }
      );
    }
    
    return baseFiles;
  };

  const files = generateFiles();
  
  const filteredFiles = files.filter(file => {
    const matchesTab = activeTab === 'all' || file.folder.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleDiscussDocument = (file: any) => {
    // This functionality is now handled by the DocumentChatButton component
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search files..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <FolderPlus className="h-4 w-4" />
            <span>New Folder</span>
          </Button>
          <Button variant="default" size="sm" className="flex items-center gap-1">
            <Upload className="h-4 w-4" />
            <span>Upload</span>
          </Button>
          <div className="flex border rounded overflow-hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-2 rounded-none ${activeView === 'grid' ? 'bg-blue-50 text-blue-600' : ''}`}
              onClick={() => setActiveView('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`px-2 rounded-none ${activeView === 'list' ? 'bg-blue-50 text-blue-600' : ''}`}
              onClick={() => setActiveView('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b">
          <TabsList className="h-12 bg-transparent w-full justify-start space-x-2 px-0">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 hover:text-blue-600">
              All Files
            </TabsTrigger>
            {folders.map(folder => (
              <TabsTrigger 
                key={folder.id} 
                value={folder.name.toLowerCase()} 
                className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 hover:text-blue-600"
              >
                {folder.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-6">
          {activeView === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {folders.map(folder => (
                <div 
                  key={folder.id}
                  className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer flex items-start"
                >
                  <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    {folder.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{folder.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{folder.count} files</p>
                  </div>
                </div>
              ))}
              
              {filteredFiles.map(file => (
                <div 
                  key={file.id}
                  className="bg-white border rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
                >
                  <div className="p-4 pb-2 flex justify-between items-start">
                    <div className="flex items-center justify-center">
                      {file.icon}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <Share className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center text-red-600">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="px-4 pb-4">
                    <h3 className="font-medium text-gray-900 truncate" title={file.name}>{file.name}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="text-xs bg-gray-50">
                        {file.type.toUpperCase()}
                      </Badge>
                      <span className="text-xs text-gray-500">{file.size}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Modified: {file.modified}</p>
                    <div className="flex justify-between items-center mt-3">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-1 h-auto">
                        <Download className="h-4 w-4" />
                      </Button>
                      
                      <DocumentChatButton
                        documentId={file.id}
                        documentType={getDocumentTypeForFile(file)}
                        documentName={file.name}
                        size="sm"
                        variant="ghost"
                        className="text-gray-500 hover:text-gray-700 p-1 h-auto"
                        hideLabel={true}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredFiles.map(file => (
                <div 
                  key={file.id}
                  className="bg-white border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex items-center justify-center mr-3 flex-shrink-0">
                      {file.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{file.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs bg-gray-50">
                          {file.type.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-gray-500">{file.size}</span>
                        <span className="text-xs text-gray-500">Modified: {file.modified}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download className="h-4 w-4" />
                    </Button>
                    
                    <DocumentChatButton
                      documentId={file.id}
                      documentType={getDocumentTypeForFile(file)}
                      documentName={file.name}
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      hideLabel={true}
                    />
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center">
                          <Share className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center text-red-600">
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {filteredFiles.length === 0 && (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                <FileText className="h-12 w-12" />
              </div>
              <h3 className="font-medium text-gray-900">No files found</h3>
              <p className="text-gray-500 mt-1">
                {searchQuery ? 'Try adjusting your search term' : 'Upload files to get started'}
              </p>
            </div>
          )}
        </TabsContent>

        {folders.map(folder => (
          <TabsContent key={folder.id} value={folder.name.toLowerCase()} className="mt-6">
            <div className={activeView === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-2'}>
              {filteredFiles
                .filter(file => file.folder.toLowerCase() === folder.name.toLowerCase())
                .map(file => (
                  activeView === 'grid' ? (
                    <div 
                      key={file.id}
                      className="bg-white border rounded-lg hover:shadow-md transition-shadow cursor-pointer group"
                    >
                      <div className="p-4 pb-2 flex justify-between items-start">
                        <div className="flex items-center justify-center">
                          {file.icon}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <Share className="h-4 w-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center text-red-600">
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="px-4 pb-4">
                        <h3 className="font-medium text-gray-900 truncate" title={file.name}>{file.name}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <Badge variant="outline" className="text-xs bg-gray-50">
                            {file.type.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-gray-500">{file.size}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Modified: {file.modified}</p>
                      </div>
                    </div>
                  ) : (
                    <div 
                      key={file.id}
                      className="bg-white border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex items-center justify-center mr-3 flex-shrink-0">
                          {file.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{file.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs bg-gray-50">
                              {file.type.toUpperCase()}
                            </Badge>
                            <span className="text-xs text-gray-500">{file.size}</span>
                            <span className="text-xs text-gray-500">Modified: {file.modified}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Download className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="flex items-center">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center">
                              <Share className="h-4 w-4 mr-2" />
                              Share
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center text-red-600">
                              <Trash className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  )
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

function getDocumentTypeForFile(file: any): 'service-call' | 'delivery-certificate' | 'price-agreement' | 'report' | 'invoice' {
  const fileName = file.name.toLowerCase();
  const folder = file.folder.toLowerCase();
  
  if (folder === 'documents' || fileName.includes('service') || fileName.includes('call')) {
    return 'service-call';
  } else if (folder === 'contracts' || fileName.includes('agreement') || fileName.includes('contract')) {
    return 'price-agreement';
  } else if (fileName.includes('certificate') || fileName.includes('delivery')) {
    return 'delivery-certificate';
  } else if (fileName.includes('invoice') || fileName.includes('bill')) {
    return 'invoice';
  } else {
    return 'report';
  }
}

export default UserFiles;
