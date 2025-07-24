'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Order, OrderStatus, PaymentStatus } from '@/types/order';

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ order }) => {
  // Format date
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // Get status badge color
  const getOrderStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500';
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500';
    }
  };

  // Get payment status badge color
  const getPaymentStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500';
      case 'PAID':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500';
      case 'FAILED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500';
      case 'REFUNDED':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500';
    }
  };

  // Format payment method
  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case 'CREDIT_CARD':
        return 'Credit Card';
      case 'BANK_TRANSFER':
        return 'Bank Transfer';
      case 'PAYPAL':
        return 'PayPal';
      case 'CASH_ON_DELIVERY':
        return 'Cash on Delivery (COD)';
      default:
        return method;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Order Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Order #{order.id.substring(0, 8)}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Order Date: {formatDate(order.createdAt)}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.status)}`}>
              {order.status === 'PENDING' ? 'Pending' :
               order.status === 'PROCESSING' ? 'Processing' :
               order.status === 'SHIPPED' ? 'Shipped' :
               order.status === 'DELIVERED' ? 'Delivered' :
               order.status === 'CANCELLED' ? 'Cancelled' : order.status}
            </span>
            
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
              {order.paymentStatus === 'PENDING' ? 'Unpaid' :
               order.paymentStatus === 'PAID' ? 'Paid' :
               order.paymentStatus === 'FAILED' ? 'Failed' :
               order.paymentStatus === 'REFUNDED' ? 'Refunded' : order.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Order Items</h3>
        
        <div className="space-y-4">
          {order.items.map(item => (
            <div key={item.id} className="flex items-center">
              <div className="relative h-16 w-16 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden mr-4">
                {item.product?.image && (
                  <Image 
                    src={item.product.image} 
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{item.product?.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.quantity} x ${(item.price / 15000).toFixed(2)}</p>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  ${((item.price * item.quantity) / 15000).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Order Summary</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
            <span className="text-gray-900 dark:text-white">${(order.totalAmount / 15000).toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Shipping</span>
            <span className="text-gray-900 dark:text-white">Free</span>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
            <div className="flex justify-between">
              <span className="text-gray-900 dark:text-white font-medium">Total</span>
              <span className="text-primary-600 font-bold">${(order.totalAmount / 15000).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping & Payment Info */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Shipping Information</h3>
          <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{order.shippingAddress}</p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Payment Information</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <span className="font-medium">Method:</span> {formatPaymentMethod(order.paymentMethod)}
          </p>
          
          {order.invoice && (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium">Invoice No.:</span> {order.invoice.invoiceNumber}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium">Invoice Date:</span> {formatDate(order.invoice.issuedDate)}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-1">
                <span className="font-medium">Due Date:</span> {formatDate(order.invoice.dueDate)}
              </p>
              {order.invoice.paidDate && (
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-medium">Payment Date:</span> {formatDate(order.invoice.paidDate)}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OrderDetails;