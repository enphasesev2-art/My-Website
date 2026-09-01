import { Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products, searchProducts } from '../../data/products';

const categories = ['All', 'Hair Growth', 'Hair Care', 'Scalp Care', 'Herbal Powder'];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') ?? '');
  const [activeCategory, setActiveCategory] = useState('All');

  const urlQuery = searchParams.get('q') ?? '';
  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  const filtered = (() => {
    let result = query ? searchProducts(query) : products;
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }
    return result;
  })();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setQuery('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-[#F8F4E8]">
      {/* Header */}
      <div className="bg-[#2F4A24] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold font-serif-heading mb-2">Our Products</h1>
          <p className="text-[#c8d9b4]">Natural herbal formulations for hair and scalp care</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Search + Filter bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <form onSubmit={handleSearchSubmit} className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5B7138]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, ingredients..."
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-[#5B7138]/30 bg-white text-[#253022] focus:outline-none focus:ring-2 focus:ring-[#2F4A24] placeholder:text-[#9aad8a]"
            />
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B7138] hover:text-[#2F4A24]"
              >
                <X size={16} />
              </button>
            )}
          </form>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? 'bg-[#2F4A24] text-white'
                  : 'bg-white text-[#2F4A24] border border-[#5B7138]/30 hover:bg-[#EFE7D5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        {(query || activeCategory !== 'All') && (
          <p className="text-sm text-[#6B4A2D] mb-6">
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
            {query && (
              <>
                {' '}for "{query}"
                <button onClick={clearSearch} className="ml-2 text-[#2F4A24] underline text-sm">
                  Clear
                </button>
              </>
            )}
          </p>
        )}

        {/* Product Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl font-bold text-[#2F4A24] mb-2">No products found</p>
            <p className="text-[#6B4A2D] mb-6">Try a different search term or category.</p>
            <button
              onClick={clearSearch}
              className="bg-[#2F4A24] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#253022] transition-colors"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
