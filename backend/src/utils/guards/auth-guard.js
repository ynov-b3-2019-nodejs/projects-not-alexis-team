module.exports = (req, res, next) => {
    if (req.user) {
        res.locals.user = req.user;
        next();
    } else if (req.url.match('/login') === null && req.url.match('/register') === null && req.accepts('text/html')){
            res.redirect('/login?redirectTo='+req.url);
    } else {
        res.status(401).send();
    }
};
