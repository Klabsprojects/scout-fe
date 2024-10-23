// Part 1: Imports and Initial Setup
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Truck, ChevronRight, CheckCircle, Plus } from 'lucide-react';
import api from '../apiConfig/api';
import { toast } from 'react-toastify';
import useAuthStore from '../Zustand/authStore';


const CheckoutPage = () => {
  const navigate = useNavigate();
  const { userId } = useAuthStore();
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

  // Debug cartItems changes
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

  // Fetch functions
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
      toast.error('Failed to fetch addresses');
    } finally {
      setIsLoadingAddresses(false);
    }
  };

// Update these functions in your component

const fetchCartItems = async () => {
  try {
    const response = await api.get(`/api/listCart?loginId=${userId}`);
    console.log('Cart Response:', response.data);
    
    if (response.data && response.data.results) {
      const cartItems = response.data.results;
      
      // Fetch product details to get prices
      const productResponse = await api.get('/api/listProduct');
      const products = productResponse.data.results || [];
      
      // Create price lookup
      const productPrices = {};
      products.forEach(product => {
        productPrices[product.id] = parseFloat(product.price);
      });

      // Process cart items with prices
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
    toast.error('Failed to fetch cart items');
  }
};

const calculateTotalPrice = () => {
  try {
    const total = cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity);
      const subtotal = price * quantity;
      console.log('Item calculation:', { 
        productId: item.productId, 
        price, 
        quantity, 
        subtotal 
      });
      return sum + subtotal;
    }, 0);
    console.log('Total calculated:', total);
    return total.toFixed(2);
  } catch (error) {
    console.error('Price calculation error:', error);
    return '0.00';
  }
};

const handlePlaceOrder = async () => {
  if (!selectedAddress) {
    toast.error('Please select a delivery address');
    return;
  }

  if (!cartItems || cartItems.length === 0) {
    toast.error('Your cart is empty');
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

    const response = await api.post('http://localhost:4010/api/addOrder', orderData);
    
    if (response.data && response.data.message === "created successfully") {
      setShowSuccessModal(true); // Show modal instead of immediate navigation
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
    
    toast.error(
      error.response?.data?.message || 
      'Failed to place order. Please try again.'
    );
  } finally {
    setLoading(false);
  }
};

// Add this debug effect
useEffect(() => {
  if (cartItems.length > 0) {
    console.log('Cart data for debugging:', {
      items: cartItems,
      totalPrice: calculateTotalPrice(),
      sampleItem: cartItems[0]
    });
  }
}, [cartItems]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.doorNo.trim()) newErrors.doorNo = 'Door number is required';
    if (!formData.street.trim()) newErrors.street = 'Street is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    
    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    try {
      const response = await api.post('api/addAddress', {
        ...formData,
        loginId: userId
      });

      if (response.data) {
        toast.success('Address saved successfully!');
        setShowAddressForm(false);
        fetchAddresses();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save address');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8 pt-10">Checkout</h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <div className="flex items-center mb-6">
            <MapPin className="text-blue-500 mr-2" size={24} />
            <h2 className="text-xl font-semibold">Select Delivery Address</h2>
          </div>

          {isLoadingAddresses ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : !showAddressForm ? (
            <>
              {addresses.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">No addresses found</p>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mx-auto"
                  >
                    <Plus size={20} className="mr-2" />
                    Add New Address
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
                          <p className="text-gray-600">Phone: {address.phoneNumber}</p>
                          <span className="inline-block mt-2 text-sm px-2 py-1 bg-gray-100 rounded">
                            {address.primaryOrSecondary}
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
                      Add New Address
                    </button>
                    
                    <button
                      onClick={handlePlaceOrder}
                      disabled={loading}
                      className={`flex items-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors
                        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {loading ? 'Processing...' : 'Place Order'}
                      <ChevronRight className="ml-2" size={20} />
                    </button>
                  </div>

                  {cartItems.length > 0 && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="font-medium">Order Summary</p>
                      <p className="text-gray-600">Total Items: {cartItems.length}</p>
                      <p className="text-gray-600">Total Amount: ₹{calculateTotalPrice()}</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Add New Address</h3>
                <button
                  onClick={() => setShowAddressForm(false)}
                  className="text-blue-500 hover:text-blue-600"
                >
                  Cancel
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
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
                      Door No
                    </label>
                    <input
                      type="text"
                      name="doorNo"
                      value={formData.doorNo}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.doorNo ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Apt/Suite number"
                    />
                    {errors.doorNo && <p className="mt-1 text-sm text-red-500">{errors.doorNo}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Street
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.street ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Street name"
                    />
                    {errors.street && <p className="mt-1 text-sm text-red-500">{errors.street}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Full address"
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="City"
                    />
                    {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-md ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="State"
                    />
                    {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode
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
                      Address Type
                    </label>
                    <select
                      name="primaryOrSecondary"
                      value={formData.primaryOrSecondary}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >

<option value="primary">Primary</option>
                      <option value="secondary">Secondary</option>
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
                    {loading ? 'Saving...' : 'Save Address'}
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
            <h2 className="text-xl font-semibold">Delivery Information</h2>
          </div>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={20} />
              Free shipping on all orders
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={20} />
              Estimated delivery: 3-5 business days
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={20} />
              Order tracking available
            </li>
          </ul>
        </motion.div>
      </div>
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
          Order Placed Successfully!
        </h3>
        <p className="text-gray-600 mb-6">
          Thank you for your order. Your order has been placed successfully and will be processed soon.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-gray-600">
            Order Total: <span className="font-semibold">₹{calculateTotalPrice()}</span>
          </p>
          <p className="text-gray-600">
            Total Items: <span className="font-semibold">{cartItems.reduce((sum, item) => sum + parseInt(item.quantity), 0)}</span>
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
  );
};

export default CheckoutPage;