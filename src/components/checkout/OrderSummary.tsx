'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CartItem } from '@/types/cart';

interface OrderSummaryProps {
  items: CartItem[];
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items }) => {
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  // Calculate shipping cost (free shipping above $100)
  const shippingCost = subtotal > 100 ? 0 : 10;

  // Calculate total
  const total = subtotal + shippingCost;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
      
      <div className="max-h-[300px] overflow-y-auto mb-6 pr-2">
        {items.map(item => (
          <div key={item.id} className="flex items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-0">
            <div className="relative h-16 w-16 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden mr-3">
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
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.quantity} x ${(item.product?.price || 0).toFixed(2)}</p>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                ${((item.product?.price || 0) * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
          <span className="text-gray-900 dark:text-white font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Shipping</span>
          <span className="text-gray-900 dark:text-white font-medium">
            {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
          <div className="flex justify-between">
            <span className="text-gray-900 dark:text-white font-semibold">Total</span>
            <span className="text-primary-600 font-bold text-xl">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-md">
        <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Important Information:</h3>
        <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-1 list-disc pl-4">
          <li>Orders will be processed within 1-2 business days</li>
          <li>Shipping takes 2-5 business days</li>
          <li>You will receive a confirmation email after your order is placed</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default OrderSummary;