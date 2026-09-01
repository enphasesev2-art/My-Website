import { ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import type { Product } from '../../types';
import { formatPrice } from '../../utils';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const mainImage = product.images[0] || '/images/placeholder-product.jpg';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      image: mainImage,
      price: product.price,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#EFE7D5] hover:shadow-md transition-shadow group">
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square bg-[#F8F4E8] overflow-hidden">
          <img
            src={mainImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect fill="%23EFE7D5" width="200" height="200"/%3E%3Ctext fill="%232F4A24" font-family="system-ui" font-size="14" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EAyesha Herbal%3C/text%3E%3C/svg%3E';
            }}
          />
          {product.discount > 0 && (
            <span className="absolute top-3 left-3 bg-[#6B4A2D] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-[#253022] text-base hover:text-[#2F4A24] transition-colors leading-snug mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-[#6B4A2D] mb-2 line-clamp-2">{product.shortDescription}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <span className="text-xs text-[#6B4A2D]">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-[#2F4A24]">{formatPrice(product.price)}</span>
          {product.mrp > product.price && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.mrp)}</span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 bg-[#2F4A24] hover:bg-[#253022] text-white text-sm font-semibold py-2.5 px-3 rounded-xl transition-colors"
          >
            <ShoppingCart size={15} />
            {added ? 'Added!' : 'Add to Cart'}
          </button>
          <Link
            to={`/product/${product.slug}`}
            className="flex items-center justify-center px-4 py-2.5 border border-[#2F4A24] text-[#2F4A24] text-sm font-semibold rounded-xl hover:bg-[#F8F4E8] transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
