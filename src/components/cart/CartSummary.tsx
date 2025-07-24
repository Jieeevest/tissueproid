'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CartItem } from '@/types/cart';

interface CartSummaryProps {
  items: CartItem[];
  onCheckout: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({ items, onCheckout }) => {
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity;
  }, 0);

  // Calculate shipping cost (example: free shipping above $33)
  const shippingCost = subtotal > 500000 ? 0 : 20000;

  // Calculate total
  const total = subtotal + shippingCost;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
          <span className="text-gray-900 dark:text-white font-medium">${(subtotal/15000).toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Shipping</span>
          <span className="text-gray-900 dark:text-white font-medium">
            {shippingCost === 0 ? 'Free' : `$${(shippingCost/15000).toFixed(2)}`}
          </span>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
          <div className="flex justify-between">
            <span className="text-gray-900 dark:text-white font-semibold">Total</span>
            <span className="text-primary-600 font-bold text-xl">${(total/15000).toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full py-3 px-4 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Proceed to Checkout
      </button>
      
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
        <p>By continuing, you agree to our <a href="#" className="text-primary-600 hover:underline">Terms &amp; Conditions</a>.</p>
      </div>
    </motion.div>
  );
};

export default CartSummary;