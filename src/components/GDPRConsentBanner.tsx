import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Shield, Eye, Download, Trash2 } from "lucide-react";
import { useGDPRCompliance } from "@/hooks/useGDPRCompliance";

const GDPRConsentBanner = () => {
  const { gdprState, giveConsent, withdrawConsent, requestDataDeletion, getDataPortability, consentRequired } = useGDPRCompliance();
  const [showBanner, setShowBanner] = useState(false);
  const [showPrivacyCenter, setShowPrivacyCenter] = useState(false);

  useEffect(() => {
    setShowBanner(consentRequired);
  }, [consentRequired]);

  const handleAcceptConsent = () => {
    giveConsent();
    setShowBanner(false);
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
                  <h3 className="font-semibold text-foreground mb-2">Privacy & Data Protection</h3>
                  <p className="text-sm text-muted-foreground">
                    T.I.M respects your privacy. We collect minimal data (device serial, email, password) for authentication only. 
                    We comply with GDPR and you have full control over your data.
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
                  <Button onClick={handleAcceptConsent} size="sm">
                    Accept & Continue
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
    </>
  );
};

export default GDPRConsentBanner;