import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { submitFormToWeb3 } from '../../services/contactService';

export default function Contact() {
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
      email: '',
      phone: '',
      city: '',
      purpose: 'general',
      message: ''
    }
  });

  const onSubmit = async (data) => {
    try {
      setSubmitError(null);
      await submitFormToWeb3(data, `Contact Form Submission from ${data.name}`);
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

  const getPurposeLabel = (val) => {
    switch (val) {
      case 'general': return 'General Inquiry';
      case 'donation-drive': return 'Sponsor Fodder/Grain Drive';
      case 'restaurant-tieup': return 'Restaurant / Caterer Tie-up';
      case 'medical': return 'Report Injured Street Animal';
      default: return 'Inquiry';
    }
  };

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
      transition: { staggerChildren: 0.12 }
    }
  };

  const columnReveal = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    }
  };

  const errorFade = {
    initial: { opacity: 0, y: -4 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: -4, transition: { duration: 0.15 } }
  };

  const successReveal = {
    initial: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        
        <motion.div
          className="text-center section-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={sectionReveal}
        >
          <span className="badge badge-accent">Contact Us</span>
          <h2>Reach Out to Our Team</h2>
          <p className="lead section-subtitle">
            Get in touch to donate suitable surplus food, join us as a volunteer, partner with our foundation, or help spread awareness in your neighborhood.
          </p>
        </motion.div>

        <motion.div
          className="contact-grid"
          variants={gridContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Left Column: Contact info */}
          <motion.div className="contact-info-column" variants={columnReveal}>
            <div className="card info-sidebar-card">
              <h3>Contact Details</h3>
              <p className="sidebar-intro">
                Reach out to us directly or fill in the message form. We try to respond to all inquiries within 24 hours.
              </p>

              <div className="info-items">
                {[
                  { icon: <Phone size={20} className="text-primary" />, label: 'Call / WhatsApp', content: <a href="tel:+91xxxxxxxxxx">+91 xxxxx xxxxx</a> },
                  { icon: <Mail size={20} className="text-primary" />, label: 'Email Support', content: <a href="mailto:contact@bejubaanannsevafoundation.com">contact@bejubaanannsevafoundation.com</a> },
                  { icon: <MapPin size={20} className="text-primary" />, label: 'Head Office', content: <span>807, DDA 2, District Center, Janakpuri, New Delhi – 110058, India</span> },
                  { icon: <Clock size={20} className="text-primary" />, label: 'Operating Hours', content: <span>7:00 AM - 8:00 PM (Monday - Sunday)</span> }
                ].map((item, idx) => (
                  <div className="info-item" key={idx}>
                    <div className="info-icon-box">{item.icon}</div>
                    <div className="info-text">
                      <strong>{item.label}</strong>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Channels */}
              <div className="social-channels">
                <h4>Follow Our Journey</h4>
                <div className="social-icons">
                  {[
                    { href: '#facebook',  label: 'Facebook',  Icon: FaFacebook,  id: 'facebook'  },
                    { href: '#instagram', label: 'Instagram', Icon: FaInstagram, id: 'instagram' },
                    { href: '#twitter',   label: 'X',         Icon: FaXTwitter,  id: 'x'         },
                    { href: '#youtube',   label: 'YouTube',   Icon: FaYoutube,   id: 'youtube'   },
                  ].map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className={`social-icon--${social.id}`}
                      whileHover={shouldReduceMotion ? {} : { scale: 1.08, y: -2 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      <social.Icon size={18} aria-hidden="true" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact form */}
          <motion.div className="contact-form-column" variants={columnReveal}>
            <div className="card form-card">
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
                      <CheckCircle size={60} className="success-icon text-accent" />
                    </motion.div>
                    <h3>Message Sent!</h3>
                    <p className="lead">
                      Thank you for reaching out, {submittedData.name || 'friend'}.
                    </p>
                    <p className="success-guidance">
                      We have received your message regarding <strong>{getPurposeLabel(submittedData.purpose)}</strong>. Our administration team will review your message and reply via email (<strong>{submittedData.email}</strong>) or call you on <strong>{submittedData.phone}</strong> as soon as possible.
                    </p>
                    <button 
                      onClick={() => {
                        setSubmitted(false);
                        setSubmittedData(null);
                        setSubmitError(null);
                      }} 
                      className="btn btn-outline btn-sm btn-center"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="contact-form"
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3>Send Us a Message</h3>
                    
                    {/* Full Name */}
                    <div className="form-group">
                      <label htmlFor="contact-name" className="form-label">Full Name</label>
                      <motion.input
                        type="text"
                        id="contact-name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        placeholder="Your full name"
                        aria-invalid={errors.name ? "true" : "false"}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        {...register('name', {
                          required: 'Full name is required',
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
                          <motion.span
                            id="name-error"
                            className="error-message"
                            role="alert"
                            {...errorFade}
                          >
                            <AlertCircle size={14} />
                            {errors.name.message}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="form-row">
                      {/* Email */}
                      <div className="form-group">
                        <label htmlFor="contact-email" className="form-label">Email Address</label>
                        <motion.input
                          type="email"
                          id="contact-email"
                          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                          placeholder="name@example.com"
                          aria-invalid={errors.email ? "true" : "false"}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          {...register('email', {
                            required: 'Email address is required',
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: 'Please enter a valid email address'
                            }
                          })}
                          whileFocus={shouldReduceMotion ? {} : { scale: 1.005 }}
                          transition={{ duration: 0.2 }}
                        />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.span 
                              id="email-error"
                              className="error-message" 
                              role="alert"
                              {...errorFade}
                            >
                              <AlertCircle size={14} />
                              {errors.email.message}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Phone */}
                      <div className="form-group">
                        <label htmlFor="contact-phone" className="form-label">Phone Number</label>
                        <motion.input
                          type="tel"
                          id="contact-phone"
                          className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                          placeholder="Mobile Number"
                          aria-invalid={errors.phone ? "true" : "false"}
                          aria-describedby={errors.phone ? "phone-error" : undefined}
                          {...register('phone', {
                            required: 'Phone number is required',
                            validate: value => value.replace(/\D/g, '').length >= 10 || 'Phone number must be at least 10 digits'
                          })}
                          whileFocus={shouldReduceMotion ? {} : { scale: 1.005 }}
                          transition={{ duration: 0.2 }}
                        />
                        <AnimatePresence>
                          {errors.phone && (
                            <motion.span 
                              id="phone-error"
                              className="error-message" 
                              role="alert"
                              {...errorFade}
                            >
                              <AlertCircle size={14} />
                              {errors.phone.message}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="form-row">
                      {/* City */}
                      <div className="form-group">
                        <label htmlFor="contact-city" className="form-label">City</label>
                        <motion.input
                          type="text"
                          id="contact-city"
                          className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                          placeholder="Your City"
                          aria-invalid={errors.city ? "true" : "false"}
                          aria-describedby={errors.city ? "city-error" : undefined}
                          {...register('city', {
                            required: 'City is required',
                            minLength: {
                              value: 2,
                              message: 'Please enter a valid city'
                            }
                          })}
                          whileFocus={shouldReduceMotion ? {} : { scale: 1.005 }}
                          transition={{ duration: 0.2 }}
                        />
                        <AnimatePresence>
                          {errors.city && (
                            <motion.span 
                              id="city-error"
                              className="error-message" 
                              role="alert"
                              {...errorFade}
                            >
                              <AlertCircle size={14} />
                              {errors.city.message}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Purpose */}
                      <div className="form-group">
                        <label htmlFor="contact-purpose" className="form-label">Purpose</label>
                        <select
                          id="contact-purpose"
                          className="form-control"
                          {...register('purpose')}
                        >
                          <option value="general">General Inquiry</option>
                          <option value="donation-drive">Sponsor Fodder/Grain Drive</option>
                          <option value="restaurant-tieup">Restaurant / Caterer Tie-up</option>
                         
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="form-group">
                      <label htmlFor="contact-message" className="form-label">Message</label>
                      <motion.textarea
                        id="contact-message"
                        rows="4"
                        className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                        placeholder="Write your message here (min. 10 characters)..."
                        aria-invalid={errors.message ? "true" : "false"}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        {...register('message', {
                          required: 'Message is required',
                          minLength: {
                            value: 10,
                            message: 'Message must be at least 10 characters'
                          }
                        })}
                        whileFocus={shouldReduceMotion ? {} : { scale: 1.005 }}
                        transition={{ duration: 0.2 }}
                      />
                      <AnimatePresence>
                        {errors.message && (
                          <motion.span 
                            id="message-error"
                            className="error-message" 
                            role="alert"
                            {...errorFade}
                          >
                            <AlertCircle size={14} />
                            {errors.message.message}
                          </motion.span>
                        )}
                      </AnimatePresence>
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
                      whileTap={shouldReduceMotion || isSubmitting ? {} : { scale: 0.98 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="btn-spinner" />
                          <span>Sending…</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Submit Message</span>
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

      </div>

      <style>{`
        .contact-section {
          background-color: var(--color-white);
          padding: 6rem 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          align-items: start;
        }

        @media (min-width: 1024px) {
          .contact-grid {
            grid-template-columns: 0.9fr 1.1fr;
            gap: 4rem;
          }
        }

        .info-sidebar-card {
          text-align: left;
          background-color: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          box-shadow: var(--shadow-md);
          transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
        }

        .info-sidebar-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
          border-color: rgba(35, 79, 69, 0.15);
        }

        @media (max-width: 768px) {
          .info-sidebar-card {
            padding: 1.75rem 1.25rem;
          }
        }

        .info-sidebar-card h3 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--color-primary);
        }

        .sidebar-intro {
          font-size: 0.95rem;
          color: var(--color-text-muted);
          margin-bottom: 2rem;
        }

        .info-items {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .info-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background-color: var(--color-white);
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .info-text strong {
          color: var(--color-text);
          font-size: 0.9rem;
          margin-bottom: 0.15rem;
        }

        .info-text span, .info-text a {
          color: var(--color-text-muted);
          font-size: 0.95rem;
        }

        .info-text a:hover {
          color: var(--color-primary);
        }

        .social-channels {
          border-top: 1px solid var(--color-border);
          padding-top: 1.5rem;
        }

        .social-channels h4 {
          font-size: 1rem;
          margin-bottom: 0.75rem;
          color: var(--color-text);
        }

        .social-icons {
          display: flex;
          gap: 0.75rem;
        }

        .social-icons a {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-full);
          background-color: var(--color-white);
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555;
          cursor: pointer;
          text-decoration: none;
          will-change: transform;
          transition: color 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease;
        }

        .social-icons a:hover {
          box-shadow: var(--shadow-sm);
        }

        /* Per-brand hover colors */
        .social-icons a.social-icon--facebook:hover  { color: #1877F2; border-color: #1877F2; }
        .social-icons a.social-icon--instagram:hover { color: #E4405F; border-color: #E4405F; }
        .social-icons a.social-icon--x:hover         { color: #000000; border-color: #000000; }
        .social-icons a.social-icon--youtube:hover   { color: #FF0000; border-color: #FF0000; }

        /* Form Card */
        .form-card {
          background-color: #ffffff;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 2.5rem;
          box-shadow: var(--shadow-md);
          transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
        }

        .form-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
          border-color: rgba(35, 79, 69, 0.15);
        }

        @media (max-width: 768px) {
          .form-card {
            padding: 1.75rem 1.25rem;
          }
        }

        .info-text a {
          word-break: break-all;
          overflow-wrap: anywhere;
        }

        .form-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: var(--color-primary);
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 0.75rem;
        }

        /* Two-column form rows */
        .contact-form .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }

        @media (max-width: 640px) {
          .contact-form .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        /* Submit button disabled state */
        .btn[disabled] {
          opacity: 0.75;
          cursor: not-allowed;
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
          max-width: 440px;
          text-align: center;
        }

        .btn-center {
          margin-top: 1rem;
        }

        .text-primary { color: var(--color-primary); }
        .text-accent { color: var(--color-accent); }
      `}</style>
    </section>
  );
}
