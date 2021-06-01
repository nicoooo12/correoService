const store = require('../libs/mongoose')
const table = 'plays'
// const boom = require('@hapi/boom')

async function updatePlay(data){
  try {
    
    let editCatalogo = await store.put(table, { _id: '60aba5b0106085d77c0be3b8' }, data)

    return editCatalogo

  } catch (err) {
    throw new Error(err)
  }
}

async function getPlay(){
  try {
    
    let getPlay = await store.get(table, {})
    
    return getPlay[0]

  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  updatePlay,
  getPlay
}