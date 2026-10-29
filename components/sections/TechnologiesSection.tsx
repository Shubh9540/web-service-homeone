'use client';
import React from 'react';
import { TechnologiesData } from '@/types/templates.types';
import Image from 'next/image';

export const TechnologiesSection = ({ data }: { data?: TechnologiesData }) => {
  if (!data || !data.items || data.items.length === 0) return null;

  return (
    <section className="relative w-full overflow-hidden bg-white py-8 lg:py-12">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-glow-blue rounded-bl-[200px] z-0 opacity-70 blur-3xl"></div>

      {/* Decorative Dotted Grid on Right */}
      <div className="absolute right-[10%] top-[20%] grid grid-cols-4 gap-3 opacity-20 hidden lg:grid">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-brand"></div>
        ))}
      </div>

      {/* Decorative Circles on Right */}
      <div className="absolute right-[5%] top-[50%] hidden lg:block">
        <div className="w-10 h-10 rounded-full bg-brand"></div>
      </div>
      <div className="absolute right-[15%] top-[60%] hidden lg:block">
        <div className="w-4 h-4 rounded-full border-2 border-brand"></div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 md:px-6 relative z-10">

        {/* Header Section */}
        <div className="mb-8 lg:mb-14 max-w-[750px] mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-0.5 bg-brand" />
            <h4 className="text-brand font-bold text-sm tracking-[0.15em] uppercase">
              {data.subtitle}
            </h4>
            <div className="w-8 h-0.5 bg-brand" />
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-navy leading-tight mb-5 tracking-tight">
            {data.title1} <span className="text-brand">{data.title2}</span>
          </h2>
          <p className="text-palette-text-light text-size-15 md:text-size-16 leading-relaxed max-w-[620px] mx-auto">
            {data.description}
          </p>
        </div>

        {/* Technologies Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap lg:justify-between gap-4 md:gap-6 mt-8 lg:mt-12 relative z-10">
          {data.items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[18px] border border-border-pale shadow-[0_5px_20px_rgba(13,101,255,0.06)] hover:shadow-[0_15px_30px_rgba(13,101,255,0.12)] transition-all duration-300 w-full aspect-square md:w-[150px] md:h-[150px] md:aspect-auto flex flex-col items-center justify-center p-4 group cursor-pointer hover:-translate-y-2"
            >
              <div className="w-[60px] h-[60px] md:w-[70px] md:h-[70px] mb-3 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h4 className="text-size-14 md:text-size-15 font-extrabold text-navy">
                {item.title}
              </h4>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
