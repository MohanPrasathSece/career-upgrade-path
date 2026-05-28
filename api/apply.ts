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
    full_name, email, phone, address, date_of_birth,
    course, funding_type, when_to_start, additional_info,
  } = req.body;

  if (!full_name || !email || !phone || !funding_type) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  // Save to Supabase
  try {
    const supabase = getSupabase();
    await supabase.from("applications").insert({
      full_name,
      email,
      phone,
      address: address || null,
      date_of_birth: date_of_birth || null,
      course: course || "Dental Nursing - 1 Year",
      funding_type,
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
      subject: `New Application from ${full_name}`,
      text: `Name: ${full_name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address || "N/A"}\nDOB: ${date_of_birth || "N/A"}\nCourse: ${course || "N/A"}\nFunding: ${funding_type}\nWhen to Start: ${when_to_start || "N/A"}\nAdditional Info: ${additional_info || "N/A"}`,
      html: `
        <h2 style="color:#2563eb;">New Application — Career Upgrade</h2>
        <p><strong>Name:</strong> ${full_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address || "N/A"}</p>
        <p><strong>Date of Birth:</strong> ${date_of_birth || "N/A"}</p>
        <p><strong>Course:</strong> ${course || "N/A"}</p>
        <p><strong>Funding Type:</strong> ${funding_type}</p>
        <p><strong>When to Start:</strong> ${when_to_start || "N/A"}</p>
        <p><strong>Additional Info:</strong><br/>${String(additional_info || "").replace(/\n/g, "<br/>")}</p>
      `,
    });

    // 2. Send beautiful confirmation receipt back to the student
    await transporter.sendMail({
      from: `"Career Upgrade" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `We have received your application! — Career Upgrade`,
      text: `Hi ${full_name},\n\nThank you for applying to Career Upgrade Dental School!\n\nWe have successfully received your application for the "${course || "Dental Nursing - 1 Year"}" course.\n\nOur admissions team will review your application details and get in touch with you within the next 24 hours.\n\nBest regards,\nAdmissions Team\nCareer Upgrade Dental School`,
      html: `
        <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px 20px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="color: #2563eb; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Career Upgrade</h2>
            <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px; font-weight: 500;">Online Dental Nursing School UK</p>
          </div>
          <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; border: 1px solid #f1f5f9; margin-bottom: 24px;">
            <p style="color: #0f172a; font-size: 16px; font-weight: 600; margin-top: 0; margin-bottom: 12px;">Hi ${full_name},</p>
            <p style="color: #334155; font-size: 14.5px; line-height: 1.6; margin: 0 0 16px 0;">
              Thank you for applying to <strong>Career Upgrade Dental School</strong>! We are thrilled that you want to take the next step in your career journey with us.
            </p>
            <div style="background-color: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 16px;">
              <p style="margin: 0; color: #64748b; font-size: 12px; font-weight: 600; text-uppercase: true; tracking: 0.5px;">APPLIED COURSE</p>
              <p style="margin: 4px 0 0 0; color: #2563eb; font-size: 16px; font-weight: 700;">${course || "Dental Nursing - 1 Year"}</p>
            </div>
            <p style="color: #334155; font-size: 14.5px; line-height: 1.6; margin: 0;">
              Our admissions team is already reviewing your details. We will reach out to you via email or phone within the next <strong>24 hours</strong> to discuss the next steps in your enrollment.
            </p>
          </div>
          <div style="text-align: center; margin-bottom: 24px;">
            <p style="color: #475569; font-size: 14px; margin: 0;">If you have any urgent questions, please reply directly to this email.</p>
          </div>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <div style="text-align: center;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0; line-height: 1.5;">
              This is an automated confirmation of your application receipt.<br/>
              Career Upgrade Dental School · Admissions Team
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
