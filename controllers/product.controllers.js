// Models
const { Product } = require('../models/product.models');
const { Category } = require('../models/category.models');
const { User } = require('../models/user.models');
const { ProductImg } = require('../models/productImg.models')


// Utils
const { catchAsync } = require('../utils/catchAsync.utils');
const {
  uploadProductImgs,
  getProductImgsUrls,
  getProductsImgsUrls,
} = require('../utils/firebase.utils')

const getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.findAll({
    where: { status: 'active' },
    include: [
      { model: Category, attributes: ['name'] },
      { model: User, attributes: ['username', 'email'] },
      {
        model: ProductImg,
        required: false,
        where: { status: 'active' },
        attributes: ['id', 'imgUrl'],
      },
    ],
  });

  const productsWithImgs = await getProductsImgsUrls(products)

  res.status(200).json({
    status: 'success',
    data: { products: productsWithImgs },
  })
});

const getProductById = catchAsync(async (req, res, next) => {
  const { id } = req.product

  const product = await Product.findOne({
    where: { id },
    attributes: {
      exclude: [
        'categoryId',
        'userId',
        'createdAt',
        'updatedAt',
        'status',
      ],
    },
    include: [
      {
        model: ProductImg,
        required: false,
        where: { status: 'active' },
        attributes: ['id', 'imgUrl'],
      },
      { model: Category, attributes: ['id', 'name'] },
    ],
  })

  const productWithImgs = await getProductImgsUrls(product)

  res.status(200).json({
    status: 'success',
    data: { product: productWithImgs },
  })
});

const createProduct = catchAsync(async (req, res, next) => {
  const { title, description, price, categoryId, quantity } = req.body
  const userId = req.sessionUser.id

  const product = await Product.create({
    title,
    description,
    quantity,
    price,
    categoryId,
    userId,
  })

  await uploadProductImgs(req.files, product.id)

  res.status(201).json({
    status: 'success',
    data: { product },
  })
});

const updateProduct = catchAsync(async (req, res, next) => {
  const { product } = req;
  const { title, description, quantity, price } = req.body;

  await product.update({ title, description, quantity, price });

  res.status(200).json({
    status: 'success',
    data: { product },
  })
});

const deleteProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  await product.update({ status: 'removed' });

  res.status(204).json({
    status: 'success',
    data: { product },
  })
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};