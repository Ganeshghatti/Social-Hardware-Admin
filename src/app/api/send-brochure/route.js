import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { transporter } from "@/lib/emailTransporter";

export async function POST(req) {
  try {
    const { email } = await req.json();

    // Path to your PDF file in the public directory
    const pdfPath = path.join(process.cwd(), "public", "client", "technical-brochure.pdf");
    
    // Check if file exists
    if (!fs.existsSync(pdfPath)) {
      console.error("PDF file not found at:", pdfPath);
      return NextResponse.json(
        { error: "Technical brochure file not found" },
        { status: 404 }
      );
    }

    // Read the PDF file
    const pdfContent = fs.readFileSync(pdfPath);

    const mailOptions = {
      from: `Social Hardware <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Social Hardware Technical Brochure",
      text: "Thank you for your interest in Social Hardware. Please find attached our technical brochure.",
      attachments: [
        {
          filename: "SocialHardware-TechnicalBrochure.pdf",
          content: pdfContent,
        },
      ],
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Brochure sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in send-brochure API:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
