// Mock data to simulate API responses until we have the real backend

export const mockCustomers = [
  {
    id: '1',
    name: 'Acme Corporation',
    nickname: 'Acme',
    email: 'contact@acme.com',
    phone: '+1 (555) 123-4567',
    officePhone: '+1 (555) 987-6543',
    address: '123 Main St, New York, NY 10001',
    address2: 'Suite 500',
    type: 'business',
    status: 'active',
    created_at: '2023-06-15T10:00:00Z',
    updated_at: '2023-09-20T14:30:00Z',
    avatar_url: null,
    needs_quote: true, // Needs a quote
    customerId: 'ACME001',
    contactName: 'John Smith',
    last_active: '2023-11-05T09:30:00Z'
  },
  {
    id: '2',
    name: 'TechNova Solutions',
    nickname: 'TechNova',
    email: 'info@technova.com',
    phone: '+1 (555) 234-5678',
    officePhone: '+1 (555) 876-5432',
    address: '456 Innovation Ave, San Francisco, CA 94107',
    address2: 'Floor 3',
    type: 'business',
    status: 'active',
    created_at: '2023-07-22T09:15:00Z',
    updated_at: '2023-10-05T11:45:00Z',
    avatar_url: null,
    needs_quote: false,
    customerId: 'TECH002',
    contactName: 'Sarah Johnson',
    last_active: '2023-12-10T14:20:00Z'
  },
  {
    id: '3',
    name: 'Green Earth Landscaping',
    nickname: 'Green Earth',
    email: 'contact@greenearth.com',
    phone: '+1 (555) 345-6789',
    officePhone: '+1 (555) 765-4321',
    address: '789 Green St, Portland, OR 97201',
    address2: '',
    type: 'business',
    status: 'active',
    created_at: '2023-08-10T13:20:00Z',
    updated_at: '2023-10-12T16:10:00Z',
    avatar_url: null,
    needs_quote: false,
    customerId: 'GREEN003',
    contactName: 'Michael Brown',
    last_active: '2023-12-15T11:45:00Z'
  },
  {
    id: '4',
    name: 'City Government',
    nickname: 'City Gov',
    email: 'office@citygov.org',
    phone: '+1 (555) 456-7890',
    officePhone: '+1 (555) 654-3210',
    address: '100 Government Plaza, Boston, MA 02201',
    address2: 'Building B',
    type: 'government',
    status: 'active',
    created_at: '2023-05-05T08:30:00Z',
    updated_at: '2023-09-28T10:20:00Z',
    avatar_url: null,
    needs_quote: true, // Needs a quote
    customerId: 'CITY004',
    contactName: 'David Wilson',
    last_active: '2023-11-15T10:30:00Z'
  },
  {
    id: '5',
    name: 'First Community Hospital',
    nickname: 'FCH',
    email: 'admin@firsthospital.org',
    phone: '+1 (555) 567-8901',
    officePhone: '+1 (555) 543-2109',
    address: '200 Health Ave, Chicago, IL 60601',
    address2: '',
    type: 'non-profit',
    status: 'active',
    created_at: '2023-09-01T07:45:00Z',
    updated_at: '2023-10-20T09:15:00Z',
    avatar_url: null,
    needs_quote: false,
    customerId: 'HOSP005',
    contactName: 'Emily Davis',
    last_active: '2023-12-05T11:45:00Z'
  },
  {
    id: '6',
    name: 'Robert Johnson',
    nickname: 'Bob',
    email: 'robert@example.com',
    phone: '+1 (555) 678-9012',
    officePhone: '',
    address: '300 Residential Dr, Miami, FL 33101',
    address2: 'Apt 45',
    type: 'individual',
    status: 'active',
    created_at: '2023-09-15T14:00:00Z',
    updated_at: '2023-10-18T11:30:00Z',
    avatar_url: null,
    needs_quote: false,
    customerId: 'INDV006',
    contactName: 'Robert Johnson',
    last_active: '2023-11-20T10:30:00Z'
  },
  {
    id: '7',
    name: 'Sunshine Bakery',
    nickname: 'Sunshine',
    email: 'hello@sunshinebakery.com',
    phone: '+1 (555) 789-0123',
    officePhone: '+1 (555) 432-1098',
    address: '400 Baker St, Denver, CO 80201',
    address2: '',
    type: 'business',
    status: 'inactive',
    created_at: '2023-04-10T11:10:00Z',
    updated_at: '2023-08-15T13:40:00Z',
    avatar_url: null,
    needs_quote: false,
    customerId: 'BAKE007',
    contactName: 'Lisa Martinez',
    last_active: '2023-12-20T11:45:00Z'
  },
  {
    id: '8',
    name: 'Education First Foundation',
    nickname: 'EdFirst',
    email: 'contact@edfirst.org',
    phone: '+1 (555) 890-1234',
    officePhone: '+1 (555) 321-0987',
    address: '500 Learning Blvd, Austin, TX 78701',
    address2: 'Suite 200',
    type: 'non-profit',
    status: 'active',
    created_at: '2023-07-05T09:30:00Z',
    updated_at: '2023-10-01T15:00:00Z',
    avatar_url: null,
    needs_quote: false,
    customerId: 'EDUC008',
    contactName: 'James Taylor',
    last_active: '2023-11-25T10:30:00Z'
  },
  {
    id: '9',
    name: 'Peak Construction',
    nickname: 'Peak',
    email: 'info@peakconstruction.com',
    phone: '+1 (555) 901-2345',
    officePhone: '+1 (555) 210-9876',
    address: '600 Builder Ave, Seattle, WA 98101',
    address2: '',
    type: 'business',
    status: 'prospect',
    created_at: '2023-10-01T10:20:00Z',
    updated_at: '2023-10-22T08:10:00Z',
    avatar_url: null,
    needs_quote: true, // Needs a quote
    customerId: 'PEAK009',
    contactName: 'Thomas Anderson',
    last_active: '2023-12-30T10:30:00Z'
  },
  {
    id: '10',
    name: 'Maria Garcia',
    nickname: 'Maria',
    email: 'maria@example.com',
    phone: '+1 (555) 012-3456',
    officePhone: '',
    address: '700 Residential Lane, Phoenix, AZ 85001',
    address2: '',
    type: 'individual',
    status: 'active',
    created_at: '2023-08-20T16:15:00Z',
    updated_at: '2023-10-10T12:30:00Z',
    avatar_url: null,
    needs_quote: false,
    customerId: 'INDV010',
    contactName: 'Maria Garcia',
    last_active: '2023-11-30T10:30:00Z'
  },
  {
    id: '11',
    name: 'Alpha Construction Ltd',
    nickname: 'Alpha',
    email: 'info@alphaconstruction.com',
    phone: '+1 (555) 111-2233',
    officePhone: '+1 (555) 223-4455',
    address: '100 Builder Lane, Chicago, IL 60601',
    address2: 'Building A',
    type: 'business',
    status: 'active',
    created_at: '2023-05-10T08:30:00Z',
    updated_at: '2023-11-22T09:15:00Z',
    avatar_url: null,
    needs_quote: true,
    customerId: 'ALPHA011',
    contactName: 'Richard Miller',
    last_active: '2024-01-05T10:30:00Z'
  },
  {
    id: '12',
    name: 'Omega Engineering Group',
    nickname: 'Omega',
    email: 'contact@omegaeng.com',
    phone: '+1 (555) 333-4444',
    officePhone: '+1 (555) 555-6666',
    address: '200 Engineer Blvd, Houston, TX 77001',
    address2: 'Suite 300',
    type: 'business',
    status: 'active',
    created_at: '2023-06-22T11:20:00Z',
    updated_at: '2023-12-01T13:10:00Z',
    avatar_url: null,
    needs_quote: false,
    customerId: 'OMEGA012',
    contactName: 'Jennifer Adams',
    last_active: '2024-01-15T14:20:00Z'
  },
  {
    id: '13',
    name: 'Delta Development Inc',
    nickname: 'Delta',
    email: 'info@deltadevelopment.com',
    phone: '+1 (555) 777-8888',
    officePhone: '+1 (555) 999-0000',
    address: '300 Development Dr, Atlanta, GA 30301',
    address2: '',
    type: 'business',
    status: 'prospect',
    created_at: '2023-07-15T09:45:00Z',
    updated_at: '2023-11-10T15:30:00Z',
    avatar_url: null,
    needs_quote: true,
    customerId: 'DELTA013',
    contactName: 'Robert Wilson',
    last_active: '2024-02-01T09:15:00Z'
  },
  {
    id: '14',
    name: 'Gamma Infrastructure LLC',
    nickname: 'Gamma',
    email: 'contact@gammainfra.com',
    phone: '+1 (555) 111-3333',
    officePhone: '+1 (555) 222-4444',
    address: '400 Infrastructure Way, Dallas, TX 75201',
    address2: 'Floor 5',
    type: 'business',
    status: 'active',
    created_at: '2023-08-05T13:15:00Z',
    updated_at: '2023-12-20T11:25:00Z',
    avatar_url: null,
    needs_quote: false,
    customerId: 'GAMMA014',
    contactName: 'Elizabeth Chen',
    last_active: '2024-02-10T13:45:00Z'
  },
  {
    id: '15',
    name: 'Beta Builders Corporation',
    nickname: 'Beta',
    email: 'info@betabuilders.com',
    phone: '+1 (555) 444-5555',
    officePhone: '+1 (555) 666-7777',
    address: '500 Construction Ave, Phoenix, AZ 85001',
    address2: 'Suite 100',
    type: 'business',
    status: 'inactive',
    created_at: '2023-04-18T10:30:00Z',
    updated_at: '2023-10-30T09:45:00Z',
    avatar_url: null,
    needs_quote: false,
    customerId: 'BETA015',
    contactName: 'Daniel Thompson',
    last_active: '2023-09-15T11:20:00Z'
  }
];

