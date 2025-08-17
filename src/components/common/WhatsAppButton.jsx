import { MessageCircle } from 'lucide-react';
import { useWhatsApp } from '../../hooks/useWhatsApp';

const WhatsAppButton = ({ message, className = "" }) => {
  const { openWhatsApp } = useWhatsApp();

  return (
    <button
      onClick={() => openWhatsApp(message)}
      className={`fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110 z-50 ${className}`}
      aria-label="Chamar no WhatsApp"
    >
      <MessageCircle size={24} />
    </button>
  );
};

export default WhatsAppButton;
