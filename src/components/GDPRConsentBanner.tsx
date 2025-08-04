import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Download, Trash2, Cookie, Settings } from "lucide-react";
import { useGDPRCompliance } from "@/hooks/useGDPRCompliance";
import { cookieManager, type CookieConsent, type CookieCategory } from "@/lib/cookieManager";

const GDPRConsentBanner = () => {
  const { gdprState, giveConsent, withdrawConsent, requestDataDeletion, getDataPortability, consentRequired } = useGDPRCompliance();
  const [showBanner, setShowBanner] = useState(false);
  const [showPrivacyCenter, setShowPrivacyCenter] = useState(false);
  const [showCookieSettings, setShowCookieSettings] = useState(false);
  const [cookieConsent, setCookieConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    setShowBanner(consentRequired || cookieManager.needsConsent());
    setCookieConsent(cookieManager.getConsent());
    
    const unsubscribe = cookieManager.onConsentChange((consent) => {
      setCookieConsent(consent);
    });
    
    return unsubscribe;
  }, [consentRequired]);

  const handleAcceptConsent = () => {
    giveConsent();
    cookieManager.acceptAll();
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    cookieManager.rejectAll();
    setShowBanner(false);
  };

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
  };

  const handleExportData = () => {
    const userData = getDataPortability();
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tim-user-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeleteData = () => {
    if (confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
      requestDataDeletion();
      setShowPrivacyCenter(false);
    }
  };

  if (!showBanner && !consentRequired) return null;

  return (
    <>
      {/* GDPR Consent Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-card border-t border-border shadow-lg">
          <div className="max-w-6xl mx-auto">
            <Card className="p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-2">Privacy & Cookie Consent</h3>
                  <p className="text-sm text-muted-foreground">
                    TIM respects your privacy. We use necessary cookies for functionality and optional cookies to improve your experience. 
                    You can customize your preferences or accept our recommended settings.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Dialog open={showPrivacyCenter} onOpenChange={setShowPrivacyCenter}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Shield className="w-4 h-4" />
                        Privacy Center
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                  <Button variant="outline" size="sm" onClick={() => setShowCookieSettings(true)} className="gap-2">
                    <Cookie className="w-4 h-4" />
                    Cookie Settings
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRejectAll}>
                    Reject All
                  </Button>
                  <Button onClick={handleAcceptConsent} size="sm">
                    Accept All
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Privacy Center Dialog */}
      <Dialog open={showPrivacyCenter} onOpenChange={setShowPrivacyCenter}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Privacy Center
            </DialogTitle>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-6">
              {/* Data We Collect */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Data We Collect</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• <strong>Email Address:</strong> For account authentication</p>
                  <p>• <strong>Password (Hashed):</strong> For secure access</p>
                  <p>• <strong>Device Serial Number:</strong> For device identification</p>
                  <p>• <strong>Usage Preferences:</strong> Bookmarks and settings</p>
                </div>
              </div>

              <Separator />

              {/* Why We Collect Data */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Why We Collect This Data</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• <strong>Authentication:</strong> To secure your personal hub</p>
                  <p>• <strong>Personalization:</strong> To remember your preferences</p>
                  <p>• <strong>Security:</strong> To prevent unauthorized access</p>
                </div>
              </div>

              <Separator />

              {/* Your Rights */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Your Rights (GDPR)</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Export Your Data</p>
                      <p className="text-sm text-muted-foreground">Download all your data in JSON format</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleExportData} className="gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Delete All Data</p>
                      <p className="text-sm text-muted-foreground">Permanently remove all your data</p>
                    </div>
                    <Button variant="destructive" size="sm" onClick={handleDeleteData} className="gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Consent Status</p>
                      <p className="text-sm text-muted-foreground">
                        {gdprState.consentGiven ? 'Consent given' : 'Consent not given'}
                        {gdprState.lastConsentUpdate && ` (${gdprState.lastConsentUpdate.toLocaleDateString()})`}
                      </p>
                    </div>
                    <Button 
                      variant={gdprState.consentGiven ? "destructive" : "default"} 
                      size="sm" 
                      onClick={gdprState.consentGiven ? withdrawConsent : giveConsent}
                    >
                      {gdprState.consentGiven ? 'Withdraw' : 'Give Consent'}
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Contact */}
              <div>
                <h3 className="font-semibold text-foreground mb-3">Data Protection Contact</h3>
                <p className="text-sm text-muted-foreground">
                  For privacy concerns or data protection requests, contact us at: privacy@tim.local
                </p>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Cookie Settings Dialog */}
      <Dialog open={showCookieSettings} onOpenChange={setShowCookieSettings}>
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
                    <p className="text-sm text-muted-foreground">Help us understand how you use the application</p>
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
                    <p className="text-sm text-muted-foreground">Used to deliver relevant content and advertisements</p>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Currently not used by TIM - local-first approach
                    </div>
                  </div>
                  <Switch 
                    checked={cookieConsent?.marketing || false}
                    onCheckedChange={(checked) => handleCookieConsentChange('marketing', checked)}
                    disabled
                  />
                </div>
              </div>

              <Separator />

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
                <Button variant="outline" onClick={() => setShowCookieSettings(false)}>
                  Cancel
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => {
                    cookieManager.rejectAll();
                    setShowCookieSettings(false);
                  }}>
                    Reject All
                  </Button>
                  <Button onClick={() => {
                    cookieManager.acceptAll();
                    setShowCookieSettings(false);
                  }}>
                    Accept All
                  </Button>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GDPRConsentBanner;