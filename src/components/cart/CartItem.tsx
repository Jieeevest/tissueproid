'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= (item.product?.stock || 0)) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  if (!item.product) {
    return null;
  }

  const subtotal = item.product.price * item.quantity;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col md:flex-row items-center justify-between p-4 mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
    >
      <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0 w-full md:w-auto">
        <div className="relative h-24 w-24 mb-4 md:mb-0 md:mr-4 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden">
          <Image 
            src={item.product.image} 
            alt={item.product.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="text-center md:text-left">
          <h3 className="font-medium text-gray-900 dark:text-white">{item.product.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {item.product.category?.name || 'Uncategorized'}
          </p>
          <p className="text-primary-600 font-medium">
            ${item.product.price.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6">
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
          <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Decrease quantity"
          >
            -
          </button>
          
          <span className="px-3 py-1 text-gray-800 dark:text-gray-200">
            {item.quantity}
          </span>
          
          <button 
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={item.quantity >= (item.product?.stock || 0)}
            className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className="text-right md:min-w-[100px]">
          <p className="font-medium text-gray-900 dark:text-white">
            ${subtotal.toFixed(2)}
          </p>
        </div>

        <button 
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          aria-label="Remove item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default CartItem;