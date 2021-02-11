'use strict'

// Internal imports.
const db = require('./database/db');

// External imports for the server.
const config = require('config');
const express = require('express');
const app = express();
  
// Sets up the server to listen on the port with DB access.
let port = config.get('expressServer.port');
app.listen(port, () => {
    db.init(config.get('dbCredentials'));
    console.log(`RPG Tool Server running on port: ${port}`);
});

const router = require('./router/router')(app);