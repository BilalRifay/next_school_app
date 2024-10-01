'use client'

import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FooterText = ({ slogan, tagline }) => (

  <p className="mt-4 text-center lg:text-left">
    {slogan} <br /> {tagline}
  </p>
);

const SocialLinks = () => (
  <div className="flex justify-center lg:justify-start mt-4 space-x-4">
    <a href="https://facebook.com" className="text-gray-700">
      <Facebook className="w-6 h-6" />
    </a>
    <a href="https://twitter.com" className="text-gray-700">
      <Twitter className="w-6 h-6" />
    </a>
    <a href="https://instagram.com" className="text-gray-700">
      <Instagram className="w-6 h-6" />
    </a>
    <a href="https://youtube.com" className="text-gray-700">
      <Youtube className="w-6 h-6" />
    </a>
  </div>
);

const FooterSection = ({ title, links }) => (
  <div>
    <h3 className="font-bold text-blue-900">{title}</h3>
    <ul className="mt-4 space-y-2">
      {links.map((link, idx) => (
        <li key={idx}>
          <a href={link.href} className="hover:text-blue-800">
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const ContactInfo = ({ address, phoneNumbers, email }) => (
  <div className="mt-8 lg:mt-0 text-center lg:text-left">
    <h3 className="font-bold text-blue-900">Contact Us</h3>
    <ul className="mt-4 space-y-2">
      <li>
        <p>{address}</p>
      </li>
      {phoneNumbers.map((number, index) => (
        <li key={index}>
          <p>{number}</p>
        </li>
      ))}
      <li>
        <p>{email}</p>
      </li>
    </ul>
  </div>
);

const FooterCopyright = ({ text, company }) => (
  <div className="mt-8 border-t-2 border-gray-200 pt-8 text-center">
    <p>
      {text} <br />
      <strong className="font-bold text-blue-900">{company}</strong>
    </p>
  </div>
);

const Footer = () => {
  const { t } = useTranslation();

  const footerSections = [
    {
      title: t('footer.about'),
      links: [
        { href: '/', text: t('footer.home') },
        { href: '/about', text: t('footer.about') },
        { href: '/admission', text: t('footer.admission') },
        { href: '/contact', text: t('footer.contact') },
      ],
    },
    {
      title: t('footer.academics'),
      links: [
        { href: '/academics', text: t('footer.academics') },
        { href: '/event', text: t('footer.events') },
        { href: '/curriculum', text: t('footer.curriculum') },
      ],
    },
    {
      title: t('footer.admin'),
      links: [
        { href: '/admin', text: t('footer.adminDashboard') },
        { href: '/admin/classes', text: t('footer.classes') },
        { href: '/admin/students', text: t('footer.students') },
        { href: '/admin/subjects', text: t('footer.subjects') },
      ],
    },
  ];

  const contactInfo = {
    address: t('footer.address'),
    phoneNumbers: ['99620 20000', '044 – 24939202 / 203'],
    email: 'contact@newleaf.com',
  };

  const footerCopyright = {
    text: t('footer.copyrightText'),
    company: "mbk developer Group's",
  };

  return (
    <div>
      <footer className="bg-gray-100 text-gray-600 py-8">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="mb-8 lg:mb-0 lg:w-1/3">
              <img src={t('footerimages.logo3')} alt={t('footer.logoAlt')} className="w-32 lg:w-28 mx-auto lg:mx-0"/>
              <FooterText slogan={t('footer.slogan')} tagline={t('footer.tagline')} />
              <SocialLinks />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 text-center lg:text-left">
              {footerSections.map((section, index) => (
                <FooterSection key={index} title={section.title} links={section.links} />
              ))}
            </div>
            <ContactInfo
              address={contactInfo.address}
              phoneNumbers={contactInfo.phoneNumbers}
              email={contactInfo.email}
            />
          </div>
          <FooterCopyright text={footerCopyright.text} company={footerCopyright.company} />
        </div>
      </footer>
    </div>
  );
};

export default Footer;