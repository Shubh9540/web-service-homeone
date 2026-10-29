import React from 'react';
import { WebserviceTemplateData } from '@/types/templates.types';
import rawData from '@/data/templates.json';
import { Header } from '@/components/common/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutUsSection } from '@/components/sections/AboutUsSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { CounterSection } from '@/components/sections/CounterSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TechnologiesSection } from '@/components/sections/TechnologiesSection';
import { TestimonialSection } from '@/components/sections/TestimonialSection';

import { GallerySection } from '@/components/sections/GallerySection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/common/Footer';

export const dynamic = 'force-dynamic';

export default function Home() {
  const templateData: WebserviceTemplateData = rawData;
  const sectionData = templateData?.categories?.Webservice?.sections;
  const commonData = templateData?.common;

  if (!sectionData || !commonData) return null;

  return (
    <main className="bg-[var(--color-bg-main)] min-h-screen flex flex-col scroll-smooth">
      {/* Header overlaps Hero via absolute positioning */}
      <div id="home" className="relative">
        <Header data={sectionData.Header?.variants?.WebserviceHeader2} />
        <HeroSection data={sectionData.Hero?.variants?.WebserviceHero2} />
      </div>
      <div id="services">
        <ServicesSection data={sectionData.Services?.variants?.WebserviceServices2} isSlider={true} />
      </div>
      <div id="about">
        <AboutUsSection data={sectionData.AboutUs?.variants?.WebserviceAboutUs2} />
      </div>
      <div id="portfolio">
        <PortfolioSection data={sectionData.Portfolio?.variants?.WebservicePortfolio2} />
      </div>
      <div id="gallery">
        <GallerySection data={sectionData.Gallery?.variants?.WebserviceGallery2} />
      </div>
      <CounterSection data={sectionData.Counter?.variants?.WebserviceCounter2} />
      <div id="process">
        <ProcessSection data={sectionData.Process?.variants?.WebserviceProcess2} />
      </div>
      <div id="technologies">
        <TechnologiesSection data={sectionData.Technologies?.variants?.WebserviceTechnologies2} />
      </div>
      <div id="testimonials">
        <TestimonialSection data={sectionData.Testimonials?.variants?.WebserviceTestimonials2} />
      </div>
      <div id="contact">
        <ContactSection data={sectionData.Contact?.variants?.WebserviceContact2} />
      </div>
      <Footer data={commonData.Footer} />
    </main>
  );
}
