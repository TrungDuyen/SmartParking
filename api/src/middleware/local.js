const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;

const User      = require('../models/userModel');

module.exports = (passport) => {

  passport.serializeUser((user, done) => {

      done(null, user.id);
  });

  passport.deserializeUser((id, done) => {

       User.findById(id, (err, user) => {
           done(err, user);
       });
   });

  passport.use('local-signup', new LocalStrategy({
    emailField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (req, email, password, done) => {

    User.findOne({ email: email }, (err, user) => {
      if (err) return done(err);

      if (user) {
        return done(null, false, {message: 'That email is already taken'});

      } else {

        const userData = {
          email: email,
          password: password
        };

        const newUser = new User(userData);

        newUser.save(err => {
          if (err) return done(err);
          return done(null, newUser);
        });

      }
    });
  }));

  passport.use('local-login', new LocalStrategy({
    emailField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  },
  (req, email, password, done) => {

    User.findOne({ email :  email }, (err, user) => {

      if (err) return done(err);

      if (!user){
        return done(null, false, {message: 'User not found'});
      }

      if (!user.validPassword(password)){
        return done(null, false, {message: 'Oops! Wrong password'});
      }

      return done(null, user);

    });
  }));
};
