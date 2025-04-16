import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  CheckCircle, 
  Clock, 
  FileText, 
  Link as LinkIcon, 
  Play, 
  PlusCircle, 
  Users,
  CheckSquare,
  Award,
  Download,
  Eye,
  FolderOpen,
  ArrowLeft
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

const CourseDetailDialog = ({ 
  isOpen, 
  onClose, 
  course 
}: { 
  isOpen: boolean;
  onClose: () => void;
  course: any;
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  
  const modules = [
    {
      id: 'module-1',
      title: course?.id === 'unidoc-foundations' ? 'Platform Introduction' :
             course?.id === 'digital-certificate' ? 'Certificate Types and Applications' :
             course?.id === 'customer-success' ? 'Customer Psychology' :
             course?.id === 'advanced-sales' ? 'Consultative Selling Approach' :
             'Local Regulations Overview',
      lessons: [
        { 
          id: 'lesson-1-1', 
          title: 'Course Introduction and Objectives', 
          duration: '10 mins',
          type: 'video',
          completed: course?.progress > 25,
          documents: [
            { name: 'Course Syllabus', type: 'pdf', size: '1.2 MB' },
            { name: 'Learning Objectives', type: 'docx', size: '542 KB' }
          ]
        },
        { 
          id: 'lesson-1-2', 
          title: 'System Overview', 
          duration: '15 mins',
          type: 'reading',
          completed: course?.progress > 20,
          documents: [
            { name: 'System Architecture', type: 'pdf', size: '3.5 MB' },
            { name: 'Platform Components', type: 'pdf', size: '2.1 MB' },
            { name: 'Navigation Guide', type: 'pdf', size: '1.8 MB' }
          ]
        },
        { 
          id: 'lesson-1-3', 
          title: 'Navigation Basics', 
          duration: '20 mins',
          type: 'interactive',
          completed: course?.progress > 15,
          documents: [
            { name: 'Interface Walkthrough', type: 'pdf', size: '4.2 MB' },
            { name: 'Navigation Exercise', type: 'xlsx', size: '1.3 MB' }
          ]
        },
        { 
          id: 'lesson-1-4', 
          title: 'Knowledge Check', 
          duration: '10 mins',
          type: 'quiz',
          completed: course?.progress > 10,
          documents: [
            { name: 'Practice Questions', type: 'pdf', size: '890 KB' },
            { name: 'Study Guide', type: 'pdf', size: '1.7 MB' }
          ]
        },
      ],
      progress: course?.progress > 25 ? 100 : 
                course?.progress > 20 ? 75 : 
                course?.progress > 15 ? 50 : 
                course?.progress > 10 ? 25 : 0
    },
    {
      id: 'module-2',
      title: course?.id === 'unidoc-foundations' ? 'Digital Documentation Essentials' :
             course?.id === 'digital-certificate' ? 'Verification Procedures' :
             course?.id === 'customer-success' ? 'Needs Assessment Techniques' :
             course?.id === 'advanced-sales' ? 'Negotiation Strategies' :
             'Documentation Requirements',
      lessons: [
        { 
          id: 'lesson-2-1', 
          title: 'Document Types and Uses', 
          duration: '20 mins',
          type: 'video',
          completed: course?.progress > 50,
          documents: [
            { name: 'Document Classification Guide', type: 'pdf', size: '2.5 MB' },
            { name: 'Use Case Examples', type: 'pptx', size: '5.8 MB' }
          ]
        },
        { 
          id: 'lesson-2-2', 
          title: 'Digital Forms Best Practices', 
          duration: '15 mins',
          type: 'reading',
          completed: course?.progress > 45,
          documents: [
            { name: 'Form Design Principles', type: 'pdf', size: '3.2 MB' },
            { name: 'Field Validation Rules', type: 'pdf', size: '1.4 MB' },
            { name: 'Accessibility Guidelines', type: 'pdf', size: '2.3 MB' }
          ]
        },
        { 
          id: 'lesson-2-3', 
          title: 'Document Lifecycle', 
          duration: '25 mins',
          type: 'interactive',
          completed: course?.progress > 40,
          documents: [
            { name: 'Lifecycle Diagram', type: 'pdf', size: '1.9 MB' },
            { name: 'Status Transition Matrix', type: 'xlsx', size: '1.1 MB' }
          ]
        },
        { 
          id: 'lesson-2-4', 
          title: 'Module Assessment', 
          duration: '15 mins',
          type: 'quiz',
          completed: course?.progress > 35,
          documents: [
            { name: 'Assessment Criteria', type: 'pdf', size: '780 KB' },
            { name: 'Practice Assessment', type: 'pdf', size: '1.5 MB' }
          ]
        },
      ],
      progress: course?.progress > 50 ? 100 : 
                course?.progress > 45 ? 75 : 
                course?.progress > 40 ? 50 : 
                course?.progress > 35 ? 25 : 0
    },
    {
      id: 'module-3',
      title: course?.id === 'unidoc-foundations' ? 'Customer Communication Standards' :
             course?.id === 'digital-certificate' ? 'Digital Signature Collection' :
             course?.id === 'customer-success' ? 'Solution Presentation' :
             course?.id === 'advanced-sales' ? 'Handling Objections' :
             'Risk Management',
      lessons: [
        { 
          id: 'lesson-3-1', 
          title: 'Professional Communication', 
          duration: '15 mins',
          type: 'video',
          completed: course?.progress > 75,
          documents: [
            { name: 'Communication Templates', type: 'docx', size: '1.3 MB' },
            { name: 'Customer Interaction Scripts', type: 'pdf', size: '2.4 MB' }
          ]
        },
        { 
          id: 'lesson-3-2', 
          title: 'Customer Interaction Guidelines', 
          duration: '20 mins',
          type: 'reading',
          completed: course?.progress > 70,
          documents: [
            { name: 'Interaction Framework', type: 'pdf', size: '2.7 MB' },
            { name: 'Conflict Resolution Guide', type: 'pdf', size: '1.9 MB' }
          ]
        },
        { 
          id: 'lesson-3-3', 
          title: 'Communication Scenarios', 
          duration: '30 mins',
          type: 'interactive',
          completed: course?.progress > 65,
          documents: [
            { name: 'Scenario Playbooks', type: 'pdf', size: '4.3 MB' },
            { name: 'Response Templates', type: 'docx', size: '1.8 MB' }
          ]
        },
        { 
          id: 'lesson-3-4', 
          title: 'Skills Assessment', 
          duration: '15 mins',
          type: 'quiz',
          completed: course?.progress > 60,
          documents: [
            { name: 'Assessment Guidelines', type: 'pdf', size: '950 KB' },
            { name: 'Practice Scenarios', type: 'pdf', size: '2.1 MB' }
          ]
        },
      ],
      progress: course?.progress > 75 ? 100 : 
                course?.progress > 70 ? 75 : 
                course?.progress > 65 ? 50 : 
                course?.progress > 60 ? 25 : 0
    },
    {
      id: 'module-4',
      title: course?.id === 'unidoc-foundations' ? 'Compliance Fundamentals' :
             course?.id === 'digital-certificate' ? 'Dispute Resolution Protocols' :
             course?.id === 'customer-success' ? 'Relationship Maintenance' :
             course?.id === 'advanced-sales' ? 'Closing Techniques' :
             'Compliance Updates Process',
      lessons: [
        { 
          id: 'lesson-4-1', 
          title: 'Regulatory Framework', 
          duration: '25 mins',
          type: 'video',
          completed: course?.progress > 99,
          documents: [
            { name: 'Regulatory Overview', type: 'pdf', size: '3.8 MB' },
            { name: 'Compliance Checklist', type: 'pdf', size: '1.2 MB' }
          ]
        },
        { 
          id: 'lesson-4-2', 
          title: 'Compliance Requirements', 
          duration: '20 mins',
          type: 'reading',
          completed: course?.progress > 95,
          documents: [
            { name: 'Requirements Documentation', type: 'pdf', size: '4.5 MB' },
            { name: 'Audit Preparation Guide', type: 'docx', size: '2.3 MB' }
          ]
        },
        { 
          id: 'lesson-4-3', 
          title: 'Common Compliance Issues', 
          duration: '20 mins',
          type: 'interactive',
          completed: course?.progress > 90,
          documents: [
            { name: 'Case Studies', type: 'pdf', size: '3.1 MB' },
            { name: 'Resolution Framework', type: 'pdf', size: '1.7 MB' }
          ]
        },
        { 
          id: 'lesson-4-4', 
          title: 'Final Certification Exam', 
          duration: '30 mins',
          type: 'quiz',
          completed: course?.progress > 85,
          documents: [
            { name: 'Exam Preparation Guide', type: 'pdf', size: '2.6 MB' },
            { name: 'Practice Exam', type: 'pdf', size: '3.5 MB' }
          ]
        },
      ],
      progress: course?.progress > 99 ? 100 : 
                course?.progress > 95 ? 75 : 
                course?.progress > 90 ? 50 : 
                course?.progress > 85 ? 25 : 0
    }
  ];
  
  const handleModuleClick = (moduleId: string) => {
    setActiveModule(moduleId);
    setSelectedLesson(null);
  };
  
  const handleLessonClick = (lesson: any) => {
    setSelectedLesson(lesson.id);
    
    if (lesson.completed) {
      toast.info("Lesson completed", {
        description: `You've already completed this lesson`
      });
    } else {
      toast.success("Lesson started", {
        description: `Starting lesson: ${lesson.title}`
      });
    }
  };
  
  const handleDocumentClick = (document: any) => {
    toast.success("Document accessed", {
      description: `Opening ${document.name} (${document.size})`
    });
  };
  
  const handleDownloadDocument = (document: any) => {
    toast.success("Document downloaded", {
      description: `Downloaded ${document.name} (${document.size})`
    });
  };
  
  const handleStartCourse = () => {
    if (course?.status === 'not-started') {
      toast.success("Course started", {
        description: `You've started ${course?.title}`
      });
    } else if (course?.status === 'completed') {
      toast.success("Certificate viewed", {
        description: `Viewing certificate for ${course?.title}`
      });
    } else {
      toast.success("Course resumed", {
        description: `You've resumed ${course?.title}`
      });
    }
  };
  
  const getSelectedModule = () => {
    return modules.find(m => m.id === activeModule);
  };
  
  const getSelectedLesson = () => {
    const module = getSelectedModule();
    if (!module || !selectedLesson) return null;
    return module.lessons.find(l => l.id === selectedLesson);
  };
  
  const handleBackToModules = () => {
    setActiveModule(null);
    setSelectedLesson(null);
  };
  
  const renderModuleNavigation = () => {
    return (
      <div className="bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
        <div className="px-4 py-3 bg-blue-50 border-b border-blue-100">
          <h3 className="font-medium text-blue-800">Course Modules</h3>
        </div>
        
        <ScrollArea className="h-[calc(65vh-120px)]">
          <div className="p-2">
            {modules.map((module, index) => (
              <div 
                key={module.id}
                className={`mb-2 rounded-lg border transition-all ${activeModule === module.id ? 'border-blue-300 bg-blue-50' : 'border-gray-200 hover:border-blue-200'}`}
              >
                <div 
                  className="p-3 cursor-pointer"
                  onClick={() => handleModuleClick(module.id)}
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center mr-3 text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{module.title}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span>{module.lessons.length} lessons</span>
                        <span className="mx-1">•</span>
                        <span>{module.progress}% complete</span>
                      </div>
                    </div>
                    {module.progress === 100 && (
                      <CheckCircle className="h-5 w-5 text-green-500 ml-2" />
                    )}
                  </div>
                </div>
                
                {activeModule === module.id && (
                  <div className="border-t border-gray-200 bg-white rounded-b-lg">
                    <div className="py-1">
                      {module.lessons.map((lesson) => (
                        <div 
                          key={lesson.id} 
                          className={`flex items-center justify-between py-2 px-3 mx-2 my-1 rounded-md cursor-pointer transition-all ${selectedLesson === lesson.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                          onClick={() => handleLessonClick(lesson)}
                        >
                          <div className="flex items-center">
                            {lesson.type === 'video' && <Play className="h-4 w-4 text-blue-500 mr-2" />}
                            {lesson.type === 'reading' && <FileText className="h-4 w-4 text-green-500 mr-2" />}
                            {lesson.type === 'interactive' && <Users className="h-4 w-4 text-purple-500 mr-2" />}
                            {lesson.type === 'quiz' && <CheckSquare className="h-4 w-4 text-amber-500 mr-2" />}
                            <span className="text-sm">{lesson.title}</span>
                          </div>
                          
                          {lesson.completed && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    );
  };
  
  const renderLessonContent = () => {
    const selectedLesson = getSelectedLesson();
    
    if (!selectedLesson) {
      return (
        <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <BookOpen className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">Select a lesson to begin</h3>
          <p className="text-gray-500 max-w-md">
            Choose a module and lesson from the left panel to view its content, resources, and documents.
          </p>
        </div>
      );
    }
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 h-full flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center">
            {selectedLesson.type === 'video' && <Play className="h-5 w-5 text-blue-600 mr-2" />}
            {selectedLesson.type === 'reading' && <FileText className="h-5 w-5 text-green-600 mr-2" />}
            {selectedLesson.type === 'interactive' && <Users className="h-5 w-5 text-purple-600 mr-2" />}
            {selectedLesson.type === 'quiz' && <CheckSquare className="h-5 w-5 text-amber-600 mr-2" />}
            <h3 className="text-lg font-medium text-gray-800">{selectedLesson.title}</h3>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Clock className="h-4 w-4 mr-1" />
            <span>{selectedLesson.duration}</span>
            <span className="mx-2">•</span>
            <span className="capitalize">{selectedLesson.type}</span>
            <span className="mx-2">•</span>
            <span>{selectedLesson.completed ? 'Completed' : 'Not completed'}</span>
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-4">
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                  {selectedLesson.type === 'video' && (
                    <div className="text-center">
                      <Play className="h-16 w-16 text-blue-500 mx-auto mb-2" />
                      <Button onClick={() => toast.success("Starting video...")}>
                        Play Video
                      </Button>
                    </div>
                  )}
                  {selectedLesson.type === 'reading' && (
                    <div className="text-center">
                      <FileText className="h-16 w-16 text-green-500 mx-auto mb-2" />
                      <Button onClick={() => toast.success("Opening reading material...")}>
                        Open Reading
                      </Button>
                    </div>
                  )}
                  {selectedLesson.type === 'interactive' && (
                    <div className="text-center">
                      <Users className="h-16 w-16 text-purple-500 mx-auto mb-2" />
                      <Button onClick={() => toast.success("Starting interactive exercise...")}>
                        Start Exercise
                      </Button>
                    </div>
                  )}
                  {selectedLesson.type === 'quiz' && (
                    <div className="text-center">
                      <CheckSquare className="h-16 w-16 text-amber-500 mx-auto mb-2" />
                      <Button onClick={() => toast.success("Starting quiz...")}>
                        Begin Quiz
                      </Button>
                    </div>
                  )}
                </div>
                
                <h4 className="font-medium text-lg mb-3">Lesson Overview</h4>
                <p className="text-gray-700 mb-4">
                  This lesson covers essential concepts related to {selectedLesson.title.toLowerCase()}.
                  You'll learn about the key principles, best practices, and real-world applications.
                </p>
                
                <h4 className="font-medium text-lg mb-3">Learning Objectives</h4>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2" />
                    <span>Understand the core concepts of {selectedLesson.title.toLowerCase()}</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2" />
                    <span>Apply the principles in practical scenarios</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2" />
                    <span>Identify common challenges and solutions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2" />
                    <span>Implement best practices in your daily workflow</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <div className="mb-6">
              <h4 className="font-medium text-lg mb-3 flex items-center">
                <FolderOpen className="h-5 w-5 mr-2 text-blue-600" />
                Documents & Resources
              </h4>
              <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
                {selectedLesson.documents.map((doc, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-3 ${index < selectedLesson.documents.length - 1 ? 'border-b border-gray-200' : ''}`}
                  >
                    <div className="flex items-center">
                      <FileText className={`h-5 w-5 mr-3 ${doc.type === 'pdf' ? 'text-red-500' : doc.type === 'docx' ? 'text-blue-500' : doc.type === 'xlsx' ? 'text-green-500' : doc.type === 'pptx' ? 'text-orange-500' : 'text-gray-500'}`} />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <span className="uppercase">{doc.type}</span>
                          <span className="mx-1">•</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="flex items-center" 
                        onClick={() => handleDocumentClick(doc)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        className="flex items-center" 
                        onClick={() => handleDownloadDocument(doc)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <p className="text-sm text-gray-500">Lesson Progress</p>
                <div className="flex items-center mt-1">
                  <Progress value={selectedLesson.completed ? 100 : 0} className="h-2 w-32 mr-3" />
                  <span className="text-sm font-medium">{selectedLesson.completed ? '100%' : '0%'}</span>
                </div>
              </div>
              
              <Button variant={selectedLesson.completed ? "outline" : "default"}>
                {selectedLesson.completed ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                    Completed
                  </>
                ) : (
                  <>
                    <ArrowRight className="h-4 w-4 mr-2" />
                    {selectedLesson.type === 'video' ? 'Watch Lesson' : 
                     selectedLesson.type === 'reading' ? 'Start Reading' : 
                     selectedLesson.type === 'interactive' ? 'Begin Exercise' : 
                     'Take Quiz'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    );
  };
  
  const renderModuleContent = () => {
    if (!activeModule) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((module, index) => (
            <Card 
              key={module.id}
              className={`hover:shadow-md transition-all cursor-pointer ${module.progress === 100 ? 'border-green-200' : ''}`}
              onClick={() => handleModuleClick(module.id)}
            >
              <CardContent className="p-5">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex items-center justify-center mr-3 text-lg font-medium">
                    {index + 1}
                  </div>
                  <h3 className="font-medium text-lg">{module.title}</h3>
                  {module.progress === 100 && (
                    <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />
                  )}
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500">Completion</span>
                    <span className="text-sm font-medium">{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
                
                <div className="flex items-center text-sm text-gray-500">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>{module.lessons.length} lessons</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    {module.lessons.reduce((acc, lesson) => {
                      const minutes = parseInt(lesson.duration.split(' ')[0]);
                      return acc + minutes;
                    }, 0)} mins
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
        <div className="md:col-span-1">
          <div className="mb-4">
            <Button 
              variant="back" 
              className="w-full justify-start" 
              onClick={handleBackToModules}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Modules
            </Button>
          </div>
          {renderModuleNavigation()}
        </div>
        
        <div className="md:col-span-2 h-full">
          {renderLessonContent()}
        </div>
      </div>
    );
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-xl">{course?.title}</DialogTitle>
              <DialogDescription>
                {course?.description}
              </DialogDescription>
            </div>
            <Badge 
              variant="outline" 
              className="bg-blue-50 text-blue-700 border-blue-100"
            >
              {course?.category}
            </Badge>
          </div>
        </DialogHeader>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="content">Course Content</TabsTrigger>
            <TabsTrigger value="certification">Certification</TabsTrigger>
          </TabsList>
          
          <div className="flex-1 overflow-hidden">
            <TabsContent value="overview" className="m-0 p-0 h-full overflow-hidden">
              <ScrollArea className="h-[calc(90vh-200px)]">
                <div className="pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Course Progress</h3>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-gray-500">Overall Completion</span>
                              <span className="text-sm font-medium">{course?.progress}%</span>
                            </div>
                            <Progress value={course?.progress} className="h-2" />
                          </div>
                          
                          {course?.status === 'in-progress' && (
                            <p className="text-sm text-blue-600">
                              Continue where you left off to complete this course.
                            </p>
                          )}
                          
                          {course?.status === 'completed' && (
                            <div className="flex items-center text-green-600 text-sm">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              <span>Completed on {course?.completionDate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Course Details</h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Modules</p>
                              <p className="font-medium">{course?.modules} modules</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Clock className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Duration</p>
                              <p className="font-medium">{course?.duration}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Users className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Enrolled Agents</p>
                              <p className="font-medium">{course?.assignedAgents} agents</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <Award className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">Certification</p>
                              <p className="font-medium">{course?.certification}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Course Overview</h3>
                        <p className="text-gray-600">
                          This comprehensive course will provide you with all the knowledge and skills needed to excel in your role.
                          The curriculum is designed to build proficiency through a combination of video lessons, interactive exercises,
                          and practical assessments.
                        </p>
                        
                        <div className="mt-4 bg-amber-50 border border-amber-100 rounded-lg p-4">
                          <h4 className="font-medium text-amber-800 mb-1">Prerequisites</h4>
                          <p className="text-sm text-amber-700">
                            {course?.id === 'unidoc-foundations' ? 'No prerequisites required' : 'Completion of Unidoc Foundations course'}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">What You'll Learn</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2" />
                            <span>
                              {course?.id === 'unidoc-foundations' ? 'Navigate the Unidoc platform with confidence' :
                              course?.id === 'digital-certificate' ? 'Create and verify digital certificates' :
                              course?.id === 'customer-success' ? 'Build lasting customer relationships' :
                              course?.id === 'advanced-sales' ? 'Apply consultative selling techniques' :
                              'Navigate regional regulatory requirements'}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2" />
                            <span>
                              {course?.id === 'unidoc-foundations' ? 'Create and manage digital documentation' :
                              course?.id === 'digital-certificate' ? 'Implement secure signature collection' :
                              course?.id === 'customer-success' ? 'Identify and address customer needs' :
                              course?.id === 'advanced-sales' ? 'Handle objections effectively' :
                              'Maintain compliance documentation'}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2" />
                            <span>
                              {course?.id === 'unidoc-foundations' ? 'Understand compliance fundamentals' :
                              course?.id === 'digital-certificate' ? 'Resolve certificate disputes' :
                              course?.id === 'customer-success' ? 'Create effective solution presentations' :
                              course?.id === 'advanced-sales' ? 'Create winning proposals' :
                              'Implement risk management protocols'}
                            </span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2" />
                            <span>
                              {course?.id === 'unidoc-foundations' ? 'Communicate effectively with customers' :
                              course?.id === 'digital-certificate' ? 'Manage certificate lifecycle' :
                              course?.id === 'customer-success' ? 'Measure and improve satisfaction' :
                              course?.id === 'advanced-sales' ? 'Develop long-term client relationships' :
                              'Stay current with regulatory updates'}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-6 mt-4 border-t">
                    <h3 className="text-lg font-medium mb-3">Upcoming Sessions</h3>
                    <div className="space-y-3">
                      <div className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Live Q&A Session</h4>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                              <span className="mx-2">•</span>
                              <Clock className="h-4 w-4 mr-1" />
                              <span>2:00 PM - 3:30 PM</span>
                            </div>
                          </div>
                          
                          <Button size="sm">Register</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Workshop: {course?.id === 'digital-certificate' ? 'Digital Signature Best Practices' : 'Advanced Techniques'}</h4>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{new Date(Date.now() + 86400000 * 7).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                              <span className="mx-2">•</span>
                              <Clock className="h-4 w-4 mr-1" />
                              <span>10:00 AM - 12:00 PM</span>
                            </div>
                          </div>
                          
                          <Button size="sm">Register</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center mt-4">
                      <Button variant="outline" className="flex items-center gap-2">
                        <PlusCircle className="h-4 w-4" />
                        View All Sessions
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="content" className="m-0 p-0 h-full overflow-hidden">
              <ScrollArea className="h-[calc(90vh-200px)]">
                <div className="pr-4">
                  {renderModuleContent()}
                </div>
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="certification" className="m-0 p-0 overflow-hidden">
              <ScrollArea className="h-[calc(90vh-200px)]">
                <div className="pr-4 space-y-6">
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Award className="h-5 w-5 text-blue-600 mr-2" />
                      <h3 className="font-medium text-blue-800">Certification Information</h3>
                    </div>
                    <p className="text-blue-700 text-sm">
                      Upon completion of this course, you will receive the <strong>{course?.certification}</strong>.
                      This certification validates your proficiency in the key skills and knowledge areas covered in this course.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Certification Requirements</h3>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <div className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center ${course?.progress >= 100 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                            {course?.progress >= 100 ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <span className="text-xs">1</span>
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">Complete All Course Modules</p>
                            <p className="text-sm text-gray-500">Work through all modules and lessons</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center ${course?.progress >= 100 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                            {course?.progress >= 100 ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <span className="text-xs">2</span>
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">Pass the Final Assessment</p>
                            <p className="text-sm text-gray-500">Score at least 80% on the certification exam</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className={`mt-1 h-5 w-5 rounded-full flex items-center justify-center ${course?.progress >= 100 ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
                            {course?.progress >= 100 ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <span className="text-xs">3</span>
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">Complete Practical Assignment</p>
                            <p className="text-sm text-gray-500">Submit and pass the hands-on practical assessment</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Certification Benefits</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2" />
                          <span>Recognition of your expertise and competence</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2" />
                          <span>Digital badge for your professional profile</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2" />
                          <span>Access to exclusive advanced courses</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-1 mr-2" />
                          <span>Eligibility for specialized roles and assignments</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {course?.progress === 100 ? (
                    <div className="bg-green-50 border border-green-100 rounded-lg p-6 text-center">
                      <Award className="h-12 w-12 text-green-600 mx-auto mb-3" />
                      <h3 className="text-xl font-medium text-green-800 mb-2">Certification Complete!</h3>
                      <p className="text-green-700 mb-4">
                        Congratulations! You have successfully completed all requirements and earned your certification.
                      </p>
                      <div className="flex justify-center space-x-3">
                        <Button>
                          <FileText className="h-4 w-4 mr-2" />
                          View Certificate
                        </Button>
                        <Button variant="outline">
                          <Award className="h-4 w-4 mr-2" />
                          Share Achievement
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="border rounded-lg p-6">
                      <h3 className="text-lg font-medium mb-4">Certification Progress</h3>
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-500">Overall Completion</span>
                          <span className="text-sm font-medium">{course?.progress}%</span>
                        </div>
                        <Progress value={course?.progress} className="h-3" />
                      </div>
                      
                      <div className="text-center">
                        {course?.progress < 100 ? (
                          <Button 
                            className="mx-auto"
                            onClick={handleStartCourse}
                          >
                            <ArrowRight className="h-4 w-4 mr-2" />
                            Continue Course to Earn Certification
                          </Button>
                        ) : (
                          <Button 
                            className="mx-auto"
                            onClick={handleStartCourse}
                          >
                            <Award className="h-4 w-4 mr-2" />
                            Take Final Certification Exam
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Certification Expiration</h3>
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                      <p className="text-amber-800">
                        <span className="font-medium">Important:</span> This certification is valid for 1 year from the date of completion. 
                        To maintain your certified status, you will need to complete a renewal course before the expiration date.
                      </p>
                      {course?.status === 'completed' && (
                        <div className="mt-3 flex items-center text-amber-700">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>Expires on: {new Date(new Date(course?.completionDate).getTime() + 31536000000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
        
        <DialogFooter className="pt-4 border-t mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleStartCourse}>
            {course?.status === 'not-started' ? (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start Course
              </>
            ) : course?.status === 'completed' ? (
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailDialog;
