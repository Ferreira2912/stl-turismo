import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Breadcrumb from './components/common/Breadcrumb';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Fleet from './pages/Fleet';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Promotions from './pages/Promotions';
import AdminPanel from './pages/AdminPanel';
import './styles/globals.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={
              <>
                <Breadcrumb />
                <Home />
              </>
            } />
            <Route path="/sobre" element={
              <>
                <Breadcrumb />
                <About />
              </>
            } />
            <Route path="/pacotes" element={
              <>
                <Breadcrumb />
                <Packages />
              </>
            } />
            <Route path="/packages/:id" element={
              <>
                <Breadcrumb />
                <PackageDetail />
              </>
            } />
            <Route path="/frota" element={
              <>
                <Breadcrumb />
                <Fleet />
              </>
            } />
            <Route path="/blog" element={
              <>
                <Breadcrumb />
                <Blog />
              </>
            } />
            <Route path="/promocoes" element={
              <>
                <Breadcrumb />
                <Promotions />
              </>
            } />
            <Route path="/contato" element={
              <>
                <Breadcrumb />
                <Contact />
              </>
            } />
            
            {/* Rota Admin Protegida */}
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;