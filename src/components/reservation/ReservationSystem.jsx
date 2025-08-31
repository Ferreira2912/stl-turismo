import { useState, useEffect } from 'react';
import { 
  User, Calendar, Users, CreditCard, CheckCircle, 
  ArrowLeft, ArrowRight, Mail, MessageCircle, X,
  MapPin, Phone, FileText, UserPlus, Trash2, Info
} from 'lucide-react';
import Button from '../common/Button';
import { formatDate } from '../../utils/helpers';
import { useReservation } from '../../hooks/useReservation';

const ReservationSystem = ({ 
  packageData = null, 
  isOpen = false, 
  onClose = () => {} 
}) => {
  const {
    reservationData,
    currentStep,
    updateReservationData,
    addCompanion,
    updateCompanion,
    removeCompanion,
    nextStep,
    prevStep,
    sendWhatsAppReservation,
    sendEmailReservation,
    resetReservation,
    initializeWithPackage
  } = useReservation();

  // Inicializar com dados do pacote se fornecido
  useEffect(() => {
    if (packageData && isOpen) {
      initializeWithPackage(packageData);
    }
  }, [packageData, isOpen, initializeWithPackage]);

  // Atualizar valor total quando mudar número de passageiros (para pacotes)
  useEffect(() => {
    if (packageData && reservationData.tripInfo.packageId) {
      const basePrice = packageData.price || 0;
      const passengers = reservationData.tripInfo.passengers || 1;
      updateReservationData('paymentInfo', {
        totalValue: basePrice * passengers
      });
    }
  }, [reservationData.tripInfo.passengers, packageData]);

  const steps = [
    { number: 1, title: 'Dados da Viagem', icon: Calendar },
    { number: 2, title: 'Dados Pessoais', icon: User },
    { number: 3, title: 'Acompanhantes', icon: Users },
    { number: 4, title: 'Pagamento & Envio', icon: CreditCard }
  ];

  const isStepValid = (step) => {
    switch (step) {
      case 1:
        const isFromPackage = reservationData.tripInfo.packageId !== null;
        if (isFromPackage) {
          // Para pacotes, só precisa das datas
          return reservationData.tripInfo.departureDate && 
                 reservationData.tripInfo.returnDate;
        } else {
          // Para reservas personalizadas, precisa de tudo
          return reservationData.tripInfo.destination && 
                 reservationData.tripInfo.departureDate && 
                 reservationData.tripInfo.returnDate;
        }
      case 2:
        return reservationData.personalInfo.name && 
               reservationData.personalInfo.email && 
               reservationData.personalInfo.phone && 
               reservationData.personalInfo.cpf;
      case 3:
        return true; // Acompanhantes são opcionais
      case 4:
        return reservationData.paymentInfo.paymentMethod;
      default:
        return false;
    }
  };

  const handleClose = () => {
    resetReservation();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex">
      <div className="bg-white w-full h-full overflow-y-auto flex flex-col">
        {/* Header */}
  <div className="sticky top-0 bg-white border-b border-neutral-200 p-6 shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-neutral-900">
              Sistema de Reservas
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between mt-6">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              const isValid = isStepValid(step.number);
              
              return (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      isCompleted 
                        ? 'bg-green-500 border-green-500 text-white' 
                        : isActive 
                          ? 'bg-primary-500 border-primary-500 text-white' 
                          : isValid
                            ? 'bg-primary-100 border-primary-300 text-primary-600'
                            : 'bg-neutral-100 border-neutral-300 text-neutral-400'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle size={20} />
                      ) : (
                        <StepIcon size={20} />
                      )}
                    </div>
                    <span className={`text-xs mt-2 text-center ${
                      isActive ? 'text-primary-600 font-medium' : 'text-neutral-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 rounded-full ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-neutral-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
  <div className="p-6 flex-1 overflow-y-auto">
          {currentStep === 1 && <TripInfoStep reservationData={reservationData} updateReservationData={updateReservationData} />}
          {currentStep === 2 && <PersonalInfoStep reservationData={reservationData} updateReservationData={updateReservationData} />}
          {currentStep === 3 && <CompanionsStep reservationData={reservationData} addCompanion={addCompanion} updateCompanion={updateCompanion} removeCompanion={removeCompanion} />}
          {currentStep === 4 && <PaymentStep reservationData={reservationData} updateReservationData={updateReservationData} sendWhatsAppReservation={sendWhatsAppReservation} sendEmailReservation={sendEmailReservation} />}
        </div>

        {/* Footer */}
  <div className="sticky bottom-0 bg-neutral-50 border-t border-neutral-200 p-6 shadow-inner">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" />
              Anterior
            </Button>
            
            {currentStep < 4 ? (
              <Button
                variant="primary"
                onClick={nextStep}
                disabled={!isStepValid(currentStep)}
                className="flex items-center"
              >
                Próximo
                <ArrowRight size={16} className="ml-2" />
              </Button>
            ) : (
              <div className="text-sm text-neutral-600">
                Escolha uma opção de envio acima
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente do Step 1 - Dados da Viagem
const TripInfoStep = ({ reservationData, updateReservationData }) => {
  const { tripInfo } = reservationData;
  const isFromPackage = tripInfo.packageId !== null;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-neutral-900 mb-4">
        Informações da Viagem
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Destino {!isFromPackage && '*'}
          </label>
          {isFromPackage ? (
            <div className="w-full px-4 py-3 bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-700">
              {tripInfo.destination || 'Não informado'}
            </div>
          ) : (
            <input
              type="text"
              value={tripInfo.destination}
              onChange={(e) => updateReservationData('tripInfo', { destination: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Ex: Buenos Aires, Argentina"
            />
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Nome do Pacote
          </label>
          {isFromPackage ? (
            <div className="w-full px-4 py-3 bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-700">
              {tripInfo.packageName || 'Pacote personalizado'}
            </div>
          ) : (
            <input
              type="text"
              value={tripInfo.packageName}
              onChange={(e) => updateReservationData('tripInfo', { packageName: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Ex: Buenos Aires Romântica"
            />
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Data de Saída *
          </label>
          {isFromPackage ? (
            <div className="w-full px-4 py-3 bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-700">
              {tripInfo.departureDate ? formatDate(tripInfo.departureDate) : 'A definir'}
            </div>
          ) : (
            <input
              type="date"
              value={tripInfo.departureDate}
              onChange={(e) => updateReservationData('tripInfo', { departureDate: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Data de Retorno *
          </label>
          {isFromPackage ? (
            <div className="w-full px-4 py-3 bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-700">
              {tripInfo.returnDate ? formatDate(tripInfo.returnDate) : 'A definir'}
            </div>
          ) : (
            <input
              type="date"
              value={tripInfo.returnDate}
              onChange={(e) => updateReservationData('tripInfo', { returnDate: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Duração
          </label>
          {isFromPackage ? (
            <div className="w-full px-4 py-3 bg-neutral-100 border border-neutral-300 rounded-lg text-neutral-700">
              {tripInfo.duration || 'A definir'}
            </div>
          ) : (
            <input
              type="text"
              value={tripInfo.duration}
              onChange={(e) => updateReservationData('tripInfo', { duration: e.target.value })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Ex: 4 dias / 3 noites"
            />
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Número de Passageiros *
          </label>
          <select
            value={tripInfo.passengers}
            onChange={(e) => updateReservationData('tripInfo', { passengers: parseInt(e.target.value) })}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {[1,2,3,4,5,6,7,8,9,10].map(num => (
              <option key={num} value={num}>{num} passageiro{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Tipo de Quarto
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'single', label: 'Individual' },
              { value: 'double', label: 'Duplo' },
              { value: 'triple', label: 'Triplo' }
            ].map(option => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="roomType"
                  value={option.value}
                  checked={tripInfo.roomType === option.value}
                  onChange={(e) => updateReservationData('tripInfo', { roomType: e.target.value })}
                  className="mr-2"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Solicitações Especiais
          </label>
          <textarea
            value={tripInfo.specialRequests}
            onChange={(e) => updateReservationData('tripInfo', { specialRequests: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Necessidades especiais, preferências alimentares, acessibilidade, etc."
          />
        </div>
      </div>
      
      {isFromPackage && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-blue-800">
                Informações do Pacote
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                Os dados destacados são baseados no pacote selecionado. Você pode escolher suas datas de viagem e personalizar outras opções.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Componente do Step 2 - Dados Pessoais
const PersonalInfoStep = ({ reservationData, updateReservationData }) => {
  const { personalInfo } = reservationData;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-neutral-900 mb-4">
        Dados Pessoais
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            value={personalInfo.name}
            onChange={(e) => updateReservationData('personalInfo', { name: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Seu nome completo"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            value={personalInfo.email}
            onChange={(e) => updateReservationData('personalInfo', { email: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="seu@email.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Telefone *
          </label>
          <input
            type="tel"
            value={personalInfo.phone}
            onChange={(e) => updateReservationData('personalInfo', { phone: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="(00) 00000-0000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            CPF *
          </label>
          <input
            type="text"
            value={personalInfo.cpf}
            onChange={(e) => updateReservationData('personalInfo', { cpf: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="000.000.000-00"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Data de Nascimento *
          </label>
          <input
            type="date"
            value={personalInfo.birthDate}
            onChange={(e) => updateReservationData('personalInfo', { birthDate: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>
      
      {/* Endereço */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-medium text-neutral-900 mb-4">
          Endereço (Opcional)
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Rua e Número
            </label>
            <input
              type="text"
              value={personalInfo.address.street}
              onChange={(e) => updateReservationData('personalInfo', { 
                address: { ...personalInfo.address, street: e.target.value }
              })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Rua das Flores, 123"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Cidade
            </label>
            <input
              type="text"
              value={personalInfo.address.city}
              onChange={(e) => updateReservationData('personalInfo', { 
                address: { ...personalInfo.address, city: e.target.value }
              })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Sua cidade"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Estado
            </label>
            <input
              type="text"
              value={personalInfo.address.state}
              onChange={(e) => updateReservationData('personalInfo', { 
                address: { ...personalInfo.address, state: e.target.value }
              })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="RS"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              CEP
            </label>
            <input
              type="text"
              value={personalInfo.address.zipCode}
              onChange={(e) => updateReservationData('personalInfo', { 
                address: { ...personalInfo.address, zipCode: e.target.value }
              })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="00000-000"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente do Step 3 - Acompanhantes
const CompanionsStep = ({ reservationData, addCompanion, updateCompanion, removeCompanion }) => {
  const { companions } = reservationData;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-neutral-900">
          Acompanhantes
        </h3>
        <Button
          variant="outline"
          onClick={addCompanion}
          className="flex items-center"
        >
          <UserPlus size={16} className="mr-2" />
          Adicionar Acompanhante
        </Button>
      </div>
      
      {companions.length === 0 ? (
        <div className="text-center py-12 text-neutral-500">
          <Users size={48} className="mx-auto mb-4 text-neutral-300" />
          <p>Nenhum acompanhante adicionado</p>
          <p className="text-sm">Clique em "Adicionar Acompanhante" para incluir mais pessoas na viagem</p>
        </div>
      ) : (
        <div className="space-y-6">
          {companions.map((companion, index) => (
            <div key={companion.id} className="border border-neutral-200 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-medium text-neutral-900">
                  Acompanhante {index + 1}
                </h4>
                <button
                  onClick={() => removeCompanion(companion.id)}
                  className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={companion.name}
                    onChange={(e) => updateCompanion(companion.id, { name: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Nome completo"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    CPF
                  </label>
                  <input
                    type="text"
                    value={companion.cpf}
                    onChange={(e) => updateCompanion(companion.id, { cpf: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="000.000.000-00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Data de Nascimento
                  </label>
                  <input
                    type="date"
                    value={companion.birthDate}
                    onChange={(e) => updateCompanion(companion.id, { birthDate: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Parentesco
                  </label>
                  <select
                    value={companion.relationship}
                    onChange={(e) => updateCompanion(companion.id, { relationship: e.target.value })}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Selecione...</option>
                    <option value="cônjuge">Cônjuge</option>
                    <option value="filho(a)">Filho(a)</option>
                    <option value="pai/mãe">Pai/Mãe</option>
                    <option value="irmão/irmã">Irmão/Irmã</option>
                    <option value="amigo(a)">Amigo(a)</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Componente do Step 4 - Pagamento e Envio
const PaymentStep = ({ reservationData, updateReservationData, sendWhatsAppReservation, sendEmailReservation }) => {
  const { paymentInfo, tripInfo } = reservationData;
  const isFromPackage = tripInfo.packageId !== null;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-neutral-900 mb-4">
        Informações de Pagamento
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Valor Total *
          </label>
          {isFromPackage ? (
            <div className="w-full px-4 py-3 bg-neutral-100 border border-neutral-300 rounded-lg">
              <div className="text-lg font-semibold text-green-600">
                R$ {paymentInfo.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-neutral-500 mt-1">
                R$ {(paymentInfo.totalValue / tripInfo.passengers).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} por pessoa × {tripInfo.passengers} passageiro{tripInfo.passengers > 1 ? 's' : ''}
              </div>
            </div>
          ) : (
            <input
              type="number"
              value={paymentInfo.totalValue}
              onChange={(e) => updateReservationData('paymentInfo', { totalValue: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="0.00"
            />
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Forma de Pagamento *
          </label>
          <select
            value={paymentInfo.paymentMethod}
            onChange={(e) => updateReservationData('paymentInfo', { paymentMethod: e.target.value })}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Selecione...</option>
            <option value="pix">PIX</option>
            <option value="cartao-credito">Cartão de Crédito</option>
            <option value="cartao-debito">Cartão de Débito</option>
            <option value="boleto">Boleto Bancário</option>
            <option value="transferencia">Transferência Bancária</option>
            <option value="dinheiro">Dinheiro</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Número de Parcelas
          </label>
          <select
            value={paymentInfo.installments}
            onChange={(e) => updateReservationData('paymentInfo', { installments: parseInt(e.target.value) })}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(num => (
              <option key={num} value={num}>{num}x de R$ {(paymentInfo.totalValue / num).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</option>
            ))}
          </select>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Observações sobre Pagamento
          </label>
          <textarea
            value={paymentInfo.observations}
            onChange={(e) => updateReservationData('paymentInfo', { observations: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Informações adicionais sobre o pagamento..."
          />
        </div>
      </div>
      
      {isFromPackage && (
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <h4 className="text-sm font-medium text-green-800">
                Valor Calculado Automaticamente
              </h4>
              <p className="text-sm text-green-700 mt-1">
                O valor foi calculado com base no preço do pacote multiplicado pelo número de passageiros.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Opções de Envio */}
      <div className="border-t pt-6">
        <h4 className="text-lg font-medium text-neutral-900 mb-4">
          Enviar Reserva
        </h4>
        <p className="text-neutral-600 mb-6">
          Escolha como deseja enviar sua solicitação de reserva:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={sendWhatsAppReservation}
            className="flex items-center justify-center bg-green-600 hover:bg-green-700"
            disabled={!paymentInfo.paymentMethod}
          >
            <MessageCircle size={20} className="mr-2" />
            Enviar via WhatsApp
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={sendEmailReservation}
            className="flex items-center justify-center border-2 border-primary-500 text-primary-600 hover:bg-primary-50"
            disabled={!paymentInfo.paymentMethod}
          >
            <Mail size={20} className="mr-2" />
            Enviar via Email
          </Button>
        </div>
        
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Importante:</strong> Esta é uma solicitação de reserva. Nossa equipe entrará em contato para confirmar disponibilidade e enviar o contrato para finalização.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservationSystem;
