const config = require('../config');
const nodemailer = require('nodemailer');
const pdfService = require('./pdf');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: config.gmailUser, // generated ethereal user
    pass: config.gmailPass, // generated ethereal password
  },
});

const correo = async (to, subject, html='<b>Hello world?</b>') => {
  try {
    await transporter.sendMail({
      from: '"Bingoloteando" <nicoflores.dev@gmail.com>', // sender address
      to, // list of receivers
      subject, // Subject line
      // text: "Hello world?", // plain text body
      html, // html body
    });
  } catch (err) {
    throw new Error(err);
  }
};

const correoConfirmation = async (to, cartones, catalogo) => {
  try {
    // eslint-disable-next-line new-cap
    const content = await pdfService.CartonesPdf(cartones, catalogo);
    await transporter.sendMail({
      from: '"Bingoloteando" <nicoflores.dev@gmail.com>', // sender address
      to, // list of receivers
      subject: 'Confirmación de compra Bingoloteando✨', // Subject line
      // text: "Hello world?", // plain text body
      html: `
      <h1>Hola!</h1>
      <p>
        Queremos confirmarle la compra de sus cartones de <b>BINGO</b>.
      <br/>
        Se adjunta un archivo <b>PDF</b> con la impresión de los mismos.
      <br/>
      <br/>
        El día antes del BINGO (que se realizará el 6 de agosto),
        recibirá por este mismo medio el link para unirse al zoom
        de la transmisión.
      <br/>
      <br/>
        De parte de todo el equipo organizador,
        le damos nuestros más sinceros agradecimientos
        por cooperar con esta noble causa, en apoyo a nuestra querida Isabelita.
      </p>

      <p><b>
        Atte.
      <br/>
        Equipo técnico Bingoloteando.
      </b></p>
      <small>
        Recuerda que también puedes revisar tus cartones en la página: https://bingoloteando.herokuapp.com/
      </small>
`, // html body
      attachments: [{filename: 'MisCartonesBingoloteando.pdf', content}],
    });
  } catch (err) {
    throw new Error(err);
  }
};


module.exports = {
  correo,
  correoConfirmation,
};