export const mockScheduleCalls = [
  {
    id: '1',
    customer: 'ABC Construction',
    address: '123 Main St, City',
    date: '2023-06-15T09:00:00',
    endDate: '2023-06-15T11:00:00',
    status: 'pending',
    operator: 'John Smith',
    serviceType: 'Concrete Pumping',
    notes: 'Access from rear entrance'
  },
  {
    id: '2',
    customer: 'XYZ Builders',
    address: '456 Oak Ave, Town',
    date: '2023-06-16T13:00:00',
    endDate: '2023-06-16T15:00:00',
    status: 'completed',
    operator: 'Jane Doe',
    serviceType: 'Line Pump',
    notes: ''
  },
  {
    id: '3',
    customer: 'City Development',
    address: '789 Pine Rd, Metro',
    date: '2023-06-17T10:00:00',
    endDate: '2023-06-17T14:00:00',
    status: 'in-progress',
    operator: 'Mike Johnson',
    serviceType: 'Boom Pump',
    notes: 'Large project, bring extra hoses'
  }
];

export const mockScheduleEvents = [
  {
    id: "1",
    title: "Concrete Pumping",
    startTime: "2023-06-10T09:00:00",
    endTime: "2023-06-10T12:00:00",
    durationMinutes: 180,
    customer: "Acme Corp",
    operator: "John Smith",
    status: "service-call",
    notes: "Regular pumping service",
    projectSite: "Mevaseret Tzion"
  },
  {
    id: "2",
    title: "Line Pumping at Construction Site",
    startTime: "2023-06-15T14:00:00",
    endTime: "2023-06-15T17:00:00",
    durationMinutes: 180,
    customer: "Tech Solutions",
    operator: "Emily Johnson",
    status: "scheduled",
    notes: "Need extra care around the power lines.",
    projectSite: "Jerusalem Central"
  },
  {
    id: "3",
    title: "Boom Lift for Window Installation",
    startTime: "2023-06-20T08:00:00",
    endTime: "2023-06-20T16:00:00",
    durationMinutes: 480,
    customer: "Global Enterprises",
    operator: "Michael Brown",
    status: "in-progress",
    notes: "Install windows on the 15th floor.",
    projectSite: "Tel Aviv North"
  },
  {
    id: "4",
    title: "Material Delivery to New Building",
    startTime: "2023-06-25T10:00:00",
    endTime: "2023-06-25T11:00:00",
    durationMinutes: 60,
    customer: "ABC Industries",
    operator: "Jessica Davis",
    status: "waiting-signature",
    notes: "Deliver materials before noon.",
    projectSite: "Haifa Port"
  },
  {
    id: "5",
    title: "Concrete Pumping for Foundation",
    startTime: "2023-07-01T13:00:00",
    endTime: "2023-07-01T16:00:00",
    durationMinutes: 180,
    customer: "Acme Corp",
    operator: "John Smith",
    status: "completed",
    notes: "Completed foundation pour.",
    projectSite: "Mevaseret Tzion"
  },
  {
    id: "6",
    title: "Line Pumping for Sidewalk",
    startTime: "2023-07-05T09:00:00",
    endTime: "2023-07-05T12:00:00",
    durationMinutes: 180,
    customer: "Tech Solutions",
    operator: "Emily Johnson",
    status: "physical-signature",
    notes: "Sidewalk pumping completed.",
    projectSite: "Jerusalem Central"
  },
  {
    id: "7",
    title: "Boom Lift for Sign Installation",
    startTime: "2023-07-10T11:00:00",
    endTime: "2023-07-10T14:00:00",
    durationMinutes: 180,
    customer: "Global Enterprises",
    operator: "Michael Brown",
    status: "without-signature",
    notes: "Installed new company sign.",
    projectSite: "Tel Aviv North"
  },
  {
    id: "8",
    title: "Material Delivery Cancelled",
    startTime: "2023-07-15T15:00:00",
    endTime: "2023-07-15T16:00:00",
    durationMinutes: 60,
    customer: "ABC Industries",
    operator: "Jessica Davis",
    status: "canceled",
    notes: "Delivery cancelled due to weather.",
    projectSite: "Haifa Port"
  },
];

