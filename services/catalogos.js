const store = require('../libs/mongoose');
const table = 'catalogos';
// const boom = require('@hapi/boom')
// crud

const createCatalogo = async (
    premios,
    titulo,
    subTitulo,
    precio,
    enVenta,
    serie,
    color,
    icon,
) => {
  try {
    const getCatalogo = await store.get(table, {});
    if (!serie) {
      serie = getCatalogo.length+1;
    }

    const newCatalogo = await store.post(table, {
      premios,
      titulo,
      subTitulo,
      precio,
      enVenta,
      serie,
      color,
      icon,
    });

    return newCatalogo;
  } catch (err) {
    throw new Error(err);
  }
};

const getCatalogo = async (id) => {
  try {
    const getCatalogo = await store.get(table, id);

    return getCatalogo;
  } catch (err) {
    throw new Error(err);
  }
};

const updateCatalogo = async (id, data) => {
  try {
    const editCatalogo = await store.put(table, id, data);

    return editCatalogo;
  } catch (err) {
    throw new Error(err);
  }
};

const deletedCatalogo = async (id) => {
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

module.exports = {
  createCatalogo,
  getCatalogo,
  updateCatalogo,
  deletedCatalogo,
};
