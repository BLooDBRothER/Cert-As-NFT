const passport = require('passport');

const authenticate = (req, res, next) => {
    passport.authenticate('jwt', function(err, user){
        if (err) return next(err);

        if (!user){
            res.clearCookie("jwt");
            return res.status(401).json({message: "Unauthorized Access"});
        }

        req.user = user;

        next();
    })(req, res, next);
}

module.exports = authenticate;
