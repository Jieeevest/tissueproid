"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ImageCarousel from "./ImageCarousel";

export default function HeroSection() {
  // Define carousel images
  const carouselImages = [
    {
      src: "/images/HE-combined.jpg",
      alt: "HE Combined Staining",
      width: 800,
      height: 500,
    },
    {
      src: "/images/CV-combined.jpg",
      alt: "CV Combined Staining",
      width: 800,
      height: 500,
    },
    {
      src: "/images/AFS-vs-PBS.jpg",
      alt: "AFS vs PBS Comparison",
      width: 800,
      height: 500,
    },
    {
      src: "/images/products/pbs/afs-1000ml.jpg",
      alt: "AFS 1000ml Product",
      width: 800,
      height: 500,
    },
    {
      src: "/images/products/pbs/10x-pbs.jpg",
      alt: "10x PBS Solution",
      width: 800,
      height: 500,
    },
  ];
  return (
    <section className="container-custom py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-50 mb-6 leading-tight">
            Advanced Solutions for{" "}
            <span className="text-primary-600 dark:text-primary-400">
              Laboratory Excellence
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
            Discover premium laboratory products designed for precision,
            reliability, and efficiency in histology and pathology labs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/#products"
              className="px-8 py-3 text-base bg-primary-500 text-white border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors inline-block"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block w-full"
              >
                Explore Products
              </motion.span>
            </Link>

            <Link
              href="/#contact"
              className="px-8 py-3 text-base border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors inline-block"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block w-full"
              >
                Contact Sales
              </motion.span>
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 border-white dark:border-gray-900 bg-primary-${
                    i * 100
                  } dark:bg-primary-${i * 100 + 300}`}
                ></div>
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <span className="font-semibold">Trusted by 500+</span>{" "}
              laboratories worldwide
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden"
        >
          {/* Image Carousel */}
          <div className="absolute inset-0 p-5 border-[1px] border-gray-300 dark:border-gray-700 rounded-2xl">
            <ImageCarousel
              images={carouselImages}
              autoPlay={true}
              interval={5000}
              showDots={true}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
