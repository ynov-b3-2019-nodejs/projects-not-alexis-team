module.exports = (io, connectedUsers) => {
    io.on('connection', function (socket) {
        connectedUsers.push(socket.request.session.full_user);
        io.emit('usr-connected', {
            firstname: socket.request.session.full_user.firstname,
            lastname: socket.request.session.full_user.lastname,
            id: socket.request.session.full_user.id,
        });
        socket.on('disconnect', () => {
            connectedUsers.splice(connectedUsers.indexOf(socket.request.session.full_user), 1);
            io.emit('usr-disconnected', {
                id: socket.request.session.full_user.id,
            });
        })
    });
};