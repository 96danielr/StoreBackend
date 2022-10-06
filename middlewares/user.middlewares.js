// Models
const { User } = require('../models/user.models');

// Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');

const userExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({
        where: { id, status: 'active' },
        attributes: { exclude: ['password'] },
    });

    if (!user) {
        return next(new AppError('User does not exist with given Id', 404));
    }

    // Add user data to the req object
    req.user = user;
    next();
});

const protectAccountOwner = catchAsync(async (req, res, next) => {
    const { sessionUser, user } = req;

    if (sessionUser.id !== user.id) {
        return next(new AppError('You do not own this account', 403));
    }

    next();
});

module.exports = {
    userExists,
    protectAccountOwner,
};
