'use client';
import React, { useState, useEffect } from 'react';
import { TestimonialsData } from '@/types/templates.types';
import { FaArrowLeft, FaArrowRight, FaStar, FaQuoteRight } from 'react-icons/fa';

export const TestimonialSection = ({ data }: { data?: TestimonialsData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data || !data.testimonials || data.testimonials.length === 0) return null;

  const total = data.testimonials.length;

  const next = () => setActiveIndex((prev) => (prev + 1) % total);
  const prev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [total]);

  // For infinite loop visual, we'll extract the active and its siblings
  const getVisibleItems = () => {
    const leftIndex = (activeIndex - 1 + total) % total;
    const rightIndex = (activeIndex + 1) % total;

    return [
      { item: data.testimonials[leftIndex], pos: 'left' },
      { item: data.testimonials[activeIndex], pos: 'center' },
      { item: data.testimonials[rightIndex], pos: 'right' }
    ];
  };

  const visibleItems = getVisibleItems();

  return (
    <section className="bg-white py-8 lg:py-12 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">

        {/* Header Block */}
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-0.5 bg-brand/20" />
            <h4 className="text-brand font-bold text-sm tracking-[0.15em] uppercase">
              {data.subtitle}
            </h4>
            <div className="w-12 h-0.5 bg-brand/20" />
          </div>
          <h2 className="text-size-28 leading-[1.2] sm:text-4xl md:text-5xl font-extrabold text-navy md:leading-tight mb-5 tracking-tight">
            {data.title1} <span className="text-brand">{data.title2}</span>
          </h2>
          <p className="text-palette-text-light text-size-15 md:text-size-16 leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* Slider Container */}
        <div className="flex items-center justify-center gap-4 lg:gap-8 relative">

          {/* Left Arrow */}
          <button
            onClick={prev}
            className="hidden md:flex w-12 h-12 rounded-full border border-border-pale bg-white shadow-[0_4px_15px_rgba(0,0,0,0.05)] items-center justify-center text-brand hover:bg-brand hover:text-white transition-all shrink-0 z-20"
          >
            <FaArrowLeft />
          </button>

          {/* Cards Area */}
          <div className="flex gap-6 w-full max-w-[1150px] justify-center overflow-hidden py-4">
            {visibleItems.map(({ item, pos }) => {
              const isActive = pos === 'center';

              return (
                <div
                  key={`${item.id}-${pos}`}
                  className={`relative rounded-3xl p-8 lg:p-10 transition-all duration-500 shrink-0 flex flex-col
                    ${isActive
                      ? 'bg-brand text-white shadow-[0_20px_40px_rgba(13,101,255,0.2)] scale-100 opacity-100 z-10 w-full md:w-[60%] lg:w-[33.33%]'
                      : 'bg-white text-navy border border-border-pale scale-[0.95] opacity-70 hidden lg:flex lg:w-[33.33%] shadow-sm hover:opacity-100 cursor-pointer'
                    }`}
                  onClick={() => {
                    if (pos === 'left') prev();
                    if (pos === 'right') next();
                  }}
                >
                  {/* Top: Stars and Quote Icon */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={`text-xl ${i < item.rating ? (isActive ? 'text-white' : 'text-gold') : (isActive ? 'text-white/30' : 'text-gray-200')}`} />
                      ))}
                    </div>
                    <FaQuoteRight className={`text-4xl ${isActive ? 'text-white' : 'text-brand/20'}`} />
                  </div>

                  {/* Quote Text */}
                  <p className={`text-size-15 leading-relaxed flex-grow mb-8 ${isActive ? 'text-white/90' : 'text-palette-text-light'}`}>
                    {data.quoteMark}{item.quote}{data.quoteMark}
                  </p>

                  {/* Avatar & Info */}
                  <div className="flex items-center gap-4 mt-auto">
                    <div className={`w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 ${isActive ? 'border-white' : 'border-border-pale'}`}>
                      <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className={`font-bold text-size-17 ${isActive ? 'text-white' : 'text-navy'}`}>
                        {item.name}
                      </h4>
                      <p className={`text-size-13 ${isActive ? 'text-white/80' : 'text-palette-text-light'}`}>
                        {item.location}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={next}
            className="hidden md:flex w-12 h-12 rounded-full border border-border-pale bg-white shadow-[0_4px_15px_rgba(0,0,0,0.05)] items-center justify-center text-brand hover:bg-brand hover:text-white transition-all shrink-0 z-20"
          >
            <FaArrowRight />
          </button>
        </div>

        {/* Mobile Navigation & Pagination */}
        <div className="flex justify-center items-center gap-2 mt-10">
          <button onClick={prev} className="md:hidden w-10 h-10 rounded-full border border-border-pale flex items-center justify-center text-brand mr-4"><FaArrowLeft /></button>

          {data.testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 bg-brand' : 'w-2.5 bg-blue-dot-light'}`}
            />
          ))}

          <button onClick={next} className="md:hidden w-10 h-10 rounded-full border border-border-pale flex items-center justify-center text-brand ml-4"><FaArrowRight /></button>
        </div>

      </div>
    </section>
  );
};
