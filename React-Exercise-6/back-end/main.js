// initialize server
import './config/initializers/server';
// require('./config/initializers/server');
process.on("SIGINT", () => { console.log("exiting…"); process.exit(); });

process.on("exit", () => { console.log("exiting…"); process.exit(); });