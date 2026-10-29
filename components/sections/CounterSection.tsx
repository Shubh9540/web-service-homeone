'use client';
import React, { useEffect, useState, useRef } from 'react';
import { CounterData } from '@/types/templates.types';
import { FaUsers, FaFileCode, FaTrophy, FaHandshake, FaChartBar, FaDesktop, FaCode } from 'react-icons/fa';

const renderIcon = (iconName: string) => {
  switch (iconName) {
    case 'FaUsers': return <FaUsers />;
    case 'FaFileCode': return <FaFileCode />;
    case 'FaTrophy': return <FaTrophy />;
    case 'FaHandshake': return <FaHandshake />;
    case 'FaDesktop': return <FaDesktop />;
    case 'FaCode': return <FaCode />;
    default: return <FaChartBar />;
  }
};

const AnimatedNumber = ({ targetString }: { targetString: string }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  
  // Extract number and suffix (like "+")
  const targetNumber = parseInt(targetString.replace(/\D/g, '')) || 0;
  const suffix = targetString.replace(/\d/g, '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTimestamp: number;
          const duration = 2000; // 2 seconds

          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * targetNumber));
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(targetNumber);
            }
          };

          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [targetNumber]);

  return (
    <span ref={elementRef}>
      {count}{suffix}
    </span>
  );
};

export const CounterSection = ({ data }: { data?: CounterData }) => {
  if (!data?.items?.length) return null;

  return (
    <section className="relative z-20 mx-auto w-full max-w-[1300px] px-4 md:px-6 mt-6 mb-6 lg:mt-8 lg:mb-8">
      <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-brand via-brand-primary to-brand py-10 px-8 shadow-[0_15px_40px_rgba(13,101,255,0.3)] lg:py-14">
        
        {/* Subtle background patterns */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-1/3 bg-gradient-to-r from-white/10 to-transparent opacity-30 blur-3xl"></div>
        <div className="pointer-events-none absolute right-0 bottom-0 h-full w-1/3 bg-gradient-to-l from-white/10 to-transparent opacity-30 blur-3xl"></div>
        
        {/* Dots Left */}
        <div className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 grid grid-cols-2 gap-2 opacity-20 hidden md:grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-white" />
          ))}
        </div>
        
        {/* Dots Right */}
        <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 grid grid-cols-2 gap-2 opacity-20 hidden md:grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full bg-white" />
          ))}
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-y-8 gap-x-2 sm:gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-white/20">
          {data.items.map((item, index) => (
            <div key={item.id} className="flex flex-col items-center justify-center px-4 text-center">
              
              {/* Icon */}
              <div className="mb-3 md:mb-5 flex h-14 w-14 md:h-20 md:w-20 items-center justify-center rounded-full bg-white text-size-24 md:text-size-32 text-brand shadow-[0_8px_25px_rgba(255,255,255,0.25)] mx-auto">
                {renderIcon(item.icon)}
              </div>
              
              {/* Number */}
              <h3 className="mb-1 text-3xl font-extrabold text-white md:text-5xl tracking-tight">
                <AnimatedNumber targetString={item.number} />
              </h3>
              
              {/* Label */}
              <p className="text-size-12 sm:text-size-15 font-medium text-white/90 tracking-wide">
                {item.label}
              </p>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
