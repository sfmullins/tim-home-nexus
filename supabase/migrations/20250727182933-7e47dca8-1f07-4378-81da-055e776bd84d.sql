-- Fix security definer function search path
DROP FUNCTION IF EXISTS public.handle_new_user();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email)
  VALUES (new.id, new.email);
  
  -- Log user registration
  INSERT INTO public.user_logs (user_id, action, category, details)
  VALUES (new.id, 'user_registered', 'auth', jsonb_build_object('email', new.email));
  
  RETURN new;
END;
$$;