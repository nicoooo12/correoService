const store = require('../libs/mongoose')
const canvasServices = require('./canvasUrl')
const correoService = require('./correo')
const cartonesService = require('./cartones')
const table = 'ordenes'
async function createOrden(
  compra, // Array
  totalPago, //Number
  tipoDePago, // String
  user // String
){
  try{
    let getOrden = await store.get(table, { user })
    if(getOrden[0]){
      return { err : true}
    }
    let newOrden = await store.post(table,{
      compra,
      totalPago,
      tipoDePago,
      estado: 2, // 0: finalizado, 1: en revisión, 2: incida
      canvasUrl: false, // estado = 2 -> no canvas url
      user
    }) 

    return {err: false, newOrden}

  }
  catch(err){

    throw new Error(err)

  }
}

async function addCanvasUrl(id, canvasUrl){

  try {

    await canvasServices.createCanvasUrl(id, canvasUrl)
    
    let editOrden = await store.put(table, {user: id}, {
      canvasUrl: true,
      estado: 1, // 0: finalizado, 1: en revisión, 2: incida
    })

    return editOrden

  } catch (err) {
    
    throw new Error(err)

  }

}

async function addComment(id, message){
  try {
    let editOrden = await store.put(table, {user: id}, {message})

    return editOrden

  } catch (err) {
    
    throw new Error(err)

  }
}

async function getCanvasOrden(id){

  try {
    
    let getOrden = await store.get(table, {
      user: id,
    })
    if(!getOrden[0] || !getOrden[0].canvasUrl){
      return { canvas : false}
    }
    let getCanvas = await canvasServices.getCanvasUrl(id)

    return {
      canvas: true,
      data: getCanvas
    }

  } catch (err) {
    
    throw new Error(err)

  }

}

async function getOrdenes(){
  try {
    
    let getOrdenes = await store.get(table, {})

    return getOrdenes

  } catch (err) {
    
    throw new Error(err)

  }
}

async function getOrden(id){

  try {
    
    let getOrden = await store.get(table, {
      user: id,
    })

    return getOrden

  } catch (err) {
    
    throw new Error(err)

  }

}

async function getOrdenTerminadas(id){

  try {
    
    let getOrden = await store.get('ordenesTerminadas', {
      user: id,
    })

    return getOrden

  } catch (err) {
    
    throw new Error(err)

  }

}

async function editOrden(id, data){
  try {
    let editOrden = await store.put(table, {user: id}, data)

    return editOrden

  } catch (err) {
    
    throw new Error(err)

  }
}

async function cancelOrden(id){

  try {
    let getOrden = await store.get(table, {
      user: id,
    })
    if(!getOrden[0]){
      return { message: 'order already deleted or does not exist'} 
    }else{
      await store.delt(table, {user: id})
      if(getOrden[0].canvasUrl){
        canvasServices.deleteCanvasUrl(id)
      }
      return {message:'cancel successfully'}
    }
    
  } catch (err) {
    
    throw new Error(err)

  }

}

async function terminarOrden(id, pagado, correo = false, comment){
  
  try {
    
    // console.log('[comment]', comment);
    //cambiar el estado 
    let orden = await store.get(table, {user: id})
    //crea los cartones
    orden[0].compra.map(async (e)=>{
      for(let i=1; i<= e.cantidad; i++){
        await cartonesService.createCarton(id, e.serie)
      }
    })

    //mover la orden
    let newOrdenEnd = await store.post('ordenesTerminadas', {
      compra: orden[0].compra,
      pago: orden[0].totalPago,
      pagado,
      comment,
      user: id,
    })
    await store.delt(table, {user: id})
    if(orden[0].canvasUrl){
      canvasServices.deleteCanvasUrl(id)
    }
    //manda el correo con los pdfs
    if (correo){
      let [user] = await store.get('users', {_id : id})
      await correoService.correoConfirmation(user.email, await cartonesService.getCarton({ user: id}))
    }

    //retornar
    return newOrdenEnd
 
  } catch (err) {
   
    throw new Error(err)

  }

}

module.exports = {
  createOrden,
  addCanvasUrl,
  getCanvasOrden,
  getOrdenes,
  getOrden,
  editOrden,
  cancelOrden,
  terminarOrden,
  addComment,
  getOrdenTerminadas,
}