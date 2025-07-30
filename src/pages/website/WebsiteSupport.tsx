import React from 'react';
import { useTranslation } from 'react-i18next';
import WebsiteLayout from '@/components/website/WebsiteLayout';
import WebsiteFAQ from './WebsiteFAQ';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import GDPRConsentBanner from '@/components/GDPRConsentBanner';

const WebsiteSupport = () => {
  const { t } = useTranslation();

  const seoConfig = {
    title: 'Support & Contact - TIM Personal Servers',
    description: 'Get help with your TIM personal server. FAQ, contact information, and support resources.',
    keywords: 'TIM support, personal server help, contact TIM, FAQ',
    type: 'website' as const
  };

  return (
    <WebsiteLayout seo={seoConfig}>
      <div className="space-y-16 py-8">
        {/* Header */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Support & Contact
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're here to help you get the most out of your TIM personal server
            </p>
          </div>
        </section>

        {/* Contact Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email Support</h3>
                  <p className="text-sm text-muted-foreground">support@tim.local</p>
                  <p className="text-xs text-muted-foreground">24-48 hour response</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Phone Support</h3>
                  <p className="text-sm text-muted-foreground">+353 1 234 5678</p>
                  <p className="text-xs text-muted-foreground">Mon-Fri 9AM-6PM GMT</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Address</h3>
                  <p className="text-sm text-muted-foreground">Cork, Ireland</p>
                  <p className="text-xs text-muted-foreground">EU-based support</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Business Hours</h3>
                  <p className="text-sm text-muted-foreground">Mon-Fri 9AM-6PM</p>
                  <p className="text-xs text-muted-foreground">GMT timezone</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Form */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" rows={5} placeholder="Tell us more about your question or issue..." />
              </div>
              <Button className="w-full">Send Message</Button>
            </CardContent>
          </Card>
        </section>

        {/* FAQ Section */}
        <WebsiteFAQ />
      </div>
      
      <GDPRConsentBanner />
    </WebsiteLayout>
  );
};

export default WebsiteSupport;