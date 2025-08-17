import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';

const QuickNavigation = ({ 
  prevPage = null, 
  nextPage = null, 
  showHome = true,
  className = "" 
}) => {
  return (
    <div className={`flex justify-between items-center py-6 ${className}`}>
      <div className="flex-1">
        {prevPage && (
          <Link 
            to={prevPage.path}
            className="inline-flex items-center text-primary-600 hover:text-primary-800 transition-colors duration-300 group"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">{prevPage.name}</span>
          </Link>
        )}
      </div>
      
      {showHome && (
        <div className="flex-shrink-0 mx-4">
          <Link 
            to="/"
            className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200 transition-colors duration-300"
          >
            <Home size={16} className="mr-2" />
            <span className="text-sm font-medium">Início</span>
          </Link>
        </div>
      )}
      
      <div className="flex-1 text-right">
        {nextPage && (
          <Link 
            to={nextPage.path}
            className="inline-flex items-center text-primary-600 hover:text-primary-800 transition-colors duration-300 group"
          >
            <span className="text-sm font-medium">{nextPage.name}</span>
            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default QuickNavigation;
