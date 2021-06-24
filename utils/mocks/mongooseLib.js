// const store = require('./store');

const store = {
  ordenes: require('./ordenes').db,
};

const get = (tabla, id=null) => {
  return new Promise((resolve, reject)=>{
    if (!tabla) {
      return reject(new Error('no se específico una tabla'));
    }

    if (id && typeof(id) !== 'object') {
      return reject(new Error('id debe ser un objeto'));
    }

    const resultado = store[tabla].get(id);
    return resolve(resultado.body);
  });
};

const post = (tabla, data) => {
  return new Promise((resolve, reject)=>{
    if (!tabla || !data) {
      return reject(new Error('no se específico una tabla y/o datos'));
    }

    const resultado = store[tabla].post();
    return resolve(resultado.body);
  });
};

const put = (tabla, id, data) => {
  return new Promise((resolve, reject)=>{
    if (!tabla || !id || !data) {
      return reject(new Error('no se específico una tabla, id y/o datos'));
    }

    const resultado = store[tabla].put();
    if (resultado.error === true) {
      return reject(resultado.body);
    } else {
      return resolve(resultado.body);
    }
  });
};

const delt = (tabla, id) => {
  return new Promise((resolve, reject)=>{
    if (!tabla || !id) {
      reject(new Error('no se específico una tabla y/o una id'));
    }
    resolve('dato eliminado');
  });
};

module.exports = {
  get,
  post,
  put,
  delt,
};
