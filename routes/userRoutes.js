const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  likeUser,
} = require('../controllers/userController');

const router = express.Router();

// Obtener todos los usuarios
router.get('/', getAllUsers);

// Obtener usuario por ID
router.get('/:id', getUserById);

// Actualizar usuario (por ejemplo perfil)
router.put('/:id', updateUser);

// Dar like a un usuario
router.post('/:id/like', likeUser);

module.exports = router;
