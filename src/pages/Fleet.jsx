import { useState, useEffect } from 'react';
import { 
  Users, Star, Shield, Car, CheckCircle, MessageCircle, 
  Calendar, MapPin, Clock, Fuel, Settings, Award, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useWhatsApp } from '../hooks/useWhatsApp';
import { useNavigation } from '../hooks/useNavigation';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';
import QuickNavigation from '../components/common/QuickNavigation';
import Button from '../components/common/Button';

const Fleet = () => {
  const { openWhatsApp } = useWhatsApp();
  const { getAdjacentPages } = useNavigation();
  const [isVisible, setIsVisible] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Função para navegar na galeria
  const handlePrevImage = () => {
    if (selectedVehicle?.gallery) {
      setSelectedImageIndex(prev => 
        prev === 0 ? selectedVehicle.gallery.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedVehicle?.gallery) {
      setSelectedImageIndex(prev => 
        prev === selectedVehicle.gallery.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
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

  const vehicles = [
    {
      id: 1,
      name: 'Mercedes-Benz Sprinter',
      category: 'van',
      capacity: '15-20 passageiros',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop'
      ],
      features: ['Ar condicionado', 'Wi-Fi', 'TV/DVD', 'Poltronas reclináveis', 'Porta-malas amplo'],
      description: 'Ideal para grupos médios com máximo conforto e segurança.',
      price: 'A partir de R$ 300/dia',
      status: 'available'
    },
    {
      id: 2,
      name: 'Ônibus Executivo 44 lugares',
      category: 'bus',
      capacity: '44 passageiros',
      year: '2022',
      image: 'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'
      ],
      features: ['Ar condicionado', 'Banheiro', 'Wi-Fi', 'TV/DVD', 'Poltronas semi-leito', 'Frigobar'],
      description: 'Perfeito para excursões longas com todo o conforto necessário.',
      price: 'A partir de R$ 800/dia',
      status: 'available'
    },
    {
      id: 3,
      name: 'Micro-ônibus Iveco',
      category: 'micro',
      capacity: '25-30 passageiros',
      year: '2023',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop'
      ],
      features: ['Ar condicionado', 'Wi-Fi', 'Som ambiente', 'Poltronas acolchoadas', 'Porta-malas'],
      description: 'Excelente para grupos médios e viagens de média distância.',
      price: 'A partir de R$ 450/dia',
      status: 'available'
    },
    {
      id: 4,
      name: 'Van Executiva Toyota',
      category: 'van',
      capacity: '12-15 passageiros',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop'
      ],
      features: ['Ar condicionado', 'Wi-Fi', 'TV', 'Poltronas de couro', 'Som premium'],
      description: 'Máximo luxo para grupos pequenos e executivos.',
      price: 'A partir de R$ 350/dia',
      status: 'maintenance'
    },
    {
      id: 5,
      name: 'Ônibus Leito 40 lugares',
      category: 'bus',
      capacity: '40 passageiros',
      year: '2021',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'
      ],
      features: ['Ar condicionado', 'Banheiro', 'Wi-Fi', 'Poltronas leito', 'Frigobar', 'Cozinha'],
      description: 'Ideal para viagens longas com pernoite e máximo conforto.',
      price: 'A partir de R$ 1.200/dia',
      status: 'available'
    },
    {
      id: 6,
      name: 'SUV Premium',
      category: 'suv',
      capacity: '7 passageiros',
      year: '2024',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1570125909517-53cb21c89ff2?w=800&h=600&fit=crop'
      ],
      features: ['Ar condicionado', 'GPS', 'Som premium', 'Bancos de couro', 'Tração 4x4'],
      description: 'Perfeito para grupos pequenos e destinos off-road.',
      price: 'A partir de R$ 250/dia',
      status: 'available'
    }
  ];

  const categories = [
    { key: 'all', label: 'Todos os Veículos', icon: Car },
    { key: 'van', label: 'Vans', icon: Car },
    { key: 'micro', label: 'Micro-ônibus', icon: Car },
    { key: 'bus', label: 'Ônibus', icon: Car },
    { key: 'suv', label: 'SUVs', icon: Car }
  ];

  const filteredVehicles = selectedCategory === 'all' 
    ? vehicles 
    : vehicles.filter(vehicle => vehicle.category === selectedCategory);


  const safety = [
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'Todos os veículos passam por revisões mensais e possuem seguro completo.'
    },
    {
      icon: Award,
      title: 'Motoristas Qualificados',
      description: 'Profissionais experientes com cursos de direção defensiva e primeiros socorros.'
    },
    {
      icon: Settings,
      title: 'Manutenção Preventiva',
      description: 'Programa rigoroso de manutenção para garantir zero defeitos nas viagens.'
    },
    {
      icon: CheckCircle,
      title: 'Certificações',
      description: 'Frota certificada pela ANTT e em conformidade com todas as normas.'
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&h=1080&fit=crop"
            alt="Nossa Frota"
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="animate-fade-in-up">
            <div className="flex justify-center mb-8">
              <img 
                src="/stl.png" 
                alt="STL Turismo" 
                className="h-20 w-auto filter brightness-0 invert"
              />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Nossa <span className="text-accent-300">Frota</span>
            </h1>
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto">
              Veículos modernos, seguros e confortáveis para garantir que sua viagem 
              <br className="hidden md:block" />
              seja perfeita do início ao fim.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <Button 
              variant="secondary"
              size="xl"
              onClick={() => openWhatsApp("Olá! Gostaria de conhecer mais sobre a frota da STL Turismo.")}
              className="group bg-accent-500 hover:bg-accent-600 text-white border-none transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle size={20} className="mr-2" />
              Solicitar Cotação
            </Button>
          </div>
        </div>
      </section>


      {/* Fleet Gallery */}
      <section id="fleet" data-animate className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.fleet ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Conheça Nossa <span className="text-primary-600">Frota</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Veículos modernos e bem equipados para todos os tipos de viagem
            </p>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full mt-6"></div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            {categories.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === key
                    ? 'bg-primary-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-neutral-700 hover:bg-primary-50 hover:text-primary-600 border border-neutral-200'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>

          {/* Vehicle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVehicles.map((vehicle, index) => (
              <div 
                key={vehicle.id}
                className={`group transition-all duration-700 ${isVisible.fleet ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-neutral-100">
                  {/* Image */}
                  <div className="relative overflow-hidden h-64">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Status Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold shadow-lg ${
                      vehicle.status === 'available' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-yellow-500 text-white'
                    }`}>
                      {vehicle.status === 'available' ? 'Disponível' : 'Manutenção'}
                    </div>
                    
                    {/* Year Badge */}
                    <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {vehicle.year}
                    </div>
                    
                    {/* Capacity */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-neutral-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Users size={14} className="mr-1" />
                      {vehicle.capacity}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {vehicle.name}
                    </h3>
                    
                    <p className="text-neutral-600 mb-6 leading-relaxed">
                      {vehicle.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {vehicle.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center text-sm text-neutral-700">
                          <CheckCircle size={16} className="text-green-500 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {vehicle.features.length > 3 && (
                        <div className="text-sm text-primary-600 font-medium">
                          +{vehicle.features.length - 3} mais equipamentos
                        </div>
                      )}
                    </div>
                    
                    {/* Price */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-2xl font-bold text-primary-600">
                        {vehicle.price}
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button 
                        variant="primary"
                        size="lg"
                        onClick={() => openWhatsApp(`Olá! Gostaria de mais informações sobre o veículo "${vehicle.name}" da frota.`)}
                        className="w-full bg-primary-600 hover:bg-primary-700 transform hover:scale-105 transition-all duration-300"
                        disabled={vehicle.status !== 'available'}
                      >
                        {vehicle.status === 'available' ? 'Solicitar Informações' : 'Em Manutenção'}
                      </Button>
                      
                      <Button 
                        variant="outline"
                        size="lg"
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setSelectedImageIndex(0);
                        }}
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
        </div>
      </section>

      {/* Safety Section */}
      <section id="safety" data-animate className="py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.safety ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Segurança em <span className="text-primary-600">Primeiro Lugar</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Nosso compromisso é garantir que você viaje com total tranquilidade
            </p>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {safety.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={index}
                  className={`group transition-all duration-1000 ${isVisible.safety ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className="bg-white p-8 rounded-3xl hover:shadow-xl transition-all duration-500 border border-neutral-100 h-full">
                    <div className="bg-primary-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={28} className="text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-neutral-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
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
              Pronto para viajar 
              <br />
              com <span className="text-accent-300">conforto</span>?
            </h2>
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <p className="text-xl md:text-2xl text-primary-100 mb-12 leading-relaxed">
              Solicite uma cotação personalizada para seu grupo 
              <br className="hidden md:block" />
              e escolha o veículo ideal para sua viagem.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <Button 
              variant="secondary"
              size="xl"
              onClick={() => openWhatsApp("Olá! Gostaria de solicitar uma cotação para aluguel de veículo da frota STL Turismo.")}
              className="group bg-accent-500 hover:bg-accent-600 text-white border-none transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle size={20} className="mr-2" />
              Solicitar Cotação
            </Button>
            
            <Button 
              variant="outline"
              size="xl"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-primary-700 backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              <Car size={20} className="mr-2" />
              Ver Disponibilidade
            </Button>
          </div>
        </div>
      </section>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Gallery Section */}
            <div className="relative">
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <img 
                  src={selectedVehicle.gallery[selectedImageIndex]} 
                  alt={`${selectedVehicle.name} - Imagem ${selectedImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {selectedVehicle.gallery.length > 1 && (
                  <>
                    <button 
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-300"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all duration-300"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                
                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImageIndex + 1} / {selectedVehicle.gallery.length}
                </div>
              </div>
              
              {/* Thumbnails */}
              {selectedVehicle.gallery.length > 1 && (
                <div className="p-4 border-b">
                  <div className="flex gap-2 overflow-x-auto">
                    {selectedVehicle.gallery.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          index === selectedImageIndex 
                            ? 'border-primary-500 opacity-100' 
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={image} 
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedVehicle(null)}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-all duration-300"
              >
                ✕
              </button>
            </div>
            
            <div className="p-8">
              <h3 className="text-3xl font-bold text-neutral-900 mb-4">{selectedVehicle.name}</h3>
              <p className="text-neutral-600 mb-6">{selectedVehicle.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-4">Especificações</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Capacidade:</span>
                      <span className="font-semibold">{selectedVehicle.capacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Ano:</span>
                      <span className="font-semibold">{selectedVehicle.year}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Status:</span>
                      <span className={`font-semibold ${selectedVehicle.status === 'available' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {selectedVehicle.status === 'available' ? 'Disponível' : 'Manutenção'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-neutral-900 mb-4">Equipamentos</h4>
                  <div className="space-y-2">
                    {selectedVehicle.features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <CheckCircle size={16} className="text-green-500 mr-2" />
                        <span className="text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    openWhatsApp(`Olá! Gostaria de alugar o veículo "${selectedVehicle.name}" da frota.`);
                    setSelectedVehicle(null);
                  }}
                  className="flex-1 bg-primary-600 hover:bg-primary-700"
                  disabled={selectedVehicle.status !== 'available'}
                >
                  {selectedVehicle.status === 'available' ? 'Solicitar Aluguel' : 'Indisponível'}
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => setSelectedVehicle(null)}
                  className="border-2 border-neutral-200 text-neutral-700"
                >
                  Fechar
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

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

export default Fleet;