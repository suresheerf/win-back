const nodemailer = require('nodemailer');

const sendEmail = async options => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "785ddb875c7dc3",
          pass: "17485837d4aa03"
        }
      });

    const mailOptions = {
        from : 'winrobot <winrobot@gmail.com>',
        to: options.email,
        subject : options.subject,
        text: options.message
    }

    await transport.sendMail(mailOptions);
}

module.exports = sendEmail;