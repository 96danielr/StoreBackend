const express = require('express');

// Controllers
const {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
    login,
} = require('../controllers/user.controllers');

// Middlewares
const { userExists } = require('../middlewares/user.middlewares');
const {
    protectSession,
    protectAdmin,
} = require('../middlewares/auth.middlewares');
const {
    createUserValidations,
} = require('../middlewares/validators.middlewares');

const usersRouter = express.Router();

usersRouter.post('/', createUserValidations, createUser);

usersRouter.post('/login', login);

// Protecting below endpoints
usersRouter.use(protectSession);

usersRouter.get('/', getAllUsers);

usersRouter.patch('/:id', userExists, protectAdmin, updateUser);

usersRouter.delete('/:id', userExists, protectAdmin, deleteUser);

module.exports = { usersRouter };
