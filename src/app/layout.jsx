import { AuthProvider } from "./providers";
import "./index.scss";
import "./App.scss";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ChatBot from '@/components/client-side/ui/ChatBot';

export const metadata = {
  title: "Social Hardware",
  description:
    "Our cutting-edge teleoperated robots allow you to manage hazardous operations remotely, keeping your workforce safe. With real-time data insights and advanced situational awareness, you maintain precise control in even the toughest conditions.",
  keywords: [
    "Construction site robots",
    "Robotics in construction industry",
    "Robotics in oil and gas industry",
    "Mining robots",
    "Defense robots",
    "Military-grade robots",
    "Robotics in defense industry",
    "Disaster response robots",
    "Industrial automation robots",
    "Robots for hazardous manufacturing",
    "Environmental monitoring robots",
    "Utility inspection robots",
    "Augmented reality for remote operations",
    "Mining hazard detection robots",
    "Toxic waste disposal robots",
    "Teleoperated robots for transportation",
    "Teleoperated rescue robots",
    "Robotics in hazardous waste management",
    "Remote construction monitoring",
    "Augmented reality in industrial operations",
  ],
  authors: [{ name: "Social Hardware" }],
  metadataBase: new URL("https://www.socialhardware.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Social Hardware",
    description:
      "Pioneering Safety and Efficiency with Next-Generation Telerobotic Solutions",
    images: { url: "/logo.png", alt: "Social Hardware Logo" },
    url: "https://www.socialhardware.in",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Social Hardware",
    description:
      "Pioneering Safety and Efficiency with Next-Generation Telerobotic Solutions",
    images: { url: "/logo.png", alt: "Social Hardware Logo" },
  },
  other: {
    "msapplication-TileImage": "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-right" />
        <ChatBot />
      </body>
    </html>
  );
}
