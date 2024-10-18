import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../Context/TranslationContext';
import mediaData from '../MediaData.json';
import { ShoppingCart, Eye, Star, Search, Filter, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from './useStore';  // Import the Zustand store

export const dummyProducts = [
  { id: 1, name: { en: 'Scout Shirt for boys', ta: 'சிறுவர்களுக்கான சாரணர் சட்டை' }, price: 599.99, rating: 4.5, reviews: 120, inStock: true },
  { id: 2, name: { en: 'Cap badge', ta: 'தொப்பி பேட்ஜ்' }, price: 1299.99, rating: 4.8, reviews: 250, inStock: true },
  { id: 3, name: { en: 'Accessories Cap', ta: 'துணைக்கருவிகள் தொப்பி' }, price: 129.99, rating: 4.2, reviews: 180, inStock: true },
  { id: 4, name: { en: 'Guide Uniform Accessories', ta: 'வழிகாட்டி சீருடை பாகங்கள்' }, price: 199.99, rating: 4.0, reviews: 150, inStock: true },
  { id: 5, name: { en: 'Scarf and Woggle set', ta: 'தாவணி மற்றும் தள்ளாடும் தொகுப்பு' }, price: 449.99, rating: 4.6, reviews: 200, inStock: true },
  { id: 6, name: { en: 'Girls Guide Uniform', ta: 'பெண்கள் வழிகாட்டி சீருடை' }, price: 399.99, rating: 4.7, reviews: 300, inStock: true },
  { id: 7, name: { en: 'Scout Trousers', ta: 'சாரணர் கால்சட்டை' }, price: 79.99, rating: 4.1, reviews: 90, inStock: true },
  { id: 8, name: { en: 'Scout and Guide belt', ta: 'சாரணர் மற்றும் வழிகாட்டி பெல்ட்' }, price: 89.99, rating: 4.3, reviews: 110, inStock: true },
  { id: 9, name: { en: 'Scout Uniform', ta: 'சாரணர் சீருடை' }, price: 349.99, rating: 4.4, reviews: 160, inStock: true },
  { id: 10, name: { en: 'Guide Batch', ta: 'வழிகாட்டி தொகுதி' }, price: 199.99, rating: 4.2, reviews: 140, inStock: true },
];

const fetchProducts = async (searchTerm, sortBy, page) => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredProducts = [...dummyProducts];
  
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(product => 
      product.name.en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.name.ta.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  switch (sortBy) {
    case 'priceLowToHigh':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'priceHighToLow':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'topRated':
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 'popularity':
    default:
      filteredProducts.sort((a, b) => b.reviews - a.reviews);
      break;
  }

  const startIndex = (page - 1) * 12;
  const endIndex = startIndex + 12;
  return {
    products: filteredProducts.slice(startIndex, endIndex),
    hasMore: endIndex < filteredProducts.length
  };
};

const ProductCard = ({ product, onAddToCart, onToggleWishlist, onViewProduct, isTamil }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden relative flex flex-col transition-all duration-300 hover:shadow-xl"
      whileHover={{ y: -5 }}
    >
      <div className="relative w-full h-64">
        <img src={mediaData.carouselImages[product.id % mediaData.carouselImages.length]} alt={product.name[isTamil ? 'ta' : 'en']} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 opacity-0 hover:opacity-100 flex items-center justify-center">
          <button
            className="bg-white text-gray-800 rounded-full p-2 m-2 hover:bg-gray-100 transition-colors duration-300"
            onClick={() => onToggleWishlist(product.id)}
          >
            <Heart className={`h-5 w-5 ${product.isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
          </button>
        </div>
      </div>
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-semibold text-[#1A2E44] mb-1 line-clamp-1">{product.name[isTamil ? 'ta' : 'en']}</h3>
          <div className="flex items-center mb-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="ml-2 text-sm text-[#4A6FA5]">({product.reviews})</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-xl font-bold text-[#1A2E44]">₹{product.price.toFixed(2)}</span>
          <button
            className="bg-[#5f81e0] text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-[#C86D54] transition duration-300 flex items-center justify-center"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </button>
          <button
            className="bg-gray-200 text-[#1A2E44] py-2 px-4 rounded-full text-sm font-medium hover:bg-gray-300 transition duration-300 flex items-center justify-center"
            onClick={() => onViewProduct(product.id)}
          >
            <Eye className="mr-2 h-4 w-4" />
            View Product
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Products = () => {
  const { isTamil } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState('popularity');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Use Zustand store
  const addToCart = useStore(state => state.addToCart);

  const translations = {
    en: {
      title: 'Discover Our Scout Treasures',
      search: 'Search for scout items...',
      sort: 'Sort by',
      popularity: 'Most Popular',
      priceLowToHigh: 'Price: Low to High',
      priceHighToLow: 'Price: High to Low',
      topRated: 'Top Rated',
      addToCart: 'Add to Cart',
      seeMore: 'Explore More',
      reviews: 'reviews',
      viewProduct: 'Quick View',
      filters: 'Filters',
      close: 'Close',
    },
    ta: {
      title: 'எங்கள் சாரணர் பொக்கிஷங்களைக் கண்டறியுங்கள்',
      search: 'சாரணர் பொருட்களைத் தேடுங்கள்...',
      sort: 'வகைப்படுத்து',
      popularity: 'மிக பிரபலமானவை',
      priceLowToHigh: 'விலை: குறைவிலிருந்து அதிகம்',
      priceHighToLow: 'விலை: அதிகத்திலிருந்து குறைவு',
      topRated: 'உயர்ந்த மதிப்பீடு',
      addToCart: 'கூடையில் சேர்',
      seeMore: 'மேலும் கண்டறிய',
      reviews: 'விமர்சனங்கள்',
      viewProduct: 'விரைவில் காண்க',
      filters: 'வடிகட்டிகள்',
      close: 'மூடு',
    }
  };

  const t = translations[isTamil ? 'ta' : 'en'];

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchProducts(searchTerm, sortBy, page);
      setProducts(prevProducts => page === 1 ? result.products : [...prevProducts, ...result.products]);
      setHasMore(result.hasMore);
    } catch (err) {
      setError('Failed to load products. Please try again.');
    }
    setLoading(false);
  }, [searchTerm, sortBy, page]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(1);
  };

  useEffect(() => {
    // Reset products and load new ones when search or sort changes
    setProducts([]);
    loadProducts();
  }, [searchTerm, sortBy]);

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: mediaData.carouselImages[product.id % mediaData.carouselImages.length],
      quantity: 1
    };
    addToCart(cartItem);
    navigate('/cart');
  };

  const handleToggleWishlist = (productId) => {
    setProducts(prevProducts => prevProducts.map(product => 
      product.id === productId ? { ...product, isWishlisted: !product.isWishlisted } : product
    ));
  };

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-4xl font-bold text-[#1A2E44] mb-8 text-center pt-36"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t.title}
        </motion.h2>
        
        <motion.div 
          className="bg-white p-4 rounded-xl shadow-md mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                className="bg-[#5f81e0] text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-[#C86D54] transition duration-300 flex items-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="mr-2 h-4 w-4" />
                {t.filters}
              </button>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t.search}
                  className="bg-gray-100 border-none text-[#1A2E44] rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] w-64"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Search className="h-5 w-5 text-[#4A6FA5] absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select 
                className="bg-gray-100 border-none text-[#1A2E44] rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="popularity">{t.popularity}</option>
                <option value="priceLowToHigh">{t.priceLowToHigh}</option>
                <option value="priceHighToLow">{t.priceHighToLow}</option>
                <option value="topRated">{t.topRated}</option>
              </select>
            </div>
          </div>

          {showFilters && (
            <motion.div 
              className="mt-4 flex flex-wrap gap-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Add filter options here if needed */}
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          {loading && products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-xl text-[#4A6FA5] mt-12"
            >
              Loading...
            </motion.div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProductCard 
                    product={product} 
                    onAddToCart={handleAddToCart} 
                    onToggleWishlist={handleToggleWishlist}
                    onViewProduct={handleViewProduct}
                    isTamil={isTamil}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {products.length === 0 && !loading && (
          <motion.p
            className="text-center text-xl text-[#4A6FA5] mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No products found. Try adjusting your search or filters.
          </motion.p>
        )}

        {hasMore && products.length > 0 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 rounded-full bg-[#E07A5F] text-white text-lg font-semibold hover:bg-[#C86D54] transition-colors duration-300"
              disabled={loading}
            >
              {loading ? 'Loading...' : t.seeMore}
            </button>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center mt-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;