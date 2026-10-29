'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeaderData } from '@/types/templates.types';
import { FaArrowRight, FaBars, FaTimes } from 'react-icons/fa';

export const Header = ({ data }: { data?: HeaderData }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!data) return null;

  const navLinks = [...(data.navLinksLeft || []), ...(data.navLinksRight || [])];

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-navy/20 backdrop-blur-md">
      <div className="w-full flex min-h-[70px] lg:min-h-[88px] items-center justify-between px-6 lg:px-16 xl:px-24">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img src={data.logo} alt={data.logoAlt} className="h-14 lg:h-20 object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-10">
          {navLinks.map((link) => (
            <Link key={link.id} href={link.url} className={`relative text-size-15 font-medium transition-colors ${pathname === link.url ? 'text-cyan' : 'text-white hover:text-cyan'}`}>
              {link.label}
              {pathname === link.url && (
                <span className="absolute -bottom-1.5 left-0 w-full h-0.5 bg-cyan rounded-full"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          {data.contactButton && (
            <Link href={data.contactButton.url} className="hidden lg:flex items-center justify-center gap-2 bg-cyan-bright hover:bg-cyan-dark px-7 py-3 rounded-full text-white text-sm font-semibold transition-colors">
              {data.contactButton.text.replace('->', '').trim()}
              <FaArrowRight className="text-xs" />
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex lg:hidden h-10 w-10 items-center justify-center rounded-md text-2xl text-white hover:bg-white/10">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-navy-deep border-t border-white/10 flex flex-col p-4 shadow-xl lg:hidden">
          {navLinks.map((link) => (
            <Link key={link.id} href={link.url} onClick={() => setMobileMenuOpen(false)} className={`border-b border-white/10 px-4 py-4 text-sm font-semibold ${pathname === link.url ? 'text-cyan' : 'text-white'}`}>
              {link.label}
            </Link>
          ))}
          {data.contactButton && (
            <Link href={data.contactButton.url} onClick={() => setMobileMenuOpen(false)} className="mt-6 mx-4 flex items-center justify-center gap-2 bg-cyan-bright py-3 rounded-full text-white text-sm font-semibold">
              {data.contactButton.text.replace('->', '').trim()}
              <FaArrowRight className="text-xs" />
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
