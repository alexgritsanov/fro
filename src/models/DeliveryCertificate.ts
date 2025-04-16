
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";

export interface DeliveryCertificate {
  id: string;
  serviceCallId: string;
  customer: string;
  operator: string;
  date: string;
  serviceDetails: string;
  materials: string;
  quantity: string;
  serviceHours: number;
  signatureType: 'digital' | 'physical' | 'none';
  signatureData?: string;
  status: 'draft' | 'signed' | 'approved' | 'disputed';
  pdfUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export async function createDeliveryCertificate(certificateData: Omit<DeliveryCertificate, 'id' | 'createdAt' | 'updatedAt'>): Promise<DeliveryCertificate> {
  const id = uuidv4();
  // Convert from camelCase to snake_case for the database
  const dbCertificate = {
    id,
    service_call_id: certificateData.serviceCallId,
    customer: certificateData.customer,
    operator: certificateData.operator,
    date: certificateData.date,
    service_details: certificateData.serviceDetails,
    materials: certificateData.materials,
    quantity: certificateData.quantity,
    service_hours: certificateData.serviceHours,
    signature_type: certificateData.signatureType,
    signature_data: certificateData.signatureData,
    status: certificateData.status,
    pdf_url: certificateData.pdfUrl,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from('delivery_certificates')
    .insert([dbCertificate])
    .select()
    .single();

  if (error) {
    console.error('Error creating delivery certificate:', error);
    throw new Error(`Failed to create delivery certificate: ${error.message}`);
  }

  // Update the related service call to mark it as completed
  await supabase
    .from('service_calls')
    .update({ 
      status: 'completed',
      updated_at: new Date().toISOString(),
      delivery_certificate_id: id 
    })
    .eq('id', certificateData.serviceCallId);

  // Create a PDF document entry for the customer
  await supabase
    .from('customer_documents')
    .insert([{
      name: `Delivery Certificate - ${new Date(certificateData.date).toLocaleDateString()}`,
      customer_id: data.customer,
      file_type: 'pdf',
      file_path: `/certificates/${data.id}.pdf`,
      status: 'active',
      size: 250000, // Placeholder size
    }]);

  // Convert from snake_case back to camelCase for the frontend
  return {
    id: data.id,
    serviceCallId: data.service_call_id,
    customer: data.customer,
    operator: data.operator,
    date: data.date,
    serviceDetails: data.service_details,
    materials: data.materials,
    quantity: data.quantity,
    serviceHours: data.service_hours,
    signatureType: data.signature_type as 'digital' | 'physical' | 'none',
    signatureData: data.signature_data,
    status: data.status as 'draft' | 'signed' | 'approved' | 'disputed',
    pdfUrl: data.pdf_url,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  };
}

export async function updateDeliveryCertificate(id: string, certificateData: Partial<DeliveryCertificate>): Promise<DeliveryCertificate> {
  // Convert from camelCase to snake_case for the database
  const updates: any = {
    updated_at: new Date().toISOString(),
  };
  
  if (certificateData.serviceCallId) updates.service_call_id = certificateData.serviceCallId;
  if (certificateData.customer) updates.customer = certificateData.customer;
  if (certificateData.operator) updates.operator = certificateData.operator;
  if (certificateData.date) updates.date = certificateData.date;
  if (certificateData.serviceDetails) updates.service_details = certificateData.serviceDetails;
  if (certificateData.materials) updates.materials = certificateData.materials;
  if (certificateData.quantity) updates.quantity = certificateData.quantity;
  if (certificateData.serviceHours !== undefined) updates.service_hours = certificateData.serviceHours;
  if (certificateData.signatureType) updates.signature_type = certificateData.signatureType;
  if (certificateData.signatureData) updates.signature_data = certificateData.signatureData;
  if (certificateData.status) updates.status = certificateData.status;
  if (certificateData.pdfUrl) updates.pdf_url = certificateData.pdfUrl;

  const { data, error } = await supabase
    .from('delivery_certificates')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating delivery certificate:', error);
    throw new Error(`Failed to update delivery certificate: ${error.message}`);
  }

  // Convert from snake_case back to camelCase for the frontend
  return {
    id: data.id,
    serviceCallId: data.service_call_id,
    customer: data.customer,
    operator: data.operator,
    date: data.date,
    serviceDetails: data.service_details,
    materials: data.materials,
    quantity: data.quantity,
    serviceHours: data.service_hours,
    signatureType: data.signature_type as 'digital' | 'physical' | 'none',
    signatureData: data.signature_data,
    status: data.status as 'draft' | 'signed' | 'approved' | 'disputed',
    pdfUrl: data.pdf_url,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  };
}

export async function getDeliveryCertificateById(id: string): Promise<DeliveryCertificate | null> {
  const { data, error } = await supabase
    .from('delivery_certificates')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching delivery certificate:', error);
    throw new Error(`Failed to fetch delivery certificate: ${error.message}`);
  }

