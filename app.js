// =========================
// FRONTEND TYPEWRITER EFFECT
// =========================
// You can add animations or scroll effects here later

const text = "ASHWINI KASHYAP";
const typewriter = typeof document !== "undefined" ? document.getElementById("typewriter") : null;
let index = 0;
let isDeleting = false;

function typeEffect() {
  if (!typewriter) return; // avoid error in Node.js

  if (!isDeleting) {
    typewriter.textContent = text.slice(0, index++);
    if (index > text.length) {
      isDeleting = true;
      setTimeout(typeEffect, 900); // Pause before deleting
      return;
    }
  } else {
    typewriter.textContent = text.slice(0, index--);
    if (index < 0) {
      isDeleting = false;
    }
  }
  setTimeout(typeEffect, isDeleting ? 100 : 200);
}

// Only run typewriter if in browser (not Node.js)
if (typeof window !== "undefined") {
  typeEffect();
}

// =========================
// BACKEND (Express + Nodemailer)
// =========================

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname)); // serve html, css, js

// Route to handle form submission
app.post("/send", (req, res) => {
  const { name, email, phone, requirement, message } = req.body;

  // Setup transporter (using Gmail)
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",       // your email
      pass: "your-app-password"           // Gmail app password
    }
  });

  // Mail details
  let mailOptions = {
    from: email,
    to: "your-email@gmail.com",          // where you want to receive mails
    subject: `New Contact Form Message from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Requirement: ${requirement}
      Message: ${message}
    `
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("❌ Error sending message. Try again.");
    } else {
      console.log("✅ Email sent: " + info.response);
      res.send("✅ Message sent successfully!");
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
