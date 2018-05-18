const express = require('./utils/express.js');
const app = require('./utils/express.js').app;
const db = require('./utils/database');
const auth = require('./utils/auth');
const http = require('http').Server(app);
const socket = require('socket.io')(http);
const passport = require('./utils/auth').passport(db.User);

console.log("App started at " , new Date().toLocaleString());

//Init sessions
app.use(passport.initialize());
app.use(passport.session());

//Declare routes behaviors here
require('./utils/default')(app);
require('./utils/login.js')(app,auth,passport,db);
require('./endpoints/chat')(app,db);

socket.use((socket,next) => {
    express.sessionMiddleware(socket.request,{},next);
});
socket.on('connection', function(socket){
    console.log('[SOCKET] CONNECTED ',socket.request.session.passport);
});

require('./utils/errors')(app);

//Launch server
// app.listen(process.env.SRV_PORT);
http.listen(process.env.SRV_PORT, () => {
    console.log('listening on *:'+process.env.SRV_PORT);
});