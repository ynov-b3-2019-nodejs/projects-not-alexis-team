require('dotenv').config()
const express = require('./utils/express.js');
const app = require('./utils/express.js').app;
const db = require('./utils/database');
const auth = require('./utils/auth');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const passport = require('./utils/auth').passport(db.User);
const connectedUsers = [];

console.log("App started at " , new Date().toLocaleString());

//Init sessions
app.use(passport.initialize());
app.use(passport.session());


require('./endpoints/default')(app);
require('./endpoints/login.js')(app,auth,passport,db);
//Declare routes behaviors here
require('./endpoints/chat')(app,db,connectedUsers);


//End of routes behaviors

require('./sockets/main')(io,express.sessionMiddleware,db,passport,connectedUsers);

//Errors management
require('./utils/errors')(app);

//Launch server
http.listen(process.env.SRV_PORT, () => {
    console.log('listening on *:'+process.env.SRV_PORT);
});
