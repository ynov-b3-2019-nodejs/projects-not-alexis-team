module.exports = (app,db) =>{
    app.use((req,res) => {
        db.Message.findAll({
            include : [
                {
                    model : db.User
                }
            ]

        }).then(messages => {
            res.render('chat',{
                messages
            })
        });
    })
};