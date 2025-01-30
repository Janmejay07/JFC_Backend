import nodemailer from 'nodemailer';

// Use environment variables for sensitive data
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Use the email from .env
    pass: process.env.EMAIL_PASS, // Use the password from .env
  },
});

export const sendEmail = (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Use the email from .env
    to: process.env.EMAIL_USER,   // Send to your email
    subject: `New Message from ${name}`,
    text: `You have received a new message from ${name} (${email}):\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error sending email' });
    }
    console.log('Email sent: ' + info.response);
    return res.status(200).json({ message: 'Email sent successfully' });
  });
};
