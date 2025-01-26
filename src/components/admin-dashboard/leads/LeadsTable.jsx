"use client";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import axios from "axios";
import {
  FaPhone,
  FaExternalLinkAlt,
  FaSave,
  FaMapMarkerAlt,
  FaInfoCircle,
} from "react-icons/fa";
import Loader from "../Loader";
import { MdOutlineMail } from "react-icons/md";
import Link from "next/link";
import Modal from "../ui/Modal";

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
  const [selectedLead, setSelectedLead] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    filterLeads();
  }, [leads, filter]);

  const filterLeads = () => {
    switch (filter) {
      case "phone":
        setFilteredLeads(
          leads.filter((lead) => lead.phone && lead.phone !== "N/A")
        );
        break;
      case "website":
        setFilteredLeads(
          leads.filter((lead) => lead.website && lead.website !== "N/A")
        );
        break;
      default:
        setFilteredLeads(leads);
    }
  };

  const openInGoogleMaps = (address) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
      "_blank"
    );
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

      console.log("response of fetch data map", response);
      if (response.data && response.data.results) {
        console.log("response of fetch data map", response.data.results);
        setError("");
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
      // First, create a new lead collection
      const collectionResponse = await axios.post("/api/leadcollection", {
        searchLocation: location,
        searchIndustry: industry,
      });

      if (!collectionResponse.data._id) {
        throw new Error("Failed to create lead collection");
      }

      const leadCollectionId = collectionResponse.data._id;

      // Then, save all leads with the collection ID
      await axios.post("/api/lead", {
        leadCollectionId,
        leads: leads.map((lead) => ({
          name: lead.name || "N/A",
          phone: lead.phone || "N/A",
          category: lead.category || "N/A",
          address: lead.address || "N/A",
          ratingStars: lead.ratingStars || "0",
          numberOfRatings: lead.numberOfRatings || "0",
          website: lead.website || "N/A",
          industry: industry || "N/A",
          location: location || "N/A",
          email: lead.email || [],
        })),
      });

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Error in save operation:", err);
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

  const handleViewDetails = (lead) => {
    setSelectedLead(lead);
    setOpenModal(true);
  };

  const fetchLeadsById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/leadcollection/${id}`);
      if (response.data) {
        // Update to match the new backend response structure
        const leadsData = response.data;

        // If we have leadCollection data from the populated field
        const leadCollectionInfo = leadsData[0]?.leadCollection;

        if (leadCollectionInfo) {
          setLeadsInfo({
            searchedIndustry: leadCollectionInfo.searchIndustry,
            searchLocation: leadCollectionInfo.searchLocation,
          });
        }

        setLeads(leadsData);
        setFilteredLeads(leadsData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmails = async () => {
    const leadWithIdAndDomain = leads.map((lead) => ({
      _id: lead._id,
      domain: lead.website,
    }));
    await axios.post(
      `https://socialhardware.scrape.googlemap.thesquirrel.site/bulk-email-finder`,
      {
        domains: leadWithIdAndDomain,
      }
    );
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
              ? `${leadsInfo?.searchIndustry || "Business Leads"}`
              : "Search Leads"}
          </h1>
          <p className="mt-2 opacity-85">
            {isView && leadsInfo?.searchLocation}
          </p>
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
              {isView && (
                <button
                  onClick={fetchEmails}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <FaSave />
                  Find Emails
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
        <div className="mb-6 flex justify-end">
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

      {!loading && filteredLeads.length > 0 && (
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
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Address
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Website
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Rating & Reviews
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
                  <td className="px-4 py-4">{lead.category || "N/A"}</td>
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
                    {lead.email && lead.email.length > 0 ? (
                      <div className="flex flex-col justify-start items-start gap-2">
                        <Link
                          target="_blank"
                          href={`mailto:${lead.email[0]}`}
                          className=" hover:opacity-75"
                        >
                          {lead.email[0]}
                        </Link>
                        {lead.email.length > 1 && (
                          <button
                            onClick={() => handleViewDetails(lead)}
                            className="text-[#FC8500] text-sm hover:text-[#DC7500]"
                          >
                            View All
                          </button>
                        )}
                      </div>
                    ) : (
                      "N/A"
                    )}
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
                      <div className="flex items-center">N/A</div>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {lead.ratingStars ? (
                      <span>
                        {lead.ratingStars} {lead.numberOfRatings}
                      </span>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle="Lead Details"
        openBtn={null}
      >
        {selectedLead && (
          <div className="p-6 w-full text-white">
            <div className="space-y-4 overflow-y-auto h-[250px]">
              {selectedLead.email && selectedLead.email.length > 1 && (
                <div>
                  <h4 className="text-[#FC8500] font-medium mb-1">
                    All Email Addresses
                  </h4>
                  <div className="space-y-2">
                    {selectedLead.email.map((email, index) => (
                      <p key={index}>
                        <a
                          href={`mailto:${email}`}
                          className="text-white hover:text-[#FC8500]"
                        >
                          {email}
                        </a>
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LeadsTable;
