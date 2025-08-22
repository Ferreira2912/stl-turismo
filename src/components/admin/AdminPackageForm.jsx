import React, { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon, Trash2, Star, Copy } from 'lucide-react';
import { addPackage, updatePackage } from '../../services/database';
import { uploadMultipleImages, deletePackageImage } from '../../services/storage';

const AdminPackageForm = ({ isOpen, onClose, packageData = null, onSuccess, isCopy = false }) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    price: '',
    originalPrice: '',
    includes: [''],
    excludes: [''],
    itinerary: [{ day: 1, title: '', description: '' }],
    featured: false,
    category: 'nacional',
    accommodation: '',
    transport: '',
    images: [],
    departureDate: '',
    returnDate: '',
    transportMode: 'rodoviario',
    promoEnabled: false,
    promotionalPrice: '',
    paymentType: ['cartao'],
    paymentOptions: {
      cartao: { enabled: true, description: '' },
      boleto: { enabled: false, description: '' },
      pix: { enabled: false, description: '' }
    },
    installmentOptions: '',
    importantInfo: [''],
    departureLocations: [{ name: '', date: '', time: '' }]
  });

  // Reset form data when packageData changes
  useEffect(() => {
    if (packageData) {
      setFormData({
        title: packageData.title || '',
        description: packageData.description || '',
        duration: packageData.duration || '',
        price: packageData.price || '',
        originalPrice: packageData.originalPrice || '',
        includes: packageData.includes || [''],
        excludes: packageData.excludes || [''],
        itinerary: packageData.itinerary || [{ day: 1, title: '', description: '' }],
        featured: packageData.featured || false,
        category: packageData.category || 'nacional',
        accommodation: packageData.accommodation || '',
        transport: packageData.transport || '',
        images: packageData.images || [],
        departureDate: packageData.departureDate || '',
        returnDate: packageData.returnDate || '',
        transportMode: packageData.transportMode || 'rodoviario',
        promoEnabled: packageData.promotionalPrice ? true : false,
        promotionalPrice: packageData.promotionalPrice || '',
        paymentType: Array.isArray(packageData.paymentType) 
          ? packageData.paymentType 
          : packageData.paymentType 
            ? [packageData.paymentType] 
            : ['cartao'],
        paymentOptions: packageData.paymentOptions || {
          cartao: { enabled: true, description: '' },
          boleto: { enabled: false, description: '' },
          pix: { enabled: false, description: '' }
        },
        installmentOptions: packageData.installmentOptions || '',
        importantInfo: packageData.importantInfo || [''],
        departureLocations: packageData.departureLocations || [{ name: '', date: '', time: '' }]
      });
      setImages(packageData.images || []);
      setImageFiles([]);
    } else {
      // Reset to default values for new package
      setFormData({
        title: '',
        description: '',
        duration: '',
        price: '',
        originalPrice: '',
        includes: [''],
        excludes: [''],
        itinerary: [{ day: 1, title: '', description: '' }],
        featured: false,
        category: 'nacional',
        accommodation: '',
        transport: '',
        images: [],
        departureDate: '',
        returnDate: '',
        transportMode: 'rodoviario',
        promoEnabled: false,
        promotionalPrice: '',
        paymentType: ['cartao'],
        paymentOptions: {
          cartao: { enabled: true, description: '' },
          boleto: { enabled: false, description: '' },
          pix: { enabled: false, description: '' }
        },
        installmentOptions: '',
        importantInfo: [''],
        departureLocations: [{ name: '', date: '', time: '' }]
      });
      setImages([]);
      setImageFiles([]);
    }
  }, [packageData]);

  const handlePaymentTypeChange = (value, checked) => {
    setFormData(prev => {
      let newPaymentType = [...prev.paymentType];
      const newPaymentOptions = { ...prev.paymentOptions };
      
      if (checked) {
        if (!newPaymentType.includes(value)) {
          newPaymentType.push(value);
        }
        newPaymentOptions[value].enabled = true;
      } else {
        newPaymentType = newPaymentType.filter(type => type !== value);
        newPaymentOptions[value].enabled = false;
        newPaymentOptions[value].description = ''; // Limpar descrição quando desmarcar
      }
      
      // Garantir que sempre há pelo menos uma opção selecionada
      if (newPaymentType.length === 0) {
        newPaymentType = ['cartao'];
        newPaymentOptions.cartao.enabled = true;
      }
      
      return { 
        ...prev, 
        paymentType: newPaymentType,
        paymentOptions: newPaymentOptions
      };
    });
  };

  const handlePaymentDescriptionChange = (paymentType, description) => {
    setFormData(prev => ({
      ...prev,
      paymentOptions: {
        ...prev.paymentOptions,
        [paymentType]: {
          ...prev.paymentOptions[paymentType],
          description: description
        }
      }
    }));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field, defaultValue = '') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], defaultValue]
    }));
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleItineraryChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItineraryDay = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, { 
        day: prev.itinerary.length + 1, 
        title: '', 
        description: '' 
      }]
    }));
  };

  const removeItineraryDay = (index) => {
    setFormData(prev => ({
      ...prev,
      itinerary: prev.itinerary.filter((_, i) => i !== index)
        .map((item, i) => ({ ...item, day: i + 1 }))
    }));
  };

  const handleDepartureLocationChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      departureLocations: prev.departureLocations.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addDepartureLocation = () => {
    setFormData(prev => ({
      ...prev,
      departureLocations: [...prev.departureLocations, { name: '', date: '', time: '' }]
    }));
  };

  const removeDepartureLocation = (index) => {
    setFormData(prev => ({
      ...prev,
      departureLocations: prev.departureLocations.filter((_, i) => i !== index)
    }));
  };

  const calcularDuracao = (start, end) => {
    const inicio = new Date(start);
    const fim = new Date(end);
    if (isNaN(inicio) || isNaN(fim) || fim < inicio) return;
    const diffMs = fim - inicio;
    const dias = Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1; // inclui dia inicial
    const noites = dias - 1;
    setFormData(prev => ({ ...prev, duration: `${dias} Dias / ${noites} Noites` }));
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const newImageFiles = [...imageFiles, ...files];
    
    setImageFiles(newImageFiles);
    
    // Criar previews
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let packageId = packageData?.id && !isCopy ? packageData.id : null;
      let imageUrls = [...formData.images];

      // Se é um novo pacote ou uma cópia, criar primeiro para obter o ID
      if (!packageId) {
        const tempPackage = await addPackage({
          ...formData,
          images: []
        });
        packageId = tempPackage.id;
      }

      // Upload das novas imagens
      if (imageFiles.length > 0) {
        const uploadedUrls = await uploadMultipleImages(imageFiles, packageId);
        imageUrls = [...imageUrls, ...uploadedUrls];
      }

      // Dados finais do pacote
      const finalPackageData = {
        ...formData,
        images: imageUrls,
        price: parseFloat(formData.price),
        originalPrice: formData.promoEnabled && formData.promotionalPrice ? parseFloat(formData.price) : null,
        promotionalPrice: formData.promoEnabled && formData.promotionalPrice ? parseFloat(formData.promotionalPrice) : null,
        transportMode: formData.transportMode,
        paymentType: formData.paymentType,
        paymentOptions: formData.paymentOptions,
        installmentOptions: formData.installmentOptions,
        importantInfo: formData.importantInfo.filter(info => info.trim() !== ''),
        departureLocations: formData.departureLocations.filter(loc => loc.name.trim() !== '')
      };      

      // Atualizar ou criar o pacote com as imagens
      if (packageData?.id && !isCopy) {
        await updatePackage(packageData.id, finalPackageData);
      } else {
        await updatePackage(packageId, finalPackageData);
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Erro ao salvar pacote:', error);
      alert('Erro ao salvar pacote. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {isCopy ? 'Criar Cópia do Pacote' : packageData ? 'Editar Pacote' : 'Novo Pacote'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {isCopy && (
          <div className="bg-blue-50 border border-blue-200 p-4 mx-6 rounded-lg">
            <div className="flex items-center">
              <Copy className="w-5 h-5 text-blue-600 mr-2" />
              <p className="text-sm text-blue-700">
                <strong>Criando cópia:</strong> Este formulário está preenchido com os dados do pacote original. 
                Você pode modificar qualquer informação antes de salvar.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Informações Básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título do Pacote *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="nacional">Nacional</option>
                <option value="internacional">Internacional</option>
                <option value="aventura">Aventura</option>
                <option value="relaxamento">Relaxamento</option>
                <option value="cultural">Cultural</option>
                <option value="romantico">Romântico</option>
              </select>
            </div>
          </div>

          {/* Modalidade de Transporte */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Modalidade de Transporte
            </label>
            <select
              name="transportMode"
              value={formData.transportMode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="aereo">Aéreo</option>
              <option value="rodoviario">Rodoviário</option>
              <option value="misto">Misto</option>
            </select>
          </div>

          {/* Campo de duração manual removido (calculada automaticamente abaixo) */}

          {/* Investimento */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Investimento</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor (R$) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Formas de Pagamento * (selecione uma ou mais opções)
              </label>
              <div className="space-y-4">
                {/* Cartão de Crédito */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      checked={formData.paymentOptions.cartao.enabled}
                      onChange={(e) => handlePaymentTypeChange('cartao', e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2"
                    />
                    <span className="font-medium">Cartão de Crédito</span>
                  </label>
                  {formData.paymentOptions.cartao.enabled && (
                    <input
                      type="text"
                      value={formData.paymentOptions.cartao.description}
                      onChange={(e) => handlePaymentDescriptionChange('cartao', e.target.value)}
                      placeholder="Ex: À vista ou em até 12x sem juros"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  )}
                </div>

                {/* Boleto */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      checked={formData.paymentOptions.boleto.enabled}
                      onChange={(e) => handlePaymentTypeChange('boleto', e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2"
                    />
                    <span className="font-medium">Boleto Bancário</span>
                  </label>
                  {formData.paymentOptions.boleto.enabled && (
                    <input
                      type="text"
                      value={formData.paymentOptions.boleto.description}
                      onChange={(e) => handlePaymentDescriptionChange('boleto', e.target.value)}
                      placeholder="Ex: À vista com vencimento em 3 dias úteis"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  )}
                </div>

                {/* PIX */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      checked={formData.paymentOptions.pix.enabled}
                      onChange={(e) => handlePaymentTypeChange('pix', e.target.checked)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded mr-2"
                    />
                    <span className="font-medium">PIX</span>
                  </label>
                  {formData.paymentOptions.pix.enabled && (
                    <input
                      type="text"
                      value={formData.paymentOptions.pix.description}
                      onChange={(e) => handlePaymentDescriptionChange('pix', e.target.value)}
                      placeholder="Ex: À vista com 5% de desconto, transferência instantânea"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!formData.promoEnabled}
                  onChange={(e) => setFormData(prev => ({...prev, promoEnabled: e.target.checked, promotionalPrice: e.target.checked ? prev.promotionalPrice : ''}))}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                Ativar Preço Promocional
              </label>
              {formData.promoEnabled && (
                <input
                  type="number"
                  name="promotionalPrice"
                  value={formData.promotionalPrice || ''}
                  onChange={handleInputChange}
                  step="0.01"
                  placeholder="Preço promocional (R$)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
              )}
            </div>
          </div>

          {/* Datas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Saída
              </label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate || ''}
                onChange={(e) => {
                  handleInputChange(e);
                  if (e.target.value && formData.returnDate) {
                    calcularDuracao(e.target.value, formData.returnDate);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Retorno
              </label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate || ''}
                onChange={(e) => {
                  handleInputChange(e);
                  if (e.target.value && formData.departureDate) {
                    calcularDuracao(formData.departureDate, e.target.value);
                  }
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Duração calculada */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duração (calculada)
            </label>
            <input
              type="text"
              value={formData.duration || ''}
              readOnly
              placeholder="Será calculada após escolher as datas"
              className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Upload de Imagens */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagens do Pacote
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Clique para selecionar imagens
                    </span>
                    <span className="mt-1 block text-sm text-gray-500">
                      PNG, JPG, JPEG até 10MB cada
                    </span>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Preview das imagens */}
              {images.length > 0 && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* O que está incluído */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              O que está incluído
            </label>
            {(formData.includes || []).map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('includes', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Passagem aérea"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('includes', index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('includes')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              + Adicionar item incluído
            </button>
          </div>

          {/* O que não está incluído */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              O que não está incluído
            </label>
            {(formData.excludes || []).map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('excludes', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Refeições não mencionadas"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('excludes', index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('excludes')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              + Adicionar item não incluído
            </button>
          </div>

          {/* Informações Importantes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Informações Importantes
            </label>
            {(formData.importantInfo || []).map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('importantInfo', index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ex: Documentos necessários, vacinas, etc."
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('importantInfo', index)}
                  className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('importantInfo')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              + Adicionar informação importante
            </button>
          </div>

          {/* Locais de Embarque */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Locais de Embarque
            </label>
            {(formData.departureLocations || []).map((location, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Local {index + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removeDepartureLocation(index)}
                    className="text-red-600 hover:bg-red-50 p-1 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={location.name}
                    onChange={(e) => handleDepartureLocationChange(index, 'name', e.target.value)}
                    placeholder="Nome do local"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="date"
                    value={location.date}
                    onChange={(e) => handleDepartureLocationChange(index, 'date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="time"
                    value={location.time}
                    onChange={(e) => handleDepartureLocationChange(index, 'time', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addDepartureLocation}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              + Adicionar local de embarque
            </button>
          </div>

          {/* Itinerário */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Itinerário
            </label>
            {(formData.itinerary || []).map((day, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Dia {day.day}</h4>
                  <button
                    type="button"
                    onClick={() => removeItineraryDay(index)}
                    className="text-red-600 hover:bg-red-50 p-1 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={day.title}
                    onChange={(e) => handleItineraryChange(index, 'title', e.target.value)}
                    placeholder="Título do dia"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    value={day.description}
                    onChange={(e) => handleItineraryChange(index, 'description', e.target.value)}
                    placeholder="Descrição das atividades"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addItineraryDay}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              + Adicionar dia
            </button>
          </div>

          {/* Pacote em destaque */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 flex items-center text-sm text-gray-700">
              <Star className="w-4 h-4 mr-1 text-yellow-400" />
              Pacote em destaque
            </label>
          </div>

          {/* Botões */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Salvando...' : (packageData ? 'Atualizar' : 'Criar Pacote')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPackageForm;
