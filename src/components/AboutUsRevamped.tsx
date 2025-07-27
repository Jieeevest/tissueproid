import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const AboutUsRevamped = () => {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-20 bg-gradient-to-br from-primary-50 to-white dark:from-gray-900 dark:to-gray-950 rounded-3xl my-12"
    >
      <div className="container-custom">
        <div className="text-justify mb-12">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl text-center md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            About TissuePro
          </motion.h2>
          <p className="text-xl font-semibold text-center text-gray-600 dark:text-gray-300">
            A biomedical technology provider in solutions used in the various
            biomedical fields and pharmaceutical industry.
          </p>
          <br></br>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-12">
            TissuePro Technology is a biomedical technology provider in
            solutions used in the various biomedical fields and pharmaceutical
            industry. Our goals are to help the scientists/researchers in
            university/hospital/biomedical/pharmaceutical industries in tissue
            preparation or analysis by providing highest quality products,
            prompt delivery and outstanding services.
          </p>
        </div>

        <div className="flex justify-between items-center mb-16 rounded-xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative h-full w-full overflow-hidden rounded-xl"
          >
            {/* Replace with actual image path */}
            {/* <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-transparent z-10"></div> */}
            <Image
              src="/images/Dr-irawan-satriotomo.jpg"
              alt="Laboratory illustration showing scientific equipment and research elements"
              className=" object-contain shadow-xl "
              width={300}
              height={400}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Founder
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-justify">
              <b>Dr. Irawan Satriotomo</b> received his MD degree from the
              Faculty of Medicine, University of Gajah Mada, Indonesia and PhD
              degree in Neuroscience from Japan. With over 20 years of
              experience in academia, he established TissuePro Technologies to
              provide high-quality reagents and staining solutions for
              biomedical research and pharmaceutical applications.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-justify">
              As a physician-scientist, Dr. Satriotomo recognized the need for
              affordable, high-quality laboratory reagents. He positioned
              TissuePro as a competitive alternative to larger biomedical
              suppliers while maintaining exceptional quality standards. All
              products are manufactured in Gainesville, allowing for rigorous
              quality control.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-justify">
              Under his leadership, TissuePro has gained recognition across the
              United States, with products being used in prestigious
              laboratories and research institutions. The company continues to
              expand globally, with distributors in the Republic of Korea and
              Latin America.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              Quality Excellence
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-justify">
              Our products undergo rigorous testing to ensure consistent,
              reliable performance in every laboratory setting. We maintain ISO
              certifications and follow strict quality control processes
              throughout our manufacturing pipeline.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              Continuous Innovation
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-justify">
              We invest heavily in research and development to create
              cutting-edge solutions for modern laboratory challenges. Our
              innovation team collaborates with leading research institutions to
              stay at the forefront of scientific advancement.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              Sustainability Commitment
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-justify">
              We&apos;re committed to developing eco-friendly products and
              practices that reduce environmental impact without compromising
              performance. Our green initiatives include recyclable packaging,
              energy-efficient manufacturing, and reduced chemical waste.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-primary-500  dark:bg-gray-800/50 p-8 md:p-12 rounded-2xl text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white dark:text-white mb-6">
            Our Impact & Expansion
          </h3>
          <p className="text-white dark:text-gray-300 max-w-3xl mx-auto mb-8">
            TissuePro products have gained tremendous reputation in the USA and
            are used in high profile laboratories and institutions. We&apos;re
            now expanding our services to the overseas market, bringing our
            expertise and quality solutions to researchers worldwide.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                45+
              </div>
              <div className="text-white text-sm">
                Countries
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                2000+
              </div>
              <div className="text-white text-sm">
                Laboratories
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                150+
              </div>
              <div className="text-white text-sm">
                Products
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                15+
              </div>
              <div className="text-white text-sm">
                Years Experience
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutUsRevamped;
