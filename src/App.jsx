import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Fleet from './pages/Fleet';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanel';
import './styles/globals.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/pacotes" element={<Packages />} />
            <Route path="/packages/:id" element={<PackageDetail />} />
            <Route path="/frota" element={<Fleet />} />
            <Route path="/contato" element={<Contact />} />
            
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