"use client";
import { useState, useEffect } from "react";
import Loader from "@/components/admin-dashboard/Loader";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";

const SubscribedTable = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const fetchSubscribers = async () => {
    try {
      const response = await fetch("/api/subscribe");
      if (!response.ok) {
        throw new Error("Failed to fetch subscribers");
      }
      const data = await response.json();
      setSubscribers(data);
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  return (
    <div className="md:w-[85%] md:ml-[15%]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Subscribed Users Details</h1>
        <Link
          href="/admin/dashboard"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full sm:w-auto text-center"
        >
          Back to Dashboard
        </Link>
      </div>

      {isLoading && <Loader />}
      {fetchError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {fetchError}
        </div>
      )}

      {!isLoading && !fetchError && (
        <div
          className="rounded-lg shadow overflow-x-auto"
          style={{ backgroundColor: "var(--background-primary)" }}
        >
          <table className="min-w-full table-auto">
            <thead>
              <tr style={{ backgroundColor: "var(--background-secondary)" }}>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((subscriber) => (
                <tr
                  key={subscriber._id}
                  className="border-t"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <td className="px-4 py-4 flex items-center">
                    <a
                      href={`mailto:${subscriber.email}`}
                      className="flex items-center mr-2"
                    >
                      <FaEnvelope className="text-[#FC8500] opacity-75 hover:opacity-100" />
                    </a>
                    {subscriber.email}
                  </td>
                  <td className="px-4 py-4">
                    {new Date(subscriber?.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubscribedTable;
