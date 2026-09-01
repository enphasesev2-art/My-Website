import { CheckCircle, Heart, ShoppingCart, Star, Truck } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import HowToUse from '../../components/HowToUse/HowToUse';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';
import { useCart } from '../../context/CartContext';
import { getProductBySlug } from '../../data/products';
import { formatPrice } from '../../utils';

type Tab = 'description' | 'ingredients' | 'benefits' | 'howToUse' | 'faq';

const tabs: { id: Tab; label: string }[] = [
  { id: 'description', label: 'Description' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'benefits', label: 'Benefits' },
  { id: 'howToUse', label: 'How to Use' },
  { id: 'faq', label: 'FAQ' },
];

const ingredientColors: Record<string, string> = {
  amla: '#4a7c2f', hibiscus: '#8b3a52', fenugreek: '#7c6030',
  bhringraj: '#2f5a3a', shikakai: '#5a4a2f', neem: '#3a6b2f',
};

export default function Product() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug ?? '');
  const { addItem } = useCart();
  const navigate = useNavigate();

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeVariant, setActiveVariant] = useState(product?.variants[0]);
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-20">
        <h2 className="text-2xl font-bold text-[#2F4A24] mb-4">Product not found</h2>
        <Link to="/shop" className="bg-[#2F4A24] text-white px-6 py-3 rounded-full font-semibold">
          Browse Shop
        </Link>
      </div>
    );
  }

  const price = activeVariant?.price ?? product.price;
  const mrp = activeVariant?.mrp ?? product.mrp;
  const discountPct = mrp > price ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variantId: activeVariant?.id,
      name: product.name,
      image: product.images[0] ?? '',
      price,
      quantity,
      variantLabel: activeVariant?.label,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleBuyNow = () => {
    addItem({
      productId: product.id,
      variantId: activeVariant?.id,
      name: product.name,
      image: product.images[0] ?? '',
      price,
      quantity,
      variantLabel: activeVariant?.label,
    });
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-[#F8F4E8]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#EFE7D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-[#6B4A2D]">
          <Link to="/" className="hover:text-[#2F4A24]">Home</Link>
          {' / '}
          <Link to="/shop" className="hover:text-[#2F4A24]">Shop</Link>
          {' / '}
          <span className="text-[#253022] font-medium">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* ── Left: Gallery ──────────────────────────────────────────── */}
          <div>
            {/* Main image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#EFE7D5] aspect-square mb-4">
              <img
                src={product.images[activeImage] ?? ''}
                alt={product.name}
                className="w-full h-full object-contain p-4"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23EFE7D5" width="400" height="400"/%3E%3Ctext fill="%232F4A24" font-family="Georgia,serif" font-size="20" font-weight="bold" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EAyesha Herbal%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors bg-white ${
                      activeImage === i ? 'border-[#2F4A24]' : 'border-[#EFE7D5]'
                    }`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Details ─────────────────────────────────────────── */}
          <div>
            <p className="text-sm text-[#5B7138] font-semibold mb-1">{product.brand}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#253022] font-serif-heading leading-snug mb-1">
              {product.name}
            </h1>
            <p className="text-[#6B4A2D] text-sm mb-4">{product.shortDescription}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="text-sm text-[#6B4A2D]">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-bold text-[#2F4A24]">{formatPrice(price)}</span>
              {mrp > price && (
                <>
                  <span className="text-lg text-gray-400 line-through">{formatPrice(mrp)}</span>
                  <span className="bg-[#6B4A2D] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {discountPct}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Stock */}
            <p className="text-sm text-[#5B7138] font-medium mb-5">
              <CheckCircle size={14} className="inline mr-1" />
              In Stock
            </p>

            {/* Variants */}
            {product.variants.length > 0 && (
              <div className="mb-5">
                <p className="text-sm font-semibold text-[#253022] mb-2">Pack Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setActiveVariant(v)}
                      className={`px-4 py-2 rounded-xl border-2 text-sm font-semibold transition-colors ${
                        activeVariant?.id === v.id
                          ? 'border-[#2F4A24] bg-[#2F4A24] text-white'
                          : 'border-[#5B7138]/30 text-[#253022] hover:border-[#2F4A24]'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <p className="text-sm font-semibold text-[#253022]">Quantity</p>
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity((q) => q + 1)}
                onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                size="lg"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-[#2F4A24] hover:bg-[#253022] text-white font-semibold py-3.5 px-6 rounded-xl transition-colors"
              >
                <ShoppingCart size={18} />
                {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-[#6B4A2D] hover:bg-[#5a3d26] text-white font-semibold py-3.5 px-6 rounded-xl transition-colors"
              >
                Buy Now
              </button>
              <button className="p-3.5 border-2 border-[#EFE7D5] rounded-xl hover:border-[#2F4A24] text-[#2F4A24] transition-colors" aria-label="Add to wishlist">
                <Heart size={18} />
              </button>
            </div>

            {/* Shipping Info */}
            <div className="bg-[#EFE7D5] rounded-xl p-4 flex items-start gap-3">
              <Truck size={18} className="text-[#2F4A24] shrink-0 mt-0.5" />
              <p className="text-sm text-[#6B4A2D]">
                Free shipping on orders above ₹499. Cash on Delivery available.
              </p>
            </div>
          </div>
        </div>

        {/* ── Tabs ───────────────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#EFE7D5] overflow-hidden mb-12">
          {/* Tab Headers */}
          <div className="flex overflow-x-auto border-b border-[#EFE7D5]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-4 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'border-[#2F4A24] text-[#2F4A24]'
                    : 'border-transparent text-[#6B4A2D] hover:text-[#2F4A24]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none text-[#253022]">
                {product.description.split('\n\n').map((para, i) => (
                  <p key={i} className="mb-4 leading-relaxed text-[#6B4A2D]">
                    {para}
                  </p>
                ))}
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {product.ingredients.map((ing) => (
                  <div key={ing.id} className="flex items-start gap-4 p-4 bg-[#F8F4E8] rounded-xl">
                    <div
                      className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-sm overflow-hidden"
                      style={{ background: ingredientColors[ing.id] ?? '#2F4A24' }}
                    >
                      <img
                        src={ing.image}
                        alt={ing.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const el = e.target as HTMLImageElement;
                          el.style.display = 'none';
                          (el.parentElement as HTMLElement).textContent = ing.name.charAt(0);
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#2F4A24] text-sm mb-1">{ing.name}</h4>
                      <p className="text-xs text-[#6B4A2D] leading-relaxed">{ing.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'benefits' && (
              <ul className="space-y-4">
                {product.benefits.map((b) => (
                  <li key={b.id} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-[#2F4A24] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#253022]">{b.title}</p>
                      <p className="text-sm text-[#6B4A2D]">{b.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'howToUse' && (
              <div className="space-y-6">
                {product.howToUse.map((step) => (
                  <div key={step.step} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#2F4A24] text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <p className="font-semibold text-[#253022] mb-0.5">{step.title}</p>
                      <p className="text-sm text-[#6B4A2D] leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
                <div className="bg-[#EFE7D5] rounded-xl p-4 mt-4">
                  <p className="text-sm font-semibold text-[#253022] mb-1">Patch Test Reminder</p>
                  <p className="text-sm text-[#6B4A2D]">
                    Always perform a patch test on a small skin area before full application.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-5">
                {[
                  {
                    q: 'Is this product suitable for all hair types?',
                    a: 'Ayesha Herbal Powder is made from natural herbal ingredients. Please review the ingredients list and consult with a qualified professional if you have concerns about your specific hair type or scalp condition.',
                  },
                  {
                    q: 'How often should I use this powder?',
                    a: 'Refer to the product packaging for recommended usage frequency. Usage may vary based on individual needs.',
                  },
                  {
                    q: 'Are there any side effects?',
                    a: 'This product is made from natural herbal ingredients. However, perform a patch test before first use. Discontinue use if irritation occurs and consult a medical professional if needed.',
                  },
                  {
                    q: 'What is your return policy?',
                    a: 'Please contact us via WhatsApp or email for return and exchange queries. We aim to resolve all concerns promptly.',
                  },
                ].map((faq, i) => (
                  <div key={i} className="border-b border-[#EFE7D5] pb-5 last:border-0">
                    <p className="font-semibold text-[#253022] mb-1">{faq.q}</p>
                    <p className="text-sm text-[#6B4A2D] leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* How to Use section */}
      <HowToUse steps={product.howToUse} />
    </div>
  );
}
