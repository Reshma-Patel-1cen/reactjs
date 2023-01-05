'use strict';

/**************************************
 * handle incoming request
 * ***********************************/

import bodyParser from "body-parser";
import cors from "cors";

export default (app) => {

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // parse application/json
  app.use(bodyParser.json());

  //CORS Middleware
  app.use(cors());
};