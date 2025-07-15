const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { obtenerMensajes, enviarMensaje } = require('../controllers/messageController');


router.get('/:partnerId', obtenerMensajes);
router.post('/:partnerId', enviarMensaje);



router.get('/:partnerId', async (req, res) => {
  try {
    const userId = req.header('x-user-id');
    const partnerId = req.params.partnerId;

    const mensajes = await Message.find({
      $or: [
        { de: userId, para: partnerId },
        { de: partnerId, para: userId }
      ]
    }).sort({ creadoEn: 1 }); // ordenar ascendente por fecha

    res.json(mensajes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al cargar mensajes' });
  }
});

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
