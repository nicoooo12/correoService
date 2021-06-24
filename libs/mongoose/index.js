// const config = require('../../config')
const store = require('./store');
// const db = require('./conect')

// db(config.urlDb)
const get = (tabla, id=null) => {
  return new Promise(async (resolve, reject)=>{
    if (!tabla) {
      return reject(new Error('no se específico una tabla'));
    }

    if (id && typeof(id) !== 'object') {
      return reject(new Error('id debe ser un objeto'));
    }

    const resultado = await store.get(tabla, id);
    if (resultado.error === true) {
      return reject(resultado.body);
    } else {
      return resolve(resultado.body);
    }
  });
};

const post = (tabla, data) => {
  return new Promise(async (resolve, reject)=>{
    if (!tabla || !data) {
      return reject(new Error('no se específico una tabla y/o datos'));
    }

    const resultado = await store.post(tabla, data);
    if (resultado.error === true) {
      return reject(resultado.body);
    } else {
      return resolve(resultado.body);
    }
  });
};

const put = (tabla, id, data) => {
  return new Promise(async (resolve, reject)=>{
    if (!tabla || !id || !data) {
      return reject(new Error('no se específico una tabla, id y/o datos'));
    }

    const resultado = await store.put(tabla, id, data);
    if (resultado.error === true) {
      return reject(resultado.body);
    } else {
      return resolve(resultado.body);
    }
  });
};

const delt = (tabla, id) => {
  return new Promise(async (resolve, reject)=>{
    if (!tabla || !id) {
      return reject(new Error('no se específico una tabla y/o una id'));
    }

    const resultado = await store.delt(tabla, id);
    if (resultado.error === true) {
      return reject(resultado.body);
    } else {
      return resolve(resultado.body);
    }
  });
};

module.exports = {
  get,
  post,
  put,
  delt,
};
