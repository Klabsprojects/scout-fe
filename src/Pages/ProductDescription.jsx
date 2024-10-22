import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft, AlertCircle } from 'lucide-react';
import { useTranslation } from '../Context/TranslationContext';
import useStore from './useStore';
import api from '../apiConfig/api';

const ImageComponent = ({ src, alt, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative w-full h-full">
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-lg" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 rounded-lg ${
          imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setImageError(true);
          setImageLoaded(true);
        }}
      />
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <span className="text-gray-500 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Image not available
          </span>
        </div>
      )}
    </div>
  );
};

const ProductDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isTamil } = useTranslation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addToCart = useStore(state => state.addToCart);

  const translations = useMemo(() => ({
    en: {
      loading: 'Loading product details...',
      backToProducts: 'Back to Products',
      category: 'Category',
      addToCart: 'Add to Cart',
      productNotFound: 'Product not found',
      quantity: 'Quantity Available',
      errorMessage: 'Failed to load product. Please try again.',
      description: 'Description'
    },
    ta: {
      loading: 'தயாரிப்பு விவரங்களை ஏற்றுகிறது...',
      backToProducts: 'பொருட்களுக்குத் திரும்பு',
      category: 'வகை',
      addToCart: 'கூடையில் சேர்',
      productNotFound: 'தயாரிப்பு கிடைக்கவில்லை',
      quantity: 'கையிருப்பு',
      errorMessage: 'தயாரிப்பை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
      description: 'விளக்கம்'
    }
  }), []);

  const t = translations[isTamil ? 'ta' : 'en'];

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError(t.productNotFound);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await api.get(`api/listProduct?id=${id}`);
        let productData = response.data;

        if (productData?.results) {
          productData = Array.isArray(productData.results)
            ? productData.results.find(p => p.id === id)
            : productData.results;
        }

        if (!productData || !productData.id) {
          throw new Error(t.productNotFound);
        }

        setProduct({
          id: productData.id,
          name: productData.name?.trim() || 'Unnamed Product',
          description: productData.description?.trim() || 'No description available',
          category: productData.category?.trim() || 'Uncategorized',
          price: Number(productData.price) || 0,
          quantity: Number(productData.quantity) || 0,
          filepath: productData.filepath?.trim() || '',
        });
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message === t.productNotFound ? err.message : t.errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, t]);

  const getImageSrc = (filepath) => {
    if (!filepath) return '/api/placeholder/400/320';
    const cleanPath = filepath.replace(/^uploads\\/, '').replace(/\\/g, '/');
    return `http://localhost:4010/uploads/${cleanPath}`;
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        maxQuantity: product.quantity
      });
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 ">
        <motion.div 
          className="flex items-center space-x-2 text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-5 h-5 border-3 border-gray-600 border-t-transparent rounded-full animate-spin" />
          <span>{t.loading}</span>
        </motion.div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-center text-gray-600 mb-4">
            <AlertCircle className="w-6 h-6 mr-2" />
            <span className="text-lg">{error || t.productNotFound}</span>
          </div>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToProducts}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center text-gray-600 hover:text-gray-800 font-medium"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t.backToProducts}
        </motion.button>

        <motion.div 
          className="bg-white rounded-xl shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="p-6 lg:p-8">
              <ImageComponent
                src={getImageSrc(product.filepath)}
                alt={product.name}
                className="w-full h-[400px] object-cover"
              />
            </div>

            <div className="p-6 lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                      {product.name}
                    </h1>
                    <p className="mt-3 text-3xl font-bold text-gray-900">
                      ₹{product.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                      {t.description}
                    </h3>
                    <p className="mt-2 text-gray-600">
                      {product.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                        {t.category}
                      </h3>
                      <p className="mt-2 text-gray-600">
                        {product.category}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wide">
                        {t.quantity}
                      </h3>
                      <p className="mt-2 text-gray-600">
                        {product.quantity}
                      </p>
                    </div>
                  </div>

                  <button
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg text-base font-medium hover:bg-blue-700 transition duration-150 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleAddToCart}
                    disabled={product.quantity <= 0}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {t.addToCart}
                  </button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDescription;