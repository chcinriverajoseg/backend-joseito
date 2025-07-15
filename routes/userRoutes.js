const express = require('express');
const router = express.Router();
const {
  obtenerUsuarios,
  darLike,
  obtenerMatches,
  obtenerUsuarioPorId,
  actualizarUsuario,
  crearUsuario
} = require('../controllers/userController');

// Ruta para obtener matches (debe estar antes que /:id si existe esa ruta)
router.get('/matches/:id', obtenerMatches);

// Otras rutas
router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuarioPorId);
router.post('/', crearUsuario);
router.put('/:id', actualizarUsuario);
router.post('/like/:id', darLike);

module.exports = router;
