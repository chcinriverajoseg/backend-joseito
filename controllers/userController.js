
   const User = require('../models/User');

// 📌 Crear usuario
const crearUsuario = async (req, res) => {
  try {
    const nuevoUsuario = new User(req.body);
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (err) {
    console.error('❌ Error al crear usuario:', err);
    res.status(500).json({ mensaje: 'Error al crear usuario' });
  }
};

// 📌 Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await User.find();
    res.json(usuarios);
  } catch (err) {
    console.error('❌ Error al obtener usuarios:', err);
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};

// 📌 Obtener usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (err) {
    console.error('❌ Error al obtener usuario por ID:', err);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// 📌 Actualizar usuario
const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const actualizaciones = req.body;

    const usuarioActualizado = await User.findByIdAndUpdate(id, actualizaciones, { new: true });

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuarioActualizado);
  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
};

// 📌 Dar "like" a otro usuario y detectar match
const darLike = async (req, res) => {
  const { id } = req.params; // ID del usuario que recibe el like
  const fromUserId = req.header('x-user-id'); // ID del usuario que da el like

  if (!fromUserId) {
    return res.status(400).json({ mensaje: 'Falta x-user-id en el header' });
  }

  try {
    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findById(id);

    if (!fromUser || !toUser) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Si no ha dado like antes
    if (!fromUser.likes.includes(id)) {
      fromUser.likes.push(id);
      await fromUser.save();
    }

    let esMatch = false;

    // Si el otro usuario también dio like antes → match
    if (toUser.likes.includes(fromUserId)) {
      if (!fromUser.matches.includes(id)) {
        fromUser.matches.push(id);
      }
      if (!toUser.matches.includes(fromUserId)) {
        toUser.matches.push(fromUserId);
      }

      await fromUser.save();
      await toUser.save();
      esMatch = true;
    }

    res.json({ mensaje: 'Like registrado', match: esMatch });
  } catch (err) {
    console.error('❌ Error al dar like:', err);
    res.status(500).json({ mensaje: 'Error al procesar el like' });
  }
};

// 📌 Obtener matches de un usuario
const obtenerMatches = async (req, res) => {
  try {
    const usuario = await User.findById(req.params.id).populate('matches', 'nombre foto email');
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario.matches);
  } catch (err) {
    console.error('❌ Error al obtener matches:', err);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

// Exportar todos los controladores
module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  darLike,
  obtenerMatches,
};
