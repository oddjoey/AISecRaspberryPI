import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';
import Navbar from './Navbar';

const Contact = () => {
  return (
    <>
      <Navbar/>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center bg-white py-12 px-4 mt-16">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <FaEnvelope className="w-6 h-6 text-gray-600"></FaEnvelope>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
              <p className="mt-2 text-sm text-gray-600">We'd love to hear from you</p>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-left">
                  <label className="block text-sm text-gray-600 mb-1">First Name</label>
                  <input
                    type="text"
                    placeholder="First"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                  />
                </div>

                <div className="text-left">
                  <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                  />
                </div>
              </div>

              <div className="text-left">
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                />
              </div>

              <div className="text-left">
                <label className="block text-sm text-gray-600 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                />
              </div>

              <div className="text-left">
                <label className="block text-sm text-gray-600 mb-1">Message</label>
                <textarea
                  placeholder="Your message here..."
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-gray-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition duration-200 mt-6"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

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
    </>
  );
};

export default Contact;