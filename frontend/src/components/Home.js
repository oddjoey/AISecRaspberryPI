import React from 'react';
import { FaLock, FaMobile, FaBell, FaVideo, FaFingerprint, FaRobot, FaDoorClosed, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Home Section */}
      <div className="text-center py-20 px-4">
        <h1 className="text-4xl font-bold mb-4">Advanced Security for Your Peace of Mind</h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          SecureGuard offers state-of-the-art protection for homes and businesses. Experience
          unparalleled safety with our innovative security solutions.
        </p>
        <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300">
          Get Started
        </button>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-12">Key Benefits</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <BenefitCard
            icon={<FaLock className="w-8 h-8" />}
            title="24/7 Monitoring"
            description="Round-the-clock surveillance ensuring your property is always protected."
          />
          <BenefitCard
            icon={<FaMobile className="w-8 h-8" />}
            title="Mobile Control"
            description="Manage your security system from anywhere using our intuitive mobile app."
          />
          <BenefitCard
            icon={<FaBell className="w-8 h-8" />}
            title="Instant Alerts"
            description="Receive immediate notifications for any unusual activity or breaches."
          />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
          <FeatureCard
            icon={<FaVideo className="w-8 h-8" />}
            title="HD Video Surveillance"
            description="Crystal clear footage with our high-definition cameras, ensuring no detail is missed."
          />
          <FeatureCard
            icon={<FaDoorClosed className="w-8 h-8" />}
            title="Smart Door Locks"
            description="Keyless entry systems with remote access control for advanced convenience and security."
          />
          <FeatureCard
            icon={<FaFingerprint className="w-8 h-8" />}
            title="Biometric Access"
            description="Advanced fingerprint and facial recognition technology for foolproof authentication."
          />
          <FeatureCard
            icon={<FaRobot className="w-8 h-8" />}
            title="AI-Powered Analysis"
            description="Intelligent threat detection and analysis to minimize false alarms and enhance response times."
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Property?</h2>
        <p className="text-gray-600 mb-8">
          Join thousands of satisfied customers who trust SecureGuard for their security needs.
        </p>
        <div className="space-x-4">
          <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition duration-300">
            Get a Free Quote
          </button>
          <button className="border border-black text-black px-6 py-3 rounded-md hover:bg-gray-100 transition duration-300">
            Contact Sales
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-12 border-t">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">SecureGuard</h3>
            <p className="text-gray-600">
              Innovative security solutions for a safer tomorrow.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black">Support</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <p className="text-gray-600">1234 ABC street. Fullerton, CA, 95283</p>
            <p className="text-gray-600">Phone: (999) 999-9999</p>
            <p className="text-gray-600">Email: info@secureguard.com</p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-black"><FaFacebook /></a>
              <a href="#" className="text-gray-600 hover:text-black"><FaTwitter /></a>
              <a href="#" className="text-gray-600 hover:text-black"><FaLinkedin /></a>
              <a href="#" className="text-gray-600 hover:text-black"><FaInstagram /></a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-600 mt-8">
          © 2025 SecureGuard. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const BenefitCard = ({ icon, title, description }) => (
  <div className="text-center p-6">
    <div className="flex justify-center mb-4">{icon}</div>
    <h3 className="font-bold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="flex items-start space-x-4">
    <div className="text-black">{icon}</div>
    <div>
      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

export default Home;