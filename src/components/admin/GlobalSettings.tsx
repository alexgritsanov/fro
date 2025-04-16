
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Save, BellRing, Shield, Globe, Loader2, Mail, FileText, Image, AlertTriangle } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

// Define schema for form validation
const globalSettingsSchema = z.object({
  platformName: z.string().min(2, { message: "Platform name is required" }),
  defaultLanguage: z.string().min(2, { message: "Language is required" }),
  description: z.string().optional(),
  logoUrl: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal('')),
  supportEmail: z.string().email({ message: "Must be a valid email address" }).optional().or(z.literal('')),
  termsUrl: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal('')),
  privacyUrl: z.string().url({ message: "Must be a valid URL" }).optional().or(z.literal('')),
  passwordResetFrequency: z.string().min(1, { message: "Password reset frequency is required" }),
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(false),
  twoFactorAuth: z.boolean().default(false),
  maintenanceMode: z.boolean().default(false),
});

type GlobalSettingsFormValues = z.infer<typeof globalSettingsSchema>;

// Default values to display while loading
const defaultSettings: GlobalSettingsFormValues = {
  platformName: "Unidoc Service Platform",
  defaultLanguage: "English",
  description: "A comprehensive service management platform for delivery certificates.",
  logoUrl: "",
  supportEmail: "",
  termsUrl: "",
  privacyUrl: "",
  passwordResetFrequency: "90 days",
  emailNotifications: true,
  pushNotifications: false,
  twoFactorAuth: false,
  maintenanceMode: false,
};

// Interface for the database table structure
interface GlobalSettings {
  id: string;
  platform_name: string;
  default_language: string;
  description: string | null;
  logo_url: string | null;
  support_email: string | null;
  terms_url: string | null;
  privacy_url: string | null;
  password_reset_frequency: string;
  email_notifications: boolean;
  push_notifications: boolean;
  two_factor_auth: boolean;
  maintenance_mode: boolean;
  created_at: string;
  updated_at: string;
}

// Function to fetch global settings
const fetchGlobalSettings = async (): Promise<GlobalSettingsFormValues> => {
  const { data, error } = await supabase
    .from('global_settings')
    .select('*')
    .maybeSingle();

  if (error) {
    console.error("Error fetching settings:", error);
    // Instead of throwing an error, return default values
    return defaultSettings;
  }

  if (!data) {
    // No settings found, return defaults
    return defaultSettings;
  }

  const settings = data as GlobalSettings;
  return {
    platformName: settings.platform_name,
    defaultLanguage: settings.default_language,
    description: settings.description || "",
    logoUrl: settings.logo_url || "",
    supportEmail: settings.support_email || "",
    termsUrl: settings.terms_url || "",
    privacyUrl: settings.privacy_url || "",
    passwordResetFrequency: settings.password_reset_frequency,
    emailNotifications: settings.email_notifications,
    pushNotifications: settings.push_notifications,
    twoFactorAuth: settings.two_factor_auth,
    maintenanceMode: settings.maintenance_mode || false,
  };
};

