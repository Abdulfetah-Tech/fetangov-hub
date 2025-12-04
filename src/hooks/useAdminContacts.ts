import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export const useAdminContacts = () => {
  const { role } = useAuth();
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isOfficer = role === 'officer' || role === 'admin';

  const fetchContacts = async () => {
    if (!isOfficer) {
      setContacts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setContacts((data as ContactSubmission[]) || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStats = () => {
    const newCount = contacts.filter((c) => c.status === 'new').length;
    const inProgress = contacts.filter((c) => c.status === 'in_progress').length;
    const resolved = contacts.filter((c) => c.status === 'resolved').length;
    return { new: newCount, inProgress, resolved, total: contacts.length };
  };

  useEffect(() => {
    fetchContacts();
  }, [isOfficer]);

  return {
    contacts,
    isLoading,
    error,
    isOfficer,
    refreshContacts: fetchContacts,
    getStats,
  };
};
