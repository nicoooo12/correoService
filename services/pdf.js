const html_to_pdf  = require('html-pdf-node');

function layout(body) {
  let primary_default = '#5F2EEA'
  let greyscale_off = '#FCFCFC'
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
          background-color: ${primary_default}!important;
          color: ${greyscale_off};
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
  `)
}


function carton(title, serie, data, color='#5F2EEA'){
  let greyscale_line = '#F7F7FC'
  let primary_light = '#E4DAFF'
  let primary_dark = '#2A00A2'
  return (`

  <div style='
  width: 430px;
  height: calc(50%);
  background: ${greyscale_line}!important;
  border-radius: 32px;
  margin: 10px;
  margin-left: calc( (100% - 430px) / 2);
  margin-top: 40px;
  border: solid 1px ${primary_light};
  display: inline-block;
  '>

      <div style='
        margin: 30px 30px 30px 30px;
        height: calc(100% - 60px);
        min-height: 240px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      '>
        <h1 style='
          font-size: 32px;
          line-height: 34px;
          letter-spacing: 1px;
          font-weight: 400;
          margin-bottom: 20px;
        '>
          ${title}
        </h1>
        <table style='
          height: 100%;
          width: 100%;
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
              <td class='td' style='border: 2px solid ${color}!important;' >${data[0][0]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[1][0]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[2][0]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[3][0]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[4][0]}</td>
            </tr>
            <tr>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[0][1]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[1][1]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[2][1]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[3][1]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[4][1]}</td>
            </tr>
            <tr>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[0][2]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[1][2]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[2][2]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[3][2]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[4][2]}</td>
            </tr>
            <tr>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[0][3]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[1][3]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[2][3]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[3][3]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[4][3]}</td>
            </tr>
            <tr>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[0][4]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[1][4]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[2][4]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[3][4]}</td>
              <td class='td' style='border: 2px solid ${color}!important;' >${data[4][4]}</td>
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
        background: ${primary_light}!important;
        color: ${primary_dark};
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
          padding: 0 5px 0 5px;
        '>
          serie: ${serie}
        </span>
      </div>

          
        </div>
      </div>
    </div>
  `)
}

async function CartonesPdf (cartones) {
  let options = { format: 'Letter',  args: ['--no-sandbox', '--disable-setuid-sandbox'] };
  let file = { content:
    layout(
      cartones.map((e)=>{
        return carton(e.title, e.serie, e.data, e.color) 
      }).join(' ')
    )
  };
  try {
    let generado = await html_to_pdf.generatePdf(file, options)
    return generado;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  CartonesPdf,
}