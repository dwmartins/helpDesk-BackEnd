const Nodemailer = require('../../models/nodemailer/nodemailer');
const fs = require('fs');

const sendEmail = new Nodemailer();

function welcome(to, name) {

   fs.readFile('src/modelsEmail/welcome.html', 'utf8', (err, data) => {
    if (err) {
        console.log(`error reading email sending html: ${err}`);
        return;
    }

    const modifiedEmail = data.replace('$userName', name);
    const subject = "Bem vindo ao Help Desk"

    sendEmail.sendEmail(to, subject, modifiedEmail);
   });
};

module.exports = { welcome };