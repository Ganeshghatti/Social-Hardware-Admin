"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import Link from "next/link";

const SavedLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await axios.get("/api/leadcollection");
      setLeads(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:w-[85%] md:ml-[15%]">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Saved Leads</h1>
        <div className="flex gap-4 w-full sm:w-auto">
          <>
            <Link
              href={"/admin/dashboard/leads/search"}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full sm:w-auto text-center"
            >
              Search More Leads
            </Link>
          </>
        </div>
      </div>
      {loading && <Loader />}
      {error && (
        <div className="w-full p-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {leads.map((lead) => (
          <Link
            key={lead._id}
            href={`/admin/dashboard/leads/category/${lead._id}`}
            style={{ backgroundColor: "var(--background-primary)" }}
            className="text-white rounded-lg p-6 cursor-pointer border border-black/50 "
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold truncate">
                  {lead.searchIndustry}
                </h3>
                <span className="text-sm text-gray-300">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Location:</span>
                  <span className="truncate">{lead.searchLocation}</span>
                </div>
                {/* <div className="flex items-center space-x-2">
                  <span className="text-gray-400">Total Leads:</span>
                  <span>{lead?.leads?.length}</span>
                </div> */}
              </div>

              <div className="text-orange-500 text-sm mt-4">
                Click to view details →
              </div>
            </div>
          </Link>
        ))}
      </div>

      {leads.length === 0 && !loading && (
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold text-gray-600">
            No saved leads found
          </h3>
          <Link
            href="/admin/dashboard/leads/search"
            className="cursor-pointer hover:underline"
          >
            Start by searching and saving some leads
          </Link>
        </div>
      )}
    </div>
  );
};

export default SavedLeads;
