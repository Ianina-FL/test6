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
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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

  const faqs = [
    {
      question: 'What is ${projectName} and how does it work?',
      answer:
        '${projectName} is an all-in-one event management platform that helps you organize and manage events efficiently. It offers features like venue booking, vendor coordination, and guest management.',
    },
    {
      question: 'Can I try ${projectName} before purchasing?',
      answer:
        'Yes, we offer a free trial period for new users to explore the features and see how ${projectName} can benefit their event planning process.',
    },
    {
      question: 'How secure is my data with ${projectName}?',
      answer:
        'We prioritize your data security and use advanced encryption methods to protect your information. Your data is safe with us.',
    },
    {
      question: 'What support options are available if I need help?',
      answer:
        'Our support team is available via email and live chat to assist you with any questions or issues you may encounter while using ${projectName}.',
    },
    {
      question: 'Can I customize the features in ${projectName}?',
      answer:
        'Absolutely! ${projectName} offers customizable options to tailor the platform to your specific event needs, ensuring a personalized experience.',
    },
    {
      question: 'Is there a mobile version of ${projectName}?',
      answer:
        'Yes, ${projectName} offers a mobile app that allows you to manage your events on the go, providing flexibility and convenience.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions - ${projectName}`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about ${projectName}. Learn more about our features, pricing, and how we can help you manage your events.`}
        />
      </Head>
      <WebSiteHeader projectName={'test6'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'test6'}
          image={['Find answers quickly']}
          mainText={`Your Questions Answered with ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your questions about ${projectName}. We're here to help you make the most of our platform.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Explore FAQs`}
        />

        <FaqSection
          projectName={'test6'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'test6'}
          design={ContactFormDesigns.HIGHLIGHTED_DIVERSITY || ''}
          image={['Send us your queries']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`We're here to assist you with any questions or concerns. Contact us anytime, and our team will respond promptly to help you.`}
        />
      </main>
      <WebSiteFooter projectName={'test6'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
