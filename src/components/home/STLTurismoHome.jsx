import { useState, useEffect } from 'react';
import { Phone, MessageCircle, MapPin, Star, Calendar, Users, Shield, Award, ChevronRight, Menu, X, Compass, Globe, Heart } from 'lucide-react';
import { usePackages } from '../../hooks/usePackages';
import { useDestinations } from '../../hooks/useDestinations';
import { useWhatsApp } from '../../hooks/useWhatsApp';
import Header from '../common/Header';
import Footer from '../common/Footer';
import WhatsAppButton from '../common/WhatsAppButton';
import ReservationButton from '../reservation/ReservationButton';
import Card from '../common/Card';
import Button from '../common/Button';
import Loading from '../common/Loading';

const STLTurismoHome = () => {
  const { packages: featuredPackages, loading: packagesLoading, isUsingFirebase } = usePackages(true);
  const { destinations, loading: destinationsLoading } = useDestinations();
  const { openWhatsApp, formatWhatsAppMessage } = useWhatsApp();
  const [isVisible, setIsVisible] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Imagens dos destinos para o carrossel
  const heroImages = [
    'https://images.unsplash.com/photo-1566737236500-c8ac43014a8b?w=1920&h=1080&fit=crop', // Serra Gaúcha
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920&h=1080&fit=crop', // Foz do Iguaçu
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&h=1080&fit=crop', // Florianópolis
    'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=1920&h=1080&fit=crop', // Buenos Aires
    'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop', // Viagem genérica
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Troca de imagem a cada 5 segundos

    return () => clearInterval(interval);
  }, [heroImages.length]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
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

  const testimonials = [
    {
      name: "Maria Silva",
      age: "65 anos",
      text: "Viagem incrível para Gramado! Atendimento familiar e cuidadoso em todos os detalhes.",
      rating: 5,
      trip: "Gramado - Família"
    },
    {
      name: "João Santos",
      age: "45 anos", 
      text: "Excelente experiência em Foz do Iguaçu. Veículos novos e confortáveis, recomendo!",
      rating: 5,
      trip: "Foz do Iguaçu - Casal"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero Section - Redesigned with Image Carousel */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Images Carousel */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Destino ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="text-white">Sua próxima</span>
              <br />
              <span className="text-accent-400">aventura</span>
              <br />
              <span className="text-white">começa aqui</span>
            </h1>
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experiências únicas em viagens nacionais e internacionais. 
              <br className="hidden md:block" />
              Conforto, segurança e momentos inesquecíveis.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <Button 
              variant="primary"
              size="xl"
              onClick={() => openWhatsApp("Gostaria de conhecer os pacotes disponíveis!")}
              className="group relative overflow-hidden bg-primary-600 hover:bg-primary-700 transform hover:scale-105 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center">
                Explorar Destinos
                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            
            <Button 
              variant="outline"
              size="xl"
              className="border-2 border-white/80 text-white hover:bg-white hover:text-neutral-900 backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              Nossa Frota
            </Button>
          </div>
        </div>

        {/* Image Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Packages - Redesigned */}
      <section id="packages" data-animate className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.packages ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Pacotes em Destaque
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Ofertas exclusivas com experiências inesquecíveis
            </p>
            <div className="w-24 h-1 bg-primary-600 mx-auto rounded-full mt-6"></div>
          </div>

          {packagesLoading ? (
            <div className="flex justify-center">
              <Loading size="lg" text="Carregando pacotes incríveis..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.map((pkg, index) => (
                <div 
                  key={pkg.id}
                  className={`group transition-all duration-700 ${isVisible.packages ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-neutral-100">
                    {/* Image */}
                    <div className="relative overflow-hidden h-64">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Discount Badge */}
                      {pkg.originalPrice && pkg.price < pkg.originalPrice && (
                        <div className="absolute top-4 left-4 bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                          {Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)}% OFF
                        </div>
                      )}
                      
                      {/* Duration Badge */}
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-neutral-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {pkg.duration}
                      </div>
                      
                      {/* Departure Date Badge */}
                      <div className="absolute bottom-4 right-4 bg-primary-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {new Date(pkg.departureDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-8">
                      <h3 className="text-2xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {pkg.title}
                      </h3>
                      <p className="text-neutral-600 mb-6 leading-relaxed">{pkg.subtitle}</p>
                      
                      {/* Highlights */}
                      <div className="space-y-2 mb-8">
                        {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                          <div key={idx} className="flex items-center text-sm text-neutral-700">
                            <div className="w-2 h-2 bg-primary-500 rounded-full mr-3 flex-shrink-0"></div>
                            {highlight}
                          </div>
                        ))}
                      </div>
                      
                      {/* Price and CTA */}
                      <div className="flex items-center justify-between">
                        <div>
                          {pkg.originalPrice && (
                            <p className="text-sm text-neutral-400 line-through">
                              R$ {pkg.originalPrice.toLocaleString()}
                            </p>
                          )}
                          <p className="text-3xl font-bold text-primary-600">
                            R$ {pkg.price.toLocaleString()}
                          </p>
                          <p className="text-sm text-neutral-500">por pessoa</p>
                        </div>
                        <ReservationButton 
                          packageData={pkg}
                          text="Reservar"
                          size="md"
                          className="bg-primary-600 hover:bg-primary-700 transform hover:scale-105 transition-all duration-300 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={`text-center mt-16 transition-all duration-1000 ${isVisible.packages ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{animationDelay: '0.8s'}}>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-primary-200 text-primary-600 hover:border-primary-500 hover:bg-primary-50 transform hover:scale-105 transition-all duration-300 rounded-xl"
            >
              Ver Todos os Pacotes
            </Button>
          </div>
        </div>
      </section>

      {/* Features - Moved after packages */}
      <section id="features" data-animate className="py-32 bg-neutral-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.features ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center mb-6">
              <img 
                src="/stl.png" 
                alt="STL Turismo" 
                className="h-16 w-auto"
              />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Por que nos escolher?
            </h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Segurança Total",
                description: "Veículos modernos com tecnologia de ponta",
                color: "primary",
                delay: "0s"
              },
              {
                icon: Heart,
                title: "Atendimento Familiar",
                description: "Cuidado especial com cada detalhe da sua viagem",
                color: "accent",
                delay: "0.2s"
              },
              {
                icon: Globe,
                title: "Destinos Únicos",
                description: "Roteiros exclusivos nacionais e internacionais",
                color: "primary",
                delay: "0.4s"
              },
              {
                icon: Award,
                title: "Experiência Premium",
                description: "Anos de tradição em turismo de qualidade",
                color: "accent",
                delay: "0.6s"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`group cursor-pointer transition-all duration-700 ${isVisible.features ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
                style={{animationDelay: feature.delay}}
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-neutral-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-neutral-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className={`relative mb-6 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${feature.color === 'primary' ? 'bg-primary-100' : 'bg-accent-100'} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`${feature.color === 'primary' ? 'text-primary-600' : 'text-accent-600'}`} size={32} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-4 text-center">{feature.title}</h3>
                  <p className="text-neutral-600 text-center leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Redesigned */}
      <section id="testimonials" data-animate className="py-32 bg-primary-50 relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.testimonials ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Histórias de Sucesso
            </h2>
            <p className="text-xl text-neutral-600">
              Experiências reais de quem viajou conosco
            </p>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                className={`transition-all duration-700 ${isVisible.testimonials ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
                style={{animationDelay: `${idx * 0.3}s`}}
              >
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute -top-4 left-8">
                    <div className="bg-accent-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">
                      "
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    {/* Stars */}
                    <div className="flex mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-accent-400 fill-current w-5 h-5" />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <p className="text-neutral-700 text-lg mb-8 leading-relaxed italic">
                      {testimonial.text}
                    </p>
                    
                    {/* Author */}
                    <div className="flex items-center">
                      <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mr-4 border-2 border-white shadow-md">
                        <span className="text-primary-600 font-bold text-lg">{testimonial.name.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-900 text-lg">{testimonial.name}</h4>
                        <p className="text-neutral-500">{testimonial.age} • {testimonial.trip}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Redesigned */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-600"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent-400/20 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-white/5 rounded-full animate-float" style={{animationDelay: '1.5s'}}></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Pronto para sua próxima 
              <br />
              aventura?
            </h2>
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <p className="text-xl md:text-2xl text-primary-100 mb-12 leading-relaxed">
              Entre em contato conosco e receba um atendimento personalizado 
              <br className="hidden md:block" />
              para planejar a viagem dos seus sonhos.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <Button 
              variant="secondary"
              size="xl"
              onClick={() => openWhatsApp("Olá! Gostaria de planejar uma viagem. Podem me ajudar?")}
              className="group bg-accent-500 hover:bg-accent-600 text-white border-none transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle size={20} className="mr-2" />
              Chamar no WhatsApp
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

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default STLTurismoHome;