export const mockUsers = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@unidoc.com",
    role: "operator",
    status: "active",
    lastActive: "2023-08-20T15:30:00",
    avatarUrl: "/placeholder.svg",
    phone: "+972 50-111-2222",
    permissions: "Standard",
    documents: [
      { name: "Driver License.pdf", type: "application/pdf", size: 1240000 },
      { name: "Insurance Certificate.pdf", type: "application/pdf", size: 980000 }
    ]
  },
  {
    id: "2",
    name: "Emily Johnson",
    email: "emily.johnson@unidoc.com",
    role: "operator",
    status: "active",
    lastActive: "2023-08-21T09:15:00",
    avatarUrl: "/placeholder.svg",
    phone: "+972 50-222-3333",
    permissions: "Standard",
    documents: [
      { name: "Certification.pdf", type: "application/pdf", size: 2340000 }
    ]
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@unidoc.com",
    role: "operator",
    status: "active",
    lastActive: "2023-08-19T16:45:00",
    avatarUrl: "/placeholder.svg",
    phone: "+972 50-333-4444",
    permissions: "Limited",
    documents: []
  },
  {
    id: "4",
    name: "Jessica Davis",
    email: "jessica.davis@unidoc.com",
    role: "operator",
    status: "active",
    lastActive: "2023-08-21T10:30:00",
    avatarUrl: "/placeholder.svg",
    phone: "+972 50-444-5555",
    permissions: "Standard",
    documents: [
      { name: "Training Certificate.pdf", type: "application/pdf", size: 1540000 }
    ]
  },
  {
    id: "5",
    name: "David Miller",
    email: "david.miller@unidoc.com",
    role: "admin",
    status: "active",
    lastActive: "2023-08-21T11:20:00",
    avatarUrl: "/placeholder.svg",
    phone: "+972 50-555-6666",
    permissions: "Full Access",
    documents: []
  },
  {
    id: "6",
    name: "Sarah Wilson",
    email: "sarah.wilson@unidoc.com",
    role: "office",
    status: "active",
    lastActive: "2023-08-21T08:45:00",
    avatarUrl: "/placeholder.svg",
    phone: "+972 50-666-7777",
    permissions: "Admin",
    documents: []
  }
];

