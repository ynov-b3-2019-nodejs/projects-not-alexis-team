module.exports = (socket,db,io) =>  {
    socket.on('msg', function(content){
        console.log('Received: ' + content);
        db.Message.create({
            content,
            userId : socket.request.session.full_user.id
        },{
            include: [db.User]
        }).then((r) => {
            r.reload().then((r) => {
                io.emit('msg-bd', r);
            });
        });
    });
};