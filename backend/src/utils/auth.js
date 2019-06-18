const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

function init(User) {

    // JWT

    const JwtStrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    };
    const jwtStrategy = new JwtStrategy(JwtStrategyOptions, (payload, done) => {
        console.log(payload);
        User.findOne({
            where : { email: payload.email  }
        }).then(user => {
            if(user) {
                return done(null, user)
            }else {
                return done(null, false);
            }
        }).catch(e => {
            return done(e, false)
        });
    });


    // STANDARD

    const localStrategy = new LocalStrategy((email, password, done) => {
        console.log('[AUTH]',email,password);
        User
            .findOne({
                where : { email }
            }).then(function (user) {
                if(user) {
                    bcrypt.compare(password,user.password).then(r=> {
                        if(r) {
                            return done(null, user)
                        }else {
                            return done(null, false, {
                                message: 'Invalid credentials'
                            });
                        }
                    });
                }else {
                    return done(null, false, {
                        message: 'Unknown user'
                    });
                }
        }).catch(done);
    });

    // Save the user's email address in the cookie
    passport.serializeUser((user, cookieBuilder) => {
        cookieBuilder(null, user.email);
    });

    function deserializeCallback(email, cb) {
        // Fetch the user record corresponding to the provided email address
        User.findOne({
            where : { email }
        }).then(r => {
            if(r) return cb(null, r);
            else return cb(new Error("No user corresponding to the cookie's email address"));
        });
    }

    passport.deserializeUser(deserializeCallback);

    passport.deserializeCallback = deserializeCallback;


    // STRATEGY MANAGEMENT
    passport.use(jwtStrategy);
    passport.use(localStrategy);

    return passport;
}

module.exports.passport = init;
