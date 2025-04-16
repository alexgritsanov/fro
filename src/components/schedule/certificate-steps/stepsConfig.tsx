
import { 
  FileText, Building2, MapPin, Clock, Package, 
  Info, Check, Eye, Pen, Calendar, User, Truck,
  Container, Layout, Building, Clock8, ArrowLeftRight,
  Pipette, Users, Boxes, MessagesSquare, Briefcase
} from 'lucide-react';

// Main steps for the certificate workflow
export const certificateSteps = [
  { id: "basic", title: "Basic Info", icon: FileText },
  { id: "additional", title: "Additional Info", icon: Info },
  { id: "additions", title: "Service Additions", icon: Package },
  { id: "preview", title: "Preview", icon: Eye },
  { id: "signature", title: "Signature", icon: Pen }
];

// Sub-steps for each main step
export const certificateSubSteps = {
  basic: [
    { id: "type", title: "Certificate Type", icon: FileText },
    { id: "customer", title: "Customer", icon: Building2 },
    { id: "site", title: "Project Site", icon: MapPin },
    { id: "date", title: "Date", icon: Calendar },
    { id: "operator", title: "Operator", icon: User },
    { id: "time", title: "Time", icon: Clock },
    { id: "pumpType", title: "Pump Type", icon: Truck },
    { id: "vehicle", title: "Vehicle", icon: Truck }
  ],
  additional: [
    { id: "concreteType", title: "Concrete Type", icon: Container },
    { id: "elementType", title: "Element Type", icon: Layout },
    { id: "provider", title: "Provider Company", icon: Building }
  ],
  additions: [
    { id: "waitingTime", title: "Waiting Time", icon: Clock8 },
    { id: "transfers", title: "Transfers", icon: ArrowLeftRight },
    { id: "pipe", title: "Additional Pipe", icon: Pipette },
    { id: "malkoTeam", title: "Malko Team", icon: Users },
    { id: "concreteSupply", title: "Concrete Supply", icon: Boxes },
    { id: "notes", title: "Notes", icon: MessagesSquare },
    { id: "workType", title: "Work Type", icon: Briefcase }
  ],
  preview: [
    { id: "complete", title: "Complete", icon: Check }
  ],
  signature: [
    { id: "sign", title: "Sign", icon: Pen }
  ]
};

// Export the step ID types
export type CertificateStepId = "basic" | "additional" | "additions" | "preview" | "signature";
export type CertificateSubStepId = 
  "type" | "customer" | "site" | "date" | "operator" | "time" | "pumpType" | "vehicle" |
  "concreteType" | "elementType" | "provider" |
  "waitingTime" | "transfers" | "pipe" | "malkoTeam" | "concreteSupply" | "notes" | "workType" |
  "complete" | "sign";
