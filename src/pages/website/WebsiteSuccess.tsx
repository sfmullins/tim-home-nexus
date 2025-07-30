import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const WebsiteSuccess = () => {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const orderId = searchParams.get('order_id');
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (sessionId) {
          // Verify payment with Stripe
          const { data, error } = await supabase.functions.invoke('verify-payment', {
            body: { session_id: sessionId },
          });

          if (error) throw error;
          setOrder(data.order);
        } else if (orderId) {
          // Fetch order by ID
          const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('id', orderId)
            .single();

          if (error) throw error;
          setOrder(data);
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        toast({
          title: "Error",
          description: "Failed to verify payment. Please contact support.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (orderId || sessionId) {
      verifyPayment();
    } else {
      setLoading(false);
    }
  }, [orderId, sessionId, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
            <p className="text-muted-foreground mb-4">
              We couldn't find your order. Please check your email for confirmation details.
            </p>
            <Button asChild>
              <Link to="/website">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const config = order.configuration;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Payment Successful!
            </h1>
            <p className="text-muted-foreground">
              Thank you for your order. Your TIM is being prepared.
            </p>
          </div>

          {/* Order Summary */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order ID:</span>
                <span className="text-sm font-mono">{order.id}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="font-medium">Status:</span>
                <Badge variant={order.status === 'paid' ? 'default' : 'secondary'}>
                  {order.status}
                </Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Total:</span>
                <span className="text-lg font-bold">
                  €{(order.total_amount / 100).toFixed(2)}
                </span>
              </div>

              {/* Product Configuration */}
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Your Configuration:</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Product:</span>
                    <span>{config.selectedProduct.name}</span>
                  </div>
                  
                  {config.selectedRam && (
                    <div className="flex justify-between">
                      <span>RAM:</span>
                      <span>{config.selectedRam.name}</span>
                    </div>
                  )}
                  
                  {config.selectedStorage && (
                    <div className="flex justify-between">
                      <span>Storage:</span>
                      <span>{config.selectedStorage.name}</span>
                    </div>
                  )}
                  
                  {config.selectedExternal && (
                    <div className="flex justify-between">
                      <span>External Storage:</span>
                      <span>{config.selectedExternal.name}</span>
                    </div>
                  )}
                  
                  {config.selectedGpu && (
                    <div className="flex justify-between">
                      <span>GPU:</span>
                      <span>{config.selectedGpu.name}</span>
                    </div>
                  )}
                  
                  {config.includeJailbreak && (
                    <div className="flex justify-between">
                      <span>Jailbreak:</span>
                      <span>Included</span>
                    </div>
                  )}
                  
                  {config.selectedSoftware?.length > 0 && (
                    <div className="flex justify-between">
                      <span>Software:</span>
                      <span>{config.selectedSoftware.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div>
                  <p className="font-medium">Order Confirmation</p>
                  <p className="text-sm text-muted-foreground">
                    You'll receive an email confirmation shortly with your order details.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div>
                  <p className="font-medium">Assembly & Testing</p>
                  <p className="text-sm text-muted-foreground">
                    Your TIM will be assembled and thoroughly tested (3-5 business days).
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div>
                  <p className="font-medium">Shipping</p>
                  <p className="text-sm text-muted-foreground">
                    Your TIM will be shipped with tracking information provided.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild className="flex-1">
              <Link to="/website">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="flex-1">
              <Link to="/website/configure">
                <ArrowRight className="mr-2 h-4 w-4" />
                Configure Another TIM
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteSuccess;