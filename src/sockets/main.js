module.exports = (io, sessionMiddleware,db,passport) => {
    //Declare sockets behavior here.
    io.use((socket,next) => {
        sessionMiddleware(socket.request,{},next);
    });
    io.use((socket,next) => {
       if(socket.request.session.passport && socket.request.session.passport.user){
           passport.deserializeCallback(socket.request.session.passport.user,(err,user) => {
              if(err) throw err;
              socket.request.session.full_user = user;
              next()
           });
       }
    });
    require('./connected')(io); //Connection / Disconnection handler.
    io.on('connection', function(socket){
        require('./messages')(socket,db,io);
    });
};