"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface ProductCardProps {
  product: Product;
  onViewDetails?: () => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = React.useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    setIsAddingToCart(true);
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to add to cart');
      }

      Swal.fire({
        title: 'Success!',
        text: 'Added to cart successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#10b981'
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add item to cart. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setIsAddingToCart(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="card overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300"
      onClick={onViewDetails}
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <div className="absolute top-2 right-2 bg-secondary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Featured
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
          {/* <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-4 h-4 text-yellow-500"
            >
              <path 
                fillRule="evenodd" 
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">{product.rating}</span>
          </div> */}
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-bold text-primary-700 dark:text-primary-300">
            ${product.price.toFixed(2)}
          </span>
          <div className="text-sm px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </div>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary text-sm flex-1"
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || isAddingToCart}
          >
            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-sm flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails?.();
            }}
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
