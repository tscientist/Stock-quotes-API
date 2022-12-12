const nodemailer = require("nodemailer");

function sendEmail() {
    const transporter = nodemailer.createTransport({
        host: "teste@gmail.com",
        port: 25,
        secure: false, // true for 465, false for other ports
        tls: { rejectUnauthorized: false }
      });
      const mailOptions = {
        from: 'teste@gmail.com',
        to: 'teste@gmail.com',
        subject: 'E-mail enviado usando Node!',
        text: 'Bem fácil, não? ;)'
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email enviado: ' + info.response);
        }
      });
}

module.exports = {
    sendEmail,
}