const nodemailer = require("nodemailer");

async function sendEmail(newPassword, userEmail) {
    console.log(newPassword);
    console.log(userEmail);


  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

    const info =  await transporter.sendMail({
      from: 'Stock Services <stockService@example.com>', // sender address
      to: userEmail, // list of receivers
      subject: "New password request", // Subject line
      text: `Your new generated password is ${newPassword}`, // plain text body
    });

    console.log(info);
}

module.exports = {
    sendEmail,
}