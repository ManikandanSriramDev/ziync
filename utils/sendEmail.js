const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME, // Corrected to use EMAIL_USERNAME
        pass: process.env.EMAIL_PASSWORD // Corrected to use EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME, // Corrected to use EMAIL_USERNAME
      to: to,
      subject: subject,
      text: text,
    });

    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error.message, error.stack);
  }
};

module.exports = sendEmail;