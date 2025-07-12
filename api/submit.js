import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    await transporter.sendMail({
      from: `"${process.env.SENDER_NAME}" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '🎉 Your Resume Toolkit is Here!',
      html: `
        <p>Hi ${firstName},</p>
        <p>Thanks for signing up at <strong>ResumeSmartBuild</strong>!</p>
        <p>✅ Download Your Free Resume Checklist:<br>
        <a href="https://resumesmartbuild.com/files/resume-checklist.pdf">Click here to download</a></p>
        <p>🔥 Want to try our <strong>AI Resume Builder</strong>?<br>
        <a href="https://resumesmartbuild.com/">Start building now</a></p>
        <p>— The ResumeSmartBuild Team<br>info@resumesmartbuild.com</p>
      `
    });

    return res.redirect(302, '/thank-you.html');
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ message: 'Email failed to send' });
  }
}
