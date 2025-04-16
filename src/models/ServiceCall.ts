
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";

export interface ServiceCall {
  id: string;
  date: string;
  startTime: string;
  serviceType: string;
  customer: string;
  projectSite: string;
  hourlyBooking: number;
  pumpType: string;
  quantity: string;
  vehicleNumber: string;
  operator: string;
  notes: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deliveryCertificateId?: string;
  craneSize?: string;
  vehicleType?: string;
  generalEquipment?: string;
}

export async function createServiceCall(serviceCallData: Omit<ServiceCall, 'id' | 'createdAt' | 'updatedAt'>): Promise<ServiceCall> {
  const id = uuidv4();
  // Convert from camelCase to snake_case for the database
  const dbServiceCall = {
    id,
    date: serviceCallData.date,
    start_time: serviceCallData.startTime,
    service_type: serviceCallData.serviceType,
    customer: serviceCallData.customer,
    project_site: serviceCallData.projectSite,
    hourly_booking: serviceCallData.hourlyBooking,
    pump_type: serviceCallData.pumpType,
    quantity: serviceCallData.quantity,
    vehicle_number: serviceCallData.vehicleNumber,
    operator: serviceCallData.operator,
    notes: serviceCallData.notes,
    status: serviceCallData.status,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    crane_size: serviceCallData.craneSize,
    vehicle_type: serviceCallData.vehicleType,
    general_equipment: serviceCallData.generalEquipment
  };

  const { data, error } = await supabase
    .from('service_calls')
    .insert([dbServiceCall])
    .select()
    .single();

  if (error) {
    console.error('Error creating service call:', error);
    throw new Error(`Failed to create service call: ${error.message}`);
  }

  // Convert from snake_case back to camelCase for the frontend
  return {
    id: data.id,
    date: data.date,
    startTime: data.start_time,
    serviceType: data.service_type,
    customer: data.customer,
    projectSite: data.project_site,
    hourlyBooking: data.hourly_booking,
    pumpType: data.pump_type,
    quantity: data.quantity,
    vehicleNumber: data.vehicle_number,
    operator: data.operator,
    notes: data.notes,
    status: data.status,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    deliveryCertificateId: data.delivery_certificate_id,
    craneSize: data.crane_size,
    vehicleType: data.vehicle_type,
    generalEquipment: data.general_equipment
  };
}

export async function updateServiceCall(id: string, serviceCallData: Partial<ServiceCall>): Promise<ServiceCall> {
  // Convert from camelCase to snake_case for the database
  const updates: any = {
    updated_at: new Date().toISOString(),
  };
  
  if (serviceCallData.date) updates.date = serviceCallData.date;
  if (serviceCallData.startTime) updates.start_time = serviceCallData.startTime;
  if (serviceCallData.serviceType) updates.service_type = serviceCallData.serviceType;
  if (serviceCallData.customer) updates.customer = serviceCallData.customer;
  if (serviceCallData.projectSite) updates.project_site = serviceCallData.projectSite;
  if (serviceCallData.hourlyBooking !== undefined) updates.hourly_booking = serviceCallData.hourlyBooking;
  if (serviceCallData.pumpType) updates.pump_type = serviceCallData.pumpType;
  if (serviceCallData.quantity) updates.quantity = serviceCallData.quantity;
  if (serviceCallData.vehicleNumber) updates.vehicle_number = serviceCallData.vehicleNumber;
  if (serviceCallData.operator) updates.operator = serviceCallData.operator;
  if (serviceCallData.notes) updates.notes = serviceCallData.notes;
  if (serviceCallData.status) updates.status = serviceCallData.status;
  if (serviceCallData.deliveryCertificateId) updates.delivery_certificate_id = serviceCallData.deliveryCertificateId;
  if (serviceCallData.craneSize) updates.crane_size = serviceCallData.craneSize;
  if (serviceCallData.vehicleType) updates.vehicle_type = serviceCallData.vehicleType;
  if (serviceCallData.generalEquipment) updates.general_equipment = serviceCallData.generalEquipment;

  const { data, error } = await supabase
    .from('service_calls')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating service call:', error);
    throw new Error(`Failed to update service call: ${error.message}`);
  }

  // Convert from snake_case back to camelCase for the frontend
  return {
    id: data.id,
    date: data.date,
    startTime: data.start_time,
    serviceType: data.service_type,
    customer: data.customer,
    projectSite: data.project_site,
    hourlyBooking: data.hourly_booking,
    pumpType: data.pump_type,
    quantity: data.quantity,
    vehicleNumber: data.vehicle_number,
    operator: data.operator,
    notes: data.notes,
    status: data.status,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    deliveryCertificateId: data.delivery_certificate_id,
    craneSize: data.crane_size,
    vehicleType: data.vehicle_type,
    generalEquipment: data.general_equipment
  };
}

export async function getServiceCallById(id: string): Promise<ServiceCall | null> {
  const { data, error } = await supabase
    .from('service_calls')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching service call:', error);
    throw new Error(`Failed to fetch service call: ${error.message}`);
  }

  if (!data) return null;

  // Convert from snake_case back to camelCase for the frontend
  return {
    id: data.id,
    date: data.date,
    startTime: data.start_time,
    serviceType: data.service_type,
    customer: data.customer,
    projectSite: data.project_site,
    hourlyBooking: data.hourly_booking,
    pumpType: data.pump_type,
    quantity: data.quantity,
    vehicleNumber: data.vehicle_number,
    operator: data.operator,
    notes: data.notes,
    status: data.status,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    deliveryCertificateId: data.delivery_certificate_id,
    craneSize: data.crane_size,
    vehicleType: data.vehicle_type,
    generalEquipment: data.general_equipment
  };
}

export async function getAllServiceCalls(): Promise<ServiceCall[]> {
  const { data, error } = await supabase
    .from('service_calls')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching service calls:', error);
    throw new Error(`Failed to fetch service calls: ${error.message}`);
  }

  // Return an empty array if data is undefined or null
  if (!data) return [];

  // Convert from snake_case back to camelCase for the frontend
  return data.map(item => ({
    id: item.id,
    date: item.date,
    startTime: item.start_time,
    serviceType: item.service_type,
    customer: item.customer,
    projectSite: item.project_site,
    hourlyBooking: item.hourly_booking,
    pumpType: item.pump_type,
    quantity: item.quantity,
    vehicleNumber: item.vehicle_number,
    operator: item.operator,
    notes: item.notes,
    status: item.status,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    deliveryCertificateId: item.delivery_certificate_id,
    craneSize: item.crane_size,
    vehicleType: item.vehicle_type,
    generalEquipment: item.general_equipment
  }));
}

export async function deleteServiceCall(id: string): Promise<void> {
  const { error } = await supabase
    .from('service_calls')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting service call:', error);
    throw new Error(`Failed to delete service call: ${error.message}`);
  }
}
