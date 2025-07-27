"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import { Product, Category } from "@/types/product";
import { Spinner } from "./ui/spinner";

const ProductListing = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Failed to load products. Please try again.");
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error loading categories:", err);
        setError("Failed to load categories. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = products
    .filter((product) => !activeCategory || product.categoryId === activeCategory)
    .filter((product) => 
      searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
  const handleProductClick = (productId: string) => {
    setSelectedProduct(productId);
  };
  
  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  return (
    <section id="products" className="container-custom py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mb-10 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-4">
          Our Products
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Browse our complete catalog of high-quality laboratory products
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Spinner size="large" />
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-red-500">{error}</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          {/* Categories on the left */}
          <div className="md:w-1/4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg h-fit sticky top-24">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">Categories</h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-2 text-left rounded text-sm font-medium transition-colors ${
                  activeCategory === null
                    ? "bg-primary-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                All Products
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 text-left rounded text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Right side content */}
          <div className="md:w-3/4">
            {/* Search bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
                <svg
                  className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            
            {/* Products grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 dark:text-gray-400">No products found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onViewDetails={() => handleProductClick(product.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empty block - content moved to the section above */}
      
      <AnimatePresence>
        {selectedProduct && products.length > 0 && (
          <ProductDetail 
            product={products.find(p => p.id === selectedProduct)!} 
            onClose={handleCloseDetail} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductListing;
