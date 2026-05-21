// src/api/send-email.ts
import nodemailer from "nodemailer";
import { config } from "dotenv";

// Load environment variables from .env file
config();

interface EmailRequestBody {
  name: string;
  email: string;
  phone: string;
  course: string;
  message: string;
}

// Create transporter using SMTP credentials
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || process.env.VITE_SMTP_HOST,
  port: Number(process.env.SMTP_PORT || process.env.VITE_SMTP_PORT),
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || process.env.VITE_SMTP_USER,
    pass: process.env.SMTP_PASS || process.env.VITE_SMTP_PASS,
  },
});

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const body: EmailRequestBody = req.body;
  const { name, email, phone, course, message } = body;

    const mailOptions = {
      from: `${process.env.SMTP_USER || process.env.VITE_SMTP_USER}`,
      to: process.env.CONTACT_EMAIL || "zyradigitalsofficial@gmail.com",
      subject: `New Enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCourse: ${course}\nMessage: ${message}`,
      // html version can be added if needed
    };
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  }
}

