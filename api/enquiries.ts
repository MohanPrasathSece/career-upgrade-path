import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  return createClient(url!, key!);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    name, email, phone, message,
    address, date_of_birth, course, funding_type, when_to_start, additional_info,
  } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  // Save to Supabase
  try {
    const supabase = getSupabase();
    await supabase.from("submissions").insert({
      name,
      email,
      phone: phone || null,
      message,
      address: address || null,
      date_of_birth: date_of_birth || null,
      course: course || null,
      funding_type: funding_type || null,
      when_to_start: when_to_start || null,
      additional_info: additional_info || null,
      is_read: false,
      status: "New",
    });
  } catch (err: any) {
    console.error("Supabase insert error:", err.message);
    // Don't block email sending if DB fails
  }

  // Send email
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    // 1. Send notification email to Admin
    await transporter.sendMail({
      from: `"Career Upgrade" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `New Enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nAddress: ${address || "N/A"}\nDate of Birth: ${date_of_birth || "N/A"}\nCourse: ${course || "N/A"}\nFunding: ${funding_type || "N/A"}\nWhen to Start: ${when_to_start || "N/A"}\nAdditional Info: ${additional_info || "N/A"}\nMessage: ${message}`,
      html: `
        <h2 style="color:#2563eb;">New Enquiry — Career Upgrade</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Address:</strong> ${address || "N/A"}</p>
        <p><strong>Date of Birth:</strong> ${date_of_birth || "N/A"}</p>
        <p><strong>Course:</strong> ${course || "N/A"}</p>
        <p><strong>Funding Type:</strong> ${funding_type || "N/A"}</p>
        <p><strong>When to Start:</strong> ${when_to_start || "N/A"}</p>
        <p><strong>Additional Info:</strong> ${additional_info || "N/A"}</p>
        <p><strong>Message:</strong><br/>${String(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

    // 2. Send beautiful confirmation receipt back to the student
    await transporter.sendMail({
      from: `"Career Upgrade" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `We have received your enquiry! — Career Upgrade`,
      text: `Hi ${name},\n\nThank you for contacting Career Upgrade Dental School!\n\nWe have successfully received your enquiry.\n\nOur team will review your message and get back to you with an answer within the next 24 hours.\n\nBest regards,\nSupport Team\nCareer Upgrade Dental School`,
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px 20px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="color: #2563eb; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Career Upgrade</h2>
            <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px; font-weight: 500;">Online Dental Nursing School UK</p>
          </div>
          <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; border: 1px solid #f1f5f9; margin-bottom: 24px;">
            <p style="color: #0f172a; font-size: 16px; font-weight: 600; margin-top: 0; margin-bottom: 12px;">Hi ${name},</p>
            <p style="color: #334155; font-size: 14.5px; line-height: 1.6; margin: 0 0 16px 0;">
              Thank you for contacting <strong>Career Upgrade Dental School</strong>! We have successfully received your message and enquiry details.
            </p>
            <p style="color: #334155; font-size: 14.5px; line-height: 1.6; margin: 0;">
              Our student support team is already reviewing your request. We will reach out to you with an answer via email or phone within the next <strong>24 hours</strong>.
            </p>
          </div>
          <div style="text-align: center; margin-bottom: 24px;">
            <p style="color: #475569; font-size: 14px; margin: 0;">If you have any further details to add, please reply directly to this email.</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <div style="text-align: center;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0; line-height: 1.5;">
              This is an automated confirmation of your enquiry receipt.<br/>
              Career Upgrade Dental School · Support Team
            </p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("Email error:", err.message);
    return res.status(500).json({ error: "Failed to send email." });
  }
}
