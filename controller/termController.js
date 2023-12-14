const Term = require("../model/termModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.createTerm = catchAsync(async (req, res, next) => {
  const term = await Term.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      term,
    },
  });
});


exports.getTerms = catchAsync(async (req, res, next) => {
  const terms = await Term.find();
  const termCounts = await Term.countDocuments();

  res.status(200).json({
    status: "success",
    result: terms.length,
    totalterms: termCounts,
    data: {
      terms,
    },
  });
});

exports.getTerm = catchAsync(async (req, res, next) => {
  const {id} = req.params;
  const term = await Term.findById(id);

  if (!term) {
    return next(new AppError(`No term with that id ${id}`, 404))
  }

  res.status(200).json({
    status: "success",
    data: {
      term,
    },
  });
});


exports.updateTerm = catchAsync(async (req, res, next) => {
  const {id} = req.params;
  const term = await Term.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!term) {
   return next(new AppError(`No term with that id ${id}`, 404))
  }

  res.status(200).json({
    status: "success",
    data: {
      term,
    },
  });
});


exports.deleteTerm = catchAsync(async (req, res, next) => {
  const {id} = req.params;
  const term = await Term.findByIdAndDelete(id);

  if (!term) {
   return next(new AppError(`No term with that id ${id}`, 404))
  }

  res.status(200).json({
    status: "success",
    data: null
  });
});

