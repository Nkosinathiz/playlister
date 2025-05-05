import React from 'react';
import { Music } from 'lucide-react';
import { Link } from 'react-router';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-gradient-to-r from-primary-900/90 to-primary-800/90 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Music size={28} className="text-accent-300" />
          <Link to="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white to-accent-200 text-transparent bg-clip-text">
            PlayLister
          </Link>
        </div>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link 
                to="/" 
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/history" 
                className="text-white/80 hover:text-white transition-colors duration-200"
              >
                History
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;