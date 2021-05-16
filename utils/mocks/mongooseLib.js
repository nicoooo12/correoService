const store = require('./store')

const store = {
  ordenes: require('./ordenes').db
}

function get(tabla, id=null){
    return new Promise(async(resolve, reject)=>{
        if(!tabla){
            return reject('no se específico una tabla')
        }

        if(id && typeof(id) !== 'object'){
            return reject('id debe ser un objeto')
        }

        let resultado = store[tabla].get(id)
        return resolve(resultado.body)
    })
}

function post(tabla,data){
    return new Promise(async(resolve, reject)=>{
        if(!tabla || !data){
            return reject('no se específico una tabla y/o datos')
        }

        let resultado = store[tabla].post()
        return resolve(resultado.body)
    })
}

function put(tabla, id, data){
    return new Promise(async(resolve, reject)=>{
        if(!tabla || !id || !data){
            return reject('no se específico una tabla, id y/o datos')
        }

        let resultado = store[tabla].put()
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
          reject('no se específico una tabla y/o una id')
        }
        resolve('dato eliminado')
    })
}

module.exports = {
    get,
    post,
    put,
    delt,
}