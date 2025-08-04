import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Cookie } from "lucide-react";
import { cookieManager, type CookieConsent, type CookieCategory } from "@/lib/cookieManager";

const CookieSettingsFooter = () => {
  const [open, setOpen] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<CookieConsent | null>(cookieManager.getConsent());

  const handleCookieConsentChange = (category: CookieCategory, enabled: boolean) => {
    const currentConsent = cookieManager.getConsent() || {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      timestamp: new Date(),
      version: '1.0'
    };
    
    cookieManager.setConsent({
      ...currentConsent,
      [category]: enabled
    });
    
    setCookieConsent(cookieManager.getConsent());
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
          <Cookie className="w-4 h-4" />
          Cookie Settings
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Cookie className="w-5 h-5" />
            Cookie Preferences
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-6">
            {/* Cookie Categories */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                <div className="flex-1">
                  <h4 className="font-semibold">Necessary Cookies</h4>
                  <p className="text-sm text-muted-foreground">Required for basic site functionality and security</p>
                  <div className="mt-2">
                    <Badge variant="secondary">Always Active</Badge>
                  </div>
                </div>
                <Switch checked={true} disabled />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold">Functional Cookies</h4>
                  <p className="text-sm text-muted-foreground">Remember your preferences and improve your experience</p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Stores: Theme preference, sidebar state, language settings
                  </div>
                </div>
                <Switch 
                  checked={cookieConsent?.functional || false}
                  onCheckedChange={(checked) => handleCookieConsentChange('functional', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold">Analytics Cookies</h4>
                  <p className="text-sm text-muted-foreground">Help us understand how you use the application (anonymized)</p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Anonymous usage statistics, performance monitoring
                  </div>
                </div>
                <Switch 
                  checked={cookieConsent?.analytics || false}
                  onCheckedChange={(checked) => handleCookieConsentChange('analytics', checked)}
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold">Marketing Cookies</h4>
                  <p className="text-sm text-muted-foreground">Used to deliver relevant content (currently disabled)</p>
                  <div className="mt-2 text-xs text-muted-foreground">
                    Not used by TIM - aligns with local-first approach
                  </div>
                </div>
                <Switch 
                  checked={false}
                  disabled
                />
              </div>
            </div>

            {/* Cookie Details */}
            <div>
              <h3 className="font-semibold mb-3">Cookie Details</h3>
              <div className="space-y-3">
                {cookieManager.getCookieDefinitions().map((cookie) => (
                  <div key={cookie.name} className="p-3 border rounded text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{cookie.name}</span>
                      <Badge variant={cookie.required ? "default" : "outline"}>
                        {cookie.category}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-1">{cookie.purpose}</p>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Duration: {cookie.duration}</span>
                      <span>Provider: {cookie.provider}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {
                  cookieManager.rejectAll();
                  setCookieConsent(cookieManager.getConsent());
                }}>
                  Reject All
                </Button>
                <Button onClick={() => {
                  cookieManager.acceptAll();
                  setCookieConsent(cookieManager.getConsent());
                }}>
                  Accept All
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CookieSettingsFooter;