import React, { useState } from 'react';
import { ChevronDown, Mail, Phone, Calendar, Clock, MoreHorizontal, FileWarning, FolderOpen, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import Avatar from '@/components/Avatar';
import UserModal from './UserModal';
import UserFolder from './UserFolder';
import DocumentUploadModal from './DocumentUploadModal';

interface UserManagementProps {
  activeFilter: string;
  onCreateUser: () => void;
}

const UserManagement = ({ activeFilter, onCreateUser }: UserManagementProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedDocumentInfo, setSelectedDocumentInfo] = useState<{userId: string, userName: string, missingCount: number} | null>(null);
  
  const users = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@unidoc.com',
      phone: '+972 50-111-2222',
      role: 'employee',
      position: 'operator',
      status: 'active',
      addedDate: 'Mar 22, 2025',
      lastActive: 'Aug 20, 2023',
      missingDocuments: 2
    },
    {
      id: '2',
      name: 'Emily Johnson',
      email: 'emily.johnson@unidoc.com',
      phone: '+972 50-222-3333',
      role: 'employee',
      position: 'operator',
      status: 'active',
      addedDate: 'Mar 22, 2025',
      lastActive: 'Aug 21, 2023',
      missingDocuments: 0
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael.brown@unidoc.com',
      phone: '+972 50-333-4444',
      role: 'employee',
      position: 'operator',
      status: 'active',
      addedDate: 'Mar 22, 2025',
      lastActive: 'Aug 19, 2023',
      missingDocuments: 1
    },
    {
      id: '4',
      name: 'Jessica Davis',
      email: 'jessica.davis@unidoc.com',
      phone: '+972 50-444-5555',
      role: 'employee',
      position: 'operator',
      status: 'active',
      addedDate: 'Mar 22, 2025', 
      lastActive: 'Aug 21, 2023',
      missingDocuments: 0
    },
    {
      id: '5',
      name: 'David Miller',
      email: 'david.miller@unidoc.com',
      phone: '+972 50-555-6666',
      role: 'admin',
      position: 'admin',
      status: 'active',
      addedDate: 'Mar 22, 2025',
      lastActive: 'Aug 21, 2023',
      missingDocuments: 0
    },
    {
      id: '6',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@unidoc.com',
      phone: '+972 50-666-7777',
      role: 'office',
      position: 'office',
      status: 'active',
      addedDate: 'Mar 22, 2025',
      lastActive: 'Aug 21, 2023',
      missingDocuments: 0
    },
    {
      id: '7',
      name: 'Acme Corporation',
      email: 'contact@acme.com',
      phone: '+972 50-777-8888',
      role: 'client',
      position: 'client',
      status: 'active',
      addedDate: 'Mar 22, 2025',
      lastActive: 'Aug 22, 2023',
      missingDocuments: 3
    },
    {
      id: '8',
      name: 'Tech Solutions Inc.',
      email: 'info@techsolutions.com',
      phone: '+972 50-888-9999',
      role: 'client',
      position: 'client',
      status: 'inactive',
      addedDate: 'Mar 21, 2025',
      lastActive: 'Aug 15, 2023',
      missingDocuments: 2
    },
    {
      id: '9',
      name: 'Mark Johnson',
      email: 'mark.johnson@unidoc.com',
      phone: '+972 50-999-0000',
      role: 'subcontractor',
      position: 'subcontractor',
      status: 'active',
      addedDate: 'Mar 20, 2025',
      lastActive: 'Aug 18, 2023',
      missingDocuments: 4
    },
    {
      id: '10',
      name: 'Laura Clarke',
      email: 'laura.clarke@unidoc.com',
      phone: '+972 51-111-2222',
      role: 'foreman',
      position: 'foreman',
      status: 'active',
      addedDate: 'Mar 19, 2025',
      lastActive: 'Aug 17, 2023',
      missingDocuments: 1
    }
  ];
  
  const filteredUsers = activeFilter === 'all' 
    ? users 
    : users.filter(user => user.role === activeFilter);
  
  const handleOpenModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleOpenFolder = (user: any) => {
    if (user) {
      setSelectedUser(user);
      setIsFolderOpen(true);
    }
  };
  
  const handleCloseFolder = () => {
    setIsFolderOpen(false);
    setTimeout(() => setSelectedUser(null), 300);
  };
  
  const handleOpenDocumentModal = (userId: string, userName: string, missingCount: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDocumentInfo({userId, userName, missingCount});
    setIsDocumentModalOpen(true);
  };
  
  const handleCloseDocumentModal = () => {
    setIsDocumentModalOpen(false);
    setSelectedDocumentInfo(null);
  };
  
  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'client':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'employee':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'subcontractor':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'foreman':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'office':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'admin':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredUsers.map(user => (
          <div 
            key={user.id} 
            className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer"
            onClick={() => handleOpenFolder(user)}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar 
                    alt={user.name} 
                    className={`${
                      user.role === 'client' ? 'bg-amber-100' : 
                      user.role === 'employee' ? 'bg-green-100' : 
                      user.role === 'subcontractor' ? 'bg-purple-100' : 
                      user.role === 'foreman' ? 'bg-indigo-100' : 
                      user.role === 'office' ? 'bg-cyan-100' : 
                      'bg-blue-100'
                    }`}
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{user.name}</h3>
                    <Badge variant="outline" className={getRoleBadgeClass(user.role)}>
                      {user.position}
                    </Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-500"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      handleOpenModal(user);
                    }}>
                      <UserCog className="h-4 w-4 mr-2" />
                      Edit User
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => {
                      e.stopPropagation();
                      handleOpenDocumentModal(user.id, user.name, user.missingDocuments, e);
                    }}>
                      Manage Documents
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Reset Password
                    </DropdownMenuItem>
                    {user.status === 'active' ? (
                      <DropdownMenuItem className="text-red-600">
                        Deactivate User
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem className="text-green-600">
                        Activate User
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {user.missingDocuments > 0 && (
                <div 
                  className="mb-3 bg-amber-50 border border-amber-200 rounded p-2 flex items-start space-x-2 cursor-pointer hover:bg-amber-100 transition-colors"
                  onClick={(e) => handleOpenDocumentModal(user.id, user.name, user.missingDocuments, e)}
                >
                  <FileWarning className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-800">
                    <p className="font-medium">Missing Documents</p>
                    <p>{user.missingDocuments} required {user.missingDocuments === 1 ? 'document' : 'documents'} missing</p>
                  </div>
                </div>
              )}
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="truncate">{user.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{user.phone}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Added {user.addedDate}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Last login {user.lastActive}</span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <Badge variant="outline" className={user.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-700 border-gray-200'}>
                  {user.status}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-blue-600 border-blue-200 hover:bg-blue-50 flex items-center gap-1.5"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenFolder(user);
                  }}
                >
                  <FolderOpen className="h-4 w-4" />
                  Open Folder
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <UserModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={selectedUser}
      />

      {isFolderOpen && selectedUser && (
        <UserFolder
          open={isFolderOpen}
          onClose={handleCloseFolder}
          user={selectedUser}
        />
      )}

      <DocumentUploadModal
        isOpen={isDocumentModalOpen}
        onClose={handleCloseDocumentModal}
        userId={selectedDocumentInfo?.userId}
        userName={selectedDocumentInfo?.userName}
        missingCount={selectedDocumentInfo?.missingCount}
      />
    </div>
  );
};

export default UserManagement;
