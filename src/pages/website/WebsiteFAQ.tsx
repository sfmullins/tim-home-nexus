import React from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Phone } from 'lucide-react';

const WebsiteFAQ = () => {
  const { t } = useTranslation();

  const faqData = [
    {
      id: 'what-is-tim',
      question: 'What is TIM?',
      answer: 'TIM (This is Mine) is a personal server solution that gives you complete ownership of your digital infrastructure. No cloud dependencies, no subscriptions, no compromise.'
    },
    {
      id: 'hardware-specs',
      question: 'What are the hardware specifications?',
      answer: 'TIM comes in 4 configurations: Tiny TIM (N97, 8GB RAM), Just TIM (N100, 16GB RAM), TIM Pro (N200, 24GB RAM), and TIM Max (Ryzen 5, 64GB RAM). All include NVMe storage and support various upgrades.'
    },
    {
      id: 'software-included',
      question: 'What software is included?',
      answer: 'All TIM units include File Server, Smart Home controls, and VPN Access. Higher tiers add Game Streaming, Downloads management, and optional Jailbreak for complete customization.'
    },
    {
      id: 'setup-difficulty',
      question: 'How difficult is setup?',
      answer: 'TIM is designed for easy setup. Initial configuration takes about 15 minutes using our mobile-first interface. Most users are up and running within 30 minutes.'
    },
    {
      id: 'power-consumption',
      question: 'What about power consumption?',
      answer: 'TIM units are designed for 24/7 operation with minimal power usage. Tiny TIM uses ~6W, Just TIM ~8W, TIM Pro ~12W, and TIM Max ~25W under typical loads.'
    },
    {
      id: 'remote-access',
      question: 'Can I access TIM remotely?',
      answer: 'Yes! TIM includes VPN access for secure remote connections. Access your files, control smart home devices, and manage downloads from anywhere.'
    },
    {
      id: 'data-privacy',
      question: 'How is my data protected?',
      answer: 'Your data never leaves your premises unless you explicitly choose to share it. TIM operates entirely offline with optional encrypted connections for remote access.'
    },
    {
      id: 'game-streaming',
      question: 'How does game streaming work?',
      answer: 'Game streaming allows you to play PC games remotely on mobile devices or lower-powered computers. Available on Just TIM and higher with 50% discount when purchased with hardware.'
    },
    {
      id: 'warranty-support',
      question: 'What warranty and support is included?',
      answer: '2-year hardware warranty, lifetime software updates, and email support. Premium support plans available for business users.'
    },
    {
      id: 'shipping-timeline',
      question: 'When does shipping start?',
      answer: 'Pre-orders begin January 1st, 2026 with 50% deposit. Shipping starts Q2 2026. Join our waitlist for early access and updates.'
    },
    {
      id: 'jailbreak-explained',
      question: 'What is Jailbreak?',
      answer: 'Jailbreak removes software restrictions, allowing you to install any operating system or software. Available for €350 on TIM Pro, included free with TIM Max.'
    },
    {
      id: 'egpu-support',
      question: 'Does TIM support external GPUs?',
      answer: 'TIM Max supports external GPUs (RTX 3xxx-5xxx series) via Thunderbolt connection for enhanced gaming and AI workloads.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-foreground">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground">
          Everything you need to know about TIM
        </p>
      </div>

      <div className="space-y-8">
        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq) => (
            <AccordionItem 
              key={faq.id} 
              value={faq.id}
              className="border border-border rounded-lg bg-card px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold text-foreground">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-center">Still have questions?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <Mail className="h-8 w-8 mx-auto text-primary" />
                <h3 className="font-semibold">Email Support</h3>
                <p className="text-sm text-muted-foreground">support@thisismine.io</p>
                <Button variant="outline" size="sm">Send Email</Button>
              </div>
              <div className="space-y-2">
                <MessageCircle className="h-8 w-8 mx-auto text-primary" />
                <h3 className="font-semibold">Community</h3>
                <p className="text-sm text-muted-foreground">Join our Discord</p>
                <Button variant="outline" size="sm">Join Discord</Button>
              </div>
              <div className="space-y-2">
                <Phone className="h-8 w-8 mx-auto text-primary" />
                <h3 className="font-semibold">Phone Support</h3>
                <p className="text-sm text-muted-foreground">Premium customers</p>
                <Button variant="outline" size="sm">Learn More</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WebsiteFAQ;