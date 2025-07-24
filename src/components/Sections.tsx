"use client";

import { motion } from "framer-motion";
import AboutUsRevamped from "./AboutUsRevamped";
import ContactUsRevamped from "./ContactUsRevamped";

export function StainingSolutions() {
  return (
    <motion.section
      id="staining"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto my-16 p-8 rounded-xl bg-white/80 dark:bg-black/80 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">
        Staining Solutions
      </h2>
      <p className="text-gray-700 dark:text-gray-200 mb-2">
        Explore our range of high-quality staining solutions for histology and
        pathology labs. Designed for precision, reliability, and vibrant
        results.
      </p>
      <ul className="list-disc ml-6 text-gray-600 dark:text-gray-300">
        <li>Hematoxylin & Eosin (H&E) Stains</li>
        <li>Special Stains (PAS, Massons Trichrome, etc.)</li>
        <li>Ready-to-use and concentrated formats</li>
      </ul>
    </motion.section>
  );
}

export function NewProducts() {
  return (
    <motion.section
      id="products"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true }}
      className="max-w-3xl mx-auto my-16 p-8 rounded-xl bg-white/80 dark:bg-black/80 shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-300">
        New Products
      </h2>
      <p className="text-gray-700 dark:text-gray-200 mb-2">
        Discover our latest innovations in tissue processing and laboratory
        solutions.
      </p>
      <ul className="list-disc ml-6 text-gray-600 dark:text-gray-300">
        <li>Automated slide stainers</li>
        <li>Eco-friendly clearing agents</li>
        <li>Advanced mounting media</li>
      </ul>
    </motion.section>
  );
}

export function AboutUs() {
  return <AboutUsRevamped />;
}

export function ContactUs() {
  return <ContactUsRevamped />;
}