export const mockAgreements = [
  {
    id: "1",
    title: "Standard Pumping Services",
    customer_id: "1", // Acme Corp
    created_at: "2023-05-01T10:00:00",
    valid_until: "2024-05-01T10:00:00",
    status: "active",
    amount: 50000,
    terms: "Net 30",
    description: "Standard concrete pumping services with 24/7 support",
    created_by: "5" // David Miller (admin)
  },
  {
    id: "2",
    title: "Premium Lifting Package",
    customer_id: "2", // TechNova
    created_at: "2023-06-15T09:30:00",
    valid_until: "2024-06-15T09:30:00",
    status: "active",
    amount: 75000,
    terms: "Net 15",
    description: "Premium lifting services including boom lift and crane operations",
    created_by: "5" // David Miller (admin)
  },
  {
    id: "3",
    title: "Construction Support Services",
    customer_id: "3", // Green Earth
    created_at: "2023-04-10T14:00:00",
    valid_until: "2023-10-10T14:00:00",
    status: "expired",
    amount: 120000,
    terms: "Net 45",
    description: "Comprehensive construction support including equipment and personnel",
    created_by: "6" // Sarah Wilson (office)
  },
  {
    id: "4",
    title: "Material Handling Agreement",
    customer_id: "4", // City Government
    created_at: "2023-01-20T11:15:00",
    valid_until: "2023-07-20T11:15:00",
    status: "expired",
    amount: 30000,
    terms: "Net 30",
    description: "Material handling services for government construction projects",
    created_by: "5" // David Miller (admin)
  },
  {
    id: "5",
    title: "Annual Maintenance Contract",
    customer_id: "1", // Acme Corp
    created_at: "2023-08-15T09:00:00",
    valid_until: "2024-08-15T09:00:00",
    status: "active",
    amount: 25000,
    terms: "Net 30",
    description: "Annual maintenance and inspection of concrete pumping equipment",
    created_by: "6" // Sarah Wilson (office)
  },
  {
    id: "6",
    title: "Heavy Equipment Rental",
    customer_id: "2", // TechNova
    created_at: "2023-11-01T13:45:00",
    valid_until: "2024-02-01T13:45:00",
    status: "active",
    amount: 45000,
    terms: "Net 15",
    description: "Three-month rental of heavy construction equipment",
    created_by: "5" // David Miller (admin)
  },
  {
    id: "7",
    title: "On-Demand Pumping Services",
    customer_id: "5", // First Community Hospital
    created_at: "2023-09-15T10:30:00",
    valid_until: "2024-03-15T10:30:00",
    status: "active",
    amount: 60000,
    terms: "Net 45",
    description: "On-demand concrete pumping services for hospital expansion project",
    created_by: "6" // Sarah Wilson (office)
  },
  {
    id: "8",
    title: "Emergency Response Services",
    customer_id: "4", // City Government
    created_at: "2023-10-05T14:15:00",
    valid_until: "2024-10-05T14:15:00",
    status: "active",
    amount: 85000,
    terms: "Net 30",
    description: "Priority emergency response services for critical infrastructure",
    created_by: "5" // David Miller (admin)
  },
  {
    id: "9",
    title: "Construction Equipment Package",
    customer_id: "11", // Alpha Construction
    created_at: "2023-09-20T11:00:00",
    valid_until: "2024-09-20T11:00:00",
    status: "active",
    amount: 95000,
    terms: "Net 30",
    description: "Complete construction equipment package with operator services",
    created_by: "5" // David Miller (admin)
  },
  {
    id: "10",
    title: "Engineering Support Contract",
    customer_id: "12", // Omega Engineering
    created_at: "2023-10-15T09:30:00",
    valid_until: "2024-10-15T09:30:00",
    status: "active",
    amount: 110000,
    terms: "Net 45",
    description: "Engineering support services including concrete pumping and material handling",
    created_by: "6" // Sarah Wilson (office)
  },
  {
    id: "11",
    title: "Development Project Support",
    customer_id: "13", // Delta Development
    created_at: "2023-12-01T13:15:00",
    valid_until: "2024-06-01T13:15:00",
    status: "draft",
    amount: 70000,
    terms: "Net 30",
    description: "Comprehensive support for urban development project",
    created_by: "5" // David Miller (admin)
  },
  {
    id: "12",
    title: "Infrastructure Maintenance",
    customer_id: "14", // Gamma Infrastructure
    created_at: "2023-11-10T10:45:00",
    valid_until: "2024-11-10T10:45:00",
    status: "active",
    amount: 130000,
    terms: "Net 60",
    description: "Long-term infrastructure maintenance and support services",
    created_by: "6" // Sarah Wilson (office)
  }
];

