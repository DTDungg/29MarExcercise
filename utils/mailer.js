const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 25,
    secure: false, 
    auth: {
      user: "d56f9865e84403",
      pass: "5d41d99cf3988e",
    },
  });
module.exports = {
    sendMailForgotPassword: async function(to,URL){
        return await transporter.sendMail({
            to:to,
            subject:"THU MOI DU LICH VIEC NHE VOLT CAO",
            html:`<a href=${URL}>CLICK VAO DAY DE DANG KI QUA CAM</a>`
        })
    }
}