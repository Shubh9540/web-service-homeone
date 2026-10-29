'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { GalleryData } from '@/types/templates.types';
import { FaChevronLeft, FaChevronRight, FaTimes, FaSearchPlus } from 'react-icons/fa';

export const GallerySection = ({ data }: { data?: GalleryData }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const images = data?.images || [];

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const handlePrev = useCallback(() => {
    if (selectedIndex === null || images.length === 0) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  }, [selectedIndex, images.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null || images.length === 0) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  }, [selectedIndex, images.length]);

  // Keyboard navigation (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext]);

  if (!data || images.length === 0) return null;

  return (
    <section className="w-full bg-section-light py-16 lg:py-12">
      <div className="max-w-[1250px] mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-4 text-size-10 md:text-xs font-bold uppercase tracking-[0.2em] text-brand-primary mb-4">
            <span className="w-8 md:w-12 h-0.5 bg-brand-primary"></span>
            {data.subtitle}
            <span className="w-8 md:w-12 h-0.5 bg-brand-primary"></span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-navy mb-4">
            {data.title1} <span className="text-brand-primary">{data.title2}</span>
          </h2>
          <p className="text-palette-text-light max-w-2xl mx-auto text-sm md:text-base">
            {data.description}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {images.map((item, index) => (
            <div 
              key={item.id} 
              onClick={() => handleOpen(index)}
              className="relative group overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 w-full aspect-[4/3] cursor-pointer"
            >
              <img 
                src={item.image} 
                alt={item.alt} 
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              {/* Overlay with zoom icon */}
              <div className="absolute inset-0 bg-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <FaSearchPlus className="text-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal with Next / Prev */}
      {selectedIndex !== null && images[selectedIndex] && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={handleClose}
        >
          {/* Close button */}
          <button 
            onClick={handleClose}
            aria-label="Close"
            className="absolute top-5 right-5 sm:top-8 sm:right-8 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center text-xl transition-colors cursor-pointer"
          >
            <FaTimes />
          </button>

          {/* Previous button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous image"
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-brand text-white flex items-center justify-center text-lg sm:text-xl transition-all cursor-pointer"
          >
            <FaChevronLeft />
          </button>

          {/* Main image container */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center select-none"
          >
            <img 
              src={images[selectedIndex].image} 
              alt={images[selectedIndex].alt} 
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
            {images[selectedIndex].alt && (
              <p className="text-white/80 text-sm mt-4 text-center">
                {images[selectedIndex].alt} ({selectedIndex + 1} / {images.length})
              </p>
            )}
          </div>

          {/* Next button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next image"
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-brand text-white flex items-center justify-center text-lg sm:text-xl transition-all cursor-pointer"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </section>
  );
};
