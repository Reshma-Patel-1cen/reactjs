'use strict';

/************************************
 * start server
 ************************************/

import 'dotenv/config';
import express from 'express';
import requestHandler from '../middleware/request-handler';
import errorHandler from '../middleware/error-handler';
import routConfig from '../../app/api';

// Configure express
const app = express();

// handle incoming request
requestHandler(app);
// configure routes
routConfig(app);

// handle api error response
app.use(errorHandler);
app.get('/', (req, res) => {
  // console.info(`Jello Orchestrator – APP VERSION ::: ${version}`);
  res.send("My First NodeJS APP");
});

// start server on port
app.listen(process.env.NODE_PORT, () => {
  console.log("server started on port", process.env.NODE_PORT);
});