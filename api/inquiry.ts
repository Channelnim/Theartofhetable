import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // POST 요청이 아니면 거절
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, date, type, vision } = req.body;

  // 이메일 전송 설정 (환경변수 사용)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'cwhirlow@gmail.com', // 실제 메일을 받을 주소
      subject: `New Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nEvent Type: ${type}\nVision: ${vision}`,
    });

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email Error:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  }
}