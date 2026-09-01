import { Mail, MapPin, Phone } from 'lucide-react';

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
import { Link } from 'react-router-dom';
import { businessConfig } from '../../config/business';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2F4A24] text-[#EFE7D5] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-full bg-[#F8F4E8] flex items-center justify-center">
                <span className="text-[#2F4A24] text-xs font-bold">AH</span>
              </div>
              <div>
                <p className="text-white font-bold text-base leading-none">Ayesha Herbal</p>
                <p className="text-[#EFE7D5] text-xs">Powder</p>
              </div>
            </div>
            <p className="text-sm text-[#c8d9b4] leading-relaxed mb-4">
              {businessConfig.tagline}
              <br />
              {businessConfig.secondaryTagline}
            </p>
            {businessConfig.instagram && (
              <a
                href={businessConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#EFE7D5] hover:text-white transition-colors"
              >
                <InstagramIcon size={16} />
                Instagram
              </a>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase text-xs tracking-widest">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'Shop', to: '/shop' },
                { label: 'Ingredients', to: '/ingredients' },
                { label: 'About Us', to: '/about' },
                { label: 'Contact', to: '/contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-[#c8d9b4] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase text-xs tracking-widest">
              Products
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop"
                  className="text-sm text-[#c8d9b4] hover:text-white transition-colors"
                >
                  Herbal Hair Growth Powder
                </Link>
              </li>
            </ul>
            <p className="text-xs text-[#7a9b66] mt-4">
              More products coming soon.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase text-xs tracking-widest">
              Contact Us
            </h3>
            <ul className="space-y-3">
              {businessConfig.phone && (
                <li className="flex items-start gap-2 text-sm text-[#c8d9b4]">
                  <Phone size={14} className="mt-0.5 shrink-0" />
                  {businessConfig.phone}
                </li>
              )}
              {businessConfig.email && (
                <li className="flex items-start gap-2 text-sm text-[#c8d9b4]">
                  <Mail size={14} className="mt-0.5 shrink-0" />
                  <a href={`mailto:${businessConfig.email}`} className="hover:text-white transition-colors">
                    {businessConfig.email}
                  </a>
                </li>
              )}
              {businessConfig.address && (
                <li className="flex items-start gap-2 text-sm text-[#c8d9b4]">
                  <MapPin size={14} className="mt-0.5 shrink-0" />
                  {businessConfig.address}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#3d6030] mt-10 pt-6 text-center text-xs text-[#7a9b66]">
          © {year} Ayesha Herbal Powder. All rights reserved. | Natural Care. Real Results.
        </div>
      </div>
    </footer>
  );
}
