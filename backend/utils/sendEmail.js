// backend/utils/sendEmail.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g., smtp.gmail.com
  port: process.env.SMTP_PORT, // e.g., 587
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // your email address
    pass: process.env.SMTP_PASS, // your email password or app-specific password
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.SMTP_FROM, // sender address
    to,
    subject,
    text,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
