'use client';

import React from 'react';
import { ContactData } from '@/types/templates.types';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaArrowRight } from 'react-icons/fa';

export const ContactSection = ({ data }: { data?: ContactData }) => {
  if (!data) return null;

  return (
    <section className="w-full py-8 lg:py-12 bg-white relative overflow-hidden">

      {/* Background Shapes for the entire section or form area */}
      <div className="pointer-events-none absolute left-0 top-[60%] h-[600px] w-[600px] -translate-x-1/2 translate-y-[-50%] rounded-full bg-surface-blue opacity-60 blur-[100px]" />
      <div className="pointer-events-none absolute right-0 top-[80%] h-[600px] w-[600px] translate-x-1/3 translate-y-[-50%] rounded-full bg-surface-blue opacity-60 blur-[100px]" />

      {/* Dot Grid Top Right */}
      <div className="pointer-events-none absolute right-10 top-20 grid grid-cols-6 gap-2.5 opacity-30">
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className="h-1 w-1 rounded-full bg-brand" />
        ))}
      </div>

      {/* Dot Grid Bottom Left */}
      <div className="pointer-events-none absolute left-10 bottom-40 grid grid-cols-6 gap-2.5 opacity-30">
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className="h-1 w-1 rounded-full bg-brand" />
        ))}
      </div>

      <div className="max-w-[1250px] mx-auto px-4 md:px-6 lg:px-8 relative z-10">

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start mb-12">

          {/* Left: Contact Details */}
          <div className="flex flex-col lg:col-span-4">
            {/* Subtitle */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-blue-bright" />
              <span className="text-size-12 font-bold uppercase tracking-[0.18em] text-blue-bright">
                {data.subtitle}
              </span>
              <span className="h-px w-8 bg-blue-bright" />
            </div>

            {/* Title */}
            <h2 className="text-4xl md:text-5xl lg:text-size-46 font-extrabold text-navy leading-[1.15] mb-6">
              {data.title1} <br /><span className="text-brand">{data.title2}</span>
            </h2>

            <p className="text-muted text-size-15 mb-10 leading-relaxed max-w-[450px]">
              {data.description}
            </p>

            {/* Contact Info List */}
            <div className="flex flex-col gap-8">
              {/* Phone */}
              <div className="flex items-start gap-5 group cursor-pointer">
                <div className="w-[50px] h-[50px] shrink-0 rounded-full bg-surface-blue flex items-center justify-center text-brand text-size-18 transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:-translate-y-1 group-hover:shadow-lg">
                  <FaPhoneAlt />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-size-15 font-bold text-navy mb-1">{data.contactInfo.phoneTitle}</span>
                  <span className="text-size-14 text-muted transition-colors group-hover:text-brand">{data.contactInfo.phone}</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-5 group cursor-pointer">
                <div className="w-[50px] h-[50px] shrink-0 rounded-full bg-surface-blue flex items-center justify-center text-brand text-size-18 transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:-translate-y-1 group-hover:shadow-lg">
                  <FaEnvelope />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-size-15 font-bold text-navy mb-1">{data.contactInfo.emailTitle}</span>
                  <span className="text-size-14 text-muted transition-colors group-hover:text-brand">{data.contactInfo.email}</span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-5 group cursor-pointer">
                <div className="w-[50px] h-[50px] shrink-0 rounded-full bg-surface-blue flex items-center justify-center text-brand text-size-18 transition-all duration-300 group-hover:bg-brand group-hover:text-white group-hover:-translate-y-1 group-hover:shadow-lg">
                  <FaMapMarkerAlt />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-size-15 font-bold text-navy mb-1">{data.contactInfo.addressTitle}</span>
                  <span className="text-size-14 text-muted leading-relaxed max-w-[200px] transition-colors group-hover:text-brand">{data.contactInfo.address}</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right: Map & Image Block */}
          <div className="lg:col-span-8 flex flex-col sm:flex-row h-[500px] w-full rounded-[20px] overflow-hidden shadow-[0_20px_50px_rgba(13,101,255,0.1)] border border-border-soft">
            <div className="w-full sm:w-1/2 h-1/2 sm:h-full relative overflow-hidden group">
              <img src={data.image} alt={data.imageAlt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-brand/10 mix-blend-multiply"></div>
            </div>
            <div className="w-full sm:w-1/2 h-1/2 sm:h-full bg-gray-100 relative">
              <iframe
                src={data.mapUrl}
                width="100%"
                height="100%"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full border-0 grayscale-[20%] contrast-[1.1] opacity-90"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Section: Contact Form */}
        <div className="w-full max-w-[950px] mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-[0_20px_60px_rgba(13,101,255,0.06)] border border-border-soft p-6 md:p-8 relative z-20">

          <div className="text-center mb-10">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-blue-bright" />
              <span className="text-size-12 font-bold uppercase tracking-[0.18em] text-blue-bright">
                {data.form.subtitle}
              </span>
              <span className="h-px w-8 bg-blue-bright" />
            </div>
            <h2 className="text-size-32 md:text-size-40 font-extrabold text-navy">
              {data.form.title} <br /><span className="text-brand">{data.form.titleHighlight}</span>
            </h2>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder={data.form.namePlaceholder} className="w-full px-4 py-3 bg-white border border-border-soft rounded-xl text-size-14 text-navy placeholder:text-muted focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all" />
              <input type="email" placeholder={data.form.emailPlaceholder} className="w-full px-4 py-3 bg-white border border-border-soft rounded-xl text-size-14 text-navy placeholder:text-muted focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all" />
              <input type="text" placeholder={data.form.subjectPlaceholder} className="w-full px-4 py-3 bg-white border border-border-soft rounded-xl text-size-14 text-navy placeholder:text-muted focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all" />
              <input type="tel" placeholder={data.form.phonePlaceholder} className="w-full px-4 py-3 bg-white border border-border-soft rounded-xl text-size-14 text-navy placeholder:text-muted focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all" />
            </div>
            <textarea placeholder={data.form.messagePlaceholder} rows={4} className="w-full px-4 py-3 bg-white border border-border-soft rounded-xl text-size-14 text-navy placeholder:text-muted focus:outline-none focus:border-brand focus:ring-4 focus:ring-brand/10 transition-all resize-none"></textarea>

            <div className="flex items-center justify-center pt-2">
              <button type="submit" className="flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(13,101,255,0.3)] text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 text-size-15 min-w-[200px]">
                {data.form.buttonText} <FaArrowRight className="text-size-12" />
              </button>
            </div>
          </form>

        </div>

      </div>
    </section>
  );
};
