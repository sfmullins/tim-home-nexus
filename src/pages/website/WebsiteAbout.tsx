import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Server, Users, Zap, Lock, Heart } from 'lucide-react';

const WebsiteAbout = () => {
  const { t } = useTranslation();

  const values = [
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Your data belongs to you. TIM operates entirely on your premises with no cloud dependencies or data collection.'
    },
    {
      icon: Shield,
      title: 'No Subscriptions',
      description: 'One purchase, lifetime ownership. No monthly fees, no service interruptions, no forced obsolescence.'
    },
    {
      icon: Server,
      title: 'Self-Sovereign',
      description: 'Complete control over your digital infrastructure. Install what you want, when you want, how you want.'
    },
    {
      icon: Zap,
      title: 'Resource Efficient',
      description: 'Designed for 24/7 operation with minimal power consumption. Green computing that respects the environment.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built by users, for users. Open source components with an active community of contributors.'
    },
    {
      icon: Heart,
      title: 'Made in Ireland',
      description: 'Proudly designed and assembled in Dublin, Ireland. Supporting local jobs and European technology independence.'
    }
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Concept & Design',
      description: 'Founded in Dublin with a vision to give people back control of their digital lives.'
    },
    {
      year: '2025',
      title: 'Development & Testing',
      description: 'Building and refining TIM with feedback from beta testers and the open source community.'
    },
    {
      year: '2026',
      title: 'Launch & Scale',
      description: 'Public launch with four product tiers. Pre-orders start January 1st, shipping Q2 2026.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 mb-16">
        <Badge variant="outline" className="text-sm">Made in Ireland 🇮🇪</Badge>
        <h1 className="text-5xl font-bold text-foreground">About TIM</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          We believe in a future where you own your digital infrastructure. No cloud dependencies, 
          no subscriptions, no compromise. Just pure, self-sovereign computing.
        </p>
      </div>

      {/* Mission Statement */}
      <Card className="mb-16 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            To democratize personal server technology and give everyone the tools to reclaim ownership 
            of their digital lives. TIM represents freedom from corporate surveillance, subscription 
            fatigue, and planned obsolescence.
          </p>
        </CardContent>
      </Card>

      {/* Values Grid */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Company Timeline */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">Our Journey</h2>
        <div className="space-y-8">
          {timeline.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">{item.year}</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <Card className="mb-16">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">0</div>
              <div className="text-muted-foreground">Monthly Fees</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Data Ownership</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">6W</div>
              <div className="text-muted-foreground">Min Power Usage</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">∞</div>
              <div className="text-muted-foreground">Software Updates</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Get in Touch</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Have questions about TIM or want to learn more about our mission?
          </p>
          <div className="space-y-2">
            <p><strong>Email:</strong> hello@thisismine.io</p>
            <p><strong>Support:</strong> support@thisismine.io</p>
            <p><strong>Address:</strong> Dublin, Ireland</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteAbout;