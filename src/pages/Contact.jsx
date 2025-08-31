import { useState, useEffect } from 'react';
import { 
  MapPin, Phone, MessageCircle, Mail, Clock, Calendar,
  Send, User, MessageSquare, Users, Star, CheckCircle
} from 'lucide-react';
import { useWhatsApp } from '../hooks/useWhatsApp';
import { useNavigation } from '../hooks/useNavigation';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import WhatsAppButton from '../components/common/WhatsAppButton';
import QuickNavigation from '../components/common/QuickNavigation';
import Button from '../components/common/Button';

const Contact = () => {
  const { openWhatsApp } = useWhatsApp();
  const { getAdjacentPages } = useNavigation();
  const [isVisible, setIsVisible] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    travelType: '',
    travelDate: '',
    groupSize: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Criar mensagem para WhatsApp
      const message = `
🌟 *NOVO CONTATO - STL TURISMO* 🌟

👤 *Nome:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Telefone:* ${formData.phone}
🎯 *Assunto:* ${formData.subject}

🧳 *Tipo de Viagem:* ${formData.travelType}
📅 *Data Pretendida:* ${formData.travelDate}
👥 *Tamanho do Grupo:* ${formData.groupSize} pessoa(s)

💬 *Mensagem:*
${formData.message}

---
_Formulário enviado pelo site_
      `.trim();

      // Abrir WhatsApp com a mensagem
      openWhatsApp(message);
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        travelType: '',
        travelDate: '',
        groupSize: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Telefone',
      content: '+55 55 9942-1868',
      description: 'Atendimento de Segunda à Sexta',
      color: 'primary',
      action: () => window.open('tel:+5555999421868')
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      content: '+55 55 9942-1868',
      description: 'Disponível 24/7',
      color: 'accent',
      action: () => openWhatsApp("Olá! Vim através do site e gostaria de mais informações.")
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'stlturismo20@hotmail.com',
      description: 'Resposta em até 24h',
      color: 'primary',
      action: () => window.open('mailto:stlturismo20@hotmail.com')
    },
    {
      icon: MapPin,
      title: 'Endereço',
  content: 'Av. Fortaleza, 344',
  description: 'Centro - Seberi/RS, 98380-000',
      color: 'accent',
  action: () => window.open('https://www.google.com/maps/search/?api=1&query=Av.%20Fortaleza%2C%20344%20-%20Centro%2C%20Seberi%20-%20RS%2C%2098380-000', '_blank')
    }
  ];

  const businessHours = [
    { day: 'Segunda - Sexta', hours: '08:00 - 18:00' },
    { day: 'Sábado', hours: '08:00 - 12:00' },
    { day: 'Domingo', hours: 'Plantão WhatsApp' }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=1080&fit=crop"
            alt="Entre em Contato"
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
              Entre em <span className="text-accent-300">Contato</span>
            </h1>
          </div>
          
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto">
              Estamos prontos para transformar seus sonhos de viagem em realidade. 
              <br className="hidden md:block" />
              Entre em contato conosco e comece a planejar sua próxima aventura.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              Fale <span className="text-primary-600">Conosco</span>
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Escolha a forma mais conveniente para entrar em contato
            </p>
            <div className="w-24 h-1 bg-accent-500 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <div 
                  key={index}
                  onClick={info.action}
                  className="group cursor-pointer bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-neutral-100"
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 ${
                    info.color === 'primary' ? 'bg-primary-600' : 'bg-accent-500'
                  }`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-neutral-900 mb-2 text-center">
                    {info.title}
                  </h3>
                  
                  <p className={`font-semibold text-center mb-2 ${
                    info.color === 'primary' ? 'text-primary-600' : 'text-accent-500'
                  }`}>
                    {info.content}
                  </p>
                  
                  <p className="text-neutral-600 text-sm text-center">
                    {info.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section id="contact" data-animate className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className={`transition-all duration-1000 ${isVisible.contact ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`}>
              <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100">
                <h3 className="text-3xl font-bold text-neutral-900 mb-8">
                  Envie sua <span className="text-primary-600">Mensagem</span>
                </h3>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center">
                    <CheckCircle size={20} className="text-green-600 mr-3" />
                    <span className="text-green-800">Mensagem enviada com sucesso! Redirecionando para WhatsApp...</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                    <span className="text-red-800">Erro ao enviar mensagem. Tente novamente.</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Telefone/WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                        placeholder="+55 55 9999-9999"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Tipo de Viagem
                      </label>
                      <select
                        name="travelType"
                        value={formData.travelType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Selecione...</option>
                        <option value="nacional">Nacional</option>
                        <option value="internacional">Internacional</option>
                        <option value="ambos">Ambos</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Data Pretendida
                      </label>
                      <input
                        type="date"
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        Número de Pessoas
                      </label>
                      <select
                        name="groupSize"
                        value={formData.groupSize}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="">Selecione...</option>
                        <option value="1">1 pessoa</option>
                        <option value="2">2 pessoas</option>
                        <option value="3-5">3-5 pessoas</option>
                        <option value="6-10">6-10 pessoas</option>
                        <option value="11+">Mais de 10 pessoas</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Assunto *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="Resumo do que você precisa"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Mensagem *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                      placeholder="Conte-nos mais detalhes sobre sua viagem dos sonhos..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700 transform hover:scale-105 transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={20} className="mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Map & Business Hours */}
            <div className={`space-y-8 transition-all duration-1000 ${isVisible.contact ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'}`} style={{animationDelay: '0.3s'}}>
              {/* Map */}
              <div className="bg-neutral-100 rounded-3xl overflow-hidden shadow-lg">
                <div className="h-80 relative">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.7547666090463!2d-53.40530922442682!3d-27.476893076315477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94fb828fea7238c3%3A0x8b8bec8bdd22c5ed!2sAv.%20Fortaleza%2C%20344%20-%20Centro%2C%20Seberi%20-%20RS%2C%2098380-000!5e0!3m2!1spt-BR!2sbr!4v1756247530036!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
          allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização STL Turismo"
                  ></iframe>
                  
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg">
                    <div className="flex items-center">
                      <MapPin size={20} className="text-primary-600 mr-2" />
                      <div>
                        <div className="font-semibold text-neutral-900 text-sm">STL Turismo</div>
            <div className="text-neutral-600 text-xs">Seberi - RS</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-primary-50 p-8 rounded-3xl border border-primary-100">
                <h4 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center">
                  <Clock size={24} className="text-primary-600 mr-3" />
                  Horário de Atendimento
                </h4>
                
                <div className="space-y-4">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-primary-100 last:border-b-0">
                      <span className="text-neutral-700 font-medium">{schedule.day}</span>
                      <span className="text-primary-600 font-semibold">{schedule.hours}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-accent-50 rounded-xl border border-accent-200">
                  <div className="flex items-center text-accent-700">
                    <MessageCircle size={18} className="mr-2" />
                    <span className="text-sm font-medium">
                      WhatsApp disponível 24/7 para emergências
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-neutral-100">
                <h4 className="text-xl font-bold text-neutral-900 mb-6">
                  Contato Rápido
                </h4>
                
                <div className="space-y-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => openWhatsApp("Olá! Vim através da página de contato e gostaria de falar sobre uma viagem.")}
                    className="w-full bg-green-600 hover:bg-green-700 border-none"
                  >
                    <MessageCircle size={20} className="mr-2" />
                    WhatsApp Direto
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => window.open('tel:+5555999421868')}
                    className="w-full border-2 border-primary-600 text-primary-600 hover:bg-primary-50"
                  >
                    <Phone size={20} className="mr-2" />
                    Ligar Agora
                  </Button>
                </div>
              </div>
            </div>
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

export default Contact;