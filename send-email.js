const nodemailer = require('nodemailer');

// Use environment variables for sensitive credentials
const emailUser = process.env.EMAIL_USER || 'your-email@gmail.com';
const emailPass = process.env.EMAIL_PASS || 'your-app-password';
const recipientEmail = process.env.RECIPIENT_EMAIL || 'recipient@gmail.com';

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailUser,
    pass: emailPass
  }
});

let mailOptions = {
  from: emailUser,
  to: recipientEmail,
  subject: 'Test Email',
  text: 'Hello from Nodemailer!'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
