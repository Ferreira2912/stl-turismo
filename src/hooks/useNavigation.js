import { useLocation } from 'react-router-dom';

export const useNavigation = () => {
  const location = useLocation();

  const pages = [
    { name: 'Home', path: '/', order: 1 },
    { name: 'Pacotes', path: '/pacotes', order: 2 },
    { name: 'Frota', path: '/frota', order: 3 },
    { name: 'Sobre Nós', path: '/sobre', order: 4 },
    { name: 'Contato', path: '/contato', order: 5 }
  ];

  const getCurrentPage = () => {
    return pages.find(page => page.path === location.pathname);
  };

  const getAdjacentPages = () => {
    const currentPage = getCurrentPage();
    if (!currentPage) return { prevPage: null, nextPage: null };

    const currentIndex = pages.findIndex(page => page.path === location.pathname);
    const prevPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
    const nextPage = currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

    return { prevPage, nextPage };
  };

  const getPageTitle = (pathname = location.pathname) => {
    const page = pages.find(p => p.path === pathname);
    return page ? page.name : 'STL Turismo';
  };

  const getRelatedPages = (currentPath = location.pathname) => {
    // Sugestões de páginas relacionadas baseadas na página atual
    const relatedMap = {
      '/': ['/pacotes', '/frota', '/sobre'],
      '/pacotes': ['/frota', '/contato', '/sobre'],
      '/frota': ['/pacotes', '/contato', '/sobre'],
      '/sobre': ['/pacotes', '/frota', '/contato'],
      '/contato': ['/pacotes', '/frota', '/sobre']
    };

    const relatedPaths = relatedMap[currentPath] || [];
    return pages.filter(page => relatedPaths.includes(page.path));
  };

  return {
    currentPage: getCurrentPage(),
    pages,
    getAdjacentPages,
    getPageTitle,
    getRelatedPages,
    isHomePage: location.pathname === '/',
    currentPath: location.pathname
  };
};

export default useNavigation;
