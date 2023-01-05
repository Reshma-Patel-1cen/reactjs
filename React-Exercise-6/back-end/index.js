'use strict';

/************************************
 * Starting application
 ************************************/

console.info('[APP] Starting server initialization');

// Set options as a parameter, environment variable, or rc file.
require = require("esm")(module);
module.exports = require("./main.js");

