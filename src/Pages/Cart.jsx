import React, { useState, useEffect } from 'react';
import { useTranslation } from '../Context/TranslationContext';
import { X, Plus, Minus, ShoppingCart, ArrowLeft, Truck, CreditCard, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { isTamil } = useTranslation();
  const [cartItems, setCartItems] = useState([]);

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
      exclusiveDeals: 'Exclusive deals and offers'
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
      exclusiveDeals: 'பிரத்யேக ஒப்பந்தங்கள் மற்றும் சலுகைகள்'
    }
  };

  const t = translations[isTamil ? 'ta' : 'en'];

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
                <div className="flex items-center">
                  <Gift className="text-blue-500 mr-3" size={24} />
                  <span>{t.exclusiveDeals}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;