module.exports = (socket,db) =>  {
    socket.on('msg', function(content){
        //TODO Store message in db.
        //TODO Broadcast message
        console.log('Received: ' + content);
        db.Message.create({
            content,
            userId : socket.request.session.full_user.id
        }).then((r) => {
            socket.emit('msg-bd',content);
        });
    });
};