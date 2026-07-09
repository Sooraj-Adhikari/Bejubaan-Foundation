import React from 'react';
import { FileText, Truck, Heart } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

export default function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    {
      num: "01",
      icon: <FileText size={24} />,
      title: "Tell Us About Surplus",
      desc: "Use our quick online form to log your available surplus food, fodder, or grain and your approximate location."
    },
    {
      num: "02",
      icon: <Truck size={24} />,
      title: "Volunteer Coordination",
      desc: "Our localized system flags the request, prompting a nearby volunteer to pick up the food in clean, closed boxes."
    },
    {
      num: "03",
      icon: <Heart size={24} fill="currentColor" />,
      title: "Responsible Feeding",
      desc: "After verifying food hygiene and suitability, volunteers distribute it to street cows, dogs, or birds in the area."
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
    <section id="how-it-works" className="how-section">
      <div className="container">
        
        <motion.div 
          className="text-center section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={cardReveal}
        >
          <span className="badge badge-accent">Process Workflow</span>
          <h2>The Ann Seva Cycle</h2>
          <p className="lead section-subtitle">
            We make animal feeding simple and practical. Here is how your kind contribution reaches a hungry life.
          </p>
        </motion.div>

        <motion.div 
          className="how-steps-container"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {steps.map((step, idx) => (
            <motion.div 
              key={idx} 
              className="how-step-card"
              variants={cardReveal}
              whileHover={shouldReduceMotion ? {} : { y: -5, boxShadow: "var(--shadow-md)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="how-step-num-bg">{step.num}</div>
              <div className="how-icon-circle">
                {step.icon}
              </div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
              {idx < steps.length - 1 && <div className="how-step-connector"></div>}
            </motion.div>
          ))}
        </motion.div>

      </div>

      <style>{`
        .how-section {
          background-color: var(--color-white);
          padding: 6rem 0;
        }

        .how-steps-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3.5rem;
          margin-top: 4rem;
          position: relative;
        }

        @media (min-width: 768px) {
          .how-steps-container {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 2.5rem;
          }
        }

        .how-step-card {
          position: relative;
          background-color: var(--color-white);
          border: 1px solid var(--color-border);
          padding: 2.5rem 1.75rem;
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: border-color var(--transition-normal);
        }

        .how-step-card:hover {
          border-color: rgba(10, 77, 140, 0.15);
        }

        .how-step-num-bg {
          position: absolute;
          top: 10px;
          right: 15px;
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 800;
          color: rgba(10, 77, 140, 0.05);
          line-height: 1;
          user-select: none;
        }

        .how-icon-circle {
          width: 54px;
          height: 54px;
          border-radius: var(--radius-full);
          background-color: rgba(10, 77, 140, 0.08);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .how-step-card h4 {
          font-size: 1.15rem;
          margin-bottom: 0.75rem;
          color: var(--color-primary);
          font-family: var(--font-heading);
          font-weight: 650;
        }

        .how-step-card p {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          line-height: 1.55;
          margin-bottom: 0;
        }

        /* Horizontal connector line on larger screens */
        .how-step-connector {
          display: none;
        }

        @media (min-width: 768px) {
          .how-step-connector {
            display: block;
            position: absolute;
            top: 52px;
            right: -25%;
            width: 45%;
            height: 2px;
            border-top: 2px dashed var(--color-border);
            z-index: 1;
            pointer-events: none;
          }
        }
      `}</style>
    </section>
  );
}
