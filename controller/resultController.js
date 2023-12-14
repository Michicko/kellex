const Result = require("../model/resultModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.createResult = catchAsync(async (req, res, next) => {
  const result = await Result.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      result,
    },
  });
});

exports.getResults = catchAsync(async (req, res, next) => {
  const results = await Result.find();
  const resultCounts = await Result.countDocuments();

  res.status(200).json({
    status: "success",
    result: results.length,
    totalresults: resultCounts,
    data: {
      results,
    },
  });
});

exports.getResult = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await Result.findById(id).populate('academicSession');

  if (!result) {
    return next(new AppError(`No result with id ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
});

exports.updateResult = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await Result.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!result) {
    return next(new AppError(`No result with id ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      result,
    },
  });
});

exports.deleteResult = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const result = await Result.findByIdAndDelete(id);

  if (!result) {
    return next(new AppError(`No result with id ${id}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: null,
  });
});
