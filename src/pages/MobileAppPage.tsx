import AdvancedMobileIntegration from "@/components/AdvancedMobileIntegration";

const MobileAppPage = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Mobile App Integration</h1>
          <p className="text-muted-foreground mt-2">
            Pair your mobile device with TIM for remote access and control
          </p>
        </div>
        <AdvancedMobileIntegration />
      </div>
    </div>
  );
};

export default MobileAppPage;