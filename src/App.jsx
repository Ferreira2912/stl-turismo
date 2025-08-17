import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Breadcrumb from './components/common/Breadcrumb';
import Home from './pages/Home';
import About from './pages/About';
import Packages from './pages/Packages';
import PackageDetail from './pages/PackageDetail';
import Fleet from './pages/Fleet';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Promotions from './pages/Promotions';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Breadcrumb />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/pacotes" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetail />} />
          <Route path="/frota" element={<Fleet />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/promocoes" element={<Promotions />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;