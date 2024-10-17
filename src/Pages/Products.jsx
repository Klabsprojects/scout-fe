import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../Context/TranslationContext';
import mediaData from '../MediaData.json';
import { ShoppingCart, Eye, Star, Search, Filter } from 'lucide-react';

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

// Simulated API call function
const fetchProducts = async (searchTerm, sortBy, page) => {
  // Simulate API delay
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
    case 'rating':
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

  const translations = {
    en: {
      title: 'Discover Our Scout Treasures',
      search: 'Search for scout items...',
      sort: 'Sort by',
      popularity: 'Most Popular',
      priceLowToHigh: 'Price: Low to High',
      priceHighToLow: 'Price: High to Low',
      rating: 'Highest Rated',
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
      rating: 'உயர்ந்த மதிப்பீடு',
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
      setProducts(prevProducts => [...prevProducts, ...result.products]);
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
    setProducts([]);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setProducts([]);
    setPage(1);
  };

  const handleAddToCart = (product) => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: mediaData.carouselImages[product.id % mediaData.carouselImages.length],
      quantity: 1
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => item.id === cartItem.id);

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    navigate('/cart');
  };

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 pt-20">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">{t.title}</h1>
        
        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row justify-between mb-6">
          <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
            <input
              type="text"
              placeholder={t.search}
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
          <div className="flex w-full md:w-1/3 space-x-2">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="w-2/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              <option value="popularity">{t.popularity}</option>
              <option value="priceLowToHigh">{t.priceLowToHigh}</option>
              <option value="priceHighToLow">{t.priceHighToLow}</option>
              <option value="rating">{t.rating}</option>
            </select>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-1/3 p-3 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
            >
              <Filter size={20} className="mr-2" />
              {t.filters}
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
            <p>Filter options coming soon...</p>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
              <img
                src={mediaData.carouselImages[index % mediaData.carouselImages.length]}
                alt={product.name[isTamil ? 'ta' : 'en']}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <h2 className="font-bold text-xl mb-2 text-gray-800">{product.name[isTamil ? 'ta' : 'en']}</h2>
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2 text-sm">({product.reviews} {t.reviews})</span>
                </div>
                <p className="text-2xl font-bold mb-4 text-blue-600">₹{product.price.toFixed(2)}</p>
                <div className="flex flex-col space-y-2">
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    <ShoppingCart className="mr-2" size={20} />
                    {t.addToCart}
                  </button>
                  <button 
                    onClick={() => handleViewProduct(product.id)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 flex items-center justify-center transition-colors duration-300 shadow-md hover:shadow-lg"
                  >
                    <Eye size={20} className="mr-2" />
                    {t.viewProduct}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold transition-colors duration-300"
              disabled={loading}
            >
              {loading ? 'Loading...' : t.seeMore}
            </button>
          </div>
        )}

        {/* Error Message */}
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