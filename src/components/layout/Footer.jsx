import React from 'react';
import { Heart } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';

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
    { href: '#facebook',  label: 'Facebook',  Icon: FaFacebook,  brandColor: '#1877F2', id: 'facebook'  },
    { href: '#instagram', label: 'Instagram', Icon: FaInstagram, brandColor: '#E4405F', id: 'instagram' },
    { href: '#twitter',   label: 'X',         Icon: FaXTwitter,  brandColor: '#000000', id: 'x'         },
    { href: '#youtube',   label: 'YouTube',   Icon: FaYoutube,   brandColor: '#FF0000', id: 'youtube'   },
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
            <img src="/fav_icon_logo.png" alt="Bejubaan Ann Seva Foundation Logo" className="footer-logo" />
            <div className="footer-brand-info">
              <span className="footer-brand-title">Bejubaan</span>
              <span className="footer-brand-subtitle">Ann Seva Foundation</span>
              <span className="footer-brand-tagline">Jeev-daya hi Shiv-daya.</span>
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
                className={`footer-social-icon footer-social-icon--${social.id}`}
                whileHover={shouldReduceMotion ? {} : { scale: 1.08, y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <social.Icon size={18} aria-hidden="true" />
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
                  whileHover={shouldReduceMotion ? {} : { x: 3, color: 'var(--color-accent)' }}
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
        <div  className="container bottom-container">
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
          background-color: var(--color-primary);
          color: var(--color-secondary);
          padding: 6rem 0 0 0;
          border-top: 1px solid rgba(242, 231, 214, 0.12);
          text-align: left;
        }

        .footer-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3.5rem;
          margin-bottom: 4.5rem;
        }

        @media (max-width: 640px) {
          .footer-container {
            gap: 2.5rem;
            margin-bottom: 3rem;
          }
          .main-footer {
            padding: 4.5rem 0 0 0;
          }
        }

        @media (min-width: 640px) {
          .footer-container {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (min-width: 1024px) {
          .footer-container {
            grid-template-columns: 1.2fr 0.8fr 0.8fr 1.2fr;
            gap: 3rem;
          }
        }

        .footer-column h4 {
          color: var(--color-white);
          font-size: 1.15rem;
          margin-bottom: 1.5rem;
          font-family: var(--font-heading);
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .footer-logo-area {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .footer-logo {
          height: 48px;
          width: auto;
          object-fit: contain;
          filter: brightness(1.05);
        }

        .footer-brand-info {
          display: flex;
          flex-direction: column;
        }

        .footer-brand-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--color-secondary);
          line-height: 1.1;
        }

        .footer-brand-subtitle {
          font-size: 0.75rem;
          color: rgba(242, 231, 214, 0.6);
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .footer-brand-tagline {
          font-size: 0.7rem;
          color: var(--color-accent);
          font-weight: 500;
          letter-spacing: 0.02em;
          font-style: italic;
          margin-top: 2px;
          line-height: 1.2;
        }

        .footer-desc {
          font-size: 0.925rem;
          line-height: 1.7;
          color: rgba(242, 231, 214, 0.8);
          margin-bottom: 1.75rem;
        }

        /* Social icons row on brand column */
        .footer-social-row {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .footer-social-icon {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(242, 231, 214, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-secondary);
          cursor: pointer;
          text-decoration: none;
          transition: all 250ms ease;
        }

        .footer-social-icon:hover {
          background-color: rgba(242, 231, 214, 0.12);
          color: var(--color-accent);
          border-color: var(--color-accent);
          box-shadow: var(--shadow-sm);
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links-list a {
          color: rgba(242, 231, 214, 0.85);
          font-size: 0.925rem;
          font-weight: 500;
          transition: color var(--transition-fast);
          will-change: transform;
        }

        .footer-links-list a:hover {
          color: var(--color-accent);
        }

        .footer-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          font-size: 0.925rem;
        }

        .footer-bullets li {
          color: rgba(242, 231, 214, 0.85);
          font-weight: 500;
        }

        .legal-text {
          font-size: 0.9rem;
          line-height: 1.65;
          margin-bottom: 1.75rem;
          color: rgba(242, 231, 214, 0.8);
        }

        .newsletter-box h5 {
          font-size: 0.9rem;
          color: var(--color-secondary);
          margin-bottom: 0.75rem;
          font-weight: 600;
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .newsletter-form .form-control {
          background-color: var(--color-white);
          border: 1px solid var(--color-border);
          color: var(--color-text);
          font-size: 0.85rem;
          padding: 0.5rem 0.75rem;
          height: 38px;
          flex: 1;
          min-width: 0;
          border-radius: var(--radius-sm);
          transition: border-color var(--transition-fast), background-color var(--transition-fast);
        }

        .newsletter-form .form-control::placeholder {
          color: #94a3b8;
        }

        .newsletter-form .form-control:focus {
          outline: none;
          background-color: var(--color-white);
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px rgba(35, 79, 69, 0.06);
        }

        .newsletter-form .btn {
          background-color: var(--color-accent);
          color: var(--color-primary);
          border: 1px solid var(--color-accent);
          border-radius: var(--radius-sm);
          font-weight: 600;
          padding: 0 1.25rem;
          height: 38px;
          transition: all var(--transition-fast);
        }

        .newsletter-form .btn:hover {
          background-color: var(--color-accent-hover);
          border-color: var(--color-accent-hover);
          color: var(--color-primary-hover);
        }

        @media (max-width: 480px) {
          .newsletter-form {
            flex-direction: column;
          }
          .newsletter-form .form-control {
            width: 100%;
            height: 38px;
          }
          .newsletter-form .btn {
            width: 100%;
            height: 38px;
          }
        }

        /* Bottom copyright */
        .footer-bottom {
          padding: 1.75rem 0;
          border-top: 1px solid rgba(242, 231, 214, 0.12);
          font-size: 0.85rem;
          color: rgba(242, 231, 214, 0.6);
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
