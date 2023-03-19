const JwtStrategy = require('passport-jwt').Strategy;
const jwt = require('jsonwebtoken');


function cookieExtractor(req) {
    const token = req?.cookies.jwt || null;
    console.log('token', token)
    return token;
}

function initPassport(passport, jwtSecret) {
    const jwtOpts = {
        jwtFromRequest: cookieExtractor,
        secretOrKey: jwtSecret
    }

    passport.use(
        new JwtStrategy(jwtOpts, (jwtPayload, done) => {
            console.log(jwtPayload);

            if (!jwtPayload['id']) return done(null, false);

            return done(null, jwtPayload);
        })
    )
}

module.exports = initPassport
