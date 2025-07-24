"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import NavMenu from "@/components/NavMenu";
import Footer from "@/components/Footer";
import { Spinner } from "@/components/ui/spinner";
import { Order, OrderStatus, PaymentStatus } from "@/types/order";

export default function OrdersPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders data
  useEffect(() => {
    const fetchOrders = async () => {
      if (status === "loading") return;

      if (!session) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch("/api/orders");
        if (!res.ok) throw new Error("Failed to load orders");

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Error loading orders:", err);
        setError("Failed to load orders. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [session, status]);

  // Format date
  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Get status badge color
  const getOrderStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-500";
      case "SHIPPED":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500";
      case "DELIVERED":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500";
      case "CANCELLED":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500";
    }
  };

  // Get payment status badge color
  const getPaymentStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500";
      case "PAID":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500";
      case "FAILED":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500";
      case "REFUNDED":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-500";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-500";
    }
  };

  // If user is not authenticated, redirect to login
  if (status !== "loading" && !session) {
    router.push("/auth/login?callbackUrl=/orders");
    return null;
  }

  return (
    <>
      <NavMenu />
      <main className="container mx-auto px-4 py-16 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          My Orders
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Spinner size="large" />
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg text-red-600 dark:text-red-400 text-center">
            <p className="text-lg font-medium">{error}</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Order #{order.id.substring(0, 8)}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Order Date:{" "}
                        {order.createdAt ? formatDate(order?.createdAt) : "-"}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status === "PENDING"
                          ? "Pending"
                          : order.status === "PROCESSING"
                          ? "Processing"
                          : order.status === "SHIPPED"
                          ? "Shipped"
                          : order.status === "DELIVERED"
                          ? "Delivered"
                          : order.status === "CANCELLED"
                          ? "Cancelled"
                          : order.status}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                          order.paymentStatus
                        )}`}
                      >
                        {order.paymentStatus === "PENDING"
                          ? "Unpaid"
                          : order.paymentStatus === "PAID"
                          ? "Paid"
                          : order.paymentStatus === "FAILED"
                          ? "Failed"
                          : order.paymentStatus === "REFUNDED"
                          ? "Refunded"
                          : order.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Total:</span> ${" "}
                        {(order.totalAmount / 15000).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Items:</span>{" "}
                        {order.items.length} product(s)
                      </p>
                    </div>

                    <Link
                      href={`/orders/${order.id}`}
                      className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-lg text-center">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No Orders Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You don&apos;t have any orders yet. Start shopping now!
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
