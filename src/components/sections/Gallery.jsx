import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function Gallery() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedImg, setSelectedImg] = useState(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const images = [
    {
      src: "/hero_impact.png",
      alt: "Indian volunteer feeding cow and dog",
      title: "Caring for Street Cows & Dogs",
      caption: "Direct feeding of nutritious meals prepared in residential areas."
    },
    {
      src: "/gallery_collection.png",
      alt: "Volunteers collecting fresh roti from home",
      title: "Doorstep Surplus Collection",
      caption: "Fresh surplus food collected directly from households in steel containers."
    },
    {
      src: "/gallery_dogs.png",
      alt: "Street dogs eating food offered by volunteers",
      title: "Stray Animal Outreach",
      caption: "Ensuring stray dogs receive hygienic food in safe neighborhood areas."
    }
  ];

  // Framer Motion variants
  const sectionReveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    }
  };

  const gridContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardReveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    }
  };

  return (
    <section id="gallery" className="gallery-section section-alt">
      <div className="container">
        
        <motion.div 
          className="text-center section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionReveal}
        >
          <span className="badge badge-primary">Media Gallery</span>
          <h2>Compassion In Action</h2>
          <p className="lead section-subtitle">
            Visual highlights of our daily collections and feeding drives in action across different communities.
          </p>
        </motion.div>

        <motion.div 
          className="gallery-grid"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {images.map((img, idx) => (
            <motion.div 
              key={idx} 
              className="gallery-card"
              variants={cardReveal}
              whileHover={shouldReduceMotion ? {} : { y: -5, boxShadow: 'var(--shadow-hover)' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={() => setSelectedImg(img)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedImg(img)}
              aria-label={`View ${img.title}`}
            >
              <div className="gallery-img-box">
                {/* Image with subtle zoom on hover */}
                <motion.img 
                  src={img.src} 
                  alt={img.alt} 
                  className="gallery-img"
                  animate={
                    !shouldReduceMotion && hoveredIdx === idx
                      ? { scale: 1.05 }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />

                {/* Hover overlay */}
                <AnimatePresence>
                  {hoveredIdx === idx && !shouldReduceMotion && (
                    <motion.div
                      className="gallery-hover-overlay"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      <motion.div
                        className="gallery-zoom-icon"
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                      >
                        <ZoomIn size={22} />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="gallery-overlay">
                <h4>{img.title}</h4>
                <p>{img.caption}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>

      {/* Premium Lightbox Modal overlay */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div 
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedImg(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selectedImg.alt}
          >
            <motion.div 
              className="lightbox-content"
              initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.94, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { scale: 0.94, opacity: 0, y: 12 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImg.src} alt={selectedImg.alt} />
              
              {/* Caption */}
              <div className="lightbox-caption">
                <h4>{selectedImg.title}</h4>
                <p>{selectedImg.caption}</p>
              </div>

              <motion.button 
                className="lightbox-close" 
                onClick={() => setSelectedImg(null)}
                aria-label="Close gallery image"
                whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <X size={18} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-section {
          background-color: var(--color-bg-alt);
          padding: 6rem 0;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2.25rem;
          margin-top: 3.5rem;
        }

        @media (min-width: 768px) {
          .gallery-grid {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }

        .gallery-card {
          position: relative;
          border-radius: var(--radius-lg);
          background-color: #ffffff;
          overflow: hidden;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--color-border);
          transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
          will-change: transform;
        }

        .gallery-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
          border-color: rgba(35, 79, 69, 0.15);
        }

        .gallery-img-box {
          width: 100%;
          padding-top: 66.66%; /* 3:2 Aspect Ratio */
          position: relative;
          overflow: hidden;
          background-color: var(--color-border);
        }

        .gallery-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          will-change: transform;
        }

        /* Hover overlay — soft dark gradient */
        .gallery-hover-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(35, 79, 69, 0.12) 0%,
            rgba(35, 79, 69, 0.35) 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .gallery-zoom-icon {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-full);
          background-color: rgba(255, 255, 255, 0.92);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-md);
        }

        .gallery-overlay {
          padding: 1.5rem;
          text-align: left;
          border-top: 1px solid var(--color-border);
        }

        .gallery-overlay h4 {
          font-size: 1.1rem;
          color: var(--color-primary);
          font-family: var(--font-heading);
          font-weight: 700;
          margin-bottom: 0.35rem;
        }

        .gallery-overlay p {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          line-height: 1.45;
          margin-bottom: 0;
        }

        /* Lightbox caption */
        .lightbox-caption {
          margin-top: 0.75rem;
          text-align: center;
          padding: 0 0.5rem;
        }

        .lightbox-caption h4 {
          font-size: 1rem;
          color: var(--color-primary);
          margin-bottom: 0.2rem;
        }

        .lightbox-caption p {
          font-size: 0.85rem;
          color: var(--color-text-muted);
          margin-bottom: 0;
        }
      `}</style>
    </section>
  );
}
