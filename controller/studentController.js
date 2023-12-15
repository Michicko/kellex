const Student = require("../model/studentModel");
const APIFeatures = require("../utils/ApiFeatures");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

function addZeroPad(num) {
  let str = String(num);
  while(str.length < 4){
    str = 0 + str;
  } 
  return str;
}

function getAdmissionNumber(counts) {
  const currentYear = String(new Date().getUTCFullYear()).substring(2);
  const admissionNumber = "KLX" + currentYear + addZeroPad(1 + counts);
  return admissionNumber;
}


exports.createStudent = catchAsync(async (req, res, next) => {
  const counts = await Student.countDocuments();
  const admissionNumber = getAdmissionNumber(counts);
  req.body.admissionNumber = admissionNumber;
  const student = await Student.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.getStudents = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Student.find(), req.query)
  .filter()
  .paginate();
  const students = await features.query;
  const studentCounts = await Student.countDocuments();

  res.status(200).json({
    status: "success",
    result: students.length,
    totalstudents: studentCounts,
    data: {
      students,
    },
  });
});

exports.getStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const student = await Student.findById(id).populate('results');

  if (!student) {
    return next(new AppError(`No student with that id ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.checkStudent = catchAsync(async (req, res, next) => {
  const {admissionNumber} = req.params;
  const student = await Student.findOne({admissionNumber}).populate({
    path:'results',
    populate: {
      path: 'academicSession'
    }
  });

  if (!student) {
    return next(new AppError(`No record available for student with admission number ${admissionNumber}`, 404));
  }

  res.status(200).json({
    status:'success',
    data: student
  })
})

exports.updateStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const student = await Student.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!student) {
    return next(new AppError(`No student with that id ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      student,
    },
  });
});

exports.deleteStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id);

  if (!student) {
    return next(new AppError(`No student with that id ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
