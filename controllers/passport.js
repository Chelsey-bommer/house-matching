// const LocalStrategy = require('passport-local').Strategy
// const { User } = require('../models/schemas');
// const bcrypt = require('bcrypt')

// module.exports = (passport) => {
//     passport.use(new LocalStrategy = (email, password, done ) => {

//         let query = {email: email};
//         User.findOne(query, function(err, user){
//             if (err) throw err;
//             if (!user) {
//                 return done(null, false, {message: 'Email not found'});
//             }
//         })

//         bcrypt.compare(password, user.password, (err, isMatch) => {
//             if (err) throw err;
//             if (isMatch) {
//                 return done(null, user)
//             } else {
//                 return done(null, false, {message: 'Password does not match'});
//             }
//         })
//     })

//     passport.serializeUser(function(user, done){
//         done(null, user.id);
//     })

//     passport.deserializeUser(function(id, done){
//         User.findById(id, function(err, user){
//             done(err, user)
//         })
//     })
// }

// Commented passport code as this will be added in the future