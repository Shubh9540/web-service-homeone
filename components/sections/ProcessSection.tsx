'use client';
import React from 'react';
import { ProcessData } from '@/types/templates.types';
import { FiMessageSquare, FiCalendar, FiTool, FiCheckCircle, FiFileText, FiMonitor, FiClipboard } from 'react-icons/fi';
import { FaArrowRight, FaRocket } from 'react-icons/fa';

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'FiMessageSquare': return <FiMessageSquare />;
    case 'FiCalendar': return <FiCalendar />;
    case 'FiTool': return <FiTool />;
    case 'FiCheckCircle': return <FiCheckCircle />;
    case 'FiFileText': return <FiFileText />;
    case 'FiMonitor': return <FiMonitor />;
    case 'FiClipboard': return <FiClipboard />;
    case 'FaRocket': return <FaRocket />;
    default: return <FiCheckCircle />;
  }
};

export const ProcessSection = ({ data }: { data?: ProcessData }) => {
  if (!data) return null; return (

    <section className="relative w-full overflow-hidden bg-section-blue py-16 lg:py-12">
      <div className="pointer-events-none absolute top-[-50px] right-[-50px] w-[500px] h-[500px] bg-blue-wash rounded-full z-0 opacity-80 blur-3xl"></div>
      <div className="pointer-events-none absolute bottom-[-50px] left-[-50px] w-[400px] h-[400px] bg-blue-wash rounded-full z-0 opacity-80 blur-3xl"></div>

      {/* Subtle Dotted Grids */}
      <div className="pointer-events-none absolute left-4 md:left-10 top-10 grid grid-cols-5 gap-3 opacity-30 z-0">
        {[...Array(25)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-light"></div>)}
      </div>
      <div className="pointer-events-none absolute right-4 md:right-10 bottom-10 grid grid-cols-6 gap-3 opacity-30 z-0">
        {[...Array(30)].map((_, i) => <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-light"></div>)}
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">

        {/* Header Section */}
        <div className="mb-20 text-center max-w-[750px] mx-auto">
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
          <p className="text-palette-text-light text-size-15 md:text-size-16 leading-relaxed mx-auto max-w-[600px]">
            {data.description}
          </p>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-16 gap-x-6 xl:gap-x-8 relative mt-16 max-w-[1280px] mx-auto">

          {data.steps.map((step, index) => (
            <div key={step.id} className="relative flex flex-col items-center group h-full w-full max-w-[240px] mx-auto">

              {/* Card Container */}
              <div className="bg-white rounded-[18px] shadow-[0_8px_25px_rgba(13,101,255,0.06)] w-full pt-14 pb-6 px-4 text-center relative z-10 transition-all duration-300 hover:shadow-[0_15px_35px_rgba(13,101,255,0.12)] flex-grow flex flex-col">

                {/* Number Badge & Icon Container */}
                <div className="absolute -top-[38px] left-1/2 -translate-x-1/2 z-20">
                  <div className="relative">

                    {/* Icon Circle */}
                    <div className="w-[76px] h-[76px] rounded-full bg-white shadow-[0_4px_18px_rgba(0,0,0,0.08)] flex items-center justify-center p-2 relative">
                      {/* Inner Light Blue Circle */}
                      <div className="w-full h-full rounded-full flex items-center justify-center text-brand text-size-34 bg-surface-blue-light transition-transform duration-300 group-hover:scale-110">
                        {renderIcon(step.icon)}
                      </div>
                    </div>

                    {/* Number Badge */}
                    <div className="absolute -top-1 -left-1.5 w-7 h-7 rounded-full bg-brand flex items-center justify-center text-white text-size-11 font-bold shadow-md z-30">
                      {step.number}
                    </div>
                  </div>
                </div>

                <h3 className="text-size-16 font-extrabold text-navy mb-2.5 mt-1 leading-[1.3]">
                  {step.title}
                </h3>
                <p className="text-palette-text-light text-size-12 leading-relaxed flex-grow">
                  {step.description}
                </p>
              </div>

              {/* Connecting Arrow - balanced equal gap between left card and right card */}
              {index < data.steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 xl:-right-4 -translate-y-1/2 translate-x-1/2 w-7 h-7 rounded-full bg-brand items-center justify-center text-white text-size-11 shadow-md z-30">
                  <FaArrowRight />
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
