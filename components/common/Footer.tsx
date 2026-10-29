'use client';
import React, { useEffect, useState } from 'react';
import { FooterData } from '@/types/templates.types';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaAngleDoubleRight, FaArrowUp, FaTwitter } from 'react-icons/fa';

const renderSocialIcon = (iconName: string) => {
  switch (iconName) {
    case 'FaFacebookF': return <FaFacebookF />;
    case 'FaInstagram': return <FaInstagram />;
    case 'FaLinkedinIn': return <FaLinkedinIn />;
    case 'FaYoutube': return <FaYoutube />;
    case 'FaTwitter': return <FaTwitter />;
    default: return <FaFacebookF />;
  }
};

export const Footer = ({ data }: { data?: FooterData }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!data) return null;

  return (
    <footer className="w-full relative bg-footer-navy">

      {/* Main Content Area */}
      <div className="py-12 lg:py-16 relative z-10">
        <div className="max-w-[1300px] mx-auto px-4 md:px-6 lg:px-8">

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between">

            {/* Column 1: Brand & Social */}
            <div className="lg:w-[30%] lg:pr-10">
              <img src={data.logo} alt={data.logoAlt} className="h-24 object-contain mb-6" />
              <p className="text-gray-300 text-size-15 leading-relaxed mb-8">
                {data.description}
              </p>
              <div className="flex items-center gap-3">
                {data.socialLinks?.map(social => (
                  <Link 
                    key={social.id} 
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded border border-gray-400 flex items-center justify-center text-white hover:bg-brand hover:border-brand transition-all"
                  >
                    {renderSocialIcon(social.icon)}
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="lg:w-[20%] lg:border-l lg:border-white/10 lg:pl-10">
              <h3 className="text-xl font-bold text-white mb-6">{data.quickLinksTitle}</h3>
              <div className="w-10 h-1 bg-brand mb-8"></div>
              <ul className="flex flex-col gap-4">
                {data.quickLinks.map(link => (
                  <li key={link.id}>
                    <Link href={link.url} className="text-gray-300 text-size-15 hover:text-brand transition-colors flex items-center gap-3">
                      <FaAngleDoubleRight className="text-brand text-sm" /> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Our Services */}
            <div className="lg:w-[25%] lg:border-l lg:border-white/10 lg:pl-10">
              <h3 className="text-xl font-bold text-white mb-6">{data.servicesTitle}</h3>
              <div className="w-10 h-1 bg-brand mb-8"></div>
              <ul className="flex flex-col gap-4">
                {data.servicesLinks.map(link => (
                  <li key={link.id}>
                    <Link href={link.url} className="text-gray-300 text-size-15 hover:text-brand transition-colors flex items-center gap-3">
                      <FaAngleDoubleRight className="text-brand text-sm" /> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Us */}
            <div className="lg:w-[25%] lg:border-l lg:border-white/10 lg:pl-10">
              <h3 className="text-xl font-bold text-white mb-6">{data.contactTitle}</h3>
              <div className="w-10 h-1 bg-brand mb-8"></div>
              <ul className="flex flex-col gap-6">
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-white shrink-0">
                    <FaEnvelope size={14} />
                  </div>
                  <span className="text-gray-300 text-size-15">{data.contactInfo.email}</span>
                </li>
                <li className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-white shrink-0">
                    <FaPhoneAlt size={14} />
                  </div>
                  <span className="text-gray-300 text-size-15">{data.contactInfo.phone}</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-white shrink-0 mt-1">
                    <FaMapMarkerAlt size={14} />
                  </div>
                  <span className="text-gray-300 text-size-15 leading-relaxed">{data.contactInfo.address}</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-brand py-5">
        <div className="max-w-[1250px] mx-auto px-4 md:px-6 lg:px-8 flex flex-col justify-center items-center text-center">
          <p className="text-white text-sm">
            {data.copyrightText}
          </p>
        </div>
      </div>

      {/* Fixed Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center shadow-[0_4px_14px_rgba(13,101,255,0.4)] hover:bg-brand-hover-dark hover:-translate-y-1 transition-all duration-300 animate-fade-in"
          aria-label={data.scrollTopLabel}
        >
          <FaArrowUp />
        </button>
      )}

    </footer>
  );
};
