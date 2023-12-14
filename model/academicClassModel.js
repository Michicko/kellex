const { Schema, model } = require("mongoose");
const slugify = require("slugify");
const { ObjectId } = Schema.Types;

const academicClassSchema = new Schema(
  {
    academicClass: {
      type: String,
    },
    teacher: {
      type: ObjectId,
      ref: "Teacher",
      // required: [true, 'A academicClass must have a teacher']
    },
    subjects: [
      {
        type: ObjectId,
        ref: "Subject",
      },
    ],
    createdBy: {
      type: ObjectId,
      ref: "Admin",
      // required: true,
    },
    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

academicClassSchema.pre("save", function (next) {
  this.slug = slugify(this.academicClass);
  next();
});

// virtual populate students
academicClassSchema.virtual("students", {
  ref: "Student",
  foreignField: "currentAcademicClass",
  localField: "_id",
});

const AcademicClass = model("AcademicClass", academicClassSchema);
module.exports = AcademicClass;
