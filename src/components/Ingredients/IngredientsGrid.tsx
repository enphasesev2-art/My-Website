import type { Ingredient } from '../../types';

const ingredientColors: Record<string, string> = {
  amla: '#4a7c2f',
  hibiscus: '#8b3a52',
  fenugreek: '#7c6030',
  bhringraj: '#2f5a3a',
  shikakai: '#5a4a2f',
  neem: '#3a6b2f',
};

interface IngredientsGridProps {
  ingredients: Ingredient[];
}

export default function IngredientsGrid({ ingredients }: IngredientsGridProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-[#5B7138] text-sm font-semibold uppercase tracking-widest mb-2">
            What's Inside
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#2F4A24] font-serif-heading mb-3">
            Our Natural Ingredients
          </h2>
          <p className="text-[#6B4A2D] max-w-xl mx-auto">
            Six powerful herbs — each with a rich traditional history in natural hair and scalp care.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {ingredients.map((ing) => {
            const color = ingredientColors[ing.id] ?? '#2F4A24';
            return (
              <div key={ing.id} className="text-center group">
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-2xl shadow-md overflow-hidden border-2 border-[#EFE7D5]"
                  style={{ background: color }}
                >
                  <img
                    src={ing.image}
                    alt={ing.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.style.display = 'none';
                      (el.parentElement as HTMLElement).textContent =
                        ing.name.charAt(0).toUpperCase();
                    }}
                  />
                </div>
                <h3 className="font-bold text-[#2F4A24] text-sm mb-1">{ing.name}</h3>
                <p className="text-xs text-[#6B4A2D] leading-relaxed hidden sm:block">
                  {ing.description.split('.')[0]}.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
