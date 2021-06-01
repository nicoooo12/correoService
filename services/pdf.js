const htmlPdf = require('html-pdf')
// const html_to_pdf = require('html-pdf-node')


function layout(body) {
  return (`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bingoloteando</title>
    <style>
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
        background: $greyscale_bg;
      }
    </style>
  </head>
  <body>
      
      ${body}

  </body>
  </html>
  `)
}


function carton(title, serie, data){
  let primary_default = '#5F2EEA'
  let greyscale_line = '#F7F7FC'
  let primary_light = '#E4DAFF'
  let primary_dark = '#2A00A2'
  let greyscale_off = '#FCFCFC'
  return (`

  <div style='
  width: 430px;
  height: calc(50% - 20px );
  background: ${greyscale_line};
  border-radius: 32px;
  margin: 10px;
  margin-left: calc( (100% - 430px) / 2);
  margin-top: 40px;
  filter: drop-shadow(0px 8px 16px rgba(17, 17, 17, 0.04));
  display: inline-block;
  '>

      <div style='
        margin: 30px;
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
          border: 2px solid ${primary_default};
        '>
          <thead style='
            width: 100%;
            vertical-align: bottom;
          '>
            <tr>
              <th style='
                padding: .5rem .5rem;
                background-color: ${primary_default};
                color: ${greyscale_off};
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 600;
              '>B</th>
              <th style='
                padding: .5rem .5rem;
                background-color: ${primary_default};
                color: ${greyscale_off};
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 600;
              '>I</th>
              <th style='
                padding: .5rem .5rem;
                background-color: ${primary_default};
                color: ${greyscale_off};
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 600;
              '>N</th>
              <th style='
                padding: .5rem .5rem;
                background-color: ${primary_default};
                color: ${greyscale_off};
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 600;
              '>G</th>
              <th style='
                padding: .5rem .5rem;
                background-color: ${primary_default};
                color: ${greyscale_off};
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 600;
              '>O</th>
            </tr>
          </thead>
          <tbody style='
            vertical-align: inherit;
          '>
            <tr>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[0][0]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[1][0]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[2][0]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[3][0]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[4][0]}</td>
            </tr>
            <tr>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[0][1]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[1][1]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[2][1]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[3][1]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[4][1]}</td>
            </tr>
            <tr>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[0][2]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[1][2]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[2][2]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[3][2]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[4][2]}</td>
            </tr>
            <tr>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[0][3]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[1][3]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[2][3]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[3][3]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[4][3]}</td>
            </tr>
            <tr>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[0][4]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[1][4]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[2][4]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[3][4]}</td>
              <td style='
                padding: .5rem .5rem;
                position: relative;
                border-width: 0 1px;
                width: 92px;
                text-align: center;
                font-size: 24px;
                line-height: 38px;
                letter-spacing: 0.75px;
                font-weight: 400;
                border: 2px solid ${primary_default};
              '>${data[4][4]}</td>
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
        background-color: ${primary_light};
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
        '>
          serie: ${serie}
        </span>
      </div>

          
        </div>
      </div>
    </div>
  `)
}

function pdf(cartones){

  //catones[ { data: [...], user_id, serie } ]

  return new Promise((resolve, reject) => {
    htmlPdf.create(layout(
      cartones.map((e)=>{
        return carton(e.title, e.serie, e.data)
      }).join('')
    ), { format: 'Letter' }).toBuffer( (err, buffer) =>{
      if(err){
        reject(err)
      }

      resolve(buffer);

    })

  })


  // return new Promise((resolve, reject) => {
  //   htmlPdf.create(
  //     layout(
  //       carton('Carton completo', 1, [[12,15,9,14,6],[30,21,19,18,17],[44,41,'X',37,43],[46,51,55,57,56],[70,71,62,64,72]]) + 
  //       carton('Carton 1', 2, [[1,2,3,4,5],[6,7,8,9, 10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]]) + 
  //       carton('Carton 2', 3, [[1,2,3,4,5],[6,7,8,9, 10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]])
  //     ), { format: 'a4' }).toFile('../pdf/miPdf.pdf',(err, buffer) =>{
  //     if(err){
  //       reject(err)
  //     }

  //     resolve(buffer);

  //   })

  // })

}

// pdf()


// async function pdf2(cartones){
//   try {
//     // let cartonesUser = await store.get('cartones',{_id: num})
//     // let catalogos = await store.get('catalogos',{})
//     // let carton = {...cartonesUser[0]._doc, color: catalogos.filter((e)=>{return e.serie == cartonesUser[0].serial})[0].color,titulo: catalogos.filter((e)=>{return e.serie == cartonesUser[0].serial})[0].titulo, message: catalogos.filter((e)=>{return e.serie == cartonesUser[0].serial})[0].textoMedio}
//     // let cartonesUserAll = await store.get('cartones',{propietario_correo: carton.propietario_correo})
//     // let user = await store.get('users',{_id: carton.propietario_correo})
//     let file = { content: layout(
//       cartones.map((e)=>{
//         return carton(e.title ? e.title : 'Carton' , e.serie, e.data)
//       }).join()
//     ) } 
//     let options = { 
//       format : 'Letter', 
//       preferCSSPageSize : true,
//       name: 'Mi carton.pdf', 
//       printBackground :true
//     }

//     let pdfFinal = await html_to_pdf.generatePdf(file, options)

//     return pdfFinal;

//   } catch (error) {
//     throw new Error(error)
//   }
// }

// pdf2()

module.exports = {
  // pdf,
  pdf
}