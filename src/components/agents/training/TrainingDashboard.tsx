
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Progress 
} from '@/components/ui/progress';
import { 
  Badge 
} from '@/components/ui/badge';
import { 
  Button 
} from '@/components/ui/button';
import {
  GraduationCap,
  BookOpen,
  CheckCircle,
  Clock,
  Calendar,
  Award,
  FileText,
  BarChart,
  User,
  Users,
  Play,
  Video,
  ListChecks,
  BarChart2,
  ArrowRight,
  CheckSquare,
  PlusCircle
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import TrainingScheduleDialog from '../TrainingScheduleDialog';
import CourseDetailDialog from './CourseDetailDialog';
import { toast } from 'sonner';

// Define course data structure
const courses = [
  {
    id: 'unidoc-foundations',
    title: 'Unidoc Foundations',
    category: 'Required',
    description: 'Essential training for all agents covering platform basics, documentation, and customer standards.',
    progress: 100,
    status: 'completed',
    completionDate: '2023-12-15',
    modules: 4,
    duration: '4 hours',
    assignedAgents: 25,
    completionRate: 100,
    certification: 'Basic Certification',
    image: '/placeholder.svg'
  },
  {
    id: 'digital-certificate',
    title: 'Digital Certificate Mastery',
    category: 'Required',
    description: 'Learn all aspects of managing digital certificates, verification, and handling signatures.',
    progress: 85,
    status: 'in-progress',
    completionDate: null,
    modules: 4,
    duration: '5 hours',
    assignedAgents: 25,
    completionRate: 68,
    certification: 'Certificate Specialist',
    image: '/placeholder.svg'
  },
  {
    id: 'customer-success',
    title: 'Customer Success Strategies',
    category: 'Required',
    description: 'Develop skills to ensure customer satisfaction, retention, and effective communication.',
    progress: 60,
    status: 'in-progress',
    completionDate: null,
    modules: 4,
    duration: '6 hours',
    assignedAgents: 25,
    completionRate: 55,
    certification: 'Customer Success Certification',
    image: '/placeholder.svg'
  },
  {
    id: 'advanced-sales',
    title: 'Advanced Sales Techniques',
    category: 'Specialized',
    description: 'Master consultative selling, negotiation, and advanced closing techniques.',
    progress: 0,
    status: 'not-started',
    completionDate: null,
    modules: 4,
    duration: '8 hours',
    assignedAgents: 10,
    completionRate: 20,
    certification: 'Sales Expert Certification',
    image: '/placeholder.svg'
  },
  {
    id: 'regional-compliance',
    title: 'Regional Compliance',
    category: 'Specialized',
    description: 'Understand local regulations, documentation requirements, and compliance protocols.',
    progress: 0,
    status: 'not-started',
    completionDate: null,
    modules: 4,
    duration: '4 hours',
    assignedAgents: 15,
    completionRate: 33,
    certification: 'Compliance Certification',
    image: '/placeholder.svg'
  }
];

// Define upcoming training sessions
const upcomingTrainings = [
  {
    id: 't1',
    title: 'Digital Certificate Mastery Session',
    date: '2024-06-15',
    time: '10:00 AM - 12:00 PM',
    instructor: 'David Cohen',
    location: 'Online (Zoom)',
    attendees: 12,
    maxAttendees: 20,
    type: 'Workshop'
  },
  {
    id: 't2',
    title: 'Customer Success Best Practices',
    date: '2024-06-18',
    time: '2:00 PM - 4:00 PM',
    instructor: 'Sarah Miller',
    location: 'Main Office - Training Room A',
    attendees: 8,
    maxAttendees: 15,
    type: 'Hands-on Training'
  },
  {
    id: 't3',
    title: 'Regional Compliance Update',
    date: '2024-06-22',
    time: '11:00 AM - 12:30 PM',
    instructor: 'Michael Ben',
    location: 'Online (Teams)',
    attendees: 25,
    maxAttendees: 30,
    type: 'Webinar'
  }
];

// Define certifications
const certifications = [
  {
    id: 'cert1',
    title: 'Unidoc Basic Certification',
    issueDate: '2023-12-20',
    expiryDate: '2024-12-20',
    status: 'active',
    level: 'Foundation',
    recipients: 25
  },
  {
    id: 'cert2',
    title: 'Certificate Specialist',
    issueDate: null,
    expiryDate: null,
    status: 'in-progress',
    level: 'Intermediate',
    recipients: 17
  },
  {
    id: 'cert3',
    title: 'Customer Success Certification',
    issueDate: null,
    expiryDate: null,
    status: 'in-progress',
    level: 'Intermediate',
    recipients: 13
  },
  {
    id: 'cert4',
    title: 'Sales Expert Certification',
    issueDate: null,
    expiryDate: null,
    status: 'not-started',
    level: 'Advanced',
    recipients: 2
  },
  {
    id: 'cert5',
    title: 'Compliance Certification',
    issueDate: null,
    expiryDate: null,
    status: 'not-started',
    level: 'Advanced',
    recipients: 5
  }
];

const TrainingDashboard = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [isTrainingScheduleOpen, setIsTrainingScheduleOpen] = useState(false);
  const [isCourseDetailOpen, setIsCourseDetailOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  
  const handleOpenCourseDetail = (course: any) => {
    setSelectedCourse(course);
    setIsCourseDetailOpen(true);
  };
  
  const handleScheduleTraining = () => {
    setIsTrainingScheduleOpen(true);
  };
  
  const handleViewCertificateDetails = (certId: string) => {
    toast.success("Certificate details opened", {
      description: `You're viewing certificate ID: ${certId}`
    });
  };
  
  const handleRegisterForTraining = (trainingId: string) => {
    toast.success("Registration successful", {
      description: `You've registered for training: ${trainingId}`
    });
  };
  
  const handleViewTrainingDetails = (trainingId: string) => {
    toast.info("Training details", {
      description: `Viewing details for training ID: ${trainingId}`
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 border-green-200 rounded-full">Completed</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200 rounded-full">In Progress</Badge>;
      case 'not-started':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200 rounded-full">Not Started</Badge>;
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-200 rounded-full">Active</Badge>;
      default:
        return <Badge variant="outline" className="rounded-full">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6 overflow-hidden">
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <GraduationCap className="h-5 w-5 mr-2 text-blue-600" />
            Training & Certification Center
          </h2>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => window.open('/agents/onboarding/reports', '_blank')}
            >
              <BarChart className="h-4 w-4" />
              Training Reports
            </Button>
            <Button 
              className="flex items-center gap-2"
              onClick={handleScheduleTraining}
            >
              <Calendar className="h-4 w-4 mr-1" />
              Schedule Training
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md mb-6 bg-white border border-gray-200 p-1 shadow-sm rounded-xl overflow-hidden">
            <TabsTrigger 
              value="courses" 
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Training Courses
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Training Calendar
            </TabsTrigger>
            <TabsTrigger 
              value="certifications" 
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white transition-all duration-300"
            >
              <Award className="h-4 w-4 mr-2" />
              Certifications
            </TabsTrigger>
          </TabsList>
          
          <ScrollArea className="h-[calc(100vh-250px)]">
            <TabsContent value="courses" className="mt-0 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {courses.map((course) => (
                  <Card key={course.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100">
                          {course.category}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pb-2">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm text-gray-500">Progress</span>
                            <span className="text-sm font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        
                        <div className="flex justify-between items-center text-sm">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-1 text-gray-500" />
                            <span>{course.modules} Modules</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-gray-500" />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="text-sm">{course.assignedAgents} Agents</span>
                          </div>
                          {getStatusBadge(course.status)}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-2">
                      <Button 
                        variant={course.status === 'not-started' ? 'default' : 'outline'} 
                        className="w-full justify-center"
                        onClick={() => handleOpenCourseDetail(course)}
                      >
                        {course.status === 'not-started' ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Course
                          </>
                        ) : course.status === 'completed' ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            View Certificate
                          </>
                        ) : (
                          <>
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Continue Course
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="calendar" className="mt-0 animate-fade-in">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <div className="flex items-center text-blue-800 mb-2">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  <h3 className="font-medium">Upcoming Training Sessions</h3>
                </div>
                <p className="text-blue-700 text-sm">
                  View and register for upcoming training sessions. All sessions include materials and resources that will be available after completion.
                </p>
              </div>
              
              <div className="space-y-4">
                {upcomingTrainings.map((training) => (
                  <Card key={training.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{training.title}</CardTitle>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-100">
                          {training.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{training.date}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{training.time}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center text-sm">
                            <User className="h-4 w-4 mr-2 text-gray-500" />
                            <span>Instructor: {training.instructor}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-2 text-gray-500" />
                            <span>{training.attendees}/{training.maxAttendees} Registered</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-3 border-t">
                        <div className="flex items-center text-sm">
                          <Video className="h-4 w-4 mr-2 text-gray-500" />
                          <span>Location: {training.location}</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between">
                      <Button 
                        variant="outline"
                        onClick={() => handleViewTrainingDetails(training.id)}
                      >
                        View Details
                      </Button>
                      <Button
                        onClick={() => handleRegisterForTraining(training.id)}
                      >
                        Register
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
                
                <div className="flex justify-center pt-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2"
                    onClick={handleScheduleTraining}
                  >
                    <PlusCircle className="h-4 w-4" />
                    Schedule New Training
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="certifications" className="mt-0 animate-fade-in pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Award className="h-5 w-5 mr-2 text-amber-500" />
                      Certification Status
                    </CardTitle>
                    <CardDescription>
                      Current certification status for all agent training programs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span>Foundation Level</span>
                          <span className="font-medium">100%</span>
                        </div>
                        <Progress value={100} className="h-2 bg-gray-100" indicatorClassName="bg-green-500" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span>Intermediate Level</span>
                          <span className="font-medium">60%</span>
                        </div>
                        <Progress value={60} className="h-2 bg-gray-100" indicatorClassName="bg-blue-500" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span>Advanced Level</span>
                          <span className="font-medium">15%</span>
                        </div>
                        <Progress value={15} className="h-2 bg-gray-100" indicatorClassName="bg-purple-500" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span>Expert Level</span>
                          <span className="font-medium">5%</span>
                        </div>
                        <Progress value={5} className="h-2 bg-gray-100" indicatorClassName="bg-indigo-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <BarChart2 className="h-5 w-5 mr-2 text-blue-600" />
                      Certification Overview
                    </CardTitle>
                    <CardDescription>
                      Distribution of certifications across your team
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <CheckSquare className="h-5 w-5 text-green-600 mr-3" />
                          <div>
                            <div className="font-medium">Active Certifications</div>
                            <div className="text-sm text-gray-500">Valid and current</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-green-600">25</div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-amber-600 mr-3" />
                          <div>
                            <div className="font-medium">In Progress</div>
                            <div className="text-sm text-gray-500">Working toward certification</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-amber-600">18</div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-red-600 mr-3" />
                          <div>
                            <div className="font-medium">Expiring Soon</div>
                            <div className="text-sm text-gray-500">Within 30 days</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-red-600">3</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="overflow-x-auto">
                <ScrollArea className="h-[400px]">
                  <div className="min-w-[800px]">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs uppercase bg-gray-50 rounded-lg sticky top-0 z-10">
                        <tr>
                          <th className="px-6 py-3">Certification Name</th>
                          <th className="px-6 py-3">Level</th>
                          <th className="px-6 py-3">Status</th>
                          <th className="px-6 py-3">Issue Date</th>
                          <th className="px-6 py-3">Expiry Date</th>
                          <th className="px-6 py-3">Recipients</th>
                          <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {certifications.map((cert) => (
                          <tr key={cert.id} className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium">{cert.title}</td>
                            <td className="px-6 py-4">{cert.level}</td>
                            <td className="px-6 py-4">
                              {getStatusBadge(cert.status)}
                            </td>
                            <td className="px-6 py-4">{cert.issueDate || '-'}</td>
                            <td className="px-6 py-4">{cert.expiryDate || '-'}</td>
                            <td className="px-6 py-4">{cert.recipients}</td>
                            <td className="px-6 py-4 text-right">
                              <Button 
                                size="sm" 
                                variant={cert.status === 'active' ? 'default' : 'outline'}
                                onClick={() => {
                                  if (cert.status === 'active') {
                                    toast.success("Certification details downloaded");
                                  } else {
                                    handleViewCertificateDetails(cert.id);
                                  }
                                }}
                              >
                                {cert.status === 'active' ? 'Download' : 'View Requirements'}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
      
      {/* Training Schedule Dialog */}
      {isTrainingScheduleOpen && (
        <TrainingScheduleDialog
          isOpen={isTrainingScheduleOpen}
          onClose={() => setIsTrainingScheduleOpen(false)}
        />
      )}
      
      {/* Course Detail Dialog */}
      {isCourseDetailOpen && selectedCourse && (
        <CourseDetailDialog
          isOpen={isCourseDetailOpen}
          onClose={() => setIsCourseDetailOpen(false)}
          course={selectedCourse}
        />
      )}
    </div>
  );
};

export default TrainingDashboard;
