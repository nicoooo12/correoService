const store = require('../libs/mongoose');
const table = 'evento';

const get = async ()=> {
  const [getEvento] = await store.get(table, {});

  return getEvento;
};

const editEvento = async (data) => {
  const eventoId = await get();
  const editedEvent = await store.put(table, eventoId._id, data);

  return editedEvent;
};

module.exports = {
  get,
  editEvento,
};
