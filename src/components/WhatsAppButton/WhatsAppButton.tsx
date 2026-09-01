import { MessageCircle } from 'lucide-react';
import { businessConfig } from '../../config/business';

export default function WhatsAppButton() {
  const url = `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(
    businessConfig.whatsappDefaultMessage
  )}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BD5C] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} fill="white" />
    </a>
  );
}