  if (!data) return null;

  // Convert from snake_case back to camelCase for the frontend
  return {
    id: data.id,
    serviceCallId: data.service_call_id,
    customer: data.customer,
    operator: data.operator,
    date: data.date,
    serviceDetails: data.service_details,
    materials: data.materials,
    quantity: data.quantity,
    serviceHours: data.service_hours,
    signatureType: data.signature_type as 'digital' | 'physical' | 'none',
    signatureData: data.signature_data,
    status: data.status as 'draft' | 'signed' | 'approved' | 'disputed',
    pdfUrl: data.pdf_url,
    createdAt: data.created_at,
    updatedAt: data.updated_at
  };
}

export async function getAllDeliveryCertificates(): Promise<DeliveryCertificate[]> {
  const { data, error } = await supabase
    .from('delivery_certificates')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching delivery certificates:', error);
    throw new Error(`Failed to fetch delivery certificates: ${error.message}`);
  }

  if (!data) return [];

  // Convert from snake_case back to camelCase for the frontend
  return data.map(item => ({
    id: item.id,
    serviceCallId: item.service_call_id,
    customer: item.customer,
    operator: item.operator,
    date: item.date,
    serviceDetails: item.service_details,
    materials: item.materials,
    quantity: item.quantity,
    serviceHours: item.service_hours,
    signatureType: item.signature_type as 'digital' | 'physical' | 'none',
    signatureData: item.signature_data,
    status: item.status as 'draft' | 'signed' | 'approved' | 'disputed',
    pdfUrl: item.pdf_url,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  }));
}

export async function getDeliveryCertificatesByCustomer(customerId: string): Promise<DeliveryCertificate[]> {
  const { data, error } = await supabase
    .from('delivery_certificates')
    .select('*')
    .eq('customer', customerId)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching customer delivery certificates:', error);
    throw new Error(`Failed to fetch customer delivery certificates: ${error.message}`);
  }

  if (!data) return [];

  // Convert from snake_case back to camelCase for the frontend
  return data.map(item => ({
    id: item.id,
    serviceCallId: item.service_call_id,
    customer: item.customer,
    operator: item.operator,
    date: item.date,
    serviceDetails: item.service_details,
    materials: item.materials,
    quantity: item.quantity,
    serviceHours: item.service_hours,
    signatureType: item.signature_type as 'digital' | 'physical' | 'none',
    signatureData: item.signature_data,
    status: item.status as 'draft' | 'signed' | 'approved' | 'disputed',
    pdfUrl: item.pdf_url,
    createdAt: item.created_at,
    updatedAt: item.updated_at
  }));
}

export async function deleteDeliveryCertificate(id: string): Promise<void> {
  const { error } = await supabase
    .from('delivery_certificates')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting delivery certificate:', error);
    throw new Error(`Failed to delete delivery certificate: ${error.message}`);
  }
}
