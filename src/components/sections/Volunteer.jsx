import React, { useState } from 'react';
import { Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function Volunteer() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [vehicle, setVehicle] = useState('two-wheeler');
  
  // Validation State
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const shouldReduceMotion = useReducedMotion();

  const validateForm = () => {
    const tempErrors = {};
    if (!name.trim()) {
      tempErrors.name = 'Full Name is required';
    } else if (name.trim().length < 3) {
      tempErrors.name = 'Name must be at least 3 characters';
    }

    if (!phone.trim()) {
      tempErrors.phone = 'Phone number is required';
    } else {
      const cleaned = phone.replace(/\D/g, '');
      if (cleaned.length < 10) {
        tempErrors.phone = 'Phone number must be at least 10 digits';
      }
    }

    if (!location.trim()) {
      tempErrors.location = 'City / Locality is required';
    } else if (location.trim().length < 3) {
      tempErrors.location = 'Please enter a valid neighborhood or city';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, phone: true, location: true });
    if (validateForm()) {
      setSubmitted(true);
      setErrors({});
    }
  };

  // ---- Framer Motion Variants ----
  const sectionReveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    }
  };

  const promoContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.15 }
    }
  };

  const bulletReveal = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -12 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: 'easeOut' }
    }
  };

  const formReveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut', delay: 0.1 }
    }
  };

  const errorFade = {
    initial: { opacity: 0, y: -4 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: -4, transition: { duration: 0.15 } }
  };

  const successReveal = {
    initial: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  const promoBullets = [
    {
      icon: '🕒',
      title: 'Flexible Commitment',
      desc: 'Dedicate as little as 2 hours a week during morning or evening slots.'
    },
    {
      icon: '📍',
      title: 'Local Coordination',
      desc: 'Collect surplus food and distribute it in your immediate neighborhood.'
    },
    {
      icon: '🤝',
      title: 'Strong Community Network',
      desc: 'We collaborate with Restaurants, Hotels, Housing Societies, Corporate Offices, Educational Institutions, and Community Groups to build a compassionate network.'
    }
  ];

  return (
    <motion.section
      id="volunteer-signup"
      className="volunteer-section section-alt"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={sectionReveal}
    >
      <div className="container">
        
        <div className="volunteer-card-wrapper">
          <div className="volunteer-grid">
            
            {/* Column 1: Info and Value Statement */}
            <motion.div
              className="volunteer-promo"
              variants={promoContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <motion.span className="badge badge-primary" variants={bulletReveal}>
                Volunteering
              </motion.span>
              <motion.h2 variants={bulletReveal}>
                Become a Bridge of Hope
              </motion.h2>
              <motion.p className="lead promo-lead" variants={bulletReveal}>
                Our volunteers serve as the vital bridge connecting generous food donors with hungry street animals. Join us to make animal care a shared community value.
              </motion.p>
              
              <div className="promo-bullets">
                {promoBullets.map((bullet, idx) => (
                  <motion.div
                    key={idx}
                    className="promo-bullet"
                    variants={bulletReveal}
                  >
                    <span className="bullet-icon">{bullet.icon}</span>
                    <div>
                      <strong>{bullet.title}</strong>
                      <p>{bullet.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Column 2: Interactive Volunteer Form */}
            <motion.div
              className="volunteer-form-box"
              variants={formReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    className="success-state text-center"
                    {...successReveal}
                  >
                    <motion.div
                      initial={{ scale: shouldReduceMotion ? 1 : 0.7, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                    >
                      <CheckCircle size={64} className="success-icon text-accent" />
                    </motion.div>
                    <h3>Welcome to the Team!</h3>
                    <p className="lead">
                      Thank you, {name}! Your willingness to volunteer represents true compassion.
                    </p>
                    <p className="success-guidance">
                      Our coordination coordinator for <strong>{location}</strong> will call you on <strong>{phone}</strong> within 24 hours to schedule a short onboarding discussion.
                    </p>
                    <button 
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setPhone('');
                        setLocation('');
                        setTouched({});
                      }} 
                      className="btn btn-outline btn-sm btn-center"
                    >
                      Register Another Volunteer
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="volunteer-form"
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3>Volunteer Registration</h3>
                    <p className="form-subtitle">Fill in your details below and our team will get in touch.</p>

                    {/* Full Name */}
                    <div className="form-group">
                      <label htmlFor="vol-reg-name" className="form-label">Full Name</label>
                      <motion.input
                        type="text"
                        id="vol-reg-name"
                        required
                        className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                        placeholder="Your Full Name"
                        value={name}
                        onBlur={() => handleBlur('name')}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (touched.name) validateForm();
                        }}
                        whileFocus={shouldReduceMotion ? {} : { scale: 1.005 }}
                        transition={{ duration: 0.2 }}
                      />
                      <AnimatePresence>
                        {touched.name && errors.name && (
                          <motion.span className="error-message" {...errorFade}>
                            <AlertCircle size={14} />
                            {errors.name}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="form-row">
                      {/* Phone Number */}
                      <div className="form-group">
                        <label htmlFor="vol-reg-phone" className="form-label">Phone / WhatsApp</label>
                        <motion.input
                          type="tel"
                          id="vol-reg-phone"
                          required
                          className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
                          placeholder="10-digit Mobile Number"
                          value={phone}
                          onBlur={() => handleBlur('phone')}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            if (touched.phone) validateForm();
                          }}
                          whileFocus={shouldReduceMotion ? {} : { scale: 1.005 }}
                          transition={{ duration: 0.2 }}
                        />
                        <AnimatePresence>
                          {touched.phone && errors.phone && (
                            <motion.span className="error-message" {...errorFade}>
                              <AlertCircle size={14} />
                              {errors.phone}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Location */}
                      <div className="form-group">
                        <label htmlFor="vol-reg-location" className="form-label">City / Locality</label>
                        <motion.input
                          type="text"
                          id="vol-reg-location"
                          required
                          className={`form-control ${touched.location && errors.location ? 'is-invalid' : ''}`}
                          placeholder="e.g. New Delhi, Janakpuri"
                          value={location}
                          onBlur={() => handleBlur('location')}
                          onChange={(e) => {
                            setLocation(e.target.value);
                            if (touched.location) validateForm();
                          }}
                          whileFocus={shouldReduceMotion ? {} : { scale: 1.005 }}
                          transition={{ duration: 0.2 }}
                        />
                        <AnimatePresence>
                          {touched.location && errors.location && (
                            <motion.span className="error-message" {...errorFade}>
                              <AlertCircle size={14} />
                              {errors.location}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Vehicle Availability */}
                    <div className="form-group">
                      <label htmlFor="vol-reg-vehicle" className="form-label">Vehicle Availability</label>
                      <select
                        id="vol-reg-vehicle"
                        className="form-control"
                        value={vehicle}
                        onChange={(e) => setVehicle(e.target.value)}
                      >
                        <option value="two-wheeler">Two Wheeler (Bike/Scooter)</option>
                        <option value="four-wheeler">Four Wheeler (Car/Eco)</option>
                        <option value="none">No Vehicle (Walking Distance Seva)</option>
                      </select>
                    </div>

                    <motion.button
                      type="submit"
                      className="btn btn-primary btn-submit"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                    >
                      <Heart size={18} fill="currentColor" />
                      <span>Join the Movement</span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>

      </div>

      <style>{`
        .volunteer-section {
          background-color: var(--color-bg-alt);
          padding: 6rem 0;
        }

        .volunteer-card-wrapper {
          background-color: var(--color-white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--color-border);
          overflow: hidden;
          max-width: 1000px;
          margin: 0 auto;
        }

        .volunteer-grid {
          display: grid;
          grid-template-columns: 1fr;
        }

        @media (min-width: 1024px) {
          .volunteer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* Promo column - Light styled */
        .volunteer-promo {
          background-color: var(--color-primary-light);
          color: var(--color-primary);
          padding: 3.5rem;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: center;
          border-right: none;
          border-bottom: 1px solid var(--color-border);
        }

        @media (min-width: 1024px) {
          .volunteer-promo {
            border-right: 1px solid var(--color-border);
            border-bottom: none;
          }
        }

        @media (max-width: 640px) {
          .volunteer-promo {
            padding: 2rem 1.5rem;
          }
        }

        .volunteer-promo h2 {
          color: var(--color-primary);
          margin-bottom: 1rem;
        }

        .promo-lead {
          color: var(--color-text-muted);
          margin-bottom: 2rem;
          font-size: 1.05rem;
        }

        .promo-bullets {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .promo-bullet {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }

        .bullet-icon {
          font-size: 1.35rem;
          background-color: var(--color-white);
          border: 1px solid var(--color-border);
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .promo-bullet strong {
          color: var(--color-primary);
          font-size: 1.05rem;
          display: block;
          margin-bottom: 0.15rem;
        }

        .promo-bullet p {
          color: var(--color-text-muted);
          font-size: 0.9rem;
          margin-bottom: 0;
          line-height: 1.45;
        }

        /* Form column */
        .volunteer-form-box {
          padding: 3.5rem;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @media (max-width: 640px) {
          .volunteer-promo, .volunteer-form-box {
            padding: 2rem 1.5rem;
          }
        }

        .volunteer-form h3 {
          font-size: 1.5rem;
          color: var(--color-primary);
          margin-bottom: 0.35rem;
        }

        .form-subtitle {
          font-size: 0.875rem;
          color: var(--color-text-muted);
          margin-bottom: 2rem;
        }

        .volunteer-form .form-group {
          margin-bottom: 1.25rem;
        }

        .volunteer-form .btn-submit {
          width: 100%;
          margin-top: 1rem;
          will-change: transform;
        }

        /* Success state */
        .success-state {
          padding: 2rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .success-icon {
          color: var(--color-accent);
          margin-bottom: 0.5rem;
        }

        .success-state h3 {
          font-size: 1.75rem;
          color: var(--color-primary);
        }

        .success-guidance {
          font-size: 0.925rem;
          line-height: 1.6;
          color: var(--color-text-muted);
          max-width: 380px;
          text-align: center;
        }

        .btn-center {
          margin-top: 1rem;
        }

        .text-accent { color: var(--color-accent); }
      `}</style>
    </motion.section>
  );
}
