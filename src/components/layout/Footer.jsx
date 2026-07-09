import React from 'react';
import { Heart } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const handleFooterLinkClick = (e, href) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navHeight = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Framer Motion variants
  const footerReveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    }
  };

  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: "Founder's Story", href: '#founder-story' },
    { label: 'Mission & Values', href: '#mission-vision' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Our Impact', href: '#impact' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Become a Volunteer', href: '#volunteer-signup' },
    { label: 'Contact Us', href: '#contact' }
  ];

  const socialLinks = [
    { href: '#facebook', label: 'Facebook', emoji: '📘' },
    { href: '#instagram', label: 'Instagram', emoji: '📸' },
    { href: '#twitter', label: 'Twitter', emoji: '🐦' },
    { href: '#youtube', label: 'YouTube', emoji: '🎥' }
  ];

  return (
    <motion.footer
      className="main-footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={footerReveal}
    >
      <div className="container footer-container">
        
        {/* Brand column */}
        <div className="footer-column brand-column">
          <div className="footer-logo-area">
            <img src="/logo.png" alt="Bejubaan Ann Seva Foundation Logo" className="footer-logo" />
            <div className="footer-brand-info">
              <span className="footer-brand-title">Bejubaan</span>
              <span className="footer-brand-subtitle">Ann Seva Foundation</span>
            </div>
          </div>
          <p className="footer-desc">
            A community-driven movement connecting surplus fresh food from local households, events, and restaurants to feed street cows, dogs, and birds. Rooted in Sanatan values.
          </p>
          {/* Social icons */}
          <div className="footer-social-row" aria-label="Social media links">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="footer-social-icon"
                whileHover={shouldReduceMotion ? {} : { scale: 1.15, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {social.emoji}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Links Column */}
        <div className="footer-column links-column">
          <h4>Quick Links</h4>
          <ul className="footer-links-list">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <motion.a
                  href={link.href}
                  onClick={(e) => handleFooterLinkClick(e, link.href)}
                  whileHover={shouldReduceMotion ? {} : { x: 3, color: 'var(--color-primary)' }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  style={{ display: 'inline-block' }}
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        {/* Core Pillars / Mission statement column */}
        <div className="footer-column pillars-column">
          <h4>Our Core Values</h4>
          <ul className="footer-bullets">
            <li>🌱 Reducing Food Waste</li>
            <li>🤝 Compassion over Convenience</li>
            <li>🐾 Feeding Mute Street Lives</li>
            <li>🐄 Sanatan Pehli Roti Ethos</li>
          </ul>
        </div>

        {/* Disclaimer / NGO registration column */}
        <div className="footer-column legal-column">
          <h4>NGO Statement</h4>
          <p className="legal-text">
            Bejubaan Ann Seva Foundation operates as a registered volunteer-led non-profit trust dedicated to animal welfare and zero-waste community solutions.
          </p>
          <div className="newsletter-box">
            <h5>Subscribe to Newsletter</h5>
            <form onSubmit={(e) => e.preventDefault()} className="newsletter-form">
              <input type="email" placeholder="Your Email Address" required className="form-control" />
              <motion.button
                type="submit"
                className="btn btn-primary btn-sm"
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

      </div>

      {/* Copyright area */}
      <div className="footer-bottom">
        <div className="container bottom-container">
          <p>© {new Date().getFullYear()} Bejubaan Ann Seva Foundation. All rights reserved.</p>
          <p className="made-with">
            <span>Made with</span>
            <Heart size={14} className="text-accent-heart" fill="currentColor" />
            <span>for street animals</span>
          </p>
        </div>
      </div>

      <style>{`
        .main-footer {
          background-color: var(--color-bg-alt);
          color: var(--color-text);
          padding: 5rem 0 0 0;
          border-top: 4px solid var(--color-primary);
          text-align: left;
        }

        .footer-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-bottom: 3.5rem;
        }

        @media (min-width: 640px) {
          .footer-container {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 1024px) {
          .footer-container {
            grid-template-columns: 1.2fr 0.8fr 0.8fr 1.2fr;
            gap: 2.5rem;
          }
        }

        .footer-column h4 {
          color: var(--color-primary);
          font-size: 1.1rem;
          margin-bottom: 1.25rem;
          font-family: var(--font-heading);
          font-weight: 650;
        }

        .footer-logo-area {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .footer-logo {
          height: 46px;
          width: auto;
          object-fit: contain;
        }

        .footer-brand-info {
          display: flex;
          flex-direction: column;
        }

        .footer-brand-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.2rem;
          color: var(--color-primary);
          line-height: 1.1;
        }

        .footer-brand-subtitle {
          font-size: 0.75rem;
          color: var(--color-text-muted);
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .footer-desc {
          font-size: 0.9rem;
          line-height: 1.65;
          color: var(--color-text-muted);
          margin-bottom: 1.25rem;
        }

        /* Social icons row on brand column */
        .footer-social-row {
          display: flex;
          gap: 0.65rem;
          flex-wrap: wrap;
        }

        .footer-social-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background-color: var(--color-white);
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          will-change: transform;
          text-decoration: none;
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .footer-links-list a {
          color: var(--color-text-muted);
          font-size: 0.925rem;
          font-weight: 500;
          /* color transition still handled by CSS for performance */
          transition: color var(--transition-fast);
          will-change: transform;
        }

        .footer-links-list a:hover {
          color: var(--color-primary);
        }

        .footer-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          font-size: 0.925rem;
        }

        .footer-bullets li {
          color: var(--color-text-muted);
          font-weight: 550;
        }

        .legal-text {
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          color: var(--color-text-muted);
        }

        .newsletter-box h5 {
          font-size: 0.875rem;
          color: var(--color-text);
          margin-bottom: 0.5rem;
          font-weight: 650;
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
        }

        .newsletter-form .form-control {
          background-color: var(--color-white);
          border: 1px solid var(--color-border);
          color: var(--color-text);
          font-size: 0.85rem;
          padding: 0.5rem 0.75rem;
          height: 38px;
        }

        .newsletter-form .btn {
          height: 38px;
          flex-shrink: 0;
          will-change: transform;
        }

        /* Bottom copyright */
        .footer-bottom {
          padding: 1.5rem 0;
          border-top: 1px solid var(--color-border);
          font-size: 0.85rem;
          color: var(--color-text-muted);
        }

        .bottom-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
        }

        @media (min-width: 640px) {
          .bottom-container {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .made-with {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .text-accent-heart {
          color: var(--color-accent);
        }
      `}</style>
    </motion.footer>
  );
}
