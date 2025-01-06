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
  PricingDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  ContactFormDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

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

  const pricing_features = {
    standard: {
      features: ['Venue Booking', 'Vendor Management', 'Guest Engagement'],
      limited_features: ['Basic Budget Control', 'Limited Schedule Planning'],
    },
    premium: {
      features: [
        'Venue Booking',
        'Vendor Management',
        'Guest Engagement',
        'Advanced Budget Control',
      ],
      also_included: ['Comprehensive Schedule Planning', 'Priority Support'],
    },
    business: {
      features: [
        'Venue Booking',
        'Vendor Management',
        'Guest Engagement',
        'Advanced Budget Control',
        'Comprehensive Schedule Planning',
        'Real-Time Analytics',
        'Dedicated Account Manager',
      ],
    },
  };

  const description = {
    standard:
      'The Standard plan is perfect for individuals or small event organizers who need essential tools to manage their events efficiently.',
    premium:
      'The Premium plan is ideal for small businesses or agencies looking for advanced features and priority support to enhance their event management capabilities.',
    business:
      'The Business plan is designed for enterprises that require a comprehensive suite of features, real-time analytics, and dedicated support for large-scale event management.',
  };

  const features_points = [
    {
      name: 'Venue Insights',
      description:
        'Gain access to detailed information about venues, including size, amenities, and availability, to make informed decisions for your event.',
      icon: 'mdiMapSearch',
    },
    {
      name: 'Vendor Management',
      description:
        'Easily coordinate with vendors, manage contracts, and track service delivery to ensure everything runs smoothly on the day of the event.',
      icon: 'mdiAccountSupervisor',
    },
    {
      name: 'Guest Engagement',
      description:
        'Keep your guests informed and engaged with personalized invitations, RSVP tracking, and real-time updates about the event.',
      icon: 'mdiEmailOpen',
    },
    {
      name: 'Budget Control',
      description:
        'Monitor your event expenses with our budget control tools. Set limits, track payments, and generate reports to stay on top of your finances.',
      icon: 'mdiCurrencyUsd',
    },
    {
      name: 'Schedule Planning',
      description:
        'Plan every detail of your event schedule, from vendor arrivals to guest activities, ensuring a seamless and well-organized event.',
      icon: 'mdiCalendarClock',
    },
    {
      name: 'Real-Time Analytics',
      description:
        'Access real-time data and analytics to make informed decisions and optimize your event planning process for better outcomes.',
      icon: 'mdiChartLine',
    },
  ];

  const testimonials = [
    {
      text: '${projectName} has transformed our event planning process. The intuitive interface and comprehensive features make it a must-have tool.',
      company: 'Event Masters Co.',
      user_name: 'Alice Green, Event Specialist',
    },
    {
      text: 'Our team loves using ${projectName}. It simplifies the entire process, from vendor coordination to guest management, making our events seamless.',
      company: 'Celebration Creators',
      user_name: 'Bob White, Operations Manager',
    },
    {
      text: "Thanks to ${projectName}, we can focus more on creativity and less on logistics. It's an essential part of our event planning toolkit.",
      company: 'Innovative Events',
      user_name: 'Cathy Brown, Creative Director',
    },
    {
      text: 'The real-time analytics feature in ${projectName} has been invaluable for optimizing our events. We can make data-driven decisions quickly.',
      company: 'Data-Driven Events',
      user_name: 'David Black, Data Analyst',
    },
    {
      text: "With ${projectName}, we have everything we need in one place. It's efficient, reliable, and has improved our event management significantly.",
      company: 'Efficient Events Ltd.',
      user_name: 'Emma Blue, Event Coordinator',
    },
    {
      text: 'The support team at ${projectName} is fantastic. They are always ready to help and ensure we get the most out of the platform.',
      company: 'Supportive Events',
      user_name: 'Frank Silver, Customer Support Lead',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Flexible Pricing Plans - ${projectName}`}</title>
        <meta
          name='description'
          content={`Explore our competitive pricing plans designed to suit your event management needs. Choose the right plan for you and start organizing events effortlessly with ${projectName}.`}
        />
      </Head>
      <WebSiteHeader projectName={'test6'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'test6'}
          image={['Flexible pricing options available']}
          mainText={`Choose Your Perfect ${projectName} Plan`}
          subTitle={`Discover flexible pricing options tailored to your event management needs. With ${projectName}, find the right plan to streamline your events effortlessly.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`View Plans`}
        />

        <PricingSection
          projectName={'test6'}
          withBg={0}
          features={pricing_features}
          description={description}
        />

        <FeaturesSection
          projectName={'test6'}
          image={['Efficient event planning tools']}
          withBg={1}
          features={features_points}
          mainText={`Explore ${projectName} Key Features`}
          subTitle={`Unlock the full potential of your events with ${projectName}. Our features are designed to simplify and streamline every aspect of your event.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'test6'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`What Our Clients Say About ${projectName} `}
        />

        <ContactFormSection
          projectName={'test6'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Reach out for inquiries']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`Have questions about our pricing plans or need assistance? Contact us anytime, and our team will respond promptly to help you.`}
        />
      </main>
      <WebSiteFooter projectName={'test6'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
