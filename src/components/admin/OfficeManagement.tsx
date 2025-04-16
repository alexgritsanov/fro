
import React from 'react';
import OfficeManagement from './office-management/OfficeManagement';
import { Company } from '@/types/company';

interface Props {
  onCreateOffice: () => void;
  onEditOffice: (office: Company) => void;
  onManageUsers: (office: Company) => void;
  onManageUserLimits: (office: Company) => void;
}

const OfficeManagementWrapper: React.FC<Props> = (props) => {
  return <OfficeManagement {...props} />;
};

export default OfficeManagementWrapper;
