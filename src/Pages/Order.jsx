import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, ChevronDown, ChevronUp, MapPin, 
  Calendar, IndianRupee, Box, ShieldCheck, Clock
} from 'lucide-react';
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
        const userOrders = response.data.results.filter(
          order => order.orderBy === parseInt(userId)
        );
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
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 font-medium">Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center gap-3 mb-12 pt-10">
            <ShieldCheck className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Order History</h1>
          </div>

          {orders.length === 0 ? (
            <motion.div 
              className="bg-white rounded-2xl shadow-xl p-12 text-center max-w-2xl mx-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Package className="w-20 h-20 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">No Orders Yet</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Your order history will appear here once you start making purchases.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                          <div className="flex items-center gap-2">
                            <Calendar className="text-gray-400" size={18} />
                            <span className="text-sm text-gray-600">
                              {formatDate(order.createdAt || new Date())}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <IndianRupee className="text-gray-400" size={18} />
                            <span className="text-sm font-medium text-gray-900">
                              ₹{Number(order.totalPrice).toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Box className="text-gray-400" size={18} />
                            <span className="text-sm text-gray-600">
                              {order.quantity} {order.quantity === 1 ? 'item' : 'items'}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="text-gray-400" size={18} />
                            <span className="text-sm text-gray-600">
                              Estimated Delivery in 3-5 days
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleOrderExpansion(order.id)}
                        className="text-gray-400 hover:text-blue-600 transition-colors p-2 hover:bg-gray-50 rounded-full"
                      >
                        {expandedOrders[order.id] ? (
                          <ChevronUp size={24} />
                        ) : (
                          <ChevronDown size={24} />
                        )}
                      </button>
                    </div>

                    <AnimatePresence>
                      {expandedOrders[order.id] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          {addresses[order.addressId] && (
                            <div className="mt-8 pt-6 border-t border-gray-100">
                              <div className="flex items-start gap-4">
                                <MapPin className="text-blue-600 mt-1" size={20} />
                                <div className="space-y-2">
                                  <h4 className="font-semibold text-gray-900">Delivery Address</h4>
                                  <div className="text-gray-600 space-y-1">
                                    <p className="font-medium">{addresses[order.addressId].fullName}</p>
                                    <p>{addresses[order.addressId].doorNo}, {addresses[order.addressId].street}</p>
                                    <p>{addresses[order.addressId].address}</p>
                                    <p>{addresses[order.addressId].city}, {addresses[order.addressId].state} - {addresses[order.addressId].pincode}</p>
                                    <p className="flex items-center gap-2">
                                      <span className="text-gray-500">Contact:</span>
                                      {addresses[order.addressId].phoneNumber}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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