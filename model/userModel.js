const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;
const { isEmail } = require("validator");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "A user must have a first name"],
  },
  lastName: {
    type: String,
    required: [true, "A user must have a last name"],
  },
  email: {
    type: String,
      validate: {
        validator: function (v) {
          return isEmail(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      required: [true, "Please provide email"],
  },
  userId: {
    type: String,
    unique: true,
    required: [true, "A user must have a userId"],
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm password"],
    validator: {
      validate: function (v) {
        return this.password === v;
      },
      message: "password are not the same",
    },
  },
  role: {
    type: String,
    enum: ["admin", 'student', 'teacher', 'parent', 'staff'],
    default: "student",
  },
});


userSchema.pre('save', function(){
    this.confirmPassword = undefined;
    next();
});


const User = model('User', userSchema);
module.exports = User;
