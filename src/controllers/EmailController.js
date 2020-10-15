const nodemailer = require('nodemailer');
const generateCertificate = require('../utils/generateCertificate');
const path = require('path');

const user = process.env.EMAIL_USERNAME;
const password = process.env.EMAIL_PASSWORD;

const local = require('../utils/getDomain');

const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: user,
    pass: password
  }
});

module.exports = {
  async sendEmail(request, response){
    const { name, email, message, subject } = request.body;

    const mailOptions = {
      from: `${user}`,
      to: `${email}, ${user}`,
      subject: `${subject}`,
      html: `<p>Name: ${name}</p>
             <p>Message: ${message}</p>`
    };

    await smtpTransport.sendMail(mailOptions,
      (error, info) => {
        if(error) {
          response.send(error);
        }else {
          response.send('Email sent: ' + info.response);
        }
        smtpTransport.close();
    });
  },
  async sendCertificate(request, response){
    const { name, email } = request.body;

    const mailOptions = {
      from: `${user}`,
      to: `${email}`,
      subject: `Certificado Head Start Courses - Food Safety - HACCP(Level 1)`,
      html: `
        <p>Parabens ${name}!</p>
        <p>Você finalizou o curso Food Safety - HACCP(Level 1)</p>
        <p>Segue em anexo o certificado e um pdf com o conteúdo do curso.</p>
      `,
      attachments: [
        {
          filename: 'certificate.pdf',
          path: path.join(__dirname, '..', 'utils/files', 'certificate.pdf')
        }
      ]
    };

    try {
      await generateCertificate.generate(name);

      await smtpTransport.sendMail(mailOptions,
        (error, info) => {
          if(error) {
            response.send(error);
          }else {
            response.send('Email sent: ' + info.response);
          }
          smtpTransport.close();
      });
    } catch (error) {
      console.log(error);
    }
  },
  async sendRegistrationEmail(name, email) {
    const mailOptions = {
      from: `${user}`,
      to: `${email}`,
      subject: `Head Start Courses - Registration`,
      html: `
        <p>Hi, ${name}</p>
        <p>Your registration has been completed!</p>
        <p>Enjoy our courses!</p>
      `
    };

    await smtpTransport.sendMail(mailOptions,
      (error, info) => {
        if(error) {
          response.send(error);
        }else {
          response.send('Email sent: ' + info.response);
        }
        smtpTransport.close();
    });
  },
  async sendPassword(email, token) {
    const mailOptions = {
      from: `${user}`,
      to: `${email}`,
      subject: `Head Start Courses - Reset Password`,
      html: `
        <p>Hello there,</p>
        <p>Please click on the following link to reset your password:</p>
        <p>${local.DOMAIN}/reset/${token}</p>
      `
    };

    await smtpTransport.sendMail(mailOptions,
      (error, info) => {
        if(error) {
          response.send(error);
        }else {
          response.send('Email sent: ' + info.response);
        }
        smtpTransport.close();
    });
  }
}