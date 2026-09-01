import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
import { useState } from 'react';
import { businessConfig } from '../../config/business';

interface ContactForm {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const emptyForm: ContactForm = { name: '', phone: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(emptyForm);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const errs: Partial<ContactForm> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone))
      errs.phone = 'Enter a valid 10-digit mobile number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Enter a valid email';
    if (!form.message.trim()) errs.message = 'Message is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof ContactForm]) {
      setErrors((er) => ({ ...er, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    // In production, send to backend / email service
    setSubmitted(true);
    setForm(emptyForm);
    setTimeout(() => setSubmitted(false), 6000);
  };

  const inputClass = (field: keyof ContactForm) =>
    `w-full border rounded-xl px-4 py-3 text-sm text-[#253022] focus:outline-none focus:ring-2 focus:ring-[#2F4A24] ${
      errors[field] ? 'border-red-400' : 'border-[#5B7138]/30'
    }`;

  const whatsappUrl = `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(
    businessConfig.whatsappDefaultMessage
  )}`;

  return (
    <div className="min-h-screen bg-[#F8F4E8]">
      {/* Header */}
      <div className="bg-[#2F4A24] text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold font-serif-heading mb-3">Contact Us</h1>
          <p className="text-[#c8d9b4] text-lg">
            Have a question? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#2F4A24] font-serif-heading mb-5">
                Get in Touch
              </h2>
              <div className="space-y-4">
                {businessConfig.whatsappNumber && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-[#EFE7D5] hover:shadow-sm transition-shadow group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center shrink-0">
                      <MessageCircle size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#253022] text-sm">WhatsApp</p>
                      <p className="text-xs text-[#6B4A2D] group-hover:text-[#2F4A24] transition-colors">
                        Chat with us directly
                      </p>
                    </div>
                  </a>
                )}

                {businessConfig.phone && (
                  <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-[#EFE7D5]">
                    <div className="w-10 h-10 rounded-full bg-[#EFE7D5] text-[#2F4A24] flex items-center justify-center shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#253022] text-sm">Phone</p>
                      <p className="text-xs text-[#6B4A2D]">{businessConfig.phone}</p>
                    </div>
                  </div>
                )}

                {businessConfig.email && (
                  <a
                    href={`mailto:${businessConfig.email}`}
                    className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-[#EFE7D5] hover:shadow-sm transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#EFE7D5] text-[#2F4A24] flex items-center justify-center shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#253022] text-sm">Email</p>
                      <p className="text-xs text-[#6B4A2D]">{businessConfig.email}</p>
                    </div>
                  </a>
                )}

                {businessConfig.address && (
                  <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-[#EFE7D5]">
                    <div className="w-10 h-10 rounded-full bg-[#EFE7D5] text-[#2F4A24] flex items-center justify-center shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#253022] text-sm">Address</p>
                      <p className="text-xs text-[#6B4A2D]">{businessConfig.address}</p>
                    </div>
                  </div>
                )}

                {businessConfig.instagram && (
                  <a
                    href={businessConfig.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-[#EFE7D5] hover:shadow-sm transition-shadow"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#EFE7D5] text-[#2F4A24] flex items-center justify-center shrink-0">
                      <InstagramIcon size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-[#253022] text-sm">Instagram</p>
                      <p className="text-xs text-[#6B4A2D]">@ayeshaherbal</p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-[#EFE7D5] p-6 sm:p-8">
              <h2 className="text-xl font-bold text-[#2F4A24] font-serif-heading mb-6">
                Send Us a Message
              </h2>

              {submitted && (
                <div className="bg-[#EFE7D5] border border-[#5B7138]/30 text-[#2F4A24] rounded-xl p-4 mb-6 text-sm font-medium">
                  Thank you for your message! We'll get back to you soon.
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#253022] mb-1.5">
                      Your Name *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      className={inputClass('name')}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#253022] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit number"
                      maxLength={10}
                      className={inputClass('phone')}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#253022] mb-1.5">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Optional"
                    className={inputClass('email')}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#253022] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="How can we help you?"
                    className={`${inputClass('message')} resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2F4A24] hover:bg-[#253022] text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
