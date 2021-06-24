const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const config = require('./config');
const server = require('http').createServer(app);
const {Server} = require('socket.io');
const {instrument} = require('@socket.io/admin-ui');
const io = new Server(server, {
  cors: {
    origin: [
      'https://admin.socket.io',
      config.adminUrl,
    ],
  },
});

instrument(io, {
  auth: {
    type: 'basic',
    username: config.socketUser,
    password: config.socketPassword,
  },
});

const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers');
require('./libs/mongoose/connect.js')(config.db);

// middleware
app.disable('x-powered-by');
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(helmet());

// routers
require('./routers/auth')(app);
require('./routers/cartones')(app);
require('./routers/catalogos')(app);
require('./routers/orden')(app);
require('./routers/play')(app);
require('./routers/main')(app);
require('./routers/sockets')(app, io);
// require('./routers/premios')(app);

// 404 not found
app.use((req, res)=>{
  res.status(404).json({
    status: 404,
    body: 'error 404 not fund',
    message: 'not fund',
  });
});
// error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

server.listen(config.port, () => {
  console.log(`server listening on port ${config.port}
in ${config.dev ? 'development' : 'production'} mode`);
});
