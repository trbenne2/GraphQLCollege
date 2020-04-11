const nodemailer = require('nodemailer');

let transporter;
var emails = [];

if (process.env.NODE_ENV === 'test') {
  transporter = nodemailer.createTransport({
    jsonTransport: true,
  });
} else {
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });
}

function sendMail({ from, to, subject, text, html }) {
  const mailOptions = {
    from,
    to,
    subject,
    text,
    html,
  };
  emails.push(mailOptions);
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      resolve(info);
    });
  });
}

function deleteEmails() {
  while (emails.length > 0) {
    emails.pop();
  }
}

module.exports = {
  emails,
  sendMail,
  deleteEmails,
};
