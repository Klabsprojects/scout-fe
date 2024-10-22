import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../Context/TranslationContext';
import { ShoppingCart, Eye, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from './useStore';
import api from '../apiConfig/api';

const ProductCard = ({ product, onAddToCart, onViewProduct, isTamil }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!product) {
    console.warn('ProductCard received undefined product');
    return null;
  }

  const {
    id = '',
    name = 'Unnamed Product',
    description = 'No description available',
    category = 'Uncategorized',
    quantity = 0,
    price = 0,
    filepath = ''
  } = product;

  const getImageSrc = (filepath) => {
    if (!filepath) return '/api/placeholder/400/320';
    
    const cleanPath = filepath.replace(/^uploads\\/, '').replace(/\\/g, '/');
    return `http://localhost:4010/uploads/${cleanPath}`;
  };

  const imageSrc = getImageSrc(filepath);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden relative flex flex-col transition-all duration-300 hover:shadow-xl"
      whileHover={{ y: -5 }}
    >
      <div className="relative w-full h-48 sm:h-64 bg-gray-200">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse bg-gray-300 w-full h-full"></div>
          </div>
        )}
        <img
          src={imageSrc}
          alt={name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">Image not available</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-[#1A2E44] mb-1 line-clamp-2">
            {name}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <p className="text-sm text-gray-600 mb-2">Category: {category}</p>
          <p className="text-sm text-gray-600 mb-2">Quantity: {quantity}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-lg sm:text-xl font-bold text-[#1A2E44]">
            ₹{Number(price).toFixed(2)}
          </span>
          <button
            className="bg-[#5f81e0] text-white py-2 px-4 rounded-full text-xs sm:text-sm font-medium hover:bg-[#C86D54] transition duration-300 flex items-center justify-center"
            onClick={() => onAddToCart({ id, name, price, quantity: 1 })}
          >
            <ShoppingCart className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Add to Cart
          </button>
          <button
            className="bg-gray-200 text-[#1A2E44] py-2 px-4 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-300 transition duration-300 flex items-center justify-center"
            onClick={() => onViewProduct(id)}
          >
            <Eye className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
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
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const addToCart = useStore(state => state.addToCart);

  const translations = {
    en: {
      title: 'Our Products',
      search: 'Search products...',
      filters: 'Filters',
      noProducts: 'No products found. Try adjusting your search or filters.',
      loading: 'Loading...',
      error: 'Failed to load products. Please try again.',
    },
    ta: {
      title: 'எங்கள் பொருட்கள்',
      search: 'பொருட்களைத் தேடுங்கள்...',
      filters: 'வடிகட்டிகள்',
      noProducts: 'பொருட்கள் எதுவும் கிடைக்கவில்லை. உங்கள் தேடலை மாற்றி முயற்சிக்கவும்.',
      loading: 'ஏற்றுகிறது...',
      error: 'பொருட்களை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
    }
  };

  const t = translations[isTamil ? 'ta' : 'en'];

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('api/listProduct');
      let productsData = response.data;
  
      console.log('Products data after extraction:', productsData);
  
      if (productsData && typeof productsData === 'object' && Array.isArray(productsData.results)) {
        productsData = productsData.results;
      } else if (!Array.isArray(productsData)) {
        console.error('Unexpected data structure:', productsData);
        setError('Received unexpected data structure from API');
        setProducts([]);
        return;
      }
  
      const processedProducts = productsData.map(product => ({
        id: product?.id || '',
        name: product?.name || 'Unnamed Product',
        description: product?.description || 'No description available',
        category: product?.category || 'Uncategorized',
        quantity: Number(product?.quantity) || 0,
        price: Number(product?.price) || 0,
        filepath: product?.filepath || '',
        createdAt: product?.createdAt,
        updatedAt: product?.updatedAt
      })).filter(product => product.id);
  
      console.log('Processed products data:');
      console.table(processedProducts);
  
      setProducts(processedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  }, [t.error]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddToCart = (product) => {
    console.log('Adding to cart:', product);
    addToCart(product);
    navigate('/cart');
  };

  const handleViewProduct = (productId) => {
    console.log('Viewing product:', productId);
    navigate(`/product-description?id=${productId}`); // Updated route with query parameter
  };
  
  return (
    <div className="bg-gray-50 min-h-screen pb-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A2E44] mb-8 text-center pt-24 sm:pt-36"
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                className="bg-[#5f81e0] text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-[#C86D54] transition duration-300 flex items-center w-full sm:w-auto justify-center sm:justify-start"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="mr-2 h-4 w-4" />
                {t.filters}
              </button>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder={t.search}
                  className="bg-gray-100 border-none text-[#1A2E44] rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] w-full"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Search className="h-5 w-5 text-[#4A6FA5] absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-xl text-[#4A6FA5] mt-12"
            >
              {t.loading}
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onViewProduct={handleViewProduct}
                  isTamil={isTamil}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProducts.length === 0 && !loading && (
          <motion.p
            className="text-center text-lg sm:text-xl text-[#4A6FA5] mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {t.noProducts}
          </motion.p>
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