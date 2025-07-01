import React from 'react';
import { User, Settings, Home } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="bg-blue-600 p-2 rounded-lg">
              <User className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Mon Assistant Personnel</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Home className="h-4 w-4" />
              <span className="text-sm">Accueil</span>
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;