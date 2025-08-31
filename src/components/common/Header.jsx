import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, Search, ChevronDown } from 'lucide-react';
import { NAVIGATION_ITEMS } from '../../utils/constants';
import { useWhatsApp } from '../../hooks/useWhatsApp';
import { useNavigation } from '../../hooks/useNavigation';

const Header = ({ transparentOnTop = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { openWhatsApp } = useWhatsApp();
  const { getPageTitle } = useNavigation();

  // Detectar scroll para mudar aparência do header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu mobile ao mudar de página
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isTransparent = transparentOnTop && !isScrolled;

  return (
    <>
    <header className={`fixed top-0 w-full z-50 border-b transition-all duration-300 ${
      isTransparent
        ? 'bg-transparent border-transparent shadow-none'
        : isScrolled
          ? 'bg-sky-700/95 text-white backdrop-blur-lg shadow-lg border-sky-700'
          : 'bg-sky-600 text-white shadow-sm border-sky-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-300">
              <img 
                src="/stl2.png" 
                alt="STL Turismo" 
                className={`h-12 w-auto ${isTransparent ? 'filter drop-shadow-md brightness-0 invert' : ''}`}
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative py-2 px-3 transition-all duration-300 font-medium rounded-lg group ${
                  isTransparent
                    ? 'text-white/90 hover:text-white/100 hover:bg-white/10'
                    : location.pathname === item.path
                      ? 'text-white bg-white/15'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-3 right-3 h-0.5 transform transition-transform duration-300 ${
                  isTransparent
                    ? 'bg-white/50'
                    : 'bg-white/40'
                } ${location.pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => openWhatsApp()}
              className={`bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 ${isTransparent ? 'ring-1 ring-white/30 ring-inset' : ''}`}
            >
              <MessageCircle size={18} />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
            
            <button 
              className={`md:hidden p-2 rounded-lg transition-colors ${isTransparent ? 'hover:bg-neutral-100' : 'hover:bg-white/10'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className={`md:hidden ${isTransparent ? 'bg-neutral-900/70 text-white' : 'bg-sky-700/95 text-white'} backdrop-blur-md border-t ${isTransparent ? 'border-white/10' : 'border-sky-600'}`}>
          <div className="px-4 py-6 space-y-4">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block py-3 px-4 rounded-lg transition-all duration-300 font-medium ${
                  isTransparent
                    ? 'text-white/90 hover:bg-white/10'
                    : location.pathname === item.path
                      ? 'text-white bg-white/15'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
    {/* Offset spacer for non-transparent pages to prevent content from hiding under fixed header */}
    {!isTransparent && <div className="h-20" />}
    </>
  );
};

export default Header;