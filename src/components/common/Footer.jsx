import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram, MessageCircle, ArrowUp } from 'lucide-react';
import { CONTACT_INFO, NAVIGATION_ITEMS } from '../../utils/constants';
import { useWhatsApp } from '../../hooks/useWhatsApp';

const Footer = () => {
  const { openWhatsApp } = useWhatsApp();
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="mb-4">
              <img 
                src="/stl.png" 
                alt="STL Turismo" 
                className="h-12 w-auto filter brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Sua agência de confiança para viagens inesquecíveis pelo Brasil e mundo.
            </p>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center">
                <MapPin size={16} className="mr-2" />
                <span>{CONTACT_INFO.ADDRESS}</span>
              </div>
              <div className="flex items-center">
                <Phone size={16} className="mr-2" />
                <span>(54) 99988-7766</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span>{CONTACT_INFO.EMAIL}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2 text-gray-400">
              {NAVIGATION_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link 
                    to={item.path} 
                    className={`hover:text-white transition-colors ${
                      location.pathname === item.path ? 'text-white font-medium' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Destinos Populares</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/destinos" className="hover:text-white transition-colors">Serra Gaúcha</Link></li>
              <li><Link to="/destinos" className="hover:text-white transition-colors">Foz do Iguaçu</Link></li>
              <li><Link to="/destinos" className="hover:text-white transition-colors">Florianópolis</Link></li>
              <li><Link to="/destinos" className="hover:text-white transition-colors">Buenos Aires</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Conecte-se</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram size={24} />
              </a>
              <button onClick={() => openWhatsApp()} className="text-gray-400 hover:text-green-400 transition-colors">
                <MessageCircle size={24} />
              </button>
            </div>
            <p className="text-gray-400 text-sm">
              Siga-nos nas redes sociais para dicas de viagem e promoções exclusivas!
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              &copy; {currentYear} STL Turismo. Todos os direitos reservados.
            </p>
            
            <button
              onClick={scrollToTop}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300"
            >
              <ArrowUp size={16} className="mr-2" />
              Voltar ao Topo
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;