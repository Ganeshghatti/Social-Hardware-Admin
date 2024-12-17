import React from "react";
import Link from "next/link";
import EmailTable from "@/components/admin-dashboard/email/EmailTable";

const page = () => {
  return (
    <section className="md:w-[85%] md:ml-[15%]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Email Management</h1>
        <Link
          href="/admin/dashboard/email/create"
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded w-full sm:w-auto text-center"
        >
          Send New Email
        </Link>
      </div>
      <EmailTable />
    </section>
  );
};

export default page;
