"use client";

import React from "react";
import { motion } from "framer-motion";
import { Invoice, PaymentStatus } from "@/types/order";

interface InvoiceDetailsProps {
  invoice: Invoice;
  onPayNow?: () => void;
  isProcessingPayment?: boolean;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({
  invoice,
  onPayNow,
  isProcessingPayment = false,
}) => {
  // Format date
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
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

  // Format payment method
  const formatPaymentMethod = (method: string) => {
    switch (method) {
      case "CREDIT_CARD":
        return "Credit Card";
      case "BANK_TRANSFER":
        return "Bank Transfer";
      case "PAYPAL":
        return "PayPal";
      case "CASH_ON_DELIVERY":
        return "Cash on Delivery (COD)";
      default:
        return method;
    }
  };

  // Check if invoice is overdue
  const isOverdue = () => {
    if (invoice.paymentStatus !== "PENDING") return false;
    const dueDate = new Date(invoice.dueDate);
    const today = new Date();
    return today > dueDate;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Invoice Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Invoice #{invoice.invoiceNumber}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Invoice Date: {formatDate(invoice.issuedDate)}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                invoice.paymentStatus
              )}`}
            >
              {invoice.paymentStatus === "PENDING"
                ? "Unpaid"
                : invoice.paymentStatus === "PAID"
                ? "Paid"
                : invoice.paymentStatus === "FAILED"
                ? "Failed"
                : invoice.paymentStatus === "REFUNDED"
                ? "Refunded"
                : invoice.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Invoice Details */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">
              Invoice Information
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Invoice No:</span>{" "}
                {invoice.invoiceNumber}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Invoice Date:</span>{" "}
                {formatDate(invoice.issuedDate)}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Due Date:</span>{" "}
                {formatDate(invoice.dueDate)}
              </p>
              {invoice.paidDate && (
                <p className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium">Payment Date:</span>{" "}
                  {formatDate(invoice.paidDate)}
                </p>
              )}
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Payment Method:</span>{" "}
                {invoice?.order?.paymentMethod
                  ? formatPaymentMethod(invoice.order.paymentMethod)
                  : "-"}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">
              Shipping Information
            </h3>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
              {invoice?.order?.shippingAddress
                ? invoice.order.shippingAddress
                : "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Order Items
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {invoice?.order?.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {item.product?.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-right">
                    ${(item.price / 15000).toFixed(2)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-right">
                    {item.quantity}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white text-right">
                    ${((item.price * item.quantity) / 15000).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Summary */}
      <div className="p-6">
        <div className="flex flex-col items-end">
          <div className="w-full md:w-1/2 lg:w-1/3 space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
              <span className="text-gray-900 dark:text-white">
                ${(invoice.amount / 15000).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">
                Shipping
              </span>
              <span className="text-gray-900 dark:text-white">Free</span>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-gray-900 dark:text-white font-medium">
                  Total
                </span>
                <span className="text-primary-600 font-bold">
                  ${(invoice.amount / 15000).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {invoice.paymentStatus === "PENDING" && onPayNow && (
            <div className="mt-6">
              {isOverdue() && (
                <p className="text-red-600 dark:text-red-400 text-sm mb-2">
                  This invoice is past due. Please make payment as soon as possible.
                </p>
              )}
              <button
                onClick={onPayNow}
                disabled={isProcessingPayment}
                className="inline-flex items-center justify-center px-5 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessingPayment ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing
                  </>
                ) : (
                  "Pay Now"
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default InvoiceDetails;
