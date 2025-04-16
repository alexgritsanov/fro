
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Grid, List as ListIcon, FileCheck, FileText, FileImage, FolderOpen, CheckCircle, XCircle, Clock, Calendar, Filter, Download, UploadCloud, ArrowLeft, MoreHorizontal, FileSpreadsheet, MessageSquare, Eye, Tag, User, Award, BookOpen, Briefcase, ClipboardList, CreditCard, HardHat, Truck, Users, Zap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Card from '@/components/Card';
import UserOverview from './UserOverview';
import UserAgreements from './UserAgreements';
import UserServiceHistory from './UserServiceHistory';
import UserCommunication from './UserCommunication';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { StatusType } from '../StatusBadge';

// Define folder structure by user role
const getFoldersByUserRole = (role: string) => {
  const roleLower = role.toLowerCase();
  
  if (roleLower === 'client') {
    return [
      { 
        id: '1', 
        name: 'Service Agreements', 
        count: 6, 
        icon: FileCheck, 
        color: 'text-amber-500',
        description: 'Contract and service agreements', 
        lastUpdated: '2023-11-25'
      },
      { 
        id: '2', 
        name: 'Delivery Certificates', 
        count: 8, 
        icon: FileText, 
        color: 'text-blue-500',
        description: 'Completed service delivery certificates', 
        lastUpdated: '2023-10-31'
      },
      { 
        id: '3', 
        name: 'Invoices', 
        count: 5, 
        icon: CreditCard, 
        color: 'text-green-500',
        description: 'Billing and payment records', 
        lastUpdated: '2023-11-15'
      },
      { 
        id: '4', 
        name: 'Quotes & Estimates', 
        count: 4, 
        icon: FileText, 
        color: 'text-purple-500',
        description: 'Service quotes and estimates', 
        lastUpdated: '2023-09-20'
      },
      { 
        id: '5', 
        name: 'Site Documentation', 
        count: 7, 
        icon: FolderOpen, 
        color: 'text-orange-500',
        description: 'Project site documentation', 
        lastUpdated: '2023-11-28'
      },
      { 
        id: '6', 
        name: 'Communication Records', 
        count: 12, 
        icon: MessageSquare, 
        color: 'text-indigo-500',
        description: 'Email and message history', 
        lastUpdated: '2023-11-05'
      }
    ];
  } 
  else if (roleLower === 'employee') {
    return [
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
        icon: Award, 
        color: 'text-blue-500',
        description: 'Completed training and certification records', 
        lastUpdated: '2023-10-31'
      },
      { 
        id: '3', 
        name: 'ID Documents', 
        count: 5, 
        icon: User, 
        color: 'text-green-500',
        description: 'Identification and verification documents', 
        lastUpdated: '2023-11-15'
      },
      { 
        id: '4', 
        name: 'Performance Reviews', 
        count: 4, 
        icon: ClipboardList, 
        color: 'text-purple-500',
        description: 'Annual and quarterly performance reviews', 
        lastUpdated: '2023-09-20'
      },
      { 
        id: '5', 
        name: 'Service Records', 
        count: 7, 
        icon: Briefcase, 
        color: 'text-orange-500',
        description: 'Service delivery and client interaction records', 
        lastUpdated: '2023-11-28'
      },
      { 
        id: '6', 
        name: 'Field Photos', 
        count: 12, 
        icon: FileImage, 
        color: 'text-indigo-500',
        description: 'On-site job and equipment photos', 
        lastUpdated: '2023-11-05'
      }
    ];
  }
  else if (roleLower === 'foreman') {
    return [
      { 
        id: '1', 
        name: 'Project Management', 
        count: 6, 
        icon: ClipboardList, 
        color: 'text-amber-500',
        description: 'Project planning and execution documents', 
        lastUpdated: '2023-11-25'
      },
      { 
        id: '2', 
        name: 'Team Records', 
        count: 8, 
        icon: Users, 
        color: 'text-blue-500',
        description: 'Team member assignments and performance', 
        lastUpdated: '2023-10-31'
      },
      { 
        id: '3', 
        name: 'Safety Documentation', 
        count: 5, 
        icon: HardHat, 
        color: 'text-green-500',
        description: 'Safety protocols and incident reports', 
        lastUpdated: '2023-11-15'
      },
      { 
        id: '4', 
        name: 'Equipment Logs', 
        count: 4, 
        icon: Truck, 
        color: 'text-purple-500',
        description: 'Equipment usage and maintenance records', 
        lastUpdated: '2023-09-20'
      },
      { 
        id: '5', 
        name: 'Inspection Reports', 
        count: 7, 
        icon: FileCheck, 
        color: 'text-orange-500',
        description: 'Site and quality inspection reports', 
        lastUpdated: '2023-11-28'
      },
      { 
        id: '6', 
        name: 'Training Materials', 
        count: 12, 
        icon: BookOpen, 
        color: 'text-indigo-500',
        description: 'Training resources and materials', 
        lastUpdated: '2023-11-05'
      }
    ];
  }
  else if (roleLower === 'subcontractor') {
    return [
      { 
        id: '1', 
        name: 'Contract Documents', 
        count: 6, 
        icon: FileCheck, 
        color: 'text-amber-500',
        description: 'Service contracts and agreements', 
        lastUpdated: '2023-11-25'
      },
      { 
        id: '2', 
        name: 'Work Orders', 
        count: 8, 
        icon: ClipboardList, 
        color: 'text-blue-500',
        description: 'Assigned work orders and tasks', 
        lastUpdated: '2023-10-31'
      },
      { 
        id: '3', 
        name: 'Credentials', 
        count: 5, 
        icon: Award, 
        color: 'text-green-500',
        description: 'Licenses, certifications and qualifications', 
        lastUpdated: '2023-11-15'
      },
      { 
        id: '4', 
        name: 'Invoices & Payments', 
        count: 4, 
        icon: CreditCard, 
        color: 'text-purple-500',
        description: 'Billing and payment records', 
        lastUpdated: '2023-09-20'
      },
      { 
        id: '5', 
        name: 'Service Documentation', 
        count: 7, 
        icon: FileText, 
        color: 'text-orange-500',
        description: 'Service delivery documentation', 
        lastUpdated: '2023-11-28'
      },
      { 
        id: '6', 
        name: 'Equipment Records', 
        count: 12, 
        icon: Truck, 
        color: 'text-indigo-500',
        description: 'Equipment specifications and maintenance', 
        lastUpdated: '2023-11-05'
      }
    ];
  }
  
  // Default folders for other roles
  return [
    { 
      id: '1', 
      name: 'Documents', 
      count: 6, 
      icon: FileText, 
      color: 'text-amber-500',
      description: 'Important user documents', 
      lastUpdated: '2023-11-25'
    },
    { 
      id: '2', 
      name: 'Records', 
      count: 8, 
      icon: FileCheck, 
      color: 'text-blue-500',
      description: 'User activity records', 
      lastUpdated: '2023-10-31'
    },
    { 
      id: '3', 
      name: 'Files', 
      count: 5, 
      icon: FolderOpen, 
      color: 'text-green-500',
      description: 'Miscellaneous files', 
      lastUpdated: '2023-11-15'
    }
  ];
};

