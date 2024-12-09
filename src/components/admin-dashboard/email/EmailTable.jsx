"use client";
import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import Link from "next/link";

const EmailTable = () => {
  const [emails, setEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const fetchEmails = async () => {
    try {
      const response = await fetch("/api/email");
      if (!response.ok) {
        throw new Error("Failed to fetch email contents");
      }
      const data = await response.json();
      setEmails(data);
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEmail = async (id) => {
    if (!window.confirm("Are you sure you want to delete this email?")) {
      return;
    }
    try {
      const response = await fetch(`/api/email/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete email");
      }
      await fetchEmails();
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div
      className="rounded-lg mt-10 shadow overflow-x-auto"
      style={{ backgroundColor: "var(--background-primary)" }}
    >
      {isLoading && <Loader />}
      {fetchError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {fetchError}
        </div>
      )}
      {!isLoading && !fetchError && (
        <table className="min-w-full table-auto">
          <thead>
            <tr style={{ backgroundColor: "var(--background-secondary)" }}>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                Title
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                Content
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                Created Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr
                key={email._id}
                className="border-t"
                style={{ borderColor: "var(--border-color)" }}
              >
                <td className="px-4 py-4">{email.title}</td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs uppercase ${
                      email.status === "draft"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {email.status}
                  </span>
                </td>
                <td className="hidden md:table-cell px-6 py-4">
                  <div className="max-w-xs truncate">{email.content}</div>
                </td>
                <td className="px-4 py-4">
                  {new Date(email.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-4">
                  {email.status === "draft" ? (
                    <div className="flex gap-6 space-x-2">
                      <Link href={`/admin/dashboard/email/${email._id}`}>
                        <button className="text-blue-600 hover:text-blue-800">
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteEmail(email._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  ) : (
                    <button className="text-blue-600 hover:underline cursor-pointer transition-all text-center">
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmailTable;
