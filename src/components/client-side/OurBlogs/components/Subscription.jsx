'use client'
import React, { useState } from "react";
import validator from "validator";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from 'react-spinners/ClipLoader';

export default function Subscription() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (validator.isEmail(email)) { 
      try {
        const response = await fetch('https://social-hardware-admin.vercel.app/api/public/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }), 
        });

        if (response.ok) {
          toast.success('Subscription successful!');
          setEmail(''); 
        } else {
          toast.error('Failed to subscribe. Please try again.');
        }
      } catch (error) {
        console.error('Error during subscription:', error);
        toast.error('Failed to subscribe. Please try again.');
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    } else {
      toast.error('Please enter a valid email address.'); // Show error for invalid email
      setLoading(false); // Stop loading if email is invalid
    }
  };

  return (
    <section id="subscription" className="flex relative mt-[85px] py-10">
      <div className="left-container" />
      <div className="center-container mb-5 md:mb-10 px-4">
        <h1 className="text-center title">
          Connect to the Loop
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex gap-1 w-full md:w-2/3 mx-auto overflow-hidden h-fit flex flex-col md:flex-row"
        >
          <input
            type="email"
            className="outline-none rounded-l bg-[#1A1A1A] w-full md:w-4/5 h-full px-4 py-3 text-white"
            name="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="text-oranges w-fit md:w-1/5 bg-[#1A1A1A] rounded-r text-center flex justify-center px-4 md:px-8 py-3"
          >
            Subscribe
          </button>
        </form>
      </div>
      <div className="right-container" />
      {loading && (
          <div style={loaderStyle}>
            <ClipLoader color="#3498db" loading={loading} size={150} />
          </div>
        )}
        <ToastContainer />
      <div className="line-v-1" />
      <div className="line-v-3" />
    </section>
  );
}

const loaderStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  zIndex: 1000,
};