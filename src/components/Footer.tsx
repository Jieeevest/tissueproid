import React from "react";
import Link from "next/link";
import { categories } from "@/data/products";

const Footer = () => {
  return (
    <footer className="bg-[#0284c7] border-t border-blue-300 mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-bold text-white mb-4">
              TissuePro Tech ID
            </h3>
            <p className="text-white mb-4 text-sm">
              Advancing laboratory science with innovative, reliable, and
              sustainable products.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/tissueprotech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://facebook.com/tissue.protech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-200"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-blue-200"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/#products"
                  className="text-white hover:text-blue-200"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-white hover:text-blue-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-white hover:text-blue-200"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/cart"
                  className="text-white hover:text-blue-200"
                >
                  Cart
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-white hover:text-blue-200"
                >
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/categories/${category.id}`}
                    className="text-white hover:text-blue-200"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:customerservice@tissueprotech.com"
                  className="text-white pt-0.5 hover:text-blue-200"
                >
                  customerservice@tissueprotech.com
                </a>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href="tel:(352) 246-2080"
                  className="text-white pt-0.5 hover:text-blue-200"
                >
                  (352) 246-2080
                </a>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white mr-2 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-white pt-0.5">
                  Florida, United States of America
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-300 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white mb-4 md:mb-0">
            © {new Date().getFullYear()} TissuePro Teknologi Indonesia. All
            rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-white hover:text-blue-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-white hover:text-blue-200"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-white hover:text-blue-200"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
