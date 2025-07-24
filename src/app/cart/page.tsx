"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import NavMenu from "@/components/NavMenu";
import Footer from "@/components/Footer";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { Spinner } from "@/components/ui/spinner";
import { Cart } from "@/types/cart";

export default function CartPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      if (status === "loading") return;

      if (!session) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/cart");
        if (!res.ok) throw new Error("Failed to fetch cart");

        const data = await res.json();
        setCart(data);
      } catch (err) {
        console.error("Error loading cart:", err);
        setError("Failed to load cart. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [session, status]);

  // Update item quantity
  const handleUpdateQuantity = async (id: string, quantity: number) => {
    try {
      const res = await fetch(`/api/cart/items/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });

      if (!res.ok) throw new Error("Failed to update item");

      const updatedItem = await res.json();

      // Update cart state
      setCart((prevCart) => {
        if (!prevCart) return prevCart;

        return {
          ...prevCart,
          items: prevCart.items.map((item) =>
            item.id === id ? { ...item, quantity: updatedItem.quantity } : item
          ),
        };
      });
    } catch (err) {
      console.error("Error updating item:", err);
      setError("Failed to update item. Please try again.");
    }
  };

  // Remove item from cart
  const handleRemoveItem = async (id: string) => {
    try {
      const res = await fetch(`/api/cart/items/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to remove item");

      // Update cart state
      setCart((prevCart) => {
        if (!prevCart) return prevCart;

        return {
          ...prevCart,
          items: prevCart.items.filter((item) => item.id !== id),
        };
      });
    } catch (err) {
      console.error("Error removing item:", err);
      setError("Failed to remove item. Please try again.");
    }
  };

  // Proceed to checkout
  const handleCheckout = () => {
    router.push("/checkout");
  };

  // If user is not authenticated, show login message
  if (status !== "loading" && !session) {
    return (
      <>
        <NavMenu />
        <div className="container mx-auto px-4 py-16 min-h-screen">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Shopping Cart
            </h1>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Please login to view your shopping cart.
              </p>
              <button
                onClick={() => router.push("/auth/login?callbackUrl=/cart")}
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavMenu />
      <main className="container mx-auto px-4 py-16 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Shopping Cart
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Spinner size="large" />
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md text-red-600 dark:text-red-400 mb-6">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cart && cart.items.length > 0 ? (
                <AnimatePresence>
                  {cart.items.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </AnimatePresence>
              ) : (
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 text-center">
                  <svg
                    className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Start shopping to add products to your cart.
                  </p>
                  <button
                    onClick={() => router.push("/#products")}
                    className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-md transition-colors"
                  >
                    View Products
                  </button>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <CartSummary
                items={cart?.items || []}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
