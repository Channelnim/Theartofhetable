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
      // 보낸 사람 이름을 설정 (답장 주소와는 별개)
      from: `"Chef Chris" <${process.env.EMAIL_USER}>`, 
      to: 'cwhirlow@gmail.com', 
      replyTo: 'chris@chriswhirlow.com', // 셰프님이 답장 누를 때 연결될 주소
      subject: `New Inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nEvent Type: ${type}\nVision: ${vision}`,
    });

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email Error:', error);
    return res.status(500).json({ message: 'Failed to send email' });
  }
}