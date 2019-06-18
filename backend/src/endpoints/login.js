const jwt = require('jsonwebtoken');
const express = require('express');

module.exports  = (db, passport) => {
    const router = express.Router();

    router.get('/',(req,res) =>{
        res.render('login',{
            redirectTo : req.query.redirectTo
        });
    });

    router.post('/',(req,res ,next) => {
            passport.authenticate('local',(err, user, info) => {
                console.log(info);
                if (err) { return next(err); }
                // respond with html page
                if (req.accepts('html')) {
                    if(!user) {
                        res.redirect(('/login'));
                    } else {
                        res.redirect('/');
                    }
                }

                // respond with json
                if (req.accepts('application/json')) {
                    if(!user) {
                        res.status(401).send();
                    } else {
                        const token = jwt.sign(
                            {
                                name: `${user.firstname} ${user.lastname}`,
                                email: user.email
                            },
                            process.env.JWT_SECRET,
                            {
                                expiresIn: "1 day",
                                subject: user.email
                            }
                            );
                        res.send({
                            token
                        });
                    }
                }
            })(req, res, next);
        }
    );

    return router;
};
