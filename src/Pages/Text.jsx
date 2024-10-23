import React, { useState, useEffect } from 'react';
import { useTranslation } from '../Context/TranslationContext';
import { X, Plus, Minus, ShoppingCart, ArrowLeft, Truck, CreditCard, Gift, Clock, HelpCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
      setAuth: (token, userId, username) => 
        set({ token, userId, username }),
      logout: () => 
        set({ token: null, userId: null, username: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

// Cart Store
const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],
      cartWithProducts: [],
      setCartItems: (items) => set({ cartItems: items }),
      setCartWithProducts: (products) => set({ cartWithProducts: products }),
      addToCart: (item) => set((state) => ({
        cartItems: [...state.cartItems, item]
      })),
      removeFromCart: (itemId) => set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== itemId)
      })),
      clearCart: () => set({ cartItems: [], cartWithProducts: [] }),
      updateCartItem: (itemId, updates) => set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.id === itemId ? { ...item, ...updates } : item
        )
      }))
    }),
    {
      name: 'cart-storage',
    }
  )
);

const Cart = () => {
  const navigate = useNavigate();
  const { isTamil } = useTranslation();
  const [showFAQ, setShowFAQ] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // Zustand hooks
  const { userId } = useAuthStore();
  const { cartWithProducts, setCartWithProducts } = useCartStore();

  const initialAddressState = {
    fullName: '',
    phoneNumber: '',
    doorNo: '',
    street: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    primaryOrSecondary: 'primary'
  };

  const [addressFormData, setAddressFormData] = useState(initialAddressState);

  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('api/addAddress', {
        ...addressFormData,
        loginId: userId
      });

      console.log('Address added:', response.data);
      setShowAddressModal(false);
      setAddressFormData(initialAddressState);
      toast.success('Address added successfully!');
    } catch (error) {
      console.error('Error adding address:', error);
      toast.error('Failed to add address. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setAddressFormData({
      ...addressFormData,
      [e.target.name]: e.target.value
    });
  };

  const translations = {
    en: {
      title: 'Your Shopping Cart',
      empty: 'Your cart is empty',
      total: 'Total',
      totalItems: 'Total Items',
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
      category: 'Category',
      description: 'Description',
      quantity: 'Quantity',
      price: 'Price',
      faq: 'Frequently Asked Questions',
      faqQuestion1: 'How long will my order take to arrive?',
      faqAnswer1: 'Delivery times vary depending on your location, but typically orders arrive within 3-5 business days.',
      faqQuestion2: 'What is your return policy?',
      faqAnswer2: 'We offer a 30-day return policy for most items. Please check our returns page for more details.',
      faqQuestion3: 'Do you offer international shipping?',
      faqAnswer3: 'Yes, we ship to many countries worldwide. Shipping costs and delivery times may vary.',
      errorFetchingCart: 'Error loading cart items',
      errorFetchingProducts: 'Error loading product details',
      uncategorized: 'Uncategorized',
      noDescription: 'No description available',
      unnamedProduct: 'Unnamed Product',
      addAddress: 'Add Address',
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      doorNo: 'Door No',
      street: 'Street',
      address: 'Address',
      city: 'City',
      state: 'State',
      pincode: 'Pincode',
      primaryOrSecondary: 'Primary or Secondary',
      cancel: 'Cancel',
      submit: 'Submit',
    },
    ta: {
      title: 'உங்கள் கார்ட்',
      empty: 'உங்கள் கார்ட் காலியாக உள்ளது',
      total: 'மொத்தம்',
      totalItems: 'மொத்த பொருட்கள்',
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
      category: 'வகை',
      description: 'விளக்கம்',
      quantity: 'அளவு',
      price: 'விலை',
      faq: 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
      faqQuestion1: 'எனது ஆர்டர் வர எவ்வளவு நேரம் ஆகும்?',
      faqAnswer1: 'வழங்கல் நேரங்கள் உங்கள் இருப்பிடத்தைப் பொறுத்து மாறுபடும், ஆனால் பொதுவாக 3-5 வேலை நாட்களில் வந்துவிடும்.',
      faqQuestion2: 'உங்கள் திருப்பி அனுப்பும் கொள்கை என்ன?',
      faqAnswer2: '30 நாட்கள் திருப்பி அனுப்பும் கொள்கை உள்ளது.',
      faqQuestion3: 'சர்வதேச அனுப்புதல் உள்ளதா?',
      faqAnswer3: 'ஆம், உலகம் முழுவதும் அனுப்புகிறோம்.',
      errorFetchingCart: 'கார்ட் தகவல்களை பெறுவதில் பிழை',
      errorFetchingProducts: 'தயாரிப்பு விவரங்களை ஏற்றுவதில் பிழை',
      uncategorized: 'வகைப்படுத்தப்படாதது',
      noDescription: 'விளக்கம் இல்லை',
      unnamedProduct: 'பெயரிடப்படாத தயாரிப்பு',
      addAddress: 'முகவரியைச் சேர்',
      fullName: 'முழு பெயர்',
      phoneNumber: 'தொலைபேசி எண்',
      doorNo: 'கதவு எண்',
      street: 'தெரு',
      address: 'முகவரி',
      city: 'நகரம்',
      state: 'மாநிலம்',
      pincode: 'பின்கோடு',
      primaryOrSecondary: 'முதன்மை அல்லது இரண்டாம் நிலை',
      cancel: 'ரத்துசெய்',
      submit: 'சமர்ப்பி',
    }
  };

  const t = translations[isTamil ? 'ta' : 'en'];

  useEffect(() => {
    const fetchCartAndProducts = async () => {
      try {
        if (!userId) {
          setLoading(false);
          navigate('/login');
          return;
        }

        const cartResponse = await api.get(`api/listCart?loginId=${userId}`);
        console.log('Cart Response:', cartResponse.data);

        if (cartResponse.data && Array.isArray(cartResponse.data.results)) {
          const productPromises = cartResponse.data.results.map(async (cartItem) => {
            try {
              const productResponse = await api.get(`api/listProduct?id=${cartItem.productId}`);
              console.log('Product Response for ID', cartItem.productId, ':', productResponse.data);
              
              return {
                cartItem,
                productDetails: productResponse.data.results
              };
            } catch (error) {
              console.error(`Error fetching product ${cartItem.productId}:`, error);
              return {
                cartItem,
                productDetails: null
              };
            }
          });

          const responses = await Promise.all(productPromises);
          console.log('All Responses:', responses);

          const cartWithProductDetails = responses.map(({ cartItem, productDetails }) => {
            return {
              id: cartItem.id,
              productId: cartItem.productId,
              quantity: cartItem.quantity,
              name: productDetails?.name || t.unnamedProduct,
              price: productDetails?.price || '0',
              category: productDetails?.category || t.uncategorized,
              description: productDetails?.description || t.noDescription,
              filepath: productDetails?.filepath || null
            };
          });

          console.log('Final Combined Cart Data:', cartWithProductDetails);
          setCartWithProducts(cartWithProductDetails);
        }
      } catch (error) {
        console.error('Error fetching cart and products:', error);
        toast.error(error.message === 'Network Error' ? t.errorFetchingCart : t.errorFetchingProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchCartAndProducts();
  }, [userId, setCartWithProducts, t, navigate]);

  const calculateSubtotal = () => {
    return cartWithProducts.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0);
  };

  const calculateTotalItems = () => {
    return cartWithProducts.reduce((total, item) => total + item.quantity, 0);
  };

  const FAQ = [
    { question: t.faqQuestion1, answer: t.faqAnswer1 },
    { question: t.faqQuestion2, answer: t.faqAnswer2 },
    { question: t.faqQuestion3, answer: t.faqAnswer3 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="bg-gray-100 min-h-screen pt-20 md:pt-28">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">{t.title}</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items or Empty State */}
          <div className="w-full lg:w-2/3">
            {(!cartWithProducts || cartWithProducts.length === 0) ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center bg-white rounded-lg shadow-lg p-8 mb-8"
              >
                <ShoppingCart size={80} className="mx-auto text-gray-400 mb-6" />
                <p className="text-xl md:text-2xl text-gray-600 mb-8">{t.empty}</p>
                <Link to="/product" className="bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition-colors inline-flex items-center text-lg">
                  <ArrowLeft size={24} className="mr-2" />
                  {t.continueShopping}
                </Link>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden mb-8"
              >
                <div className="p-4 md:p-6">
                  <AnimatePresence>
                    {cartWithProducts.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col md:flex-row items-start border-b border-gray-200 py-6 last:border-b-0"
                      >
                        <div className="w-full md:w-1/3 mb-4 md:mb-0">
                          <img 
                            src={
                              item.filepath 
                                ? `http://localhost:4010/uploads/${item.filepath.toString().replace(/^uploads\\/, '').replace(/\\/g, '/')}`
                                : '/api/placeholder/400/320'
                            }
                            alt={item.name || t.unnamedProduct} 
                            onError={(e) => {
                              e.target.src = '/api/placeholder/400/320';
                              e.target.onerror = null;
                            }}
                            className="w-full h-48 object-cover rounded-lg" 
                          />
                        </div>

                        <div className="md:ml-6 flex-1">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {item.name || t.unnamedProduct}
                          </h3>
                          <div className="grid gap-2">
                            <div className="flex items-center">
                              <span className="font-medium text-gray-700 w-24">{t.price}:</span>
                              <span className="text-blue-600">
                                ₹{parseFloat(item.price || 0).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium text-gray-700 w-24">{t.category}:</span>
                              <span className="text-gray-600">
                                {item.category || t.uncategorized}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-medium text-gray-700 w-24">{t.quantity}:</span>
                              <span className="text-gray-600">
                                {item.quantity || 1}
                              </span>
                            </div>
                            <div className="flex items-start">
                              <span className="font-medium text-gray-700 w-24">{t.description}:</span>
                              <span className="text-gray-600">
                                {item.description || t.noDescription}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Why Shop With Us Section - Always Visible */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6"
            >
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
            </motion.div>

            {/* FAQ Section - Always Visible */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-lg p-4 md:p-6"
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
          </div>

          {/* Right Column - Order Summary (Only visible when cart has items) */}
          {cartWithProducts && cartWithProducts.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-1/3"
            >
              <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-6">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">{t.orderSummary}</h2>
                <div className="flex justify-between mb-2">
                  <span>{t.totalItems}</span>
                  <span className="font-medium">{calculateTotalItems()}</span>
                </div>
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
                    <span className="text-lg md:text-xl font-semibold">{t.total}</span>
                    <span className="text-xl md:text-2xl font-bold text-blue-600">₹{calculateSubtotal().toFixed(2)}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAddressModal(true)}
                  className="w-full bg-blue-500 text-white py-2 md:py-3 px-4 rounded-full hover:bg-blue-600 transition-colors text-base md:text-lg font-semibold mb-4"
                >
                  {t.checkout}
                </button>
                <Link to="/product" className="block text-center text-blue-500 hover:text-blue-600 transition-colors">
                  {t.continueShopping}
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>

     {/* Address Modal */}
<AnimatePresence>
  {showAddressModal && (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">{t.addAddress}</h2>
        <form onSubmit={handleAddressSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block mb-1 font-medium">{t.fullName}</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={addressFormData.fullName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block mb-1 font-medium">{t.phoneNumber}</label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={addressFormData.phoneNumber}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="doorNo" className="block mb-1 font-medium">{t.doorNo}</label>
              <input
                type="text"
                id="doorNo"
                name="doorNo"
                value={addressFormData.doorNo}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="street" className="block mb-1 font-medium">{t.street}</label>
              <input
                type="text"
                id="street"
                name="street"
                value={addressFormData.street}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="address" className="block mb-1 font-medium">{t.address}</label>
            <input
              type="text"
              id="address"
              name="address"
              value={addressFormData.address}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="city" className="block mb-1 font-medium">{t.city}</label>
              <input
                type="text"
                id="city"
                name="city"
                value={addressFormData.city}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="state" className="block mb-1 font-medium">{t.state}</label>
              <input
                type="text"
                id="state"
                name="state"
                value={addressFormData.state}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <div>
              <label htmlFor="pincode" className="block mb-1 font-medium">{t.pincode}</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={addressFormData.pincode}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              />
            </div>
            <div>
              <label htmlFor="primaryOrSecondary" className="block mb-1 font-medium">{t.primaryOrSecondary}</label>
              <select
                id="primaryOrSecondary"
                name="primaryOrSecondary"
                value={addressFormData.primaryOrSecondary}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                required
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={() => setShowAddressModal(false)}
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors mr-2"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              {t.submit}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
</div>
);
};

export default Cart;