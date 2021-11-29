'use strict'

// Config for env-vars.
const config = require('config');

// Database initialization.
const db = require('./database/db');
db.init(config.get('dbCredentialsTool'), config.get('dbCredentialsUsers'));

// External imports for the server.
const cors = require('cors');
const express = require('express');
const app = express();

// Middleware for user sessions and pg session store.
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const sessionPool = db.getPool('users');
  
// Sets up the server to listen on the port with CORS access for the localhost.
let port = config.get('expressServer.port');
let corsOptions = {
    origin: config.get('client.host') + ':' + config.get('client.port'),
    optionsSuccessStatus: 200,
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', config.get('client.host') + ':' + config.get('client.port'));
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
// Set the session middleware for the users.
app.use(session({
    store: new pgSession({
        pool: sessionPool,
        tableName: 'user_session',
        schemaName: 'user'
    }),
    secret: config.get('expressServer.secret'), // TODO: Look into secret rotation!
    resave: false,
    saveUninitialized: false,
    name: 'RPGSESID',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: false, // This flags makes it so the client can/can't see what it in the cookie. True means only server sees cookie.
        secure: false,
        sameSite: false,
    } // 1 day, TODO: Increase later once logic working as expected.
}));
app.listen(port, () => {
    console.log(`RPG Tool Server running on port: ${port}`);
});

const router = require('./router/router')(app);