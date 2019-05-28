module.exports = (app,db) =>{
    app.get('/messages',(req,res) => {
        db.Message.findAll({
            include : [
                {
                    model : db.User
                }
            ]
        }).then(messages => {
            messages.forEach((o) => {
                // o.sent = (o.user.email === req.user.email);
            });
            res.send(messages);
        });
    })
};
