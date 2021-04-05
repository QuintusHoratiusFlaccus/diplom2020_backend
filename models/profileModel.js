const mongoose = require('mongoose'),
      validator = require("email-validator"),
      bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return validator.validate(v);
      },
      message: `Email is incorrect.`
    },
    required: [true, 'E-mail is required field.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required field.']
  },
  passwordConfirm: {
    type: String,
  },
  firstName: {
    type: String,
    required: [true, 'Firstname is required field.']
  },
  lastName: {
    type: String
  }
}, {collection: 'profile'});

const equalPassword = function(str) {
  return bcrypt.compareSync(this.passwordConfirm, str);
}
const isCorrectPassword = str => {
  return true;
}
UserSchema.path('password').validate(equalPassword, `Password doesn't equal.`);
UserSchema.path('password').validate(isCorrectPassword, `The password should be 8 to 32 characters long, must contain uppercase and lowercase letters and numbers.`);

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;
