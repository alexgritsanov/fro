
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, GradientCard } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Check, X, AlertCircle, Info, Plus, Search, Clock, Calendar, RefreshCcw, Edit } from 'lucide-react';
import StatusIndicator from '@/components/StatusIndicator';
import FormGroup from '@/components/FormGroup';
import PageHeader from '@/components/PageHeader';
import SearchAndFilterHeader from '@/components/SearchAndFilterHeader';
import ActionMenu from '@/components/ActionMenu';
import { cn } from '@/lib/utils';

const DesignSystem: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  // Update the type to include 'calendar' as a possible value
  const [viewMode, setViewMode] = React.useState<'grid' | 'list' | 'calendar'>('grid');
  
  const actionItems = [
    { label: 'Edit', icon: <Edit className="h-4 w-4" />, onClick: () => {} },
    { label: 'Duplicate', icon: <Plus className="h-4 w-4" />, onClick: () => {} },
    { label: 'Delete', icon: <X className="h-4 w-4" />, onClick: () => {}, variant: 'destructive' as const },
  ];
  
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      <div>
        <h1 className="mb-2">Unidoc Design System</h1>
        <p className="text-unidoc-medium">A comprehensive design system for the Unidoc application.</p>
      </div>
      
      <section>
        <h2 className="mb-4">Color Palette</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <ColorSwatch name="Primary Blue" hex="#0EA5E9" className="bg-unidoc-primary-blue" />
          <ColorSwatch name="Deep Blue" hex="#0C4A6E" className="bg-unidoc-deep-blue" />
          <ColorSwatch name="Light Blue" hex="#7DD3FC" className="bg-unidoc-light-blue" />
          <ColorSwatch name="Cyan Blue" hex="#22D3EE" className="bg-unidoc-cyan-blue" />
          <ColorSwatch name="Teal Blue" hex="#0891B2" className="bg-unidoc-teal-blue" />
          <ColorSwatch name="Secondary Orange" hex="#FB923C" className="bg-unidoc-secondary-orange" />
          <ColorSwatch name="Success" hex="#10B981" className="bg-unidoc-success" />
          <ColorSwatch name="Warning" hex="#FBBF24" className="bg-unidoc-warning" />
          <ColorSwatch name="Error" hex="#F43F5E" className="bg-unidoc-error" />
          <ColorSwatch name="Dark" hex="#1A1F36" className="bg-unidoc-dark" />
          <ColorSwatch name="Medium" hex="#6E7891" className="bg-unidoc-medium" />
          <ColorSwatch name="Light Gray" hex="#E9ECF2" className="bg-unidoc-light-gray" />
          <ColorSwatch name="Extra Light" hex="#F7F9FC" className="bg-unidoc-extra-light" />
        </div>
      </section>
      
      <section>
        <h2 className="mb-4">Gradients</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <GradientSwatch name="Primary Gradient" className="bg-primary-gradient" />
          <GradientSwatch name="Secondary Gradient" className="bg-secondary-gradient" />
          <GradientSwatch name="Success Gradient" className="bg-success-gradient" />
          <GradientSwatch name="Warning Gradient" className="bg-warning-gradient" />
          <GradientSwatch name="Error Gradient" className="bg-error-gradient" />
          <GradientSwatch name="Info Gradient" className="bg-info-gradient" />
          <GradientSwatch name="Blue Teal Gradient" className="bg-blue-teal-gradient" />
          <GradientSwatch name="Blue Cyan Gradient" className="bg-blue-cyan-gradient" />
          <GradientSwatch name="Cyan Sky Gradient" className="bg-cyan-sky-gradient" />
          <GradientSwatch name="Deep Ocean Gradient" className="bg-deep-ocean-gradient" />
        </div>
      </section>
      
      <section>
        <h2 className="mb-4">Typography</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <h1>Heading 1</h1>
            <div className="text-sm text-unidoc-medium mt-1">Font: Inter Bold, Size: 24px (mobile) / 30px (desktop)</div>
          </div>
          <div className="rounded-lg border p-4">
            <h2>Heading 2</h2>
            <div className="text-sm text-unidoc-medium mt-1">Font: Inter Bold, Size: 20px (mobile) / 24px (desktop)</div>
          </div>
          <div className="rounded-lg border p-4">
            <h3>Heading 3</h3>
            <div className="text-sm text-unidoc-medium mt-1">Font: Inter Bold, Size: 18px (mobile) / 20px (desktop)</div>
          </div>
          <div className="rounded-lg border p-4">
            <h4>Heading 4</h4>
            <div className="text-sm text-unidoc-medium mt-1">Font: Inter Bold, Size: 16px (mobile) / 18px (desktop)</div>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-base">Body Text</p>
            <div className="text-sm text-unidoc-medium mt-1">Font: Inter Regular, Size: 16px</div>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-sm">Small Text</p>
            <div className="text-sm text-unidoc-medium mt-1">Font: Inter Regular, Size: 14px</div>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-xs">Extra Small Text</p>
            <div className="text-sm text-unidoc-medium mt-1">Font: Inter Regular, Size: 12px</div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="mb-4">Buttons</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg mb-2">Default Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg mb-2">Color Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="info">Info</Button>
              <Button variant="error">Error</Button>
              <Button variant="blueTeal">Blue Teal</Button>
              <Button variant="blueCyan">Blue Cyan</Button>
              <Button variant="cyanSky">Cyan Sky</Button>
              <Button variant="deepOcean">Deep Ocean</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg mb-2">Sizes</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon"><Plus /></Button>
              <Button size="pill">Pill</Button>
              <Button size="fab"><Plus /></Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg mb-2">With Icons</h3>
            <div className="flex flex-wrap gap-4">
              <Button><Plus className="mr-2" /> Create</Button>
              <Button variant="outline"><Search className="mr-2" /> Search</Button>
              <Button variant="secondary"><Calendar className="mr-2" /> Schedule</Button>
              <Button variant="success"><Check className="mr-2" /> Approve</Button>
              <Button variant="warning"><Clock className="mr-2" /> Pending</Button>
              <Button variant="error"><X className="mr-2" /> Reject</Button>
              <Button variant="blueTeal"><RefreshCcw className="mr-2" /> Sync</Button>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="mb-4">Badges</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg mb-2">Default Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg mb-2">Color Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="blue">Blue</Badge>
              <Badge variant="cyan">Cyan</Badge>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg mb-2">Soft Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Badge variant="softBlue">Blue</Badge>
              <Badge variant="softGreen">Green</Badge>
              <Badge variant="softAmber">Amber</Badge>
              <Badge variant="softRed">Red</Badge>
              <Badge variant="softGray">Gray</Badge>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="mb-4">Status Indicators</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg mb-2">Default</h3>
            <div className="flex flex-wrap gap-4">
              <StatusIndicator status="active" />
              <StatusIndicator status="pending" />
              <StatusIndicator status="completed" />
              <StatusIndicator status="warning" />
              <StatusIndicator status="error" />
              <StatusIndicator status="draft" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg mb-2">With Dot</h3>
            <div className="flex flex-wrap gap-4">
              <StatusIndicator status="active" withDot />
              <StatusIndicator status="pending" withDot />
              <StatusIndicator status="completed" withDot />
              <StatusIndicator status="warning" withDot />
              <StatusIndicator status="error" withDot />
              <StatusIndicator status="draft" withDot />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg mb-2">With Badge</h3>
            <div className="flex flex-wrap gap-4">
              <StatusIndicator status="active" withBadge />
              <StatusIndicator status="pending" withBadge />
              <StatusIndicator status="completed" withBadge />
              <StatusIndicator status="warning" withBadge />
              <StatusIndicator status="error" withBadge />
              <StatusIndicator status="draft" withBadge />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg mb-2">With Pill</h3>
            <div className="flex flex-wrap gap-4">
              <StatusIndicator status="active" withPill />
              <StatusIndicator status="pending" withPill />
              <StatusIndicator status="completed" withPill />
              <StatusIndicator status="warning" withPill />
              <StatusIndicator status="error" withPill />
              <StatusIndicator status="draft" withPill />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg mb-2">Sizes</h3>
            <div className="flex flex-wrap gap-4">
              <StatusIndicator status="active" withPill size="sm" />
              <StatusIndicator status="active" withPill size="md" />
              <StatusIndicator status="active" withPill size="lg" />
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="mb-4">Cards</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg mb-2">Standard Cards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Card Title</CardTitle>
                  <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the content of the card.</p>
                </CardContent>
                <CardFooter>
                  <Button>Action</Button>
                </CardFooter>
              </Card>
              
              <Card className="border-l-4 border-l-unidoc-primary-blue">
                <CardHeader>
                  <CardTitle>Accent Card</CardTitle>
                  <CardDescription>With left border accent</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>This is the content of the card.</p>
                </CardContent>
                <CardFooter>
                  <Button>Action</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg mb-2">Gradient Cards</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <GradientCard variant="blue">
                <CardHeader>
                  <CardTitle>Blue</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Blue gradient card</p>
                </CardContent>
              </GradientCard>
              
              <GradientCard variant="success">
                <CardHeader>
                  <CardTitle>Success</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Success gradient card</p>
                </CardContent>
              </GradientCard>
              
              <GradientCard variant="warning">
                <CardHeader>
                  <CardTitle>Warning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Warning gradient card</p>
                </CardContent>
              </GradientCard>
              
              <GradientCard variant="error">
                <CardHeader>
                  <CardTitle>Error</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Error gradient card</p>
                </CardContent>
              </GradientCard>
              
              <GradientCard variant="info">
                <CardHeader>
                  <CardTitle>Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Info gradient card</p>
                </CardContent>
              </GradientCard>
              
              <GradientCard variant="neutral">
                <CardHeader>
                  <CardTitle>Neutral</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Neutral gradient card</p>
                </CardContent>
              </GradientCard>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="mb-4">Alerts</h2>
        <div className="space-y-4">
          <Alert>
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>
              This is a default alert. Use it for general information.
            </AlertDescription>
          </Alert>
          
          <Alert variant="success">
            <Check className="h-4 w-4" />
            <AlertTitle>Success Alert</AlertTitle>
            <AlertDescription>
              This is a success alert. Use it to indicate successful operations.
            </AlertDescription>
          </Alert>
          
          <Alert variant="warning">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning Alert</AlertTitle>
            <AlertDescription>
              This is a warning alert. Use it to warn about potential issues.
            </AlertDescription>
          </Alert>
          
          <Alert variant="info">
            <Info className="h-4 w-4" />
            <AlertTitle>Info Alert</AlertTitle>
            <AlertDescription>
              This is an info alert. Use it for informational messages.
            </AlertDescription>
          </Alert>
          
          <Alert variant="destructive">
            <X className="h-4 w-4" />
            <AlertTitle>Destructive Alert</AlertTitle>
            <AlertDescription>
              This is a destructive alert. Use it for error messages or critical warnings.
            </AlertDescription>
          </Alert>
        </div>
      </section>
      
      <section>
        <h2 className="mb-4">Form Elements</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg mb-2">Text Inputs</h3>
            <div className="space-y-4">
              <FormGroup label="Standard Input" htmlFor="standard-input">
                <Input id="standard-input" placeholder="Enter text here..." />
              </FormGroup>
              
              <FormGroup 
                label="Required Input" 
                htmlFor="required-input" 
                required 
                helperText="This field is required"
              >
                <Input id="required-input" placeholder="Enter required information..." />
              </FormGroup>
              
              <FormGroup 
                label="Error Input" 
                htmlFor="error-input" 
                error="This field has an error" 
              >
                <Input id="error-input" placeholder="Enter text here..." className="border-unidoc-error" />
              </FormGroup>
              
              <FormGroup 
                label="Disabled Input" 
                htmlFor="disabled-input"
              >
                <Input id="disabled-input" placeholder="Disabled input" disabled />
              </FormGroup>
              
              <FormGroup 
                label="With Helper Text" 
                htmlFor="helper-input"
                helperText="This is some helpful information about this field"
              >
                <Input id="helper-input" placeholder="Enter text here..." />
              </FormGroup>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="mb-4">Tabs</h2>
        <div className="space-y-4">
          <Tabs defaultValue="tab1">
            <TabsList>
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <Card>
                <CardHeader>
                  <CardTitle>Tab 1 Content</CardTitle>
                  <CardDescription>This is the content for Tab 1</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Sample content for Tab 1.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab2">
              <Card>
                <CardHeader>
                  <CardTitle>Tab 2 Content</CardTitle>
                  <CardDescription>This is the content for Tab 2</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Sample content for Tab 2.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab3">
              <Card>
                <CardHeader>
                  <CardTitle>Tab 3 Content</CardTitle>
                  <CardDescription>This is the content for Tab 3</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Sample content for Tab 3.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <section>
        <h2 className="mb-4">Page Header</h2>
        <div className="border rounded-lg p-6">
          <PageHeader 
            title="Page Title" 
            subtitle="This is a subtitle that provides additional context about this page."
            breadcrumbs={[
              { label: 'Home', href: '#' },
              { label: 'Section', href: '#' },
              { label: 'Current Page' }
            ]}
            actions={
              <>
                <Button variant="outline">Secondary Action</Button>
                <Button>Primary Action</Button>
              </>
            }
          />
        </div>
      </section>
      
      <section>
        <h2 className="mb-4">Search and Filter</h2>
        <div className="border rounded-lg p-6">
          <SearchAndFilterHeader
            searchPlaceholder="Search items..."
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            enableViewToggle
            filterButton
            onFilterClick={() => {}}
            exportButton
            onExportClick={() => {}}
          />
        </div>
      </section>
      
      <section>
        <h2 className="mb-4">Action Menu</h2>
        <div className="border rounded-lg p-6 flex justify-end">
          <ActionMenu actions={actionItems} />
        </div>
      </section>
    </div>
  );
};

const ColorSwatch: React.FC<{ name: string; hex: string; className: string }> = ({ name, hex, className }) => (
  <div className="space-y-2">
    <div className={`h-16 rounded-md ${className}`}></div>
    <div>
      <p className="font-medium">{name}</p>
      <p className="text-xs text-unidoc-medium">{hex}</p>
    </div>
  </div>
);

const GradientSwatch: React.FC<{ name: string; className: string }> = ({ name, className }) => (
  <div className="space-y-2">
    <div className={`h-24 rounded-md ${className}`}></div>
    <p className="font-medium">{name}</p>
  </div>
);

export default DesignSystem;
