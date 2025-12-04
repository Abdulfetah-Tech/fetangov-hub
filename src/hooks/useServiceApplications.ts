import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export type ApplicationStatus = 'pending' | 'in_review' | 'approved' | 'rejected' | 'completed';

export interface ServiceApplication {
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

interface CreateApplicationData {
  service_type: string;
  service_name: string;
  form_data?: Record<string, any>;
}

export const useServiceApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<ServiceApplication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    if (!user) {
      setApplications([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('service_applications')
        .select('*')
        .eq('user_id', user.id)
        .order('submitted_at', { ascending: false });

      if (fetchError) throw fetchError;
      setApplications((data as ServiceApplication[]) || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createApplication = async (data: CreateApplicationData) => {
    if (!user) return { success: false, error: 'Not authenticated' };

    try {
      const { data: newApp, error: createError } = await supabase
        .from('service_applications')
        .insert({
          user_id: user.id,
          service_type: data.service_type,
          service_name: data.service_name,
          form_data: data.form_data || {},
        })
        .select()
        .single();

      if (createError) throw createError;

      setApplications((prev) => [newApp as ServiceApplication, ...prev]);
      return { success: true, application: newApp };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const getApplicationStats = () => {
    const pending = applications.filter((a) => a.status === 'pending').length;
    const inProgress = applications.filter((a) => a.status === 'in_review').length;
    const completed = applications.filter(
      (a) => a.status === 'completed' || a.status === 'approved'
    ).length;
    const rejected = applications.filter((a) => a.status === 'rejected').length;

    return { pending, inProgress, completed, rejected, total: applications.length };
  };

  useEffect(() => {
    fetchApplications();
  }, [user]);

  return {
    applications,
    isLoading,
    error,
    createApplication,
    refreshApplications: fetchApplications,
    getApplicationStats,
  };
};
