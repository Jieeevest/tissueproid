/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import NavMenu from "@/components/NavMenu";
import Footer from "@/components/Footer";
import InvoiceDetails from "@/components/invoices/InvoiceDetails";
import { Spinner } from "@/components/ui/spinner";
import { Invoice } from "@/types/order";

export default function InvoicePage() {
  const params = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch invoice data
  useEffect(() => {
    const fetchInvoice = async () => {
      if (status === "loading") return;

      if (!session) {
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/invoices/${params.id}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Invoice not found");
          } else if (res.status === 403) {
            throw new Error("You don&apos;t have access to this invoice");
          } else {
            throw new Error("Failed to load invoice");
          }
        }

        const data = await res.json();
        setInvoice(data);
      } catch (err: any) {
        console.error("Error loading invoice:", err);
        setError(err.message || "Failed to load invoice. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchInvoice();
    }
  }, [session, status, params.id]);

  // Handle payment
  const handlePayNow = async () => {
    if (!invoice) return;

    setIsProcessingPayment(true);
    setError(null);

    try {
      // In a real application, this would redirect to a payment gateway
      // For this demo, we'll simulate a successful payment after a delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mark invoice as paid
      const res = await fetch(`/api/invoices/${invoice.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentStatus: "PAID",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to process payment");
      }

      const updatedInvoice = await res.json();
      setInvoice(updatedInvoice);
      toast.success("Payment successful!");
    } catch (err: any) {
      console.error("Error processing payment:", err);
      setError(err.message || "Failed to process payment. Please try again.");
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // If user is not authenticated, redirect to login
  if (status !== "loading" && !session) {
    router.push(`/auth/login?callbackUrl=/invoices/${params.id}`);
    return null;
  }

  return (
    <>
      <NavMenu />
      <main className="container mx-auto px-4 py-16 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
          Invoice Details
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
        ) : invoice ? (
          <InvoiceDetails
            invoice={invoice}
            onPayNow={handlePayNow}
            isProcessingPayment={isProcessingPayment}
          />
        ) : (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg text-yellow-600 dark:text-yellow-400 text-center">
            <p className="text-lg font-medium">Invoice not found</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
