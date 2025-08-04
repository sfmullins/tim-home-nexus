import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CloudPricingComparison from "@/components/CloudPricingComparison";
import LocalFirstDocumentation from "@/components/LocalFirstDocumentation";
import { TrendingUp, FileText } from "lucide-react";

const SavingsCalculatorPage = () => {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Savings & Documentation</h1>
          <p className="text-muted-foreground mt-2">
            Compare cloud storage costs and understand TIM's local-first approach
          </p>
        </div>

        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Savings Calculator
            </TabsTrigger>
            <TabsTrigger value="documentation" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Local-First Docs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="mt-6">
            <CloudPricingComparison />
          </TabsContent>

          <TabsContent value="documentation" className="mt-6">
            <LocalFirstDocumentation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SavingsCalculatorPage;