const jwt = require('jsonwebtoken');

module.exports = (io,db) => {
    return async (socket, next) => {
        if(socket.request.headers.cookie.token) {
            const payload = await jwt.verify(socket.request.headers.cookie.token, process.env.JWT_SECRET);
            db.User.findOne({
                where : { email: payload.email  }
            }).then(user => {
                socket.user = user;
                next();
            }).catch(e => {
                console.log('Unable to auth')
            });
        }
    }
};
