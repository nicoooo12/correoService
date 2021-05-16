const store = require('../libs/mongoose')
const boom = require('@hapi/boom')
//crud

const table = 'cartones'
async function createCarton(propietario, serie){
  try {

    let bucle = true
    let resultado
    while(bucle){
      let dataGenerada = generar()
      let carton = await store.get(table, {data: dataGenerada, serie})
      if(!carton[0]){
        bucle=false
        let newCarton = await store.post(table, {
          user: propietario,
          data: dataGenerada,
          serie,
        })
        resultado = newCarton
      }
    }
    return resultado

  } catch (err) {
    throw new Error(err)
  }
}

async function getCarton(id){
  try {
    
    let getCartones = await store.get(table, id)

    return getCartones

  } catch (err) {
    throw new Error(err)
  }
}

async function deletedCarton(id){
  try {

    let getCarton = await store.get(table, {
      _id: id,
    })
    if(!getCarton[0]){
      return { message: 'carton already deleted or does not exist'} 
    }else{
      await store.delt(table, {
        _id: id,
      })
      return {message:'deleted successfully'}
    }
    
  } catch (err) {
    throw new Error(err)
  }
}

//internal functions
function generar(){
  let devolver = [[0,0,0,0,0],[0,0,0,0,0],[0,0,76,0,0],[0,0,0,0,0],[0,0,0,0,0]]
  for(let i = 0; i <= 4; i++){
    for(let e = 0; e <= 4; e++){
      if(devolver[i][e] === 76){
        devolver[i][e] = 0
      }else{
        let wi = true
        let o
        let p
        while(wi){
          switch(i){
            case 0 :
              o = ((Math.round((Math.random()*14)/1)+1))
              p = compare(devolver, o)
              if(!p){
                devolver[i][e] = o
                wi = false
              }
              break;
            case 1 :
              o = ((Math.round((Math.random()*14)/1)+1) + 15)
              p = compare(devolver, o)
              if(!p){
                devolver[i][e] = o
                wi = false
              }
              break;
            case 2 :
              o = ((Math.round((Math.random()*14)/1)+1) +30)
              p = compare(devolver, o)
              if(!p){
                devolver[i][e] = o
                wi = false
              }
              break;
            case 3 :
              o = ((Math.round((Math.random()*14)/1)+1) + 45)
              p = compare(devolver, o)
              if(!p){
                devolver[i][e] = o
                wi = false
              }
              break;
            case 4 :
              o = ((Math.round((Math.random()*14)/1)+1) + 60)
              p = compare(devolver, o)
              if(!p){
                devolver[i][e] = o
                wi = false
              }
              break;
          }
        }
      }

    }
  }
  return devolver
}
function compare(arrayDe, num){
  let o = false
  for(let i = 0; i <= 4; i++){
    if (o === true) { break; }
    for(let e = 0; e <= 4; e++){
      if(arrayDe[i][e] === num){
        o = true
      }
    }
  }
  return o
}


module.exports = {
  createCarton,
  getCarton,
  deletedCarton,
}