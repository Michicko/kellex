const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;
const { isEmail } = require("validator");

const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "A student must have a first name"],
      lowercase: true
    },
    lastName: {
      type: String,
      required: [true, "A student must have a last name"],
      lowercase: true
    },
    middleName: {
      type: String,
      lowercase: true
    },
    admissionNumber: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, "A student must have an admission number"],
    },
    entryAcademicClass: {
      type: String,
      required: [true, "A student must have an entry Academic Class"],
    },
    currentAcademicClass: {
      type: ObjectId,
      ref: "AcademicClass",
    },
    academicClassHistory: [
      {
        type: ObjectId,
        ref: "AcademicClass",
      }
    ],
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
    status: {
      type: String,
      enum: ["active", "inactive", "suspended", "expeled", "withdrawn"],
      default: 'inactive'
    },
    role: {
      type: String,
      enum: ["rep", "prefect", "student"],
      default: "student",
    },
    rolePosition: {
      type: String,
    },
    dateAdmitted: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
  }
);

// virtual populate payments
// studentSchema.virtual('payments', {
//   ref: 'Payment',
//   foreignField: 'student',
//   localField: '_id'
// });

// virtual populate results
studentSchema.virtual('results', {
  ref: 'Result',
  foreignField: 'student',
  localField: '_id'
});


const Student = model("Student", studentSchema);
module.exports = Student;

// generate admission nuumber
