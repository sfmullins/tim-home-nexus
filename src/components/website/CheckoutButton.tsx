import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useConfiguration } from '@/contexts/ConfigurationContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Loader2 } from 'lucide-react';

interface CheckoutButtonProps {
  shippingAddress?: any;
  billingAddress?: any;
  className?: string;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ 
  shippingAddress, 
  billingAddress, 
  className 
}) => {
  const { configuration } = useConfiguration();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (!configuration) {
      toast({
        title: "Configuration Required",
        description: "Please configure your TIM before proceeding to checkout.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          configuration,
          shippingAddress,
          billingAddress,
        },
      });

      if (error) throw error;

      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
      
      toast({
        title: "Redirecting to Checkout",
        description: "Please complete your payment in the new tab.",
      });
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Error",
        description: error.message || "Failed to create checkout session. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!configuration) {
    return null;
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading}
      className={className}
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Checkout - €{configuration.totalPrice}
        </>
      )}
    </Button>
  );
};

export default CheckoutButton;