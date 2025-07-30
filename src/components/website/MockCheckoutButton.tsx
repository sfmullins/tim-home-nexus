import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useConfiguration } from '@/contexts/ConfigurationContext';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MockCheckoutButtonProps {
  shippingAddress?: any;
  billingAddress?: any;
  className?: string;
}

const MockCheckoutButton: React.FC<MockCheckoutButtonProps> = ({ 
  shippingAddress, 
  billingAddress, 
  className 
}) => {
  const { configuration } = useConfiguration();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleMockCheckout = async () => {
    if (!configuration) {
      toast({
        title: "Configuration Required",
        description: "Please configure your TIM before proceeding to checkout.",
        variant: "destructive",
      });
      return;
    }

    // Validate required fields for demo
    if (!shippingAddress?.firstName || !shippingAddress?.email || !shippingAddress?.address1) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required shipping details.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate payment processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create mock order ID
      const mockOrderId = `TIM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      toast({
        title: "Order Successful!",
        description: `Mock order ${mockOrderId} created successfully.`,
      });
      
      // Navigate to success page with mock order data
      navigate(`/website/success?mock_order_id=${mockOrderId}&total=${configuration.totalPrice}`);
      
    } catch (error) {
      toast({
        title: "Checkout Error",
        description: "Mock checkout failed. Please try again.",
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
      onClick={handleMockCheckout}
      disabled={isLoading}
      className={className}
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing Mock Order...
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Mock Checkout - €{configuration.totalPrice}
        </>
      )}
    </Button>
  );
};

export default MockCheckoutButton;