"use client";
import { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import Loader from "@/components/admin-dashboard/Loader";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/contact");
      if (!response.ok) {
        throw new Error("Failed to fetch submissions");
      }
      const data = await response.json();
      setSubmissions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const csvHeaders = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Country Code", key: "countryCode" },
    { label: "Phone", key: "phone" },
    { label: "Message", key: "message" },
    { label: "Submitted At", key: "submittedAt" },
  ];

  const formattedSubmissions = submissions.map((submission) => ({
    ...submission,
    submittedAt: new Date(submission.submittedAt).toLocaleString(),
  }));

  return (
    <div className="md:w-[85%] md:ml-[15%]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Contact Form Submissions</h1>
        <CSVLink
          data={formattedSubmissions}
          headers={csvHeaders}
          filename="contact_submissions.csv"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full sm:w-auto text-center"
        >
          Download CSV
        </CSVLink>
      </div>

      {loading && <Loader />}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {!loading && !error && (
        <div
          className="rounded-lg shadow overflow-x-auto"
          style={{ backgroundColor: "var(--background-primary)" }}
        >
          <table className="min-w-full table-auto">
            <thead>
              <tr style={{ backgroundColor: "var(--background-secondary)" }}>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Country Code
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Message
                </th>

                <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                  Submitted At
                </th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((submission) => (
                <tr
                  key={submission._id}
                  className="border-t"
                  style={{ borderColor: "var(--border-color)" }}
                >
                  <td className="px-4 py-4">{submission.name}</td>
                  <td className="px-4 py-4 flex items-center">
                    <a
                      href={`mailto:${submission.email}`}
                      className="flex items-center mr-2"
                    >
                      <FaEnvelope className="text-[#FC8500] opacity-75 hover:opacity-100" />
                    </a>
                    {submission.email}
                  </td>
                  <td className="px-4 py-4">{submission.countryCode}</td>

                  <td className="px-4 py-4 flex items-center">
                    <a
                      href={`tel:${submission.phone}`}
                      className="flex items-center mr-2"
                    >
                      <FaPhone className="text-[#FC8500] opacity-75 hover:opacity-100" />
                    </a>
                    {submission.phone}
                  </td>
                  <td className="px-4 py-4">{submission.message}</td>
                  <td className="px-4 py-4">
                    {new Date(submission.submittedAt).toLocaleString()}
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

export default ContactSubmissions;
