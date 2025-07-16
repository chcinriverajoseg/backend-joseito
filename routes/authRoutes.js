const express = require('express');
const { registerUsuario, loginUsuario } = require('../controllers/authController');

const router = express.Router();

// Registro
router.post('/register', registerUsuario);

// Login
router.post('/login', loginUsuario);

module.exports = router;
