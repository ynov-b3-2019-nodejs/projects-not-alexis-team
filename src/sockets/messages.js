module.exports = (socket) =>  {
    socket.on('msg', function(msg){
        //TODO Store message in db.
        //TODO Broadcast message.
        console.log('message: ' + msg);
        socket.emit('msg-bd',msg);
    });
};