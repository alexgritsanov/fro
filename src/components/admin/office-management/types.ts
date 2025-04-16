export interface ViewToggleProps {
  viewMode: string;
  setViewMode: (mode: string) => void;
  handleRefresh: () => void;
  isRefreshing: boolean;
}

export interface DeleteConfirmationDialogProps {
  showDeleteConfirmation: boolean;
  setShowDeleteConfirmation: (show: boolean) => void;
  officeToDelete: Company | null;
  confirmDeleteOffice: () => void;
  isDeleting: boolean;
}

export interface OfficeActionProps {
  onCreateOffice: () => void;
  onEditOffice: (office: Company) => void;
  onManageUsers: (office: Company) => void;
  onManageUserLimits: (office: Company) => void;
}

export interface OfficeDetailModalProps {
  showOfficeDetails: boolean;
  setShowOfficeDetails: (show: boolean) => void;
  selectedOffice: Company | null;
  onManageUsers: (office: Company) => void;
  onEditOffice: (office: Company) => void;
}

// Import needed for Company type
import { Company } from '@/types/company';
