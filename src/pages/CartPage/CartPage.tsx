import { ArrowLeft, Package, ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils';
import { businessConfig } from '../../config/business';

export default function CartPage() {
  const { items, subtotal, shipping, total, removeItem, updateQty } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F4E8] flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="w-24 h-24 rounded-full bg-[#EFE7D5] flex items-center justify-center mb-6">
          <ShoppingCart size={40} className="text-[#5B7138]" />
        </div>
        <h2 className="text-2xl font-bold text-[#2F4A24] font-serif-heading mb-2">
          Your cart is empty
        </h2>
        <p className="text-[#6B4A2D] mb-8 max-w-sm">
          Looks like you haven't added any products yet. Explore our natural herbal products!
        </p>
        <Link
          to="/shop"
          className="bg-[#2F4A24] text-white font-semibold px-8 py-3 rounded-full hover:bg-[#253022] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F4E8]">
      {/* Header */}
      <div className="bg-[#2F4A24] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-bold font-serif-heading">Shopping Cart</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm text-[#2F4A24] hover:underline mb-2"
            >
              <ArrowLeft size={15} /> Continue Shopping
            </Link>

            {items.map((item) => {
              const key = item.variantId ? `${item.productId}__${item.variantId}` : item.productId;
              return (
                <div
                  key={key}
                  className="bg-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm border border-[#EFE7D5]"
                >
                  {/* Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F8F4E8] shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"%3E%3Crect fill="%23EFE7D5" width="80" height="80"/%3E%3Ctext fill="%232F4A24" font-size="10" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EAH%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#253022] text-sm leading-snug">{item.name}</h3>
                    {item.variantLabel && (
                      <p className="text-xs text-[#5B7138] mt-0.5">{item.variantLabel}</p>
                    )}
                    <p className="text-[#2F4A24] font-bold mt-1">{formatPrice(item.price)}</p>
                  </div>

                  {/* Quantity */}
                  <QuantitySelector
                    quantity={item.quantity}
                    onIncrease={() => updateQty(item.productId, item.quantity + 1, item.variantId)}
                    onDecrease={() => updateQty(item.productId, item.quantity - 1, item.variantId)}
                    size="sm"
                  />

                  {/* Item total */}
                  <p className="font-bold text-[#253022] min-w-[70px] text-right">
                    {formatPrice(item.price * item.quantity)}
                  </p>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="text-red-400 hover:text-red-600 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-[#EFE7D5] p-6 sticky top-24">
              <h2 className="text-lg font-bold text-[#253022] mb-5 font-serif-heading">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm mb-5">
                <div className="flex justify-between text-[#6B4A2D]">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#6B4A2D]">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                {shipping === 0 && subtotal > 0 && (
                  <p className="text-xs text-[#5B7138]">
                    You qualify for free shipping!
                  </p>
                )}
                {shipping > 0 && (
                  <p className="text-xs text-[#5B7138]">
                    Add {formatPrice(businessConfig.freeShippingThreshold - subtotal)} more for free shipping.
                  </p>
                )}
                <div className="border-t border-[#EFE7D5] pt-3 flex justify-between font-bold text-[#253022] text-base">
                  <span>Total</span>
                  <span className="text-[#2F4A24]">{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full block bg-[#2F4A24] hover:bg-[#253022] text-white font-semibold text-center py-3.5 rounded-xl transition-colors"
              >
                Proceed to Checkout
              </Link>

              <div className="flex items-center gap-2 mt-4 text-xs text-[#6B4A2D]">
                <Package size={14} />
                Secure checkout. Cash on Delivery available.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
