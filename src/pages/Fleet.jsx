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
      name: 'Van Master Executiva',
      category: 'van',
      capacity: '15 passageiros',
      year: '2024',
      image: '/images/fleet/van/1.jpeg',
      gallery: [
        '/images/fleet/van/1.jpeg',
        '/images/fleet/van/2.jpeg',
        '/images/fleet/van/3.jpeg',
        '/images/fleet/van/4.jpeg'
      ],
      features: ['Ar condicionado', 'Poltronas reclináveis', 'Sistema de áudio e vídeo', '15 lugares'],
      description: 'Van master executiva com 15 lugares, ar condicionado, reclina os bancos, sistema de áudio e vídeo.',
      price: 'A partir de R$ 400/dia',
      status: 'available'
    },
    {
      id: 2,
      name: 'Micro Marcopolo Sênior',
      category: 'micro',
      capacity: '31 passageiros',
      year: '2023',
      image: '/images/fleet/micro/1.jpeg',
      gallery: [
        '/images/fleet/micro/1.jpeg',
        '/images/fleet/micro/2.jpeg',
        '/images/fleet/micro/3.jpeg',
        '/images/fleet/micro/4.jpeg',
        '/images/fleet/micro/5.jpeg'
      ],
      features: ['Poltronas reclináveis', 'Ar condicionado', 'Calefação', 'Itens de segurança'],
      description: 'Micro Marcopolo Sênior com capacidade para 31 passageiros com poltronas reclináveis, equipado com ar condicionado, calefação e com todos os itens de segurança.',
      price: 'A partir de R$ 600/dia',
      status: 'available'
    },
    {
      id: 3,
      name: 'Ônibus Double Decker G7',
      category: 'bus',
      capacity: '54 passageiros',
      year: '2024',
      image: '/images/fleet/g7/1.jpeg',
      gallery: [
        '/images/fleet/g7/1.jpeg',
        '/images/fleet/g7/2.jpeg',
        '/images/fleet/g7/3.jpeg',
        '/images/fleet/g7/4.jpeg',
        '/images/fleet/g7/5.jpeg'
      ],
      features: ['46 semi leito superior', '8 semi leito inferior', 'Sofá em "U" com mesa de jogos', 'Chopeira elétrica', 'USB em todas poltronas', 'Ar condicionado', 'Sistema áudio/vídeo', 'Frigobares', 'Internet STARLINK'],
      description: 'Ônibus Double Decker (DD) Marcopolo G7 com capacidade para 54 passageiros sendo 46 lugares semi leito no piso superior e 8 lugares semi leito no piso inferior, com um grande diferencial, sofá em formato de "U" com mesa de jogos fixa instalada no veículo e chopeira elétrica!!! Além de mais acessórios e opções como carregador USB em todas as poltronas, ar condicionado, calefação, sistema de áudio e vídeo, frigobares e internet STARLINK a bordo.',
      price: 'A partir de R$ 1.500/dia',
      status: 'available'
    },
    {
      id: 4,
      name: 'Ônibus Double Decker G7 Super Leito',
      category: 'bus',
      capacity: '40 passageiros',
      year: '2024',
      image: '/images/fleet/superleito/1.jpeg',
      gallery: [
        '/images/fleet/superleito/1.jpeg',
        '/images/fleet/superleito/2.jpeg',
        '/images/fleet/superleito/3.jpeg',
        '/images/fleet/superleito/4.jpeg',
        '/images/fleet/superleito/5.jpeg'
      ],
      features: ['31 leito total superior', '9 leito total inferior', 'Mesa de jogos opcional', 'Ar condicionado última geração', '5 telas LCD superior + 1 inferior', 'Toalete ecológico', '3 frigobares', 'Internet STARLINK', 'Suspensão inteligente'],
      description: 'Ônibus Double Decker G7, Super Leito, com capacidade para 40 passageiros em poltronas Leito Total, sendo 31 lugares no piso superior e 9 no piso inferior, mesa de jogos opcional no piso inferior e superior, ideal para viagens de médias, longas e longuíssimas distâncias. Equipado com ar condicionado de última geração, sistema de áudio e vídeo inteligente 5 telas de lcd no piso superior e 1 no piso inferior, toalete ecológico, 3 frigobares, internet STARLINK, suspensão inteligente.',
      price: 'A partir de R$ 2.000/dia',
      status: 'available'
    }
  ];

  const categories = [
    { key: 'all', label: 'Todos os Veículos', icon: Car },
    { key: 'van', label: 'Vans', icon: Car },
    { key: 'micro', label: 'Micro-ônibus', icon: Car },
    { key: 'bus', label: 'Ônibus', icon: Car }
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
            src="./images/fleet/superleito/1.jpeg            firebase login --interactive"
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
              <div className="flex items-center justify-center">
                <MessageCircle size={20} className="mr-2" />
                <span>Solicitar Cotação</span>
              </div>
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
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-neutral-100 h-[650px] flex flex-col">
                  {/* Image */}
                  <div className="relative overflow-hidden h-80">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Capacity */}
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-neutral-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Users size={14} className="mr-1" />
                      {vehicle.capacity}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-6 group-hover:text-primary-600 transition-colors">
                      {vehicle.name}
                    </h3>
                    
                    {/* Features */}
                    <div className="space-y-2 mb-8 flex-1">
                      {vehicle.features.slice(0, 4).map((feature, i) => (
                        <div key={i} className="flex items-center text-sm text-neutral-700">
                          <CheckCircle size={16} className="text-green-500 mr-3 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {vehicle.features.length > 4 && (
                        <div className="text-sm text-primary-600 font-medium">
                          +{vehicle.features.length - 4} mais equipamentos
                        </div>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <Button 
                        variant="primary"
                        size="lg"
                        onClick={() => openWhatsApp(`Olá! Gostaria de mais informações sobre o veículo "${vehicle.name}" da frota.`)}
                        className="w-full bg-primary-600 hover:bg-primary-700 transform hover:scale-105 transition-all duration-300"
                      >
                        Solicitar Informações
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
              <div className="flex items-center justify-center">
                <MessageCircle size={20} className="mr-2" />
                <span>Solicitar Cotação</span>
              </div>
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
              <div className="relative h-96 overflow-hidden rounded-t-3xl">
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