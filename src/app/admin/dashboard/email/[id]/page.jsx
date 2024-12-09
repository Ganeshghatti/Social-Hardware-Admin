import React from "react";
import EmailForm from "@/components/admin-dashboard/email/EmailForm";

const page = ({ params }) => {
  return <EmailForm id={params.id} />;
};

export default page;