export const mockServiceCallsExtended = [
  {
    id: "sc101",
    customer: "1",
    address: "123 Main St, New York, NY 10001",
    date: "2024-01-15T09:00:00",
    endDate: "2024-01-15T14:00:00",
    status: "completed",
    operator: "1", // John Smith
    serviceType: "concrete-pumping",
    notes: "Completed foundation pour for new building",
    projectSite: "Acme HQ Expansion",
    pump_type: "boom-pump",
    quantity: "50m³",
    vehicle_number: "P-101"
  },
  {
    id: "sc102",
    customer: "1",
    address: "123 Main St, New York, NY 10001",
    date: "2024-02-10T08:00:00",
    endDate: "2024-02-10T12:00:00",
    status: "completed",
    operator: "2", // Emily Johnson
    serviceType: "line-pumping",
    notes: "Sidewalk installation completed successfully",
    projectSite: "Acme Campus",
    pump_type: "line-pump",
    quantity: "25m³",
    vehicle_number: "P-102"
  },
  {
    id: "sc103",
    customer: "1",
    address: "123 Main St, New York, NY 10001",
    date: "2024-03-05T10:00:00",
    endDate: "2024-03-05T15:00:00",
    status: "scheduled",
    operator: "1", // John Smith
    serviceType: "concrete-pumping",
    notes: "Parking structure foundation pour",
    projectSite: "Acme Parking Facility",
    pump_type: "boom-pump",
    quantity: "75m³",
    vehicle_number: "P-103"
  },
  
  {
    id: "sc201",
    customer: "2",
    address: "456 Innovation Ave, San Francisco, CA 94107",
    date: "2024-01-20T07:30:00",
    endDate: "2024-01-20T16:00:00",
    status: "completed",
    operator: "3", // Michael Brown
    serviceType: "boom-lift",
    notes: "Exterior glass installation for new tech campus",
    projectSite: "TechNova HQ",
    pump_type: null,
    quantity: null,
    vehicle_number: "L-201"
  },
  {
    id: "sc202",
    customer: "2",
    address: "456 Innovation Ave, San Francisco, CA 94107",
    date: "2024-02-15T09:00:00",
    endDate: "2024-02-15T17:00:00",
    status: "in-progress",
    operator: "4", // Jessica Davis
    serviceType: "concrete-pumping",
    notes: "Data center foundation work in progress",
    projectSite: "TechNova Data Center",
    pump_type: "boom-pump",
    quantity: "80m³",
    vehicle_number: "P-202"
  },
  
  {
    id: "sc301",
    customer: "3",
    address: "789 Green St, Portland, OR 97201",
    date: "2024-01-25T08:00:00",
    endDate: "2024-01-25T12:00:00",
    status: "completed",
    operator: "1", // John Smith
    serviceType: "material-delivery",
    notes: "Delivered eco-friendly concrete mix",
    projectSite: "Green Earth Eco Park",
    pump_type: null,
    quantity: "30 tons",
    vehicle_number: "D-301"
  },
  {
    id: "sc302",
    customer: "3",
    address: "789 Green St, Portland, OR 97201",
    date: "2024-03-10T09:00:00",
    endDate: "2024-03-10T14:00:00",
    status: "pending",
    operator: "2", // Emily Johnson
    serviceType: "line-pumping",
    notes: "Sustainable pathway construction",
    projectSite: "Green Earth Gardens",
    pump_type: "line-pump",
    quantity: "20m³",
    vehicle_number: "P-302"
  },
  
  {
    id: "sc401",
    customer: "4", // City Government
    address: "100 Government Plaza, Boston, MA 02201",
    date: "2024-02-05T07:00:00",
    endDate: "2024-02-05T16:00:00",
    status: "completed",
    operator: "3", // Michael Brown
    serviceType: "concrete-pumping",
    notes: "Municipal building foundation completed",
    projectSite: "City Hall Annex",
    pump_type: "boom-pump",
    quantity: "100m³",
    vehicle_number: "P-401"
  },
  
  {
    id: "sc501",
    customer: "5", // First Community Hospital
    address: "200 Health Ave, Chicago, IL 60601",
    date: "2024-01-30T08:00:00",
    endDate: "2024-01-30T17:00:00",
    status: "waiting-signature",
    operator: "4", // Jessica Davis
    serviceType: "concrete-pumping",
    notes: "New wing foundation pour completed, waiting for approval",
    projectSite: "Hospital Expansion",
    pump_type: "boom-pump",
    quantity: "90m³",
    vehicle_number: "P-501"
  }
];

