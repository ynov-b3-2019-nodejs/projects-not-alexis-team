const express = require('express');
const bcrypt = require('bcrypt');

module.exports = (db) =>{
    const router = express.Router();

    router.post('/',(req,res) => {
        if (req.body && req.body.firstname && req.body.lastname && req.body.password && req.body.email) {
            db.User.findOne({
                where: {
                    email: req.body.email,
                }
            }).then((r) => {
                if (r) {
                    res.render('login', {
                        errors: {
                            signup: [
                                "Cette addresse est déjà utilisée."
                            ]
                        }
                    })
                } else {
                    bcrypt.hash(req.body.password,10).then((password => {
                        db.User.create({
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            password: password,
                            email: req.body.email,
                        }).then((r) => {
                            console.log('[AUTH]User created');
                            req.login(r, (r) => {
                                res.redirect('/');
                            });

                        }).catch(e => {
                            console.error(e);
                        })
                    }))
                }
            })
        }
    });
    return router;
};
