const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");

const admissionSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "A student must have a first name"],
    },
    lastName: {
      type: String,
      required: [true, "A student must have a last name"],
    },
    middleName: {
      type: String,
    },
    entryAcademicClass: {
      type: String,
      required: [true, "A student must have an entry academicClass"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "A student must have a gender"],
    },
    dob: {
      type: Date,
      required: [true, "A student must have a date of birth"],
    },
    guardianPhoneNumber: {
      type: String,
      required: [true, "A student must have a guardian phone number"],
    },
    guardianEmail: {
      type: String,
      validate: {
        validator: function (v) {
          return isEmail(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      required: [true, "A student must have a guardian email"],
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
  },
  {
    timestamps: true,
  }
);

const Admission = model("Admission", admissionSchema);
module.exports = Admission;
