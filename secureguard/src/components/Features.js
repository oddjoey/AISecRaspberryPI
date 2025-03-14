// src/components/Live.js
import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Features = () => {
  return (
    <div className="features-page">
      <h1>List of Features</h1>
      {/* Add your live page content */}

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

export default Features;