
import React from 'react';
import { 
  Building2, 
  Truck, 
  Building, 
  HardHat 
} from 'lucide-react';
import { CompanyType, Plan, AdminUser } from './types';

export const companyTypes: CompanyType[] = [
  { value: 'concrete-pumping', label: 'Concrete Pumping', icon: <Building2 /> },
  { value: 'transportation-logistics', label: 'Transportation & Logistics', icon: <Truck /> },
  { value: 'crane-services', label: 'Crane Services', icon: <Building /> },
  { value: 'excavation-equipment', label: 'Excavation Equipment', icon: <HardHat /> },
  { value: 'building-materials', label: 'Building Materials Supply', icon: <Building /> },
  { value: 'cement-mortar', label: 'Cement & Mortar Suppliers', icon: <Building2 /> },
  { value: 'gravel-sand', label: 'Gravel, Sand & Quarry Materials', icon: <Building /> },
  { value: 'infrastructure', label: 'Infrastructure Contractors', icon: <Building /> },
  { value: 'block-paving', label: 'Block & Paving Stone Factories', icon: <Building2 /> },
  { value: 'construction-steel', label: 'Construction Steel Suppliers', icon: <Building /> },
  { value: 'aluminum-metal', label: 'Aluminum & Metal Works', icon: <Building /> },
  { value: 'container-cargo', label: 'Container & Cargo Transport', icon: <Truck /> },
  { value: 'furniture-office', label: 'Furniture & Office Equipment', icon: <Building /> },
  { value: 'fuel-gas', label: 'Fuel & Gas Transport', icon: <Truck /> },
  { value: 'food-beverage', label: 'Food & Beverage Manufacturing', icon: <Building /> },
  { value: 'consumer-goods', label: 'Consumer Goods Distribution', icon: <Truck /> },
  { value: 'agricultural', label: 'Agricultural Equipment', icon: <Building /> },
  { value: 'construction-rental', label: 'Construction Equipment Rental', icon: <Building /> },
  { value: 'textile', label: 'Textile Manufacturing', icon: <Building /> },
  { value: 'recycling-waste', label: 'Recycling & Waste Management', icon: <Truck /> },
  { value: 'plastic', label: 'Plastic Manufacturing', icon: <Building /> },
  { value: 'industrial-equipment', label: 'Industrial Equipment Supply', icon: <Building /> },
  { value: 'plumbing-pipe', label: 'Plumbing & Pipe Suppliers', icon: <Building /> },
  { value: 'electrical', label: 'Electrical Equipment & Services', icon: <Building /> },
  { value: 'paper-packaging', label: 'Paper & Packaging Industries', icon: <Building /> }
];

export const adminUsers: AdminUser[] = [
  { id: '1', name: 'John Smith', email: 'john@example.com', avatar: '/avatars/john.jpg', role: 'Senior Admin' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@example.com', avatar: '/avatars/sarah.jpg', role: 'Regional Manager' },
  { id: '3', name: 'Michael Chen', email: 'michael@example.com', avatar: '/avatars/michael.jpg', role: 'Account Manager' },
  { id: '4', name: 'Emma Wilson', email: 'emma@example.com', avatar: '/avatars/emma.jpg', role: 'Support Admin' },
  { id: '5', name: 'Alex Rodriguez', email: 'alex@example.com', avatar: null, role: 'Technical Admin' }
];

export const plans: Plan[] = [
  {
    id: 'basic',
    name: 'Basic',
    description: 'For small teams and startups',
    price: '$99/month',
    color: 'border-blue-500 bg-blue-50',
    highlight: false,
    limits: {
      total: 50,
      employee: 20,
      foreman: 5,
      subcontractor: 10,
      client: 15
    },
    features: [
      'Limited to 50 total users',
      'Basic support',
      'Document management',
      'Scheduling features'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'For growing businesses',
    price: '$299/month',
    color: 'border-indigo-500 bg-indigo-50',
    highlight: true,
    limits: {
      total: 200,
      employee: 80,
      foreman: 20,
      subcontractor: 50,
      client: 50
    },
    features: [
      'Up to 200 total users',
      'Priority support',
      'Advanced reporting',
      'API access',
      'Custom branding'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    price: '$799/month',
    color: 'border-purple-500 bg-purple-50',
    highlight: false,
    limits: {
      total: 500,
      employee: 200,
      foreman: 50,
      subcontractor: 100,
      client: 150
    },
    features: [
      'Up to 500 total users',
      '24/7 dedicated support',
      'Custom integrations',
      'Advanced security features',
      'Dedicated account manager'
    ]
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Set your own limits',
    price: 'Custom Pricing',
    color: 'border-gray-500 bg-gray-50',
    highlight: false,
    limits: {
      total: 0,
      employee: 0,
      foreman: 0,
      subcontractor: 0,
      client: 0
    },
    features: [
      'Define your own user limits',
      'Scale as your business grows',
      'Flexible user allocation',
      'Optimized for your needs'
    ]
  }
];
