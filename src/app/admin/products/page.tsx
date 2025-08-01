"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiFilter, FiPackage, FiSave, FiUpload, FiX } from "react-icons/fi";
import Modal from "@/components/admin/Modal";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  featured: boolean;
  rating: number;
  stock: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterFeatured, setFilterFeatured] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<{id: string, name: string}[]>([]);
  
  const [editFormData, setEditFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    categoryId: "",
    featured: false,
    rating: "0",
    stock: "0",
  });

  const [addFormData, setAddFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    categoryId: "",
    featured: false,
    rating: "0",
    stock: "0",
  });

  const [editImagePreview, setEditImagePreview] = useState<string>("");
  const [addImagePreview, setAddImagePreview] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
        setFilteredProducts(data);
        
        // Extract unique categories
        const categories = Array.from(new Set(data.map((product: Product) => 
          product.category?.name || "Uncategorized"
        ))) as string[];
        setUniqueCategories(categories);
      } catch (err) {
        setError("Error loading products. Please try again.");
        console.error(err);
      } finally {
        setIsLoading(false);
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
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);
  
  // Filter products based on search term and filters
  useEffect(() => {
    if (!products.length) return;
    
    let result = [...products];
    
    // Apply search filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(lowercasedSearch) ||
        (product.category?.name || "").toLowerCase().includes(lowercasedSearch) ||
        product.price.toString().includes(lowercasedSearch) ||
        product.stock.toString().includes(lowercasedSearch)
      );
    }
    
    // Apply category filter
    if (filterCategory) {
      result = result.filter(product => 
        (product.category?.name || "Uncategorized") === filterCategory
      );
    }
    
    // Apply featured filter
    if (filterFeatured !== "") {
      const isFeatured = filterFeatured === "true";
      result = result.filter(product => product.featured === isFeatured);
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, filterCategory, filterFeatured]);

  const openDeleteModal = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteModalOpen(true);
  };
  
  const openEditModal = (product: Product) => {
    setCurrentProduct(product);
    setEditFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
      categoryId: product.categoryId,
      featured: product.featured,
      rating: product.rating.toString(),
      stock: product.stock.toString(),
    });
    setEditImagePreview(product.image);
    setIsEditModalOpen(true);
  };

  const openAddModal = () => {
    setAddFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      categoryId: categories.length > 0 ? categories[0].id : "",
      featured: false,
      rating: "0",
      stock: "0",
    });
    setAddImagePreview("");
    setIsAddModalOpen(true);
  };
  
  const handleDelete = async () => {
    if (!currentProduct) return;
    
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/products/${currentProduct.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete product");

      // Remove product from state
      const updatedProducts = products.filter((product) => product.id !== currentProduct.id);
      setProducts(updatedProducts);
      setFilteredProducts(filteredProducts.filter((product) => product.id !== currentProduct.id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleEditChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setEditFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleAddChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setAddFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result as string);
        setEditFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAddImagePreview(reader.result as string);
        setAddFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeEditImage = () => {
    setEditImagePreview("");
    setEditFormData(prev => ({ ...prev, image: "" }));
  };

  const removeAddImage = () => {
    setAddImagePreview("");
    setAddFormData(prev => ({ ...prev, image: "" }));
  };
  
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    try {
      // Convert string values to appropriate types
      const productData = {
        ...addFormData,
        price: parseFloat(addFormData.price),
        rating: parseFloat(addFormData.rating),
        stock: parseInt(addFormData.stock, 10),
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create product");
      }
      
      const newProduct = await res.json();
      
      // Add product to state
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      setFilteredProducts([...filteredProducts, newProduct]);
      
      setIsAddModalOpen(false);
    } catch (err: Error | unknown) {
      console.error("Error creating product:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to create product. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;
    
    setIsSubmitting(true);
    try {
      // Convert string values to appropriate types
      const productData = {
        ...editFormData,
        price: parseFloat(editFormData.price),
        rating: parseFloat(editFormData.rating),
        stock: parseInt(editFormData.stock, 10),
      };

      const res = await fetch(`/api/products/${currentProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to update product");
      }
      
      const updatedProduct = await res.json();
      
      // Update product in state
      const updatedProducts = products.map((product) => 
        product.id === currentProduct.id ? updatedProduct : product
      );
      setProducts(updatedProducts);
      setFilteredProducts(
        filteredProducts.map((product) => 
          product.id === currentProduct.id ? updatedProduct : product
        )
      );
      
      setIsEditModalOpen(false);
    } catch (err: Error | unknown) {
      console.error("Error updating product:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to update product. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleCategoryFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(e.target.value);
  };
  
  const handleFeaturedFilter = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterFeatured(e.target.value);
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setFilterCategory("");
    setFilterFeatured("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <FiPackage className="mr-2" /> Products
        </h1>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors duration-200 flex items-center"
        >
          <FiPlus className="mr-1" /> Add New Product
        </button>
      </div>
      
      {/* Search and Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search products..."
              className="pl-10 w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
            />
          </div>
          
          {/* Category Filter */}
          <div className="relative">
            <select
              value={filterCategory}
              onChange={handleCategoryFilter}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
            >
              <option value="">All Categories</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          {/* Featured Filter */}
          <div className="relative">
            <select
              value={filterFeatured}
              onChange={handleFeaturedFilter}
              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-500 focus:ring-opacity-50"
            >
              <option value="">All Products</option>
              <option value="true">Featured Only</option>
              <option value="false">Non-Featured Only</option>
            </select>
          </div>
        </div>
        
        {/* Filter Status and Clear Button */}
        <div className="mt-4 flex items-center justify-between text-sm">
          <div className="text-gray-500 dark:text-gray-400">
            <span className="font-medium">{filteredProducts.length}</span> of <span className="font-medium">{products.length}</span> products
            {(searchTerm || filterCategory || filterFeatured) && " (filtered)"}
          </div>
          
          {(searchTerm || filterCategory || filterFeatured) && (
            <button
              onClick={clearFilters}
              className="text-primary-500 hover:text-primary-700 dark:hover:text-primary-400 flex items-center transition-colors duration-200"
            >
              <FiFilter className="mr-1" /> Clear Filters
            </button>
          )}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            No products found.
          </p>
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center gap-2 mx-auto w-fit"
          >
            <FiPlus /> Add Your First Product
          </button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            No products match your search criteria.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors duration-200 flex items-center justify-center gap-2 mx-auto"
          >
            <FiFilter /> Clear Filters
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((product) => (
                <tr 
                  key={product.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      ${product.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {product.category?.name || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        product.featured
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {product.featured ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-300">
                      {product.stock}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEditModal(product)}
                        className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 flex items-center transition-colors duration-200"
                        title="Edit Product"
                      >
                        <FiEdit2 className="mr-1" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => openDeleteModal(product)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 flex items-center transition-colors duration-200"
                        title="Delete Product"
                      >
                        <FiTrash2 className="mr-1" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
            <FiTrash2 className="h-6 w-6 text-red-600 dark:text-red-200" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Delete Product
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Are you sure you want to delete <span className="font-semibold">{currentProduct?.name}</span>? This action cannot be undone.
          </p>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 flex-1"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200 flex-1 flex items-center justify-center"
              onClick={handleDelete}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      </Modal>
      
      {/* Edit Product Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Product"
        maxWidth="max-w-4xl"
      >
        <form onSubmit={handleEditSubmit}>
          <div className="space-y-6">
            {/* Basic Information Section */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="lg:col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    required
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    required
                    rows={4}
                    placeholder="Enter detailed product description"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Inventory Section */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Pricing & Inventory</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Price *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">$</span>
                    </div>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={editFormData.price}
                      onChange={handleEditChange}
                      required
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={editFormData.stock}
                    onChange={handleEditChange}
                    min="0"
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="rating"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={editFormData.rating}
                    onChange={handleEditChange}
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="0.0"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Media & Category Section */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Media & Category</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Product Image *
                  </label>
                  <div className="space-y-4">
                    {editImagePreview && (
                      <div className="relative inline-block">
                        <img
                          src={editImagePreview}
                          alt="Preview"
                          className="w-40 h-40 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600 shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={removeEditImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <div className="space-y-3">
                      <div>
                        <input
                          type="file"
                          id="edit-image-upload"
                          accept="image/*"
                          onChange={handleEditImageChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="edit-image-upload"
                          className="w-full px-4 py-3 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-2 border-dashed border-primary-300 dark:border-primary-600 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 cursor-pointer flex items-center justify-center transition-colors"
                        >
                          <FiUpload className="mr-2" /> Choose Image File
                        </label>
                      </div>
                      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                        or
                      </div>
                      <input
                        type="text"
                        name="image"
                        value={editFormData.image}
                        onChange={handleEditChange}
                        placeholder="Enter image URL"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="categoryId"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Category *
                  </label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={editFormData.categoryId}
                    onChange={handleEditChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
                  >
                    {categories.length === 0 && (
                      <option value="">No categories available</option>
                    )}
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Additional Options</h3>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={editFormData.featured as boolean}
                  onChange={handleEditChange}
                  className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
                />
                <label
                  htmlFor="featured"
                  className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Mark as Featured Product
                </label>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Featured products will be highlighted on the homepage and in search results.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Product"
        maxWidth="max-w-4xl"
      >
        <form onSubmit={handleAddSubmit}>
          <div className="space-y-6">
            {/* Basic Information Section */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="lg:col-span-2">
                  <label
                    htmlFor="add-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Product Name *
                  </label>
                  <input
                    type="text"
                    id="add-name"
                    name="name"
                    value={addFormData.name}
                    onChange={handleAddChange}
                    required
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>

                <div className="lg:col-span-2">
                  <label
                    htmlFor="add-description"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Description *
                  </label>
                  <textarea
                    id="add-description"
                    name="description"
                    value={addFormData.description}
                    onChange={handleAddChange}
                    required
                    rows={4}
                    placeholder="Enter detailed product description"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Inventory Section */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Pricing & Inventory</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="add-price"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Price *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">$</span>
                    </div>
                    <input
                      type="number"
                      id="add-price"
                      name="price"
                      value={addFormData.price}
                      onChange={handleAddChange}
                      required
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="add-stock"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    id="add-stock"
                    name="stock"
                    value={addFormData.stock}
                    onChange={handleAddChange}
                    min="0"
                    placeholder="0"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="add-rating"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    id="add-rating"
                    name="rating"
                    value={addFormData.rating}
                    onChange={handleAddChange}
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="0.0"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Media & Category Section */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Media & Category</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Product Image *
                  </label>
                  <div className="space-y-4">
                    {addImagePreview && (
                      <div className="relative inline-block">
                        <img
                          src={addImagePreview}
                          alt="Preview"
                          className="w-40 h-40 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600 shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={removeAddImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors shadow-lg"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    <div className="space-y-3">
                      <div>
                        <input
                          type="file"
                          id="add-image-upload"
                          accept="image/*"
                          onChange={handleAddImageChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="add-image-upload"
                          className="w-full px-4 py-3 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border-2 border-dashed border-primary-300 dark:border-primary-600 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 cursor-pointer flex items-center justify-center transition-colors"
                        >
                          <FiUpload className="mr-2" /> Choose Image File
                        </label>
                      </div>
                      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                        or
                      </div>
                      <input
                        type="text"
                        name="image"
                        value={addFormData.image}
                        onChange={handleAddChange}
                        placeholder="Enter image URL"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="add-categoryId"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Category *
                  </label>
                  <select
                    id="add-categoryId"
                    name="categoryId"
                    value={addFormData.categoryId}
                    onChange={handleAddChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition-colors"
                  >
                    {categories.length === 0 && (
                      <option value="">No categories available</option>
                    )}
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Options */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Additional Options</h3>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="add-featured"
                  name="featured"
                  checked={addFormData.featured as boolean}
                  onChange={handleAddChange}
                  className="h-5 w-5 text-primary-600 focus:ring-primary-500 border-gray-300 rounded transition-colors"
                />
                <label
                  htmlFor="add-featured"
                  className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Mark as Featured Product
                </label>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Featured products will be highlighted on the homepage and in search results.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <FiPlus className="mr-2" /> Create Product
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
