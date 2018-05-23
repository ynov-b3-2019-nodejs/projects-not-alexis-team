const connectedUsers = [];
module.exports = (io) => {
    io.on('connection', function(socket){
        connectedUsers.push(socket.request.session.full_user);
        io.emit('usr-connected',{
           firstname: socket.request.session.full_user.firstname,
           lastname: socket.request.session.full_user.lastname,
        });
        socket.on('disconnect',() => {
            connectedUsers.splice(connectedUsers.indexOf(socket.request.session.full_user),1);
            io.emit('usr-disconnected', {
                firstname: socket.request.session.full_user.firstname,
                lastname: socket.request.session.full_user.lastname,
            });
        })
    });
};