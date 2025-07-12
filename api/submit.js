import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'info@resumesmartbuild.com',
      pass: 'your-app-password-here' // 💡 Use app password from Namecheap
    }
  });

  try {
    await transporter.sendMail({
      from: 'ResumeSmartBuild <info@resumesmartbuild.com>',
      to: email,
      subject: 'Thanks for Signing Up!',
      text: `Hi ${firstName}, thanks for signing up! Download your resume checklist here.`,
      html: `<p>Hi ${firstName},</p><p>Thanks for signing up!</p><a href="/files/resume-template.pdf">Download your checklist</a>`
    });

    return res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ message: 'Email failed to send' });
  }
}
