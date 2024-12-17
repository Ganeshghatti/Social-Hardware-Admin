import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dbConnect from "@/lib/mongodb";
import Subscribe from "@/models/Subscription";
import EmailContent from "@/models/Email";

export async function POST(request, { params }) {
  try {
    const emailContentId = params.id;

    // Connect to database
    await dbConnect();

    // Fetch the email content
    const emailContent = await EmailContent.findById(emailContentId).populate(
      "blog"
    );

    if (!emailContent || emailContent.status !== "public") {
      return NextResponse.json(
        { error: "Email content not found or not published" },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Fetch subscribers
    const subscribers = await Subscribe.find({});

    // Send emails
    const emailPromises = subscribers.map(async (subscriber) => {
      const mailOptions = {
        from: `"Social Hardware"`,
        to: subscriber.email,
        subject: emailContent.title,
        html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            ${
              emailContent.image
                ? `<img src="${emailContent.blog.image}" alt="${emailContent.title}" style="max-width: 100%; height: auto;" />`
                : ""
            }
            <h1>${emailContent.title}</h1>
            <div>${emailContent.content}</div>
          </div>
        `,
      };

      try {
        await transporter.sendMail(mailOptions);
        return { email: subscriber.email, status: "success" };
      } catch (error) {
        console.error(`Error sending email to ${subscriber.email}:`, error);
        return {
          email: subscriber.email,
          status: "failed",
          error: error.message,
        };
      }
    });

    // Wait for all emails to be processed
    const emailResults = await Promise.all(emailPromises);

    return NextResponse.json({
      totalSubscribers: subscribers.length,
      results: emailResults,
    });
  } catch (error) {
    console.error("Bulk email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send emails", details: error.message },
      { status: 500 }
    );
  }
}
