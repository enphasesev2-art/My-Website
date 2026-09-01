import { products } from '../../data/products';

const ingredientColors: Record<string, string> = {
  amla: '#4a7c2f', hibiscus: '#8b3a52', fenugreek: '#7c6030',
  bhringraj: '#2f5a3a', shikakai: '#5a4a2f', neem: '#3a6b2f',
};

export default function IngredientsPage() {
  const ingredients = products[0]?.ingredients ?? [];

  return (
    <div className="min-h-screen bg-[#F8F4E8]">
      {/* Header */}
      <div className="bg-[#2F4A24] text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-[#c8d9b4] text-sm font-semibold uppercase tracking-widest mb-3">
            What's Inside
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold font-serif-heading mb-4">
            Our Natural Ingredients
          </h1>
          <p className="text-[#c8d9b4] text-lg leading-relaxed">
            Six powerful herbs — each with a rich traditional history in natural hair and scalp
            care. Carefully selected, ethically sourced, and lovingly blended.
          </p>
        </div>
      </div>

      {/* Ingredients Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ingredients.map((ing, i) => {
            const color = ingredientColors[ing.id] ?? '#2F4A24';
            return (
              <div
                key={ing.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#EFE7D5] hover:shadow-md transition-shadow"
              >
                {/* Color band */}
                <div
                  className="h-32 flex items-center justify-center"
                  style={{ background: color }}
                >
                  <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border-4 border-white/40">
                    <img
                      src={ing.image}
                      alt={ing.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const el = e.target as HTMLImageElement;
                        el.style.display = 'none';
                        (el.parentElement as HTMLElement).innerHTML = `<span class="text-white text-4xl font-bold">${ing.name.charAt(0)}</span>`;
                      }}
                    />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold"
                      style={{ background: color }}
                    >
                      {i + 1}
                    </span>
                    <h3 className="font-bold text-[#253022] text-lg">{ing.name}</h3>
                  </div>
                  <p className="text-[#6B4A2D] text-sm leading-relaxed">{ing.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-[#EFE7D5] py-12 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#2F4A24] font-serif-heading mb-3">
            100% Natural. Zero Harsh Chemicals.
          </h2>
          <p className="text-[#6B4A2D]">
            Every ingredient in Ayesha Herbal Powder is carefully chosen for its traditional role
            in hair and scalp care. No sulfates, parabens, or synthetic additives.
          </p>
        </div>
      </div>
    </div>
  );
}
