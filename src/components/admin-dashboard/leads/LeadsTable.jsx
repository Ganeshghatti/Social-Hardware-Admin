'use client'
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import { FaPhone, FaExternalLinkAlt, FaSave, FaMapMarkerAlt } from "react-icons/fa";
import Loader from "../Loader";

const LeadsTable = ({ isView = false, id = null }) => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [leadsInfo, setLeadsInfo] = useState(null);
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    filterLeads();
  }, [leads, filter]);

  const filterLeads = () => {
    switch(filter) {
      case "phone":
        setFilteredLeads(leads.filter(lead => lead.phone && lead.phone !== "N/A"));
        break;
      case "website":
        setFilteredLeads(leads.filter(lead => lead.website && lead.website !== "N/A"));
        break;
      default:
        setFilteredLeads(leads);
    }
  };

  const openInGoogleMaps = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const fetchLeads = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSaveSuccess(false);
    try {
      const response = await axios.post(
        "https://socialhardware.scrape.googlemap.thesquirrel.site/scrape",
        {
          industry,
          location,
        }
      );
      if (response.data && response.data.results) {
        setLeads(response.data.results);
        setFilteredLeads(response.data.results);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveLeads = async () => {
    if (leads.length === 0) return;

    setLoading(true);
    setSaveSuccess(false);
    try {
      await axios.post("/api/lead", {
        searchLeads: location,
        searchedCategory: industry,
        leads: leads,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to save leads");
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

  const fetchLeadsById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/lead/${id}`);
      if (response.data) {
        setLeadsInfo({
          searchedCategory: response.data.data.searchedCategory,
          searchLeads: response.data.data.searchLeads,
        });
        setLeads(response.data.data.leads);
        setFilteredLeads(response.data.data.leads);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchLeadsById(id);
    }
  }, [id]);

  return (
    <div className="md:w-[85%] md:ml-[15%]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {isView
              ? `${leadsInfo?.searchedCategory || "Business Leads"}`
              : "Search Leads"}
          </h1>
          <p className="mt-2 opacity-85">{isView && leadsInfo?.searchLeads}</p>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
          {leads.length > 0 && (
            <>
              {!isView && (
                <button
                  onClick={saveLeads}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 w-full sm:w-auto justify-center"
                  disabled={loading}
                >
                  <FaSave />
                  Save Leads
                </button>
              )}
              <CSVLink
                data={leads}
                headers={csvHeaders}
                filename="business_leads.csv"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full sm:w-auto text-center flex items-center justify-center"
              >
                Download CSV
              </CSVLink>
            </>
          )}
        </div>
      </div>

      {!isView && (
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
              disabled={loading}
            >
              Search Leads
            </button>
          </div>
        </form>
      )}

      {leads.length > 0 && (
        <div className="mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-64 rounded p-2 text-sm md:text-base"
            style={{
              backgroundColor: "var(--background-primary)",
              border: "1px solid var(--border-color)",
            }}
          >
            <option value="all">Show All Results</option>
            <option value="phone">With Phone Number</option>
            <option value="website">With Website</option>
          </select>
        </div>
      )}

      {loading && <Loader />}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      {saveSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Leads saved successfully!
        </div>
      )}

      {!loading && !error && filteredLeads.length > 0 && (
        <div
          className="rounded-lg mt-6 shadow overflow-x-auto"
          style={{ backgroundColor: "var(--background-primary)" }}
        >
          <table className="min-w-full table-auto">
            <thead>
              <tr style={{ backgroundColor: "var(--background-secondary)" }}>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Business Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Address
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Rating
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Website
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, index) => (
                <tr
                  key={index}
                  className="border-t"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <td className="px-4 py-4">{lead.name}</td>
                  <td className="px-4 py-4">{lead.category}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center whitespace-nowrap">
                      {lead.phone && lead.phone !== "N/A" ? (
                        <>
                          <a
                            href={`tel:${lead.phone}`}
                            className="flex items-center mr-2"
                          >
                            <FaPhone className="text-[#FC8500] opacity-75 hover:opacity-100" />
                          </a>
                          {lead.phone}
                        </>
                      ) : (
                        "N/A"
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {lead?.address ? (
                        <div className="flex items-center gap-2">
                        <button
                          onClick={() => openInGoogleMaps(lead.address)}
                          className="text-[#FC8500] hover:text-[#DC7500] flex items-center gap-1"
                          title="Open in Google Maps"
                        >
                          <FaMapMarkerAlt />
                        </button>
                        {lead?.address}
                      </div>
                      ) : (
                        <div className="flex items-center">N/A</div>
                      )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="whitespace-nowrap">
                      {lead.ratingStars} ({lead.numberOfRatings})
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {lead.website && lead.website !== "N/A" ? (
                      <a
                        href={lead.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center hover:text-[#FC8500]"
                      >
                        <FaExternalLinkAlt className="text-[#FC8500] opacity-75 hover:opacity-100 mr-2" />
                        Visit
                      </a>
                    ) : (
                      <div className="flex items-center">
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