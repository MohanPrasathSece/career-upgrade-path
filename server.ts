import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { config } from "dotenv";

config();

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, // false for 587 (STARTTLS)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify SMTP connection on startup
transporter.verify((error) => {
  if (error) {
    console.error("❌ SMTP connection failed:", error.message);
  } else {
    console.log("📧 SMTP connection verified — ready to send emails");
  }
});

app.post("/api/send-email", async (req, res) => {
  const { name, email, phone, course, message } = req.body;

  console.log("\n─────────────────────────────────────");
  console.log("📩 New enquiry received");
  console.log(`   Name:    ${name}`);
  console.log(`   Email:   ${email}`);
  console.log(`   Phone:   ${phone || "N/A"}`);
  console.log(`   Course:  ${course || "N/A"}`);
  console.log(`   Message: ${message}`);
  console.log("─────────────────────────────────────");

  if (!name || !email || !message) {
    console.warn("⚠️  Missing required fields — email not sent");
    res.status(400).json({ error: "Missing required fields." });
    return;
  }

  try {
    const info = await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `New Enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nCourse: ${course || "N/A"}\nMessage: ${message}`,
      html: `
        <h2 style="color:#2563eb;">New Enquiry — Career Upgrade</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Course:</strong> ${course || "N/A"}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });

    console.log(`✅ Email sent successfully! Message ID: ${info.messageId}`);
    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("❌ Failed to send email:", err.message);
    res.status(500).json({ error: "Failed to send email." });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Email server running at http://localhost:${PORT}`);
  console.log(`   Sending to: ${process.env.CONTACT_EMAIL || process.env.SMTP_USER}`);
  console.log(`   SMTP host:  ${process.env.SMTP_HOST}:${process.env.SMTP_PORT}\n`);
});