export const mockCertificates = [
  {
    id: "cert101",
    service_call_id: "sc101",
    customer: "1", // Acme Corp
    operator: "1", // John Smith
    date: "2024-01-15T14:00:00",
    service_hours: 5,
    created_at: "2024-01-15T14:30:00",
    quantity: "50m³",
    signature_type: "digital",
    signature_data: "John Doe, Project Manager",
    status: "signed",
    service_details: "Foundation pour for new building completed as specified",
    materials: "Premium concrete mix with reinforcement additives"
  },
  {
    id: "cert102",
    service_call_id: "sc102",
    customer: "1", // Acme Corp
    operator: "2", // Emily Johnson
    date: "2024-02-10T12:00:00",
    service_hours: 4,
    created_at: "2024-02-10T12:15:00",
    quantity: "25m³",
    signature_type: "digital",
    signature_data: "Jane Smith, Site Supervisor",
    status: "signed",
    service_details: "Sidewalk installation completed with specified finish",
    materials: "Standard concrete mix with water-resistant additives"
  },
  {
    id: "cert201",
    service_call_id: "sc201",
    customer: "2", // TechNova
    operator: "3", // Michael Brown
    date: "2024-01-20T16:00:00",
    service_hours: 8.5,
    created_at: "2024-01-20T16:30:00",
    quantity: null,
    signature_type: "physical",
    signature_data: null,
    status: "physical-signature",
    service_details: "Exterior glass installation completed for all 4 facades",
    materials: "Equipment rental: high-reach boom lift with operator"
  },
  {
    id: "cert301",
    service_call_id: "sc301",
    customer: "3", // Green Earth
    operator: "1", // John Smith
    date: "2024-01-25T12:00:00",
    service_hours: 4,
    created_at: "2024-01-25T12:30:00",
    quantity: "30 tons",
    signature_type: "digital",
    signature_data: "Michael Green, Project Director",
    status: "signed",
    service_details: "Eco-friendly concrete mix delivered on schedule",
    materials: "Sustainable concrete mix with recycled aggregates"
  },
  {
    id: "cert401",
    service_call_id: "sc401",
    customer: "4", // City Government
    operator: "3", // Michael Brown
    date: "2024-02-05T16:00:00",
    service_hours: 9,
    created_at: "2024-02-05T16:45:00",
    quantity: "100m³",
    signature_type: "digital",
    signature_data: "Robert Wilson, City Engineer",
    status: "signed",
    service_details: "Municipal building foundation completed according to specifications",
    materials: "High-strength concrete mix with specified PSI rating"
  },
  {
    id: "cert501",
    service_call_id: "sc501",
    customer: "5", // First Community Hospital
    operator: "4", // Jessica Davis
    date: "2024-01-30T17:00:00",
    service_hours: 9,
    created_at: "2024-01-30T17:30:00",
    quantity: "90m³",
    signature_type: "awaiting",
    signature_data: null,
    status: "awaiting-signature",
    service_details: "Hospital wing foundation pour completed, awaiting final inspection",
    materials: "Medical-grade concrete mix with antimicrobial additives"
  }
];

