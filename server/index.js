'use strict'

// Internal imports.
const db = require('./database/db');

// External imports for the server.
const config = require('config');
const cors = require('cors');
const express = require('express');
const app = express();
  
// Sets up the server to listen on the port with CORS access for the localhost.
let corsOptions = {
    origin: config.get('client.host') + ':' + config.get('client.port'),
    optionsSuccessStatus: 200
};
let port = config.get('expressServer.port');
app.use(cors(corsOptions));
app.listen(port, () => {
    db.init(config.get('dbCredentials'));
    console.log(`RPG Tool Server running on port: ${port}`);
});

const router = require('./router/router')(app);