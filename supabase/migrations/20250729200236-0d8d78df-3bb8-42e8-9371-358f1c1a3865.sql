-- Create file_access_logs table to track file operations
CREATE TABLE public.file_access_logs (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    file_path TEXT NOT NULL,
    action TEXT NOT NULL, -- 'list', 'download', 'upload', 'delete', 'rename'
    file_size BIGINT,
    mime_type TEXT,
    success BOOLEAN NOT NULL DEFAULT true,
    error_message TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on file_access_logs
ALTER TABLE public.file_access_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for file_access_logs
CREATE POLICY "Users can view their own file access logs" 
ON public.file_access_logs 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert file access logs" 
ON public.file_access_logs 
FOR INSERT 
WITH CHECK (true);

-- Create index for performance
CREATE INDEX idx_file_access_logs_user_id ON public.file_access_logs(user_id);
CREATE INDEX idx_file_access_logs_created_at ON public.file_access_logs(created_at);