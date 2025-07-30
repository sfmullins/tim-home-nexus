import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import FileServer from "./components/modules/FileServer";
import SmartHome from "./components/modules/SmartHome";
import Downloads from "./components/modules/Downloads";
import GameStreaming from "./components/modules/GameStreaming";
import VpnAccess from "./components/modules/VpnAccess";
import GDPRConsentBanner from "./components/GDPRConsentBanner";
import WebsiteLayout from "./components/website/WebsiteLayout";
import WebsiteHome from "./pages/website/WebsiteHome";
import WebsiteStore from "./pages/website/WebsiteStore";
import WebsiteConfigure from "./pages/website/WebsiteConfigure";
import WebsiteSuccess from "./pages/website/WebsiteSuccess";
import WebsiteSupport from "./pages/website/WebsiteSupport";
import WebsiteAbout from "./pages/website/WebsiteAbout";
import WebsiteFAQ from "./pages/website/WebsiteFAQ";
import WebsiteBlog from "./pages/website/WebsiteBlog";
import ProductSpecs from "./components/website/ProductSpecs";
import { LocaleProvider } from "./contexts/LocaleContext";
import { ConfigurationProvider } from "./contexts/ConfigurationContext";
import { HelmetProvider } from 'react-helmet-async';
import "./i18n";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <LocaleProvider>
        <ConfigurationProvider>
          <TooltipProvider>
        <Toaster />
        <Sonner />
        <GDPRConsentBanner />
        <BrowserRouter>
          <Routes>
            {/* App Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/files" element={<FileServer />} />
            <Route path="/smart-home" element={<SmartHome />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/game-streaming" element={<GameStreaming />} />
            <Route path="/vpn-access" element={<VpnAccess />} />
            
            {/* Website Routes */}
            <Route path="/website" element={
              <WebsiteLayout>
                <WebsiteHome />
              </WebsiteLayout>
            } />
            <Route path="/website/store" element={
              <WebsiteLayout>
                <WebsiteStore />
              </WebsiteLayout>
            } />
            <Route path="/website/configure" element={
              <WebsiteLayout>
                <WebsiteConfigure />
              </WebsiteLayout>
            } />
            <Route path="/website/about" element={
              <WebsiteLayout>
                <WebsiteAbout />
              </WebsiteLayout>
            } />
            <Route path="/website/support" element={<WebsiteSupport />} />
            <Route path="/website/faq" element={
              <WebsiteLayout>
                <WebsiteFAQ />
              </WebsiteLayout>
            } />
            <Route path="/website/blog" element={
              <WebsiteLayout>
                <WebsiteBlog />
              </WebsiteLayout>
            } />
            <Route path="/website/blog/:slug" element={
              <WebsiteLayout>
                <div className="max-w-4xl mx-auto px-4 py-16">
                  <h1 className="text-4xl font-bold mb-8">Blog Post</h1>
                  <p className="text-lg text-muted-foreground">Blog post content coming soon...</p>
                </div>
              </WebsiteLayout>
            } />
            <Route path="/website/specs" element={
              <WebsiteLayout>
                <ProductSpecs />
              </WebsiteLayout>
            } />
            <Route path="/website/success" element={<WebsiteSuccess />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </ConfigurationProvider>
    </LocaleProvider>
  </HelmetProvider>
</QueryClientProvider>
);

export default App;
