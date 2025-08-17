import { useState, useEffect } from 'react';
import { 
  Users, Heart, Award, MapPin, Calendar, Star, 
  Phone, MessageCircle, Clock, Shield, Target, Zap
} from 'lucide-react';
import { useWhatsApp } from '../hooks/useWhatsApp';
import { useNavigation } from '../hooks/useNavigation';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';
import QuickNavigation from '../components/common/QuickNavigation';
import Button from '../components/common/Button';

const About = () => {
  const { openWhatsApp } = useWhatsApp();
  const { getAdjacentPages } = useNavigation();
  const [isVisible, setIsVisible] = useState({});

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

  const stats = [
    { number: '15+', label: 'Anos de Experiência', icon: Calendar },
    { number: '5000+', label: 'Clientes Satisfeitos', icon: Users },
    { number: '50+', label: 'Destinos Visitados', icon: MapPin },
    { number: '98%', label: 'Satisfação dos Clientes', icon: Star }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Atendimento Familiar',
      description: 'Tratamos cada cliente como família, com cuidado e atenção pessoal em cada detalhe da viagem.',
      color: 'primary'
    },
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'Veículos modernos, motoristas experientes e seguro completo para sua tranquilidade.',
      color: 'accent'
    },
    {
      icon: Award,
      title: 'Experiência Comprovada',
      description: 'Mais de 15 anos conectando pessoas a destinos incríveis pelo Brasil e exterior.',
      color: 'primary'
    },
    {
      icon: Target,
      title: 'Foco no Cliente',
      description: 'Cada viagem é planejada pensando no seu sonho e nas suas necessidades específicas.',
      color: 'accent'
    }
  ];

  const timeline = [
    {
      year: '2009',
      title: 'Fundação da STL Turismo',
      description: 'Iniciamos nossa jornada com o sonho de conectar pessoas a experiências únicas de viagem.',
      image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop'
    },
    {
      year: '2012',
      title: 'Expansão Regional',
      description: 'Ampliamos nossos serviços para toda a região Sul, oferecendo mais destinos e conforto.',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop'
    },
    {
      year: '2016',
      title: 'Viagens Internacionais',
      description: 'Começamos a oferecer pacotes para destinos internacionais, realizando sonhos maiores.',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop'
    },
    {
      year: '2020',
      title: 'Adaptação e Crescimento',
      description: 'Nos adaptamos aos novos tempos, mantendo nossa qualidade e cuidado com a segurança.',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop'
    },
    {
      year: '2025',
      title: 'Inovação Contínua',
      description: 'Continuamos inovando para oferecer as melhores experiências de viagem para nossos clientes.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop'
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
            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=1920&h=1080&fit=crop"
            alt="Nossa História"
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
              Nossa <span className="text-accent-300">História</span>
            </h1>
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto">
              Há mais de 15 anos, conectamos pessoas a experiências inesquecíveis. 
              <br className="hidden md:block" />
              Conheça a jornada que nos trouxe até aqui e o que nos move todos os dias.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="text-center bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-neutral-100"
                >
                  <div className="bg-primary-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon size={28} />
                  </div>
                  <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                  <div className="text-neutral-700 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="story" data-animate className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${isVisible.story ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
              <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
                Uma Paixão que Virou <span className="text-primary-600">Missão</span>
              </h2>
              
              <div className="space-y-6 text-lg text-neutral-700 leading-relaxed">
                <p>
                  A <strong>STL Turismo</strong> nasceu do sonho de transformar viagens em experiências 
                  extraordinárias. Em 2009, começamos como uma pequena empresa familiar com um 
                  grande objetivo: conectar pessoas aos lugares mais incríveis do Brasil e do mundo.
                </p>
                
                <p>
                  Ao longo dos anos, construímos nossa reputação baseada em três pilares fundamentais: 
                  <strong>confiança</strong>, <strong>qualidade</strong> e <strong>atendimento humanizado</strong>. 
                  Cada viagem é planejada com o cuidado de quem está organizando uma experiência para a própria família.
                </p>
                
                <p>
                  Hoje, com mais de 15 anos de estrada, já realizamos os sonhos de mais de 5.000 clientes, 
                  visitamos mais de 50 destinos e mantemos nossa essência: fazer de cada viagem uma 
                  lembrança que dura para sempre.
                </p>
              </div>

              <div className="mt-12">
                <Button 
                  variant="primary"
                  size="lg"
                  onClick={() => openWhatsApp("Olá! Gostaria de conhecer mais sobre a STL Turismo e seus serviços.")}
                  className="bg-primary-600 hover:bg-primary-700 transform hover:scale-105 transition-all duration-300"
                >
                  <MessageCircle size={20} className="mr-2" />
                  Fale Conosco
                </Button>
              </div>
            </div>

            <div className={`transition-all duration-1000 ${isVisible.story ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{animationDelay: '0.3s'}}>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&fit=crop"
                  alt="Equipe STL Turismo"
                  className="w-full rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-accent-500 text-white p-6 rounded-2xl shadow-xl">
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-sm font-medium">Anos de Experiência</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" data-animate className="py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.timeline ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Nossa <span className="text-primary-600">Jornada</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Cada marco da nossa história representa um passo em direção à excelência em turismo
            </p>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-primary-200 hidden lg:block"></div>

            <div className="space-y-16">
              {timeline.map((item, index) => (
                <div 
                  key={index}
                  className={`relative transition-all duration-1000 ${isVisible.timeline ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className={`lg:flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className="lg:w-1/2 lg:px-12">
                      <div className={`bg-white p-8 rounded-3xl shadow-lg border border-neutral-100 ${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'}`}>
                        <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-bold inline-block mb-4">
                          {item.year}
                        </div>
                        <h3 className="text-2xl font-bold text-neutral-900 mb-4">{item.title}</h3>
                        <p className="text-neutral-700 leading-relaxed">{item.description}</p>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary-600 rounded-full border-4 border-white shadow-lg z-10"></div>

                    {/* Image */}
                    <div className="lg:w-1/2 lg:px-12 mt-8 lg:mt-0">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-64 object-cover rounded-3xl shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="values" data-animate className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.values ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Nossos <span className="text-primary-600">Valores</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Os princípios que guiam cada decisão e cada viagem que organizamos
            </p>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className={`group transition-all duration-1000 ${isVisible.values ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className="bg-neutral-50 p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-500 border border-neutral-100 h-full">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                      value.color === 'primary' ? 'bg-primary-600' : 'bg-accent-500'
                    }`}>
                      <Icon size={28} className="text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-primary-600 transition-colors">
                      {value.title}
                    </h3>
                    
                    <p className="text-neutral-700 leading-relaxed">
                      {value.description}
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
              Pronto para fazer parte 
              <br />
              da nossa história?
            </h2>
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <p className="text-xl md:text-2xl text-primary-100 mb-12 leading-relaxed">
              Junte-se aos milhares de clientes que já realizaram seus sonhos 
              <br className="hidden md:block" />
              de viagem conosco. Sua próxima aventura começa aqui.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <Button 
              variant="secondary"
              size="xl"
              onClick={() => openWhatsApp("Olá! Após conhecer a história da STL Turismo, gostaria de planejar uma viagem!")}
              className="group bg-accent-500 hover:bg-accent-600 text-white border-none transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle size={20} className="mr-2" />
              Planejar Minha Viagem
            </Button>
            
            <Button 
              variant="outline"
              size="xl"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-primary-700 backdrop-blur-sm bg-white/10 transform hover:scale-105 transition-all duration-300"
            >
              <Phone size={20} className="mr-2" />
              Falar com Especialista
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

export default About;