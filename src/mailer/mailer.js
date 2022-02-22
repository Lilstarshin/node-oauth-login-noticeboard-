const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const { MAILER_USER, MAILER_PASS } = process.env;
async function wrapedSendMail(mailOptions) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport(
      smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
          user: MAILER_USER,
          pass: MAILER_PASS,
        },
      })
    );
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        reject(new Error(`node-mailer : Failed to send mail -> ${err}`));
      } else {
        resolve(`node-mailer : Mail sent successfully -> ${info.response}`);
      }
    });
  });
}

// const mailOptions = {
//   to: 'lilstar_shin@kakao.com',
//   subject: 'test send mail',
//   text: 'it is node mailer test',
// };

module.exports = {
  wrapedSendMail,
};
