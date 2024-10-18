import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Star, ArrowLeft, Plus, Minus, X, Check, Facebook, Twitter, Instagram, Eye } from 'lucide-react';
import { dummyProducts } from './Products';
import { useTranslation } from '../Context/TranslationContext';
import mediaData from '../MediaData.json';

const ProductDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isTamil } = useTranslation();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [reviews, setReviews] = useState([]);
  const reviewsRef = useRef(null);

  const translations = {
    backToProducts: {
      en: "Back to Products",
      ta: "பொருட்களுக்குத் திரும்பு"
    },
    reviews: {
      en: "reviews",
      ta: "விமர்சனங்கள்"
    },
    category: {
      en: "Category",
      ta: "வகை"
    },
    quantity: {
      en: "Quantity",
      ta: "அளவு"
    },
    addToCart: {
      en: "Add to Cart",
      ta: "கூடையில் சேர்"
    },
    productFeatures: {
      en: "Product Features",
      ta: "தயாரிப்பு அம்சங்கள்"
    },
    customerReviews: {
      en: "Customer Reviews",
      ta: "வாடிக்கையாளர் விமர்சனங்கள்"
    },
    relatedProducts: {
      en: "Related Products",
      ta: "தொடர்புடைய தயாரிப்புகள்"
    },
    viewProduct: {
      en: "Quick View",
      ta: "விரைவில் காண்க"
    },
    noDescription: {
      en: "No description available",
      ta: "விளக்கம் கிடைக்கவில்லை"
    },
    addedToCart: {
      en: "added to cart",
      ta: "கூடையில் சேர்க்கப்பட்டது"
    },
    productNotFound: {
      en: "Product not found",
      ta: "தயாரிப்பு கிடைக்கவில்லை"
    },
    returnToProducts: {
      en: "Return to Products",
      ta: "தயாரிப்புகளுக்குத் திரும்பு"
    }
  };

  const t = (key) => translations[key][isTamil ? 'ta' : 'en'];

  const reviewTranslations = {
    en: [
      { id: 1, user: "John D.", rating: 5, comment: "Absolutely love this product! It exceeded my expectations in every way.", date: "2024-03-15" },
      { id: 2, user: "Sarah M.", rating: 4, comment: "Great quality for the price. Would definitely recommend.", date: "2024-03-10" },
      { id: 3, user: "Michael R.", rating: 3, comment: "Decent product, but could use some improvements in durability.", date: "2024-03-05" },
      { id: 4, user: "Emily L.", rating: 5, comment: "This is exactly what I was looking for. Perfect fit for my needs!", date: "2024-02-28" },
      { id: 5, user: "David K.", rating: 4, comment: "Good product overall. Shipping was fast and packaging was secure.", date: "2024-02-20" },
      { id: 6, user: "Lisa H.", rating: 5, comment: "Outstanding quality and customer service. Will buy again!", date: "2024-02-15" },
    ],
    ta: [
      { id: 1, user: "ஜான் டி.", rating: 5, comment: "இந்தப் பொருளை முற்றிலும் விரும்புகிறேன்! இது என் எதிர்பார்ப்புகளை எல்லா வகையிலும் மிஞ்சியது.", date: "2024-03-15" },
      { id: 2, user: "சாரா எம்.", rating: 4, comment: "விலைக்கு நல்ல தரம். நிச்சயமாக பரிந்துரைப்பேன்.", date: "2024-03-10" },
      { id: 3, user: "மைக்கேல் ஆர்.", rating: 3, comment: "சரியான தயாரிப்பு, ஆனால் நீடித்த உபயோகத்திற்கு சில மேம்பாடுகள் தேவை.", date: "2024-03-05" },
      { id: 4, user: "எமிலி எல்.", rating: 5, comment: "நான் தேடிக்கொண்டிருந்தது இதுதான். என் தேவைகளுக்கு சரியாகப் பொருந்துகிறது!", date: "2024-02-28" },
      { id: 5, user: "டேவிட் கே.", rating: 4, comment: "ஒட்டுமொத்தமாக நல்ல தயாரிப்பு. அனுப்புதல் வேகமாக இருந்தது மற்றும் பொதி பாதुகாப்பாக இருந்தது.", date: "2024-02-20" },
      { id: 6, user: "லிசா எச்.", rating: 5, comment: "சிறந்த தரம் மற்றும் வாடிக்கையாளர் சேவை. மீண்டும் வாங்குவேன்!", date: "2024-02-15" },
    ]
  };

  useEffect(() => {
    let fetchedProduct;
    if (location.state && location.state.id === parseInt(id)) {
      fetchedProduct = location.state;
    } else {
      fetchedProduct = dummyProducts.find(p => p.id === parseInt(id));
      if (fetchedProduct) {
        fetchedProduct.image = mediaData.carouselImages[fetchedProduct.id % mediaData.carouselImages.length];
      }
    }

    if (fetchedProduct) {
      setProduct({
        ...fetchedProduct,
        description: fetchedProduct.description?.[isTamil ? 'ta' : 'en'] || t('noDescription'),
        features: fetchedProduct.features?.[isTamil ? 'ta' : 'en'] || []
      });

      const related = dummyProducts
        .filter(p => p.category === fetchedProduct.category && p.id !== fetchedProduct.id)
        .slice(0, 3);
      setRelatedProducts(related);

      setReviews(reviewTranslations[isTamil ? 'ta' : 'en']);
    }
  }, [id, isTamil, location]);

  useEffect(() => {
    const scrollReviews = () => {
      if (reviewsRef.current) {
        if (reviewsRef.current.scrollLeft >= reviewsRef.current.scrollWidth / 2) {
          reviewsRef.current.scrollLeft = 0;
        } else {
          reviewsRef.current.scrollLeft += 1;
        }
      }
    };

    const intervalId = setInterval(scrollReviews, 50);

    return () => clearInterval(intervalId);
  }, []);

  if (!product) {
    return (
      <div className="text-center mt-20">
        <p className="text-xl text-[#4A6FA5]">{t('productNotFound')}</p>
        <button
          onClick={() => navigate('/products')}
          className="mt-4 text-[#E07A5F] hover:text-[#C86D54] font-semibold"
        >
          {t('returnToProducts')}
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    };

    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => item.id === cartItem.id);

    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    setSnackbarVisible(true);
    setTimeout(() => setSnackbarVisible(false), 3000);
  };

  const handleToggleWishlist = () => {
    setProduct(prevProduct => ({
      ...prevProduct,
      isWishlisted: !prevProduct.isWishlisted
    }));
  };

  const handleSocialMediaClick = (platform) => {
    let url;
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out this awesome product: ${product.name[isTamil ? 'ta' : 'en']}`)}`;
        break;
      case 'instagram':
        url = 'https://www.instagram.com/your_instagram_profile';
        break;
      default:
        return;
    }
    window.open(url, '_blank');
  };

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
          <ArrowLeft className="mr-2" /> {t('backToProducts')}
        </motion.button>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <motion.div 
              className="md:flex-shrink-0 md:w-1/2 p-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img className="w-full h-96 object-contain rounded-lg" src={product.image} alt={product.name[isTamil ? 'ta' : 'en']} />
            </motion.div>
            <motion.div 
              className="p-8 md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[#1A2E44] mb-4">{product.name[isTamil ? 'ta' : 'en']}</h2>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="ml-2 text-[#4A6FA5]">({product.reviews} {t('reviews')})</span>
              </div>
              <p className="text-[#4A6FA5] mb-6">{product.description}</p>
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold text-[#1A2E44]">₹{product.price.toFixed(2)}</span>
                <span className="text-lg text-[#4A6FA5]">{t('category')}: {product.category}</span>
              </div>
              <div className="flex items-center mb-6">
                <span className="mr-4 text-[#1A2E44]">{t('quantity')}:</span>
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 text-[#1A2E44] rounded-full p-2"
                >
                  <Minus size={16} />
                </button>
                <span className="mx-4 text-xl font-semibold text-[#1A2E44]">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-200 text-[#1A2E44] rounded-full p-2"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex space-x-4 mb-6">
                <button
                  className="flex-1 bg-[#E07A5F] text-white py-3 px-6 rounded-full text-lg font-medium hover:bg-[#C86D54] transition duration-300 flex items-center justify-center"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  {t('addToCart')}
                </button>
                <button
                  className="bg-gray-200 text-[#1A2E44] py-3 px-6 rounded-full text-lg font-medium hover:bg-gray-300 transition duration-300 flex items-center justify-center"
                  onClick={handleToggleWishlist}
                >
                 <Heart className={`h-5 w-5 ${product.isWishlisted ? 'text-red-500 fill-red-500' : 'text-[#1A2E44]'}`} />
                </button>
              </div>
              {product.features && product.features.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold mb-2 text-[#1A2E44]">{t('productFeatures')}:</h3>
                  <ul className="list-disc list-inside text-[#4A6FA5]">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-center mb-2">
                        <Check size={16} className="mr-2 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-[#1A2E44] mb-6">{t('customerReviews')}</h3>
          <div 
            ref={reviewsRef}
            className="overflow-hidden whitespace-nowrap"
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className="inline-flex space-x-6">
              {reviews.concat(reviews).map((review, index) => (
                <motion.div
                  key={`${review.id}-${index}`}
                  className="bg-white rounded-lg p-6 w-80 inline-block"
                  style={{
                    boxShadow: '0 4px 6px -1px rgba(251, 207, 232, 0.1), 0 2px 4px -1px rgba(251, 207, 232, 0.06)',
                    transition: 'box-shadow 0.3s ease-in-out'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{
                    boxShadow: '0 10px 15px -3px rgba(251, 207, 232, 0.3), 0 4px 6px -2px rgba(251, 207, 232, 0.2)'
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-[#1A2E44]">{review.user}</h4>
                      <p className="text-sm text-[#4A6FA5]">{review.date}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#4A6FA5] whitespace-normal">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {relatedProducts.length > 0 && (
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-[#1A2E44] mb-6">{t('relatedProducts')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <img className="w-full h-48 object-cover" src={relatedProduct.image || mediaData.carouselImages[relatedProduct.id % mediaData.carouselImages.length]} alt={relatedProduct.name[isTamil ? 'ta' : 'en']} />
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-[#1A2E44] mb-2">{relatedProduct.name[isTamil ? 'ta' : 'en']}</h4>
                    <p className="text-[#4A6FA5] mb-2">
                      {relatedProduct.description?.[isTamil ? 'ta' : 'en']
                        ? `${relatedProduct.description[isTamil ? 'ta' : 'en'].slice(0, 50)}...`
                        : t('noDescription')}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#1A2E44]">₹{relatedProduct.price.toFixed(2)}</span>
                      <button
                        onClick={() => navigate(`/product/${relatedProduct.id}`)}
                        className="text-[#E07A5F] hover:text-[#C86D54] font-semibold flex items-center"
                      >
                        <Eye size={20} className="mr-2" />
                        {t('viewProduct')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div 
          className="mt-12 flex justify-center space-x-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button 
            onClick={() => handleSocialMediaClick('facebook')}
            className="bg-[#E07A5F] text-white p-3 rounded-full hover:bg-[#C86D54] transition-colors duration-300"
          >
            <Facebook size={24} />
          </button>
          <button 
            onClick={() => handleSocialMediaClick('twitter')}
            className="bg-[#E07A5F] text-white p-3 rounded-full hover:bg-[#C86D54] transition-colors duration-300"
          >
            <Twitter size={24} />
          </button>
          <button 
            onClick={() => handleSocialMediaClick('instagram')}
            className="bg-[#E07A5F] text-white p-3 rounded-full hover:bg-[#C86D54] transition-colors duration-300"
          >
            <Instagram size={24} />
          </button>
        </motion.div>

        <AnimatePresence>
          {snackbarVisible && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center"
            >
              <span>{`${product.name[isTamil ? 'ta' : 'en']} ${t('addedToCart')}`}</span>
              <button onClick={() => setSnackbarVisible(false)} className="ml-2">
                <X size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductDescription;