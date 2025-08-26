import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Star, Users, ChevronRight, Filter, Search, DollarSign, Clock, Plane, Bus, Ship } from 'lucide-react';
import { getPackages } from '../services/database';
import { useWhatsApp } from '../hooks/useWhatsApp';
import { useNavigation } from '../hooks/useNavigation';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';
import QuickNavigation from '../components/common/QuickNavigation';
import ReservationButton from '../components/reservation/ReservationButton';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openWhatsApp } = useWhatsApp();
  const { getAdjacentPages } = useNavigation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState({});
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      setLoading(true);
      const data = await getPackages(100); // Busca até 100 pacotes
      setPackages(data);
    } catch (error) {
      console.error('Erro ao carregar pacotes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Contagens para exibir nos filtros
  const counts = {
    all: packages.length,
    featured: packages.filter(p => p.featured).length,
    national: packages.filter(p => p.category === 'nacional').length,
    international: packages.filter(p => p.category === 'internacional').length,
    maritimo: packages.filter(p => p.transportMode === 'maritimo' || p.transportMode === 'aereo' || p.transportMode === 'misto').length,
    rodoviario: packages.filter(p => p.transportMode === 'rodoviario').length
  };

  // Filtros e busca
  const filteredPackages = packages
    .filter(pkg => {
      if (filter === 'featured') return pkg.featured;
      if (filter === 'national') return pkg.category === 'nacional';
      if (filter === 'international') return pkg.category === 'internacional';
      if (filter === 'maritimo') return pkg.transportMode === 'maritimo' || pkg.transportMode === 'aereo' || pkg.transportMode === 'misto';
      if (filter === 'rodoviario') return pkg.transportMode === 'rodoviario';
      return true;
    })
    .filter(pkg => 
      pkg.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        const aDate = a.date ? new Date(a.date) : new Date('9999-12-31');
        const bDate = b.date ? new Date(b.date) : new Date('9999-12-31');
        return bDate - aDate; // Ordem crescente (mais próximo primeiro)
      }
      if (sortBy === 'price') {
        const aPrice = a.promotionalPrice || a.price || 0;
        const bPrice = b.promotionalPrice || b.price || 0;
        return aPrice - bPrice;
      }
      if (sortBy === 'duration') return (a.duration || '').localeCompare(b.duration || '');
      if (sortBy === 'name') return (a.title || '').localeCompare(b.title || '');
      return 0;
    });

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop"
            alt="Destinos de Viagem"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-float"></div>
          <div className="absolute bottom-32 right-32 w-24 h-24 bg-accent-400 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-20 w-16 h-16 bg-white/50 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <div className="flex justify-center mb-8">
              <img 
                src="/stl.png" 
                alt="STL Turismo" 
                className="h-20 w-auto filter brightness-0 invert"
              />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Nossos <span className="text-accent-300">Pacotes</span>
            </h1>
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              Descubra experiências únicas com nossos pacotes nacionais e internacionais. 
              <br className="hidden md:block" />
              Conforto, segurança e momentos inesquecíveis.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 bg-neutral-50 border-b border-neutral-200 sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-neutral-50/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="flex w-full gap-4">
              <div className="relative flex-1 max-w-md">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Buscar destinos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                />
              </div>
              {(filter !== 'all' || searchTerm) && (
                <button
                  onClick={() => { setFilter('all'); setSearchTerm(''); }}
                  className="px-4 py-2.5 text-sm font-medium rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-100 transition"
                >
                  Limpar
                </button>
              )}
            </div>

            {/* Filters */}
            <div className="w-full overflow-x-auto no-scrollbar pb-1">
              <div className="inline-flex gap-2 min-w-full pr-4">
                {[ 
                  { key: 'all', label: 'Todos', icon: MapPin },
                  { key: 'featured', label: 'Destaques', icon: Star },
                  { key: 'national', label: 'Nacional', icon: MapPin },
                  { key: 'international', label: 'Internacional', icon: MapPin },
                  { key: 'maritimo', label: 'Marítimo', icon: Ship },
                  { key: 'rodoviario', label: 'Rodoviário', icon: Bus }
                ].map(({ key, label, icon: Icon }) => {
                  const active = filter === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setFilter(key)}
                      className={`relative flex items-center gap-1.5 pl-3 pr-3 py-2 rounded-lg text-xs font-medium border transition-all whitespace-nowrap ${
                        active
                          ? 'bg-primary-600 border-primary-600 text-white shadow'
                          : 'bg-white border-neutral-300 text-neutral-600 hover:border-primary-400 hover:bg-primary-50'
                      }`}
                    >
                      <Icon size={14} />
                      <span>{label}</span>
                      <span className={`ml-1 px-1.5 py-0.5 rounded-md text-[10px] font-semibold ${active ? 'bg-white/20 text-white' : 'bg-neutral-200 text-neutral-700'}`}>{counts[key]}</span>
                      {active && <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-400 rounded-full"></span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2.5 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            >
              <option value="date">Data</option>
              <option value="price">Preço</option>
              <option value="name">Nome</option>
              <option value="duration">Duração</option>
            </select>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section id="packages" data-animate className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center">
              <Loading size="lg" text="Carregando pacotes..." />
            </div>
          ) : (
            <>
              <div className="text-center mb-12">
                <p className="text-lg text-neutral-600">
                  {filteredPackages.length} {filteredPackages.length === 1 ? 'pacote encontrado' : 'pacotes encontrados'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPackages.map((pkg, index) => (
                  <div 
                    key={pkg.id}
                    className={`group transition-all duration-700 md:${isVisible.packages ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-neutral-100 flex flex-col h-full">
                      {/* Image */}
                      <div className="relative overflow-hidden h-60">
                        <img 
                          src={pkg.images && pkg.images[0] ? pkg.images[0] : '/api/placeholder/400/300'} 
                          alt={pkg.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        
                        {/* Discount Badge */}
                        {pkg.originalPrice && pkg.promotionalPrice && pkg.promotionalPrice < pkg.originalPrice && (
                          <div className="absolute top-4 left-4 bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                            {Math.round(((pkg.originalPrice - pkg.promotionalPrice) / pkg.originalPrice) * 100)}% OFF
                          </div>
                        )}

                        {/* Featured Badge */}
                        {pkg.featured && (
                          <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center">
                            <Star size={12} className="mr-1 fill-current" />
                            DESTAQUE
                          </div>
                        )}
                        
                        {/* Duration Badge */}
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-neutral-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {pkg.duration}
                        </div>
                        
                        {/* Transport Mode Badge */}
                        {pkg.transportMode && (
                          <div className={`absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1
                            ${(pkg.transportMode === 'maritimo' || pkg.transportMode === 'aereo' || pkg.transportMode === 'misto') ? 'bg-blue-600 text-white' : pkg.transportMode === 'rodoviario' ? 'bg-emerald-600 text-white' : 'bg-purple-600 text-white'}`}
                          >
                            {(pkg.transportMode === 'maritimo' || pkg.transportMode === 'aereo' || pkg.transportMode === 'misto') && <Ship size={12} />}
                            {pkg.transportMode === 'rodoviario' && <Bus size={12} />}
                            <span className="capitalize">
                              {pkg.transportMode === 'aereo' || pkg.transportMode === 'misto' ? 'Marítimo' : pkg.transportMode}
                            </span>
                          </div>
                        )}

                        {/* Destination Badge */}
                        <div className="absolute bottom-4 right-4 bg-primary-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                          <MapPin size={14} className="mr-1" />
                          {pkg.destination}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-5 flex flex-col h-full">
                        <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                          {pkg.title}
                        </h3>
                        {(pkg.departureDate || pkg.returnDate) ? (
                          <div className="flex items-center text-sm text-neutral-500 mb-4">
                            <Calendar size={14} className="mr-2 text-primary-600" />
                            <span>
                              {(pkg.departureDate ? new Date(pkg.departureDate).toLocaleDateString('pt-BR') : 'Data a definir')} - {(pkg.returnDate ? new Date(pkg.returnDate).toLocaleDateString('pt-BR') : 'Data a definir')}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center text-sm text-neutral-400 mb-4">
                            <Calendar size={14} className="mr-2" />
                            <span>Datas a definir</span>
                          </div>
                        )}
                        <div className="text-neutral-600 mb-2 leading-relaxed clamp-2 min-h-[40px] text-sm">
                          {pkg.description || ' '}
                        </div>
                        
                        {/* Highlights */}
                        <div className="space-y-1 mb-3 text-[11px]">
                          {pkg.includes && pkg.includes.slice(0, 3).map((highlight, i) => (
                            <div key={i} className="flex items-center text-sm text-neutral-700">
                              <div className="w-2 h-2 bg-accent-500 rounded-full mr-3 flex-shrink-0"></div>
                              <span>{highlight}</span>
                            </div>
                          ))}
                          {pkg.includes && pkg.includes.length > 3 && (
                            <div className="text-sm text-primary-600 font-medium">
                              +{pkg.includes.length - 3} mais inclusos
                            </div>
                          )}
                        </div>
                        
                        {/* Price / Installments */}
                        <div className="flex items-center justify-between mb-0">
                          <div>
                            {pkg.promotionalPrice && pkg.originalPrice && (
                              <span className="block text-neutral-400 line-through text-lg">
                                R$ {pkg.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            )}
                            <div className="text-3xl font-bold text-primary-600">
                              R$ {(pkg.promotionalPrice || pkg.price || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </div>
                            <span className="block text-neutral-500 text-sm">por pessoa</span>
                            {pkg.installments && pkg.installments > 1 && (
                              <span className="block text-sm text-primary-600 font-semibold mt-1">
                                ou {pkg.installments}x de R$ {((pkg.promotionalPrice || pkg.price || 0) / pkg.installments).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="mt-auto space-y-2 pt-1">
                          <ReservationButton 
                            packageData={pkg}
                            text="Fazer Reserva"
                            size="md"
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white border-none transform hover:scale-105 transition-all duration-300 font-semibold gap-2"
                          />
                          
                          <Button 
                            variant="outline"
                            size="md"
                            onClick={() => navigate(`/packages/${pkg.id}`)}
                            className="w-full border-2 border-neutral-200 text-neutral-700 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-600 transition-all duration-300"
                          >
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPackages.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-neutral-900 mb-4">Nenhum pacote encontrado</h3>
                  <p className="text-neutral-600 mb-8">Tente ajustar os filtros ou termo de busca.</p>
                  <Button 
                    variant="primary"
                    onClick={() => {
                      setFilter('all');
                      setSearchTerm('');
                    }}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-600"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent-400/20 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-white/5 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Não encontrou o que 
              <br />
              procurava?
            </h2>
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <p className="text-xl md:text-2xl text-primary-100 mb-12 leading-relaxed">
              Entre em contato conosco e montaremos um pacote 
              <br className="hidden md:block" />
              personalizado especialmente para você.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <Button 
              variant="secondary"
              size="xl"
              onClick={() => openWhatsApp("Olá! Gostaria de um pacote personalizado. Podem me ajudar?")}
              className="group bg-accent-500 hover:bg-accent-600 text-white border-none transform hover:scale-105 transition-all duration-300"
            >
              Pacote Personalizado
            </Button>
            
            <Button 
              variant="outline"
              size="xl"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-primary-700 backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              Falar com Consultor
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-neutral-50 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickNavigation 
            {...getAdjacentPages()}
            className="border-neutral-200"
          />
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Packages;