import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function FounderStory() {
  const shouldReduceMotion = useReducedMotion();

  // Scroll Reveal Variant for paragraphs & blockquotes
  const fadeUpVariant = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 15 
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
    <section id="founder-story" className="story-section section-alt">
      <div className="container">
        
        {/* Intro Highlight (Logo + Quote above the story) */}
        <motion.div 
          className="text-center story-intro-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariant}
        >
          <img 
            src="/logo.png" 
            alt="Bejubaan Ann Seva Foundation Logo" 
            className="story-intro-logo" 
          />
          <blockquote className="story-main-quote">
            "Together, let's ensure that no food goes to waste and no innocent life sleeps hungry."
          </blockquote>
          <div className="quote-divider"></div>
        </motion.div>

        <div className="story-grid">
          {/* Left Column: Side Card */}
          <div className="story-sidebar">
            <motion.div 
              className="card story-sidebar-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUpVariant}
              whileHover={shouldReduceMotion ? {} : { y: -4, boxShadow: "var(--shadow-hover)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <span className="badge badge-primary">Our Genesis</span>
              <h3>The Spark of Seva</h3>
              <p>
                Bejubaan Ann Seva Foundation began not as an institution, but as a humble realization within a household that wanted to live out its traditional values in modern times.
              </p>
              
              <div className="sidebar-quote-box">
                <span className="quote-mark">“</span>
                <p>
                  If we are throwing away fresh surplus food while street animals sleep hungry, we are failing in our duty. We must become the bridge.
                </p>
              </div>
              
              <div className="founder-signoff">
                <div className="founder-avatar">✍️</div>
                <div>
                  <h4>The Founder Family</h4>
                  <span>Bejubaan Ann Seva Foundation</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Narrative Story Text */}
          <div className="story-content-area">
            <motion.div 
              className="story-header-text"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUpVariant}
            >
              <span className="badge badge-secondary">Founder's Story</span>
              <h2>A Small Thought That Became a Mission</h2>
            </motion.div>
            
            <div className="story-body">
              <motion.p 
                className="lead story-paragraph"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariant}
              >
                Bejubaan Ann Seva Foundation was not started as an organization. It began with a simple thought and a shared responsibility.
              </motion.p>

              <motion.p 
                className="story-paragraph"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariant}
              >
                We come from a family where kindness, compassion, and service have always been a way of life. Since childhood, we were taught that the first roti should be offered to a cow and that caring for animals is a part of our Sanatan values. Our grandparents and family always reminded us that true service is not limited to people—it also includes every innocent living being that cannot speak for itself.
              </motion.p>

              <motion.p 
                className="story-paragraph"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariant}
              >
                As time passed, we noticed something that many families experience every single day.
              </motion.p>

              <motion.div 
                className="callout-box"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariant}
              >
                <p className="callout-text">
                  Almost every morning, one or two rotis, some rice, or other food would remain at home. Like many households, we often had to throw it into the dustbin because everyone was busy with work, studies, and daily responsibilities. It wasn't that we didn't want to feed cows or other animals—we simply didn't have enough time to go out every morning.
                </p>
              </motion.div>

              <motion.p 
                className="story-paragraph highlight-question"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariant}
              >
                Every time that food was thrown away, one question stayed in our minds:
                <br />
                <strong>"If this happens in our home, how many other homes are facing the same situation?"</strong>
              </motion.p>

              <motion.p 
                className="story-paragraph"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariant}
              >
                We realized that thousands of people genuinely want to serve animals. They wish to feed cows, dogs, birds, and other innocent lives. The intention is there, but today's fast-paced lifestyle leaves very little time. As a result, food that could have nourished a life is often treated as waste and thrown away.
              </motion.p>

              <motion.p 
                className="story-paragraph"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariant}
              >
                That thought became the beginning of <strong>Bejubaan Ann Seva Foundation</strong>.
              </motion.p>

              <motion.p 
                className="story-paragraph highlight-question"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariant}
              >
                We asked ourselves:
                <br />
                <strong>"What if we could make animal feeding simple for every family? What if people could perform this seva without changing their busy routine?"</strong>
              </motion.p>

              <motion.p 
                className="story-paragraph"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariant}
              >
                With this vision, Bejubaan Ann Seva Foundation was created.
              </motion.p>

              <motion.p 
                className="story-paragraph"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariant}
              >
                Our mission is to connect households, restaurants, events, and communities with dedicated volunteers who responsibly collect suitable surplus food and deliver it to hungry animals. In this way, food is saved from being wasted, innocent lives receive nourishment, and more people become a part of this beautiful act of seva without any extra effort.
              </motion.p>

              <motion.div 
                className="story-pillars"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariant}
              >
                <h4 className="pillars-title">For us, this is more than feeding animals:</h4>
                <ul className="pillars-list">
                  <li>🌱 It is about reducing food waste.</li>
                  <li>🤝 It is about compassion over convenience.</li>
                  <li>🐾 It is about ensuring that those who cannot speak are never forgotten.</li>
                </ul>
              </motion.div>

              <motion.p 
                className="story-paragraph"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariant}
              >
                We believe that even one extra roti can save a life. When thousands of families come together, these small acts of kindness become a powerful movement.
              </motion.p>

              <motion.p 
                className="story-paragraph final-statement"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariant}
              >
                Bejubaan Ann Seva Foundation is that movement.
                <br />
                A movement where every saved meal becomes hope.
                <br />
                A movement where every volunteer becomes a bridge between food and a hungry life.
                <br />
                A movement where kindness is transformed into action.
              </motion.p>

              <motion.p 
                className="story-paragraph"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUpVariant}
              >
                We invite you to become a part of this journey. Whether you donate food, volunteer your time, or spread awareness, every contribution creates a meaningful impact.
              </motion.p>
              
              <motion.div 
                className="story-footer-quote"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
              >
                <strong>Together, let's ensure that no food goes to waste and no innocent life sleeps hungry.</strong>
              </motion.div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .story-section {
          padding: 6rem 0;
          background-color: var(--color-bg-alt);
        }

        .story-intro-header {
          max-width: 800px;
          margin: 0 auto 4rem auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .story-intro-logo {
          height: 100px;
          width: auto;
          margin-bottom: 2rem;
          object-fit: contain;
        }

        .story-main-quote {
          font-family: var(--font-heading);
          font-size: clamp(1.4rem, 3.5vw, 2rem);
          font-weight: 600;
          color: var(--color-primary);
          line-height: 1.4;
          margin-bottom: 1.5rem;
          font-style: italic;
          padding: 0 1rem;
        }

        .quote-divider {
          width: 80px;
          height: 4px;
          background-color: var(--color-secondary);
          border-radius: var(--radius-full);
          margin-top: 1rem;
        }

        .story-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3.5rem;
          align-items: start;
        }

        @media (min-width: 1024px) {
          .story-grid {
            grid-template-columns: 0.85fr 1.15fr;
            gap: 4.5rem;
          }
        }

        .story-sidebar {
          position: sticky;
          top: 100px;
        }

        .story-sidebar-card {
          text-align: left;
          background-color: var(--color-white);
        }

        .sidebar-quote-box {
          margin: 1.5rem 0;
          padding-left: 1.25rem;
          border-left: 3px solid var(--color-primary);
          position: relative;
        }

        .quote-mark {
          font-family: Georgia, serif;
          font-size: 3rem;
          color: rgba(10, 77, 140, 0.15);
          position: absolute;
          top: -20px;
          left: 5px;
          line-height: 1;
        }

        .sidebar-quote-box p {
          font-style: italic;
          color: var(--color-text);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .founder-signoff {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--color-border);
        }

        .founder-avatar {
          font-size: 1.75rem;
          width: 44px;
          height: 44px;
          background-color: rgba(244, 180, 0, 0.15);
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .founder-signoff h4 {
          font-size: 0.95rem;
          margin-bottom: 0.15rem;
        }

        .founder-signoff span {
          font-size: 0.8rem;
          color: var(--color-text-muted);
        }

        /* Story Narrative Content */
        .story-content-area {
          text-align: left;
        }

        .story-header-text {
          margin-bottom: 2rem;
        }

        .story-body {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .story-paragraph {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--color-text-muted);
          margin-bottom: 0;
        }

        .callout-box {
          background-color: #FFFDF5; /* Warm background */
          border-left: 4px solid var(--color-secondary);
          padding: 1.5rem 1.75rem;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          margin: 1rem 0;
        }

        .callout-text {
          font-size: 1.05rem;
          line-height: 1.65;
          color: var(--color-text);
          margin-bottom: 0;
        }

        .highlight-question {
          border-left: 4px solid var(--color-primary);
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          font-size: 1.15rem;
          color: var(--color-primary);
        }

        .highlight-question strong {
          color: var(--color-primary);
        }

        .story-pillars {
          background-color: rgba(76, 175, 80, 0.05);
          border: 1px dashed rgba(76, 175, 80, 0.3);
          border-radius: var(--radius-md);
          padding: 1.5rem 1.75rem;
          margin: 1rem 0;
        }

        .pillars-title {
          color: var(--color-accent-hover);
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }

        .pillars-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .pillars-list li {
          font-weight: 550;
          color: var(--color-text);
          font-size: 1rem;
        }

        .final-statement {
          font-size: 1.1rem;
          line-height: 1.8;
          font-weight: 550;
          color: var(--color-primary);
          border-left: 4px solid var(--color-accent);
          padding-left: 1.5rem;
          margin: 1.5rem 0;
        }

        .story-footer-quote {
          margin-top: 2.5rem;
          padding: 1.25rem;
          text-align: center;
          background-color: var(--color-white);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
          color: var(--color-primary);
          font-size: 1.1rem;
        }
      `}</style>
    </section>
  );
}
