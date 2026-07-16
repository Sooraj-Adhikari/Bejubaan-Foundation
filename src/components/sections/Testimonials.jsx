import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Testimonials() {
  const shouldReduceMotion = useReducedMotion();

  const reviews = [
    {
      quote: "Like many Indian homes, we felt guilty about throwing away the first roti or surplus cooked rice. Bejubaan Foundation solved this. Their volunteers collect it daily, and knowing it feeds a street cow brings peace to our hearts.",
      author: "Mrs. Rekha Sharma",
      role: "Household Food Donor, New Delhi",
      img: "/reviewer_avatar_2.webp"
    },
    {
      quote: "I wanted to spend my morning hours doing something meaningful. Being a bridge between generous households and hungry street animals has made me more compassionate. The satisfaction is my daily reward.",
      author: "Karan Verma",
      role: "Student & Active Volunteer",
      img: "/reviewer_avatar.jpg"
    },
    {
      quote: "We coordinated with the foundation during a wedding event. Instead of discarding surplus catering food, their team collected it and fed street animals responsibly. They make zero waste so simple.",
      author: "Amit Rastogi",
      role: "Event Organiser, Janakpuri",
      img:"/reviewer_avatar_3.avif"
    }
  ];

  // Grid Reveal Animation
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
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        
        <motion.div 
          className="text-center section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={cardReveal}
        >
          <span className="badge badge-accent">Community Voices</span>
          <h2>Stories of Kindness & Support</h2>
          <p className="lead section-subtitle">
            Hear from the households, volunteers, and organizers who make this movement possible every day.
          </p>
        </motion.div>

        <motion.div 
          className="testimonials-grid"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {reviews.map((rev, idx) => (
            <motion.div 
              key={idx} 
              className="card testimonial-card"
              variants={cardReveal}
              whileHover={shouldReduceMotion ? {} : { y: -5, boxShadow: "var(--shadow-hover)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <span className="testimonial-quote-mark">“</span>
              <p className="testimonial-text">{rev.quote}</p>
              
              <div className="testimonial-profile">
                <img
                  src={rev.img}
                  alt={rev.author}
                  className="testimonial-avatar"
                />
                <div className="testimonial-meta">
                  <h4>{rev.author}</h4>
                  <span>{rev.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      <style>{`
        .testimonials-section {
          background-color: var(--color-white);
          padding: 6rem 0;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.5rem;
          margin-top: 3.5rem;
        }

        @media (min-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 2.25rem;
          }
        }

        .testimonial-card {
          text-align: left;
          background-color: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          position: relative;
          box-shadow: var(--shadow-md);
          transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
        }

        .testimonial-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
          border-color: rgba(35, 79, 69, 0.15);
        }

        .testimonial-quote-mark {
          font-family: Georgia, serif;
          font-size: 4rem;
          color: rgba(35, 79, 69, 0.08);
          position: absolute;
          top: 10px;
          left: 20px;
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .testimonial-text {
          font-style: italic;
          font-size: 0.975rem;
          line-height: 1.6;
          color: var(--color-text);
          margin-bottom: 2rem;
          position: relative;
          z-index: 2;
        }

        .testimonial-profile {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-top: auto;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          padding-top: 1.25rem;
        }

        .testimonial-avatar {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background-color: var(--color-white);
          border: 1px solid var(--color-border);
          object-fit: cover;
          flex-shrink: 0;
        }

        .testimonial-meta h4 {
          font-size: 0.95rem;
          color: var(--color-primary);
          font-family: var(--font-heading);
          font-weight: 650;
          margin-bottom: 0.15rem;
        }

        .testimonial-meta span {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }
      `}</style>
    </section>
  );
}
