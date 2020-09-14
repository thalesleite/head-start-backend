const nodemailer = require('nodemailer');

module.exports = {
  async sendEmail(request, response){
    const { name, email, message } = request.body;
    const user = 'thalesaleite@gmail.com';
    const password = 'Shika1992';

    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      auth: {
        user: user,
        pass: password
      }
    });

    const mailOptions = {
      from: `${user}`,
      to: `${email}, ${user}`,
      subject: 'Test!!!',
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
  }
}