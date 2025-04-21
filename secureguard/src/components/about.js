import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Navbar from "./Navbar";

const About = () => {
    return (
      <>
        <Navbar/>
        <div className="about-page bg-gray-50">
            {/* Section 1: We're SecureGuard */}
            <div className="grid grid-cols-1 md:grid-cols-2 py-16 px-8 gap-16">
                <div>
                    <h2 className="text-3xl font-bold mb-6">We're SecureGuard</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        With SecureGuard, we believe that security should never be a barrier to
                        staying connected with what matters most. Our mission is to empower you
                        to protect and stay close to the people, places, and things that are
                        important to you. As a company, we are dedicated to providing
                        innovative solutions that help you maintain peace of mind and ensure that
                        distance is never an obstacle in your security and connection.
                    </p>
                </div>
                <div>
                    <img className="h-auto w-full rounded-lg shadow-md" src="/photo1.jpg" alt="security world" />
                </div>
            </div>

            {/* Section 2: Our Story - Reversed layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 py-16 px-8 gap-16 bg-white">
                {/* Image on the left */}
                <div className="flex items-center justify-center">
                    <img className="h-auto w-full rounded-lg shadow-md" src="/photo2.jpg" alt="Our story" />
                </div>
                
                {/* Content on the right */}
                <div>
                    <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        We embarked on this journey when we envisioned a more secure home system.
                        What if your home could recognize who belongs and who doesn't? This idea 
                        sparked countless hours of development and testing, culminating in our 
                        final flagship product.
                    </p>
                    <p className="text-lg text-gray-600 mb-8">
                        This product embodies our commitment to enhancing your peace of mind with
                        cutting-edge technology. At the heart of our innovation is the same pioneering
                        spirit and dedication to bridging the gap between you and the safety
                        of your home. At SecureGuard, we are dedicated to ensuring that you're always
                        connected to what matters most.
                    </p>
                </div>
            </div>

            {/* Section 3: Our Commitment */}
            <div className="grid grid-cols-1 md:grid-cols-2 py-16 px-8 gap-16 bg-gray-50">
                <div>
                    <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
                    <h3 className="text-2xl font-semibold mb-4">Fostering Connected Communities</h3>
                    <p className="text-lg text-gray-600 mb-8">
                        At SecureGuard, our mission extends beyond safeguarding your home and business;
                        it's about strengthening the bonds within your community. We believe that engaged
                        communities are resilient communities, and we are dedicated to connecting
                        people with their neighborhoods through innovative solutions and community-focused
                        initiatives.
                    </p>
                    <p className="text-lg text-gray-600 mb-8">
                        Discover how we're partnering with communities and neighborhoods worldwide to enhance
                        security and foster a sense of unity. At SecureGuard, we're committed to
                        helping you stay connected to what matters most.
                    </p>
                </div>
                <div>
                    <img className="h-auto w-full rounded-lg shadow-md" src="/photo3.jpg" alt="Our commitment" />
                </div>
            </div>
            
            {/* Footer */}
            <footer className="bg-white py-12 border-t">
                <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">SecureGuard</h3>
                        <p className="text-base text-gray-600">
                            Innovative security solutions for a safer tomorrow.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-base text-gray-600 hover:text-black">Home</a></li>
                            <li><a href="#" className="text-base text-gray-600 hover:text-black">Features</a></li>
                            <li><a href="#" className="text-base text-gray-600 hover:text-black">Pricing</a></li>
                            <li><a href="#" className="text-base text-gray-600 hover:text-black">Support</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contact</h3>
                        <p className="text-base text-gray-600">1234 ABC street. Fullerton, CA, 95283</p>
                        <p className="text-base text-gray-600">Phone: (999) 999-9999</p>
                        <p className="text-base text-gray-600">Email: info@secureguard.com</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-600 hover:text-black"><FaFacebook size={20} /></a>
                            <a href="#" className="text-gray-600 hover:text-black"><FaTwitter size={20} /></a>
                            <a href="#" className="text-gray-600 hover:text-black"><FaLinkedin size={20} /></a>
                            <a href="#" className="text-gray-600 hover:text-black"><FaInstagram size={20} /></a>
                        </div>
                    </div>
                </div>
                <div className="text-center text-base text-gray-600 mt-8">
                    © 2025 SecureGuard. All rights reserved.
                </div>
            </footer>
        </div>
      </>
    );
};

export default About;