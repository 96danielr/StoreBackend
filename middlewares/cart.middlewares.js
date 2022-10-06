// Models
const { Cart } = require('../models/cart.models')
const { ProductInCart } = require('../models/productInCart.model')

// Utils
const { catchAsync } = require('../utils/catchAsync.utils')

const cartIsActive = catchAsync(async (req, res, next) => {
    const { sessionUser } = req

    let cart = await Cart.findOne({
        where: { userId: sessionUser.id, status: 'active' },
        include: {
            model: ProductInCart,
            required: false,
            where: { status: 'active' },
        },
    })

    if (!cart) {
        cart = await Cart.create({
            userId: sessionUser.id,
        })
    }

    req.cart = cart

    next()
})

module.exports = { cartIsActive }