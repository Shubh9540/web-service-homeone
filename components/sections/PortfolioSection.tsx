'use client';

import React, { useState } from 'react';
import { PortfolioData } from '@/types/templates.types';
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaChartBar,
  FaPencilRuler,
  FaMobileAlt,
  FaWordpress,
  FaCube,
  FaChartPie,
  FaDatabase,
  FaChartLine,
  FaServer,
  FaLaptopCode,
  FaPalette,
  FaUsers,
  FaMobile,
  FaLayerGroup,
  FaPenNib,
  FaShieldAlt,
  FaCode,
  FaPlug,
  FaTachometerAlt,
  FaCubes,
  FaVideo,
  FaVrCardboard,
  FaDraftingCompass,
} from 'react-icons/fa';

import Link from 'next/link';

const renderIcon = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    FaChartBar,
    FaPencilRuler,
    FaMobileAlt,
    FaWordpress,
    FaCube,
    FaChartPie,
    FaDatabase,
    FaChartLine,
    FaServer,
    FaLaptopCode,
    FaPalette,
    FaUsers,
    FaMobile,
    FaLayerGroup,
    FaPenNib,
    FaShieldAlt,
    FaCode,
    FaPlug,
    FaTachometerAlt,
    FaCubes,
    FaVideo,
    FaVrCardboard,
    FaDraftingCompass,
  };

  const IconComponent = icons[iconName] || FaChartBar;

  return <IconComponent />;
};

