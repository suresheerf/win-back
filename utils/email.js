const nodemailer = require('nodemailer');
const pug = require('pug');
const {htmlToText} = require('html-to-text');

module.exports = class Email{
  constructor(user , url){
    this.to = user.email;
    this.firstname = user.name.split(' ')[0];
    this.url = url;
    this.from = `WIN-ROBOT <${process.env.EMAIL_FROM}>`
  }
    newTransport(){
      if(process.env.NODE_ENV === 'production')
        return nodemailer.createTransport({
         service:"SendGrid",
         auth:{
           user:process.env.SENDGRID_USERNAME,
           pass:process.env.SENDGRID_PASSWORD
         }
      });
    
    return nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "785ddb875c7dc3",
        pass: "17485837d4aa03"
      }
    });

   }

   async send(template , subject){
     const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`,{
       firstName: this.firstname,
       url:this.url,
       subject
     });
     
     const mailOptions = {
      from : this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html)
  }
   
   await this.newTransport().sendMail(mailOptions);

   }

   async sendWelcome(){
    await this.send('welcome','welcome to winrobot!')
   }
   async sendPasswordResetToken(){
    await this.send('passwordReset','Password reset Token(valid for only 10 minutes.)')
   }

}
