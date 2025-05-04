import React from 'react';
import { Music, Github, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-primary-900 to-primary-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Music size={24} className="text-accent-300" />
            <span className="text-xl font-bold bg-gradient-to-r from-white to-accent-200 text-transparent bg-clip-text">
              PlayLister
            </span>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-white/70 hover:text-accent-300 transition-colors duration-200">
              <Github size={20} />
            </a>
            <a href="#" className="text-white/70 hover:text-accent-300 transition-colors duration-200">
              <Twitter size={20} />
            </a>
            <a href="#" className="text-white/70 hover:text-accent-300 transition-colors duration-200">
              <Instagram size={20} />
            </a>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between">
          <div className="text-sm text-white/60 mb-4 md:mb-0">
            © {new Date().getFullYear()} PlayLister. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
            <a href="#" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors duration-200">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;