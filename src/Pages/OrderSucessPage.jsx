import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 mt-20">
      <div className="max-w-3xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 mt-10"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="text-green-500" size={40} />
            </motion.div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Order Placed Successfully!
            </h1>
            
            <p className="text-gray-600 text-lg mb-8">
              Thank you for your purchase. We'll send you a confirmation email with your order details.
            </p>

            <div className="space-y-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-center mb-4">
                  <Package className="text-blue-500 mr-2" size={24} />
                  <h2 className="text-xl font-semibold">Order Information</h2>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    Your order has been received and is now being processed
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    <Truck className="text-blue-500" size={20} />
                    <p className="text-gray-600">
                      Estimated delivery: 3-5 business days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center justify-center px-6 py-3 border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition-colors"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back to Home
              </button>
              
              <button
                onClick={() => navigate('/orders')}
                className="flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                View Orders
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;