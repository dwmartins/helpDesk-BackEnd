const nodemailer = require('nodemailer');
require('dotenv').config();

class Nodemailer {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.SENHA
            }
        });
    };

    sendEmail(to, subject, text) {
        const mailOptions = {
            from: `Help Desk <${process.env.EMAIL}>`,
            to: to,
            subject: subject,
            html: text
        }

        this.transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
                console.log(`Erro ao enviar o e-mail para ${to}: ${error}`);
            } 

            return true;
        });
    };
}

module.exports = Nodemailer;