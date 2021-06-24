const model = require('./models');

const get = async (tabla, id=null) => {
  if (!model[tabla]) {
    return {
      error: true,
      body: 'la tabla no existe',
    };
  }

  try {
    if (id) {
      const getDato = await model[tabla].find(id);
      return {
        error: false,
        body: getDato,
      };
    } else {
      const getDato = await model[tabla].find();
      return {
        error: false,
        body: getDato,
      };
    }
  } catch (err) {
    return {
      error: true,
      body: err,
    };
  }
};

const post = async (tabla, data) => {
  if (!model[tabla]) {
    return {
      error: true,
      body: 'la tabla no existe',
    };
  }

  try {
    const newModel = new model[tabla](data);
    await newModel.save();
    return {
      error: false,
      body: newModel,
    };
  } catch (err) {
    return {
      error: true,
      body: err,
    };
  }
};

const put = async (tabla, id, data) => {
  if (!model[tabla]) {
    return {
      error: true,
      body: 'la tabla no existe',
    };
  }

  try {
    // console.log(tabla, id);
    const getDato = await model[tabla].find(id);
    // console.log(getDato);
    if (getDato[0]) {
      const keys = Object.keys(data);
      keys.map((e)=>{
        getDato[0][e] = data[e];
      });
      // console.log(getDato, await model[tabla].find(id));
      await getDato[0].save();
      return {
        error: false,
        body: getDato,
      };
    } else {
      return {
        error: true,
        body: 'no existe / no encontrado',
      };
    }
  } catch (err) {
    return {
      error: true,
      body: err,
    };
  }
};

const delt = (tabla, id) => {
  if (!model[tabla]) {
    return {
      error: true,
      body: 'la tabla no existe',
    };
  }

  return model[tabla].deleteOne(id, ()=>{
    return {
      error: false,
      body: 'dato eliminado',
    };
  });
};

module.exports={
  get,
  post,
  put,
  delt,
};
