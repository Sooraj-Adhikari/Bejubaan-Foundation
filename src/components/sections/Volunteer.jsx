import React, { useState } from 'react';
import { Heart, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { submitFormToWeb3 } from '../../services/contactService';

export default function Volunteer() {
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      location: '',
      vehicle: 'two-wheeler'
    }
  });

  const onSubmit = async (data) => {
    try {
      setSubmitError(null);
      await submitFormToWeb3(data, `Volunteer Registration: ${data.name}`);
      setSubmittedData(data);
      setSubmitted(true);
      reset();

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setSubmittedData(null);
      }, 5000);
    } catch (error) {
      setSubmitError(error.message || 'Unable to process your request at the moment.');
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
                {submitted && submittedData ? (
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
                      Thank you, {submittedData.name || 'friend'}! Your willingness to volunteer represents true compassion.
                    </p>
                    <p className="success-guidance">
                      Our coordination coordinator for <strong>{submittedData.location}</strong> will call you on <strong>{submittedData.phone}</strong> within 24 hours to schedule a short onboarding discussion.
                    </p>
                    <button 
                      onClick={() => {
                        setSubmitted(false);
                        setSubmittedData(null);
                        setSubmitError(null);
                      }} 
                      className="btn btn-outline btn-sm btn-center"
                    >
                      Register Another Volunteer
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
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
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Your Full Name"
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "vol-name-error" : undefined}
                        {...register('name', {
                          required: 'Full Name is required',
                          minLength: {
                            value: 3,
                            message: 'Name must be at least 3 characters'
                          }
                        })}
                        whileFocus={shouldReduceMotion ? {} : { scale: 1.005 }}
                        transition={{ duration: 0.2 }}
                      />
                      <AnimatePresence>
                        {errors.name && (
                          <motion.span id="vol-name-error" className="error-message" role="alert" {...errorFade}>
                            <AlertCircle size={14} />
                            {errors.name.message}
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
                          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                          placeholder="10-digit Mobile Number"
                          aria-invalid={errors.phone ? "true" : "false"}
                          aria-describedby={errors.phone ? "vol-phone-error" : undefined}
                          {...register('phone', {
                            required: 'Phone number is required',
                            validate: value => value.replace(/\D/g, '').length >= 10 || 'Phone number must be at least 10 digits'
                          })}
                          whileFocus={shouldReduceMotion ? {} : { scale: 1.005 }}
                          transition={{ duration: 0.2 }}
                        />
                        <AnimatePresence>
                          {errors.phone && (
                            <motion.span id="vol-phone-error" className="error-message" role="alert" {...errorFade}>
                              <AlertCircle size={14} />
                              {errors.phone.message}
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
                          className={`form-control ${errors.location ? 'is-invalid' : ''}`}
                          placeholder="e.g. New Delhi, Janakpuri"
                          aria-invalid={errors.location ? "true" : "false"}
                          aria-describedby={errors.location ? "vol-location-error" : undefined}
                          {...register('location', {
                            required: 'City / Locality is required',
                            minLength: {
                              value: 3,
                              message: 'Please enter a valid neighborhood or city'
                            }
                          })}
                          whileFocus={shouldReduceMotion ? {} : { scale: 1.005 }}
                          transition={{ duration: 0.2 }}
                        />
                        <AnimatePresence>
                          {errors.location && (
                            <motion.span id="vol-location-error" className="error-message" role="alert" {...errorFade}>
                              <AlertCircle size={14} />
                              {errors.location.message}
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
                        {...register('vehicle')}
                      >
                        <option value="two-wheeler">Two Wheeler (Bike/Scooter)</option>
                        <option value="four-wheeler">Four Wheeler (Car/Eco)</option>
                        <option value="none">No Vehicle (Walking Distance Seva)</option>
                      </select>
                    </div>

                    {/* Submission Error Banner */}
                    <AnimatePresence>
                      {submitError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="error-message"
                          style={{ marginBottom: '1.25rem', fontSize: '0.9rem', gap: '0.5rem' }}
                          role="alert"
                        >
                          <AlertCircle size={16} />
                          <span>{submitError}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      className="btn btn-primary btn-submit"
                      disabled={isSubmitting}
                      whileHover={shouldReduceMotion || isSubmitting ? {} : { scale: 1.02 }}
                      whileTap={shouldReduceMotion || isSubmitting ? {} : { scale: 0.97 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="btn-spinner" />
                          <span>Sending…</span>
                        </>
                      ) : (
                        <>
                          <Heart size={18} fill="currentColor" />
                          <span>Join the Movement</span>
                        </>
                      )}
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
