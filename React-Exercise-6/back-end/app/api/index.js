import express from 'express';
import fs from 'fs';

console.info('[APP] Initializing routes');

// create router instance
var router = express.Router();

export default app => {

  // load all public api files synchronously 
  fs.readdirSync(__dirname + '/public').forEach(file => {
    var name = file.substr(0, file.indexOf('.'));
    require('./public/' + name).default(router);
  });
  
  app.use('/api/v1.0', router);

  // load all public api files synchronously 
  fs.readdirSync(__dirname + '/private').forEach(file => {
    var name = file.substr(0, file.indexOf('.'));
    require('./private/' + name).default(router);
  });
  app.use('/api/v1.1', router);
}