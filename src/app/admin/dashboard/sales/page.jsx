"use client";

import { useState } from "react";
import { CopilotPopup } from "@copilotkit/react-ui";
import { useCopilotReadable, useCopilotAction } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import SalesTable from "@/components/admin-dashboard/sales/SalesTable";
import Loader from "@/components/admin-dashboard/Loader";

export default function Sales() {
  const [sheetLink, setSheetLink] = useState(
    "https://docs.google.com/spreadsheets/d/1xXUJ6EuCKL8SodOp8HM3HLXi4GgnY87PpPWh1VNZLug"
  );
  const [showTable, setShowTable] = useState(false);
  const [leadsData, setLeadsData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Make leads data readable by copilot
  useCopilotReadable({
    description: "The current leads data",
    value: leadsData,
  });

  // Action to filter leads
  useCopilotAction({
    name: "filterLeads",
    description: "Filter leads based on specific criteria",
    parameters: [
      {
        name: "criteria",
        type: "string",
        description:
          "The criteria to filter by (e.g., 'website', 'email', etc.)",
        required: true,
      },
      {
        name: "value",
        type: "string",
        description: "The value to filter for (e.g., 'available', 'not empty')",
        required: true,
      },
    ],
    handler: async ({ criteria, value }) => {
      let filteredData = [...originalData];
      console.log(criteria, value);
      if (criteria && value) {
        if (
          value.toLowerCase() === "available" ||
          value.toLowerCase() === "not empty"
        ) {
          filteredData = originalData.filter(
            (lead) => lead[criteria] && lead[criteria].trim() !== ""
          );
        } else if (
          value.toLowerCase() === "not available" ||
          value.toLowerCase() === "empty"
        ) {
          filteredData = originalData.filter(
            (lead) => !lead[criteria] || lead[criteria].trim() === ""
          );
        } else {
          filteredData = originalData.filter((lead) =>
            lead[criteria]?.toLowerCase().includes(value.toLowerCase())
          );
        }
      }

      setLeadsData(filteredData);
      return `Filtered leads to show ${filteredData.length} results`;
    },
  });

  // Action to reset filters
  useCopilotAction({
    name: "resetLeads",
    description: "Reset leads to show all data",
    parameters: [],
    handler: async () => {
      setLeadsData(originalData);
      return "Reset to show all leads";
    },
  });
  // Action to get leads statistics
  useCopilotAction({
    name: "getLeadsStats",
    description: "Get statistics about the leads",
    parameters: [],
    handler: async () => {
      const totalLeads = leadsData.length;
      const stats = {
        total: totalLeads,
        withWebsite: leadsData.filter(
          (lead) => lead.Website && lead.Website.trim() !== ""
        ).length,
        withEmail: leadsData.filter(
          (lead) => lead.Email && lead.Email.trim() !== ""
        ).length,
      };
      return JSON.stringify(stats);
    },
  });

  const fetchSheetData = async (id) => {
    const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    try {
      setLoading(true);
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/Sheet1?key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      const rows = result.values || [];

      if (rows.length > 0) {
        const headers = rows[0];
        const formattedData = rows.slice(1).map((row) => {
          const rowData = {};
          headers.forEach((header, index) => {
            rowData[header] = row[index] || "";
          });
          return rowData;
        });

        setLeadsData(formattedData);
        setOriginalData(formattedData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const match = sheetLink.match(/\/d\/(.*?)(\/|$)/);
    if (match && match[1]) {
      const id = match[1];
      setShowTable(true);
      fetchSheetData(id);
    } else {
      alert("Please enter a valid Google Sheets URL");
    }
  };

  return (
    <div className="p-4 md:w-[85%] md:ml-[15%]">
      <h1 className="text-2xl font-bold mb-4">Sales Dashboard</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={sheetLink}
            onChange={(e) => setSheetLink(e.target.value)}
            placeholder="Enter Google Sheet URL"
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            style={{ backgroundColor: "var(--background-secondary)" }}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#FC8500] text-white rounded-lg hover:bg-[#e67a00] transition-colors"
          >
            Load Data
          </button>
        </div>
      </form>

      {loading && <Loader />}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {showTable && !loading && <SalesTable data={leadsData} />}

      <CopilotPopup
        instructions={`You are a helpful sales assistant for Eclipse Remote Systems. You have access to our leads data and can:
            - Filter leads based on specific criteria (use filterLeads action)
            - Reset filters to show all leads (use resetLeads action)
            - Get statistics about leads (use getLeadsStats action)
            - Analyze lead information and provide insights
            
            Examples:
            - "Show me leads with websites"
            - "Filter leads who have provided email"
            - "Reset to show all leads"
            - "How many leads do we have?"
            
            Context about our products:
            - We sell advanced teleoperated robots for hazardous environments
            - Our robots feature AR control systems with 5ms latency
            - They have modular tool attachments and mesh network communication
            - Key applications: construction, mining, defense, disaster response
            - Focus on safety, efficiency, and precision operation`}
        labels={{
          title: "Sales Assistant",
          initial: "Need help analyzing leads?",
          placeholder: "Ask me about your leads or our products...",
        }}
        className="fixed bottom-4 right-4"
        defaultOpen={false}
      />
    </div>
  );
}
