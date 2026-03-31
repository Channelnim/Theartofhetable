import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // 1. POST 요청만 허용
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, date, type, vision } = req.body;

  // 2. 이메일 전송 설정
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // 3. 실제 메일 발송
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'cwwhirlow@gmail.com', // 셰프님이 알림을 받을 메일
      replyTo: 'chris@chriswhirlow.com', // 셰프님이 답장 버튼 눌렀을 때 갈 주소
      subject: `New Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nEvent Type: ${type}\nVision: ${vision}`,
    });

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email Error:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  }
}