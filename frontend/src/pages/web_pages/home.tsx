import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  FaqDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'test6';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/services',
      label: 'services',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/pricing',
      label: 'pricing',
    },
  ];

  const features_points = [
    {
      name: 'Venue Booking',
      description:
        'Easily book and manage venues for your events. Check availability, compare features, and secure the perfect location with just a few clicks.',
      icon: 'mdiMapMarker',
    },
    {
      name: 'Vendor Coordination',
      description:
        'Keep track of all your vendors in one place. Manage schedules, communicate updates, and ensure seamless service delivery for your events.',
      icon: 'mdiHandshake',
    },
    {
      name: 'Guest Management',
      description:
        'Efficiently manage guest lists and RSVPs. Track attendance, meal preferences, and special requests to ensure a personalized experience for every guest.',
      icon: 'mdiAccountGroup',
    },
  ];

  const testimonials = [
    {
      text: "Using ${projectName} has transformed the way we manage events. It's intuitive and saves us so much time. Highly recommend!",
      company: 'Event Solutions Inc.',
      user_name: 'Jane Doe, Event Coordinator',
    },
    {
      text: '${projectName} is a game-changer for our team. The seamless integration of all event aspects makes planning a breeze.',
      company: 'Corporate Gatherings Ltd.',
      user_name: 'John Smith, Senior Event Manager',
    },
    {
      text: 'Thanks to ${projectName}, our events run smoother than ever. The guest management feature is particularly impressive.',
      company: 'Celebration Planners',
      user_name: 'Emily Johnson, Lead Planner',
    },
    {
      text: "I love how ${projectName} simplifies vendor coordination. It's a must-have tool for any event manager.",
      company: 'Party Pros',
      user_name: 'Michael Brown, Vendor Manager',
    },
    {
      text: "The budgeting tools in ${projectName} have helped us keep our events on track financially. It's an invaluable resource.",
      company: 'Budget Events Co.',
      user_name: 'Sarah Lee, Finance Officer',
    },
    {
      text: "Our guests appreciate the personalized experience we can offer thanks to ${projectName}. It's a fantastic platform.",
      company: 'Elegant Affairs',
      user_name: 'David Wilson, Guest Relations',
    },
  ];

  const faqs = [
    {
      question: 'What features does ${projectName} offer for event management?',
      answer:
        '${projectName} provides comprehensive tools for venue booking, vendor coordination, guest management, and budget tracking, all in one platform.',
    },
    {
      question: 'How can I manage my event budget with ${projectName}?',
      answer:
        'You can track all payments and expenses, set budget limits, and generate financial reports to ensure your event stays within budget.',
    },
    {
      question: 'Is ${projectName} suitable for both small and large events?',
      answer:
        'Yes, ${projectName} is designed to handle events of all sizes, from intimate gatherings to large corporate affairs, with ease and efficiency.',
    },
    {
      question: 'Can I customize the invitations and RSVPs for my guests?',
      answer:
        'Absolutely! ${projectName} allows you to personalize invitations and track RSVPs, including meal preferences and special requests.',
    },
    {
      question: 'How does ${projectName} help with vendor management?',
      answer:
        'You can easily manage vendor schedules, update availability, and communicate changes, ensuring seamless coordination for your event.',
    },
    {
      question: 'Is there a mobile app for ${projectName}?',
      answer:
        'Yes, ${projectName} offers a mobile app that allows you to manage your events on the go, providing flexibility and convenience.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`All-in-One Event Management Solution`}</title>
        <meta
          name='description'
          content={`Effortlessly manage events with our comprehensive platform, featuring venue booking, vendor coordination, guest tracking, and budget management.`}
        />
      </Head>
      <WebSiteHeader projectName={'test6'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'test6'}
          image={['Event planning made simple']}
          mainText={`Effortlessly Manage Events with ${projectName}`}
          subTitle={`Discover the ultimate solution for seamless event planning. ${projectName} helps you coordinate venues, vendors, guests, and budgets all in one place.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Get Started Now`}
        />

        <FeaturesSection
          projectName={'test6'}
          image={['Streamlined event management tools']}
          withBg={0}
          features={features_points}
          mainText={`Explore ${projectName} Key Features`}
          subTitle={`Unlock the full potential of your events with ${projectName}. Streamline planning, coordination, and management effortlessly.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'test6'}
          design={TestimonialsDesigns.HORIZONTAL_CAROUSEL || ''}
          testimonials={testimonials}
          mainText={`What Our Users Say About ${projectName} `}
        />

        <FaqSection
          projectName={'test6'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'test6'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Contact us for support']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have questions or need assistance? Contact us anytime, and our team will respond promptly to help you with your event management needs.`}
        />
      </main>
      <WebSiteFooter projectName={'test6'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
