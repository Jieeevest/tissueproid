/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import NavMenu from "@/components/NavMenu";
import Footer from "@/components/Footer";
import OrderDetails from "@/components/orders/OrderDetails";
import { Spinner } from "@/components/ui/spinner";
import { Order } from "@/types/order";

export default function OrderPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch order data
  useEffect(() => {
    const fetchOrder = async () => {
      if (status === "loading") return;

      if (!session) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/orders/${params.id}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Order not found");
          } else if (res.status === 403) {
            throw new Error("You don&apos;t have access to this order");
          } else {
            throw new Error("Failed to load order");
          }
        }

        const data = await res.json();
        setOrder(data);
      } catch (err: any) {
        console.error("Error loading order:", err);
        setError(err.message || "Failed to load order. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchOrder();
    }
  }, [session, status, params.id]);

  // If user is not authenticated, redirect to login
  if (status !== "loading" && !session) {
    router.push(`/auth/login?callbackUrl=/orders/${params.id}`);
    return null;
  }

  return (
    <>
      <NavMenu />
      <main className="container mx-auto px-4 py-16 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Order Details
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Spinner size="large" />
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg text-red-600 dark:text-red-400 text-center">
            <p className="text-lg font-medium mb-2">{error}</p>
            <button
              onClick={() => router.push("/orders")}
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
            >
              Back to Orders List
            </button>
          </div>
        ) : order ? (
          <OrderDetails order={order} />
        ) : (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg text-yellow-600 dark:text-yellow-400 text-center">
            <p className="text-lg font-medium">Order not found</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
