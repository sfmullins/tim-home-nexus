import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { softwareAddons } from '@/data/products';
import DashboardHeader from '@/components/DashboardHeader';
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

const SoftwareAddonPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const highlightedModule = searchParams.get('module');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activatingModules, setActivatingModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (!session?.user) {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleActivateSoftware = async (addonId: string) => {
    setActivatingModules(prev => new Set([...prev, addonId]));
    
    // Simulate activation process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success(`${softwareAddons.find(addon => addon.id === addonId)?.name} activated successfully!`);
      
      // Navigate back to dashboard after successful activation
      setTimeout(() => {
        navigate('/');
      }, 1500);
      
    } catch (error) {
      toast.error('Failed to activate software. Please try again.');
    } finally {
      setActivatingModules(prev => {
        const newSet = new Set(prev);
        newSet.delete(addonId);
        return newSet;
      });
    }
  };

  const formatPrice = (price: number) => {
    return `$${price}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        <DashboardHeader />
        
        {/* Navigation Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Add Software</h1>
            <p className="text-muted-foreground">Expand your TIM's capabilities with additional software modules</p>
          </div>
        </div>

        {/* Software Add-ons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {softwareAddons.map((addon) => {
            const isActivating = activatingModules.has(addon.id);
            const isHighlighted = highlightedModule === addon.id;
            
            return (
              <Card 
                key={addon.id}
                className={`p-6 bg-gradient-surface border-border transition-all duration-300 ${
                  isHighlighted ? 'ring-2 ring-primary' : 'hover:border-primary/50'
                }`}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{addon.name}</h3>
                      <p className="text-muted-foreground mt-1">{addon.description}</p>
                    </div>
                    {isHighlighted && (
                      <Badge variant="secondary" className="text-xs">
                        Recommended
                      </Badge>
                    )}
                  </div>

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-foreground">
                        {formatPrice(addon.fullPrice)}
                      </span>
                      <span className="text-sm text-muted-foreground">one-time payment</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      No subscriptions. Own it forever.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-success" />
                      <span>Lifetime license</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-success" />
                      <span>No ongoing fees</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-success" />
                      <span>Free updates</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full gap-2" 
                    onClick={() => handleActivateSoftware(addon.id)}
                    disabled={isActivating}
                  >
                    {isActivating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                        Activating...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Activate Now
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold text-foreground mb-2">Why Choose TIM Software?</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• No monthly subscriptions - pay once, own forever</li>
            <li>• All data stays on your device - complete privacy</li>
            <li>• Software can be transferred to family members</li>
            <li>• Works offline - no internet dependency</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SoftwareAddonPage;