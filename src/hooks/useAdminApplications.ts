import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { ApplicationStatus } from './useServiceApplications';

export interface AdminApplication {
  id: string;
  user_id: string;
  service_type: string;
  service_name: string;
  status: ApplicationStatus;
  form_data: Record<string, any>;
  notes: string | null;
  submitted_at: string;
  updated_at: string;
}

export const useAdminApplications = () => {
  const { role } = useAuth();
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isOfficer = role === 'officer' || role === 'admin';

  const fetchApplications = async () => {
    if (!isOfficer) {
      setApplications([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('service_applications')
        .select('*')
        .order('submitted_at', { ascending: false });

      if (fetchError) throw fetchError;
      setApplications((data as AdminApplication[]) || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateApplicationStatus = async (
    applicationId: string, 
    status: ApplicationStatus, 
    notes?: string
  ) => {
    if (!isOfficer) return { success: false, error: 'Unauthorized' };

    try {
      const updateData: { status: ApplicationStatus; notes?: string } = { status };
      if (notes !== undefined) updateData.notes = notes;

      const { error: updateError } = await supabase
        .from('service_applications')
        .update(updateData)
        .eq('id', applicationId);

      if (updateError) throw updateError;

      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status, notes: notes ?? app.notes } : app
        )
      );
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const getStats = () => {
    const pending = applications.filter((a) => a.status === 'pending').length;
    const inReview = applications.filter((a) => a.status === 'in_review').length;
    const approved = applications.filter((a) => a.status === 'approved').length;
    const rejected = applications.filter((a) => a.status === 'rejected').length;
    const completed = applications.filter((a) => a.status === 'completed').length;
    return { pending, inReview, approved, rejected, completed, total: applications.length };
  };

  useEffect(() => {
    fetchApplications();
  }, [isOfficer]);

  return {
    applications,
    isLoading,
    error,
    isOfficer,
    updateApplicationStatus,
    refreshApplications: fetchApplications,
    getStats,
  };
};
