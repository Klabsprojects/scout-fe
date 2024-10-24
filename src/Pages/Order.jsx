import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, ChevronDown, ChevronUp, Clock, MapPin, Calendar, IndianRupee, Box } from 'lucide-react';
import api from '../apiConfig/api';
import { toast } from 'react-toastify';
import { useAuthStore } from '../Zustand/authStore';

const OrdersPage = () => {
  const { userId } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState({});
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    fetchOrders();
    fetchAddresses();
  }, [userId]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/listOrder');
      if (response.data && response.data.results) {
        // Filter orders for the current user
        const userOrders = response.data.results.filter(
          order => order.orderBy === parseInt(userId)
        );
        // Sort orders by ID in descending order (newest first)
        const sortedOrders = userOrders.sort((a, b) => b.id - a.id);
        setOrders(sortedOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const response = await api.get(`api/listAddress?loginId=${userId}`);
      if (response.data && response.data.results) {
        const addressMap = {};
        response.data.results.forEach(address => {
          addressMap[address.id] = address;
        });
        setAddresses(addressMap);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const toggleOrderExpansion = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center mb-8 pt-10">Your Orders</h1>

          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-700 mb-2">No Orders Found</h2>
              <p className="text-gray-500">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="p-6 border-b">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="text-blue-500" size={20} />
                          <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>{formatDate(order.createdAt || new Date())}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <IndianRupee size={16} />
                            <span>₹{order.totalPrice}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Box size={16} />
                            <span>{order.quantity} items</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleOrderExpansion(order.id)}
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        {expandedOrders[order.id] ? (
                          <ChevronUp size={24} />
                        ) : (
                          <ChevronDown size={24} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {expandedOrders[order.id] && (
                    <div className="p-6 bg-gray-50">
                      {/* Delivery Details */}
                      {addresses[order.addressId] && (
                        <div className="mb-6">
                          <h4 className="flex items-center gap-2 font-semibold mb-3">
                            <MapPin className="text-blue-500" size={18} />
                            Delivery Address
                          </h4>
                          <div className="ml-6 text-gray-600">
                            <p className="font-medium">{addresses[order.addressId].fullName}</p>
                            <p>{addresses[order.addressId].doorNo}, {addresses[order.addressId].street}</p>
                            <p>{addresses[order.addressId].address}</p>
                            <p>{addresses[order.addressId].city}, {addresses[order.addressId].state} - {addresses[order.addressId].pincode}</p>
                            <p>Phone: {addresses[order.addressId].phoneNumber}</p>
                          </div>
                        </div>
                      )}

                      {/* Order Status */}
                      <div>
                        <h4 className="flex items-center gap-2 font-semibold mb-3">
                          <Clock className="text-blue-500" size={18} />
                          Order Status
                        </h4>
                        <div className="ml-6">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-gray-600">Order Confirmed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default OrdersPage;