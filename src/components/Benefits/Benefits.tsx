import { Droplets, Leaf, Shield, Sparkles, Sprout } from 'lucide-react';
import type { Benefit } from '../../types';

const iconMap: Record<string, React.ReactNode> = {
  Sprout: <Sprout size={28} />,
  Shield: <Shield size={28} />,
  Sparkles: <Sparkles size={28} />,
  Droplets: <Droplets size={28} />,
  Leaf: <Leaf size={28} />,
};

interface BenefitsProps {
  benefits: Benefit[];
}

export default function Benefits({ benefits }: BenefitsProps) {
  return (
    <section className="py-16 bg-[#F8F4E8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2F4A24] font-serif-heading mb-3">
            Why Choose Ayesha Herbal Powder?
          </h2>
          <p className="text-[#6B4A2D] max-w-xl mx-auto">
            Crafted with traditional herbal wisdom for your natural hair-care journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#EFE7D5] hover:shadow-md transition-shadow text-center"
            >
              <div className="w-16 h-16 rounded-full bg-[#EFE7D5] text-[#2F4A24] flex items-center justify-center mx-auto mb-4">
                {iconMap[benefit.icon] ?? <Leaf size={28} />}
              </div>
              <h3 className="font-bold text-[#253022] text-lg mb-2">{benefit.title}</h3>
              <p className="text-sm text-[#6B4A2D] leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
