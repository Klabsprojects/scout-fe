import React, { useState, useEffect } from 'react';
import { useTranslation } from '../Context/TranslationContext';
import { X, Plus, Minus, ShoppingCart, ArrowLeft, Truck, CreditCard, Gift, Clock, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { isTamil } = useTranslation();
  const [cartItems, setCartItems] = useState([]);
  const [showFAQ, setShowFAQ] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const updateQuantity = (id, newQuantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const translations = {
    en: {
      title: 'Your Shopping Cart',
      empty: 'Your cart is empty',
      total: 'Total',
      subtotal: 'Subtotal',
      checkout: 'Proceed to Checkout',
      remove: 'Remove',
      continueShopping: 'Continue Shopping',
      estimatedShipping: 'Estimated Shipping',
      freeShipping: 'Free Shipping',
      tax: 'Tax',
      whyShopWithUs: 'Why Shop with Us?',
      fastShipping: 'Fast and reliable shipping',
      securePayment: 'Secure payment options',
      exclusiveDeals: 'Exclusive deals and offers',
      orderSummary: 'Order Summary',
      items: 'Items',
      estimatedDelivery: 'Estimated Delivery',
      days: 'days',
      faq: 'Frequently Asked Questions',
      faqQuestion1: 'How long will my order take to arrive?',
      faqAnswer1: 'Delivery times vary depending on your location, but typically orders arrive within 3-5 business days.',
      faqQuestion2: 'What is your return policy?',
      faqAnswer2: 'We offer a 30-day return policy for most items. Please check our returns page for more details.',
      faqQuestion3: 'Do you offer international shipping?',
      faqAnswer3: 'Yes, we ship to many countries worldwide. Shipping costs and delivery times may vary.',
    },
    ta: {
      title: 'உங்கள் கார்ட்',
      empty: 'உங்கள் கார்ட் காலியாக உள்ளது',
      total: 'மொத்தம்',
      subtotal: 'கூட்டுத்தொகை',
      checkout: 'செக்அவுட் செய்ய தொடரவும்',
      remove: 'அகற்று',
      continueShopping: 'கடை பிடிக்க தொடரவும்',
      estimatedShipping: 'மதிப்பிடப்பட்ட அனுப்புதல்',
      freeShipping: 'இலவச அனுப்புதல்',
      tax: 'வரி',
      whyShopWithUs: 'எங்களுடன் ஏன் கடை பிடிக்க வேண்டும்?',
      fastShipping: 'விரைவான மற்றும் நம்பகமான அனுப்புதல்',
      securePayment: 'பாதுகாப்பான பணம் செலுத்தும் விருப்பங்கள்',
      exclusiveDeals: 'பிரத்யேக ஒப்பந்தங்கள் மற்றும் சலுகைகள்',
      orderSummary: 'ஆர்டர் சுருக்கம்',
      items: 'பொருட்கள்',
      estimatedDelivery: 'மதிப்பிடப்பட்ட வழங்கல்',
      days: 'நாட்கள்',
      faq: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
      faqQuestion1: 'எனது ஆர்டர் வர எவ்வளவு நேரம் ஆகும்?',
      faqAnswer1: 'வழங்கல் நேரங்கள் உங்கள் இருப்பிடத்தைப் பொறுத்து மாறுபடும், ஆனால் பொதுவாக ஆர்டர்கள் 3-5 வணிக நாட்களுக்குள் வந்துவிடும்.',
      faqQuestion2: 'உங்கள் திருப்பிச் செலுத்தும் கொள்கை என்ன?',
      faqAnswer2: 'பெரும்பாலான பொருட்களுக்கு நாங்கள் 30 நாள் திருப்பிச் செலுத்தும் கொள்கையை வழங்குகிறோம். மேலும் விவரங்களுக்கு எங்கள் திருப்பிச் செலுத்தும் பக்கத்தைப் பார்க்கவும்.',
      faqQuestion3: 'நீங்கள் சர்வதேச அனுப்புதலை வழங்குகிறீர்களா?',
      faqAnswer3: 'ஆம், நாங்கள் உலகெங்கிலும் உள்ள பல நாடுகளுக்கு அனுப்புகிறோம். அனுப்புதல் செலவுகள் மற்றும் வழங்கல் நேரங்கள் மாறுபடலாம்.',
    }
  };

  const t = translations[isTamil ? 'ta' : 'en'];

  const FAQ = [
    { question: t.faqQuestion1, answer: t.faqAnswer1 },
    { question: t.faqQuestion2, answer: t.faqAnswer2 },
    { question: t.faqQuestion3, answer: t.faqAnswer3 },
  ];

  return (
    <div className="bg-gray-100 min-h-screen pt-28">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">{t.title}</h1>
        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <ShoppingCart size={80} className="mx-auto text-gray-400 mb-6" />
            <p className="text-2xl text-gray-600 mb-8">{t.empty}</p>
            <Link to="/product" className="bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition-colors inline-flex items-center text-lg">
              <ArrowLeft size={24} className="mr-2" />
              {t.continueShopping}
            </Link>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-2/3"
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">{t.orderSummary}</h2>
                  <div className="flex justify-between mb-2">
                    <span>{t.items}</span>
                    <span>{cartItems.length}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>{t.estimatedDelivery}</span>
                    <span>3-5 {t.days}</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-between border-b border-gray-200 py-4 last:border-b-0"
                      >
                        <div className="flex items-center">
                          <img src={item.image} alt={item.name[isTamil ? 'ta' : 'en']} className="w-24 h-24 object-cover rounded-md mr-6" />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{item.name[isTamil ? 'ta' : 'en']}</h3>
                            <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center border rounded-full overflow-hidden">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 bg-gray-100 hover:bg-gray-200 transition-colors">
                              <Minus size={16} />
                            </button>
                            <span className="px-4 py-2 font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 bg-gray-100 hover:bg-gray-200 transition-colors">
                              <Plus size={16} />
                            </button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500 hover:text-red-700 transition-colors">
                            <X size={24} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:w-1/3"
            >
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold mb-4">{t.subtotal}</h2>
                <div className="flex justify-between mb-2">
                  <span>{t.subtotal}</span>
                  <span>₹{calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>{t.estimatedShipping}</span>
                  <span className="text-green-500">{t.freeShipping}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span>{t.tax}</span>
                  <span>₹0.00</span>
                </div>
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold">{t.total}</span>
                    <span className="text-2xl font-bold text-blue-600">₹{calculateSubtotal().toFixed(2)}</span>
                  </div>
                </div>
                <button className="w-full bg-blue-500 text-white py-3 px-4 rounded-full hover:bg-blue-600 transition-colors text-lg font-semibold mb-4">
                  {t.checkout}
                </button>
                <Link to="/product" className="block text-center text-blue-500 hover:text-blue-600 transition-colors">
                  {t.continueShopping}
                </Link>
              </div>
              <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">{t.whyShopWithUs}</h3>
                <div className="flex items-center mb-3">
                  <Truck className="text-blue-500 mr-3" size={24} />
                  <span>{t.fastShipping}</span>
                </div>
                <div className="flex items-center mb-3">
                  <CreditCard className="text-blue-500 mr-3" size={24} />
                  <span>{t.securePayment}</span>
                </div>
                <div className="flex items-center mb-3">
                  <Gift className="text-blue-500 mr-3" size={24} />
                  <span>{t.exclusiveDeals}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="text-blue-500 mr-3" size={24} />


                  <span>{t.estimatedDelivery}: 3-5 {t.days}</span>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 bg-white rounded-lg shadow-lg p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">{t.faq}</h3>
                <button 
                  onClick={() => setShowFAQ(!showFAQ)}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <HelpCircle size={24} />
                </button>
              </div>
              <AnimatePresence>
                {showFAQ && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {FAQ.map((item, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h4 className="font-medium mb-2">{item.question}</h4>
                        <p className="text-gray-600">{item.answer}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      )}
    </div>
  </div>
);
};

export default Cart;