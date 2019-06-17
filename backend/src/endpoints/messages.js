const express = require('express');

module.exports = (db) =>{
    const router = express.Router();

    router.get('/',(req,res) => {
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
    });
    return router;

};
