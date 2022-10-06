const { Product } = require('./product.models');
const { Cart } = require('./cart.models');
const { ProductInCart } = require('./productInCart.model');
const { Order } = require('./order.models');
const { ProductImg } = require('./productImg.models');
const { Category } = require('./category.models');
const { User } = require('./user.models');

//estabilish relation

const initModels = () => {
    //1 user --> M product
    User.hasMany(Product, { foreignKey: 'userId' });
    Product.belongsTo(User);

    //1 user --> M order
    User.hasMany(Order, { foreignKey: 'userId' });
    Order.belongsTo(User);

    //1 user  --> 1 cart
    User.hasOne(Cart, { foreignKey: 'userId' });
    Cart.belongsTo(User);

    //Product 1 --> M ProductsImgs
    Product.hasMany(ProductImg, { foreignKey: 'productId' });
    ProductImg.belongsTo(Product);

    //Cart 1 --> 1 order
    Cart.hasOne(Order, { foreignKey: 'cartId' });
    Order.belongsTo(Cart);

    //Categories 1 --> 1 products
    Category.hasOne(Product, { foreignKey: 'categoryId' });
    Product.belongsTo(Category);

    //M product --> Cart

    // 1 Product <---> 1 ProductInCart
    Product.hasOne(ProductInCart, { foreignKey: 'productId' });
    ProductInCart.belongsTo(Product);

    // 1 Cart <---> M ProductInCart
    Cart.hasMany(ProductInCart, { foreignKey: 'cartId' });
    ProductInCart.belongsTo(Cart);
};

module.exports = { initModels };