const GlobalSettings = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Set up form with react-hook-form using default values
  const form = useForm<GlobalSettingsFormValues>({
    resolver: zodResolver(globalSettingsSchema),
    defaultValues: defaultSettings, // Use defaults immediately
  });

  // Fetch global settings
  const { data: settings, isLoading, error } = useQuery({
    queryKey: ['globalSettings'],
    queryFn: fetchGlobalSettings,
    retry: 1, // Only retry once to avoid excessive attempts
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Update form values when settings are loaded
  useEffect(() => {
    if (settings) {
      form.reset(settings);
    }
  }, [settings, form]);

  // Mutation for saving settings
  const mutation = useMutation({
    mutationFn: async (values: GlobalSettingsFormValues) => {
      const { data: existingSettings } = await supabase
        .from('global_settings')
        .select('id')
        .maybeSingle();

      if (existingSettings) {
        // Update existing settings
        const { error } = await supabase
          .from('global_settings')
          .update({
            platform_name: values.platformName,
            default_language: values.defaultLanguage,
            description: values.description,
            logo_url: values.logoUrl,
            support_email: values.supportEmail,
            terms_url: values.termsUrl,
            privacy_url: values.privacyUrl,
            password_reset_frequency: values.passwordResetFrequency,
            email_notifications: values.emailNotifications,
            push_notifications: values.pushNotifications,
            two_factor_auth: values.twoFactorAuth,
            maintenance_mode: values.maintenanceMode,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingSettings.id);

        if (error) throw error;
      } else {
        // Insert new settings
        const { error } = await supabase
          .from('global_settings')
          .insert({
            platform_name: values.platformName,
            default_language: values.defaultLanguage,
            description: values.description,
            logo_url: values.logoUrl,
            support_email: values.supportEmail,
            terms_url: values.termsUrl,
            privacy_url: values.privacyUrl,
            password_reset_frequency: values.passwordResetFrequency,
            email_notifications: values.emailNotifications,
            push_notifications: values.pushNotifications,
            two_factor_auth: values.twoFactorAuth,
            maintenance_mode: values.maintenanceMode,
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Settings saved",
        description: "Your global settings have been successfully updated.",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ['globalSettings'] });
    },
    onError: (error) => {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Could not save settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values: GlobalSettingsFormValues) => {
    mutation.mutate(values);
  };

  // Show inline error instead of taking up the whole screen
  if (error) {
    console.error("Error loading settings:", error);
    toast({
      title: "Error loading settings",
      description: "There was a problem loading settings. Using default values.",
      variant: "destructive",
    });
    // Continue rendering with form defaults instead of showing error screen
  }

  // Create a skeleton UI component for form fields
  const SkeletonFormField = () => (
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-full" />
    </div>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Platform Identity Section */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-blue-500" />
              <div>
                <CardTitle className="text-lg font-bold">Platform Identity</CardTitle>
                <CardDescription>Configure your platform branding and identity</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="platformName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Platform Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-gray-200" />
                    </FormControl>
                    <FormDescription className="text-xs">
                      The name of your service platform.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="defaultLanguage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Default Language</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-gray-200" />
                    </FormControl>
                    <FormDescription className="text-xs">
                      The default language for the platform.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Description of the platform"
                      className="border-gray-200"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Briefly describe the purpose of this platform.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Logo URL</FormLabel>
                  <FormControl>
                    <div className="flex gap-3">
                      <Input {...field} placeholder="https://example.com/logo.png" className="border-gray-200 flex-grow" />
                      {field.value && (
                        <div className="h-10 w-10 rounded border border-gray-200 flex items-center justify-center overflow-hidden">
                          <img 
                            src={field.value} 
                            alt="Logo preview" 
                            className="max-h-full max-w-full object-contain"
                            onError={(e) => (e.target as HTMLImageElement).src = 'https://placehold.co/40x40?text=404'}
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs">
                    URL to your platform logo image.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Support & Documentation Section */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-green-500" />
              <div>
                <CardTitle className="text-lg font-bold">Support & Documentation</CardTitle>
                <CardDescription>Configure support and legal documentation</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 pt-6">
            <FormField
              control={form.control}
              name="supportEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Support Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="support@example.com" className="border-gray-200" />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Email address where users can get support.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="termsUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Terms of Service URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://example.com/terms" className="border-gray-200" />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Link to your Terms of Service page.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="privacyUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Privacy Policy URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://example.com/privacy" className="border-gray-200" />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Link to your Privacy Policy page.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <BellRing className="h-5 w-5 text-orange-500" />
              <div>
                <CardTitle className="text-lg font-bold">Notification Settings</CardTitle>
                <CardDescription>Manage email and push notifications</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 pt-6">
            <FormField
              control={form.control}
              name="emailNotifications"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-md border border-gray-200 p-4">
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium">Email Notifications</FormLabel>
                    <FormDescription className="text-sm">
                      Send updates and alerts via email.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly={field.disabled}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pushNotifications"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-md border border-gray-200 p-4">
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium">Push Notifications</FormLabel>
                    <FormDescription className="text-sm">
                      Send real-time alerts to mobile devices.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly={field.disabled}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-green-500" />
              <div>
                <CardTitle className="text-lg font-bold">Security Settings</CardTitle>
                <CardDescription>Configure password and authentication settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="passwordResetFrequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Password Reset Frequency</FormLabel>
                    <FormControl>
                      <Input {...field} className="border-gray-200" />
                    </FormControl>
                    <FormDescription className="text-xs">
                      How often users should reset their passwords.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="twoFactorAuth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="font-medium">Two-Factor Authentication</FormLabel>
                    <div className="pt-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-readonly={field.disabled}
                        />
                      </FormControl>
                    </div>
                    <FormDescription className="text-xs mt-2">
                      Enable two-factor authentication for enhanced security.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <div>
                <CardTitle className="text-lg font-bold">System Settings</CardTitle>
                <CardDescription>Configure critical system settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6 pt-6">
            <FormField
              control={form.control}
              name="maintenanceMode"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-md border border-amber-200 bg-amber-50 p-4">
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium">Maintenance Mode</FormLabel>
                    <FormDescription className="text-sm text-amber-700">
                      When enabled, the system will be unavailable to regular users.
                      Only administrators will be able to access the platform.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly={field.disabled}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="border-t border-gray-200 pt-4">
            <Button 
              type="submit" 
              disabled={mutation.isPending} 
              className="ml-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default GlobalSettings;
