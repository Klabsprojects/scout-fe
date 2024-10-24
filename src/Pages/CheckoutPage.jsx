import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Truck, ChevronRight, CheckCircle, Plus } from 'lucide-react';
import api from '../apiConfig/api';
import { toast } from 'react-toastify';
import { useAuthStore } from '../Zustand/authStore';
import { useTranslation } from '../Context/TranslationContext';

// Translation object for all text content
const translations = {
  english: {
    checkout: "Checkout",
    selectDeliveryAddress: "Select Delivery Address",
    noAddressFound: "No addresses found",
    addNewAddress: "Add New Address",
    placeOrder: "Place Order",
    processing: "Processing...",
    orderSummary: "Order Summary",
    totalItems: "Total Items",
    totalAmount: "Total Amount",
    deliveryInfo: "Delivery Information",
    freeShipping: "Free shipping on all orders",
    estimatedDelivery: "Estimated delivery: 3-5 business days",
    orderTracking: "Order tracking available",
    orderSuccess: "Order Placed Successfully!",
    orderThankYou: "Thank you for your order. Your order has been placed successfully and will be processed soon.",
    // Form labels
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    doorNo: "Door No",
    street: "Street",
    address: "Address",
    city: "City",
    state: "State",
    pincode: "Pincode",
    addressType: "Address Type",
    primary: "Primary",
    secondary: "Secondary",
    cancel: "Cancel",
    save: "Save Address",
    saving: "Saving..."
  },
  tamil: {
    checkout: "செக்அவுட்",
    selectDeliveryAddress: "டெலிவரி முகவரியைத் தேர்ந்தெடுக்கவும்",
    noAddressFound: "முகவரி எதுவும் கிடைக்கவில்லை",
    addNewAddress: "புதிய முகவரியைச் சேர்க்கவும்",
    placeOrder: "ஆர்டர் செய்யவும்",
    processing: "செயலாக்கம்...",
    orderSummary: "ஆர்டர் சுருக்கம்",
    totalItems: "மொத்த பொருட்கள்",
    totalAmount: "மொத்த தொகை",
    deliveryInfo: "டெலிவரி தகவல்",
    freeShipping: "அனைத்து ஆர்டர்களுக்கும் இலவச ஷிப்பிங்",
    estimatedDelivery: "மதிப்பிடப்பட்ட டெலிவரி: 3-5 வேலை நாட்கள்",
    orderTracking: "ஆர்டர் டிராக்கிங் கிடைக்கும்",
    orderSuccess: "ஆர்டர் வெற்றிகரமாக வைக்கப்பட்டது!",
    orderThankYou: "உங்கள் ஆர்டருக்கு நன்றி. உங்கள் ஆர்டர் வெற்றிகரமாக வைக்கப்பட்டு விரைவில் செயலாக்கப்படும்.",
    // Form labels
    fullName: "முழு பெயர்",
    phoneNumber: "தொலைபேசி எண்",
    doorNo: "கதவு எண்",
    street: "தெரு",
    address: "முகவரி",
    city: "நகரம்",
    state: "மாநிலம்",
    pincode: "பின்கோட்",
    addressType: "முகவரி வகை",
    primary: "முதன்மை",
    secondary: "இரண்டாம்",
    cancel: "ரத்து செய்",
    save: "முகவரியை சேமி",
    saving: "சேமிக்கிறது..."
  }
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { userId } = useAuthStore();
  const { isTamil } = useTranslation();
  const t = translations[isTamil ? 'tamil' : 'english'];
  
  // States
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    doorNo: '',
    street: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    primaryOrSecondary: 'primary'
  });

  const [errors, setErrors] = useState({});

  // Form validation messages
  const errorMessages = {
    english: {
      fullNameRequired: 'Full name is required',
      phoneRequired: 'Phone number is required',
      phoneInvalid: 'Please enter a valid 10-digit phone number',
      doorRequired: 'Door number is required',
      streetRequired: 'Street is required',
      addressRequired: 'Address is required',
      cityRequired: 'City is required',
      stateRequired: 'State is required',
      pincodeRequired: 'Pincode is required',
      pincodeInvalid: 'Please enter a valid 6-digit pincode'
    },
    tamil: {
      fullNameRequired: 'முழு பெயர் தேவை',
      phoneRequired: 'தொலைபேசி எண் தேவை',
      phoneInvalid: 'சரியான 10-இலக்க தொலைபேசி எண்ணை உள்ளிடவும்',
      doorRequired: 'கதவு எண் தேவை',
      streetRequired: 'தெரு தேவை',
      addressRequired: 'முகவரி தேவை',
      cityRequired: 'நகரம் தேவை',
      stateRequired: 'மாநிலம் தேவை',
      pincodeRequired: 'பின்கோட் தேவை',
      pincodeInvalid: 'சரியான 6-இலக்க பின்கோடை உள்ளிடவும்'
    }
  };

  // Toast messages
  const toastMessages = {
    english: {
      addressFetchError: 'Failed to fetch addresses',
      cartFetchError: 'Failed to fetch cart items',
      selectAddress: 'Please select a delivery address',
      emptyCart: 'Your cart is empty',
      orderFailed: 'Failed to place order. Please try again.',
      addressSaved: 'Address saved successfully!',
      addressSaveError: 'Failed to save address',
      cartDeleteError: 'Failed to delete cart items'
    },
    tamil: {
      addressFetchError: 'முகவரிகளை பெற முடியவில்லை',
      cartFetchError: 'கார்ட் பொருட்களை பெற முடியவில்லை',
      selectAddress: 'டெலிவரி முகவரியை தேர்ந்தெடுக்கவும்',
      emptyCart: 'உங்கள் கார்ட் காலியாக உள்ளது',
      orderFailed: 'ஆர்டர் செய்ய முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
      addressSaved: 'முகவரி வெற்றிகரமாக சேமிக்கப்பட்டது!',
      addressSaveError: 'முகவரியை சேமிக்க முடியவில்லை',
      cartDeleteError: 'கார்ட் பொருட்களை நீக்க முடியவில்லை'
    }
  };

  // Debug cart items changes
  useEffect(() => {
    if (cartItems.length > 0) {
      console.log('Cart Data:', {
        items: cartItems,
        firstItem: cartItems[0],
        totalItems: cartItems.length
      });
    }
  }, [cartItems]);

  useEffect(() => {
    const loadInitialData = async () => {
      await Promise.all([fetchAddresses(), fetchCartItems()]);
    };
    loadInitialData();
  }, [userId]);

  const validateForm = () => {
    const newErrors = {};
    const errMsgs = errorMessages[isTamil ? 'tamil' : 'english'];
    
    if (!formData.fullName.trim()) newErrors.fullName = errMsgs.fullNameRequired;
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = errMsgs.phoneRequired;
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = errMsgs.phoneInvalid;
    }
    
    if (!formData.doorNo.trim()) newErrors.doorNo = errMsgs.doorRequired;
    if (!formData.street.trim()) newErrors.street = errMsgs.streetRequired;
    if (!formData.address.trim()) newErrors.address = errMsgs.addressRequired;
    if (!formData.city.trim()) newErrors.city = errMsgs.cityRequired;
    if (!formData.state.trim()) newErrors.state = errMsgs.stateRequired;
    
    if (!formData.pincode) {
      newErrors.pincode = errMsgs.pincodeRequired;
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = errMsgs.pincodeInvalid;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchAddresses = async () => {
    try {
      setIsLoadingAddresses(true);
      const response = await api.get(`api/listAddress?loginId=${userId}`);
      if (response.data && response.data.results) {
        setAddresses(response.data.results);
        if (response.data.results.length > 0) {
          setSelectedAddress(response.data.results[0].id);
        }
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
      toast.error(toastMessages[isTamil ? 'tamil' : 'english'].addressFetchError);
    } finally {
      setIsLoadingAddresses(false);
    }
  };
  
  const fetchCartItems = async () => {
    try {
      const response = await api.get(`/api/listCart?loginId=${userId}`);
      console.log('Cart Response:', response.data);
      
      if (response.data && response.data.results) {
        const cartItems = response.data.results;
        
        const productResponse = await api.get('/api/listProduct');
        const products = productResponse.data.results || [];
        
        const productPrices = {};
        products.forEach(product => {
          productPrices[product.id] = parseFloat(product.price);
        });

        const processedItems = cartItems.map(item => ({
          ...item,
          price: productPrices[item.productId] || 0,
          quantity: parseInt(item.quantity)
        }));

        console.log('Processed cart items:', processedItems);
        setCartItems(processedItems);
      }
    } catch (error) {
      console.error('Cart fetch error:', error);
      toast.error(toastMessages[isTamil ? 'tamil' : 'english'].cartFetchError);
    }
  };
  
  const calculateTotalPrice = () => {
    try {
      const total = cartItems.reduce((sum, item) => {
        const price = parseFloat(item.price);
        const quantity = parseInt(item.quantity);
        const subtotal = price * quantity;
        return sum + subtotal;
      }, 0);
      return total.toFixed(2);
    } catch (error) {
      console.error('Price calculation error:', error);
      return '0.00';
    }
  };
  const handlePlaceOrder = async () => {
    const msgs = toastMessages[isTamil ? 'tamil' : 'english'];
  
    if (!selectedAddress) {
      toast.error(msgs.selectAddress);
      return;
    }
  
    if (!cartItems || cartItems.length === 0) {
      toast.error(msgs.emptyCart);
      return;
    }
  
    setLoading(true);
    try {
      const totalQuantity = cartItems.reduce((sum, item) => 
        sum + parseInt(item.quantity), 0
      );
  
      const products = cartItems.map(item => ({
        productId: parseInt(item.productId),
        quantity: parseInt(item.quantity)
      }));
  
      const totalPrice = calculateTotalPrice();
  
      const orderData = {
        orderBy: parseInt(userId),
        addressId: parseInt(selectedAddress),
        totalPrice: parseFloat(totalPrice),
        quantity: totalQuantity,
        products: products
      };
  
      const response = await api.post('/api/addOrder', orderData);
      
      if (response.data && response.data.message === "Created successfully") {
        // Clear cart after successful order
        try {
          await Promise.all(cartItems.map(async (item) => {
            await api.delete(`/api/deleteCart?productId=${item.productId}&loginId=${userId}`);
          }));
          setCartItems([]);
        } catch (error) {
          console.error('Failed to clear cart:', error);
          toast.error(msgs.cartDeleteError);
        }
  
        setShowSuccessModal(true);
        setSuccessModalData({
          totalPrice: parseFloat(totalPrice), // Convert to number explicitly
          totalQuantity: totalQuantity
        });
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate('/order-success');
        }, 2000);
      }
    } catch (error) {
      console.error('Order error details:', {
        message: error.message,
        response: error.response?.data,
        data: error.response?.data?.message
      });
      
      toast.error(msgs.orderFailed);
    } finally {
      setLoading(false);
    }
  };

  const [successModalData, setSuccessModalData] = useState({
    totalPrice: 0,
    totalQuantity: 0
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setLoading(true);
    const msgs = toastMessages[isTamil ? 'tamil' : 'english'];
    try {
      const response = await api.post('api/addAddress', {
        ...formData,
        loginId: userId
      });
  
      if (response.data) {
        toast.success(msgs.addressSaved);
        setShowAddressForm(false);
        fetchAddresses();
      }
    } catch (error) {
      toast.error(msgs.addressSaveError);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8 pt-10">{t.checkout}</h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center mb-6">
            <MapPin className="text-blue-500 mr-2" size={24} />
            <h2 className="text-xl font-semibold">{t.selectDeliveryAddress}</h2>
          </div>
  
          {isLoadingAddresses ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : !showAddressForm ? (
            <>
              {addresses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">{t.noAddressFound}</p>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mx-auto"
                  >
                    <Plus size={20} className="mr-2" />
                    {t.addNewAddress}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        selectedAddress === address.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedAddress(address.id)}
                    >
                      <div className="flex items-start">
                        <input
                          type="radio"
                          checked={selectedAddress === address.id}
                          onChange={() => setSelectedAddress(address.id)}
                          className="mt-1 mr-4"
                        />
                        <div>
                          <p className="font-medium">{address.fullName}</p>
                          <p className="text-gray-600">
                            {address.doorNo}, {address.street}
                          </p>
                          <p className="text-gray-600">{address.address}</p>
                          <p className="text-gray-600">
                            {address.city}, {address.state} - {address.pincode}
                          </p>
                          <p className="text-gray-600">{t.phoneNumber}: {address.phoneNumber}</p>
                          <span className="inline-block mt-2 text-sm px-2 py-1 bg-gray-100 rounded">
                            {address.primaryOrSecondary === 'primary' ? t.primary : t.secondary}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
  
                  <div className="flex justify-between items-center mt-6">
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="flex items-center px-4 py-2 text-blue-500 hover:text-blue-600"
                    >
                      <Plus size={20} className="mr-2" />
                      {t.addNewAddress}
                    </button>
                    
                    <button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      className={`flex items-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors
                        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {loading ? t.processing : t.placeOrder}
                      <ChevronRight className="ml-2" size={20} />
                    </button>
                  </div>
  
                  {cartItems.length > 0 && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium">{t.orderSummary}</p>
                      <p className="text-gray-600">{t.totalItems}: {cartItems.length}</p>
                      <p className="text-gray-600">{t.totalAmount}: ₹{calculateTotalPrice()}</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">{t.addNewAddress}</h3>
                <button
                  onClick={() => setShowAddressForm(false)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {t.cancel}
                </button>
              </div>
  
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.fullName}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder={t.fullName}
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                  </div>
  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.phoneNumber}
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="1234567890"
                    />
                    {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
                  </div>
  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.doorNo}
                    </label>
                    <input
                      type="text"
                      name="doorNo"
                      value={formData.doorNo}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.doorNo ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder={t.doorNo}
                    />
                    {errors.doorNo && <p className="mt-1 text-sm text-red-500">{errors.doorNo}</p>}
                  </div>
  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.street}
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.street ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder={t.street}
                    />
                    {errors.street && <p className="mt-1 text-sm text-red-500">{errors.street}</p>}
                  </div>
  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.address}
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder={t.address}
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                  </div>
  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.city}
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder={t.city}
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                  </div>
  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.state}
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder={t.state}
                    />
                    {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                  </div>
  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.pincode}
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.pincode ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="123456"
                    />
                    {errors.pincode && <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>}
                  </div>
  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t.addressType}
                    </label>
                    <select
                      name="primaryOrSecondary"
                      value={formData.primaryOrSecondary}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="primary">{t.primary}</option>
                      <option value="secondary">{t.secondary}</option>
                    </select>
                  </div>
                </div>
  
                <div className="flex justify-end mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`flex items-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors
                      ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading ? t.saving : t.save}
                    <ChevronRight className="ml-2" size={20} />
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>

        {/* Delivery Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-lg shadow-lg p-6 mt-6"
      >
        <div className="flex items-center mb-4">
          <Truck className="text-blue-500 mr-2" size={24} />
          <h2 className="text-xl font-semibold">{t.deliveryInfo}</h2>
        </div>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-center">
            <CheckCircle className="text-green-500 mr-2" size={20} />
            {t.freeShipping}
          </li>
          <li className="flex items-center">
            <CheckCircle className="text-green-500 mr-2" size={20} />
            {t.estimatedDelivery}
          </li>
          <li className="flex items-center">
            <CheckCircle className="text-green-500 mr-2" size={20} />
            {t.orderTracking}
          </li>
        </ul>
      </motion.div>




{/* Success Modal */}
{showSuccessModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <motion.div 
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="text-green-500" size={32} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {t.orderSuccess}
        </h3>
        <p className="text-gray-600 mb-6">
          {t.orderThankYou}
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-gray-600">
            {t.totalAmount}: <span className="font-semibold">₹{typeof successModalData.totalPrice === 'number' 
              ? successModalData.totalPrice.toFixed(2) 
              : parseFloat(successModalData.totalPrice).toFixed(2)}
            </span>
          </p>
          <p className="text-gray-600">
            {t.totalItems}: <span className="font-semibold">
              {successModalData.totalQuantity}
            </span>
          </p>
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2 }}
          className="h-1 bg-green-500 absolute bottom-0 left-0 rounded-full"
        />
      </div>
    </motion.div>
  </div>
)}
</div>
</div>

);
};

export default CheckoutPage;