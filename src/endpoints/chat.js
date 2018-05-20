module.exports = (app,db) =>{
    app.use((req,res) => {
        db.Message.findAll({
            include : [
                {
                    model : db.User
                }
            ]

        }).then(messages => {
            messages.forEach((o) => {
               o.state = (o.user.email === req.user.email) ? 'sent' : 'received';
            });
            if(messages.length === 0) {
                messages.push({
                    content: "Bienvenue, envoyez votre premier message ! ",
                    createdAt: new Date(),
                    user: {
                        firstname: "Sys",
                        lastname: "TEME",
                        email: "sys.teme@hardware.ware",
                    },
                    state:"received"
                })
            }
            res.render('chat',{
                messages
            })
        });
    })
};