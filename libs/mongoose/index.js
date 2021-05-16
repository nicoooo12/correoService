// const config = require('../../config')
const store = require('./store')
// const db = require('./conect')

// db(config.urlDb)
function get(tabla, id=null){
    return new Promise(async(resolve, reject)=>{
        if(!tabla){
            return reject('no se específico una tabla')
        }

        if(id && typeof(id) !== 'object'){
            return reject('id debe ser un objeto')
        }

        let resultado = await store.get(tabla, id)
        if(resultado.error === true){
            return reject(resultado.body)
        }else{
            return resolve(resultado.body)
        }
    })
}

function post(tabla,data){
    return new Promise(async(resolve, reject)=>{
        if(!tabla || !data){
            return reject('no se específico una tabla y/o datos')
        }

        let resultado = await store.post(tabla, data)
        if(resultado.error === true){
            return reject(resultado.body)
        }else{
            return resolve(resultado.body)
        }
    })
}

function put(tabla, id, data){
    return new Promise(async(resolve, reject)=>{
        if(!tabla || !id || !data){
            return reject('no se específico una tabla, id y/o datos')
        }

        let resultado = await store.put(tabla, id, data)
        if(resultado.error === true){
            return reject(resultado.body)
        }else{
            return resolve(resultado.body)
        }
    })
}

function delt(tabla, id){
    return new Promise(async(resolve, reject)=>{
        if(!tabla || !id){
            return reject('no se específico una tabla y/o una id')
        }

        let resultado = await store.delt(tabla, id)
        if(resultado.error === true){
            return reject(resultado.body)
        }else{
            return resolve(resultado.body)
        }
    })
}

module.exports = {
    get,
    post,
    put,
    delt,
}