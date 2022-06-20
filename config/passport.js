const LocalStrategy = require('passport-local').Strategy
const { User } = require('../models/schemas')
const connectDB = require('../config/db')
const bcrypt = require('bcrypt')

module.exports = (passport) => {
    passport.use(new LocalStrategy((username, password, done ) => {

        User.findOne({username: username}, (err, user) => {
            if (err) throw err;
            if (!user) {
                return done(null, false, {message: 'Username not found'});
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Password does not match'});
                }
            })
        })        
    }))

    passport.serializeUser((user, done) => {
        done(null, user.id);
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, function(err, user){
            done(err, user)
        })
    })
}