
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Card from '@/components/Card';

interface DataOverviewPanelProps {
  panelType: 'schedule' | 'customers' | 'users' | 'agreements';
  subType?: string;
  onClose: () => void;
}

const DataOverviewPanel = ({ panelType, subType = 'active', onClose }: DataOverviewPanelProps) => {
  // Render different content based on the current page
  const renderContent = () => {
    switch (panelType) {
      case 'schedule':
        return <ScheduleOverview subType={subType as 'active' | 'completed'} />;
      case 'customers':
        return <CustomersOverview />;
      case 'users':
        return <UsersOverview />;
      case 'agreements':
        return <AgreementsOverview />;
      default:
        return <div>No data available</div>;
    }
  };
  
  return (
    <Card className="h-full overflow-auto">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold">Data Overview</h3>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        {renderContent()}
      </div>
    </Card>
  );
};

const ScheduleOverview = ({ subType }: { subType: 'active' | 'completed' }) => {
  // Mock data for active projects
  const activeProjectsData = {
    totalCount: 28,
    serviceCall: { count: 3, percentage: 10.7 },
    scheduled: { count: 9, percentage: 32.1 },
    inProgress: { count: 12, percentage: 42.9 },
    waitingSignature: { count: 4, percentage: 14.3 },
  };
  
  // Mock data for completed projects
  const completedProjectsData = {
    totalCount: 72,
    completedWithSignature: { count: 54, percentage: 75 },
    physicalSignature: { count: 8, percentage: 11.1 },
    withoutSignature: { count: 7, percentage: 9.7 },
    cancelled: { count: 3, percentage: 4.2 },
  };
  
  // Operator performance data
  const operatorPerformance = [
    { name: 'John Smith', completedJobs: 24, onTimeRate: 96 },
    { name: 'Emily Johnson', completedJobs: 18, onTimeRate: 89 },
    { name: 'Michael Brown', completedJobs: 15, onTimeRate: 93 },
  ];
  
  // Customer activity data
  const customerActivity = [
    { name: 'Acme Corp', jobs: 12, revenue: 18500 },
    { name: 'Tech Solutions', jobs: 8, revenue: 12300 },
    { name: 'Global Enterprises', jobs: 6, revenue: 9800 },
  ];
  
  return (
    <>
      <div>
        <h4 className="text-md font-semibold mb-3">
          {subType === 'active' ? 'Active Projects' : 'Completed Projects'}
        </h4>
        
        <div className="relative mb-3">
          <div className="text-center mb-2">
            <span className="text-3xl font-bold">
              {subType === 'active' ? activeProjectsData.totalCount : completedProjectsData.totalCount}
            </span>
            <span className="text-sm text-gray-500 ml-1">total</span>
          </div>
          
          <div className="flex h-24 w-24 mx-auto mb-4">
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                {subType === 'active' ? (
                  <>
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e0e7ff"
                      strokeWidth="20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="20"
                      strokeDasharray={`${activeProjectsData.serviceCall.percentage * 2.51} 251`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="20"
                      strokeDasharray={`${activeProjectsData.scheduled.percentage * 2.51} 251`}
                      strokeDashoffset={`${-(activeProjectsData.serviceCall.percentage * 2.51)}`}
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="20"
                      strokeDasharray={`${activeProjectsData.inProgress.percentage * 2.51} 251`}
                      strokeDashoffset={`${-(activeProjectsData.serviceCall.percentage + activeProjectsData.scheduled.percentage) * 2.51}`}
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="20"
                      strokeDasharray={`${activeProjectsData.waitingSignature.percentage * 2.51} 251`}
                      strokeDashoffset={`${-(activeProjectsData.serviceCall.percentage + activeProjectsData.scheduled.percentage + activeProjectsData.inProgress.percentage) * 2.51}`}
                      transform="rotate(-90 50 50)"
                    />
                  </>
                ) : (
                  <>
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e0e7ff"
                      strokeWidth="20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#4ade80"
                      strokeWidth="20"
                      strokeDasharray={`${completedProjectsData.completedWithSignature.percentage * 2.51} 251`}
                      strokeDashoffset="0"
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="20"
                      strokeDasharray={`${completedProjectsData.physicalSignature.percentage * 2.51} 251`}
                      strokeDashoffset={`${-(completedProjectsData.completedWithSignature.percentage * 2.51)}`}
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="20"
                      strokeDasharray={`${completedProjectsData.withoutSignature.percentage * 2.51} 251`}
                      strokeDashoffset={`${-(completedProjectsData.completedWithSignature.percentage + completedProjectsData.physicalSignature.percentage) * 2.51}`}
                      transform="rotate(-90 50 50)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#f87171"
                      strokeWidth="20"
                      strokeDasharray={`${completedProjectsData.cancelled.percentage * 2.51} 251`}
                      strokeDashoffset={`${-(completedProjectsData.completedWithSignature.percentage + completedProjectsData.physicalSignature.percentage + completedProjectsData.withoutSignature.percentage) * 2.51}`}
                      transform="rotate(-90 50 50)"
                    />
                  </>
                )}
              </svg>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mt-4">
          {subType === 'active' ? (
            <>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-[#818cf8] inline-block mr-2"></span>
                  <span>Service Call (New)</span>
                </div>
                <span>{activeProjectsData.serviceCall.count}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-[#4ade80] inline-block mr-2"></span>
                  <span>Scheduled</span>
                </div>
                <span>{activeProjectsData.scheduled.count}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-[#fbbf24] inline-block mr-2"></span>
                  <span>In Progress</span>
                </div>
                <span>{activeProjectsData.inProgress.count}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-[#f87171] inline-block mr-2"></span>
                  <span>Waiting for Signature</span>
                </div>
                <span>{activeProjectsData.waitingSignature.count}</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-[#4ade80] inline-block mr-2"></span>
                  <span>Completed</span>
                </div>
                <span>{completedProjectsData.completedWithSignature.count}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-[#818cf8] inline-block mr-2"></span>
                  <span>Physical Signature</span>
                </div>
                <span>{completedProjectsData.physicalSignature.count}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-[#fbbf24] inline-block mr-2"></span>
                  <span>Without Signature</span>
                </div>
                <span>{completedProjectsData.withoutSignature.count}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-[#f87171] inline-block mr-2"></span>
                  <span>Cancelled</span>
                </div>
                <span>{completedProjectsData.cancelled.count}</span>
              </div>
            </>
          )}
        </div>
      </div>
      
      <div className="border-t pt-4">
        <h4 className="text-md font-semibold mb-3">Operator Performance</h4>
        <div className="space-y-4">
          {operatorPerformance.map((operator, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{operator.name}</span>
                <span className="font-medium">{operator.completedJobs} jobs</span>
              </div>
              <div className="flex items-center">
                <Progress value={operator.onTimeRate} className="h-1.5 flex-grow" />
                <span className="text-xs ml-2 w-8 text-right">{operator.onTimeRate}%</span>
              </div>
              <div className="text-xs text-gray-500">On-time completion rate</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t pt-4">
        <h4 className="text-md font-semibold mb-3">Top Customers</h4>
        <div className="space-y-3">
          {customerActivity.map((customer, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm">{customer.name}</span>
              <div className="text-right">
                <div className="font-medium text-sm">{customer.jobs} jobs</div>
                <div className="text-xs text-gray-500">${customer.revenue.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="border-t pt-4">
        <h4 className="text-md font-semibold mb-3">Recent Activity</h4>
        <div className="space-y-3">
          <div className="text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
              <p>Service call completed for <span className="font-medium">Acme Corp</span></p>
            </div>
            <p className="text-xs text-gray-500 ml-4">10 minutes ago</p>
          </div>
          <div className="text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
              <p>New service call scheduled for <span className="font-medium">Tech Solutions</span></p>
            </div>
            <p className="text-xs text-gray-500 ml-4">1 hour ago</p>
          </div>
          <div className="text-sm">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
              <p>Customer signature received from <span className="font-medium">Global Enterprises</span></p>
            </div>
            <p className="text-xs text-gray-500 ml-4">3 hours ago</p>
          </div>
        </div>
      </div>
    </>
  );
};

// Placeholder components for other page types
const CustomersOverview = () => (
  <div className="space-y-4">
    <div>
      <h4 className="text-md font-semibold mb-3">Customer Statistics</h4>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-3 rounded-lg">
          <div className="text-3xl font-bold text-blue-600">124</div>
          <div className="text-sm text-gray-500">Total Customers</div>
        </div>
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-3 rounded-lg">
          <div className="text-3xl font-bold text-green-600">89</div>
          <div className="text-sm text-gray-500">Active Customers</div>
        </div>
        <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 p-3 rounded-lg">
          <div className="text-3xl font-bold text-amber-600">23</div>
          <div className="text-sm text-gray-500">New This Month</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3 rounded-lg">
          <div className="text-3xl font-bold text-purple-600">12</div>
          <div className="text-sm text-gray-500">Inactive Customers</div>
        </div>
      </div>
    </div>
    
    <div className="border-t pt-4">
      <h4 className="text-md font-semibold mb-3">Revenue by Customer Type</h4>
      <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-400">Chart Placeholder</div>
      </div>
    </div>
    
    <div className="border-t pt-4">
      <h4 className="text-md font-semibold mb-3">Recent Customer Activity</h4>
      <div className="space-y-3">
        <div className="text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <p><span className="font-medium">Acme Corp</span> signed a new agreement</p>
          </div>
          <p className="text-xs text-gray-500 ml-4">2 hours ago</p>
        </div>
        <div className="text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
            <p><span className="font-medium">Tech Solutions</span> requested emergency service</p>
          </div>
          <p className="text-xs text-gray-500 ml-4">1 day ago</p>
        </div>
        <div className="text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
            <p>New customer <span className="font-medium">Global Innovations</span> added</p>
          </div>
          <p className="text-xs text-gray-500 ml-4">2 days ago</p>
        </div>
      </div>
    </div>
  </div>
);

const UsersOverview = () => (
  <div className="space-y-4">
    <div>
      <h4 className="text-md font-semibold mb-3">User Statistics</h4>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-3 rounded-lg">
          <div className="text-3xl font-bold text-blue-600">32</div>
          <div className="text-sm text-gray-500">Total Users</div>
        </div>
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-3 rounded-lg">
          <div className="text-3xl font-bold text-green-600">24</div>
          <div className="text-sm text-gray-500">Active Users</div>
        </div>
        <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 p-3 rounded-lg">
          <div className="text-3xl font-bold text-amber-600">8</div>
          <div className="text-sm text-gray-500">Admins</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3 rounded-lg">
          <div className="text-3xl font-bold text-purple-600">16</div>
          <div className="text-sm text-gray-500">Field Staff</div>
        </div>
      </div>
    </div>
    
    <div className="border-t pt-4">
      <h4 className="text-md font-semibold mb-3">User Roles Distribution</h4>
      <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-400">Chart Placeholder</div>
      </div>
    </div>
    
    <div className="border-t pt-4">
      <h4 className="text-md font-semibold mb-3">Recent User Activity</h4>
      <div className="space-y-3">
        <div className="text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <p><span className="font-medium">John Smith</span> completed 3 service calls today</p>
          </div>
          <p className="text-xs text-gray-500 ml-4">30 minutes ago</p>
        </div>
        <div className="text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
            <p><span className="font-medium">Emily Johnson</span> created 2 new agreements</p>
          </div>
          <p className="text-xs text-gray-500 ml-4">2 hours ago</p>
        </div>
        <div className="text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
            <p>New user <span className="font-medium">Michael Brown</span> added to the system</p>
          </div>
          <p className="text-xs text-gray-500 ml-4">1 day ago</p>
        </div>
      </div>
    </div>
  </div>
);

const AgreementsOverview = () => (
  <div className="space-y-4">
    <div>
      <h4 className="text-md font-semibold mb-3">Agreement Statistics</h4>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-3 rounded-lg">
          <div className="text-3xl font-bold text-blue-600">87</div>
          <div className="text-sm text-gray-500">Total Agreements</div>
        </div>
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-3 rounded-lg">
          <div className="text-3xl font-bold text-green-600">64</div>
          <div className="text-sm text-gray-500">Active Agreements</div>
        </div>
        <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 p-3 rounded-lg">
          <div className="text-3xl font-bold text-amber-600">15</div>
          <div className="text-sm text-gray-500">Pending Approval</div>
        </div>
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-3 rounded-lg">
          <div className="text-3xl font-bold text-purple-600">8</div>
          <div className="text-sm text-gray-500">Expiring Soon</div>
        </div>
      </div>
    </div>
    
    <div className="border-t pt-4">
      <h4 className="text-md font-semibold mb-3">Revenue by Agreement Type</h4>
      <div className="h-40 bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-400">Chart Placeholder</div>
      </div>
    </div>
    
    <div className="border-t pt-4">
      <h4 className="text-md font-semibold mb-3">Recent Agreement Activity</h4>
      <div className="space-y-3">
        <div className="text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
            <p>Agreement with <span className="font-medium">Acme Corp</span> has been approved</p>
          </div>
          <p className="text-xs text-gray-500 ml-4">3 hours ago</p>
        </div>
        <div className="text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
            <p>New agreement draft created for <span className="font-medium">Tech Solutions</span></p>
          </div>
          <p className="text-xs text-gray-500 ml-4">1 day ago</p>
        </div>
        <div className="text-sm">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
            <p>Agreement with <span className="font-medium">Global Enterprises</span> is expiring soon</p>
          </div>
          <p className="text-xs text-gray-500 ml-4">2 days ago</p>
        </div>
      </div>
    </div>
  </div>
);

export default DataOverviewPanel;
