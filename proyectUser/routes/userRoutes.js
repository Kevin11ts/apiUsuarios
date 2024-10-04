const express = require('express');
const UserController = require('../controllers/userController');
const { update } = require('../models/userModel');
const { validateUser } = require('../middlewares/validation');
const { authenticate } = require('../middlewares/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/users', authenticate, UserController.getAllUsers);
router.get('/users/:id', authenticate, UserController.getUserById);
router.post('/users', authenticate, validateUser, UserController.createUser);
router.put('/users/:id', authenticate, validateUser, UserController.updateUser);
router.delete('/users/:id', authenticate, UserController.deleteUser);

// Nueva ruta para descargar el archivo Excel
router.get('/downloadUsers', userController.downloadUsersExcel);

//http://localhost:3000/api/downloadProducts


module.exports = router;
//Indicacion de lo que escribas
//Rutas