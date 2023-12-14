const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const termSchema = new Schema(
  {
    term: {
      type: String,
      enum: ["first", "second", "third"],
      default: "first",
      required: [true, "A term must have a term"],
    },
    academicSession: {
      type: ObjectId,
      ref: "AcademicSession",
      required: [true, "A term must have a academicSession"],
    },
    isCurrent: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: ObjectId,
      ref: "Admin",
      // required: [true, "A term must have a created by user"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// populate results
termSchema.virtual('results', {
  ref: 'Result',
  foreignField: 'term',
  localField: '_id'
});


const Term = model("Term", termSchema);
module.exports = Term;
