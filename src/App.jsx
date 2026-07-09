import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import FounderStory from './components/sections/FounderStory';
import MissionVision from './components/sections/MissionVision';
import HowItWorks from './components/sections/HowItWorks';
import ImpactStats from './components/sections/ImpactStats';
import Gallery from './components/sections/Gallery';
import Testimonials from './components/sections/Testimonials';
import Volunteer from './components/sections/Volunteer';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import FoodDonationModal from './components/common/FoodDonationModal';
import './App.css';

function App() {
  const [isDonationOpen, setIsDonationOpen] = useState(false);

  const scrollToSection = (id) => {
    const targetElement = document.getElementById(id);
    if (targetElement) {
      const navHeight = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleDonateAction = () => {
    setIsDonationOpen(true);
  };

  const handleVolunteerAction = () => {
    scrollToSection('volunteer-signup');
  };

  return (
    <div className="app-container">
      {/* 1. Sticky Navigation */}
      <Navbar onDonateClick={handleDonateAction} />

      {/* Main Sections */}
      <main>
        {/* 2. Hero Section */}
        <Hero 
          onDonateClick={handleDonateAction} 
          onVolunteerClick={handleVolunteerAction} 
        />

        {/* 3. About Bejubaan Foundation */}
        <About />

        {/* 4. Founder Story */}
        <FounderStory />

        {/* 5. Mission, Vision & Core Values */}
        <MissionVision />

        {/* 6. How It Works */}
        <HowItWorks />

        {/* 7. Impact Statistics */}
        <ImpactStats />

        {/* 8. Gallery */}
        <Gallery />

        {/* 9. Testimonials */}
        <Testimonials />

        {/* 10. Become a Volunteer */}
        <Volunteer />

        {/* 11. Contact Section with Contact Form */}
        <Contact />
      </main>

      {/* 12. Footer */}
      <Footer />

      {/* Interactive Food Donation Dialog */}
      <FoodDonationModal 
        isOpen={isDonationOpen} 
        onClose={() => setIsDonationOpen(false)} 
      />
    </div>
  );
}

export default App;
