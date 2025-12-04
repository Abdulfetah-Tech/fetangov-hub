-- Enable realtime for notifications table
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- Enable realtime for service_applications table  
ALTER PUBLICATION supabase_realtime ADD TABLE public.service_applications;