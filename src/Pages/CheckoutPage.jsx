import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, CreditCard, Truck, ChevronRight, CheckCircle, Plus, RadioButton } from 'lucide-react';
import api from '../apiConfig/api';
import { toast } from 'react-toastify';
import useAuthStore from '../Zustand/authStore';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { userId } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(true);

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

  // Fetch addresses when component mounts
  useEffect(() => {
    fetchAddresses();
  }, [userId]);

  const fetchAddresses = async () => {
    try {
      setIsLoadingAddresses(true);
      const response = await api.get(`api/listAddress?loginId=${userId}`);
      if (response.data && response.data.results) {
        setAddresses(response.data.results);
        // Select the first address by default if available
        if (response.data.results.length > 0) {
          setSelectedAddress(response.data.results[0].id);
        }
      }
    } catch (error) {
      toast.error('Failed to fetch addresses');
      console.error('Error fetching addresses:', error);
    } finally {
      setIsLoadingAddresses(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.doorNo.trim()) {
      newErrors.doorNo = 'Door number is required';
    }
    
    if (!formData.street.trim()) {
      newErrors.street = 'Street is required';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
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
        fetchAddresses(); // Refresh the address list
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save address. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContinueToPayment = () => {
    if (!selectedAddress) {
      toast.error('Please select an address to continue');
      return;
    }
    setStep(2);
  };

  const renderProgressBar = () => (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            <MapPin size={20} />
          </div>
          <span className="ml-2 font-medium">Shipping</span>
        </div>
        <div className="flex-1 mx-4 h-1 bg-gray-200">
          <div className={`h-full bg-blue-500 transition-all duration-300`} style={{ width: `${(step - 1) * 50}%` }}></div>
        </div>
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
            <CreditCard size={20} />
          </div>
          <span className="ml-2 font-medium">Payment</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8 pt-10">Checkout</h1>
        
        {renderProgressBar()}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          {step === 1 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <MapPin className="text-blue-500 mr-2" size={24} />
                  <h2 className="text-xl font-semibold">Select Delivery Address</h2>
                </div>
                {!showAddressForm && (
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    <Plus size={20} className="mr-2" />
                    Add New Address
                  </button>
                )}
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

                      <div className="flex justify-end mt-6">
                        <button
                          onClick={handleContinueToPayment}
                          className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                        >
                          Continue to Payment
                          <ChevronRight className="ml-2" size={20} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                // Address Form Section
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

                  {/* Form content goes here - will be in Part 3 */}

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
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
              <h2 className="text-2xl font-semibold mb-4">Ready for Payment!</h2>
              <p className="text-gray-600 mb-6">Your shipping address has been confirmed.</p>
              <button
                onClick={() => navigate('/payment')}
                className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors mx-auto"
              >
                Proceed to Payment
                <ChevronRight className="ml-2" size={20} />
              </button>
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
    </div>
  );
};

export default CheckoutPage;