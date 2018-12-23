const mongoose = require('mongoose'),
      Schema   = mongoose.Schema,
      bcrypt   = require('bcrypt');
  
var UserSchema = new mongoose.Schema({
  email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true
    },
  password: {
        type: String,
        required: true
    }
});

// userSchema.methods.validPassword = function(password) {
//     return bcrypt.compareSync(password, this.password);
// };

// userSchema.pre('save', function(next) {
//   const user = this;

//   if (!user.isModified('password')) return next();

//   bcrypt.genSalt((saltError, salt) => {
//     if (saltError) return next(saltError);

//     bcrypt.hash(user.password, salt, (hashError, hash) => {
//       if (hashError) return next(hashError);

//       user.password = hash;
//       next();

//     });
//   });

// });

// module.exports = mongoose.model('User', userSchema);

 
UserSchema.pre('save',  function(next) {
    var user = this;
 
     if (!user.isModified('password')) return next();
 
     bcrypt.genSalt(10, function(err, salt) {
         if (err) return next(err);
 
         bcrypt.hash(user.password, salt, function(err, hash) {
             if (err) return next(err);
 
             user.password = hash;
             next();
         });
     });
});
 
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
 
module.exports = mongoose.model('User', UserSchema);