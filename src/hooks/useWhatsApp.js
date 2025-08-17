import { CONTACT_INFO } from '../utils/constants';

export const useWhatsApp = () => {
  const openWhatsApp = (message = "Olá! Gostaria de saber mais sobre os pacotes de viagem.") => {
    const url = `${CONTACT_INFO.WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const formatWhatsAppMessage = (packageName, customerName = '') => {
    const baseMessage = `Olá! Tenho interesse no pacote "${packageName}".`;
    const nameMessage = customerName ? ` Meu nome é ${customerName}.` : '';
    const detailsMessage = ` Poderia me enviar mais detalhes sobre valores, datas e condições?`;
    
    return baseMessage + nameMessage + detailsMessage;
  };

  return { openWhatsApp, formatWhatsAppMessage };
};

export const generateMetaTags = (title, description, image, url) => {
  return {
    title: `${title} | STL Turismo`,
    description,
    keywords: 'turismo, viagem, pacotes, alto uruguai, rs, gramado, foz iguaçu, florianópolis',
    ogTitle: `${title} | STL Turismo`,
    ogDescription: description,
    ogImage: image,
    ogUrl: url,
    twitterCard: 'summary_large_image'
  };
};