const htmlToPdf = require('html-pdf-node');

const layout = (body) => {
  const primaryDefault = '#5F2EEA';
  const greyscaleOff = '#FCFCFC';
  return (`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Bingoloteando</title>
    <style>
      @media print{

        html {
          -webkit-print-color-adjust: exact;
        }

        *{
          font-family: 'Poppins', sans-serif;
          border: 0;
          padding: 0;
          margin: 0;
          box-sizing: border-box;
        }
        
        body{
          width: 100%;
          position: absolute;
          min-height: 100%;
        }
        
        .th{
          padding: .5rem .5rem;
          background-color: ${primaryDefault}!important;
          color: ${greyscaleOff};
          font-size: 24px;
          line-height: 38px;
          letter-spacing: 0.75px;
          font-weight: 600;
        }
        .td{
          padding: .5rem .5rem;
          position: relative;
          border-width: 0 1px;
          width: 92px;
          text-align: center;
          font-size: 24px;
          line-height: 38px;
          letter-spacing: 0.75px;
          font-weight: 400;
        }
      }

      
    </style>
  </head>
  <body>
      
      ${body}

  </body>
  </html>
  `);
};

const carton = (title, code, data, color='#5F2EEA', index) => {
  const greyscaleLine = '#F7F7FC';
  const primaryLight = '#E4DAFF';
  const primaryDark = '#2A00A2';
  return (`
  <div
    style='
    width: 100%;
    height: 50%;
    top: calc(50% * ${index} );
    position: absolute;
    display: block;
  '>
    <div style='
    width: 60%;
    height: 90%;
    top: 5%;
    left: 20%;
    position: absolute;
    background: ${greyscaleLine}!important;
    border-radius: 32px;
    border: solid 1px ${primaryLight};
    display: block;
    '>

        <div style='
          height: 80%;
          width: 90%;
          top: 10%;
          left:5%;
          position:absolute;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        '>
          <h1 style='
            font-size: 32px;
            margin-left: 2.5%;
            line-height: 34px;
            letter-spacing: 1px;
            font-weight: 400;
            margin: 15px 0;
          '>
            ${title}
          </h1>
          <table style='
            top: 20%;
            margin-left: 2.5%;
            height: 60%;
            width: 95%;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none; 
            border-collapse: collapse;
            border: 2px solid ${color}!important;
          '>
            <thead style='
              width: 100%;
              vertical-align: bottom;
            '>
              <tr style='background:red!importan'>
                <th class='th' style='background: ${color}!important;' >B</th>
                <th class='th' style='background: ${color}!important;' >I</th>
                <th class='th' style='background: ${color}!important;' >N</th>
                <th class='th' style='background: ${color}!important;' >G</th>
                <th class='th' style='background: ${color}!important;' >O</th>
              </tr>
            </thead>
            <tbody style='
              vertical-align: inherit;
            '>
              <tr>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[0][0]}</td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[1][0]}</td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[2][0]}</td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[3][0]}</td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[4][0]}</td>
              </tr>
              <tr>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[0][1]}</td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[1][1]}</td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[2][1]}</td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[3][1]}</td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[4][1]}</td>
              </tr>
              <tr>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[0][2]}</td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[1][2]}</td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                  X
                </td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[3][2]}</td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[4][2]}</td>
              </tr>
              <tr>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[0][3]}
                </td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[1][3]}</td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[2][3]}</td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[3][3]}</td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[4][3]}</td>
              </tr>
              <tr>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[0][4]}</td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[1][4]}</td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[2][4]}</td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[3][4]}</td>
                <td class='td' style='border: 2px solid ${color}!important;' >
                ${data[4][4]}</td>
              </tr>
            </tbody>
          </table>
          <div style='
            width: 100%;
            align-items: center;
            margin: 20px 0 0 0;
            display: flex;
            height: 32px;
            justify-content: space-between;
          '>

          <div style='
          background: ${primaryLight}!important;
          color: ${primaryDark};
          padding: .34rem .50rem;
          height: 30px;
          border-radius: 39px;
          display: inline-block;
          text-align: center;
          position: relative;
          justify-content: center;
          align-items: center;
          '>
          <span style='
            font-size: 16px;
            line-height: 28px;
            letter-spacing: 0.75px;
            font-weight: 600;
            display: inline-block;
            text-align: center;
            justify-content: center;
            align-items: center;
            position: relative;
            top: -4px;
            padding: 0 5px;
          '>
          código: ${code}
          </span>
        </div>

            
          </div>
        </div>
      </div>
  </div>
  `);
};

const CartonesPdf = async (cartones, catalogo) => {
  const options = {
    format: 'Letter',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };
  const file = {content:
    layout(cartones.map((e, index)=>{
      return carton(e.title, e.serie, e.data,
          catalogo.filter((o)=>{
            return o.serie === e.serie;
          })[0].color,
          index,
      );
    }).join(''),
    ),
  };
  try {
    const generado = await htmlToPdf.generatePdf(file, options);
    return generado;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  CartonesPdf,
};
