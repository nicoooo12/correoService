/* eslint-disable max-len */
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

const correoConfirmation = async (
    to, name = '', cartones, catalogo, orden, fecha,
) => {
  try {
    // eslint-disable-next-line new-cap
    const content = await pdfService.CartonesPdf(cartones, catalogo);
    await transporter.sendMail({
      from: '"Bingoloteando" <nicoflores.dev@gmail.com>', // sender address
      to, // list of receivers
      subject: 'Confirmación de compra Bingoloteando✨', // Subject line
      // text: "Hello world?", // plain text body
      html: `
      <h1>Hola${' '+ name}!</h1>
      <b>Tu compra de cartones se ha realizado con éxito.</b>

      <p>Detalles de tu compra: <br/>
      ${orden.map((e)=>{
    if (e.serie === 0) {
      return '  - Entrada x1';
    }
    return `  - ${catalogo.filter((o)=>{
      return o.serie === e.serie;
    })[0].titulo} x${e.cantidad}`;
  }).toString().replace(/,/g, '<br/>')}
      </p>
      <p>
      Además, en este correo adjuntamos tus cartones en <b>PDF</b>, para que 
      juegues a la antigua.
      </p>

      <p>
      Podrás jugar tus cartones cuando inicie el bingo 
      este <b>${fecha}</b>
      </p>

      <p><b>
        Atte.
      <br/>
        Equipo técnico Bingoloteando.
      </b></p>
      <small>
        Para mayor información sobre tu compra y como jugar entra a  https://bingoloteando.herokuapp.com/
      </small>
`, // html body
      attachments: [{filename: 'MisCartonesBingoloteando.pdf', content}],
    });
  } catch (err) {
    throw new Error(err);
  }
};

const correoChangePassword = async (
    to, name = '', code,
) => {
  try {
  // eslint-disable-next-line new-cap
    await transporter.sendMail({
      from: '"Bingoloteando" <nicoflores.dev@gmail.com>', // sender address
      to, // list of receivers
      subject: 'Recupera tu contraseña', // Subject line
      // text: "Hello world?", // plain text body
      html: `
    <h1>Hola${' '+ name}!</h1>
    <b>Entra al siguiente url para cambiar tu contraseña</b>

    <p>
    <a href="https://bingoloteando.herokuapp.com/password/${to}/${code}" >https://bingoloteando.herokuapp.com/password/${to}/${code}</a>
    </p>

    <p>No compartas esta url con nadie</p>

    <p><b>
      Atte.
    <br/>
      Equipo técnico Bingoloteando.
    </b></p>
`, // html body
      // attachments: [{filename: 'MisCartonesBingoloteando.pdf', content}],
    });
  } catch (err) {
    throw new Error(err);
  }
};

const massageOrden = async (
    to, name = '', message,
) => {
  try {
    // eslint-disable-next-line new-cap
    await transporter.sendMail({
      from: '"Bingoloteando" <nicoflores.dev@gmail.com>', // sender address
      to, // list of receivers
      subject: 'Nuevo mensaje en tu Orden 👀', // Subject line
      // text: "Hello world?", // plain text body
      html: `
  <h1>Hola${' '+ name}!</h1>
  <b>Un administrador agregó un mensaje a tu orden de compra.</b>

  <p>
    "${message}"
  </p>

  <p><b>
    Atte.
  <br/>
    Equipo técnico Bingoloteando.
  </b></p>
  <small>
    Entra aquí para ver tu orden https://bingoloteando.herokuapp.com/ordenes
  </small>
`, // html body
    // attachments: [{filename: 'MisCartonesBingoloteando.pdf', content}],
    });
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  correo,
  correoConfirmation,
  correoChangePassword,
  massageOrden,
};
