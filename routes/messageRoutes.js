const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Obtener mensajes con un partner
router.get('/:partnerId', async (req, res) => {
  try {
    const userId = req.header('x-user-id');
    const partnerId = req.params.partnerId;

    const mensajes = await Message.find({
      $or: [
        { de: userId, para: partnerId },
        { de: partnerId, para: userId }
      ]
    }).sort({ creadoEn: 1 });

    res.json(mensajes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al cargar mensajes' });
  }
});

// Enviar mensaje a un partner
router.post('/:partnerId', async (req, res) => {
  try {
    const userId = req.header('x-user-id');
    const partnerId = req.params.partnerId;
    const { texto } = req.body;

    if (!texto) return res.status(400).json({ message: 'Mensaje vacío' });

    const nuevoMensaje = new Message({ de: userId, para: partnerId, texto });
    await nuevoMensaje.save();

    res.json(nuevoMensaje);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al enviar mensaje' });
  }
});

module.exports = router;
