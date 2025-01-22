"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const TechnicalBrochure = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/send-brochure', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success('Technical brochure has been sent to your email!');
                setEmail('');
            } else {
                toast.error(data.error || 'Failed to send brochure');
            }
        } catch (error) {
            console.error('Error sending brochure:', error);
            toast.error('Failed to send brochure. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="system" className="relative flex justify-center items-center py-12 px-[4%] flex-col text-center">
            <p className="!text-center text-4xl">
                Get Technical Brochure
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-12 gap-1 w-full md:w-2/3 mx-auto overflow-hidden h-fit flex items-start flex-row"
            >
                <input
                    type="email"
                    className="outline-none rounded-l bg-[#1A1A1A] w-full md:w-4/5 h-full px-4 py-3 text-white"
                    name="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`text-oranges w-fit md:w-1/5 bg-[#1A1A1A] rounded-r text-center flex justify-center px-4 md:px-8 py-[11px] ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {loading ? (
                        <>
                            <FaSpinner className="animate-spin" />
                            Sending...
                        </>
                    ) : (
                        'Get Brochure'
                    )}
                </button>
            </form>
        </section>
    );
};

export default TechnicalBrochure;