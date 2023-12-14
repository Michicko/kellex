const Admission = require("../model/admissionModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.createAdmission = catchAsync(async (req, res, next) => {
  const admission = await Admission.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      admission,
    },
  });
});

exports.getAdmissions = catchAsync(async (req, res, next) => {
  const admissions = await Admission.find();
  const admissionCounts = await Admission.countDocuments();

  res.status(200).json({
    status: "success",
    result: admissions.length,
    totaladmissions: admissionCounts,
    data: {
      admissions,
    },
  });
});

exports.getAdmission = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const admission = await Admission.findById(id);

  if (!admission) {
    return next(new AppError(`No admission with that id ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      admission,
    },
  });
});

exports.updateAdmission = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const admission = await Admission.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!admission) {
    return next(new AppError(`No admission with that id ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      admission,
    },
  });
});

exports.deleteAdmission = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const admission = await Admission.findByIdAndDelete(id);

  if (!admission) {
    return next(new AppError(`No admission with that id ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