export const mockCustomerDocuments = [
  {
    id: "doc101",
    customer_id: "1",
    name: "Project Contract 2024.pdf",
    file_type: "application/pdf",
    size: 2456789,
    created_at: "2024-01-05T10:30:00",
    created_by: "5", // David Miller (admin)
    status: "active",
    file_path: "/documents/acme/Project_Contract_2024.pdf"
  },
  {
    id: "doc102",
    customer_id: "1",
    name: "Site Survey.pdf",
    file_type: "application/pdf",
    size: 3890123,
    created_at: "2024-01-07T14:15:00",
    created_by: "5", // David Miller (admin)
    status: "active",
    file_path: "/documents/acme/Site_Survey.pdf"
  },
  {
    id: "doc103",
    customer_id: "1",
    name: "Construction Timeline.xlsx",
    file_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    size: 548732,
    created_at: "2024-01-10T09:45:00",
    created_by: "6", // Sarah Wilson (office)
    status: "active",
    file_path: "/documents/acme/Construction_Timeline.xlsx"
  },
  
  {
    id: "doc201",
    customer_id: "2",
    name: "Campus Blueprint.pdf",
    file_type: "application/pdf",
    size: 7632145,
    created_at: "2024-01-12T11:20:00",
    created_by: "5", // David Miller (admin)
    status: "active",
    file_path: "/documents/technova/Campus_Blueprint.pdf"
  },
  {
    id: "doc202",
    customer_id: "2",
    name: "Equipment Specifications.docx",
    file_type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    size: 876321,
    created_at: "2024-01-14T15:30:00",
    created_by: "6", // Sarah Wilson (office)
    status: "active",
    file_path: "/documents/technova/Equipment_Specifications.docx"
  },
  
  {
    id: "doc301",
    customer_id: "3",
    name: "Eco Park Plans.pdf",
    file_type: "application/pdf",
    size: 4563789,
    created_at: "2024-01-18T10:15:00",
    created_by: "5", // David Miller (admin)
    status: "active",
    file_path: "/documents/greenearth/Eco_Park_Plans.pdf"
  },
  {
    id: "doc302",
    customer_id: "3",
    name: "Sustainability Report.pdf",
    file_type: "application/pdf",
    size: 2315678,
    created_at: "2024-01-20T13:45:00",
    created_by: "6", // Sarah Wilson (office)
    status: "active",
    file_path: "/documents/greenearth/Sustainability_Report.pdf"
  }
];

