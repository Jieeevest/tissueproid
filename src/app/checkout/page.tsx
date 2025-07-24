/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import NavMenu from "@/components/NavMenu";
import Footer from "@/components/Footer";
import CheckoutForm, {
  CheckoutFormData,
} from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";
import { Spinner } from "@/components/ui/spinner";
import { Cart } from "@/types/cart";
import { Order } from "@/types/order";

export default function CheckoutPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

        // Redirect to cart if empty
        if (!data.items || data.items.length === 0) {
          router.push("/cart");
        }
      } catch (err) {
        console.error("Error loading cart:", err);
        setError("Failed to load cart. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [session, status, router]);

  // Handle checkout form submission
  const handleCheckout = async (formData: CheckoutFormData) => {
    if (!cart || cart.items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare shipping address string
      const shippingAddress = `${formData.fullName}, ${formData.phone}\n${formData.address}\n${formData.city}, ${formData.postalCode}`;

      // Create order
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shippingAddress,
          paymentMethod: formData.paymentMethod,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create order");
      }

      const order: Order = await res.json();

      // Redirect to order confirmation page
      router.push(`/orders/${order.id}`);
    } catch (err: any) {
      console.error("Error creating order:", err);
      setError(err.message || "Failed to create order. Please try again.");
      setIsSubmitting(false);
    }
  };

  // If user is not authenticated, redirect to login
  if (status !== "loading" && !session) {
    router.push("/auth/login?callbackUrl=/checkout");
    return null;
  }

  return (
    <>
      <NavMenu />
      <main className="container mx-auto px-4 py-16 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Checkout
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
              <CheckoutForm
                onSubmit={handleCheckout}
                isSubmitting={isSubmitting}
              />
            </div>

            <div className="lg:col-span-1">
              <OrderSummary items={cart?.items || []} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
