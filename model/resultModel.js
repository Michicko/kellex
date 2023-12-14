const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const resultSchema = new Schema(
  {
    admissionNumber: {
      type: 'String',
      required: [true, "A result must have an admission number"],
    },
    studentName: {
      type: 'String',
      required: [true, "A result must have student name"],
    },
    sessionName: {
      type: 'String',
      required: [true, "A result must have session Name"],
    },
    termName: {
      type: 'String',
      required: [true, "A result must have term Name"],
    },
    academicClass: {
      type: ObjectId,
      ref: "AcademicClass",
      required: [true, "A result must belong to a academicClass"],
    },
    student: {
      type: ObjectId,
      ref: "Student",
      required: [true, "A result must belong to a student"],
    },
    academicSession: {
      type: ObjectId,
      ref: "AcademicSession",
      required: [true, "A result must belong to a academicSession"],
    },
    term: {
      type: ObjectId,
      ref: "Term",
      required: [true, "A result must belong to a term"],
    },
    docUrl: {
      type: String,
      required: [true, "A result must have a document"],
      unique: true
    },
    createdBy: {
      type: ObjectId,
      ref: "User",
      // required: [true, "A term must have a created by admin"],
    },
  },
  {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject:{virtuals: true}
  }
);


resultSchema.pre('/find/', async function(next){
  if (this.options._recursed) {
    return next();
  }
  this.populate({ path: "academicSession", options: { _recursed: true } });
})

const Result = model('Result',resultSchema);
module.exports = Result;
