const User = require("../model/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  const userCounts = await User.countDocuments();

  res.status(200).json({
    status: "success",
    result: users.length,
    totalUsers: userCounts,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const {id} = req.params;
  const user = await User.findById(id);

  if (!user) {
    return next(new AppError(`No user with that id ${id}`, 404))
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});


exports.updateUser = catchAsync(async (req, res, next) => {
  const {id} = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!user) {
   return next(new AppError(`No user with that id ${id}`, 404))
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});


exports.deleteUser = catchAsync(async (req, res, next) => {
  const {id} = req.params;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
   return next(new AppError(`No user with that id ${id}`, 404))
  }

  res.status(200).json({
    status: "success",
    data: null
  });
});

