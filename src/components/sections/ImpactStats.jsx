import React, { useEffect, useRef, useState } from 'react';
import { Users, Award, ShieldAlert, Heart } from 'lucide-react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

function Counter({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState("");
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(value);
      return;
    }

    if (isInView) {
      const numberMatch = value.match(/\d+/g);
      if (!numberMatch) {
        setCount(value);
        return;
      }
      const target = parseInt(numberMatch.join(''), 10);
      const suffix = value.replace(/[\d\s,]+/g, '');
      const hasComma = value.includes(',');

      let start = 0;
      const duration = 1.2; // seconds
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = (currentTime - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        
        // Ease out quadratic
        const easeProgress = progress * (2 - progress);
        const currentVal = Math.floor(start + (target - start) * easeProgress);

        const formatted = hasComma 
          ? currentVal.toLocaleString('en-IN') 
          : currentVal.toString();

        setCount(`${formatted}${suffix}`);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    } else {
      const suffix = value.replace(/[\d\s,]+/g, '');
      setCount(`0${suffix}`);
    }
  }, [isInView, value, shouldReduceMotion]);

  return <span ref={ref}>{count}</span>;
}

export default function ImpactStats() {
  const shouldReduceMotion = useReducedMotion();

  const stats = [
    {
      icon: <Heart size={32} className="stat-card-icon text-accent" />,
      number: "8,500+",
      label: "Street Animals Fed",
      desc: "Healthy meals provided to street cows, dogs, and birds."
    },
    {
      icon: <Users size={32} className="stat-card-icon text-primary" />,
      number: "450+",
      label: "Connected Families",
      desc: "Households regular donating their fresh breakfast surplus."
    },
    {
      icon: <Award size={32} className="stat-card-icon text-secondary" />,
      number: "65+",
      label: "Active Volunteers",
      desc: "Bridges connecting food donors with animals every single day."
    },
    {
      icon: <ShieldAlert size={32} className="stat-card-icon text-accent" />,
      number: "12,000+",
      label: "Kgs Food Saved",
      desc: "Suitable surplus meals saved from garbage bins and repurposed."
    }
  ];

  // Grid Reveal Animation
  const gridContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
    <section id="impact" className="stats-section">
      <div className="container">
        
        <motion.div 
          className="text-center section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={cardReveal}
        >
          <span className="badge badge-secondary">Our Impact</span>
          <h2>The Difference We Make Together</h2>
          <p className="lead section-subtitle">
            By transforming surplus food through responsible collection and safe feeding, we nurture healthier street animals and create a cleaner environment. Guided by transparency, we maintain detailed feeding reports, volunteer records, and impact updates to ensure complete accountability.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 grid-cols-sm-2 grid-cols-lg-4 stats-grid"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx} 
              className="card stat-card"
              variants={cardReveal}
              whileHover={shouldReduceMotion ? {} : { y: -5, boxShadow: "var(--shadow-hover)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="stat-icon-wrapper">{stat.icon}</div>
              <div className="stat-number">
                <Counter value={stat.number} />
              </div>
              <div className="stat-label">{stat.label}</div>
              <p className="stat-desc">{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Vision statement card */}
        <motion.div 
          className="impact-vision-banner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={cardReveal}
        >
          <div className="banner-content">
            <h3>"Even one extra roti can save a life."</h3>
            <p>
              Food waste contributes to environmental pollution, while hungry stray animals are often forced to consume unsafe waste. Responsible food donation provides a vital alternative, directly benefiting both the animals we feed and the communities we live in.
            </p>
          </div>
        </motion.div>

      </div>

      <style>{`
        .stats-section {
          background-color: var(--color-white);
          padding: 6rem 0;
        }

        .stats-grid {
          gap: 2rem;
          margin-bottom: 4rem;
        }

        .stat-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2.5rem 1.5rem;
          border: 1px solid var(--color-border);
          background-color: var(--color-white);
          transition: border-color var(--transition-normal);
        }

        .stat-card:hover {
          border-color: rgba(10, 77, 140, 0.15);
        }

        .stat-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: var(--radius-full);
          background-color: var(--color-bg-alt);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          border: 1px solid var(--color-border);
        }

        .stat-card-icon {
          width: 28px;
          height: 28px;
        }

        .stat-number {
          font-family: var(--font-heading);
          font-size: 2.25rem;
          font-weight: 700;
          color: var(--color-primary);
          line-height: 1.2;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 1rem;
          color: var(--color-text);
          margin-bottom: 0.75rem;
        }

        .stat-desc {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          margin-bottom: 0;
          line-height: 1.5;
        }

        .text-primary { color: var(--color-primary); }
        .text-secondary { color: #B28200; }
        .text-accent { color: var(--color-accent); }

        .impact-vision-banner {
          background-color: var(--color-primary-light); /* Soft light blue background */
          color: var(--color-primary);
          border-radius: var(--radius-lg);
          padding: 3rem 2.5rem;
          text-align: center;
          border: 1px solid var(--color-border);
          max-width: 900px;
          margin: 0 auto;
        }

        .banner-content h3 {
          color: var(--color-primary);
          font-style: italic;
          font-size: 1.6rem;
          margin-bottom: 1rem;
          font-weight: 650;
        }

        .banner-content p {
          color: var(--color-text-muted);
          font-size: 1rem;
          margin-bottom: 0;
          line-height: 1.65;
        }

        @media (max-width: 640px) {
          .impact-vision-banner {
            padding: 2.25rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
