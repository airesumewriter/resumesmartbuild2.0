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
      pass: 'Kenzoann84!!' // from Namecheap's private email app password
    }
  });

  try {
    await transporter.sendMail({
      from: 'ResumeSmartBuild <info@resumesmartbuild.com>',
      to: email,
      subject: 'Thanks for Signing Up!',
      text: `Hi ${firstName}, thanks for signing up!`,
      html: `<p>Hi ${firstName},</p><p>Thanks for signing up! Here's your <a href="/files/resume-template.pdf">Resume Checklist</a>.</p>`
    });

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ message: 'Error sending email' });
  }
}
