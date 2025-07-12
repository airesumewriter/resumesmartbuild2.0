const formidable = require('formidable');
const nodemailer = require('nodemailer');

export const config = {
  api: {
    bodyParser: false, // Required for formidable
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ message: 'Form parsing error' });
    }

    const { firstName, lastName, email } = fields;

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const transporter = nodemailer.createTransport({
      host: 'mail.privateemail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'info@resumesmartbuild.com',
        pass: 'kvaj-okad-goqw-oeka', // ← Use your real password for now
      },
    });

    try {
      await transporter.sendMail({
        from: 'ResumeSmartBuild <info@resumesmartbuild.com>',
        to: email,
        subject: 'Thanks for Signing Up!',
        html: `
          <p>Hi ${firstName},</p>
          <p>Thanks for signing up! Here's your <a href="https://resumesmartbuild.com/files/resume-template.pdf">Resume Checklist</a>.</p>
        `,
      });

      return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Email error:', error);
      return res.status(500).json({ message: 'Error sending email' });
    }
  });
}
