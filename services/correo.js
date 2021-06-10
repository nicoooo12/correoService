const config = require('../config')
const nodemailer = require('nodemailer')
const pdfService = require('./pdf')

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: config.gmailUser, // generated ethereal user
    pass: config.gmailPass, // generated ethereal password
  },
});

async function correo(to, subject, html="<b>Hello world?</b>"){
  try {
    
    await transporter.sendMail({
      from: '"Bingoloteando" <nicoflores.dev@gmail.com>', // sender address
      to, // list of receivers
      subject, // Subject line
      // text: "Hello world?", // plain text body
      html, // html body
    });

  } catch (err) {
    
    throw new Error(err)

  }
}

async function correoConfirmation(to, cartones){
  try {
    let content = await pdfService.CartonesPdf(cartones);
    await transporter.sendMail({
      from: '"Bingoloteando" <nicoflores.dev@gmail.com>', // sender address
      to, // list of receivers
      subject: 'Confirmación de compra Bingoloteando✨', // Subject line
      // text: "Hello world?", // plain text body
      html: "<b>Hola! </b>Confirmamos la compra de tus cartones para el bingo✨.  Además adjuntamos un archivo <b>pdf</b> en donde encontrarás los cartones de tu compra. <br>De parte de todo el equipo organizador, te damos las gracias por ayudar colaborando a esta causa.<br><br>atte: equipo técnico <b>Bingoloteando</b>", // html body
      attachments: [{ filename: 'MisCartonesBingoloteando.pdf', content}]
    });

  } catch (err) {
    
    throw new Error(err)

  }
}



module.exports = {
  correo,
  correoConfirmation,
}