import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Calendar, MapPin, Star, Users, ChevronRight, ChevronLeft, 
  Phone, MessageCircle, Check, Info, Clock, DollarSign,
  Camera, Utensils, Bed, Car, Shield, Award
} from 'lucide-react';
import { usePackages } from '../hooks/usePackages';
import { useWhatsApp } from '../hooks/useWhatsApp';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';
import ReservationButton from '../components/reservation/ReservationButton';
import Button from '../components/common/Button';
import Loading from '../components/common/Loading';

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { packages, loading } = usePackages(false);
  const { openWhatsApp } = useWhatsApp();
  const [isVisible, setIsVisible] = useState({});
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const packageData = packages.find(pkg => pkg.id === id);

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

  // Imagens adicionais para galeria (simulado)
  const additionalImages = [
    packageData?.image,
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'
  ].filter(Boolean);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loading size="lg" text="Carregando pacote..." />
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Pacote não encontrado</h1>
            <p className="text-neutral-600 mb-8">O pacote que você está procurando não existe.</p>
            <Button onClick={() => navigate('/packages')}>
              Voltar aos Pacotes
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={additionalImages[selectedImageIndex] || packageData.image}
            alt={packageData.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate('/packages')}
          className="absolute top-24 left-8 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 flex items-center"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Image Gallery Indicators */}
        {additionalImages.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
            {additionalImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === selectedImageIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="animate-fade-in-up">
            {packageData.featured && (
              <div className="inline-flex items-center bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg">
                <Star size={16} className="mr-2 fill-current" />
                PACOTE EM DESTAQUE
              </div>
            )}
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {packageData.title}
            </h1>
            
            <p className="text-2xl md:text-3xl text-accent-300 mb-8 font-medium">
              {packageData.subtitle}
            </p>
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="flex flex-wrap gap-6 justify-center items-center text-lg mb-12">
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar size={20} className="mr-2" />
                {packageData.duration}
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <DollarSign size={20} className="mr-2" />
                R$ {packageData.price.toLocaleString()}
              </div>
              {packageData.originalPrice && (
                <div className="flex items-center bg-accent-500 px-4 py-2 rounded-full">
                  <span className="text-sm font-bold">
                    {Math.round(((packageData.originalPrice - packageData.price) / packageData.originalPrice) * 100)}% OFF
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <Button 
              variant="secondary"
              size="xl"
              onClick={() => openWhatsApp(`Olá! Gostaria de mais informações sobre o pacote "${packageData.title}".`)}
              className="group bg-accent-500 hover:bg-accent-600 text-white border-none transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle size={20} className="mr-2" />
              Solicitar Informações
            </Button>
            
            <Button 
              variant="outline"
              size="xl"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-primary-700 backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              <Phone size={20} className="mr-2" />
              Ligar Agora
            </Button>
          </div>
        </div>
      </section>

      {/* Package Details */}
      <section id="details" data-animate className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div className={`transition-all duration-1000 ${isVisible.details ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
                <h2 className="text-4xl font-bold text-neutral-900 mb-6">Sobre este Pacote</h2>
                <p className="text-lg text-neutral-700 leading-relaxed mb-8">
                  {packageData.description}
                </p>
                
                {/* Highlights */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packageData.highlights.map((highlight, index) => (
                    <div 
                      key={index}
                      className="flex items-start bg-primary-50 p-4 rounded-xl border border-primary-100"
                    >
                      <Check size={20} className="text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-neutral-700 font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's Included */}
              <div className={`transition-all duration-1000 ${isVisible.details ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{animationDelay: '0.2s'}}>
                <h3 className="text-3xl font-bold text-neutral-900 mb-8">O que está incluído</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {packageData.includes.map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center bg-white p-6 rounded-xl shadow-md border border-neutral-100 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="bg-primary-600 text-white p-3 rounded-full mr-4">
                        {index === 0 && <Car size={20} />}
                        {index === 1 && <Bed size={20} />}
                        {index === 2 && <Camera size={20} />}
                        {index === 3 && <Shield size={20} />}
                        {index > 3 && <Check size={20} />}
                      </div>
                      <span className="text-neutral-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              {additionalImages.length > 1 && (
                <div className={`transition-all duration-1000 ${isVisible.details ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{animationDelay: '0.4s'}}>
                  <h3 className="text-3xl font-bold text-neutral-900 mb-8">Galeria de Fotos</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {additionalImages.map((image, index) => (
                      <div 
                        key={index}
                        className="relative group cursor-pointer overflow-hidden rounded-xl aspect-square"
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <img 
                          src={image} 
                          alt={`${packageData.title} - Foto ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-neutral-800 px-2 py-1 rounded-full text-xs font-medium">
                          {index + 1}/{additionalImages.length}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Price Card */}
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-100">
                  <div className="text-center mb-8">
                    {packageData.originalPrice && (
                      <div className="text-neutral-400 line-through text-2xl mb-2">
                        R$ {packageData.originalPrice.toLocaleString()}
                      </div>
                    )}
                    <div className="text-4xl font-bold text-primary-600 mb-2">
                      R$ {packageData.price.toLocaleString()}
                    </div>
                    <p className="text-neutral-600">por pessoa</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                      <span className="text-neutral-600">Destino</span>
                      <span className="font-semibold text-neutral-900">{packageData.destination}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                      <span className="text-neutral-600">Data de Saída</span>
                      <span className="font-semibold text-neutral-900">
                        {new Date(packageData.departureDate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                      <span className="text-neutral-600">Data de Retorno</span>
                      <span className="font-semibold text-neutral-900">
                        {new Date(packageData.returnDate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                      <span className="text-neutral-600">Duração</span>
                      <span className="font-semibold text-neutral-900">{packageData.duration}</span>
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-neutral-100">
                      <span className="text-neutral-600">Categoria</span>
                      <span className="font-semibold text-neutral-900">
                        {packageData.price >= 2000 ? 'Internacional' : 'Nacional'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <span className="text-neutral-600">Disponibilidade</span>
                      <span className="font-semibold text-green-600">Disponível</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <ReservationButton 
                      packageData={packageData}
                      text="Fazer Reserva Completa"
                      className="w-full bg-primary-600 hover:bg-primary-700 transform hover:scale-105 transition-all duration-300"
                    />
                    
                    <Button 
                      variant="outline"
                      size="lg"
                      onClick={() => openWhatsApp(`Olá! Gostaria de mais informações sobre o pacote "${packageData.title}".`)}
                      className="w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-50 transition-all duration-300"
                    >
                      Solicitar Informações
                    </Button>
                  </div>
                </div>

                {/* Contact Card */}
                <div className="bg-primary-50 p-8 rounded-3xl border border-primary-100">
                  <h4 className="text-xl font-bold text-neutral-900 mb-4">Precisa de Ajuda?</h4>
                  <p className="text-neutral-700 mb-6">
                    Nossa equipe está pronta para esclarecer suas dúvidas e ajudar no planejamento.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center text-neutral-700">
                      <Phone size={18} className="mr-3 text-primary-600" />
                      <span>(54) 99988-7766</span>
                    </div>
                    <div className="flex items-center text-neutral-700">
                      <MessageCircle size={18} className="mr-3 text-green-600" />
                      <span>WhatsApp disponível</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Packages */}
      <section className="py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Outros Pacotes que Você Pode Gostar
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages
              .filter(pkg => pkg.id !== packageData.id && pkg.featured)
              .slice(0, 3)
              .map((pkg, index) => (
                <div 
                  key={pkg.id}
                  className="group cursor-pointer transition-all duration-700 animate-fade-in-up"
                  style={{animationDelay: `${index * 0.2}s`}}
                  onClick={() => navigate(`/packages/${pkg.id}`)}
                >
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-neutral-100">
                    <div className="relative overflow-hidden h-64">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {pkg.originalPrice && pkg.price < pkg.originalPrice && (
                        <div className="absolute top-4 left-4 bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
                        </div>
                      )}
                      
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-neutral-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {pkg.duration}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {pkg.title}
                      </h3>
                      <p className="text-neutral-600 mb-4">{pkg.subtitle}</p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          {pkg.originalPrice && (
                            <span className="text-neutral-400 line-through text-sm">
                              R$ {pkg.originalPrice.toLocaleString()}
                            </span>
                          )}
                          <div className="text-2xl font-bold text-primary-600">
                            R$ {pkg.price.toLocaleString()}
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default PackageDetail;
