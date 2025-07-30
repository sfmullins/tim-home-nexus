-- Create orders table for e-commerce
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  total_amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'EUR',
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  configuration JSONB NOT NULL,
  shipping_address JSONB,
  billing_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view own orders" ON public.orders
FOR SELECT USING (auth.uid() = user_id OR auth.email() = email);

CREATE POLICY "System can insert orders" ON public.orders
FOR INSERT WITH CHECK (true);

CREATE POLICY "System can update orders" ON public.orders
FOR UPDATE USING (true);

-- Add trigger for updated_at
CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();