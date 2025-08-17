import { useState } from 'react';
import { useWhatsApp } from './useWhatsApp';

export const useReservation = () => {
  const { openWhatsApp } = useWhatsApp();
  
  const [reservationData, setReservationData] = useState({
    // Dados pessoais
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      cpf: '',
      birthDate: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      }
    },
    
    // Dados da viagem
    tripInfo: {
      packageId: null,
      packageName: '',
      destination: '',
      departureDate: '',
      returnDate: '',
      duration: '',
      passengers: 1,
      roomType: 'double',
      specialRequests: ''
    },
    
    // Dados de acompanhantes
    companions: [],
    
    // Dados financeiros
    paymentInfo: {
      totalValue: 0,
      paymentMethod: '',
      installments: 1,
      observations: ''
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initializeWithPackage = (packageData) => {
    if (packageData) {
      setReservationData(prev => ({
        ...prev,
        tripInfo: {
          ...prev.tripInfo,
          packageId: packageData.id,
          packageName: packageData.title,
          destination: packageData.destination,
          departureDate: packageData.departureDate,
          returnDate: packageData.returnDate,
          duration: packageData.duration,
        },
        paymentInfo: {
          ...prev.paymentInfo,
          totalValue: packageData.price
        }
      }));
    }
  };

  const updateReservationData = (section, data) => {
    setReservationData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const addCompanion = () => {
    const newCompanion = {
      id: Date.now(),
      name: '',
      cpf: '',
      birthDate: '',
      relationship: ''
    };
    
    setReservationData(prev => ({
      ...prev,
      companions: [...prev.companions, newCompanion]
    }));
  };

  const updateCompanion = (companionId, data) => {
    setReservationData(prev => ({
      ...prev,
      companions: prev.companions.map(companion =>
        companion.id === companionId ? { ...companion, ...data } : companion
      )
    }));
  };

  const removeCompanion = (companionId) => {
    setReservationData(prev => ({
      ...prev,
      companions: prev.companions.filter(companion => companion.id !== companionId)
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const formatReservationMessage = () => {
    const { personalInfo, tripInfo, companions, paymentInfo } = reservationData;
    
    let message = `🎯 *SOLICITAÇÃO DE RESERVA - STL TURISMO*\n\n`;
    
    // Dados da viagem
    message += `📍 *DADOS DA VIAGEM*\n`;
    message += `🏖️ Destino: ${tripInfo.destination}\n`;
    message += `📦 Pacote: ${tripInfo.packageName}\n`;
    message += `📅 Saída: ${tripInfo.departureDate}\n`;
    message += `🔄 Retorno: ${tripInfo.returnDate}\n`;
    message += `⏱️ Duração: ${tripInfo.duration}\n`;
    message += `👥 Passageiros: ${tripInfo.passengers}\n`;
    message += `🏨 Tipo de Quarto: ${tripInfo.roomType === 'single' ? 'Individual' : tripInfo.roomType === 'double' ? 'Duplo' : 'Triplo'}\n\n`;
    
    // Dados pessoais
    message += `👤 *DADOS PESSOAIS*\n`;
    message += `📛 Nome: ${personalInfo.name}\n`;
    message += `📧 Email: ${personalInfo.email}\n`;
    message += `📱 Telefone: ${personalInfo.phone}\n`;
    message += `🆔 CPF: ${personalInfo.cpf}\n`;
    message += `🎂 Data de Nascimento: ${personalInfo.birthDate}\n\n`;
    
    // Endereço
    if (personalInfo.address.street) {
      message += `📍 *ENDEREÇO*\n`;
      message += `🏠 ${personalInfo.address.street}\n`;
      message += `🏙️ ${personalInfo.address.city} - ${personalInfo.address.state}\n`;
      message += `📮 CEP: ${personalInfo.address.zipCode}\n\n`;
    }
    
    // Acompanhantes
    if (companions.length > 0) {
      message += `👫 *ACOMPANHANTES*\n`;
      companions.forEach((companion, index) => {
        message += `${index + 1}. ${companion.name}\n`;
        message += `   CPF: ${companion.cpf}\n`;
        message += `   Nascimento: ${companion.birthDate}\n`;
        message += `   Parentesco: ${companion.relationship}\n\n`;
      });
    }
    
    // Informações financeiras
    message += `💰 *INFORMAÇÕES FINANCEIRAS*\n`;
    message += `💵 Valor Total: R$ ${paymentInfo.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
    message += `💳 Forma de Pagamento: ${paymentInfo.paymentMethod}\n`;
    message += `📊 Parcelas: ${paymentInfo.installments}x\n\n`;
    
    // Solicitações especiais
    if (tripInfo.specialRequests) {
      message += `📝 *SOLICITAÇÕES ESPECIAIS*\n`;
      message += `${tripInfo.specialRequests}\n\n`;
    }
    
    // Observações financeiras
    if (paymentInfo.observations) {
      message += `💡 *OBSERVAÇÕES*\n`;
      message += `${paymentInfo.observations}\n\n`;
    }
    
    message += `✅ *Aguardo confirmação e envio do contrato para finalização da reserva.*\n\n`;
    message += `🙏 Obrigado por escolher a STL Turismo!`;
    
    return message;
  };

  const formatEmailData = () => {
    const { personalInfo, tripInfo, companions, paymentInfo } = reservationData;
    
    const subject = `Solicitação de Reserva - ${tripInfo.packageName} - ${personalInfo.name}`;
    
    let body = `Prezados,\n\nSegue solicitação de reserva com os seguintes dados:\n\n`;
    
    body += `DADOS DA VIAGEM:\n`;
    body += `- Destino: ${tripInfo.destination}\n`;
    body += `- Pacote: ${tripInfo.packageName}\n`;
    body += `- Data de Saída: ${tripInfo.departureDate}\n`;
    body += `- Data de Retorno: ${tripInfo.returnDate}\n`;
    body += `- Duração: ${tripInfo.duration}\n`;
    body += `- Número de Passageiros: ${tripInfo.passengers}\n`;
    body += `- Tipo de Quarto: ${tripInfo.roomType === 'single' ? 'Individual' : tripInfo.roomType === 'double' ? 'Duplo' : 'Triplo'}\n\n`;
    
    body += `DADOS PESSOAIS:\n`;
    body += `- Nome: ${personalInfo.name}\n`;
    body += `- Email: ${personalInfo.email}\n`;
    body += `- Telefone: ${personalInfo.phone}\n`;
    body += `- CPF: ${personalInfo.cpf}\n`;
    body += `- Data de Nascimento: ${personalInfo.birthDate}\n\n`;
    
    if (personalInfo.address.street) {
      body += `ENDEREÇO:\n`;
      body += `- ${personalInfo.address.street}\n`;
      body += `- ${personalInfo.address.city} - ${personalInfo.address.state}\n`;
      body += `- CEP: ${personalInfo.address.zipCode}\n\n`;
    }
    
    if (companions.length > 0) {
      body += `ACOMPANHANTES:\n`;
      companions.forEach((companion, index) => {
        body += `${index + 1}. ${companion.name} - CPF: ${companion.cpf} - Nascimento: ${companion.birthDate} - Parentesco: ${companion.relationship}\n`;
      });
      body += `\n`;
    }
    
    body += `INFORMAÇÕES FINANCEIRAS:\n`;
    body += `- Valor Total: R$ ${paymentInfo.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
    body += `- Forma de Pagamento: ${paymentInfo.paymentMethod}\n`;
    body += `- Parcelas: ${paymentInfo.installments}x\n\n`;
    
    if (tripInfo.specialRequests) {
      body += `SOLICITAÇÕES ESPECIAIS:\n${tripInfo.specialRequests}\n\n`;
    }
    
    if (paymentInfo.observations) {
      body += `OBSERVAÇÕES:\n${paymentInfo.observations}\n\n`;
    }
    
    body += `Aguardo confirmação e envio do contrato para finalização da reserva.\n\n`;
    body += `Atenciosamente,\n${personalInfo.name}`;
    
    return { subject, body };
  };

  const sendWhatsAppReservation = () => {
    const message = formatReservationMessage();
    openWhatsApp(message);
  };

  const sendEmailReservation = () => {
    const { subject, body } = formatEmailData();
    const mailtoLink = `mailto:contato@stlturismo.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
  };

  const resetReservation = () => {
    setReservationData({
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        cpf: '',
        birthDate: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: ''
        }
      },
      tripInfo: {
        packageId: null,
        packageName: '',
        destination: '',
        departureDate: '',
        returnDate: '',
        duration: '',
        passengers: 1,
        roomType: 'double',
        specialRequests: ''
      },
      companions: [],
      paymentInfo: {
        totalValue: 0,
        paymentMethod: '',
        installments: 1,
        observations: ''
      }
    });
    setCurrentStep(1);
  };

  return {
    reservationData,
    currentStep,
    isSubmitting,
    updateReservationData,
    addCompanion,
    updateCompanion,
    removeCompanion,
    nextStep,
    prevStep,
    goToStep,
    sendWhatsAppReservation,
    sendEmailReservation,
    resetReservation,
    setIsSubmitting,
    initializeWithPackage
  };
};

export default useReservation;
