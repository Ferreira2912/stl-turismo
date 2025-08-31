import { useState, useEffect } from 'react';
import { 
  Target, Eye, Heart, MessageCircle, Phone
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

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header transparentOnTop />

  {/* Hero Section */}
  <section className="relative min-h-[calc(100vh+80px)] flex items-center justify-center overflow-hidden -mt-20 pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=1920&h=1080&fit=crop"
            alt="Sobre a STL Turismo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-sky-900/70 via-sky-900/40 to-transparent"></div>
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
              Sobre a <span className="text-accent-300">STL Turismo</span>
            </h1>
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto">
              Conheça nossa empresa e os valores que nos guiam na realização dos seus sonhos de viagem.
            </p>
          </div>
        </div>
      </section>

      {/* Apresentação */}
      <section id="presentation" data-animate className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-20 transition-all duration-1000 ${isVisible.presentation ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-8">
              Bem-vindos à <span className="text-primary-600">STL Turismo</span>
            </h2>
            <p className="text-xl text-neutral-700 leading-relaxed max-w-4xl mx-auto">
              Somos uma empresa de turismo dedicada a proporcionar experiências únicas e memoráveis. 
              Com foco no atendimento de qualidade e na satisfação dos nossos clientes, trabalhamos 
              para transformar cada viagem em uma experiência especial e inesquecível.
            </p>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section id="values" data-animate className="py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Missão */}
            <div className={`transition-all duration-1000 ${isVisible.values ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 border border-neutral-100 h-full">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Target size={28} className="text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
                  Missão
                </h3>
                
                <p className="text-neutral-700 leading-relaxed text-center">
                  Realizar sonhos de pessoas, dando-lhes a oportunidade de conhecer novos lugares presando sempre pelo bom atendimento, conforto, tranquilidade e segurança em suas viagens.
                </p>
              </div>
            </div>

            {/* Visão */}
            <div className={`transition-all duration-1000 ${isVisible.values ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{animationDelay: '0.2s'}}>
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 border border-neutral-100 h-full">
                <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Eye size={28} className="text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
                  Visão
                </h3>
                
                <p className="text-neutral-700 leading-relaxed text-center">
                  Ser referência no ramo do transporte e turismo, em Seberi e região, oferecendo diversas opções de viagens e uma frota que atenda às necessidades de seus clientes.
                </p>
              </div>
            </div>

            {/* Valores */}
            <div className={`transition-all duration-1000 ${isVisible.values ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{animationDelay: '0.4s'}}>
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 border border-neutral-100 h-full">
                <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Heart size={28} className="text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
                  Valores
                </h3>
                
                <p className="text-neutral-700 leading-relaxed text-center">
                  Qualidade no serviço prestado e um atendimento diferenciado e familiar estando sempre próximo de seus clientes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-600"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              Pronto para realizar
              <br />
              seu próximo sonho?
            </h2>
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <p className="text-xl md:text-2xl text-primary-100 mb-12 leading-relaxed">
              Entre em contato conosco e deixe que cuidemos de todos os detalhes 
              <br className="hidden md:block" />
              da sua próxima viagem.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <Button 
              variant="secondary"
              size="xl"
              onClick={() => openWhatsApp("Olá! Gostaria de saber mais sobre os serviços da STL Turismo!")}
              className="group bg-accent-500 hover:bg-accent-600 text-white border-none transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle size={20} className="mr-2" />
              Fale Conosco
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