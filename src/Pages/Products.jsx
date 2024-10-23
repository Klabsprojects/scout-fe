import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../Context/TranslationContext';
import { ShoppingCart, Eye, Search, Filter, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../apiConfig/api';
import { toast } from 'react-toastify';

// Auth Store
const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      userId: null,
      username: null,
      pendingCartProduct: null,
      setAuth: (token, userId, username) => 
        set({ token, userId, username }),
      setPendingCartProduct: (product) => 
        set({ pendingCartProduct: product }),
      logout: () => 
        set({ token: null, userId: null, username: null, pendingCartProduct: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Cart Store
const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product, quantity = 1) => set((state) => {
    const existingItem = state.cart.find(item => item.id === product.id);
    if (existingItem) {
      return {
        cart: state.cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      };
    } else {
      return { cart: [...state.cart, { ...product, quantity }] };
    }
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== productId)
  })),
  updateQuantity: (productId, newQuantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    )
  })),
  clearCart: () => set({ cart: [] }),
}));

const ProductCard = ({ product, onAddToCart, onViewProduct, isTamil }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { token } = useAuthStore();
  const addToCartStore = useCartStore(state => state.addToCart);

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

  const handleQuantityChange = (change) => {
    const newQuantity = selectedQuantity + change;
    if (newQuantity >= 1 && newQuantity <= quantity) {
      setSelectedQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!token) {
      onAddToCart(product, selectedQuantity); // This will handle redirect to login
    } else {
      addToCartStore(product, selectedQuantity);
      toast.success('Product added to cart');
      onAddToCart(product, selectedQuantity);
    }
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
            className="bg-[#5f81e0] text-white py-2 px-4 rounded-full text-xs sm:text-sm font-medium hover:bg-[#C86D54] transition duration-300 flex items-center justify-center"
            onClick={handleAddToCart}
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
// ... continuing from previous part

const Products = () => {
  const { isTamil } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Zustand store hooks
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
      addToCartError: 'Failed to add product to cart'
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
      addToCartError: 'கார்ட்டில் சேர்க்க முடியவில்லை'
    }
  };

  const t = translations[isTamil ? 'ta' : 'en'];

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
      const cartData = {
        productId: product.id,
        loginId: parseInt(userId),
        quantity: quantity
      };

      const response = await api.post('api/addCart', cartData);

      if (response.status === 200 || response.status === 201) {
        addToCart(product, quantity);
        toast.success(t.addToCartSuccess);
        navigate('/cart');
      } else {
        toast.error(t.addToCartError);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error(t.addToCartError);
    }
  };

  useEffect(() => {
    const processPendingCartAction = async () => {
      const pendingProduct = useAuthStore.getState().pendingCartProduct;
      
      if (pendingProduct && token) {
        try {
          const cartData = {
            productId: pendingProduct.productId,
            loginId: parseInt(userId),
            quantity: pendingProduct.quantity
          };

          const response = await api.post('api/addCart', cartData);
          
          if (response.status === 200 || response.status === 201) {
            addToCart(pendingProduct);
            toast.success(t.addToCartSuccess);
            setPendingCartProduct(null);
            navigate('/cart');
          } else {
            toast.error(t.addToCartError);
          }
        } catch (error) {
          console.error('Error processing pending cart action:', error);
          toast.error(t.addToCartError);
        }
      }
    };

    processPendingCartAction();
  }, [token, userId, setPendingCartProduct, addToCart, navigate, t.addToCartSuccess, t.addToCartError]);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('api/listProduct');
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
  }, [t.error]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleViewProduct = (productId) => {
    navigate(`/product-description?id=${productId}`);
  };

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

        {showFilters && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFilters(false)}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-md w-full"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#1A2E44]">{t.filters}</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    className="rounded-lg border-gray-300 focus:border-[#5f81e0] focus:ring focus:ring-[#5f81e0] focus:ring-opacity-50"
                  >
                    <option value="">All Categories</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Price Range
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-1/2 rounded-lg border-gray-300 focus:border-[#5f81e0] focus:ring focus:ring-[#5f81e0] focus:ring-opacity-50"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-1/2 rounded-lg border-gray-300 focus:border-[#5f81e0] focus:ring focus:ring-[#5f81e0] focus:ring-opacity-50"
                    />
                  </div>
                </div>
                <button
                  className="w-full bg-[#5f81e0] text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-[#C86D54] transition duration-300"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;