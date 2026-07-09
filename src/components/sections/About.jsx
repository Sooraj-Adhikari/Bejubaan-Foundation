import React from 'react';
import { Heart, ShieldCheck, Leaf } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function About() {
  const shouldReduceMotion = useReducedMotion();

  // Reveal transition
  const sectionReveal = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 25 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.45, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.section 
      id="about" 
      className="about-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionReveal}
    >
      <div className="container">
        <div className="about-grid">
          
          {/* Left Column: Visual Focus Card */}
          <div className="about-visual">
            <motion.div 
              className="about-highlight-card"
              whileHover={shouldReduceMotion ? {} : { y: -5, boxShadow: "var(--shadow-hover)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <span className="about-quote-icon">🐾</span>
              <h3>Our Core Belief</h3>
              <blockquote className="about-card-quote">
                "True service is not limited to people—it includes every innocent living being that cannot speak for itself."
              </blockquote>
              <div className="about-card-footer">
                <strong>Bejubaan Ann Seva Movement</strong>
                <span>Caring for Street Animals since Day One</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Informative Content */}
          <div className="about-info">
            <span className="badge badge-primary">Who We Are</span>
            <h2>Bridging the Gap Between Surplus Food and Hungry Lives</h2>
            <p className="lead">
              Bejubaan Ann Seva Foundation was founded to turn a daily household challenge—surplus fresh food—into a system of compassion.
            </p>
            <p>
              In our fast-paced modern lifestyles, thousands of families sincerely wish to care for street animals. However, time constraints make it difficult to go out and feed cows or dogs every day. As a result, fresh, nutritious surplus meals are often discarded. We offer a simple, volunteer-driven solution that collects suitable surplus food right from your doorstep and delivers it to street cows, dogs, and birds. By actively reducing food wastage, promoting animal welfare, and supporting environmental sustainability, we drive positive change through active community participation and volunteer engagement.
            </p>

            <div className="pillars-grid">
              <div className="pillar-item">
                <motion.div 
                  className="pillar-icon-box bg-primary-light"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Heart className="pillar-icon text-primary" size={22} fill="currentColor" />
                </motion.div>
                <div>
                  <h4>Empathetic Service</h4>
                  <p>Providing street animals with clean, fresh food cooked with kindness in local households.</p>
                </div>
              </div>

              <div className="pillar-item">
                <motion.div 
                  className="pillar-icon-box bg-accent-light"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Leaf className="pillar-icon text-accent" size={22} />
                </motion.div>
                <div>
                  <h4>Zero Food Waste</h4>
                  <p>Supporting cleaner neighborhoods through reduced food waste, responsible food management, and sustainable community participation.</p>
                </div>
              </div>

              <div className="pillar-item">
                <motion.div 
                  className="pillar-icon-box bg-secondary-light"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <ShieldCheck className="pillar-icon text-secondary" size={22} />
                </motion.div>
                <div>
                  <h4>Safety & Quality First</h4>
                  <p>Strictly checking all collected food to ensure it is healthy and appropriate for street animals.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .about-section {
          background-color: var(--color-white);
          padding: 6rem 0;
        }

        @media (max-width: 768px) {
          .about-section {
            padding: 4rem 0;
          }
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 4rem;
          align-items: center;
        }

        @media (max-width: 768px) {
          .about-grid {
            gap: 2.5rem;
          }
        }

        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: 0.9fr 1.1fr;
            gap: 5rem;
          }
        }

        /* Left visual card styling */
        .about-visual {
          display: flex;
          justify-content: center;
        }

        .about-highlight-card {
          background-color: var(--color-primary);
          color: var(--color-white);
          padding: 3rem 2.5rem;
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          text-align: left;
          position: relative;
          width: 100%;
          max-width: 440px;
          border-bottom: 6px solid var(--color-secondary);
        }

        @media (max-width: 768px) {
          .about-highlight-card {
            padding: 2rem 1.5rem;
            max-width: 100%;
          }
        }

        .about-quote-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 1.5rem;
          opacity: 0.9;
        }

        .about-card-quote {
          font-family: var(--font-heading);
          font-size: clamp(1.1rem, 3vw, 1.45rem);
          font-weight: 500;
          line-height: 1.5;
          margin-bottom: 2rem;
          font-style: italic;
          color: var(--color-white);
        }

        .about-card-footer {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
          padding-top: 1.5rem;
        }

        .about-card-footer strong {
          color: var(--color-secondary);
          font-size: 1rem;
        }

        .about-card-footer span {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.85rem;
          margin-top: 0.25rem;
        }

        /* Right content styling */
        .about-info {
          text-align: left;
        }

        .about-info h2 {
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .about-info p {
          margin-bottom: 1.5rem;
        }

        .pillars-grid {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          margin-top: 2rem;
        }

        .pillar-item {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }

        .pillar-icon-box {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bg-primary-light { background-color: rgba(10, 77, 140, 0.08); }
        .bg-accent-light { background-color: rgba(76, 175, 80, 0.08); }
        .bg-secondary-light { background-color: rgba(244, 180, 0, 0.12); }

        .text-primary { color: var(--color-primary); }
        .text-secondary { color: #B28200; }
        .text-accent { color: var(--color-accent); }

        .pillar-item h4 {
          font-size: 1.1rem;
          margin-bottom: 0.35rem;
          color: var(--color-text);
          font-family: var(--font-heading);
          font-weight: 600;
        }

        .pillar-item p {
          font-size: 0.925rem;
          color: var(--color-text-muted);
          margin-bottom: 0;
          line-height: 1.5;
        }
      `}</style>
    </motion.section>
  );
}
