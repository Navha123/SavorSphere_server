const sendEmail = require('../utils/sendEmail');

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Send email to admin
    await sendEmail({
      email: 'sreenavhasenthilkumar@gmail.com', // Admin email
      subject: `Contact Form: ${subject}`,
      message: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
    });

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending contact message:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
};

module.exports = { sendContactMessage };