import { ArrowRight, CheckCircle, FlaskConical, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Benefits from '../../components/Benefits/Benefits';
import HowToUse from '../../components/HowToUse/HowToUse';
import IngredientsGrid from '../../components/Ingredients/IngredientsGrid';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data/products';

const trustItems = [
  { icon: <Leaf size={20} />, label: '100% Natural' },
  { icon: <ShieldCheck size={20} />, label: 'Chemical Free' },
  { icon: <FlaskConical size={20} />, label: 'Herbal Care' },
  { icon: <Sparkles size={20} />, label: 'For Hair & Scalp' },
];

export default function Home() {
  const featuredProduct = products[0];

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#F8F4E8] via-[#EFE7D5] to-[#e6dcc6] overflow-hidden min-h-[88vh] flex items-center">
        {/* Decorative botanical blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-[#2F4A24]/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-[#5B7138]/10 translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <p className="text-[#5B7138] text-sm font-semibold uppercase tracking-widest mb-4">
                Ayesha Herbal Powder
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#253022] leading-tight mb-6 font-serif-heading">
                Nourish Your Roots.{' '}
                <span className="text-[#2F4A24]">Strengthen Your Hair.</span>{' '}
                Naturally.
              </h1>
              <p className="text-lg text-[#6B4A2D] leading-relaxed mb-8 max-w-lg">
                Ayesha Herbal Powder is a carefully selected blend of traditional herbal ingredients
                designed to support healthy-looking hair and scalp care.
              </p>
              <ul className="space-y-2 mb-8">
                {['Supports healthy-looking hair', 'Nourishes the scalp naturally', '100% herbal — no harsh chemicals'].map(
                  (point) => (
                    <li key={point} className="flex items-center gap-2 text-[#253022] text-sm">
                      <CheckCircle size={16} className="text-[#2F4A24] shrink-0" />
                      {point}
                    </li>
                  )
                )}
              </ul>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="bg-[#2F4A24] hover:bg-[#253022] text-white font-semibold px-8 py-3 rounded-full transition-colors flex items-center gap-2 shadow-md"
                >
                  Shop Now <ArrowRight size={18} />
                </Link>
                <Link
                  to="/ingredients"
                  className="border-2 border-[#2F4A24] text-[#2F4A24] hover:bg-[#2F4A24] hover:text-white font-semibold px-8 py-3 rounded-full transition-colors"
                >
                  Explore Ingredients
                </Link>
              </div>
            </div>

            {/* Product Image */}
            <div className="flex justify-center lg:justify-end relative">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96">
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full bg-[#2F4A24]/10 scale-110" />
                <div className="absolute inset-0 rounded-full bg-[#5B7138]/8 scale-125" />
                <img
                  src={featuredProduct.images[0] || '/images/ayesha-product-1.jpg'}
                  alt="Ayesha Herbal Hair Growth Powder"
                  className="relative z-10 w-full h-full object-contain drop-shadow-xl"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.src =
                      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23EFE7D5" width="400" height="400" rx="200"/%3E%3Ctext fill="%232F4A24" font-family="Georgia,serif" font-size="22" font-weight="bold" x="50%25" y="45%25" text-anchor="middle" dominant-baseline="middle"%3EAyesha Herbal%3C/text%3E%3Ctext fill="%235B7138" font-family="Georgia,serif" font-size="16" x="50%25" y="58%25" text-anchor="middle" dominant-baseline="middle"%3EHair Growth Powder%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ─────────────────────────────────────────────────── */}
      <section className="bg-[#2F4A24] text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {trustItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-sm font-medium">
                <span className="text-[#c8d9b4]">{item.icon}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Product ──────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#5B7138] text-sm font-semibold uppercase tracking-widest mb-2">
              Our Product
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2F4A24] font-serif-heading">
              Featured Product
            </h2>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <ProductCard product={featuredProduct} />
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-[#2F4A24] font-semibold hover:underline"
            >
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Ingredients ───────────────────────────────────────────────── */}
      <IngredientsGrid ingredients={featuredProduct.ingredients} />

      {/* ── Benefits ──────────────────────────────────────────────────── */}
      <Benefits benefits={featuredProduct.benefits} />

      {/* ── How To Use ────────────────────────────────────────────────── */}
      <HowToUse steps={featuredProduct.howToUse} />

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#253022] text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold font-serif-heading mb-4">
            Start Your Natural Hair Journey Today
          </h2>
          <p className="text-[#c8d9b4] mb-8 text-lg">
            Join customers who trust Ayesha Herbal Powder for natural hair and scalp care.
          </p>
          <Link
            to="/shop"
            className="bg-[#F8F4E8] text-[#2F4A24] hover:bg-white font-bold px-10 py-4 rounded-full text-lg transition-colors shadow-lg inline-block"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </>
  );
}
