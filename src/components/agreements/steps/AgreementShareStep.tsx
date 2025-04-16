
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, Copy, Download, Mail, MessageSquare, Phone, Send, Share2, Smartphone, Check, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface AgreementShareStepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  isEditing: boolean;
  onNext: () => void;
  onBack: () => void;
}

const AgreementShareStep: React.FC<AgreementShareStepProps> = ({
  formData,
  updateFormData,
  isEditing,
  onNext,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState<string>('email');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [emailAddress, setEmailAddress] = useState<string>(formData.customerDetails?.email || '');
  const [phoneNumber, setPhoneNumber] = useState<string>(formData.customerDetails?.phone || '');
  const [subject, setSubject] = useState<string>(`Price Agreement - ${formData.title || 'New Agreement'}`);
  const [message, setMessage] = useState<string>(
    `Dear ${formData.customerName || 'Customer'},\n\nWe've prepared a price agreement for you to review and sign. Please click the link below to view and sign the document.\n\nRegards,\n${formData.companyDetails?.name || 'Unidoc Inc.'}`
  );
  const [linkCopied, setLinkCopied] = useState<boolean>(false);

  const handleSendEmail = () => {
    if (!emailAddress) {
      toast.error("Email address is required");
      return;
    }
    
    setIsSending(true);
    
    setTimeout(() => {
      updateFormData('status', 'sent');
      setIsSending(false);
      toast.success("Agreement sent", {
        description: `Email sent to ${emailAddress}`
      });
    }, 1500);
  };
  
  const handleSendWhatsapp = () => {
    if (!phoneNumber) {
      toast.error("Phone number is required");
      return;
    }
    
    setIsSending(true);
    
    setTimeout(() => {
      updateFormData('status', 'sent');
      setIsSending(false);
      toast.success("Agreement sent", {
        description: `WhatsApp message sent to ${phoneNumber}`
      });
    }, 1500);
  };
  
  const handleSendInApp = () => {
    setIsSending(true);
    
    setTimeout(() => {
      updateFormData('status', 'sent');
      setIsSending(false);
      toast.success("Agreement sent", {
        description: "Agreement sent to customer's app inbox"
      });
    }, 1500);
  };
  
  const handleCopyLink = () => {
    const link = `https://app.unidoc.com/agreements/view/${formData.agreementId || 'draft'}`;
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
    
    toast.success("Link copied to clipboard", {
      description: "You can now share this link with your customer"
    });
    
    setTimeout(() => setLinkCopied(false), 3000);
  };
  
  const getStatusBadge = () => {
    const status = formData.status || 'draft';
    
    if (status === 'draft') {
      return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Draft</Badge>;
    } else if (status === 'sent') {
      return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Sent</Badge>;
    } else if (status === 'signed') {
      return <Badge className="bg-green-100 text-green-800 border-green-200">Signed</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800 border-red-200">Expired</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6 overflow-y-auto max-h-[calc(100vh-220px)]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Share Agreement</h1>
          <p className="text-sm text-gray-500 mt-1">
            Send the agreement to your customer for review and signature
          </p>
        </div>
        <div>
          {getStatusBadge()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customer Information Card */}
        <Card className="md:col-span-1 border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              Customer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">{formData.customerName || 'No customer selected'}</h3>
                <p className="text-sm text-gray-500">{formData.customerDetails?.address || 'No address provided'}</p>
              </div>
              
              <div className="space-y-1">
                {formData.customerDetails?.email && (
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{formData.customerDetails.email}</span>
                  </div>
                )}
                
                {formData.customerDetails?.phone && (
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{formData.customerDetails.phone}</span>
                  </div>
                )}
              </div>
              
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">Contact Preferences</h4>
                {formData.customerDetails?.email ? (
                  <Badge variant="outline" className="mr-2 bg-blue-50">
                    <Mail className="h-3 w-3 mr-1" /> Email
                  </Badge>
                ) : null}
                
                {formData.customerDetails?.phone ? (
                  <Badge variant="outline" className="mr-2 bg-green-50">
                    <MessageSquare className="h-3 w-3 mr-1" /> WhatsApp
                  </Badge>
                ) : null}
                
                <Badge variant="outline" className="bg-purple-50">
                  <Smartphone className="h-3 w-3 mr-1" /> In-App
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Sharing Options Card */}
        <Card className="md:col-span-2 border border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Share2 className="h-5 w-5 mr-2 text-blue-600" />
              Sharing Options
            </CardTitle>
            <CardDescription>
              Choose how you want to share this agreement with your customer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="email" className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" /> Email
                </TabsTrigger>
                <TabsTrigger value="whatsapp" className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" /> WhatsApp
                </TabsTrigger>
                <TabsTrigger value="app" className="flex items-center">
                  <Smartphone className="h-4 w-4 mr-2" /> In-App
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="customer@example.com" 
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="border-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="border-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea 
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  />
                </div>
                
                <div className="flex justify-end pt-2">
                  <Button 
                    onClick={handleSendEmail} 
                    className="bg-gradient-to-r from-blue-600 to-blue-500"
                    disabled={!emailAddress || isSending}
                  >
                    {isSending ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white"></div>
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" /> 
                        Send Email
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="whatsapp" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+1 234 567 8900" 
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border-gray-300"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="whatsappMessage">Message</Label>
                  <textarea 
                    id="whatsappMessage"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  />
                </div>
                
                <div className="flex justify-end pt-2">
                  <Button 
                    onClick={handleSendWhatsapp} 
                    className="bg-gradient-to-r from-green-600 to-green-500"
                    disabled={!phoneNumber || isSending}
                  >
                    {isSending ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white"></div>
                        Sending...
                      </div>
                    ) : (
                      <>
                        <MessageSquare className="h-4 w-4 mr-2" /> 
                        Send WhatsApp
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="app" className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700">
                  <p>The agreement will be sent to the customer's app inbox and they'll receive a notification to review and sign it.</p>
                </div>
                
                <div className="pt-2 flex justify-end">
                  <Button 
                    onClick={handleSendInApp} 
                    className="bg-gradient-to-r from-purple-600 to-purple-500"
                    disabled={isSending || !formData.customerName}
                  >
                    {isSending ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-white"></div>
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Smartphone className="h-4 w-4 mr-2" /> 
                        Send to App
                      </>
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium">Share Link</h3>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyLink}
                  className={cn(
                    "flex items-center gap-2",
                    linkCopied ? "border-green-200 text-green-700 bg-green-50" : ""
                  )}
                >
                  {linkCopied ? (
                    <>
                      <Check className="h-4 w-4" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" /> Copy Link
                    </>
                  )}
                </Button>
              </div>
              
              <div className="mt-2 bg-gray-50 border rounded p-2 text-sm font-mono text-gray-700">
                https://app.unidoc.com/agreements/view/{formData.agreementId || 'draft'}
              </div>
              
              <div className="text-xs text-gray-500 mt-2">
                Anyone with this link can view and sign the document
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button onClick={onNext} className="bg-gradient-to-r from-green-600 to-green-500">
          <Check className="mr-2 h-4 w-4" />
          Finalize Agreement
        </Button>
      </div>
    </div>
  );
};

export default AgreementShareStep;
