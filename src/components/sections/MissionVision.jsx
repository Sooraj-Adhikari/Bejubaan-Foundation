import React from 'react';
import { Target, Eye, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function MissionVision() {
  const shouldReduceMotion = useReducedMotion();

  const coreValues = [
    {
      icon: <Heart size={20} className="val-icon text-primary" fill="currentColor" />,
      title: "Compassion (Daya)",
      desc: "Extending warmth and feeding service to street animals who cannot ask for help."
    },
    {
      icon: <Sparkles size={20} className="val-icon text-secondary" />,
      title: "Sanatan Ethos",
      desc: "Reviving traditional values of offering the first roti to animals as a daily responsibility."
    },
    {
      icon: <ShieldCheck size={20} className="val-icon text-accent" />,
      title: "Community Duty",
      desc: "Uniting neighborhoods to solve food waste and street animal hunger collaboratively."
    }
  ];

  // Grid Stagger Animation
  const gridContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardReveal = {
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
    <section id="mission-vision" className="mv-section">
      <div className="container">
        
        {/* Mission and Vision: Dual Grid */}
        <motion.div 
          className="mv-grid"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          
          {/* Mission Card */}
          <motion.div 
            className="card mv-card border-primary-top"
            variants={cardReveal}
            whileHover={shouldReduceMotion ? {} : { y: -5, boxShadow: "var(--shadow-hover)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="mv-icon-box bg-primary-light">
              <Target size={30} className="text-primary" />
            </div>
            <h3>Our Mission</h3>
            <p className="lead">
              To facilitate the collection of fresh surplus food and ensure its responsible distribution to street animals through our network of dedicated volunteers.
            </p>
            <p>
              By channeling compassion through Ann Daan, we aim to nurture healthier stray animals, foster cleaner communities, and reduce food waste, making animal welfare structured and accessible.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div 
            className="card mv-card border-accent-top"
            variants={cardReveal}
            whileHover={shouldReduceMotion ? {} : { y: -5, boxShadow: "var(--shadow-hover)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="mv-icon-box bg-accent-light">
              <Eye size={30} className="text-accent" />
            </div>
            <h3>Our Vision</h3>
            <p className="lead">
              A future where no edible food is wasted, and no stray animal sleeps hungry.
            </p>
            <p>
              Through active community participation, we envision creating a cleaner India where neighborhood-level circular food systems are the norm, and caring for street animals is a shared daily responsibility.
            </p>
          </motion.div>

        </motion.div>

        {/* Core Values Section */}
        <motion.div 
          className="core-values-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={cardReveal}
        >
          <div className="text-center values-header">
            <span className="badge badge-secondary">Core Values</span>
            <h2>The Principles That Guide Us</h2>
          </div>

          <motion.div 
            className="grid grid-cols-1 grid-cols-md-3 values-grid"
            variants={gridContainer}
          >
            {coreValues.map((val, idx) => (
              <motion.div 
                key={idx} 
                className="value-mini-card"
                variants={cardReveal}
                whileHover={shouldReduceMotion ? {} : { y: -3, boxShadow: "var(--shadow-sm)" }}
              >
                <div className="value-header-row">
                  <div className="val-mini-icon">{val.icon}</div>
                  <h4>{val.title}</h4>
                </div>
                <p>{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>

      <style>{`
        .mv-section {
          background-color: var(--color-white);
          padding: 6rem 0;
        }

        .mv-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          margin-bottom: 5rem;
        }

        @media (max-width: 768px) {
          .mv-grid {
            gap: 1.75rem;
            margin-bottom: 2.5rem;
          }
        }

        @media (min-width: 768px) {
          .mv-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .mv-card {
          text-align: left;
          background-color: #ffffff;
          padding: 3.5rem 2.5rem;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-md);
          transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
        }

        .mv-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
          border-color: rgba(35, 79, 69, 0.15);
        }

        @media (max-width: 768px) {
          .mv-card {
            padding: 2rem 1.5rem;
          }
        }

        .border-primary-top {
          border-top: 2px solid var(--color-primary);
        }

        .border-accent-top {
          border-top: 2px solid var(--color-accent);
        }

        .mv-icon-box {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.75rem;
        }

        .bg-primary-light { background-color: rgba(35, 79, 69, 0.08); }
        .bg-accent-light { background-color: rgba(183, 146, 82, 0.08); }

        .text-primary { color: var(--color-primary); }
        .text-accent { color: var(--color-accent); }

        .mv-card h3 {
          font-size: 1.75rem;
          margin-bottom: 1rem;
          color: var(--color-primary);
        }

        .mv-card p.lead {
          font-size: 1.15rem;
          line-height: 1.6;
          color: var(--color-text);
          margin-bottom: 1.25rem;
        }

        .mv-card p {
          color: var(--color-text-muted);
          font-size: 0.975rem;
          line-height: 1.6;
          margin-bottom: 0;
        }

        /* Core Values mini cards */
        .core-values-wrapper {
          background-color: var(--color-white);
          border-radius: var(--radius-lg);
          padding: 4rem 2.5rem;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
        }

        @media (max-width: 768px) {
          .core-values-wrapper {
            padding: 2rem 1.25rem;
          }
        }

        @media (max-width: 640px) {
          .core-values-wrapper {
            padding: 2rem 1.5rem;
          }
        }

        .values-header {
          margin-bottom: 3rem;
        }

        .values-grid {
          gap: 2rem;
        }

        .value-mini-card {
          text-align: left;
          padding: 1.5rem;
          border-radius: var(--radius-md);
          background-color: var(--color-bg-alt);
          border: 1px solid var(--color-border);
          transition: all var(--transition-normal);
        }

        .value-header-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }

        .val-mini-icon {
          width: 36px;
          height: 36px;
          border-radius: var(--radius-full);
          background-color: var(--color-white);
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .value-mini-card h4 {
          font-size: 1.1rem;
          margin-bottom: 0;
          color: var(--color-primary);
          font-family: var(--font-heading);
          font-weight: 700;
        }

        .value-mini-card p {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.5;
          margin-bottom: 0;
        }

        @media (max-width: 640px) {
          .core-values-wrapper {
            padding: 2.5rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
