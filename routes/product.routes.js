const express = require('express');

// Controllers
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controllers');
const {
  getAllCategories,
  createCategory,
  updateCategory,
} = require('../controllers/category.controllers');

// Middlewares
const { protectSession } = require('../middlewares/auth.middlewares');
const {
  checkValidations,
  createProductValidations
} = require('../middlewares/validators.middlewares');
const {
  protectProductOwner,
  productExists,
} = require('../middlewares/product.middlewares');

//Utils

const { upload } = require('../utils/multer.utils')
const router = express.Router();

router.get('/', getAllProducts);

router.get('/categories', getAllCategories);

router.get('/:id', productExists, getProductById);
//Endpoints protecteds

router.use(protectSession);

router.post('/', upload.array('productImg', 5), createProductValidations, checkValidations, createProduct);

router.post('/categories', createCategory);

router.patch('/categories/:id', updateCategory);

router
  .use('/:id', productExists)
  .route('/:id')
  .patch(protectProductOwner, updateProduct)
  .delete(protectProductOwner, deleteProduct);

module.exports = { productsRouter: router };