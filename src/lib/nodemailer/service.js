import nodemailer from 'nodemailer';
import dbConnect from '../mongodb';
import Subscribe from '@/models/Subscription';
import EmailContent from '@/models/Email'

// Create a transporter using SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Function to send bulk emails
export async function sendBulkEmails(emailContentId) {
  try {
    // Connect to database
    await dbConnect();

    // Fetch the email content
    const emailContent = await EmailContent.findById(emailContentId);
    if (!emailContent || emailContent.status !== 'published') {
      throw new Error('Email content not found or not published');
    }

    // Fetch all subscribers
    const subscribers = await Subscribe.find({});

    // Create transporter
    const transporter = createTransporter();

    // Prepare email options
    const mailOptions = {
      from: `"Your Company" <${process.env.SMTP_FROM_EMAIL}>`,
      subject: emailContent.title,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          ${emailContent.image ? `<img src="${emailContent.image}" alt="${emailContent.title}" style="max-width: 100%; height: auto;" />` : ''}
          <h1>${emailContent.title}</h1>
          <div>${emailContent.content}</div>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">
            You are receiving this email because you subscribed to our newsletter. 
            <a href="{unsubscribe_link}">Unsubscribe</a>
          </p>
        </div>
      `
    };

    // Send emails to each subscriber
    const emailPromises = subscribers.map(async (subscriber) => {
      try {
        // Customize mailOptions for each subscriber
        const personalizedMailOptions = {
          ...mailOptions,
          to: subscriber.email,
          // Add personalized unsubscribe link
          html: mailOptions.html.replace(
            '{unsubscribe_link}', 
            `${process.env.WEBSITE_URL}/unsubscribe?email=${subscriber.email}`
          )
        };

        // Send email
        await transporter.sendMail(personalizedMailOptions);
        return { email: subscriber.email, status: 'success' };
      } catch (error) {
        console.error(`Error sending email to ${subscriber.email}:`, error);
        return { email: subscriber.email, status: 'failed', error: error.message };
      }
    });

    // Wait for all emails to be processed
    const emailResults = await Promise.all(emailPromises);

    // Update email content with sending results
    await EmailContent.findByIdAndUpdate(emailContentId, {
      $set: { 
        emailSendingResults: emailResults,
        sentAt: new Date()
      }
    });

    return {
      totalSubscribers: subscribers.length,
      results: emailResults
    };

  } catch (error) {
    console.error('Bulk email sending error:', error);
    throw error;
  }
}

// Function to send test email
export async function sendTestEmail(emailContentId, testEmail) {
  try {
    // Connect to database
    await dbConnect();

    // Fetch the email content
    const emailContent = await EmailContent.findById(emailContentId);
    if (!emailContent || emailContent.status !== 'published') {
      throw new Error('Email content not found or not published');
    }

    // Create transporter
    const transporter = createTransporter();

    // Prepare email options
    const mailOptions = {
      from: `"Your Company" <${process.env.SMTP_FROM_EMAIL}>`,
      to: testEmail,
      subject: `Test: ${emailContent.title}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h2>Test Email</h2>
          ${emailContent.image ? `<img src="${emailContent.image}" alt="${emailContent.title}" style="max-width: 100%; height: auto;" />` : ''}
          <h1>${emailContent.title}</h1>
          <div>${emailContent.content}</div>
        </div>
      `
    };

    // Send test email
    await transporter.sendMail(mailOptions);

    return { status: 'success', message: 'Test email sent successfully' };

  } catch (error) {
    console.error('Test email sending error:', error);
    throw error;
  }
}