const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT) {
    console.warn('SMTP configuration not found. Email notifications disabled.');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    } : undefined
  });
};

// Send email notification for stage change
const sendStageChangeEmail = async (application, job, templateKey) => {
  const transporter = createTransporter();
  if (!transporter) return { success: false, message: 'SMTP not configured' };

  const template = job.emailTemplates?.[templateKey];
  if (!template || !template.enabled) {
    return { success: false, message: 'Email template not enabled' };
  }

  if (!application.candidateEmail) {
    return { success: false, message: 'No candidate email' };
  }

  try {
    // Simple variable replacement in subject and body
    const subject = template.subject
      .replace('{{candidateName}}', application.candidateName)
      .replace('{{jobTitle}}', job.title);
    
    const body = template.body
      .replace('{{candidateName}}', application.candidateName)
      .replace('{{jobTitle}}', job.title);

    await transporter.sendMail({
      from: process.env.SMTP_USER || 'noreply@company.com',
      to: application.candidateEmail,
      subject: subject,
      text: body,
      html: `<pre>${body}</pre>`
    });

    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: error.message };
  }
};

module.exports = {
  sendStageChangeEmail
};
