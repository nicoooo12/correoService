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
    const time = new Date(fecha);
    const day = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const month = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const date = `${day[time.getDay() - 1]} ${time.getDate()} de ${month[time.getMonth()]} a las ${time.getHours()}${time.getMinutes() > 0 ? `:${time.getMinutes()}` : '' }hrs`;
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
      return 'Promo';
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
      este <b>${date}</b>
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

module.exports = {
  correo,
  correoConfirmation,
};
