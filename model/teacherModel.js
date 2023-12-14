const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;
const { isEmail } = require("validator");

const teacherSchema = new Schema(
  {
    firstNme: {
      type: String,
      required: [true, "A teacher should have a first name"],
    },
    lastName: {
      type: String,
      required: [true, "A teacher should have a first name"],
    },
    email: {
      type: String,
      required: [true, "A teacher should must have an email"],
      validate: {
        validator: function (v) {
          return isEmail(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
      required: [true, "A teacher must have a guardian phone email"],
    },
    password: {
      type: String,
      required: true,
      required: [true, "Please provide a password"],
    },
    dateEmployed: {
      type: Date,
      default: Date.now,
    },
    AcademicClass: {
      type: ObjectId,
      ref: "AcademicClass",
    },
    subjects: [
      {
        type: ObjectId,
        ref: "Subject",
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive", "sacked", "resigned", "suspended"],
      default: "active",
    },
  },
  { timestamps: true }
);

const Teacher = model("Teacher", teacherSchema);
module.exports = Teacher;
