const Contact = require('../models/Contact');

// Handle contact form submission
exports.submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Name, email, subject, and message are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : undefined,
      subject: subject.trim(),
      message: message.trim()
    });

    await contact.save();
    res.json({ message: 'Thank you for your message! We will get back to you soon.' });
  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
};

// Get all contact submissions (for admin use)
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .lean();

    res.json({ contacts });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Mark contact as read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    
    await Contact.findByIdAndUpdate(id, { status: 'read' });
    res.json({ message: 'Contact marked as read' });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
