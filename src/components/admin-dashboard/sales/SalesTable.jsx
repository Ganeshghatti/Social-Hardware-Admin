"use client";
import React from "react";
import { FaGlobe, FaEnvelope } from "react-icons/fa";
const SalesTable = ({ data }) => {
  if (!data || data.length === 0) return null;

  const columns = Object.keys(data[0]);

  return (
    <div
      className="rounded-lg shadow overflow-x-auto"
      style={{ backgroundColor: "var(--background-primary)" }}
    >
      <table className="min-w-full table-auto">
        <thead>
          <tr style={{ backgroundColor: "var(--background-secondary)" }}>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-xs font-medium uppercase"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-t"
              style={{ borderColor: "var(--border-color)" }}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-4 py-4">
                  {column === "Website"
                    ? row[column] && (
                        <a
                          href={row[column]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1"
                        >
                          <FaGlobe />
                          {row[column]}
                        </a>
                      )
                    : column === "Email"
                    ? row[column] && (
                        <a
                          href={`mailto:${row[column]}`}
                          className="flex items-center gap-1"
                        >
                          <FaEnvelope />
                          {row[column]}
                        </a>
                      )
                    : row[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
