// Models
const { Category } = require('../models/category.models')

// Utils
const { catchAsync } = require('../utils/catchAsync.utils')
const { AppError } = require('../utils/appError.utils')

const categoryExists = catchAsync(async (req, res, next) => {
    const id = req.params.id || req.body.categoryId

    const category = await Category.findOne({
        where: { id },
    })

    if (!category) {
        return next(new AppError('category not found', 404))
    }

    req.category = category

    next()
})

module.exports = { categoryExists }