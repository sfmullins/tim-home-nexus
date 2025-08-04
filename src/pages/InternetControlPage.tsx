import InternetControl from "@/components/InternetControl";

const InternetControlPage = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Internet Access Control</h1>
          <p className="text-muted-foreground mt-2">
            Manage TIM's internet connectivity and monitor network security
          </p>
        </div>
        <InternetControl />
      </div>
    </div>
  );
};

export default InternetControlPage;