'use client';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { HeroData, HeroSlide } from '@/types/templates.types';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

export const HeroSection = ({ data }: { data?: HeroData }) => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  if (!data) return null;

  const slides: HeroSlide[] = data.slides && data.slides.length > 0
    ? data.slides
    : [{
        id: 'default',
        subtitle: data.subtitle,
        title1: data.title1,
        title2: data.title2,
        description: data.description,
        image: data.image1,
        primaryButton: data.button,
      }];

  const goTo = useCallback((index: number, dir: 'next' | 'prev') => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 400);
  }, [isAnimating]);

  const handleNext = useCallback(() => {
    goTo((current + 1) % slides.length, 'next');
  }, [current, slides.length, goTo]);

  const handlePrev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, 'prev');
  }, [current, slides.length, goTo]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(handleNext, 6000);
    return () => clearInterval(timer);
  }, [handleNext]);

  const slide = slides[current];

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden bg-indigo">
      
      {/* Background Images — all mounted, we switch opacity */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img
            src={s.image}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient overlay only on the left side behind the text */}
          <div className="absolute top-0 left-0 bottom-0 w-full md:w-[70%] lg:w-[50%] bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1250px] mx-auto px-5 sm:px-8 pt-28 pb-16 lg:pt-36 lg:pb-20">
        <div
          key={current}
          className={`w-full max-w-[620px] ${
            isAnimating
              ? direction === 'next'
                ? 'opacity-0 translate-x-[-30px]'
                : 'opacity-0 translate-x-[30px]'
              : 'opacity-100 translate-x-0'
          } transition-all duration-400 ease-out`}
        >
          {/* Subtitle tag */}
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 bg-white/60" />
            <span className="text-size-11 font-semibold uppercase tracking-[0.3em] text-white/80">
              {slide.subtitle}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-size-62 font-extrabold leading-[1.05] tracking-tight text-white mb-5">
            <span className="block">{slide.title1}</span>
            <span className="block">{slide.title2}</span>
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-size-15 leading-relaxed text-white max-w-[500px] mb-8">
            {slide.description}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {(slide.secondaryButton || slide.primaryButton) && (
              <Link
                href={(slide.secondaryButton || slide.primaryButton)!.url}
                className="inline-flex items-center gap-3 rounded-full border border-white/40 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                {(slide.secondaryButton || slide.primaryButton)!.text}
                <FaArrowRight className="text-xs" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Arrow Buttons — right side, vertically centered */}
      <div className="absolute right-5 lg:right-10 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
        <button
          onClick={handleNext}
          aria-label={data.nextSlideLabel}
          className="w-12 h-12 rounded-full border border-white/30 bg-white/10 hover:bg-brand-primary hover:border-brand-primary flex items-center justify-center text-white transition-all duration-300"
        >
          <FaArrowRight className="text-sm" />
        </button>
        <button
          onClick={handlePrev}
          aria-label={data.previousSlideLabel}
          className="w-12 h-12 rounded-full border border-white/30 bg-white/10 hover:bg-brand-primary hover:border-brand-primary flex items-center justify-center text-white transition-all duration-300"
        >
          <FaArrowLeft className="text-sm" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 'next' : 'prev')}
            aria-label={`${data.goToSlideLabel} ${i + 1}`}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? 'w-8 h-2 bg-brand-primary'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

    </section>
  );
};
