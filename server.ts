import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Inquiry
  app.post("/api/inquiry", async (req, res) => {
    const { name, email, phone, date, type, vision } = req.body;

    if (!name || !email || !phone || !date || !type || !vision) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const emailUser = process.env.EMAIL_USER || "cwhirlow@gmail.com";
      const emailPass = process.env.EMAIL_PASS;

      if (!emailPass) {
        console.error("EMAIL_PASS is not set in environment variables.");
        return res.status(500).json({ error: "Server configuration error: Email password missing." });
      }

      // Configure Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      const mailOptions = {
        from: `"Chris Whirlow Inquiry" <${emailUser}>`, // Use the authenticated email as sender
        to: "cwhirlow@gmail.com", // Actual recipient
        replyTo: email, // Reply to the customer's email
        subject: `New Inquiry from ${name}`,
        text: `
          New Inquiry Details:
          -------------------
          Name: ${name}
          Email: ${email}
          Phone: ${phone}
          Event Date: ${date}
          Event Type: ${type}
          
          Vision:
          ${vision}
        `,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
            <h2 style="border-bottom: 1px solid #eee; padding-bottom: 10px;">New Inquiry Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Event Date:</strong> ${date}</p>
            <p><strong>Event Type:</strong> ${type}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <h3>Vision:</h3>
            <p style="white-space: pre-wrap;">${vision}</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      res.json({ success: true, message: "Inquiry sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send inquiry. Please try again later." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
