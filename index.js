const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const boom = require('@hapi/boom');

const app = express();
const config = require('./config');

const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middleware/errorHandlers');

// middleware
app.disable('x-powered-by');
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(helmet());

app.use((req, res, next)=>{
  if (req.body.key === config.key) {
    next();
  } else {
    next(boom.unauthorized('unauthorized keys'));
  }
});

// routers
require('./routers/main')(app);

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

app.listen(config.port, () => {
  console.log(`server listening on port ${config.port}
in ${config.dev ? 'development' : 'production'} mode`);
});
