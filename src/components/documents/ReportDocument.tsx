
import React from 'react';
import { format } from 'date-fns';
import {
  BarChart2,
  Calendar,
  Clock,
  FileText,
  Printer,
  Download,
  Share2,
  Building2,
  Hash,
  User,
  FileSpreadsheet,
  ChevronUp,
  ChevronDown,
  FileArchive,
  PieChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface ReportDocumentProps {
  report: any;
  documentNumber: string;
  isPreview?: boolean;
  onClose?: () => void;
  onPrint?: () => void;
  onDownload?: () => void;
  onShare?: () => void;
}

const ReportDocument: React.FC<ReportDocumentProps> = ({
  report,
  documentNumber,
  isPreview = false,
  onClose,
  onPrint,
  onDownload,
  onShare
}) => {
  const [expandedSections, setExpandedSections] = React.useState<Record<string, boolean>>({
    summary: true,
    details: false,
    analytics: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  // Simulated report data
  const reportData = {
    title: report.title || 'Monthly Service Report',
    date: report.date || new Date().toISOString(),
    customer: report.customerName || 'Customer Name',
    period: report.period || 'January 2023',
    totalServices: report.totalServices || 15,
    completedServices: report.completedServices || 12,
    pendingServices: report.pendingServices || 3,
    totalHours: report.totalHours || 45,
    totalAmount: report.totalAmount || 5250,
    serviceTypes: report.serviceTypes || [
      { name: 'Concrete Pumping', count: 8, hours: 24 },
      { name: 'Transportation', count: 4, hours: 16 },
      { name: 'Other Services', count: 3, hours: 5 }
    ]
  };

  return (
    <div className={cn(
      "relative bg-white rounded-lg overflow-hidden pb-6", 
      isPreview ? "border border-gray-200" : "shadow-lg"
    )}>
      {/* Document header with fancy background */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-100 border-b border-indigo-200 py-6 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 opacity-20 rounded-full -mt-10 -mr-10"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200 opacity-20 rounded-full -mb-10 -ml-10"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <FileArchive className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-indigo-800">{reportData.title}</h2>
                <div className="flex items-center gap-1 mt-1 text-indigo-700">
                  <Hash className="h-3.5 w-3.5" />
                  <span className="text-sm font-medium">{documentNumber}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-200 hover:bg-indigo-100 mb-2">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <div className="text-sm text-indigo-700 font-medium">
              {formatDate(reportData.date)}
            </div>
          </div>
        </div>
      </div>

      {/* Report summary */}
      <div className="px-6 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg flex items-center">
            <FileText className="h-5 w-5 text-indigo-600 mr-2" />
            Report Summary
          </h3>
          <button 
            onClick={() => toggleSection('summary')}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            {expandedSections.summary ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>

        {expandedSections.summary && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-start">
                  <div className="bg-white p-1.5 rounded-md shadow-sm border border-gray-100">
                    <Building2 className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">Customer</h3>
                    <p className="text-lg font-semibold">{reportData.customer}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <div className="flex items-start">
                  <div className="bg-white p-1.5 rounded-md shadow-sm border border-gray-100">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-500">Reporting Period</h3>
                    <p className="text-lg font-semibold">{reportData.period}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-indigo-50 rounded-lg border border-indigo-100 p-3 text-center">
                <p className="text-xs font-medium text-indigo-700 mb-1">Total Services</p>
                <p className="text-2xl font-bold text-indigo-800">{reportData.totalServices}</p>
              </div>
              
              <div className="bg-green-50 rounded-lg border border-green-100 p-3 text-center">
                <p className="text-xs font-medium text-green-700 mb-1">Completed</p>
                <p className="text-2xl font-bold text-green-800">{reportData.completedServices}</p>
              </div>
              
              <div className="bg-amber-50 rounded-lg border border-amber-100 p-3 text-center">
                <p className="text-xs font-medium text-amber-700 mb-1">Pending</p>
                <p className="text-2xl font-bold text-amber-800">{reportData.pendingServices}</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg border border-blue-100 p-3 text-center">
                <p className="text-xs font-medium text-blue-700 mb-1">Total Hours</p>
                <p className="text-2xl font-bold text-blue-800">{reportData.totalHours}</p>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex justify-between mb-2">
                <h4 className="font-medium text-gray-700">Revenue Overview</h4>
                <p className="font-bold text-green-700">${reportData.totalAmount.toLocaleString()}</p>
              </div>
              <div className="h-8 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500" style={{ width: '80%' }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">80% of monthly target</p>
            </div>
          </div>
        )}
        
        <Separator className="my-6" />
        
        {/* Service Details */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg flex items-center">
            <BarChart2 className="h-5 w-5 text-indigo-600 mr-2" />
            Service Details
          </h3>
          <button 
            onClick={() => toggleSection('details')}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            {expandedSections.details ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
        
        {expandedSections.details && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service Type
                    </th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Count
                    </th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hours
                    </th>
                    <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      % of Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportData.serviceTypes.map((type, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {type.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-center">
                        {type.count}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-center">
                        {type.hours}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700 text-right">
                        {Math.round((type.count / reportData.totalServices) * 100)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <th scope="row" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="row" className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                      {reportData.totalServices}
                    </th>
                    <th scope="row" className="px-4 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                      {reportData.totalHours}
                    </th>
                    <th scope="row" className="px-4 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                      100%
                    </th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
        
        <Separator className="my-6" />
        
        {/* Analytics Visualization */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg flex items-center">
            <PieChart className="h-5 w-5 text-indigo-600 mr-2" />
            Analytics Visualization
          </h3>
          <button 
            onClick={() => toggleSection('analytics')}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            {expandedSections.analytics ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
        
        {expandedSections.analytics && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <div className="h-64 flex items-center justify-center">
                <div className="relative h-48 w-48">
                  {/* Simulated pie chart */}
                  <div className="absolute inset-0 rounded-full border-8 border-indigo-500 border-r-blue-500 border-b-emerald-500"></div>
                  <div className="absolute inset-6 rounded-full border-8 border-indigo-400 border-r-blue-400 border-b-emerald-400"></div>
                  <div className="absolute inset-12 rounded-full border-8 border-indigo-300 border-r-blue-300 border-b-emerald-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-700">Service Distribution</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-indigo-500 rounded-full mr-1"></span>
                  <span className="text-xs text-gray-600">Concrete Pumping</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                  <span className="text-xs text-gray-600">Transportation</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-emerald-500 rounded-full mr-1"></span>
                  <span className="text-xs text-gray-600">Other</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Monthly Trend</h4>
                <div className="h-32 flex items-end space-x-2 pt-4">
                  {/* Simulated bar chart */}
                  <div className="flex-1 bg-indigo-100 hover:bg-indigo-200 transition-colors relative" style={{ height: '40%' }}>
                    <div className="absolute -top-4 w-full text-center text-xs text-gray-600">Jan</div>
                  </div>
                  <div className="flex-1 bg-indigo-200 hover:bg-indigo-300 transition-colors relative" style={{ height: '55%' }}>
                    <div className="absolute -top-4 w-full text-center text-xs text-gray-600">Feb</div>
                  </div>
                  <div className="flex-1 bg-indigo-300 hover:bg-indigo-400 transition-colors relative" style={{ height: '70%' }}>
                    <div className="absolute -top-4 w-full text-center text-xs text-gray-600">Mar</div>
                  </div>
                  <div className="flex-1 bg-indigo-400 hover:bg-indigo-500 transition-colors relative" style={{ height: '85%' }}>
                    <div className="absolute -top-4 w-full text-center text-xs text-gray-600">Apr</div>
                  </div>
                  <div className="flex-1 bg-indigo-500 hover:bg-indigo-600 transition-colors relative" style={{ height: '100%' }}>
                    <div className="absolute -top-4 w-full text-center text-xs text-gray-600">May</div>
                  </div>
                  <div className="flex-1 bg-indigo-600 hover:bg-indigo-700 transition-colors relative" style={{ height: '90%' }}>
                    <div className="absolute -top-4 w-full text-center text-xs text-gray-600">Jun</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 text-center mt-2">Monthly Service Count</div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Completion Rate</h4>
                <div className="flex flex-col items-center justify-center h-32">
                  <div className="relative w-28 h-28">
                    {/* Simulated circular progress */}
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle
                        className="text-gray-200"
                        strokeWidth="10"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-indigo-500"
                        strokeWidth="10"
                        strokeDasharray="251.2"
                        strokeDashoffset="50.24"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                        style={{ transformOrigin: 'center', transform: 'rotate(-90deg)' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xl font-bold text-gray-800">80%</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">Service Completion Rate</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {!isPreview && (
        <div className="flex justify-end space-x-2 px-6 mt-8">
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
          {onPrint && (
            <Button variant="outline" onClick={onPrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          )}
          {onDownload && (
            <Button onClick={onDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          )}
        </div>
      )}
      
      {/* Document footer */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-400 via-purple-500 to-indigo-600"></div>
      
      {/* Watermark */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] -rotate-12">
        <div className="text-6xl font-bold text-gray-900">UNIDOC REPORT</div>
      </div>
    </div>
  );
};

export default ReportDocument;
