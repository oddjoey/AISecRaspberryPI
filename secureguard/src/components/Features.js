import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaShieldAlt, FaVideo, FaLock, FaMobile, FaBell, FaCloudUploadAlt, FaUserShield, FaBrain } from 'react-icons/fa';
import { MdFace, MdSecurity, MdNotificationsActive } from 'react-icons/md';
import { BiCctv } from 'react-icons/bi';
import Navbar from './Navbar';

const Features = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Powerful Security Features</h1>
            <p className="text-xl max-w-3xl">
              Discover the advanced technology behind SecureGuard and how it keeps your home and family protected around the clock.
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Core Security Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<BiCctv className="text-4xl text-blue-500 flext justify-center" />}
                title="24/7 Video Monitoring"
                description="Continuous recording and monitoring of your property with high-definition cameras that capture every detail."
              />
              
              <FeatureCard 
                icon={<MdFace className="text-4xl text-blue-500" />}
                title="AI Face Recognition"
                description="Advanced facial recognition technology that distinguishes between family members, friends, and unknown visitors."
              />
              
              <FeatureCard 
                icon={<FaLock className="text-4xl text-blue-500" />}
                title="Smart Access Control"
                description="Control who enters your home with customizable access permissions based on recognition or temporary access codes."
              />
            </div>
          </div>
        </section>

        {/* Feature Details */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-6">Camera Recording System</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Comprehensive Coverage</h3>
                  <ul className="space-y-3">
                    <FeatureListItem text="Multiple camera support for complete property coverage" />
                    <FeatureListItem text="High-definition 1080p video recording" />
                    <FeatureListItem text="Night vision capabilities for 24/7 monitoring" />
                    <FeatureListItem text="Weather-resistant outdoor cameras" />
                    <FeatureListItem text="Wide-angle lenses to capture more area" />
                  </ul>
                </div>
                <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
                  <FaVideo className="text-6xl text-gray-500" />
                  {/* You can replace this with an actual image */}
                </div>
              </div>
            </div>

            <div className="mb-20">
              <h2 className="text-3xl font-bold mb-6">AI-Powered Security</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 bg-gray-200 rounded-lg h-80 flex items-center justify-center">
                  <FaBrain className="text-6xl text-gray-500" />
                  {/* You can replace this with an actual image */}
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-xl font-semibold mb-4">Intelligent Protection</h3>
                  <ul className="space-y-3">
                    <FeatureListItem text="Advanced motion detection with fewer false alarms" />
                    <FeatureListItem text="Person detection vs. animal or object movement" />
                    <FeatureListItem text="Suspicious behavior analysis" />
                    <FeatureListItem text="Face recognition for family and known visitors" />
                    <FeatureListItem text="Integration with smart home security systems" />
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Mobile Control & Notifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Always Connected</h3>
                  <ul className="space-y-3">
                    <FeatureListItem text="Real-time alerts sent to your mobile device" />
                    <FeatureListItem text="Live video streaming from any camera" />
                    <FeatureListItem text="Two-way audio communication" />
                    <FeatureListItem text="Remote arm/disarm capabilities" />
                    <FeatureListItem text="Customizable notification preferences" />
                  </ul>
                </div>
                <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
                  <FaMobile className="text-6xl text-gray-500" />
                  {/* You can replace this with an actual image */}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="py-16 bg-gray-50 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Additional Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SmallFeatureCard 
                icon={<FaCloudUploadAlt />}
                title="Cloud Storage"
                description="Secure cloud storage for all recordings with easy access and playback."
              />
              <SmallFeatureCard 
                icon={<FaBell />}
                title="Custom Alerts"
                description="Set up personalized alerts for specific events, areas, or times."
              />
              <SmallFeatureCard 
                icon={<FaUserShield />}
                title="Privacy Controls"
                description="Strong privacy features with customizable recording schedules."
              />
              <SmallFeatureCard 
                icon={<MdNotificationsActive />}
                title="Emergency Response"
                description="Optional connection to emergency services for immediate response."
              />
            </div>
          </div>
        </section>

        {/* Pricing CTA */}
        <section className="py-16 bg-blue-600 text-white px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Home?</h2>
            <p className="text-xl mb-8">Choose a plan that works for your security needs and budget.</p>
            <a href="/pricing" className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
              About Pricing Plans
            </a>
          </div>
        </section>

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
                <li><a href="/" className="text-gray-600 hover:text-black">Home</a></li>
                <li><a href="/features" className="text-gray-600 hover:text-black">Features</a></li>
                <li><a href="/pricing" className="text-gray-600 hover:text-black">Pricing</a></li>
                <li><a href="/contact" className="text-gray-600 hover:text-black">Support</a></li>
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
    </>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
    <div className="mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Small Feature Card Component
const SmallFeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition duration-300">
    <div className="flex items-center mb-3">
      <div className="text-blue-500 mr-3">
        {icon}
      </div>
      <h3 className="font-semibold">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

// Feature List Item
const FeatureListItem = ({ text }) => (
  <li className="flex items-start">
    <div className="text-green-500 mr-2 mt-1">
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    </div>
    <span className="text-gray-700">{text}</span>
  </li>
);

export default Features;