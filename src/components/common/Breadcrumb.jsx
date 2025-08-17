import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap = {
    'pacotes': 'Pacotes',
    'packages': 'Pacote',
    'frota': 'Frota',
    'sobre': 'Sobre Nós',
    'contato': 'Contato',
    'blog': 'Blog',
    'promocoes': 'Promoções'
  };

  if (location.pathname === '/') return null;

  return (
    <nav className="bg-gradient-to-r from-primary-50 to-blue-50 border-b border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link 
              to="/" 
              className="flex items-center text-primary-600 hover:text-primary-800 transition-colors duration-300"
            >
              <Home size={16} className="mr-1" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>
          
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            const name = breadcrumbNameMap[value] || value;

            return (
              <li key={to} className="flex items-center">
                <ChevronRight size={16} className="mx-2 text-neutral-400" />
                {isLast ? (
                  <span className="text-neutral-700 font-medium capitalize">
                    {name}
                  </span>
                ) : (
                  <Link 
                    to={to} 
                    className="text-primary-600 hover:text-primary-800 transition-colors duration-300 capitalize"
                  >
                    {name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
