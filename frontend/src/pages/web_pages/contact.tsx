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
  AboutUsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

import AboutUsSection from '../../components/WebPageComponents/AboutUsComponent';

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
      question: 'How do I get started with ${projectName}?',
      answer:
        'To get started, simply sign up for an account on our website. Once registered, you can begin exploring the features and setting up your first event.',
    },
    {
      question: 'What types of events can I manage with ${projectName}?',
      answer:
        '${projectName} is versatile and can be used to manage a wide range of events, from small private gatherings to large corporate functions.',
    },
    {
      question: 'Is there a mobile version of ${projectName}?',
      answer:
        'Yes, ${projectName} offers a mobile app that allows you to manage your events on the go, providing flexibility and convenience.',
    },
    {
      question: 'Can I customize the features in ${projectName}?',
      answer:
        'Absolutely! ${projectName} offers customizable options to tailor the platform to your specific event needs, ensuring a personalized experience.',
    },
    {
      question: 'What support options are available if I need help?',
      answer:
        'Our support team is available via email and live chat to assist you with any questions or issues you may encounter while using ${projectName}.',
    },
    {
      question: 'How secure is my data with ${projectName}?',
      answer:
        'We prioritize your data security and use advanced encryption methods to ensure that all your information is safe and protected.',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Contact Us - Get in Touch with ${projectName}`}</title>
        <meta
          name='description'
          content={`Reach out to ${projectName} for any inquiries or support. Our team is here to assist you with all your event management needs.`}
        />
      </Head>
      <WebSiteHeader projectName={'test6'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'test6'}
          image={['Reach out for assistance']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`We're here to help you with all your event management needs. Contact ${projectName} for support, inquiries, or feedback.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Contact Us Now`}
        />

        <FaqSection
          projectName={'test6'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />

        <AboutUsSection
          projectName={'test6'}
          image={['Our mission and vision']}
          mainText={`Discover the Vision Behind ${projectName}`}
          subTitle={`At ${projectName}, we are dedicated to revolutionizing event management. Our mission is to provide a seamless, all-in-one solution for organizing events of any size.`}
          design={AboutUsDesigns.IMAGE_LEFT || ''}
          buttonText={`Learn More About Us`}
        />

        <ContactFormSection
          projectName={'test6'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Send us a message']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`We're available to assist you with any questions or concerns. Expect a prompt response from our dedicated team.`}
        />
      </main>
      <WebSiteFooter projectName={'test6'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
