import React, { useState } from 'react';
import { X, CheckCircle, Send, Heart, AlertCircle } from 'lucide-react';

export default function FoodDonationModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [foodType, setFoodType] = useState('roti');
  const [quantity, setQuantity] = useState('small');
  const [notes, setNotes] = useState('');

  // Validation States
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  if (!isOpen) return null;

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

    if (!address.trim()) {
      tempErrors.address = 'Collection Address is required';
    } else if (address.trim().length < 8) {
      tempErrors.address = 'Please enter a complete pickup address';
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
    setTouched({
      name: true,
      phone: true,
      address: true
    });

    if (validateForm()) {
      setSubmitted(true);
      setErrors({});
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    setAddress('');
    setNotes('');
    setTouched({});
    setErrors({});
    onClose();
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-container">
        
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-title">
            <Heart size={20} className="text-accent" fill="currentColor" />
            <h3>Donate Surplus Food</h3>
          </div>
          <button onClick={handleClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="modal-body">
          {submitted ? (
            <div className="success-state text-center">
              <CheckCircle size={60} className="success-icon text-accent" />
              <h3>Donation Registered!</h3>
              <p className="lead">
                Thank you, {name}! Your act of kindness will feed a street animal today.
              </p>
              <p className="success-guidance">
                Our nearest local volunteer will check details and coordinate pick-up from your address. We will contact you on <strong>{phone}</strong> shortly.
              </p>
              <button onClick={handleClose} className="btn btn-primary btn-submit">
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="modal-form" noValidate>
              <p className="modal-subtitle">
                Enter surplus food details. Our volunteer network collects food for cows, dogs, and birds.
              </p>

              <div className="form-row">
                {/* Full Name */}
                <div className="form-group">
                  <label htmlFor="modal-name" className="form-label">Full Name</label>
                  <input
                    type="text"
                    id="modal-name"
                    required
                    className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                    placeholder="Your Name"
                    value={name}
                    onBlur={() => handleBlur('name')}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (touched.name) validateForm();
                    }}
                  />
                  {touched.name && errors.name && (
                    <span className="error-message">
                      <AlertCircle size={14} />
                      {errors.name}
                    </span>
                  )}
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label htmlFor="modal-phone" className="form-label">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    id="modal-phone"
                    required
                    className={`form-control ${touched.phone && errors.phone ? 'is-invalid' : ''}`}
                    placeholder="Mobile Number"
                    value={phone}
                    onBlur={() => handleBlur('phone')}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (touched.phone) validateForm();
                    }}
                  />
                  {touched.phone && errors.phone && (
                    <span className="error-message">
                      <AlertCircle size={14} />
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                {/* Food Type */}
                <div className="form-group">
                  <label htmlFor="modal-food-type" className="form-label">Type of Food</label>
                  <select
                    id="modal-food-type"
                    className="form-control"
                    value={foodType}
                    onChange={(e) => setFoodType(e.target.value)}
                  >
                    <option value="roti">Fresh Rotis (Cows/Dogs)</option>
                    <option value="rice-mixed">Cooked Rice / Grains (Birds/Dogs)</option>
                    <option value="fodder">Green Fodder / Chara (Cows)</option>
                    <option value="multiple">Mixed Suitable Food</option>
                  </select>
                </div>

                {/* Quantity */}
                <div className="form-group">
                  <label htmlFor="modal-qty" className="form-label">Approximate Quantity</label>
                  <select
                    id="modal-qty"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  >
                    <option value="small">Small (Feeds 1-3 Animals)</option>
                    <option value="medium">Medium (Feeds 4-10 Animals)</option>
                    <option value="large">Large (Feeds 10+ Animals)</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <div className="form-group">
                <label htmlFor="modal-address" className="form-label">Collection Address</label>
                <textarea
                  id="modal-address"
                  required
                  rows="2"
                  className={`form-control ${touched.address && errors.address ? 'is-invalid' : ''}`}
                  placeholder="Complete home or location address"
                  value={address}
                  onBlur={() => handleBlur('address')}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (touched.address) validateForm();
                  }}
                ></textarea>
                {touched.address && errors.address && (
                  <span className="error-message">
                    <AlertCircle size={14} />
                    {errors.address}
                  </span>
                )}
              </div>

              {/* Notes */}
              <div className="form-group">
                <label htmlFor="modal-notes" className="form-label">Instructions (e.g. best pick up time)</label>
                <input
                  type="text"
                  id="modal-notes"
                  className="form-control"
                  placeholder="e.g. collect before 9:30 AM"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-submit">
                <Send size={16} />
                <span>Submit Donation Request</span>
              </button>
            </form>
          )}
        </div>

      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(35, 79, 69, 0.55);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 1rem;
        }

        .modal-container {
          background-color: var(--color-white);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          width: 100%;
          max-width: 600px;
          border: 1px solid var(--color-border);
          overflow: hidden;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid var(--color-border);
        }

        .modal-header-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .modal-header-title h3 {
          font-size: 1.25rem;
          color: var(--color-primary);
          margin-bottom: 0;
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
          transition: background var(--transition-fast);
        }

        .modal-close-btn:hover {
          background-color: var(--color-bg-alt);
          color: var(--color-primary);
        }

        .modal-body {
          padding: 2rem;
          text-align: left;
        }

        .modal-subtitle {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .modal-form .form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        @media (min-width: 640px) {
          .modal-form .form-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        .modal-form .form-group {
          margin-bottom: 0;
        }

        .modal-form .btn-submit {
          width: 100%;
          margin-top: 1rem;
        }
      `}</style>
    </div>
  );
}
