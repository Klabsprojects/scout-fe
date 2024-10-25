import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../Context/TranslationContext';
import { ShoppingCart, Eye, Search, Filter, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../apiConfig/api';
import { toast } from 'react-toastify';
import { useAuthStore } from '../Zustand/authStore';

// Cart Store
const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      cartWithProducts: [],
      setCartItems: (items) => set({ cartItems: items }),
      setCartWithProducts: (products) => set({ cartWithProducts: products }),
      addToCart: (product, quantity = 1) => set((state) => {
        const existingItem = state.cartItems.find(item => item.id === product.id);
        if (existingItem) {
          return {
            cartItems: state.cartItems.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          };
        }
        return { 
          cartItems: [...state.cartItems, { ...product, quantity }] 
        };
      }),
      removeFromCart: (productId) => set((state) => ({
        cartItems: state.cartItems.filter(item => item.id !== productId)
      })),
      updateQuantity: (productId, newQuantity) => set((state) => ({
        cartItems: state.cartItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      })),
      clearCart: () => set({ cartItems: [], cartWithProducts: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);

const ProductCard = ({ product, onAddToCart, onViewProduct, isTamil }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { token } = useAuthStore();

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
    const cleanPath = filepath.toString().replace(/^uploads\\/, '').replace(/\\/g, '/');
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

  const handleQuantityChange = (change) => {
    const newQuantity = selectedQuantity + change;
    if (newQuantity >= 1 && newQuantity <= quantity) {
      setSelectedQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    console.log('Add to cart triggered:', { product, selectedQuantity, token });
    onAddToCart(product, selectedQuantity);
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden relative flex flex-col transition-all duration-300 hover:shadow-xl"
      whileHover={{ y: -5 }}
    >
      <div className="relative w-full h-48 sm:h-64 bg-gray-200">
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${
          quantity > 0 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {quantity > 0 ? 'In Stock' : 'Out of Stock'}
        </div>

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
          <p className="text-sm text-gray-600 mb-2">Available: {quantity}</p>
        </div>

        <div className="flex flex-col space-y-2">
          <span className="text-lg sm:text-xl font-bold text-[#1A2E44]">
            ₹{Number(price).toFixed(2)}
          </span>

          <div className="flex items-center justify-center space-x-2 mb-2">
            <button
              onClick={() => handleQuantityChange(-1)}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedQuantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-medium">{selectedQuantity}</span>
            <button
              onClick={() => handleQuantityChange(1)}
              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={selectedQuantity >= quantity}
            >
              <Plus size={16} />
            </button>
          </div>

          <button
            className="bg-[#5f81e0] text-white py-2 px-4 rounded-full text-xs sm:text-sm font-medium hover:bg-[#C86D54] transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#5f81e0]"
            onClick={handleAddToCart}
            disabled={quantity < 1}
          >
            <ShoppingCart className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            {quantity < 1 ? 'Out of Stock' : 'Add to Cart'}
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
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loadingCategories, setLoadingCategories] = useState(false);

  const { token, userId, setPendingCartProduct } = useAuthStore();
  const { addToCart } = useCartStore();

  const translations = {
    en: {
      title: 'Our Products',
      search: 'Search products...',
      filters: 'Filters',
      noProducts: 'No products found. Try adjusting your search or filters.',
      loading: 'Loading...',
      error: 'Failed to load products. Please try again.',
      loginRequired: 'Please login to add items to cart',
      addToCartSuccess: 'Product added to cart successfully',
      addToCartError: 'Failed to add product to cart',
      networkError: 'Network error. Please check your connection.',
      selectCategory: 'Select Category',
      allCategories: 'All Categories',
      loadingCategories: 'Loading categories...',
      categoriesError: 'Failed to load categories'
    },
    ta: {
      title: 'எங்கள் பொருட்கள்',
      search: 'பொருட்களைத் தேடுங்கள்...',
      filters: 'வடிகட்டிகள்',
      noProducts: 'பொருட்கள் எதுவும் கிடைக்கவில்லை. உங்கள் தேடலை மாற்றி முயற்சிக்கவும்.',
      loading: 'ஏற்றுகிறது...',
      error: 'பொருட்களை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
      loginRequired: 'கார்ட்டில் சேர்க்க உள்நுழையவும்',
      addToCartSuccess: 'பொருள் கார்ட்டில் சேர்க்கப்பட்டது',
      addToCartError: 'கார்ட்டில் சேர்க்க முடியவில்லை',
      networkError: 'இணைய பிழை. உங்கள் இணைப்பை சரிபார்க்கவும்.',
      selectCategory: 'வகையைத் தேர்ந்தெடுக்கவும்',
      allCategories: 'அனைத்து வகைகள்',
      loadingCategories: 'வகைகளை ஏற்றுகிறது...',
      categoriesError: 'வகைகளை ஏற்ற முடியவில்லை'
    }
  };

  const t = translations[isTamil ? 'ta' : 'en'];

  const configureAPI = useCallback(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const fetchCategories = useCallback(async () => {
    try {
      configureAPI();
      const response = await api.get('http://localhost:4010/api/listProduct?categoryList=yes');
      console.log('Categories response:', response.data);
      
      if (response.data && response.data.results) {
        // Extract unique categories from the results array
        const categories = response.data.results.map(item => item.category);
        
        const transformedCategories = [
          { id: '', name: 'All Categories' },
          ...categories.map(category => ({
            id: category,
            name: category
          }))
        ];
        
        setCategories(transformedCategories);
      } else {
        console.error('Invalid categories data structure:', response.data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, [configureAPI]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      configureAPI();
      const url = selectedCategory
        ? `api/listProduct?category=${selectedCategory}`
        : 'api/listProduct';
      
      const response = await api.get(url);
      let productsData = response.data;

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

      setProducts(processedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  }, [t.error, configureAPI, selectedCategory]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = async (product, quantity) => {
    if (!token) {
      setPendingCartProduct({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity
      });
      
      toast.info(t.loginRequired);
      navigate('/login');
      return;
    }

    try {
      configureAPI();
      const cartData = {
        productId: product.id,
        loginId: parseInt(userId),
        quantity: quantity
      };

      const response = await api.post('http://localhost:4010/api/addCart', cartData);
      
      if (response.status === 200 || response.status === 201) {
        addToCart(product, quantity);
        toast.success(t.addToCartSuccess);
        navigate('/cart');
      } else {
        console.error('Unexpected response:', response);
        toast.error(t.addToCartError);
      }
    } catch (error) {
      console.error('Detailed error:', error);
      if (error.response?.status === 401) {
        toast.error(t.loginRequired);
        navigate('/login');
      } else if (error.message === 'Network Error') {
        toast.error(t.networkError);
      } else {
        toast.error(t.addToCartError);
      }
    }
  };

  const handleViewProduct = (productId) => {
    navigate(`/product-description?id=${productId}`);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return (
    <div className="bg-gray-50 min-h-screen pb-12 px-4 sm:px-6 lg:px-8 pt-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1A2E44] mb-8 text-center pt-24 sm:pt-36"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t.title}
        </motion.h2>

        <div className="mb-6">
          <motion.div
            className="bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Search and Filter Header */}
            <div className="p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                  <button
                    className={`bg-[#5f81e0] text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-[#C86D54] transition duration-300 flex items-center justify-center w-full sm:w-auto ${showFilters ? 'bg-[#C86D54]' : ''}`}
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
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Search className="h-5 w-5 text-[#4A6FA5] absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
              </div>
            </div>

            {/* Sliding Filter Section */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-100"
                >
                  <div className="p-4 bg-gray-50">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">{t.selectCategory}</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryChange(category.id)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                            ${selectedCategory === category.id
                              ? 'bg-[#5f81e0] text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                            }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Products Grid */}
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
              {filteredProducts.map((product) => (
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
          <motion.div
            className="text-red-500 text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;

