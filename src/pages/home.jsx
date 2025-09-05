import React from "react";
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import VideoSection from '../components/VideoSection';
import NewArrivals from '../components/NewArrivals';
import Essentials from '../components/Essentials';
import Collections from '../components/Collections';
 import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <NewArrivals />
        <Collections />
        {/* <Products /> */}
        <Essentials />
        <VideoSection />
      </main>
      <Footer />
    </>
  );
};

export default Home;