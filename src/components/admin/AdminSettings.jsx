import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  Upload, 
  Bell, 
  Globe
} from 'lucide-react';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // Configurações Gerais
    siteName: 'STL Turismo',
    siteDescription: 'Sua agência de viagens dos sonhos',
    contactEmail: 'stlturismo20@hotmail.com',
    contactPhone: '(11) 99999-9999',
    address: 'São Paulo, SP - Brasil',
    
    // Configurações de Email
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: '',
    smtpPassword: '',
    emailFrom: 'noreply@stlturismo.com',
    
    // Configurações de Notificação
    emailNotifications: true,
    reservationNotifications: true,
    promotionalEmails: false,
    
    // Configurações de SEO
    metaTitle: 'STL Turismo - Viagens dos Sonhos',
    metaDescription: 'Descubra destinos incríveis com os melhores pacotes de viagem. STL Turismo, sua agência especializada em experiências únicas.',
    keywords: 'viagem, turismo, pacotes, destinos',
    
    // Configurações de Aparência
    primaryColor: '#2563eb',
    secondaryColor: '#f97316',
    logoUrl: '',
    faviconUrl: '',
    
    // Configurações de Segurança
    requireEmailVerification: true,
    enableTwoFactor: false,
    sessionTimeout: 30,
    
    // Configurações de Firebase
    firebaseConfig: {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: ''
    }
  });

  const handleInputChange = (section, field, value) => {
    if (section === 'firebaseConfig') {
      setSettings(prev => ({
        ...prev,
        firebaseConfig: {
          ...prev.firebaseConfig,
          [field]: value
        }
      }));
    } else {
      setSettings(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSave = () => {
    console.log('⚙️ Salvando configurações:', settings);
    // Aqui seria implementado o salvamento das configurações
    alert('Configurações salvas com sucesso!');
  };

  const tabs = [
    { id: 'general', label: 'Geral', icon: Settings },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'seo', label: 'SEO', icon: Globe }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Configurações Gerais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome do Site
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange('general', 'siteName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email de Contato
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange('general', 'contactEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone de Contato
                </label>
                <input
                  type="tel"
                  value={settings.contactPhone}
                  onChange={(e) => handleInputChange('general', 'contactPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Endereço
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => handleInputChange('general', 'address', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição do Site
              </label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => handleInputChange('general', 'siteDescription', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Configurações de Notificação</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Notificações por Email</h4>
                  <p className="text-sm text-gray-600">Receber notificações gerais por email</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Notificações de Reserva</h4>
                  <p className="text-sm text-gray-600">Receber notificações sobre novas reservas</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.reservationNotifications}
                  onChange={(e) => handleInputChange('notifications', 'reservationNotifications', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Emails Promocionais</h4>
                  <p className="text-sm text-gray-600">Enviar emails promocionais para clientes</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.promotionalEmails}
                  onChange={(e) => handleInputChange('notifications', 'promotionalEmails', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        );

      case 'seo':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Configurações de SEO</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Title
              </label>
              <input
                type="text"
                value={settings.metaTitle}
                onChange={(e) => handleInputChange('seo', 'metaTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meta Description
              </label>
              <textarea
                value={settings.metaDescription}
                onChange={(e) => handleInputChange('seo', 'metaDescription', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Palavras-chave
              </label>
              <input
                type="text"
                value={settings.keywords}
                onChange={(e) => handleInputChange('seo', 'keywords', e.target.value)}
                placeholder="Separadas por vírgula"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600">Gerencie as configurações do sistema</p>
        </div>
        <button
          onClick={handleSave}
          className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-5 h-5 mr-2" />
          Salvar Configurações
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
