"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/client-side/ui/Navbar/Navbar";
import Footer from "@/components/client-side/ui/Footer/Footer";
import "../../components/client-side/Home/Home.scss";
import Loader from "@/components/client-side/ui/Loader/Loader";

const layout = ({ children }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaderShown = localStorage.getItem("loaderShown");
    const loaderExpiry = localStorage.getItem("loaderExpiry");

    if (!loaderShown || (loaderExpiry && new Date().getTime() > loaderExpiry)) {
      setLoading(true);
      localStorage.setItem("loaderShown", "true");
      localStorage.setItem(
        "loaderExpiry",
        new Date().getTime() + 24 * 60 * 60 * 1000
      ); // 24 hours
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      )}
    </main>
  );
};

export default layout;
