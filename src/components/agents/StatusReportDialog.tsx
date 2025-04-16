
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Download, 
  FileText, 
  Printer, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface StatusReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const StatusReportDialog: React.FC<StatusReportDialogProps> = ({
  isOpen,
  onClose
}) => {
  const [reportType, setReportType] = useState('document-compliance');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportFormat, setReportFormat] = useState('pdf');
  
  const handleGenerateReport = () => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      toast.success('Report generated successfully');
      // In a real app, this would trigger a download or open a new tab
    }, 1500);
  };
  
  const handleDownload = () => {
    toast.success(`Report downloaded as ${reportFormat.toUpperCase()}`);
    // In a real app, this would trigger an actual download
  };
  
  const handlePrint = () => {
    toast.success('Sending report to printer');
    // In a real app, this would open the print dialog
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <BarChart className="mr-2 h-5 w-5 text-blue-600" />
            Document Status Report
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="document-compliance">Document Compliance Report</SelectItem>
                  <SelectItem value="expiring-documents">Expiring Documents Report</SelectItem>
                  <SelectItem value="agent-documents">Agent Documents Status</SelectItem>
                  <SelectItem value="verification-status">Verification Status Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="report-format">Format</Label>
              <Select value={reportFormat} onValueChange={setReportFormat}>
                <SelectTrigger id="report-format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="xlsx">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="bg-white border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b">
              <h3 className="font-medium">Report Preview</h3>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Document Compliance Report</h2>
                <div className="text-sm text-gray-500">{new Date().toLocaleDateString()}</div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                  <div className="flex items-center mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                    <h4 className="font-medium">Compliant</h4>
                  </div>
                  <div className="text-2xl font-bold text-green-700">18</div>
                </div>
                
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <div className="flex items-center mb-2">
                    <Clock className="h-5 w-5 text-amber-600 mr-2" />
                    <h4 className="font-medium">Pending</h4>
                  </div>
                  <div className="text-2xl font-bold text-amber-700">5</div>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                  <div className="flex items-center mb-2">
                    <XCircle className="h-5 w-5 text-red-600 mr-2" />
                    <h4 className="font-medium">Non-Compliant</h4>
                  </div>
                  <div className="text-2xl font-bold text-red-700">2</div>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
                    <h4 className="font-medium">Expiring Soon</h4>
                  </div>
                  <div className="text-2xl font-bold text-orange-700">3</div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="font-medium text-lg mb-4">Document Status by Type</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left">Document Type</th>
                        <th className="px-4 py-3 text-center">Compliant</th>
                        <th className="px-4 py-3 text-center">Pending</th>
                        <th className="px-4 py-3 text-center">Non-Compliant</th>
                        <th className="px-4 py-3 text-center">Expiring Soon</th>
                        <th className="px-4 py-3 text-right">Compliance Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { 
                          type: 'Agent Agreement', 
                          compliant: 18, 
                          pending: 4, 
                          nonCompliant: 0, 
                          expiring: 3, 
                          rate: '82%' 
                        },
                        { 
                          type: 'Tax Registration', 
                          compliant: 22, 
                          pending: 3, 
                          nonCompliant: 0, 
                          expiring: 0, 
                          rate: '88%' 
                        },
                        { 
                          type: 'Identity Verification', 
                          compliant: 25, 
                          pending: 0, 
                          nonCompliant: 0, 
                          expiring: 0, 
                          rate: '100%' 
                        },
                        { 
                          type: 'Business License', 
                          compliant: 3, 
                          pending: 2, 
                          nonCompliant: 0, 
                          expiring: 0, 
                          rate: '60%' 
                        },
                        { 
                          type: 'Insurance Verification', 
                          compliant: 18, 
                          pending: 5, 
                          nonCompliant: 2, 
                          expiring: 0, 
                          rate: '72%' 
                        }
                      ].map((row, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-3 font-medium">{row.type}</td>
                          <td className="px-4 py-3 text-center text-green-700">{row.compliant}</td>
                          <td className="px-4 py-3 text-center text-amber-700">{row.pending}</td>
                          <td className="px-4 py-3 text-center text-red-700">{row.nonCompliant}</td>
                          <td className="px-4 py-3 text-center text-orange-700">{row.expiring}</td>
                          <td className="px-4 py-3 text-right font-medium">{row.rate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    {
                      action: 'Document verified',
                      document: 'Identity Verification - John Smith',
                      date: '2023-12-01T10:30:00',
                      user: 'Sarah Miller'
                    },
                    {
                      action: 'Document uploaded',
                      document: 'Insurance Certificate - Tel Aviv Branch',
                      date: '2023-12-01T09:15:00',
                      user: 'David Cohen'
                    },
                    {
                      action: 'Document rejected',
                      document: 'Business License - Haifa Branch',
                      date: '2023-11-30T16:45:00',
                      user: 'Rachel Green'
                    }
                  ].map((entry, index) => (
                    <div key={index} className="border-b pb-3">
                      <div className="font-medium">{entry.action}: {entry.document}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(entry.date).toLocaleString()} by {entry.user}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={isGenerating}>
            Close
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handlePrint}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
            <Button 
              variant="outline" 
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button 
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              {isGenerating ? 'Generating...' : (
                <>
                  <FileText className="h-4 w-4" />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatusReportDialog;
