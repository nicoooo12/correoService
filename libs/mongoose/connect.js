const db = require('mongoose');

db.Promise = global.Promise;

const connect = async (url) => {
  await db.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log('[db] conectado correctamente');
  })
      .catch((err)=>{
        console.error('[db -error-]', err);
      });
};

module.exports = connect;
