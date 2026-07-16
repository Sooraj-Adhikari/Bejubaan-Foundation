import React, { useState } from 'react';
import { Heart, Send, CheckCircle, Truck, Award, Gift } from 'lucide-react';

export default function Contribute({ initialTab = 'food' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Form submission states
  const [foodSubmitted, setFoodSubmitted] = useState(false);
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);

  // Form input states
  const [foodData, setFoodData] = useState({
    name: '',
    phone: '',
    address: '',
    foodType: 'roti',
    quantity: 'small',
    notes: ''
  });

  const [volunteerData, setVolunteerData] = useState({
    name: '',
    phone: '',
    location: '',
    vehicle: 'two-wheeler',
    timeSlot: 'morning',
    notes: ''
  });

  // Handlers
  const handleFoodSubmit = (e) => {
    e.preventDefault();
    // Simulate API request
    setFoodSubmitted(true);
  };

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    // Simulate API request
    setVolunteerSubmitted(true);
  };

  const resetForms = () => {
    setFoodSubmitted(false);
    setVolunteerSubmitted(false);
    setFoodData({ name: '', phone: '', address: '', foodType: 'roti', quantity: 'small', notes: '' });
    setVolunteerData({ name: '', phone: '', location: '', vehicle: 'two-wheeler', timeSlot: 'morning', notes: '' });
  };

  return (
    <section id="get-involved" className="contribute-section section-alt">
      <div className="container">
        
        <div className="text-center section-header">
          <span className="badge badge-primary">Get Involved</span>
          <h2>Join the Ann Seva Movement</h2>
          <p className="lead section-subtitle">
            Whether you share leftover food, donate your time, or contribute financially, every step helps feed an innocent, mute animal.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="tab-container">
          <div className="tab-buttons">
            <button
              onClick={() => { setActiveTab('food'); resetForms(); }}
              className={`tab-btn ${activeTab === 'food' ? 'active' : ''}`}
            >
              <Truck size={18} />
              <span>Donate Food</span>
            </button>
            <button
              onClick={() => { setActiveTab('volunteer'); resetForms(); }}
              className={`tab-btn ${activeTab === 'volunteer' ? 'active' : ''}`}
            >
              <Award size={18} />
              <span>Become a Volunteer</span>
            </button>
            <button
              onClick={() => { setActiveTab('financial'); resetForms(); }}
              className={`tab-btn ${activeTab === 'financial' ? 'active' : ''}`}
            >
              <Gift size={18} />
              <span>Support Financially</span>
            </button>
          </div>

          {/* Tab Content Cards */}
          <div className="card tab-content-card">
            
            {/* 1. Food Donation Form */}
            {activeTab === 'food' && (
              <div className="tab-pane animate-fade-in">
                {foodSubmitted ? (
                  <div className="success-state text-center">
                    <CheckCircle size={64} className="success-icon text-accent" />
                    <h3>Food Donation Registered!</h3>
                    <p className="lead">
                      Thank you, {foodData.name || 'kind donor'}! Your willingness to share food reflects true compassion.
                    </p>
                    <p className="success-guidance">
                      Our nearest local volunteer will verify details and reach out to coordinate collection on <strong>{foodData.phone}</strong>. Please ensure the surplus food is stored in a clean container.
                    </p>
                    <button onClick={() => setFoodSubmitted(false)} className="btn btn-outline btn-sm btn-center">
                      Register Another Donation
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="pane-header">
                      <h3>Register Surplus Food</h3>
                      <p>Tell us what fresh surplus you have available. We will arrange a volunteer for collection.</p>
                    </div>
                    <form onSubmit={handleFoodSubmit} className="contribute-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="food-name" className="form-label">Full Name</label>
                          <input
                            type="text"
                            id="food-name"
                            required
                            className="form-control"
                            placeholder="Your Name"
                            value={foodData.name}
                            onChange={(e) => setFoodData({ ...foodData, name: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="food-phone" className="form-label">Phone / WhatsApp Number</label>
                          <input
                            type="tel"
                            id="food-phone"
                            required
                            className="form-control"
                            placeholder="Mobile Number"
                            value={foodData.phone}
                            onChange={(e) => setFoodData({ ...foodData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="food-type" className="form-label">Type of Food</label>
                          <select
                            id="food-type"
                            className="form-control"
                            value={foodData.foodType}
                            onChange={(e) => setFoodData({ ...foodData, foodType: e.target.value })}
                          >
                            <option value="roti">Fresh Rotis (Cows/Dogs)</option>
                            <option value="rice-mixed">Cooked Rice / Grains (Birds/Dogs)</option>
                            <option value="fodder">Green Fodder / Chara (Cows)</option>
                            <option value="multiple">Mixed Suitable Surplus</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="food-quantity" className="form-label">Approximate Quantity</label>
                          <select
                            id="food-quantity"
                            className="form-control"
                            value={foodData.quantity}
                            onChange={(e) => setFoodData({ ...foodData, quantity: e.target.value })}
                          >
                            <option value="small">Small (Feeds 1-3 Animals)</option>
                            <option value="medium">Medium (Feeds 4-10 Animals)</option>
                            <option value="large">Large (Feeds 10+ Animals, e.g. Events)</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="food-address" className="form-label">Collection Address</label>
                        <textarea
                          id="food-address"
                          required
                          rows="2"
                          className="form-control"
                          placeholder="Your complete home or event address"
                          value={foodData.address}
                          onChange={(e) => setFoodData({ ...foodData, address: e.target.value })}
                        ></textarea>
                      </div>

                      <div className="form-group">
                        <label htmlFor="food-notes" className="form-label">Special instructions / Best time to collect</label>
                        <input
                          type="text"
                          id="food-notes"
                          className="form-control"
                          placeholder="e.g. Collect before 10 AM, calling instructions"
                          value={foodData.notes}
                          onChange={(e) => setFoodData({ ...foodData, notes: e.target.value })}
                        />
                      </div>

                      <button type="submit" className="btn btn-primary btn-submit">
                        <Send size={18} />
                        <span>Register Food Surplus</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* 2. Volunteer Signup Form */}
            {activeTab === 'volunteer' && (
              <div className="tab-pane animate-fade-in">
                {volunteerSubmitted ? (
                  <div className="success-state text-center">
                    <CheckCircle size={64} className="success-icon text-accent" />
                    <h3>Welcome to the Team!</h3>
                    <p className="lead">
                      Thank you, {volunteerData.name}! You are now a bridge between kindness and life.
                    </p>
                    <p className="success-guidance">
                      We have recorded your details. A volunteer coordinator from your area (<strong>{volunteerData.location}</strong>) will contact you on <strong>{volunteerData.phone}</strong> to guide you through the process and add you to our active coordination group.
                    </p>
                    <button onClick={() => setVolunteerSubmitted(false)} className="btn btn-outline btn-sm btn-center">
                      Register Another Volunteer
                    </button>
                  </div>
                ) : (
                  <div>
                    <div className="pane-header">
                      <h3>Join the Volunteer Network</h3>
                      <p>Be the physical link that transports food to street animals. Flexible hours, local area service.</p>
                    </div>
                    <form onSubmit={handleVolunteerSubmit} className="contribute-form">
                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="vol-name" className="form-label">Full Name</label>
                          <input
                            type="text"
                            id="vol-name"
                            required
                            className="form-control"
                            placeholder="Your Name"
                            value={volunteerData.name}
                            onChange={(e) => setVolunteerData({ ...volunteerData, name: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="vol-phone" className="form-label">Phone / WhatsApp Number</label>
                          <input
                            type="tel"
                            id="vol-phone"
                            required
                            className="form-control"
                            placeholder="Mobile Number"
                            value={volunteerData.phone}
                            onChange={(e) => setVolunteerData({ ...volunteerData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group">
                          <label htmlFor="vol-location" className="form-label">Your Area / Locality</label>
                          <input
                            type="text"
                            id="vol-location"
                            required
                            className="form-control"
                            placeholder="Neighborhood/Sector"
                            value={volunteerData.location}
                            onChange={(e) => setVolunteerData({ ...volunteerData, location: e.target.value })}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="vol-vehicle" className="form-label">Vehicle Availability</label>
                          <select
                            id="vol-vehicle"
                            className="form-control"
                            value={volunteerData.vehicle}
                            onChange={(e) => setVolunteerData({ ...volunteerData, vehicle: e.target.value })}
                          >
                            <option value="two-wheeler">Two Wheeler (Scooter/Bike)</option>
                            <option value="four-wheeler">Four Wheeler (Car/Eco)</option>
                            <option value="bicycle">Bicycle</option>
                            <option value="none">No Vehicle (Walking Distance Seva)</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="vol-time" className="form-label">Preferred Availability</label>
                        <select
                          id="vol-time"
                          className="form-control"
                          value={volunteerData.timeSlot}
                          onChange={(e) => setVolunteerData({ ...volunteerData, timeSlot: e.target.value })}
                        >
                          <option value="morning">Morning (7:00 AM - 10:00 AM)</option>
                          <option value="afternoon">Afternoon (12:00 PM - 3:00 PM)</option>
                          <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
                          <option value="flexible">Flexible / Dynamic Coordination</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="vol-notes" className="form-label">Tell us why you'd like to join (Optional)</label>
                        <input
                          type="text"
                          id="vol-notes"
                          className="form-control"
                          placeholder="e.g. Passion for animals, want to save food"
                          value={volunteerData.notes}
                          onChange={(e) => setVolunteerData({ ...volunteerData, notes: e.target.value })}
                        />
                      </div>

                      <button type="submit" className="btn btn-primary btn-submit">
                        <Heart size={18} fill="currentColor" />
                        <span>Sign Up as Volunteer</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}

            {/* 3. Financial Support Information */}
            {activeTab === 'financial' && (
              <div className="tab-pane animate-fade-in">
                <div className="pane-header text-center">
                  <div className="financial-icon-box">
                    <Heart size={40} className="text-accent" fill="currentColor" />
                  </div>
                  <h3>Support Our Core Logistics</h3>
                  <p className="lead financial-lead">
                    While food collection is completely volunteer-driven, we require funds to purchase wholesale wheat, bajra grains, fresh green fodder (chara) for cows, and medical aid kits for street animals.
                  </p>
                </div>

                <div className="financial-content">
                  <div className="grid grid-cols-1 grid-cols-md-2 details-grid">
                    <div className="bank-details-card">
                      <h4>Direct Bank Transfer</h4>
                      <p className="details-sub">Donate directly using bank details below:</p>
                      
                      <div className="bank-info-table">
                        <div className="bank-row">
                          <span className="info-key">Account Name:</span>
                          <span className="info-val">Bejubaan Ann Seva Foundation</span>
                        </div>
                        <div className="bank-row">
                          <span className="info-key">Bank Name:</span>
                          <span className="info-val">State Bank of India</span>
                        </div>
                        <div className="bank-row">
                          <span className="info-key">Account Type:</span>
                          <span className="info-val">Current Account</span>
                        </div>
                        <div className="bank-row">
                          <span className="info-key">A/C Number:</span>
                          <span className="info-val font-mono">40938592039</span>
                        </div>
                        <div className="bank-row">
                          <span className="info-key">IFSC Code:</span>
                          <span className="info-val font-mono">SBIN0001234</span>
                        </div>
                      </div>
                      <p className="tax-info">
                        * All contributions are eligible for receipt. Please email transaction copy to contact@bejubaanannsevafoundation.com to request yours.
                      </p>
                    </div>

                    <div className="funding-purpose-card">
                      <h4>How Funds are Utilized</h4>
                      <ul className="util-list">
                        <li>
                          <strong>🌾 Bulk Grains Purchases:</strong> Buying wheat and grain flours for preparing large quantities of rotis.
                        </li>
                        <li>
                          <strong>🐄 Cow Fodder (Chara):</strong> Buying green grass and hay for shelter cows and roadside cows.
                        </li>
                        <li>
                          <strong>🩹 Animal First-Aid:</strong> Providing basic treatment ointments and medical supplies for street dogs and cows with minor injuries.
                        </li>
                        <li>
                          <strong>📦 Storing Utensils:</strong> Maintaining clean containers, buckets, and bags used by volunteers for food transport.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      <style>{`
        .contribute-section {
          background-color: var(--color-bg-alt);
          padding: 5rem 0;
        }

        .tab-container {
          max-width: 900px;
          margin: 0 auto;
        }

        .tab-buttons {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          background-color: rgba(35, 79, 69, 0.05);
          padding: 0.5rem;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
        }

        @media (max-width: 768px) {
          .tab-buttons {
            flex-direction: column;
            gap: 0.25rem;
          }
        }

        .tab-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.85rem 1rem;
          border: none;
          background: none;
          color: var(--color-text-muted);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: clamp(0.8rem, 2vw, 0.95rem);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
          white-space: nowrap;
        }

        .tab-btn:hover {
          color: var(--color-primary);
          background-color: rgba(35, 79, 69, 0.03);
        }

        .tab-btn.active {
          background-color: var(--color-white);
          color: var(--color-primary);
          box-shadow: var(--shadow-sm);
        }

        .tab-content-card {
          text-align: left;
          background-color: #ffffff;
          padding: 3rem;
          box-shadow: var(--shadow-md);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
        }

        .tab-content-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
          border-color: rgba(35, 79, 69, 0.15);
        }

        @media (max-width: 640px) {
          .tab-content-card {
            padding: 1.5rem;
          }
        }

        .pane-header {
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--color-border);
          padding-bottom: 1.25rem;
        }

        .pane-header h3 {
          font-size: 1.5rem;
          color: var(--color-primary);
          margin-bottom: 0.5rem;
        }

        .pane-header p {
          color: var(--color-text-muted);
          font-size: 0.95rem;
          margin-bottom: 0;
        }

        .contribute-form {
          display: flex;
          flex-direction: column;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        @media (min-width: 768px) {
          .form-row {
            grid-template-columns: 1fr 1fr;
          }
        }

        .btn-submit {
          align-self: flex-start;
          margin-top: 1rem;
          width: 100%;
        }

        @media (min-width: 640px) {
          .btn-submit {
            width: auto;
            padding: 0.85rem 2.5rem;
          }
        }

        /* Success state styles */
        .success-state {
          padding: 2rem 0;
          max-width: 600px;
          margin: 0 auto;
        }

        .success-icon {
          margin-bottom: 1.5rem;
        }

        .success-state h3 {
          font-size: 1.75rem;
          color: var(--color-primary);
          margin-bottom: 1rem;
        }

        .success-guidance {
          background-color: var(--color-bg-alt);
          padding: 1.25rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-border);
          font-size: 0.95rem;
          color: var(--color-text);
          margin: 1.5rem 0;
          line-height: 1.6;
        }

        .btn-center {
          margin: 0 auto;
        }

        /* Financial Tab Styles */
        .financial-icon-box {
          width: 80px;
          height: 80px;
          border-radius: var(--radius-full);
          background-color: rgba(183, 146, 82, 0.15);
          color: var(--color-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem auto;
        }

        .financial-lead {
          max-width: 750px;
          margin: 0 auto;
          font-size: 1.1rem;
          line-height: 1.65;
        }

        .details-grid {
          gap: 2.5rem;
          margin-top: 2.5rem;
        }

        .bank-details-card {
          background-color: #ffffff;
          padding: 2rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-md);
          transition: transform var(--transition-normal), box-shadow var(--transition-normal), border-color var(--transition-normal);
        }

        .bank-details-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-hover);
          border-color: rgba(35, 79, 69, 0.15);
        }

        .bank-details-card h4, .funding-purpose-card h4 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--color-primary);
        }

        .details-sub {
          font-size: 0.9rem;
          color: var(--color-text-muted);
          margin-bottom: 1.5rem;
        }

        .bank-info-table {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 1.5rem;
        }

        .bank-row {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.25rem;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          padding-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        @media (max-width: 480px) {
          .bank-row {
            flex-direction: column;
          }
        }

        .info-key {
          font-weight: 600;
          color: var(--color-text-muted);
        }

        .info-val {
          font-weight: 550;
          color: var(--color-text);
        }

        .font-mono {
          font-family: monospace;
          letter-spacing: 0.05em;
        }

        .tax-info {
          font-size: 0.8rem;
          font-style: italic;
          color: var(--color-text-muted);
          line-height: 1.4;
          margin-bottom: 0;
        }

        .funding-purpose-card {
          padding: 1rem 0;
        }

        .util-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-top: 1.5rem;
        }

        .util-list li {
          font-size: 0.95rem;
          line-height: 1.5;
          color: var(--color-text-muted);
        }

        .util-list strong {
          color: var(--color-text);
          display: block;
          margin-bottom: 0.25rem;
        }
      `}</style>
    </section>
  );
}
