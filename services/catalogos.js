const store = require('../libs/mongoose')
const table = 'catalogos'
// const boom = require('@hapi/boom')
//crud

async function createCatalogo(premios, titulo, subTitulo, precio, enVenta, serie, color, icon){
  try {
    
    let getCatalogo = await store.get(table, {})
    if(!serie){
      serie = getCatalogo.length+1
    }

    let newCatalogo = await store.post(table, {
      premios,
      titulo,
      subTitulo,
      precio,
      enVenta,
      serie,
      color,
      icon
    })

    return newCatalogo

  } catch (err) {
    throw new Error(err)
  }
}

async function getCatalogo(id){
  try {
    
    let getCatalogo = await store.get(table, id)
    
    return getCatalogo

  } catch (err) {
    throw new Error(err)
  }
}

async function updateCatalogo(id, data){
  try {
    
    let editCatalogo = await store.put(table, id, data)

    return editCatalogo

  } catch (err) {
    throw new Error(err)
  }
}

async function deletedCatalogo(id){
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

module.exports = {
  createCatalogo,
  getCatalogo,
  updateCatalogo,
  deletedCatalogo
}