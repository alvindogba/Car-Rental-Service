import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold">RideShare LR</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md text-lg leading-relaxed">
              Making car rental simple and affordable for everyone in Liberia. 
              Whether you wan' rent or list your car, we got you covered from Monrovia to every county.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4 mb-6">
              <a href="#" className="bg-gray-800 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-lg text-gray-400 hover:text-white hover:bg-blue-600 transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center">
                <Heart className="h-4 w-4 mr-2 text-red-500" />
                <span>Made with love in Liberia</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/browse" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Browse Cars
                </Link>
              </li>
              <li>
                <Link to="/signup" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  List Your Car
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-gray-400">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-white font-medium">+231 77 123 4567</div>
                  <div className="text-sm">24/7 Support</div>
                </div>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-white font-medium">info@ridesharelr.com</div>
                  <div className="text-sm">Email Support</div>
                </div>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <div className="bg-gray-800 p-2 rounded-lg">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-white font-medium">Monrovia, Liberia</div>
                  <div className="text-sm">Serving all 15 counties</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 RideShare LR. All rights reserved. Proudly serving Liberia.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/support" className="text-gray-400 hover:text-white text-sm transition-colors">
                Support
              </Link>
              <Link to="/safety" className="text-gray-400 hover:text-white text-sm transition-colors">
                Safety
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;