const { Product } = require('../models/product.models');

const { catchAsync } = require('../utils/catchAsync.utils');
const { AppError } = require('../utils/appError.utils');

const protectProductOwner = catchAsync(async (req, res, next) => {
    next();
});

const productExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const product = await Product.findOne({ where: { id, status: 'active' } });

    if (!product) {
        return next(new AppError('Could not find product by given id', 404));
    }

    req.product = product;
    next();
});

module.exports = { protectProductOwner, productExists };
