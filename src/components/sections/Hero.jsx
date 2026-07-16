import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Hero({ onDonateClick, onVolunteerClick }) {
  const shouldReduceMotion = useReducedMotion();

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const targetElement = document.getElementById(id);
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

  // Stagger Container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  // Text / Item reveals
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.4, 
        ease: [0.25, 1, 0.5, 1] 
      }
    }
  };

  // Image reveal
  const imageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: 'easeOut',
        delay: 0.2
      }
    }
  };

  return (
    <section id="home" className="hero-section">
      <motion.div 
        className="container hero-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-content">
          <motion.span className="badge badge-primary" variants={itemVariants}>
            Feed the Innocent
          </motion.span>
          
          <motion.h1 className="hero-title" variants={itemVariants}>
            Connecting Surplus Food with <span className="text-secondary-color">Hungry Street Animals</span>
          </motion.h1>
          
          <motion.p className="lead hero-description" variants={itemVariants}>
            Bejubaan Ann Seva Foundation is a community-driven movement that turns daily food surplus into life-saving meals for street cows, dogs, birds, and other animals. Turn waste into seva, without changing your busy routine.
          </motion.p>
          
          <motion.div className="hero-actions" variants={itemVariants}>
            <motion.button 
              type="button"
              className="btn btn-primary btn-lg"
              style={{ cursor: 'not-allowed' }}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              transition={{ duration: 0.15 }}
            >
              <Heart size={20} fill="currentColor" />
              <span>Donate Food</span>
            </motion.button>
            
            <motion.a 
              href="#volunteer-signup"
              onClick={(e) => scrollToSection(e, 'volunteer-signup')}
              className="btn btn-outline btn-lg"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              transition={{ duration: 0.15 }}
            >
              <span>Become a Volunteer</span>
              <ArrowRight size={18} />
            </motion.a>
          </motion.div>
        </div>
        
        <motion.div 
          className="hero-image-wrapper"
          variants={imageVariants}
        >
          <div className="image-card-container">
            <img 
              src="/hero_impact.png" 
              alt="Kind volunteer feeding street cow and dog" 
              className="hero-image"
              loading="eager"
            />
            <div className="hero-floating-card">
              <div className="floating-card-icon">🐕</div>
              <div className="floating-card-text">
                <strong>Every Roti Counts</strong>
                <span>One meal saves a hungry life.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        .hero-section {
          position: relative;
          background: radial-gradient(circle at 80% 20%, rgba(183, 146, 82, 0.07) 0%, rgba(35, 79, 69, 0.02) 50%, var(--color-bg) 100%);
          background-color: var(--color-bg);
          padding: 9.5rem 0 6.5rem 0;
          overflow: hidden;
          display: flex;
          align-items: center;
          min-height: calc(100vh - 80px);
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 7rem 0 4.5rem 0;
            min-height: auto;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 6.5rem 0 3.5rem 0;
          }
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .hero-container {
            grid-template-columns: 1.1fr 0.9fr;
            gap: 4.5rem;
          }
        }

        .hero-content {
          text-align: left;
        }

        .hero-section .badge {
          background-color: rgba(183, 146, 82, 0.12);
          color: var(--color-accent-hover);
          border: 1px solid rgba(183, 146, 82, 0.25);
          padding: 0.4rem 0.85rem;
          font-size: 0.825rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-radius: var(--radius-full);
          display: inline-flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .hero-title {
          font-family: var(--font-heading);
          color: var(--color-text); /* Deep Green heading */
          margin-bottom: 1.5rem;
          line-height: 1.18;
          font-weight: 700;
        }

        .text-secondary-color {
          color: var(--color-accent); /* Muted Gold accent */
        }

        .hero-description {
          margin-bottom: 2.25rem;
          color: var(--color-text-muted);
          font-size: 1.05rem;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
        }

        @media (max-width: 768px) {
          .hero-actions {
            flex-direction: column;
            gap: 1rem;
          }
          
          .hero-actions .btn {
            width: 100%;
            justify-content: center;
          }
        }

        .hero-image-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .image-card-container {
          position: relative;
          width: 100%;
          max-width: 540px;
        }

        .hero-image {
          width: 100%;
          height: auto;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          object-fit: cover;
          border: 1px solid var(--color-border);
        }

        .hero-floating-card {
          position: absolute;
          bottom: 28px;
          left: -20px;
          background-color: var(--color-white);
          padding: 1rem 1.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          display: flex;
          align-items: center;
          gap: 1rem;
          border: 1px solid var(--color-border);
          max-width: 280px;
          transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
        }

        .hero-floating-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
          border-color: rgba(35, 79, 69, 0.15);
        }

        @media (max-width: 640px) {
          .hero-floating-card {
            left: 10px;
            bottom: 10px;
            padding: 0.75rem 1rem;
          }
        }

        .floating-card-icon {
          font-size: 2rem;
        }

        .floating-card-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .floating-card-text strong {
          color: var(--color-text);
          font-size: 0.95rem;
        }

        .floating-card-text span {
          color: var(--color-text-muted);
          font-size: 0.8rem;
        }
      `}</style>
    </section>
  );
}
