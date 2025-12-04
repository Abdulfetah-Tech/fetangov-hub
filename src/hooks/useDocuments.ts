import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Document {
  id: string;
  user_id: string;
  application_id: string | null;
  file_name: string;
  file_type: string;
  file_size: number;
  storage_path: string;
  uploaded_at: string;
}

export const useDocuments = (applicationId?: string) => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = async () => {
    if (!user) {
      setDocuments([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      let query = supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('uploaded_at', { ascending: false });

      if (applicationId) {
        query = query.eq('application_id', applicationId);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setDocuments((data as Document[]) || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadDocument = async (file: File, applicationId?: string) => {
    if (!user) return { success: false, error: 'Not authenticated' };

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const storagePath = `${user.id}/${fileName}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(storagePath, file);

      if (uploadError) throw uploadError;

      // Save metadata
      const { data: docData, error: insertError } = await supabase
        .from('documents')
        .insert({
          user_id: user.id,
          application_id: applicationId || null,
          file_name: file.name,
          file_type: file.type,
          file_size: file.size,
          storage_path: storagePath,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      setDocuments((prev) => [docData as Document, ...prev]);
      return { success: true, document: docData };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsUploading(false);
    }
  };

  const deleteDocument = async (documentId: string, storagePath: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([storagePath]);

      if (storageError) throw storageError;

      // Delete metadata
      const { error: deleteError } = await supabase
        .from('documents')
        .delete()
        .eq('id', documentId);

      if (deleteError) throw deleteError;

      setDocuments((prev) => prev.filter((d) => d.id !== documentId));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const getDocumentUrl = async (storagePath: string) => {
    const { data } = await supabase.storage
      .from('documents')
      .createSignedUrl(storagePath, 3600);

    return data?.signedUrl;
  };

  useEffect(() => {
    fetchDocuments();
  }, [user, applicationId]);

  return {
    documents,
    isLoading,
    isUploading,
    error,
    uploadDocument,
    deleteDocument,
    getDocumentUrl,
    refreshDocuments: fetchDocuments,
  };
};
