"use client";
import { useState } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import { FaPhone, FaExternalLinkAlt } from "react-icons/fa";
import Loader from "../Loader";

const LeadsTable = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [industry, setIndustry] = useState("Chemical industry");
  const [location, setLocation] = useState("Bengaluru, Karnataka");

  const fetchLeads = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://scrape.googlemap.thesquirrel.site/scrape",
        {
          industry,
          location,
        }
      );
      if (response.data && response.data.results) {
        setLeads(response.data.results);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const csvHeaders = [
    { label: "Name", key: "name" },
    { label: "Category", key: "category" },
    { label: "Phone", key: "phone" },
    { label: "Address", key: "address" },
    { label: "Rating", key: "ratingStars" },
    { label: "Reviews", key: "numberOfRatings" },
    { label: "Website", key: "website" },
  ];

  return (
    <div className="md:w-[85%] md:ml-[15%]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Business Leads</h1>
        {leads.length > 0 && (
          <CSVLink
            data={leads}
            headers={csvHeaders}
            filename="business_leads.csv"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full sm:w-auto text-center"
          >
            Download CSV
          </CSVLink>
        )}
      </div>

      <form onSubmit={fetchLeads} className="mb-6 mt-2 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <div className="w-full flex justify-between gap-4 items-center col-span-4">
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Enter industry (e.g., Chemical industry)"
              className="flex-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={{ backgroundColor: "var(--background-secondary)" }}
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location (e.g., Bengaluru, Karnataka)"
              className="flex-1 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              style={{ backgroundColor: "var(--background-secondary)" }}
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          >
            Search Leads
          </button>
        </div>
      </form>

      {loading && <Loader />}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {!loading && !error && leads.length > 0 && (
        <div
          className="rounded-lg mt-10 shadow overflow-x-auto"
          style={{ backgroundColor: "var(--background-primary)" }}
        >
          <table className="min-w-full table-auto">
            <thead>
              <tr style={{ backgroundColor: "var(--background-secondary)" }}>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase ">
                  Business Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase ">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase ">
                  Address
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase ">
                  Rating
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase ">
                  Website
                </th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr
                  key={index}
                  className="border-t"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <td className="px-4 py-4">{lead.name}</td>
                  <td className="px-4 py-4 ">{lead.category}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center whitespace-nowrap">
                      <a
                        href={`tel:${lead.phone}`}
                        className="flex items-center mr-2"
                      >
                        <FaPhone className="text-[#FC8500] opacity-75 hover:opacity-100" />
                      </a>
                      {lead.phone}
                    </div>
                  </td>
                  <td className="px-4 py-4 ">{lead.address}</td>
                  <td className="px-4 py-4">
                    <div className="whitespace-nowrap">
                      {lead.ratingStars} {lead.numberOfRatings}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {lead.website !== "N/A" ? (
                      <a
                        href={lead.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <FaExternalLinkAlt className="text-[#FC8500] opacity-75 hover:opacity-100 mr-2" />
                        Visit
                      </a>
                    ) : (
                      <div className="flex items-center">
                        <FaExternalLinkAlt className="text-[#FC8500] opacity-75 hover:opacity-100 mr-2" />
                        N/A
                      </div>
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

export default LeadsTable;