// Define file structure by folder and user role
const getFilesByFolderAndRole = (folderId: string, role: string) => {
  const roleLower = role.toLowerCase();
  
  // Files for Client role
  if (roleLower === 'client') {
    const clientFiles = {
      '1': [ // Service Agreements
        { id: '101', name: 'Master Service Agreement 2023.pdf', type: 'pdf', size: '1.2 MB', date: '2023-01-15', status: 'active', icon: FileCheck, tags: ['agreement', 'master', 'active'], createdBy: 'Admin' },
        { id: '102', name: 'Service Level Agreement.pdf', type: 'pdf', size: '0.8 MB', date: '2023-02-20', status: 'active', icon: FileCheck, tags: ['agreement', 'SLA', 'active'], createdBy: 'Admin' },
        { id: '103', name: 'Maintenance Contract 2023.pdf', type: 'pdf', size: '1.5 MB', date: '2023-03-10', status: 'active', icon: FileCheck, tags: ['agreement', 'maintenance', 'active'], createdBy: 'Admin' },
      ],
      '2': [ // Delivery Certificates
        { id: '201', name: 'Delivery Certificate #1032.pdf', type: 'pdf', size: '1.2 MB', date: '2023-11-20', status: 'signed', icon: FileCheck, tags: ['delivery', 'certificate', 'signed'], createdBy: 'System' },
        { id: '202', name: 'Delivery Certificate #1045.pdf', type: 'pdf', size: '0.8 MB', date: '2023-11-22', status: 'signed', icon: FileCheck, tags: ['delivery', 'certificate', 'signed'], createdBy: 'System' },
        { id: '203', name: 'Delivery Certificate #1053.pdf', type: 'pdf', size: '1.5 MB', date: '2023-11-24', status: 'pending', icon: FileCheck, tags: ['delivery', 'certificate', 'pending'], createdBy: 'System' },
      ],
      '3': [ // Invoices
        { id: '301', name: 'Invoice #2023-156.pdf', type: 'pdf', size: '0.7 MB', date: '2023-11-10', status: 'paid', icon: FileText, tags: ['invoice', 'paid', 'financial'], createdBy: 'Finance' },
        { id: '302', name: 'Invoice #2023-162.pdf', type: 'pdf', size: '0.6 MB', date: '2023-11-15', status: 'outstanding', icon: FileText, tags: ['invoice', 'outstanding', 'financial'], createdBy: 'Finance' },
      ],
      '4': [ // Quotes & Estimates
        { id: '401', name: 'Project Estimate Q4-2023.pdf', type: 'pdf', size: '1.3 MB', date: '2023-10-15', status: 'approved', icon: FileText, tags: ['estimate', 'project', 'approved'], createdBy: 'Sales' },
        { id: '402', name: 'Service Quote #Q-2023-089.pdf', type: 'pdf', size: '0.9 MB', date: '2023-10-22', status: 'pending', icon: FileText, tags: ['quote', 'service', 'pending'], createdBy: 'Sales' },
      ],
      '5': [ // Site Documentation
        { id: '501', name: 'Site Survey Report.pdf', type: 'pdf', size: '2.3 MB', date: '2023-09-15', status: 'completed', icon: FileText, tags: ['site', 'survey', 'report'], createdBy: 'Field Agent' },
        { id: '502', name: 'Location Map.jpg', type: 'jpg', size: '3.2 MB', date: '2023-09-10', status: '', icon: FileImage, tags: ['site', 'map', 'location'], createdBy: 'Field Agent' },
      ],
      '6': [ // Communication Records
        { id: '601', name: 'Meeting Minutes Oct 15.pdf', type: 'pdf', size: '0.5 MB', date: '2023-10-15', status: '', icon: FileText, tags: ['meeting', 'minutes', 'communication'], createdBy: 'Account Manager' },
        { id: '602', name: 'Project Update Email.pdf', type: 'pdf', size: '0.3 MB', date: '2023-11-02', status: '', icon: FileText, tags: ['email', 'update', 'project'], createdBy: 'Project Manager' },
      ]
    };
    return clientFiles[folderId] || [];
  }
  
  // Files for Employee role
  else if (roleLower === 'employee') {
    const employeeFiles = {
      '1': [ // Employment Documents
        { id: '101', name: 'Employment Contract.pdf', type: 'pdf', size: '1.2 MB', date: '2023-01-15', status: 'active', icon: FileCheck, tags: ['contract', 'employment', 'active'], createdBy: 'HR' },
        { id: '102', name: 'Employee Handbook.pdf', type: 'pdf', size: '2.8 MB', date: '2023-01-15', status: 'active', icon: FileText, tags: ['handbook', 'policies', 'active'], createdBy: 'HR' },
        { id: '103', name: 'Non-Disclosure Agreement.pdf', type: 'pdf', size: '0.5 MB', date: '2023-01-15', status: 'active', icon: FileCheck, tags: ['NDA', 'confidentiality', 'active'], createdBy: 'HR' },
      ],
      '2': [ // Training Certificates
        { id: '201', name: 'Safety Training Certificate.pdf', type: 'pdf', size: '0.7 MB', date: '2023-03-20', status: 'valid', icon: Award, tags: ['training', 'safety', 'certificate'], createdBy: 'Training Dept' },
        { id: '202', name: 'Equipment Operation Certification.pdf', type: 'pdf', size: '0.6 MB', date: '2023-05-12', status: 'valid', icon: Award, tags: ['training', 'equipment', 'certificate'], createdBy: 'Training Dept' },
        { id: '203', name: 'First Aid Certification.pdf', type: 'pdf', size: '0.8 MB', date: '2023-02-28', status: 'valid', icon: Award, tags: ['training', 'first aid', 'certificate'], createdBy: 'Training Dept' },
      ],
      '3': [ // ID Documents
        { id: '301', name: 'Company ID Card.jpg', type: 'jpg', size: '1.5 MB', date: '2023-01-16', status: 'active', icon: FileImage, tags: ['ID', 'company', 'photo'], createdBy: 'HR' },
        { id: '302', name: 'Driver License Copy.pdf', type: 'pdf', size: '0.5 MB', date: '2023-01-15', status: 'active', icon: FileText, tags: ['ID', 'license', 'document'], createdBy: 'HR' },
      ],
      '4': [ // Performance Reviews
        { id: '401', name: 'Q1 Performance Review.pdf', type: 'pdf', size: '0.8 MB', date: '2023-03-30', status: 'completed', icon: ClipboardList, tags: ['review', 'performance', 'Q1'], createdBy: 'Manager' },
        { id: '402', name: 'Q2 Performance Review.pdf', type: 'pdf', size: '0.9 MB', date: '2023-06-30', status: 'completed', icon: ClipboardList, tags: ['review', 'performance', 'Q2'], createdBy: 'Manager' },
      ],
      '5': [ // Service Records
        { id: '501', name: 'Service Record Oct 2023.pdf', type: 'pdf', size: '1.3 MB', date: '2023-10-31', status: 'completed', icon: Briefcase, tags: ['service', 'record', 'monthly'], createdBy: 'System' },
        { id: '502', name: 'Service Record Sep 2023.pdf', type: 'pdf', size: '1.2 MB', date: '2023-09-30', status: 'completed', icon: Briefcase, tags: ['service', 'record', 'monthly'], createdBy: 'System' },
      ],
      '6': [ // Field Photos
        { id: '601', name: 'Site Photo 1.jpg', type: 'jpg', size: '5.2 MB', date: '2023-10-25', status: '', icon: FileImage, tags: ['photo', 'site'], createdBy: 'Employee' },
        { id: '602', name: 'Equipment Photo 1.jpg', type: 'jpg', size: '4.7 MB', date: '2023-10-26', status: '', icon: FileImage, tags: ['photo', 'equipment'], createdBy: 'Employee' },
      ]
    };
    return employeeFiles[folderId] || [];
  }
  
  // Files for Foreman role
  else if (roleLower === 'foreman') {
    const foremanFiles = {
      '1': [ // Project Management
        { id: '101', name: 'Project Plan Q4 2023.pdf', type: 'pdf', size: '2.3 MB', date: '2023-10-01', status: 'active', icon: FileText, tags: ['project', 'plan', 'Q4'], createdBy: 'Foreman' },
        { id: '102', name: 'Resource Allocation.xlsx', type: 'xlsx', size: '1.8 MB', date: '2023-10-05', status: 'active', icon: FileSpreadsheet, tags: ['resources', 'allocation', 'planning'], createdBy: 'Foreman' },
        { id: '103', name: 'Project Timeline.pdf', type: 'pdf', size: '1.2 MB', date: '2023-10-02', status: 'active', icon: FileText, tags: ['project', 'timeline', 'schedule'], createdBy: 'Foreman' },
      ],
      '2': [ // Team Records
        { id: '201', name: 'Team Assignment Oct 2023.xlsx', type: 'xlsx', size: '1.1 MB', date: '2023-10-01', status: 'active', icon: FileSpreadsheet, tags: ['team', 'assignment', 'schedule'], createdBy: 'Foreman' },
        { id: '202', name: 'Team Performance Report Q3.pdf', type: 'pdf', size: '1.5 MB', date: '2023-09-30', status: 'completed', icon: FileText, tags: ['team', 'performance', 'report'], createdBy: 'Foreman' },
      ],
      '3': [ // Safety Documentation
        { id: '301', name: 'Safety Protocol Handbook.pdf', type: 'pdf', size: '3.2 MB', date: '2023-01-15', status: 'active', icon: FileText, tags: ['safety', 'protocol', 'handbook'], createdBy: 'Safety Officer' },
        { id: '302', name: 'Site Safety Assessment.pdf', type: 'pdf', size: '1.4 MB', date: '2023-10-10', status: 'completed', icon: FileText, tags: ['safety', 'assessment', 'site'], createdBy: 'Foreman' },
      ],
      '4': [ // Equipment Logs
        { id: '401', name: 'Equipment Usage Log Oct 2023.xlsx', type: 'xlsx', size: '1.8 MB', date: '2023-10-31', status: 'completed', icon: FileSpreadsheet, tags: ['equipment', 'usage', 'log'], createdBy: 'Foreman' },
        { id: '402', name: 'Maintenance Schedule.pdf', type: 'pdf', size: '0.9 MB', date: '2023-10-01', status: 'active', icon: FileText, tags: ['equipment', 'maintenance', 'schedule'], createdBy: 'Foreman' },
      ],
      '5': [ // Inspection Reports
        { id: '501', name: 'Site Inspection Report #SI-2023-45.pdf', type: 'pdf', size: '1.7 MB', date: '2023-10-15', status: 'completed', icon: FileCheck, tags: ['inspection', 'site', 'report'], createdBy: 'Foreman' },
        { id: '502', name: 'Quality Control Assessment.pdf', type: 'pdf', size: '1.4 MB', date: '2023-10-20', status: 'completed', icon: FileCheck, tags: ['quality', 'control', 'assessment'], createdBy: 'Quality Officer' },
      ],
      '6': [ // Training Materials
        { id: '601', name: 'New Equipment Training Guide.pdf', type: 'pdf', size: '4.5 MB', date: '2023-09-15', status: 'active', icon: BookOpen, tags: ['training', 'equipment', 'guide'], createdBy: 'Training Dept' },
        { id: '602', name: 'Safety Procedures Training.pdf', type: 'pdf', size: '3.8 MB', date: '2023-08-20', status: 'active', icon: BookOpen, tags: ['training', 'safety', 'procedures'], createdBy: 'Safety Officer' },
      ]
    };
    return foremanFiles[folderId] || [];
  }
  
  // Files for Subcontractor role
  else if (roleLower === 'subcontractor') {
    const subcontractorFiles = {
      '1': [ // Contract Documents
        { id: '101', name: 'Subcontractor Agreement 2023.pdf', type: 'pdf', size: '1.7 MB', date: '2023-01-20', status: 'active', icon: FileCheck, tags: ['contract', 'agreement', 'active'], createdBy: 'Legal' },
        { id: '102', name: 'Statement of Work.pdf', type: 'pdf', size: '1.2 MB', date: '2023-01-25', status: 'active', icon: FileText, tags: ['SOW', 'work', 'statement'], createdBy: 'Project Manager' },
        { id: '103', name: 'Service Terms & Conditions.pdf', type: 'pdf', size: '0.9 MB', date: '2023-01-20', status: 'active', icon: FileText, tags: ['terms', 'conditions', 'service'], createdBy: 'Legal' },
      ],
      '2': [ // Work Orders
        { id: '201', name: 'Work Order #WO-2023-156.pdf', type: 'pdf', size: '0.8 MB', date: '2023-10-15', status: 'in progress', icon: ClipboardList, tags: ['work order', 'task', 'active'], createdBy: 'Operations' },
        { id: '202', name: 'Work Order #WO-2023-148.pdf', type: 'pdf', size: '0.7 MB', date: '2023-10-05', status: 'completed', icon: ClipboardList, tags: ['work order', 'task', 'completed'], createdBy: 'Operations' },
      ],
      '3': [ // Credentials
        { id: '301', name: 'Business License.pdf', type: 'pdf', size: '1.2 MB', date: '2023-01-10', status: 'active', icon: Award, tags: ['license', 'business', 'credential'], createdBy: 'Subcontractor' },
        { id: '302', name: 'Professional Certification.pdf', type: 'pdf', size: '0.8 MB', date: '2023-01-12', status: 'active', icon: Award, tags: ['certification', 'professional', 'credential'], createdBy: 'Subcontractor' },
        { id: '303', name: 'Insurance Documentation.pdf', type: 'pdf', size: '1.5 MB', date: '2023-01-15', status: 'active', icon: FileText, tags: ['insurance', 'liability', 'documentation'], createdBy: 'Subcontractor' },
      ],
      '4': [ // Invoices & Payments
        { id: '401', name: 'Invoice #SC-2023-045.pdf', type: 'pdf', size: '0.6 MB', date: '2023-10-31', status: 'paid', icon: CreditCard, tags: ['invoice', 'payment', 'financial'], createdBy: 'Subcontractor' },
        { id: '402', name: 'Invoice #SC-2023-039.pdf', type: 'pdf', size: '0.6 MB', date: '2023-09-30', status: 'paid', icon: CreditCard, tags: ['invoice', 'payment', 'financial'], createdBy: 'Subcontractor' },
      ],
      '5': [ // Service Documentation
        { id: '501', name: 'Service Report Oct 15.pdf', type: 'pdf', size: '1.2 MB', date: '2023-10-15', status: 'completed', icon: FileText, tags: ['service', 'report', 'documentation'], createdBy: 'Subcontractor' },
        { id: '502', name: 'Service Completion Form.pdf', type: 'pdf', size: '0.7 MB', date: '2023-10-16', status: 'completed', icon: FileText, tags: ['service', 'completion', 'form'], createdBy: 'Subcontractor' },
      ],
      '6': [ // Equipment Records
        { id: '601', name: 'Equipment Specification Sheet.pdf', type: 'pdf', size: '1.5 MB', date: '2023-01-30', status: 'active', icon: FileText, tags: ['equipment', 'specification', 'documentation'], createdBy: 'Subcontractor' },
        { id: '602', name: 'Maintenance Record.pdf', type: 'pdf', size: '0.8 MB', date: '2023-10-10', status: 'active', icon: FileText, tags: ['equipment', 'maintenance', 'record'], createdBy: 'Subcontractor' },
      ]
    };
    return subcontractorFiles[folderId] || [];
  }
  
  // Default files for other roles or unknown folder IDs
  return [
    { id: '101', name: 'Document 1.pdf', type: 'pdf', size: '1.2 MB', date: '2023-10-15', status: 'active', icon: FileText, tags: ['document'], createdBy: 'System' },
    { id: '102', name: 'Document 2.pdf', type: 'pdf', size: '0.8 MB', date: '2023-10-20', status: 'active', icon: FileText, tags: ['document'], createdBy: 'System' },
  ];
};

