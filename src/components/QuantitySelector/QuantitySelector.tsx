import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = 'md',
}: QuantitySelectorProps) {
  const sizeClasses = {
    sm: { btn: 'w-7 h-7', text: 'text-sm w-8', icon: 14 },
    md: { btn: 'w-9 h-9', text: 'text-base w-10', icon: 16 },
    lg: { btn: 'w-11 h-11', text: 'text-lg w-12', icon: 18 },
  }[size];

  return (
    <div className="inline-flex items-center border border-[#5B7138] rounded-lg overflow-hidden">
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className={`${sizeClasses.btn} flex items-center justify-center bg-[#F8F4E8] hover:bg-[#EFE7D5] disabled:opacity-40 disabled:cursor-not-allowed text-[#2F4A24] transition-colors`}
        aria-label="Decrease quantity"
      >
        <Minus size={sizeClasses.icon} />
      </button>
      <span
        className={`${sizeClasses.text} text-center font-semibold text-[#253022] py-1 select-none`}
      >
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className={`${sizeClasses.btn} flex items-center justify-center bg-[#F8F4E8] hover:bg-[#EFE7D5] disabled:opacity-40 disabled:cursor-not-allowed text-[#2F4A24] transition-colors`}
        aria-label="Increase quantity"
      >
        <Plus size={sizeClasses.icon} />
      </button>
    </div>
  );
}
