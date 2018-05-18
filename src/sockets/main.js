module.exports = (io, sessionMiddleware) => {
    //Declare sockets behavior here.
    io.use((socket,next) => {
        sessionMiddleware(socket.request,{},next);
    });

    io.on('connection', function(socket){
        console.log('[SOCKET] CONNECTED ',socket.request.session.passport);
        require('./messages')(socket);
    });
};