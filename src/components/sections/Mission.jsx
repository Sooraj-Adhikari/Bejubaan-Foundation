import React from 'react';
import { Heart, RefreshCw, Sparkles, Smile, ShieldCheck, Truck } from 'lucide-react';

export default function Mission() {
  const values = [
    {
      icon: <Sparkles className="val-icon text-accent" />,
      title: "Sanatan Values",
      desc: "Rooted in our cultural heritage where the first roti (Pehli Roti) is lovingly offered to a cow, and caring for animal welfare is a sacred duty."
    },
    {
      icon: <Heart className="val-icon text-primary" />,
      title: "Compassion over Convenience",
      desc: "Enabling busy families to perform animal seva seamlessly. We bridge the gap between your kind intentions and your fast-paced daily life."
    },
    {
      icon: <RefreshCw className="val-icon text-secondary" />,
      title: "Zero Food Waste",
      desc: "Transforming surplus food from households, restaurants, and events into life-saving nourishment instead of letting it end up in landfills."
    }
  ];

  const workflowSteps = [
    {
      step: "01",
      icon: <Smile size={28} className="step-icon" />,
      title: "Notify Surplus",
      desc: "Families, events, or restaurants log surplus fresh food through our simple website interface."
    },
    {
      step: "02",
      icon: <Truck size={28} className="step-icon" />,
      title: "Responsible Collection",
      desc: "Local volunteer network is notified to safely collect the food, keeping travel times minimal."
    },
    {
      step: "03",
      icon: <ShieldCheck size={28} className="step-icon" />,
      title: "Hygiene & Feeding",
      desc: "Collected food undergoes a quality check and is immediately distributed to local street animals."
    }
  ];

  return (
    <section id="mission" className="mission-section">
      <div className="container">
        {/* Core Values */}
        <div className="text-center section-header">
          <span className="badge badge-accent">Our Foundations</span>
          <h2>A Mission of Kindness & Responsibility</h2>
          <p className="lead section-subtitle">
            We believe that service is not limited to humans—it extends to every innocent living being that cannot speak for itself.
          </p>
        </div>

        <div className="grid grid-cols-1 grid-cols-md-3 values-grid">
          {values.map((val, idx) => (
            <div key={idx} className="card value-card">
              <div className="val-icon-box">{val.icon}</div>
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </div>
          ))}
        </div>

        {/* Workflow Section */}
        <div className="workflow-container">
          <div className="text-center section-header workflow-header">
            <span className="badge badge-primary">How We Work</span>
            <h2>Simple Seva: The Ann Seva Cycle</h2>
            <p className="lead section-subtitle">
              We make animal feeding simple and practical for busy households and communities. Here is how your contribution reaches a hungry life.
            </p>
          </div>

          <div className="grid grid-cols-1 grid-cols-md-3 steps-grid">
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="step-card">
                <div className="step-number-bg">{step.step}</div>
                <div className="step-card-content">
                  <div className="step-icon-wrapper">{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .mission-section {
          background-color: var(--color-white);
          padding: 5rem 0;
        }

        .section-header {
          max-width: 700px;
          width: 100%;
          margin: 0 auto 3.5rem auto;
        }

        .section-subtitle {
          margin-top: 0.5rem;
        }

        .values-grid {
          gap: 2.25rem;
          margin-bottom: 6rem;
        }

        .value-card {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .val-icon-box {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-md);
          background-color: var(--color-bg-alt);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          border: 1px solid var(--color-border);
        }

        .val-icon {
          width: 32px;
          height: 32px;
        }

        .text-primary { color: var(--color-primary); }
        .text-secondary { color: #B28200; }
        .text-accent { color: var(--color-accent); }

        /* Workflow styles */
        .workflow-container {
          background-color: var(--color-bg-alt);
          border-radius: var(--radius-lg);
          padding: 4.5rem 2.5rem;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
        }

        .workflow-header {
          margin-bottom: 3.5rem;
        }

        .steps-grid {
          gap: 2.5rem;
          position: relative;
        }

        .step-card {
          position: relative;
          background-color: var(--color-white);
          border-radius: var(--radius-md);
          padding: 2.25rem;
          border: 1px solid var(--color-border);
          box-shadow: var(--shadow-sm);
          z-index: 2;
          overflow: hidden;
          transition: transform var(--transition-normal), box-shadow var(--transition-normal);
        }

        .step-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-md);
        }

        .step-number-bg {
          position: absolute;
          top: -10px;
          right: -5px;
          font-size: 5.5rem;
          font-weight: 800;
          font-family: var(--font-heading);
          color: rgba(10, 77, 140, 0.04);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }

        .step-icon-wrapper {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-full);
          background-color: rgba(10, 77, 140, 0.08);
          color: var(--color-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
        }

        .step-card h3 {
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
        }

        .step-card p {
          font-size: 0.95rem;
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .workflow-container {
            padding: 2.5rem 1.25rem;
          }
          .values-grid {
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .workflow-container {
            padding: 2rem 1rem;
            border-radius: var(--radius-md);
          }
        }
      `}</style>
    </section>
  );
}
