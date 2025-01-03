import Sidebar from "../../components/admin-dashboard/ui/Sidebar";
import Navbar from "../../components/admin-dashboard/ui/Navbar";
import AuthCheck from "@/components/admin-dashboard/AuthCheck";
import "../globals.css";
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";

export default function AdminLayout({ children }) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit">
      <AuthCheck>
        <div className="min-h-screen flex flex-col md:flex-row">
          <Sidebar />
          <div className="w-full">
            <Navbar />
            <main className="p-4 md:p-8">{children}</main>
          </div>
        </div>
      </AuthCheck>
    </CopilotKit>
  );
}
