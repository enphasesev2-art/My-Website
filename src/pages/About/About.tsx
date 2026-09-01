import { Heart, Leaf, Shield, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';

const values = [
  {
    icon: <Leaf size={24} />,
    title: 'Natural First',
    description:
      'Every ingredient is selected for its traditional role in natural hair and scalp care. We believe nature provides the best.',
  },
  {
    icon: <Shield size={24} />,
    title: 'Chemical Free',
    description:
      'No sulfates, parabens, or harsh synthetics. Just pure herbal ingredients, carefully blended.',
  },
  {
    icon: <Sprout size={24} />,
    title: 'Traditional Wisdom',
    description:
      'Rooted in centuries of Ayurvedic and traditional herbal knowledge, passed down through generations.',
  },
  {
    icon: <Heart size={24} />,
    title: 'Made with Care',
    description:
      'Each batch is prepared with attention to quality, ensuring you receive a consistent, trustworthy product.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#F8F4E8]">
      {/* Hero */}
      <div className="bg-[#2F4A24] text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-8 w-32 h-32 rounded-full border-4 border-white" />
          <div className="absolute bottom-4 right-8 w-24 h-24 rounded-full border-4 border-white" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4">
          <p className="text-[#c8d9b4] text-sm font-semibold uppercase tracking-widest mb-3">
            Our Story
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif-heading mb-5">
            About Ayesha Herbal Powder
          </h1>
          <p className="text-[#c8d9b4] text-lg leading-relaxed max-w-xl mx-auto">
            A brand built on the simple belief that the best hair care comes from nature — through
            carefully selected traditional herbs with time-tested reputations.
          </p>
        </div>
      </div>

      {/* Brand Story */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-[#EFE7D5] p-8 sm:p-12 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2F4A24] font-serif-heading mb-6">
            Our Philosophy
          </h2>
          <div className="space-y-5 text-[#6B4A2D] leading-relaxed">
            <p>
              Ayesha Herbal Powder was born from a deep appreciation of traditional herbal
              knowledge and a desire to make that wisdom accessible to everyone. We believe that
              some of the most effective hair-care solutions have been with us for centuries — in
              the form of natural herbs used across generations.
            </p>
            <p>
              Our flagship product, the <strong className="text-[#253022]">Ayesha Herbal Hair Growth Powder</strong>,
              brings together six powerful herbs — Amla, Hibiscus, Fenugreek, Bhringraj, Shikakai,
              and Neem — each well-known in traditional hair and scalp care practices.
            </p>
            <p>
              We are committed to keeping our formulations simple, clean, and free from harsh
              chemicals. No sulfates. No parabens. No synthetic additives. Just pure, herbal
              ingredients working in harmony as nature intended.
            </p>
            <p>
              Whether you are looking to nourish your scalp, support healthy-looking hair, or
              simply return to a more natural hair-care routine, Ayesha Herbal Powder is crafted
              with your journey in mind.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-[#2F4A24] font-serif-heading text-center mb-8">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((val) => (
              <div
                key={val.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#EFE7D5] flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-[#EFE7D5] text-[#2F4A24] flex items-center justify-center shrink-0">
                  {val.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[#253022] mb-1">{val.title}</h3>
                  <p className="text-sm text-[#6B4A2D] leading-relaxed">{val.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#2F4A24] rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold font-serif-heading mb-3">
            Try Ayesha Herbal Powder Today
          </h2>
          <p className="text-[#c8d9b4] mb-6">
            Experience the goodness of traditional herbal ingredients for natural hair and scalp
            care.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-[#F8F4E8] text-[#2F4A24] hover:bg-white font-bold px-8 py-3 rounded-full transition-colors"
            >
              Shop Now
            </Link>
            <Link
              to="/ingredients"
              className="border-2 border-[#c8d9b4] text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-full transition-colors"
            >
              Our Ingredients
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