export const PortfolioSection = ({
  data,
}: {
  data?: PortfolioData;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!data?.categories?.length) return null;

  const currentCategory = data.categories[activeTab];

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setCurrentSlide(0);
  };

  const nextSlide = () => {
    if (!currentCategory.sliderImages?.length) return;

    setCurrentSlide((prev) =>
      prev === currentCategory.sliderImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    if (!currentCategory.sliderImages?.length) return;

    setCurrentSlide((prev) =>
      prev === 0 ? currentCategory.sliderImages.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative w-full overflow-hidden bg-section-blue pt-12 pb-12 lg:pt-16 lg:pb-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-0 top-0 h-[260px] w-[260px] rounded-full bg-surface-blue blur-[80px]" />

      <div className="pointer-events-none absolute right-[-60px] top-5 grid grid-cols-6 gap-2.5 opacity-50">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="h-1 w-1 rounded-full bg-dot-blue"
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1300px] px-4 md:px-6">

        {/* Heading */}
        {(data.subtitle || data.title1 || data.title2) && (
          <div className="mb-10 text-center">
            {data.subtitle && (
              <div className="mb-3 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-blue-bright" />

                <span className="text-size-12 font-bold uppercase tracking-[0.18em] text-blue-bright">
                  {data.subtitle}
                </span>

                <span className="h-px w-8 bg-blue-bright" />
              </div>
            )}

            <h2 className="text-size-32 font-extrabold leading-tight text-heading md:text-size-42">
              {data.title1}{' '}
              <span className="text-brand">{data.title2}</span>
            </h2>
          </div>
        )}

        {/* =========================
            TABS
        ========================== */}
        <div className="relative z-20 mb-[-18px] flex gap-3 overflow-x-auto px-4 pb-6 pt-4 -mt-4 md:justify-center md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {data.categories.map((cat, index) => {
            const isActive = index === activeTab;

            return (
              <button
                key={cat.id}
                onClick={() => handleTabChange(index)}
                className={`
                  relative shrink-0
                  min-w-[150px] sm:min-w-[170px]
                  rounded-[14px]
                  border
                  px-4 sm:px-5
                  pb-4
                  pt-9
                  transition-all
                  duration-300
                  ${isActive
                    ? 'border-brand bg-brand text-white shadow-[0_12px_30px_rgba(13,101,255,0.20)]'
                    : 'border-border-cool bg-white text-navy-soft shadow-[0_5px_20px_rgba(25,60,110,0.05)]'
                  }
                `}
              >
                {/* icon floating circle */}
                <div
                  className={`
                    absolute
                    left-1/2
                    top-0
                    flex
                    h-[58px]
                    w-[58px]
                    -translate-x-1/2
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    text-size-25
                    shadow-[0_4px_16px_rgba(40,100,180,0.12)]
                    ${isActive
                      ? 'border-white bg-white text-brand'
                      : 'border-border-blue bg-white text-brand'
                    }
                  `}
                >
                  {renderIcon(cat.icon)}
                </div>

                <span className="block whitespace-nowrap text-size-14 font-bold">
                  {cat.label}
                </span>

                {isActive && (
                  <span className="absolute bottom-[-8px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-brand" />
                )}
              </button>
            );
          })}
        </div>

        {/* =========================
            MAIN PORTFOLIO BOX
        ========================== */}
        <div className="relative overflow-hidden rounded-[28px] border border-border-soft bg-white px-4 pb-4 pt-12 shadow-[0_12px_35px_rgba(28,72,135,0.08)] md:px-6 md:pb-6 md:pt-12 lg:px-8">

          {/* subtle dots left */}
          <div className="pointer-events-none absolute left-[-8px] top-[90px] grid grid-cols-3 gap-2.5 opacity-60">
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="h-1 w-1 rounded-full bg-blue-light"
              />
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[40%_60%]">

            {/* =========================
                LEFT SLIDER
            ========================== */}
            <div className="relative overflow-hidden rounded-[20px] h-full">
              <div className="relative h-full w-full">
                {currentCategory.sliderImages?.map((imgSrc: string, idx: number) => (
                  <img
                    key={`${activeTab}-${idx}`}
                    src={imgSrc}
                    alt={`${currentCategory.title} - ${idx + 1}`}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                      currentSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  />
                )) || (
                  <img
                    key={activeTab}
                    src={currentCategory.sliderImages?.[0]}
                    alt={currentCategory.title}
                    className="absolute inset-0 h-full w-full object-cover opacity-100 z-10"
                  />
                )}
              </div>

              {/* arrows */}
              {currentCategory.sliderImages?.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label={data.previousSlideLabel}
                    className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand shadow-lg transition hover:bg-brand hover:text-white"
                  >
                    <FaChevronLeft className="text-size-14" />
                  </button>

                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label={data.nextSlideLabel}
                    className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand shadow-lg transition hover:bg-brand hover:text-white"
                  >
                    <FaChevronRight className="text-size-14" />
                  </button>

                </>
              )}
            </div>

            {/* =========================
                RIGHT CONTENT
            ========================== */}
            <div className="relative min-h-[370px] overflow-hidden rounded-[20px] bg-white px-6 py-6 md:px-8 lg:min-h-0 lg:py-7">

              {/* text area */}
              <div className="relative z-10 max-w-[58%] max-lg:max-w-full">
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-size-11 font-extrabold uppercase tracking-[0.04em] text-brand">
                    {currentCategory.subtitle}
                  </span>
                </div>

                <h3 className="mb-3 text-size-28 font-extrabold leading-[1.05] text-heading md:text-size-34">
                  {currentCategory.title}
                </h3>

                <p className="mb-5 max-w-[500px] text-size-13 leading-[1.65] text-muted">
                  {currentCategory.description}
                </p>

                {/* features */}
                <div className="mb-6 grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
                  {currentCategory.features?.map((feat) => (
                    <div key={feat.id} className="flex items-start gap-3">

                      <div className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[10px] bg-surface-blue text-size-18 text-brand">
                        {renderIcon(feat.icon)}
                      </div>

                      <div className="pt-0.5">
                        <h4 className="text-size-13 font-extrabold leading-[1.25] text-heading-soft">
                          {feat.title}
                        </h4>

                        {feat.description && (
                          <p className="mt-1 text-size-11 leading-[1.45] text-muted-2">
                            {feat.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href={currentCategory.button.url}
                  className="
                    inline-flex
                    items-center
                    gap-3
                    rounded-[9px]
                    bg-brand
                    px-6
                    py-3
                    text-size-13
                    font-bold
                    text-white
                    shadow-[0_8px_20px_rgba(13,101,255,0.20)]
                    transition
                    hover:bg-blue-deep
                  "
                >
                  {currentCategory.button.text.replace('->', '').trim()}
                  <FaArrowRight className="text-size-12" />
                </Link>
              </div>

              {/* right fixed PNG */}
              {currentCategory.fixedImage && (
                <div className="pointer-events-none absolute bottom-[-6px] right-[-10px] hidden h-full w-[43%] items-center justify-end lg:flex">
                  <img
                    src={currentCategory.fixedImage}
                    alt=""
                    className="max-h-[92%] w-full object-contain object-right drop-shadow-[0_16px_18px_rgba(20,40,80,0.12)]"
                  />
                </div>
              )}

              {/* circular dotted decoration */}
              <div className="pointer-events-none absolute right-[5%] top-[8%] hidden h-[260px] w-[260px] rounded-full border border-dashed border-dash-blue lg:block" />

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
