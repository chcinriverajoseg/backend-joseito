/*const express = require('express');
const router = express.Router();
const { registerUsuario, loginUsuario } = require('../controllers/authController');

// ✅ Ahora ambas rutas funcionan
router.post('/register', registerUsuario);
router.post('/login', loginUsuario);

router.post('/login', login); // POST http://localhost:4000/api/auth/login

module.exports = router;*/

const express = require('express');
const router = express.Router();
const { registerUsuario, loginUsuario } = require('../controllers/authController');

// Ruta de registro
router.post('/register', registerUsuario); // POST http://localhost:4000/api/auth/register

// Ruta de login
router.post('/login', loginUsuario); // POST http://localhost:4000/api/auth/login

module.exports = router;

