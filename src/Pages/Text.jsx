import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft, AlertCircle, Star, Package, Clock, Shield, Eye } from 'lucide-react';
import { useTranslation } from '../Context/TranslationContext';
import useStore from './useStore';
import api from '../apiConfig/api';

const RecommendedProductCard = ({ product, onAddToCart, onViewProduct }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const getImageSrc = (filepath) => {
    if (!filepath) return '/api/placeholder/400/320';
    const cleanPath = filepath.replace(/^uploads\\/, '').replace(/\\/g, '/');
    return `http://localhost:4010/uploads/${cleanPath}`;
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden relative flex flex-col transition-all duration-300 hover:shadow-xl"
      whileHover={{ y: -5 }}
    >
      <div className="relative w-full h-48 bg-gray-200">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-pulse bg-gray-300 w-full h-full"></div>
          </div>
        )}
        <img
          src={getImageSrc(product.filepath)}
          alt={product.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
            <span className="text-gray-500">Image not available</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{Number(product.price).toFixed(2)}
          </span>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            onClick={() => onAddToCart(product)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </button>
          <button
            className="bg-gray-100 text-gray-900 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition duration-300 flex items-center justify-center"
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

const ImageComponent = ({ src, alt, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageRatio, setImageRatio] = useState(1);

  const handleImageLoad = (e) => {
    setImageLoaded(true);
    const ratio = e.target.naturalWidth / e.target.naturalHeight;
    setImageRatio(ratio);
  };

  return (
    <div className="relative w-full h-auto aspect-square lg:aspect-auto group">
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-xl" />
      )}
      <motion.div
        className={`relative overflow-hidden rounded-xl ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <motion.img
          src={src}
          alt={alt}
          className={`w-full h-full ${imageRatio > 1 ? 'object-contain' : 'object-contain'} transition-all duration-300 rounded-xl hover:scale-105 ${
            imageLoaded && !imageError ? 'opacity-100' : 'opacity-0'
          }`}
          animate={{ scale: isZoomed ? 1.2 : 1 }}
          onLoad={handleImageLoad}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
        {!isZoomed && imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-xl" />
        )}
      </motion.div>
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-xl">
          <span className="text-gray-500 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2" />
            Image not available
          </span>
        </div>
      )}
    </div>
  );
};

const FeatureCard = ({ Icon, title, description }) => (
  <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
    <Icon className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
    <div>
      <h4 className="text-sm font-medium text-gray-900">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const ProductDescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isTamil } = useTranslation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
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
      description: 'Product Details',
      recommendedProducts: 'You might also like',
      features: {
        shipping: 'Shipping',
        shippingDesc: 'Delivery options available',
        delivery: 'Delivery Time',
        deliveryDesc: 'Estimated delivery time',
        warranty: 'Warranty',
        warrantyDesc: 'Product warranty'
      }
    },
    ta: {
      loading: 'தயாரிப்பு விவரங்களை ஏற்றுகிறது...',
      backToProducts: 'பொருட்களுக்குத் திரும்பு',
      category: 'வகை',
      addToCart: 'கூடையில் சேர்',
      productNotFound: 'தயாரிப்பு கிடைக்கவில்லை',
      quantity: 'கையிருப்பு',
      errorMessage: 'தயாரிப்பை ஏற்ற முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
      description: 'தயாரிப்பு விவரங்கள்',
      recommendedProducts: 'உங்களுக்கு பிடிக்கலாம்',
      features: {
        shipping: 'கப்பல் போக்குவரத்து',
        shippingDesc: 'டெலிவரி விருப்பங்கள்',
        delivery: 'டெலிவரி நேரம்',
        deliveryDesc: 'மதிப்பிடப்பட்ட டெலிவரி நேரம்',
        warranty: 'வாரண்டி',
        warrantyDesc: 'தயாரிப்பு வாரண்டி'
      }
    }
  }), []);

  const t = translations[isTamil ? 'ta' : 'en'];

  const fetchRecommendedProducts = async () => {
    try {
      const response = await api.get('api/listProduct');
      let productsData = response.data;

      if (productsData?.results) {
        productsData = productsData.results;
      }

      // Filter out the current product and get random products
      const otherProducts = productsData.filter(p => p.id !== id);
      const shuffled = otherProducts.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 4);

      setRecommendedProducts(selected);
    } catch (err) {
      console.error('Error fetching recommended products:', err);
    }
  };

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

        // Fetch recommended products after getting the current product
        fetchRecommendedProducts();
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
        quantity: quantity,
        maxQuantity: product.quantity
      });
      navigate('/cart');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div 
          className="flex items-center space-x-3 text-lg text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span>{t.loading}</span>
        </motion.div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-28">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.button
          onClick={() => navigate(-1)}
          className="mb-8 inline-flex items-center text-gray-600 hover:text-gray-800 font-medium group"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
          {t.backToProducts}
        </motion.button>

        <motion.div 
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="p-8">
              <ImageComponent
              src={getImageSrc(product.filepath)}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {product.name}
                  </h1>
                  <p className="text-4xl font-bold text-gray-900 mb-6">
                    ₹{product.price.toFixed(2)}
                  </p>
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t.description}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FeatureCard
                    Icon={Package}
                    title={t.features.shipping}
                    description={t.features.shippingDesc}
                  />
                  <FeatureCard
                    Icon={Clock}
                    title={t.features.delivery}
                    description={t.features.deliveryDesc}
                  />
                  <FeatureCard
                    Icon={Shield}
                    title={t.features.warranty}
                    description={t.features.warrantyDesc}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      {t.quantity}: {product.quantity}
                    </span>
                    <div className="flex items-center space-x-3">
                      <button
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{quantity}</span>
                      <button
                        className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                        onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                        disabled={quantity >= product.quantity}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl text-base font-medium hover:bg-blue-700 transition duration-150 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                    onClick={handleAddToCart}
                    disabled={product.quantity <= 0}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {t.addToCart}
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Recommended Products Section */}
      {recommendedProducts.length > 0 && (
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-gray-900">
            {t.recommendedProducts}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((recProduct) => (
              <RecommendedProductCard
                key={recProduct.id}
                product={recProduct}
                onAddToCart={(product) => {
                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    maxQuantity: product.quantity
                  });
                  navigate('/cart');
                }}
                onViewProduct={(productId) => {
                  window.scrollTo(0, 0);
                  navigate(`/product-description?id=${productId}`);
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  </div>
);
};

export default ProductDescription;