import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function Navbar({ onDonateClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [activeSection, setActiveSection] = useState('#home');
  
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll Spy logic to detect active section dynamically
      const sections = ['#home', '#about', '#founder-story', '#how-it-works', '#volunteer-signup', '#contact'];
      const scrollPosition = window.scrollY + 200; // offset for detection point

      for (const section of sections) {
        try {
          const el = document.querySelector(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
            }
          }
        } catch (e) {
          // ignore selector errors if element is temporarily missing
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Founder\'s Story', href: '#founder-story' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Volunteer', href: '#volunteer-signup' },
    { name: 'Contact Us', href: '#contact' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    setActiveSection(href);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navHeight = scrolled ? 70 : 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="logo-area">
          <img src="/logo.png" alt="Bejubaan Ann Seva Foundation Logo" className="nav-logo" />
          <div className="brand-info">
            <span className="brand-title">Bejubaan</span>
            <span className="brand-subtitle">Ann Seva Foundation</span>
            <span className="brand-tagline">Jeev-daya hi Shiv-daya.</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {navLinks.map((link, idx) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`nav-link ${activeSection === link.href ? 'active' : ''}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ position: 'relative' }}
            >
              {link.name}
              
              {/* Premium underline hover indicator */}
              <AnimatePresence>
                {hoveredIdx === idx && !shouldReduceMotion && (
                  <motion.span
                    layoutId="navbar-underline"
                    className="nav-underline"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                )}
              </AnimatePresence>
            </a>
          ))}

        </nav>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-toggle"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Drawer with Framer Motion */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              className="mobile-drawer open"
              initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
            >
              <nav className="mobile-nav" aria-label="Mobile Navigation">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`mobile-link ${activeSection === link.href ? 'active' : ''}`}
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          background-color: var(--color-secondary);
          border-bottom: 1px solid var(--color-border);
          z-index: 1000;
          transition: height var(--transition-normal), box-shadow var(--transition-normal);
          display: flex;
          align-items: center;
        }
        
        .navbar-header.scrolled {
          height: 70px;
          box-shadow: var(--shadow-md);
          border-bottom: none;
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .logo-area {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          text-decoration: none;
        }

        .nav-logo {
          height: 48px;
          width: auto;
          object-fit: contain;
          transition: height var(--transition-normal);
        }

        .navbar-header.scrolled .nav-logo {
          height: 42px;
        }

        .brand-info {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--color-primary);
          line-height: 1.1;
        }

        .brand-subtitle {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          font-weight: 550;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .brand-tagline {
          font-size: 0.7rem;
          color: var(--color-accent);
          font-weight: 500;
          letter-spacing: 0.02em;
          font-style: italic;
          margin-top: 1px;
          line-height: 1.2;
        }

        .desktop-nav {
          display: none;
          align-items: center;
          gap: 1.75rem;
        }

        @media (min-width: 1024px) {
          .desktop-nav {
            display: flex;
          }
        }

        .nav-link {
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--color-text);
          padding: 0.5rem 0;
          transition: color var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--color-accent);
        }

        .nav-link.active {
          color: var(--color-primary);
          font-weight: 600;
        }

        .nav-underline {
          background-color: var(--color-accent) !important;
        }

        .mobile-toggle {
          display: block;
          background: none;
          border: none;
          color: var(--color-primary);
          cursor: pointer;
          padding: 0.5rem;
          z-index: 1010;
        }

        @media (min-width: 1024px) {
          .mobile-toggle {
            display: none;
          }
        }

        .mobile-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 100%;
          max-width: 320px;
          height: 100vh;
          background-color: var(--color-secondary);
          box-shadow: var(--shadow-lg);
          padding: 90px 2rem 2rem;
          z-index: 1005;
          display: flex;
          flex-direction: column;
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mobile-link {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--color-text);
          padding: 0.5rem 0;
          border-bottom: 1px solid var(--color-border);
        }

        .mobile-link:hover {
          color: var(--color-accent);
          padding-left: 0.25rem;
        }

        .mobile-link.active {
          color: var(--color-primary);
        }
      `}</style>
    </header>
  );
}
