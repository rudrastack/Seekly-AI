import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify()
  .then(() => { console.log('Email transporter is ready to send messages'); })
  .catch((error) => { console.error('Error setting up email transporter', error); });

export async function sendEmail({ to, subject, text, html }) {
  console.log("TO:", to);
  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to,
    subject,
    html,
    text,
  }

  const details = await transporter.sendMail(mailOptions);
  console.log('Email sent successfully', details);
}

