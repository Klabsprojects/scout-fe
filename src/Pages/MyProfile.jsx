import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../apiConfig/api';
import { useTranslation } from '../Context/TranslationContext';
import { useAuthStore } from '../Zustand/authStore';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const navigate = useNavigate();
  const { isTamil } = useTranslation();
  const { username: storedUsername, userId } = useAuthStore();

  // Profile State
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: storedUsername || '',
    email: localStorage.getItem('email') || '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    }
  });

  // Dummy Orders Data
  const [orders] = useState([
    {
      id: 'ORD001',
      date: '2024-02-15',
      status: 'Delivered',
      items: [
        { name: 'Scout Uniform', quantity: 1, price: 1200 }
      ],
      total: 1200
    },
    {
      id: 'ORD002',
      date: '2024-03-01',
      status: 'Processing',
      items: [
        { name: 'Scout Badge', quantity: 3, price: 150 },
        { name: 'Scout Cap', quantity: 1, price: 350 }
      ],
      total: 800
    }
  ]);

  const translations = {
    profile: {
      en: 'Profile',
      ta: 'சுயவிவரம்'
    },
    orders: {
      en: 'Orders',
      ta: 'ஆர்டர்கள்'
    },
    address: {
      en: 'Address',
      ta: 'முகவரி'
    },
    personalInfo: {
      en: 'Personal Information',
      ta: 'தனிப்பட்ட தகவல்'
    },
    username: {
      en: 'Username',
      ta: 'பயனர்பெயர்'
    },
    email: {
      en: 'Email',
      ta: 'மின்னஞ்சல்'
    },
    phone: {
      en: 'Phone',
      ta: 'தொலைபேசி'
    },
    street: {
      en: 'Street Address',
      ta: 'தெரு முகவரி'
    },
    city: {
      en: 'City',
      ta: 'நகரம்'
    },
    state: {
      en: 'State',
      ta: 'மாநிலம்'
    },
    pincode: {
      en: 'Pincode',
      ta: 'அஞ்சல் குறியீடு'
    },
    edit: {
      en: 'Edit',
      ta: 'திருத்து'
    },
    save: {
      en: 'Save',
      ta: 'சேமி'
    },
    cancel: {
      en: 'Cancel',
      ta: 'ரத்து செய்'
    },
    orderHistory: {
      en: 'Order History',
      ta: 'ஆர்டர் வரலாறு'
    },
    orderNumber: {
      en: 'Order Number',
      ta: 'ஆர்டர் எண்'
    },
    orderDate: {
      en: 'Order Date',
      ta: 'ஆர்டர் தேதி'
    },
    status: {
      en: 'Status',
      ta: 'நிலை'
    },
    total: {
      en: 'Total',
      ta: 'மொத்தம்'
    },
    updateSuccess: {
      en: 'Profile updated successfully',
      ta: 'சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது'
    }
  };

  useEffect(() => {
    // Fetch user profile data
    const fetchProfileData = async () => {
      try {
        const response = await api.get(`/api/profile/${userId}`);
        if (response.data) {
          setProfileData(prevData => ({
            ...prevData,
            ...response.data
          }));
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    if (userId) {
      fetchProfileData();
    }
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setProfileData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/profile/${userId}`, profileData);
      toast.success(translations.updateSuccess[isTamil ? 'ta' : 'en']);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(isTamil ? 'புதுப்பிப்பதில் பிழை' : 'Error updating profile');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          {/* Profile Header */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {['profile', 'orders', 'address'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  {translations[tab][isTamil ? 'ta' : 'en']}
                </button>
              ))}
            </nav>
          </div>

          {/* Profile Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {translations.personalInfo[isTamil ? 'ta' : 'en']}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {translations.username[isTamil ? 'ta' : 'en']}
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={profileData.username}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {translations.email[isTamil ? 'ta' : 'en']}
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {translations.phone[isTamil ? 'ta' : 'en']}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    {isEditing ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          {translations.cancel[isTamil ? 'ta' : 'en']}
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                        >
                          {translations.save[isTamil ? 'ta' : 'en']}
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        {translations.edit[isTamil ? 'ta' : 'en']}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {translations.orderHistory[isTamil ? 'ta' : 'en']}
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {translations.orderNumber[isTamil ? 'ta' : 'en']}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {translations.orderDate[isTamil ? 'ta' : 'en']}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {translations.status[isTamil ? 'ta' : 'en']}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {translations.total[isTamil ? 'ta' : 'en']}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(order.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₹{order.total}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'address' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">
                  {translations.address[isTamil ? 'ta' : 'en']}
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {translations.street[isTamil ? 'ta' : 'en']}
                      </label>
                      <input
                        type="text"
                        name="address.street"
                        value={profileData.address.street}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        {translations.city[isTamil ? 'ta' : 'en']}
                      </label>

                      <input
                      type="text"
                      name="address.city"
                      value={profileData.address.city}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {translations.state[isTamil ? 'ta' : 'en']}
                    </label>
                    <input
                      type="text"
                      name="address.state"
                      value={profileData.address.state}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      {translations.pincode[isTamil ? 'ta' : 'en']}
                    </label>
                    <input
                      type="text"
                      name="address.pincode"
                      value={profileData.address.pincode}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        {translations.cancel[isTamil ? 'ta' : 'en']}
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                      >
                        {translations.save[isTamil ? 'ta' : 'en']}
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                      {translations.edit[isTamil ? 'ta' : 'en']}
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
};

export default MyProfile;