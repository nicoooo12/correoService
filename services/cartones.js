const store = require('../libs/mongoose');
// const boom = require('@hapi/boom')
// crud

const table = 'cartones';
const createCarton = async (propietario, serie, icon = 'X' ) => {
  try {
    let bucle = true;
    let resultado;
    const catalogo = await store.get('catalogos', {serie});
    // console.log(catalogo[0].titulo);
    // catalogo[0].icon ? icon = catalogo.icon[0] : false
    while (bucle) {
      const dataGenerada = generar(icon);
      const carton = await store.get(table, {data: dataGenerada, serie});
      if (!carton[0]) {
        bucle=false;
        const newCarton = await store.post(table, {
          user: propietario,
          title: catalogo[0].titulo,
          data: dataGenerada,
          serie,
        });
        resultado = newCarton;
      }
    }
    return resultado;
  } catch (err) {
    throw new Error(err);
  }
};

const getCarton = async (id) => {
  try {
    const getCartones = await store.get(table, id);

    return getCartones;
  } catch (err) {
    throw new Error(err);
  }
};

const deletedCarton = async (id) => {
  try {
    const getCarton = await store.get(table, {
      _id: id,
    });
    if (!getCarton[0]) {
      return {message: 'carton already deleted or does not exist'};
    } else {
      await store.delt(table, {
        _id: id,
      });
      return {message: 'deleted successfully'};
    }
  } catch (err) {
    throw new Error(err);
  }
};

// internal functions
const generar = (icon) => {
  const devolver = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 76, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ];
  for (let i = 0; i <= 4; i++) {
    for (let e = 0; e <= 4; e++) {
      if (devolver[i][e] === 76) {
        devolver[i][e] = icon;
      } else {
        let wi = true;
        let o;
        let p;
        while (wi) {
          switch (i) {
            case 0:
              o = ((Math.round((Math.random()*14)/1)+1));
              p = compare(devolver, o);
              if (!p) {
                devolver[i][e] = o;
                wi = false;
              }
              break;
            case 1:
              o = ((Math.round((Math.random()*14)/1)+1) + 15);
              p = compare(devolver, o);
              if (!p) {
                devolver[i][e] = o;
                wi = false;
              }
              break;
            case 2:
              o = ((Math.round((Math.random()*14)/1)+1) +30);
              p = compare(devolver, o);
              if (!p) {
                devolver[i][e] = o;
                wi = false;
              }
              break;
            case 3:
              o = ((Math.round((Math.random()*14)/1)+1) + 45);
              p = compare(devolver, o);
              if (!p) {
                devolver[i][e] = o;
                wi = false;
              }
              break;
            case 4:
              o = ((Math.round((Math.random()*14)/1)+1) + 60);
              p = compare(devolver, o);
              if (!p) {
                devolver[i][e] = o;
                wi = false;
              }
              break;
          }
        }
      }
    }
  }
  return devolver;
};
const compare = (arrayDe, num) => {
  let o = false;
  for (let i = 0; i <= 4; i++) {
    if (o === true) {
      break;
    }
    for (let e = 0; e <= 4; e++) {
      if (arrayDe[i][e] === num) {
        o = true;
      }
    }
  }
  return o;
};


module.exports = {
  createCarton,
  getCarton,
  deletedCarton,
};
