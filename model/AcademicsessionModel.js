const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;

const academicSessionSchema = new Schema(
  {
    academicSession: {
      type: String,
      required: [true, "An academicSession must have an academicSession"],
      unique: true,
    },
    fromYear: {
      type: Date,
      required: true,
      default: Date.now,
    },
    toYear: {
      type: Date,
      required: true,
      default: Date.now,
    },
    // terms: [
    //   {
    //     type: ObjectId,
    //     ref: 'Term'
    //   }
    // ],
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

academicSessionSchema.pre('save', function(next){
    this.name = this.academicSession.replace(/\s/g,'');
    next();
})

academicSessionSchema.virtual('terms', {
  ref: 'Term',
  foreignField: 'academicSession',
  localField: '_id'
});

const AcademicSession = model("AcademicSession", academicSessionSchema);
module.exports = AcademicSession;
