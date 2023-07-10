const Nodemailer = require('../../models/nodemailer/nodemailer');

const sendEmail = new Nodemailer();

function welcome() {

    const to = 'email do destinatario!!'
    const subject = 'assunto teste'
    const texthtml = '<strong>teste de envio de e-mail</strong>'
    sendEmail.sendEmail(to, subject, texthtml);

};

module.exports = {welcome};