// Update the mockFiles to use the dynamic function
const mockFiles = {};

// Enhanced folder data with better organization
const mockFolders = [];

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface UserFolderProps {
  user: User | null;
  onClose: () => void;
  onDeleteUser?: (userId: string) => void;
  onResetPassword?: (userId: string) => void;
  onPromote?: (userId: string) => void;
  onDeactivate?: (userId: string) => void;
  onActivate?: (userId: string) => void;
  open: boolean;
  onUploadDocument?: (file: File) => void;
}

const UserFolder = ({ 
  user,
  onClose,
  onDeleteUser,
  onResetPassword,
  onPromote,
  onDeactivate,
  onActivate,
  open,
  onUploadDocument
}: UserFolderProps) => {
  const [uploading, setUploading] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [currentFolderName, setCurrentFolderName] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [previewFile, setPreviewFile] = useState<any | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Get folders based on user role
  const folders = user ? getFoldersByUserRole(user.role) : [];

  const handleUpload = async () => {
    if (!uploadFile) {
      setError('Please select a file to upload.');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate an upload process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Assuming the upload was successful
      setSuccess('File uploaded successfully!');
      if (onUploadDocument) {
        onUploadDocument(uploadFile);
      }
    } catch (e) {
      setError('File upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setUploadFile(file);
      setError(null);
    }
  };

  const handleOpenUploadDialog = () => {
    setIsUploadDialogOpen(true);
  };

  const handleCloseUploadDialog = () => {
    setIsUploadDialogOpen(false);
    setUploadFile(null);
    setError(null);
    setSuccess(null);
  };

  // The FilePreview component for showing file details
  const FilePreview = () => {
    if (!previewFile) return null;
    
    return (
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{previewFile.name}</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="preview">
            <TabsList>
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
            
            <TabsContent value="preview" className="pt-4">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex items-start">
                    <previewFile.icon className="h-16 w-16 text-blue-500" />
                    <div className="ml-4">
                      <h2 className="text-xl font-semibold mb-1">{previewFile.name}</h2>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          {previewFile.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <FileText className="h-4 w-4 mr-1 text-gray-400" />
                          {previewFile.size}
                        </div>
                        {previewFile.createdBy && (
                          <div className="flex items-center text-sm text-gray-500">
                            <User className="h-4 w-4 mr-1 text-gray-400" />
                            {previewFile.createdBy}
                          </div>
                        )}
                        {previewFile.status && (
                          <Badge variant="outline" className={getStatusBadgeClass(previewFile.status)}>
                            {previewFile.status}
                          </Badge>
                        )}
                      </div>
                      
                      {previewFile.tags && previewFile.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {previewFile.tags.map((tag: string) => (
                            <Badge key={tag} variant="outline" className="bg-gray-100">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center bg-gray-50 rounded-b-lg h-[300px] border-t border-gray-200">
                  {previewFile.type.toLowerCase() === 'jpg' || 
                    previewFile.type.toLowerCase() === 'png' || 
                    previewFile.type.toLowerCase() === 'jpeg' ? (
                    <div className="text-center p-8">
                      <FileImage className="h-24 w-24 mx-auto text-gray-300" />
                      <p className="mt-4 text-gray-500">Image preview would appear here</p>
                    </div>
                  ) : previewFile.type.toLowerCase() === 'pdf' ? (
                    <div className="text-center p-8">
                      <FileText className="h-24 w-24 mx-auto text-gray-300" />
                      <p className="mt-4 text-gray-500">PDF preview would appear here</p>
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <previewFile.icon className="h-24 w-24 mx-auto text-gray-300" />
                      <p className="mt-4 text-gray-500">Preview not available for this file type</p>
                      <Button variant="outline" className="mt-4">
                        <Download className="h-4 w-4 mr-2" />
                        Download to View
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="activity" className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                  <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                    <User className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-blue-700">File uploaded by {previewFile.createdBy || 'System'}</p>
                    <p className="text-xs text-blue-600">{previewFile.date}</p>
                  </div>
                </div>
                
                {previewFile.status === 'signed' && (
                  <div className="flex items-center p-3 border-l-4 border-green-500 bg-green-50 rounded-r-lg">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-3">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-green-700">Document signed by client</p>
                      <p className="text-xs text-green-600">{previewFile.date}</p>
                    </div>
                  </div>
                )}
                
                {previewFile.status === 'pending' && (
                  <div className="flex items-center p-3 border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg">
                    <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mr-3">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-yellow-700">Awaiting signature from client</p>
                      <p className="text-xs text-yellow-600">{previewFile.date}</p>
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
          
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsPreviewOpen(false)}>
              Close
            </Button>
            <Button className="bg-blue-600">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  // Function to handle file click
  const handleFileClick = (file: any) => {
    setPreviewFile(file);
    setIsPreviewOpen(true);
  };

  // Function to get status badge class
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'signed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'approved':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'paid':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'active':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'in progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'outstanding':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'valid':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Filter files based on search term, status, and date
  const getFilteredFiles = () => {
    if (!user || !selectedFolder) return [];
    
    let files = getFilesByFolderAndRole(selectedFolder, user.role);

    if (searchTerm) {
      files = files.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      files = files.filter(file => file.status === statusFilter);
    }

    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      files = files.filter(file => {
        const fileDate = new Date(file.date);
        return (
          fileDate.getFullYear() === filterDate.getFullYear() &&
          fileDate.getMonth() === filterDate.getMonth() &&
          fileDate.getDate() === filterDate.getDate()
        );
      });
    }

    return files;
  };

  const filteredFiles = getFilteredFiles();

  // Get the role-specific title for the files tab
  const getFilesTabTitle = () => {
    if (!user) return "Files";
    
    const roleLower = user.role.toLowerCase();
    if (roleLower === 'client') return "Customer Documents";
    if (roleLower === 'employee') return "Employee Documents";
    if (roleLower === 'foreman') return "Management Documents";
    if (roleLower === 'subcontractor') return "Subcontractor Documents";
    
    return "Files";
  };

  return (
    <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        className="bg-white rounded-xl shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden"
        style={{ height: 'calc(90vh - 2rem)' }}
      >
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">{user?.name || 'User Details'}</h2>
          <Button variant="ghost" onClick={onClose}>✕</Button>
        </div>
        
        <div className="flex-1 overflow-hidden flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="bg-transparent border-b px-6 py-0 h-auto justify-start">
              <TabsTrigger
                value="overview"
                className={`py-3 px-4 rounded-none border-b-2 font-medium ${
                  activeTab === 'overview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
                }`}
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="files"
                className={`py-3 px-4 rounded-none border-b-2 font-medium ${
                  activeTab === 'files' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
                }`}
              >
                {getFilesTabTitle()}
              </TabsTrigger>
              <TabsTrigger
                value="agreements"
                className={`py-3 px-4 rounded-none border-b-2 font-medium ${
                  activeTab === 'agreements' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
                }`}
              >
                Agreements
              </TabsTrigger>
              <TabsTrigger
                value="serviceHistory"
                className={`py-3 px-4 rounded-none border-b-2 font-medium ${
                  activeTab === 'serviceHistory' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
                }`}
              >
                Service History
              </TabsTrigger>
              <TabsTrigger
                value="communication"
                className={`py-3 px-4 rounded-none border-b-2 font-medium ${
                  activeTab === 'communication' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
                }`}
              >
                Communication
              </TabsTrigger>
              {user?.role.toLowerCase() === 'client' && (
                <TabsTrigger
                  value="disputes"
                  className={`py-3 px-4 rounded-none border-b-2 font-medium ${
                    activeTab === 'disputes' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'
                  }`}
                >
                  Disputes
                </TabsTrigger>
              )}
            </TabsList>
            
            <TabsContent value="overview" className="flex-1 overflow-auto p-6">
              <UserOverview
                user={user}
                onDeleteUser={onDeleteUser}
                onResetPassword={onResetPassword}
                onPromote={onPromote}
                onDeactivate={onDeactivate}
                onActivate={onActivate}
              />
            </TabsContent>
            
            <TabsContent value="files" className="flex-1 overflow-auto p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {selectedFolder ? (
                      <Button variant="ghost" size="sm" onClick={() => setSelectedFolder(null)}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Folders
                      </Button>
                    ) : (
                      <h3 className="text-lg font-medium">{getFilesTabTitle()}</h3>
                    )}
                  </div>
                  <div>
                    <Button onClick={handleOpenUploadDialog}>Upload Document</Button>
                  </div>
                </div>

                {/* File upload dialog */}
                <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Upload Document</DialogTitle>
                      <DialogDescription>
                        Select a file to upload to {currentFolderName || 'the document library'}.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="email" className="text-right text-sm font-medium leading-none text-gray-800">
                          Select File
                        </label>
                        <input
                          type="file"
                          onChange={handleFileSelect}
                          className="col-span-3 h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                    {success && <p className="text-green-500">{success}</p>}
                    <DialogFooter>
                      <Button type="button" variant="secondary" onClick={handleCloseUploadDialog}>
                        Cancel
                      </Button>
                      <Button type="submit" onClick={handleUpload} disabled={uploading}>
                        {uploading ? 'Uploading...' : 'Upload'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {!selectedFolder ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {folders.map(folder => (
                      <Card key={folder.id} className="p-4 cursor-pointer" onClick={() => {
                        setSelectedFolder(folder.id);
                        setCurrentFolderName(folder.name);
                      }}>
                        <div className="flex items-center space-x-3">
                          <folder.icon className={`h-6 w-6 ${folder.color}`} />
                          <h3 className="text-lg font-semibold">{folder.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{folder.description}</p>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium">Files in {currentFolderName}</h4>
                      <div className="space-x-2 flex">
                        <Input
                          type="text"
                          placeholder="Search files..."
                          value={searchTerm}
                          onChange={e => setSearchTerm(e.target.value)}
                          className="w-60"
                        />
                        <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                          <Filter className="h-4 w-4 mr-2" />
                          Filter
                        </Button>
                      </div>
                    </div>

                    {showFilters && (
                      <div className="bg-gray-50 p-4 rounded-md mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              value={statusFilter || ''}
                              onChange={e => setStatusFilter(e.target.value === '' ? null : e.target.value)}
                            >
                              <option value="">All</option>
                              <option value="signed">Signed</option>
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="paid">Paid</option>
                              <option value="active">Active</option>
                              <option value="completed">Completed</option>
                              <option value="in progress">In Progress</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <Input
                              type="date"
                              value={dateFilter || ''}
                              onChange={e => setDateFilter(e.target.value === '' ? null : e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {filteredFiles.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {filteredFiles.map(file => (
                          <Card key={file.id} className="p-4 cursor-pointer" onClick={() => handleFileClick(file)}>
                            <div className="flex items-center space-x-3">
                              <file.icon className="h-6 w-6 text-blue-500" />
                              <h3 className="text-lg font-semibold">{file.name}</h3>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">Size: {file.size}</p>
                            {file.status && (
                              <Badge variant="outline" className={getStatusBadgeClass(file.status)}>
                                {file.status}
                              </Badge>
                            )}
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-10 text-gray-500">
                        <p>No files found in this folder.</p>
                      </div>
                    )}
                  </div>
                )}
                
                {/* File Preview Dialog - using the component we defined above */}
                <FilePreview />
              </div>
            </TabsContent>
            
            <TabsContent value="agreements" className="flex-1 overflow-auto p-6">
              {user && <UserAgreements user={user} />}
            </TabsContent>
            
            <TabsContent value="serviceHistory" className="flex-1 overflow-auto p-6">
              {user && <UserServiceHistory user={user} />}
            </TabsContent>
            
            <TabsContent value="communication" className="flex-1 overflow-auto p-6">
              {user && <UserCommunication user={user} />}
            </TabsContent>
            
            <TabsContent value="disputes" className="flex-1 overflow-auto p-6">
              <div className="text-center p-10 text-gray-500">
                <p>Disputes functionality coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default UserFolder;