export const mockCustomerDisputes = [
  {
    id: "disp101",
    customer_id: "1", // Acme Corp
    document_id: "cert101", // Related to a certificate
    title: "Concrete Quality Dispute",
    description: "Customer reports that concrete quality does not meet the agreed specifications",
    status: "open",
    created_at: "2024-01-20T09:30:00",
    updated_at: "2024-01-20T09:30:00",
    created_by: "5" // David Miller (admin)
  },
  {
    id: "disp201",
    customer_id: "2", // TechNova
    document_id: "cert201",
    title: "Service Hours Discrepancy",
    description: "Dispute regarding the actual hours of equipment usage versus billed hours",
    status: "resolved",
    created_at: "2024-01-25T14:20:00",
    updated_at: "2024-02-01T11:15:00",
    created_by: "6" // Sarah Wilson (office)
  },
  {
    id: "disp301",
    customer_id: "3", // Green Earth
    document_id: "cert301",
    title: "Delivery Timing Issue",
    description: "Material was delivered 2 hours later than the scheduled time",
    status: "closed",
    created_at: "2024-01-28T16:45:00",
    updated_at: "2024-02-03T10:30:00",
    created_by: "5" // David Miller (admin)
  }
];

export const mockDisputeMessages = [
  {
    id: "msg101_1",
    dispute_id: "disp101",
    message: "We have received your complaint about the concrete quality. Our team is investigating the issue.",
    created_at: "2024-01-20T10:15:00",
    created_by: "5", // David Miller (admin)
    is_read: true
  },
  {
    id: "msg101_2",
    dispute_id: "disp101",
    message: "We've taken samples for testing and will provide the results as soon as possible.",
    created_at: "2024-01-22T09:30:00",
    created_by: "6", // Sarah Wilson (office)
    is_read: true
  },
  {
    id: "msg101_3",
    dispute_id: "disp101",
    message: "We would like to schedule a meeting to discuss the test results and potential solutions.",
    created_at: "2024-01-25T14:45:00",
    created_by: "5", // David Miller (admin)
    is_read: false
  },
  
  {
    id: "msg201_1",
    dispute_id: "disp201",
    message: "We're reviewing the service logs to verify the hours of equipment usage.",
    created_at: "2024-01-25T15:10:00",
    created_by: "6", // Sarah Wilson (office)
    is_read: true
  },
  {
    id: "msg201_2",
    dispute_id: "disp201",
    message: "After reviewing the logs and speaking with the operator, we're adjusting the invoice to reflect the actual hours.",
    created_at: "2024-01-30T11:20:00",
    created_by: "5", // David Miller (admin)
    is_read: true
  },
  {
    id: "msg201_3",
    dispute_id: "disp201",
    message: "Thank you for resolving this issue promptly. We're satisfied with the adjustment.",
    created_at: "2024-02-01T10:45:00",
    created_by: "2", // From TechNova
    is_read: true
  },
  
  {
    id: "msg301_1",
    dispute_id: "disp301",
    message: "We apologize for the delay in delivery. We're investigating the cause.",
    created_at: "2024-01-28T17:30:00",
    created_by: "5", // David Miller (admin)
    is_read: true
  },
  {
    id: "msg301_2",
    dispute_id: "disp301",
    message: "The delay was caused by unexpected road construction. We're offering a 10% discount on this delivery as compensation.",
    created_at: "2024-01-31T09:15:00",
    created_by: "6", // Sarah Wilson (office)
    is_read: true
  },
  {
    id: "msg301_3",
    dispute_id: "disp301",
    message: "We accept the discount offer and consider this matter resolved.",
    created_at: "2024-02-03T10:10:00",
    created_by: "3", // From Green Earth
    is_read: true
  }
];
