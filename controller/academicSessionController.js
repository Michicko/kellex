const AcademicSession = require("../model/AcademicsessionModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.createAcademicSession = catchAsync(async (req, res, next) => {
  const academicSession = await AcademicSession.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      academicSession,
    },
  });
});

exports.getAcademicSessions = catchAsync(async (req, res, next) => {
  const academicSessions = await AcademicSession.find();
  const academicSessionCounts = await AcademicSession.countDocuments();

  res.status(200).json({
    status: "success",
    result: academicSessions.length,
    totalacademicSessions: academicSessionCounts,
    data: {
      academicSessions,
    },
  });
});

exports.getAcademicSession = catchAsync(async (req, res, next) => {
  const {id} = req.params;
  const academicSession = await AcademicSession.findById(id).populate('terms');

  if (!academicSession) {
    return next(new AppError(`No academicSession with that id ${id}`, 404))
  }

  res.status(200).json({
    status: "success",
    data: {
      academicSession,
    },
  });
});


exports.updateAcademicSession = catchAsync(async (req, res, next) => {
  const {id} = req.params;
  const academicSession = await AcademicSession.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!academicSession) {
   return next(new AppError(`No academicSession with that id ${id}`, 404))
  }

  res.status(200).json({
    status: "success",
    data: {
      academicSession,
    },
  });
});


exports.deleteAcademicSession = catchAsync(async (req, res, next) => {
  const {id} = req.params;
  const academicSession = await AcademicSession.findByIdAndDelete(id);

  if (!academicSession) {
   return next(new AppError(`No academicSession with that id ${id}`, 404))
  }

  res.status(200).json({
    status: "success",
    data: null
  });
});

