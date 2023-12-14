const { Schema, model } = require("mongoose");
const { ObjectId } = Schema.Types;


const subjectSchema = new Schema({
    name: {
        type: String,
        required: [true, 'A subject must have a name'],
        unique: true,
        trim: true
    },
    teacher: {
        type: ObjectId,
        ref: 'Teacher',
        required: [true, 'A subject must have a teacher'],
    },
    createdBy: {
        type: ObjectId,
        ref: "Admin",
        required: true,
      },
}, {
    times: true
})

const Subject = model('Subject', subjectSchema);

modle.exports  = Subecjt