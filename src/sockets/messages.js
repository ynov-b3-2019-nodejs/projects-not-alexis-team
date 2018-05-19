module.exports = (socket,db) =>  {
    socket.on('msg', function(content){
        console.log('Received: ' + content);
        db.Message.create({
            content,
            userId : socket.request.session.full_user.id
        },{
            include: [db.User]
        }).then((r) => {
            r.reload().then((r) => {
                socket.emit('msg-bd', r);
            });
        });
    });
};