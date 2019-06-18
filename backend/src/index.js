require('dotenv').config();
const express = require('./utils/express.js');
const app = require('./utils/express.js').app;
const auth = require('./utils/auth');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const connectedUsers = [];

(async () => {
    console.log("App started at ", new Date().toLocaleString());
    const db = await require('./utils/database')();
    const passport = require('./utils/auth').passport(db.User);

    //Init sessions
    app.use(passport.initialize());
    app.use(passport.session());


    // HTTP ENDPOINTS
    app.use('/messages',
        passport.authenticate('jwt', { session: false }),
        require('./endpoints/messages')(db)
        );
    app.use('/login', require('./endpoints/login')(db, passport));
    app.use('/register', require('./endpoints/register')(db));

    require('./endpoints/chat')(app, db, connectedUsers);


    // SOCKETS ENDPOINTS
    require('./sockets/main')(io, express.sessionMiddleware, db, passport, connectedUsers);

    //Errors management
    require('./utils/errors')(app);

    //Launch server
    http.listen(process.env.SRV_PORT, () => {
        console.log('listening on *:' + process.env.SRV_PORT);
    });
})();


