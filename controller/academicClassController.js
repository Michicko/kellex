const AcademicClass = require("../model/academicClassModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.createAcademicClass = catchAsync(async (req, res, next) => {
  const academicClass = await AcademicClass.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      academicClass,
    },
  });
});

exports.getCAcademicClasses = catchAsync(async (req, res, next) => {
  const academicClasses = await AcademicClass.find();
  const academicClassCounts = await AcademicClass.countDocuments();

  res.status(200).json({
    status: "success",
    result: academicClasses.length,
    totalclasss: academicClassCounts,
    data: {
      academicClasses,
    },
  });
});

exports.getAcademicClass = catchAsync(async (req, res, next) => {
  const {id} = req.params;
  const academicClass = await AcademicClass.findById(id);

  if (!academicClass) {
    return next(new AppError(`No academicClass with that id ${id}`, 404))
  }

  res.status(200).json({
    status: "success",
    data: {
      academicClass,
    },
  });
});


exports.updateAcademicClass = catchAsync(async (req, res, next) => {
  const {id} = req.params;
  const academicClass = await AcademicClass.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!academicClass) {
   return next(new AppError(`No academicClass with that id ${id}`, 404))
  }

  res.status(200).json({
    status: "success",
    data: {
      academicClass
    },
  });
});


exports.deleteAcademicClass = catchAsync(async (req, res, next) => {
  const {id} = req.params;
  const academicClass = await AcademicClass.findByIdAndDelete(id);

  if (!academicClass) {
   return next(new AppError(`No academicClass with that id ${id}`, 404))
  }

  res.status(200).json({
    status: "success",
    data: null
  });
});

