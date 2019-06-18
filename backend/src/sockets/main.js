const cookieParser = require('socket.io-cookie');

module.exports = (io,db) => {
    io.use(cookieParser);
    io.use(require('./auth')(io,db));

    // require('./connected')(io,connectedUsers); //Connection / Disconnection handler.

    io.on('connection',(socket) => {
        require('./messages')(socket,db,io);

    });
};
