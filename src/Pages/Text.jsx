import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useTranslation } from '../Context/TranslationContext';
import useStore from './useStore';
import api from '../apiConfig/api';

const ProductDescription = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const navigate = useNavigate();
  const { isTamil } = useTranslation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const addToCart = useStore(state => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`api/listProduct?id=${id}`);
        const productData = response.data;

        // Validate and sanitize the product data
        const sanitizedProduct = {
          id: productData?.id || '',
          name: productData?.name || 'Unnamed Product',
          description: productData?.description || 'No description available',
          category: productData?.category || 'Uncategorized',
          price: Number(productData?.price) || 0,
          filepath: productData?.filepath || '',
        };

        setProduct(sanitizedProduct);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const translations = useMemo(() => ({
    en: {
      loading: 'Loading...',
      backToProducts: 'Back to Products',
      category: 'Category',
      addToCart: 'Add to Cart',
      productNotFound: 'Product not found'
    },
    ta: {
      loading: 'ஏற்றுகிறது...',
      backToProducts: 'பொருட்களுக்குத் திரும்பு',
      category: 'வகை',
      addToCart: 'கூடையில் சேர்',
      productNotFound: 'தயாரிப்பு கிடைக்கவில்லை'
    }
  }), []);

  const t = useMemo(() => translations[isTamil ? 'ta' : 'en'], [translations, isTamil]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-[#4A6FA5]">{t.loading}</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center mt-20">
        <p className="text-xl text-[#4A6FA5]">{error || t.productNotFound}</p>
        <button
          onClick={() => navigate('/products')}
          className="mt-4 text-[#E07A5F] hover:text-[#C86D54] font-semibold"
        >
          {t.backToProducts}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-[#E07A5F] hover:text-[#C86D54] font-semibold"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowLeft className="mr-2" /> {t.backToProducts}
        </motion.button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <motion.div 
              className="md:flex-shrink-0 md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                className="h-48 w-full object-cover md:h-full md:w-full"
                src={`http://localhost:4010/uploads/${product.filepath}`}
                alt={product.name}
              />
            </motion.div>

            <motion.div 
              className="p-8 md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[#1A2E44] mb-4">{product.name}</h2>
              <p className="text-[#4A6FA5] mb-6">{product.description}</p>
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold text-[#1A2E44]">₹{product.price.toFixed(2)}</span>
                <span className="text-lg text-[#4A6FA5]">{t.category}: {product.category}</span>
              </div>

              <button
                className="bg-[#E07A5F] text-white py-3 px-6 rounded-full text-lg font-medium hover:bg-[#C86D54] transition duration-300 flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {t.addToCart}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDescription;