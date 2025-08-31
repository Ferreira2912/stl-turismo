import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Calendar, Shield, Award, Globe, Heart, MessageCircle, Bus, Ship } from 'lucide-react';
import { getPackages } from '../../services/database';
import { getPackageStartDate, formatDate } from '../../utils/helpers';
import { useWhatsApp } from '../../hooks/useWhatsApp';
import Header from '../common/Header';
import Footer from '../common/Footer';
import WhatsAppButton from '../common/WhatsAppButton';
import ReservationButton from '../reservation/ReservationButton';
import Button from '../common/Button';
import Loading from '../common/Loading';

const STLTurismoHome = () => {
  const [featuredPackages, setFeaturedPackages] = useState([]);
  const [packagesLoading, setPackagesLoading] = useState(true);
  const { openWhatsApp } = useWhatsApp();
  const [isVisible, setIsVisible] = useState({});
  const navigate = useNavigate();
  
  // Hero slideshow
  const heroImages = [
    '/images/hero/1.jpeg',
    '/images/hero/2.avif',
    '/images/hero/3.jpg',
    '/images/hero/4.jpg',
    '/images/hero/5.jpg',
    '/images/hero/6.jpg',
  ];
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    loadFeaturedPackages();
  }, []);

  const loadFeaturedPackages = async () => {
    try {
      setPackagesLoading(true);
      const data = await getPackages(100);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  // Show 6 closest upcoming packages by date, not relying on any 'featured' flag
  const upcomingSorted = data
        .map((pkg) => ({ pkg, startDate: getPackageStartDate(pkg) }))
        .filter(({ startDate }) => startDate && startDate >= today)
        .sort((a, b) => a.startDate - b.startDate)
        .slice(0, 6)
        .map(({ pkg }) => pkg);
      setFeaturedPackages(upcomingSorted);
    } catch (error) {
      console.error('Erro ao carregar pacotes em destaque:', error);
    } finally {
      setPackagesLoading(false);
    }
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Cycle hero images with fade
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const id = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(id);
    // heroImages is a constant array defined above
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const testimonials = [
    {
      name: 'Nilo Jane Noetzold',
      text: 'Viajar é muito bom\nCom essa empresa melhor ainda 🙏🏻',
      rating: 5
    },
    {
      name: 'Marlene Reis Braga',
      text: 'Que passeio inesquecível, adoramos tudo muuiiito bommmm. Atenção e o cuidado com as pessoas que vocês têm não tem preço. Obrigaduuuuu!!!',
      rating: 5
    },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header transparentOnTop />

      {/* Hero Section */}
  <section className="relative min-h-[calc(100vh+80px)] flex items-center justify-center overflow-hidden -mt-20 pt-20">
        {/* Slideshow background */}
        <div className="absolute inset-0">
          {heroImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Destinos de Viagem"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === heroIndex ? 'opacity-100' : 'opacity-0'}`}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
          {/* Fallback gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/70 via-sky-900/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <div className="flex justify-center mb-8">
              <img src="/stl.png" alt="STL Turismo" className="h-20 w-auto filter brightness-0 invert" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Sua próxima <span className="text-sky-300">Aventura</span> começa agora
            </h1>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
              Descubra pacotes com saídas próximas, ofertas especiais e condições facilitadas. Reserve online ou pelo WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Packages Grid */}
      <section id="packages" data-animate className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {packagesLoading ? (
            <div className="flex justify-center">
              <Loading size="lg" text="Carregando pacotes incríveis..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPackages.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className={`group transition-all duration-700 md:${isVisible.packages ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
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

                      {/* Duration Badge */}
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-neutral-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {pkg.duration}
                      </div>

                      {/* Transport Mode Badge */}
                      {pkg.transportMode && (
                        <div
                          className={`absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold shadow-md flex items-center gap-1
                          ${
                            pkg.transportMode === 'maritimo' || pkg.transportMode === 'aereo' || pkg.transportMode === 'misto'
                              ? 'bg-blue-600 text-white'
                              : pkg.transportMode === 'rodoviario'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-purple-600 text-white'
                          }`}
                        >
                          {(pkg.transportMode === 'maritimo' || pkg.transportMode === 'aereo' || pkg.transportMode === 'misto') && <Ship size={12} />}
                          {pkg.transportMode === 'rodoviario' && <Bus size={12} />}
                          <span className="capitalize">
                            {pkg.transportMode === 'aereo' || pkg.transportMode === 'misto' ? 'Marítimo' : pkg.transportMode}
                          </span>
                        </div>
                      )}

                      {/* Only duration and transport mode badges remain */}
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col h-full">
                      <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">{pkg.title}</h3>
                      {pkg.departureDate || pkg.returnDate ? (
                        <div className="flex items-center text-sm text-neutral-500 mb-4">
                          <Calendar size={14} className="mr-2 text-primary-600" />
                          <span>
                            {(pkg.departureDate ? formatDate(pkg.departureDate) : 'Data a definir')} -
                            {(pkg.returnDate ? ` ${formatDate(pkg.returnDate)}` : ' Data a definir')}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center text-sm text-neutral-400 mb-4">
                          <Calendar size={14} className="mr-2" />
                          <span>Datas a definir</span>
                        </div>
                      )}
                      <div className="text-neutral-600 mb-2 leading-relaxed clamp-2 min-h-[40px] text-sm">{pkg.description || ' '}</div>

                      {/* Highlights */}
                      <div className="space-y-1 mb-3 text-[11px]">
                        {pkg.includes &&
                          pkg.includes.slice(0, 3).map((highlight, i) => (
                            <div key={i} className="flex items-center text-sm text-neutral-700">
                              <div className="w-2 h-2 bg-accent-500 rounded-full mr-3 flex-shrink-0"></div>
                              <span>{highlight}</span>
                            </div>
                          ))}
                        {pkg.includes && pkg.includes.length > 3 && (
                          <div className="text-sm text-primary-600 font-medium">+{pkg.includes.length - 3} mais inclusos</div>
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
          )}

          {/* View All */}
          <div className={`text-center mt-16 transition-all duration-1000 ${isVisible.packages ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '0.8s' }}>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/pacotes')}
              className="border-2 border-primary-200 text-primary-600 hover:border-primary-500 hover:bg-primary-50 transform hover:scale-105 transition-all duration-300 rounded-xl"
            >
              Ver Todos os Pacotes
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
  <section id="features" data-animate className="py-32 bg-sky-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.features ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-center mb-6">
              <img src="/stl.png" alt="STL Turismo" className="h-16 w-auto" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Por que nos escolher?</h2>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
            {
              icon: Shield,
              title: 'Segurança Total',
              description: 'Veículos modernos com tecnologia de ponta',
              color: 'primary',
              delay: '0s',
            },
            {
              icon: Heart,
              title: 'Atendimento Familiar',
              description: 'Cuidado especial com cada detalhe da sua viagem',
              color: 'accent',
              delay: '0.2s',
            },
            {
              icon: Globe,
              title: 'Destinos Únicos',
              description: 'Roteiros exclusivos nacionais e internacionais',
              color: 'primary',
              delay: '0.4s',
            },
            {
              icon: Award,
              title: 'Experiência Premium',
              description: 'Anos de tradição em turismo de qualidade',
              color: 'accent',
              delay: '0.6s',
            },
            ].map((feature, index) => (
              <div
                key={index}
                className={`group cursor-pointer transition-all duration-700 ${isVisible.features ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
                style={{ animationDelay: feature.delay }}
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-neutral-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-neutral-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div
                    className={`relative mb-6 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center ${
                      feature.color === 'primary' ? 'bg-primary-100' : 'bg-accent-100'
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
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

      {/* Testimonials */}
      <section id="testimonials" data-animate className="py-32 bg-primary-50 relative">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.testimonials ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">Histórias de Sucesso</h2>
            <p className="text-xl text-neutral-600">Experiências reais de quem viajou conosco</p>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className={`transition-all duration-700 ${isVisible.testimonials ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
                style={{ animationDelay: `${idx * 0.3}s` }}
              >
                <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="absolute -top-4 left-8">
                    <div className="bg-accent-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-2xl shadow-lg">"</div>
                  </div>
                  <div className="pt-4">
                    {/* Stars */}
                    <div className="flex mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="text-accent-400 fill-current w-5 h-5" />
                      ))}
                    </div>
                    {/* Quote */}
                    <p className="text-neutral-700 text-lg mb-8 leading-relaxed italic">{testimonial.text}</p>
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

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-600"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent-400/20 rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-white/5 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Pronto para sua próxima <br /> aventura?
            </h2>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-xl md:text-2xl text-primary-100 mb-12 leading-relaxed">
              Entre em contato conosco e receba um atendimento personalizado <br className="hidden md:block" />
              para planejar a viagem dos seus sonhos.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <Button
              variant="secondary"
              size="xl"
              onClick={() => openWhatsApp('Olá! Gostaria de planejar uma viagem. Podem me ajudar?')}
              className="group bg-accent-500 hover:bg-accent-600 text-white border-none transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle size={20} className="mr-2" />
              Chamar no WhatsApp
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