"use client";
import HeroSection from "../components/HeroSection";
// import FeaturedProducts from "../components/FeaturedProducts";
import ProductListing from "../components/ProductListing";
import { AboutUs, ContactUs } from "../components/Sections";
import Footer from "@/components/Footer";
import NavMenu from "@/components/NavMenu";

export default function Home() {
  return (
    <>
      <NavMenu />
      <main className="min-h-screen">
        <HeroSection />
        {/* <FeaturedProducts /> */}
        <ProductListing />
        {/* <div className="container-custom py-8"> */}
        {/* <StainingSolutions /> */}
        {/* <NewProducts /> */}
        <AboutUs />
        <ContactUs />
        {/* </div> */}
      </main>
      <Footer />
    </>
  );
}
