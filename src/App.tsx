
import React from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Customers from "./pages/Customers";
import Users from "./pages/Users";
import Agreements from "./pages/Agreements";
import DocumentGenerator from "./pages/DocumentGenerator";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPanel";
import AgentManagement from "./pages/AgentManagement";
import Chat from "./pages/Chat";

// Create a client
const queryClient = new QueryClient();

// Layout component that includes the sidebar for all protected routes
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="app-content flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <Routes>
          {/* Default route - redirect to dashboard */}
          <Route path="/" element={<AppLayout><Index /></AppLayout>} />
          
          {/* Auth route - accessible without authentication */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Protected routes with Sidebar layout */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* ... All other protected routes following the same pattern */}
          <Route 
            path="/schedule" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Schedule />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/customers" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Customers />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/users" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Users />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/agreements" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Agreements />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/documents" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <DocumentGenerator />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/chat" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Chat />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <Settings />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <AdminPanel />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/agents/*" 
            element={
              <ProtectedRoute>
                <AppLayout>
                  <AgentManagement />
                </AppLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Catch all route - 404 page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
